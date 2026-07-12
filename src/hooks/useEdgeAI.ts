import { useState, useEffect, useCallback } from 'react';
import * as ort from 'onnxruntime-web';

// Configure ONNX Runtime to use WASM
ort.env.wasm.numThreads = 1; // Single thread to save memory on budget devices
// ort.env.wasm.wasmPaths = '...'; // Add if self-hosting wasm binaries

export const useEdgeAI = (modelUrl: string) => {
  const [session, setSession] = useState<ort.InferenceSession | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let active = true;

    const loadModel = async () => {
      try {
        setIsLoading(true);
        // Load the model as an InferenceSession
        const inferenceSession = await ort.InferenceSession.create(modelUrl, {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all'
        });
        
        if (active) {
          setSession(inferenceSession);
          setIsReady(true);
          setIsLoading(false);
        }
      } catch (err: any) {
        if (active) {
          console.error("Failed to load ONNX model:", err);
          setError(err);
          setIsLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      active = false;
    };
  }, [modelUrl]);

  const runInference = useCallback(async (inputTensor: ort.Tensor) => {
    if (!session) {
      throw new Error("Model is not loaded yet.");
    }
    
    // Create feeds with the input name expected by the model
    // Note: The input name might vary based on the specific model
    const inputName = session.inputNames[0];
    const feeds = { [inputName]: inputTensor };
    
    const results = await session.run(feeds);
    return results;
  }, [session]);

  return {
    isReady,
    isLoading,
    error,
    runInference
  };
};
