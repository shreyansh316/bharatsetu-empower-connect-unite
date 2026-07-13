import React from 'react';
import { Scheme } from '../types/scheme';
import { SchemeCard } from './SchemeCard';
import { SchemeCardSkeleton } from './SchemeCardSkeleton';
import { useSchemesSync } from '../hooks/useSchemesSync';
import { useSchemeStore } from '../store/schemeStore';
import { useNavigate } from 'react-router-dom';

export const SchemeGrid: React.FC = () => {
  const { isLoading, error } = useSchemesSync();
  const getFilteredSchemes = useSchemeStore((state) => state.getFilteredSchemes);
  const navigate = useNavigate();
  
  // Use derived selector for filtering
  const schemes = getFilteredSchemes();

  if (error) {
    return (
      <div className="p-8 text-center glass rounded-3xl border border-red-500/20 text-red-400">
        <p>Failed to load the scheme database. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div 
        className="grid gap-6 grid-transition"
        style={{
          // Phase 2: Fluid grid handling up to 200 items efficiently
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
        }}
      >
        {isLoading && schemes.length === 0 ? (
          // Render 12 skeletons initially while loading
          <SchemeCardSkeleton count={12} />
        ) : (
          schemes.map((scheme, index) => (
            <SchemeCard 
              key={scheme.id} 
              scheme={scheme} 
              index={index} 
              onClick={(id) => navigate(`/scheme/${id}`)}
            />
          ))
        )}
      </div>
      
      {!isLoading && schemes.length === 0 && (
        <div className="py-20 text-center text-white/40">
          <p>No schemes found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
