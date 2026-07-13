import React from 'react';

export const SchemeCardSkeleton: React.FC<{ count?: number }> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="w-full h-[280px] rounded-3xl glass border border-white/5 overflow-hidden flex flex-col bg-[#050507]/40 backdrop-blur-[16px]"
        >
          {/* Top Graphic Skeleton */}
          <div className="h-24 w-full relative skeleton-pulse border-b border-white/5">
            <div className="absolute top-4 right-4 flex gap-2">
               <div className="w-16 h-6 rounded-full bg-white/5" />
               <div className="w-20 h-6 rounded-full bg-white/5" />
            </div>
            <div className="absolute -bottom-6 left-5 w-12 h-12 rounded-2xl bg-white/5 border border-white/10" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 px-5 pt-10 pb-4 flex flex-col gap-3">
            <div className="w-3/4 h-5 rounded-md bg-white/5 skeleton-pulse" />
            <div className="w-1/2 h-5 rounded-md bg-white/5 skeleton-pulse mb-2" />
            
            <div className="w-full h-3 rounded-md bg-white/5 skeleton-pulse mt-2" />
            <div className="w-5/6 h-3 rounded-md bg-white/5 skeleton-pulse" />

            <div className="flex items-center justify-between mt-auto pt-2">
              <div className="w-24 h-4 rounded-md bg-white/5 skeleton-pulse" />
              <div className="w-8 h-8 rounded-full bg-white/5 skeleton-pulse" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
