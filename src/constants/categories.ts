import { 
  Briefcase, HeartPulse, Scale, ShieldAlert, GraduationCap, 
  Sprout, Accessibility, Zap, Home, TrendingUp
} from 'lucide-react';

export const SCHEME_PILLARS = [
  { id: 'employment', label: 'Youth & Employment', icon: Briefcase, color: '#3b82f6' }, // Blue
  { id: 'health', label: 'Health & Wellness', icon: HeartPulse, color: '#ef4444' }, // Red
  { id: 'legal', label: 'Justice & Legal', icon: Scale, color: '#8b5cf6' }, // Purple
  { id: 'women', label: 'Women Empowerment', icon: ShieldAlert, color: '#ec4899' }, // Pink
  { id: 'education', label: 'Education & Skills', icon: GraduationCap, color: '#f59e0b' }, // Amber
  { id: 'agriculture', label: 'Agriculture', icon: Sprout, color: '#10b981' }, // Emerald
  { id: 'disability', label: 'Divyang Sahayak', icon: Accessibility, color: '#06b6d4' }, // Cyan
  { id: 'infrastructure', label: 'Energy & Infrastructure', icon: Zap, color: '#f97316' }, // Orange
  { id: 'housing', label: 'Housing & Shelter', icon: Home, color: '#64748b' }, // Slate
  { id: 'msme', label: 'MSME & Business', icon: TrendingUp, color: '#FF9933' }, // Saffron
];
