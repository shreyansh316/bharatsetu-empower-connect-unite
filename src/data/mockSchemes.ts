export type Category = 'All' | 'Yuva' | 'Nari Shakti' | 'Krishi & Rural' | 'Swasthya' | 'Arthik & MSME' | 'Infrastructure' | 'Education';

export interface LauncherScheme {
  id: string;
  titleEnglish: string;
  titleHindi: string;
  description: string;
  metricText: string;
  metricValue: string;
  category: Category;
  isActive: boolean;
  // Fallbacks for SchemeDetailPage backward compatibility
  title?: string;
  pillar?: string;
  department?: string;
  tags?: string[];
}

export const CATEGORIES: Category[] = ['Yuva', 'Nari Shakti', 'Krishi & Rural', 'Swasthya', 'Arthik & MSME', 'Infrastructure', 'Education'];
const METRIC_TEXTS = ["Target Beneficiaries", "Fund Allocated", "Active Applications", "Success Rate"];

const generateMockSchemes = (): LauncherScheme[] => {
  const schemes: LauncherScheme[] = [];
  
  for (let i = 1; i <= 300; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    
    schemes.push({
      id: `l-scheme-${i}`,
      titleEnglish: `${category} Empowerment Initiative ${i}`,
      titleHindi: `${category} सशक्तिकरण योजना ${i}`,
      description: `A highly scalable government welfare program designed to boost infrastructure, financial inclusion, and individual prosperity in the ${category} sector.`,
      metricText: METRIC_TEXTS[i % METRIC_TEXTS.length],
      metricValue: `${(Math.random() * 50 + 1).toFixed(1)}${i % 2 === 0 ? 'Cr+' : 'L+'}`,
      category,
      isActive: i % 15 !== 0, // 1 in 15 inactive
      // Compatibility fields for the Detail Page Engine
      title: `${category} Empowerment Initiative ${i}`,
      pillar: category,
      department: `Ministry of ${category}`,
      tags: [category, 'Empowerment', 'Welfare']
    });
  }
  
  return schemes;
};

export const SCHEMES_DB = generateMockSchemes();
