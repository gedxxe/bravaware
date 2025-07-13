
export enum AnalysisResultType {
  MALIGNANT = 'Malignant',
  BENIGN = 'Benign',
  NORMAL = 'Normal',
  ERROR = 'Error', // For general errors like file read, model load
  NONE = 'None',   // Initial state or before analysis
}

// Replaces the old AnalysisData structure
export interface OnnxAnalysisOutput {
  classification: AnalysisResultType;
  confidence: number; // 0.0 to 1.0
  // Raw segmentation mask data from ONNX model, expected to be Float32Array from model output
  segmentationMaskData: Float32Array; 
  imageWidth: number;  // Width of the input image, needed for rendering mask
  imageHeight: number; // Height of the input image, needed for rendering mask
  inferenceTimeMs?: number; // Optional: duration of the ONNX model inference in milliseconds
  errorMessage?: string; // Optional error message if ONNX processing fails
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
}

export enum ToolState {
  INITIAL_LOADING,      // Loading the ONNX model
  READY_FOR_UPLOAD,     // Model loaded, ready for user to upload image
  PROCESSING_IMAGE,     // Image uploaded, preprocessing and running ONNX inference
  SHOWING_RESULTS,      // Inference complete, showing results
  PROCESSING_ERROR,     // An error occurred during model load or inference
}