import React, { useRef, useState } from 'react';
import { Scheme } from '../types/scheme';
import { ArrowRight, Clock, ShieldCheck, MapPin, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSchemeStore } from '../store/schemeStore';

interface SchemeCardProps {
  scheme: Scheme;
  index: number;
  onClick: (id: string) => void;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const toggleBookmark = useSchemeStore((state) => state.toggleBookmark);
  const bookmarkedSchemes = useSchemeStore((state) => state.bookmarkedSchemes);
  const isBookmarked = bookmarkedSchemes.includes(scheme.id);

  // Use a stable pseudo-random color based on the scheme ID
  const getColor = (id: string) => {
    const colors = ['#22d3ee', '#818cf8', '#34d399', '#fbbf24', '#f472b6'];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const colorHex = getColor(scheme.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20; // Reduce divisor for more extreme tilt
    const tiltY = (centerX - x) / 20;
    
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`relative rounded-3xl cursor-pointer group scheme-card-3d`}
      style={{ 
        animationDelay: `${index * 50}ms`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(scheme.id)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${scheme.title}`}
    >
      {/* Animated Glowing Border Mask (Phase 2 feature) */}
      <div 
        className={`absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}
        style={{ 
          background: `linear-gradient(135deg, ${colorHex}50, transparent, ${colorHex}50)`,
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />
      
      {/* Main Glassmorphic Body */}
      <div className="absolute inset-0 rounded-3xl glass border border-white/5 overflow-hidden flex flex-col h-full bg-[#050507]/40 backdrop-blur-[16px]">
        
        {/* Top Graphic / Ambient Glow */}
        <div className="h-24 w-full relative">
          <div className="absolute inset-0 opacity-20 transition-opacity duration-300" style={{ background: `radial-gradient(circle at top right, ${colorHex}, transparent 70%)`, opacity: isHovered ? 0.4 : 0.2 }} />
          <div className="absolute top-4 right-4 flex gap-2 items-center">
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 toggleBookmark(scheme.id);
               }}
               className={`p-1.5 rounded-full backdrop-blur-md border border-white/10 transition-colors ${
                 isBookmarked ? 'bg-orange-500/20 text-orange-500' : 'bg-black/20 text-white/50 hover:bg-white/10 hover:text-white'
               }`}
             >
               <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
             </button>
             {scheme.eligibility.gender === 'female' && (
                <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/20 text-[10px] h-6">Women</Badge>
             )}
             <Badge variant="outline" className="bg-white/5 text-white/70 border-white/10 text-[10px] h-6 capitalize">
               {scheme.pillar}
             </Badge>
          </div>
          <div className="absolute -bottom-6 left-5 w-12 h-12 rounded-2xl glass-strong border border-white/10 flex items-center justify-center shadow-lg">
             <ShieldCheck className="w-6 h-6" style={{ color: colorHex }} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 pt-8 pb-4 flex flex-col font-vernacular">
          <h3 className="fluid-title font-bold text-white mb-1 line-clamp-2 leading-tight">
            {scheme.title}
          </h3>
          <p className="text-white/50 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">
            {scheme.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3">
               <div className="flex items-center text-white/40 text-[10px]">
                 <Clock className="w-3 h-3 mr-1" />
                 {scheme.isActive ? 'Active' : 'Closed'}
               </div>
               {scheme.eligibility.states && scheme.eligibility.states.length > 0 && (
                 <div className="flex items-center text-white/40 text-[10px]">
                   <MapPin className="w-3 h-3 mr-1" />
                   State specific
                 </div>
               )}
            </div>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'bg-white/20 scale-110' : 'bg-white/5'}`}>
               <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
