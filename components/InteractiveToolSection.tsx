
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { OnnxAnalysisOutput, AnalysisResultType, ToolState } from '../types';
import { loadOnnxModel, runOnnxInference } from '../services/onnxService';
import Button from './common/Button';
import GlassCard from './common/GlassCard';
import Slider from './common/Slider'; // Import the new Slider component
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB } from '../constants';

// Helper: Upload Icon SVG
const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-12 h-12 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

// Helper: Spinner Icon SVG
const SpinnerIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={`animate-spin h-8 w-8 text-white ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const InteractiveToolSection: React.FC = () => {
  const [toolState, setToolState] = useState<ToolState>(ToolState.INITIAL_LOADING);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<OnnxAnalysisOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement>(null);
  const [segmentationThreshold, setSegmentationThreshold] = useState<number>(0.5); // State for threshold

  useEffect(() => {
    // Load the ONNX model when the component mounts
    setToolState(ToolState.INITIAL_LOADING);
    loadOnnxModel()
      .then(() => {
        setToolState(ToolState.READY_FOR_UPLOAD);
        setError(null);
      })
      .catch((e: any) => {
        console.error("Failed to initialize ONNX model:", e);
        setError(e.message || "Failed to load the local analysis model. Please refresh the page or check console.");
        setToolState(ToolState.PROCESSING_ERROR);
      });
  }, []);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError(`Invalid file type. Please upload an image (${ACCEPTED_IMAGE_TYPES.join(', ')}).`);
        setUploadedImageFile(null);
        setImagePreviewUrl(null);
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        setUploadedImageFile(null);
        setImagePreviewUrl(null);
        return;
      }
      setError(null);
      setUploadedImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setToolState(ToolState.PROCESSING_IMAGE); 
      submitImageForAnalysis(file);
    }
  };

  const submitImageForAnalysis = useCallback(async (imageFile: File) => {
    setToolState(ToolState.PROCESSING_IMAGE);
    setError(null);
    setAnalysisResult(null); 
    try {
      const result = await runOnnxInference(imageFile);
      setAnalysisResult(result);
      if (result.classification === AnalysisResultType.ERROR) {
        setError(result.errorMessage || "An unknown error occurred during analysis.");
        setToolState(ToolState.PROCESSING_ERROR);
      } else {
        setToolState(ToolState.SHOWING_RESULTS);
      }
    } catch (e: any) {
      console.error("Analysis submission error:", e);
      setError(e.message || "Failed to analyze image.");
      setToolState(ToolState.PROCESSING_ERROR);
      setAnalysisResult(null);
    }
  }, []);
  
  // Draw result on canvas when analysisResult and imagePreviewUrl are available
  useEffect(() => {
    if (toolState === ToolState.SHOWING_RESULTS && analysisResult && imagePreviewUrl && resultCanvasRef.current) {
      const canvas = resultCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError("Failed to get canvas context for displaying results.");
        setToolState(ToolState.PROCESSING_ERROR);
        return;
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = analysisResult.imageWidth;
        canvas.height = analysisResult.imageHeight;
        
        // Draw the original image
        ctx.drawImage(img, 0, 0, analysisResult.imageWidth, analysisResult.imageHeight);

        // Overlay the segmentation mask
        if (analysisResult.segmentationMaskData && analysisResult.segmentationMaskData.length > 0) {
          const maskData = analysisResult.segmentationMaskData;
          const { imageWidth, imageHeight } = analysisResult;
          
          const maskCanvas = document.createElement('canvas');
          maskCanvas.width = imageWidth;
          maskCanvas.height = imageHeight;
          const maskCtx = maskCanvas.getContext('2d');
          if (!maskCtx) return;

          const maskImageData = maskCtx.createImageData(imageWidth, imageHeight);
          const thresholdToUse = segmentationThreshold; // Use state variable for threshold
          const overlayColor = [255, 0, 0]; 

          for (let y = 0; y < imageHeight; y++) {
            for (let x = 0; x < imageWidth; x++) {
              const maskValue = maskData[y * imageWidth + x];
              if (maskValue > thresholdToUse) { // Use dynamic threshold
                const pixelIndex = (y * imageWidth + x) * 4;
                maskImageData.data[pixelIndex] = overlayColor[0];     // R
                maskImageData.data[pixelIndex + 1] = overlayColor[1]; // G
                maskImageData.data[pixelIndex + 2] = overlayColor[2]; // B
                maskImageData.data[pixelIndex + 3] = 102; // Alpha (0.4 * 255 = 102)
              }
            }
          }
          maskCtx.putImageData(maskImageData, 0, 0);
          ctx.drawImage(maskCanvas, 0, 0); 
        }
      };
      img.onerror = () => {
        setError("Failed to load image for result display.");
        setToolState(ToolState.PROCESSING_ERROR);
      };
      img.src = imagePreviewUrl;
    }
  }, [toolState, analysisResult, imagePreviewUrl, segmentationThreshold]); // Added segmentationThreshold to dependencies


  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (toolState === ToolState.READY_FOR_UPLOAD || toolState === ToolState.PROCESSING_ERROR) {
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
        handleFileChange(event.dataTransfer.files);
        event.dataTransfer.clearData();
        }
    }
  };

  const resetTool = () => {
    setUploadedImageFile(null);
    if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    setSegmentationThreshold(0.5); // Reset threshold
    if (toolState !== ToolState.INITIAL_LOADING) {
         setToolState(ToolState.READY_FOR_UPLOAD);
    }
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
    }
  };
  
  const getResultColor = (classification: AnalysisResultType) => {
    switch (classification) {
      case AnalysisResultType.MALIGNANT: return 'text-red-400';
      case AnalysisResultType.BENIGN: return 'text-green-400';
      case AnalysisResultType.NORMAL: return 'text-white';
      default: return 'text-gray-400';
    }
  };

  const renderContent = () => {
    switch (toolState) {
      case ToolState.INITIAL_LOADING:
        return (
          <div className="text-center py-12">
            <SpinnerIcon className="mx-auto mb-4 h-12 w-12 text-[#7a5af7]" />
            <p className="text-xl font-semibold animate-pulse text-gray-300">Loading Local Analysis Model...</p>
            <p className="text-sm text-gray-400 mt-2">Preparing analysis engine. Please wait.</p>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-6 relative">
                 <div className="h-full bg-gradient-to-r from-[#7a5af7] via-[#e18aaa] to-[#7a5af7] animate-indeterminate-progress"></div>
            </div>
          </div>
        );
      case ToolState.READY_FOR_UPLOAD:
        return (
          <div 
            className="text-center py-8 md:py-12 border-2 border-dashed border-gray-500 hover:border-[#7a5af7] rounded-xl transition-colors duration-300 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Upload image for analysis"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files)}
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              className="hidden"
              aria-hidden="true"
            />
            <UploadIcon className="mx-auto text-gray-400 group-hover:text-[#7a5af7] transition-colors" />
            <p className="mt-4 text-xl font-semibold text-gray-200">Upload an USG Image for Analysis</p>
            <p className="text-sm text-gray-400 mt-1">Drag & drop or click to select a file</p>
            <p className="text-xs text-gray-500 mt-2">Supported: {ACCEPTED_IMAGE_TYPES.map(t => t.split('/')[1].toUpperCase()).join(', ')}. Max {MAX_FILE_SIZE_MB}MB.</p>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
          </div>
        );
      case ToolState.PROCESSING_IMAGE:
        return (
          <div className="text-center py-12">
            <SpinnerIcon className="mx-auto mb-4 h-12 w-12 text-[#7a5af7]" />
            <p className="text-xl font-semibold text-gray-300">Analyzing Image...</p>
            <p className="text-sm text-gray-400 mt-2">Please wait while the local AI processes your image.</p>
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="Processing" className="mt-6 mx-auto max-h-64 rounded-lg shadow-lg opacity-50" />
            )}
          </div>
        );
      case ToolState.SHOWING_RESULTS:
        if (!analysisResult || !imagePreviewUrl) {
            setError("Error displaying results. Required data is missing.");
            setToolState(ToolState.PROCESSING_ERROR);
            return null; 
        }
        return (
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white mb-1">Analysis Results</h3>
               {imagePreviewUrl && (
                 <div className="relative group aspect-square max-w-xs mx-auto md:mx-0 rounded-lg shadow-lg mb-4 overflow-hidden border border-gray-600">
                    <img src={imagePreviewUrl} alt="Uploaded for analysis" className="w-full h-full object-contain" />
                 </div>
                )}
              <div className="space-y-2 text-lg">
                <p><strong>Result:</strong> <span className={`${getResultColor(analysisResult.classification)} font-bold`}>{analysisResult.classification}</span></p>
                <p><strong>Confidence:</strong> <span className="text-white font-medium">{(analysisResult.confidence * 100).toFixed(1)}%</span></p>
                {analysisResult.inferenceTimeMs !== undefined && (
                  <p><strong>Inference Time:</strong> <span className="text-white font-medium">{(analysisResult.inferenceTimeMs / 1000).toFixed(2)} s</span></p>
                )}
              </div>
              <Button onClick={resetTool} variant="outline" className="mt-6 w-full sm:w-auto">Analyze Another Image</Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Segmentation Output</h3>
              <div className="relative aspect-square max-w-md mx-auto md:mx-0 bg-black rounded-lg overflow-hidden shadow-xl border border-gray-600">
                <canvas ref={resultCanvasRef} className="w-full h-full object-contain" aria-label="Image with segmentation mask overlay"></canvas>
              </div>
              <Slider
                label="Segmentation Threshold:"
                min={0.05}
                max={0.95}
                step={0.01}
                value={segmentationThreshold}
                onChange={(e) => setSegmentationThreshold(parseFloat(e.target.value))}
                className="mt-2"
              />
               <p className="text-xs text-gray-500 mt-1 text-center md:text-left">
                Adjust sensitivity of the (red) overlay. Current threshold: {segmentationThreshold.toFixed(2)}.
               </p>
            </div>
          </div>
        );
      case ToolState.PROCESSING_ERROR:
        return (
           <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-red-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            <p className="text-xl font-semibold text-red-400">Processing Failed</p>
            <p className="text-sm text-gray-300 mt-2 max-w-md mx-auto">{error || "An unexpected error occurred. Please try again or check console."}</p>
            <Button onClick={resetTool} variant="secondary" className="mt-8">Try Again</Button>
          </div>
        );
      default:
        return <p>Unknown state. Please refresh.</p>;
    }
  };

  return (
    <section id="interactive-tool" className="pt-40 pb-12">
      <h2 className="text-4xl sm:text-2xl font-bold text-center mb-10 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-violet-300">
        Powered by U-Net: Convolutional Networks Architecture for Biomedical Image Segmentation
      </h2>
      <GlassCard 
        className="max-w-xl lg:max-w-4xl mx-auto min-h-[300px] flex flex-col justify-center"
        pulsatingBorder={toolState === ToolState.INITIAL_LOADING || toolState === ToolState.PROCESSING_IMAGE}
      >
        {renderContent()}
      </GlassCard>
    </section>
  );
};

export default InteractiveToolSection;