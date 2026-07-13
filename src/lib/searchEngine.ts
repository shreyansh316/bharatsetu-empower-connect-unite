import Fuse from 'fuse.js';
import { Scheme } from '../types/scheme';

const FUSE_OPTIONS = {
  // Deep weighting: Title matches are most important, then tags, then description
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'tags', weight: 0.3 },
    { name: 'description', weight: 0.1 },
    { name: 'department', weight: 0.1 }
  ],
  includeScore: true,
  threshold: 0.4, // Lower is more strict. 0.4 allows some fuzzy typos (e.g. "frm" -> "farm")
  ignoreLocation: true, // Search anywhere in the string
  useExtendedSearch: true
};

let fuseInstance: Fuse<Scheme> | null = null;

// Initialize the index once with the massive 200 array
export const initSearchIndex = (schemes: Scheme[]) => {
  fuseInstance = new Fuse(schemes, FUSE_OPTIONS);
  console.log('NLP Search Index Initialized with', schemes.length, 'records.');
};

export const searchSchemes = (query: string, allSchemes: Scheme[]): Scheme[] => {
  if (!query.trim()) return allSchemes;
  
  if (!fuseInstance) {
    initSearchIndex(allSchemes);
  } else {
    // If we've dynamically added new schemes to the local DB, we need to update the collection
    // For now, assume collection is static after load
  }
  
  const results = fuseInstance!.search(query);
  
  // Return just the matching items, dropping the metadata/scores for the UI component
  return results.map(result => result.item);
};
