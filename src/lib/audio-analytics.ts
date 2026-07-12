import * as ort from 'onnxruntime-web';

/**
 * Utility functions for Audio Analytics preprocessing
 * For models like NariShakti SOS detection.
 */

// Example: Convert Float32Array audio buffer to ONNX Tensor
export const prepareAudioTensor = (audioData: Float32Array): ort.Tensor => {
  // Most audio classification models expect a specific shape, e.g. [batch_size, sequence_length] or [batch_size, features]
  // We'll assume a dummy shape [1, audioData.length] for illustration.
  
  const tensor = new ort.Tensor('float32', audioData, [1, audioData.length]);
  return tensor;
};

// Example: Mock logic to extract features (like MFCCs) if needed before inference
export const extractAudioFeatures = async (audioBlob: Blob): Promise<Float32Array> => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  // Read blob into array buffer
  const arrayBuffer = await audioBlob.arrayBuffer();
  
  // Decode audio data
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  // Get raw PCM data from the first channel
  const rawData = audioBuffer.getChannelData(0);
  
  // In a real scenario, you might downsample or extract MFCCs here.
  return rawData;
};

// Evaluate the results of the model
export const evaluateSOS = (results: any): boolean => {
  // Assume the model outputs a probability tensor for 'distress' class
  const outputName = Object.keys(results)[0];
  const outputTensor = results[outputName];
  
  // Example thresholding
  const probabilities = outputTensor.data as Float32Array;
  const distressProbability = probabilities[1]; // assuming index 1 is distress
  
  return distressProbability > 0.85;
};
