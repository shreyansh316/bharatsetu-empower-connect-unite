/**
 * Phase 4: Advanced NLP & Search
 * 
 * True client-side vector similarity search using ONNX Runtime.
 * In a production environment, this would load a quantized MiniLM
 * model via WASM to generate 384-dimensional embeddings locally.
 * 
 * For this implementation, we simulate the TF-IDF / Embedding generation
 * and perform actual Cosine Similarity math to rank the schemes.
 */

import { Scheme } from '../types/scheme';

// Represents a mathematical vector
type Vector = number[];

// Helper to calculate Cosine Similarity between two vectors
const cosineSimilarity = (vecA: Vector, vecB: Vector): number => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Mocks ONNX Runtime generating a vector embedding from text
const generateEmbedding = (text: string): Vector => {
  // In reality: const tensor = await session.run({ input: textTensor });
  // We simulate an embedding by hashing characters into a 32-dim space
  const vec = new Array(32).fill(0);
  const normalized = text.toLowerCase();
  
  for (let i = 0; i < normalized.length; i++) {
    const charCode = normalized.charCodeAt(i);
    vec[charCode % 32] += 1;
  }
  
  return vec;
};

export const performVectorSearch = (query: string, allSchemes: Scheme[]): Scheme[] => {
  if (!query.trim()) return allSchemes;
  
  // console.log('[ONNX Web] Generating embedding for query:', query);
  const queryVector = generateEmbedding(query);
  
  const scoredSchemes = allSchemes.map((scheme) => {
    // Combine searchable text
    const textToEmbed = `${scheme.title} ${scheme.description} ${(scheme.tags || []).join(' ')} ${scheme.department}`;
    const schemeVector = generateEmbedding(textToEmbed);
    
    // Calculate Cosine Similarity
    const score = cosineSimilarity(queryVector, schemeVector);
    return { scheme, score };
  });
  
  // Sort by highest similarity
  return scoredSchemes
    .filter(res => res.score > 0.3) // Similarity Threshold
    .sort((a, b) => b.score - a.score)
    .map(res => res.scheme);
};
