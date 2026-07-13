import { create } from 'zustand';
import { produce } from 'immer';
import { Scheme, UserContextState } from '../types/scheme';

import { performVectorSearch } from '../lib/vectorSearch';
import { syncProfileToCloud } from '../lib/firebaseSync';

interface SchemeState {
  // We use a Map-like object structure for O(1) lookups
  schemes: Record<string, Scheme>;
  isLoading: boolean;
  error: string | null;
  
  // User context and active filters
  userContext: UserContextState;
  activePillars: string[];
  searchQuery: string;
  activeSchemeId: string | null;
  bookmarkedSchemes: string[];
  
  // Actions
  setSchemes: (schemesList: Scheme[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  updateUserContext: (updates: Partial<UserContextState>) => void;
  togglePillar: (pillarId: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveSchemeId: (id: string | null) => void;
  toggleBookmark: (schemeId: string) => void;
  
  // Derived state getters
  getSchemeById: (id: string) => Scheme | undefined;
  getFilteredSchemes: () => Scheme[];
}

export const useSchemeStore = create<SchemeState>((set, get) => ({
  schemes: {},
  isLoading: false,
  error: null,
  activePillars: [],
  searchQuery: '',
  activeSchemeId: null,
  bookmarkedSchemes: [],
  
  userContext: {
    incomeLakhs: null,
    age: null,
    state: null,
    category: null,
    occupation: null,
  },
  
  // Hydrates the store with the massive 200 array, mapping it to a Record
  setSchemes: (schemesList) => set(produce((state: SchemeState) => {
    state.schemes = schemesList.reduce((acc, scheme) => {
      acc[scheme.id] = scheme;
      return acc;
    }, {} as Record<string, Scheme>);
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setActiveSchemeId: (id) => set({ activeSchemeId: id }),
  
  updateUserContext: (updates) => {
    set(produce((state: SchemeState) => {
      state.userContext = { ...state.userContext, ...updates };
    }));
    // Async trigger to our Firebase Placeholder for Phase 9 Cross-Device Sync
    syncProfileToCloud({
      uid: 'anonymous-user-123',
      context: get().userContext,
      bookmarkedSchemes: get().bookmarkedSchemes
    }).catch(console.error);
  },
  
  toggleBookmark: (schemeId) => {
    set(produce((state: SchemeState) => {
      if (state.bookmarkedSchemes.includes(schemeId)) {
        state.bookmarkedSchemes = state.bookmarkedSchemes.filter(id => id !== schemeId);
      } else {
        state.bookmarkedSchemes.push(schemeId);
      }
    }));
    // Async trigger to our Firebase Placeholder
    syncProfileToCloud({
      uid: 'anonymous-user-123',
      context: get().userContext,
      bookmarkedSchemes: get().bookmarkedSchemes
    }).catch(console.error);
  },
  
  togglePillar: (pillarId) => set(produce((state: SchemeState) => {
    if (state.activePillars.includes(pillarId)) {
      state.activePillars = state.activePillars.filter(p => p !== pillarId);
    } else {
      state.activePillars.push(pillarId);
    }
  })),
  
  getSchemeById: (id) => get().schemes[id],
  
  getFilteredSchemes: () => {
    const { schemes, searchQuery, activePillars } = get();
    const schemesArray = Object.values(schemes);
    
    // 1. NLP Vector Search
    let filtered = searchQuery
      ? performVectorSearch(searchQuery, schemesArray)
      : schemesArray;
    
    // 2. Category Filter Phase
    if (activePillars.length > 0) {
      filtered = filtered.filter(scheme => activePillars.includes(scheme.pillar));
    }
    
    return filtered;
  },
}));
