export type Subject = 
  | 'Mathématiques'
  | 'Physique-Chimie'
  | 'SVT'
  | 'Français'
  | 'Anglais'
  | 'Histoire-Géo'
  | 'Philosophie'
  | 'EPS'
  | 'Allemand' // Added for high school
  | 'Espagnol'; // Added for high school

export type GradeLevel = '6ème' | '5ème' | '4ème' | '3ème' | 'Seconde' | 'Première' | 'Terminale';

export interface GradeEntry {
  subject: Subject | string; // Allow string for specific technical subjects
  grade: number;
}

export interface YearGrades {
  level: GradeLevel;
  grades: GradeEntry[];
  average: number;
}

export interface StudentProfile {
  name: string;
  age: number;
  gender: 'M' | 'F';
  school: string;
  gradesHistory: YearGrades[];
  bepcGrades: GradeEntry[];
  bepcAverage: number;
  preferredSeries: string;
  motivation: string;
  hobbies: string;
}

export interface SeriesRecommendation {
  series: string;
  score: number; // 0-100
  matchReason: string;
}

export interface Testimonial {
  author: string;
  role: string;
  quote: string;
}

export interface UsefulLink {
  title: string;
  url: string;
}

export interface AnalysisResult {
  recommendedSeries: string;
  top3Series: SeriesRecommendation[];
  bacSuccessProbability: number; // 0-100
  bacMentionProbability: number; // 0-100
  projectedBacAverage?: number; // Added
  suitableUniversityMajors?: string[]; // Added
  futureJobOpportunities?: string[]; // Added
  estimatedIncomeLevel?: string; // Added
  motivationMessage: string;
  risks: string[];
  improvementTips: string[];
  analysis: {
    regularity: string;
    dominance: string;
    progression: string;
  };
  testimonials: Testimonial[];
  usefulLinks: UsefulLink[];
}

// Post-BAC Types

export interface PostBacProfile {
  name: string;
  age: number;
  gender: 'M' | 'F';
  school: string;
  bacSeries: string;
  gradesHistory: YearGrades[]; // Seconde, Première, Terminale
  bacGrades: GradeEntry[];
  bacAverage: number;
  preferredFields: string;
  motivation: string;
  hobbies: string;
}

export interface UniversityMajorRecommendation {
  major: string;
  score: number;
  matchReason: string;
}

export interface UniversityAnalysisResult {
  recommendedMajors: UniversityMajorRecommendation[]; // Changed from top5Majors to support 10+
  successProbability: number;
  justification: string;
  opportunities: string[]; // Débouchés (10+)
  employabilityRating: string;
  strategicAdvice: string[];
  testimonials: Testimonial[];
  usefulLinks: UsefulLink[];
  universities: {
    burkinaPublic: string[];
    burkinaPrivate: string[];
    africa: string[];
    europe: string[];
    usa: string[];
    asia: string[];
    canada: string[];
  };
}

export interface SavedProject {
  id: string;
  userId: string; // For future backend integration
  type: 'bepc' | 'bac';
  name: string; // e.g. "Simulation BEPC - Jean"
  date: string; // ISO string
  profile: StudentProfile | PostBacProfile;
  result: AnalysisResult | UniversityAnalysisResult;
}
