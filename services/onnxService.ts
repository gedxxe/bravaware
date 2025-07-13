
import * as ort from 'onnxruntime-web';
import { OnnxAnalysisOutput, AnalysisResultType } from '../types';
import { ONNX_MODEL_PATH } from '../constants';

let session: ort.InferenceSession | null = null;

export async function loadOnnxModel(): Promise<void> {
  try {
    // Set the base path for ONNX runtime WebAssembly files for version 1.18.0
    ort.env.wasm.wasmPaths = "https://esm.sh/onnxruntime-web@1.18.0/dist/"

    // Step 1: Check if the model file is accessible
    const response = await fetch(ONNX_MODEL_PATH);
    if (!response.ok) {
      throw new Error(`Failed to fetch ONNX model file at '${ONNX_MODEL_PATH}'. Status: ${response.status}. Please ensure the model file is correctly placed in the public directory and the path is correct.`);
    }
    // If fetch is ok, the file exists, proceed to load with ONNX runtime.
    // The response body isn't directly used by ort.InferenceSession.create(), 
    // it uses the path to fetch it again internally or from cache.

    session = await ort.InferenceSession.create(ONNX_MODEL_PATH, { executionProviders: ['wasm'] });
    console.log("ONNX model loaded successfully.");
  } catch (e) {
    console.error(`Failed to load ONNX model: ${e}`);
    const errorMessage = (e instanceof Error) ? e.message : String(e);
    // Ensure the error message clearly indicates the problem, especially if it's from the fetch check.
    if (errorMessage.includes("Failed to fetch ONNX model file")) {
        throw new Error(errorMessage);
    }
    throw new Error(`Failed to initialize ONNX model. Ensure '${ONNX_MODEL_PATH}' is in the public folder and accessible. Original error: ${errorMessage}`);
  }
}

async function preprocessImage(file: File): Promise<{ tensor: ort.Tensor, originalWidth: number, originalHeight: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          reject(new Error("Could not get 2D context from canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const { data, width, height } = imageData;
        
        const float32Data = new Float32Array(width * height);
        for (let i = 0; i < data.length / 4; i++) {
          const r = data[i * 4];
          const g = data[i * 4 + 1];
          const b = data[i * 4 + 2];
          const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;
          float32Data[i] = (grayscale / 255.0 - 0.5) / 0.5;
        }
        
        const tensor = new ort.Tensor('float32', float32Data, [1, 1, height, width]);
        resolve({ tensor, originalWidth: width, originalHeight: height });
      };
      img.onerror = (err) => reject(new Error(`Image load error: ${err}`));
      if (event.target?.result) {
        img.src = event.target.result as string;
      } else {
        reject(new Error("FileReader did not produce a result."));
      }
    };
    reader.onerror = (err) => reject(new Error(`FileReader error: ${err}`));
    reader.readAsDataURL(file);
  });
}

function softmax(logits: Float32Array | number[]): number[] {
  const anumberArray = Array.from(logits);
  const maxLogit = Math.max(...anumberArray);
  const exps = anumberArray.map(logit => Math.exp(logit - maxLogit));
  const sumExps = exps.reduce((a, b) => a + b, 0);
  return exps.map(exp => exp / sumExps);
}

export async function runOnnxInference(imageFile: File): Promise<OnnxAnalysisOutput> {
  if (!session) {
    console.error("ONNX session not initialized. Attempting to load model again...");
    try {
        await loadOnnxModel(); 
        if (!session) { 
            throw new Error("ONNX session is still not initialized after attempting reload.");
        }
    } catch(e) {
         const errorMessage = (e instanceof Error) ? e.message : String(e);
         return {
            classification: AnalysisResultType.ERROR,
            confidence: 0,
            segmentationMaskData: new Float32Array(0),
            imageWidth: 0,
            imageHeight: 0,
            inferenceTimeMs: 0,
            errorMessage: `Model not loaded and reload failed: ${errorMessage}`,
        };
    }
  }

  let startTime = 0;
  let endTime = 0;

  try {
    const { tensor: inputTensor, originalWidth, originalHeight } = await preprocessImage(imageFile);
    
    startTime = performance.now();
    const feeds = { "input_image": inputTensor }; 
    const results = await session.run(feeds);
    endTime = performance.now();
    
    const outputNames = session.outputNames;
    if (outputNames.length < 2) {
        throw new Error(`Model expected at least 2 outputs, but got ${outputNames.length}. Output names: ${outputNames.join(', ')}`);
    }

    const segmentationOutput = results[outputNames[0]]; 
    const classificationLogitsOutput = results[outputNames[1]];

    if (!segmentationOutput || !classificationLogitsOutput) {
        throw new Error("Model did not return expected outputs. Check ONNX model structure and output names.");
    }
    
    const segmentationMaskData = segmentationOutput.data as Float32Array;
    const classLogits = classificationLogitsOutput.data as Float32Array; 
    
    const probs = softmax(classLogits);
    const classNames = [AnalysisResultType.NORMAL, AnalysisResultType.BENIGN, AnalysisResultType.MALIGNANT]; 
    
    let predIdx = 0;
    if (probs.length > 0) {
      predIdx = probs.indexOf(Math.max(...probs));
    } else {
      throw new Error("Softmax returned empty probabilities array.");
    }

    if (predIdx < 0 || predIdx >= classNames.length) {
        throw new Error(`Predicted index ${predIdx} is out of bounds for classNames array (length ${classNames.length}). Probabilities: [${probs.join(', ')}]`);
    }
    const predictedClass = classNames[predIdx];
    const confidence = probs[predIdx];
    const inferenceTimeMs = endTime - startTime;

    return {
      classification: predictedClass,
      confidence: confidence,
      segmentationMaskData: segmentationMaskData,
      imageWidth: originalWidth,
      imageHeight: originalHeight,
      inferenceTimeMs: inferenceTimeMs,
    };

  } catch (e) {
    console.error("Error during ONNX inference:", e);
    const errorMessage = (e instanceof Error) ? e.message : String(e);
    return {
      classification: AnalysisResultType.ERROR,
      confidence: 0,
      segmentationMaskData: new Float32Array(0),
      imageWidth: 0,
      imageHeight: 0,
      inferenceTimeMs: endTime > 0 && startTime > 0 ? endTime - startTime : 0, // if preprocess failed, times might be 0
      errorMessage: `Inference failed: ${errorMessage}`,
    };
  }
}