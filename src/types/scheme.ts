export interface DocumentRequirement {
  id: string;
  name: string;
  type: 'identity' | 'income' | 'address' | 'education' | 'other';
  isRequired: boolean;
}

export interface EligibilityCriteria {
  minAge?: number;
  maxAge?: number;
  maxIncomeLakhs?: number;
  minIncomeLakhs?: number;
  gender?: 'any' | 'male' | 'female' | 'transgender';
  states?: string[]; // Empty means all states
  categories?: string[]; // SC, ST, OBC, General
  occupation?: string[];
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  department: string;
  ministry: string;
  tags: string[];
  pillar: string; // The main category (e.g., 'agriculture', 'education')
  icon: string; // Icon name for Lucide/SVG mapping
  benefits: string[];
  eligibility: EligibilityCriteria;
  documentsRequired: DocumentRequirement[];
  vectorEmbeddings?: number[]; // For TF-IDF / NLP search
  lastUpdated: string;
  deadline?: string;
  isActive: boolean;
}

export interface UserContextState {
  incomeLakhs: number | null;
  age: number | null;
  state: string | null;
  category: string | null;
  occupation: string | null;
}
