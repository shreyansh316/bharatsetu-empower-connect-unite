import { useQuery } from '@tanstack/react-query';
import { useSchemeStore } from '../store/schemeStore';
import { db, syncSchemesToDB } from '../store/db';
import { Scheme } from '../types/scheme';

// In a real app, this would be a remote JSON URL (e.g., Cloudflare R2 or AWS S3)
// For now, we simulate fetching the 200 schemes payload.
const SCHEMES_API_URL = '/mock-schemes-200.json'; 

export const useSchemesSync = () => {
  const setSchemes = useSchemeStore((state) => state.setSchemes);
  
  return useQuery({
    queryKey: ['schemes', 'sync'],
    queryFn: async () => {
      console.log('Initiating 200-scheme sync process...');
      
      // 1. Try to load from local IndexedDB first (Instant Offline Load)
      const cachedSchemes = await db.schemes.toArray();
      if (cachedSchemes.length > 0) {
        console.log('Loaded schemes from local IndexedDB');
        setSchemes(cachedSchemes);
      }
      
      try {
        // 2. Fetch fresh data from network in background
        // Simulating network request for 200 schemes
        // const response = await fetch(SCHEMES_API_URL);
        // const rawText = await response.text(); 
        
        // --- Simulated Mock Data Generation (200 Schemes) ---
        const pillars = ['agriculture', 'education', 'health', 'finance', 'women', 'youth'];
        const mockData: Scheme[] = Array.from({ length: 200 }, (_, i) => ({
          id: `scheme-${i + 1}`,
          title: `National Welfare Scheme ${i + 1}`,
          description: `This is a highly detailed description for scheme ${i + 1}. It provides financial assistance, skill development, and infrastructure support to eligible citizens across rural and urban sectors of India.`,
          department: i % 2 === 0 ? 'Ministry of Social Justice' : 'Ministry of Rural Development',
          ministry: 'Govt of India',
          tags: ['welfare', 'subsidy', pillars[i % pillars.length]],
          pillar: pillars[i % pillars.length],
          icon: 'Shield',
          benefits: [
            `₹${(i + 1) * 1000} Direct Benefit Transfer`, 
            '100% Premium Cover',
            'Free Technical Training for 6 months'
          ],
          eligibility: [
            'Must be a resident of India',
            'Age between 18 and 60 years',
            `Annual family income less than ₹${(i % 5) + 2} Lakhs`
          ],
          documentsRequired: [
            'Aadhaar Card',
            'Income Certificate',
            'Bank Passbook (Front Page)',
            'Passport Size Photograph'
          ],
          lastUpdated: new Date().toISOString(),
          isActive: true
        }));
        const rawText = JSON.stringify(mockData);
        // --------------------------------------

        // 3. Offload parsing to Web Worker to avoid blocking UI thread
        return new Promise<Scheme[]>((resolve, reject) => {
          const worker = new Worker(new URL('../store/syncWorker.ts', import.meta.url), { type: 'module' });
          
          worker.onmessage = async (e) => {
            if (e.data.type === 'PARSE_SUCCESS') {
              const parsedSchemes: Scheme[] = e.data.data;
              
              // 4. Hydrate global Zustand store (Memory)
              setSchemes(parsedSchemes);
              
              // 5. Sync to IndexedDB for next offline visit
              await syncSchemesToDB(parsedSchemes);
              
              worker.terminate();
              resolve(parsedSchemes);
            } else {
              worker.terminate();
              reject(new Error(e.data.error));
            }
          };
          
          worker.postMessage({ type: 'PARSE_SCHEMES', payload: rawText });
        });

      } catch (err) {
        console.error('Network sync failed. Falling back to offline DB.', err);
        if (cachedSchemes.length > 0) return cachedSchemes;
        throw err;
      }
    },
    // Cache for 24 hours. We only need to check for scheme updates once a day.
    staleTime: 1000 * 60 * 60 * 24, 
    refetchOnWindowFocus: false,
  });
};
