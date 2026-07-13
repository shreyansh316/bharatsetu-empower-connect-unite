// Web Worker for processing massive JSON payloads (200+ schemes) off the main UI thread.
// This ensures that parsing a large 5MB+ JSON file doesn't freeze the React render cycle,
// maintaining silky smooth 60fps animations.

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'PARSE_SCHEMES') {
    try {
      // Parse the large JSON string
      const parsedData = JSON.parse(payload);
      
      // We can also perform heavy mapping/sanitization here before sending to main thread
      const sanitizedData = parsedData.map((scheme: any) => ({
        ...scheme,
        // Ensure arrays exist
        tags: Array.isArray(scheme.tags) ? scheme.tags : [],
        benefits: Array.isArray(scheme.benefits) ? scheme.benefits : [],
        eligibility: Array.isArray(scheme.eligibility) ? scheme.eligibility : [],
        documentsRequired: Array.isArray(scheme.documentsRequired) ? scheme.documentsRequired : [],
        // Normalize searchable text for the Fuse.js index
        _searchableText: `${scheme.title} ${scheme.description} ${(scheme.tags || []).join(' ')}`.toLowerCase()
      }));

      // Send the processed, ready-to-use data back to Zustand
      self.postMessage({
        type: 'PARSE_SUCCESS',
        data: sanitizedData
      });
    } catch (error: any) {
      self.postMessage({
        type: 'PARSE_ERROR',
        error: error.message || 'Failed to parse scheme JSON payload'
      });
    }
  }
};
