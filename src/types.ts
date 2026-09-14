export type SeasonId = 'primavara' | 'vara' | 'toamna' | 'iarna';

export interface SeasonData {
  id: SeasonId;
  name: string;
  order: number; // 0: Primavara, 1: Vara, 2: Toamna, 3: Iarna
  angle: number; // 0, 90, 180, 270 degrees
  title: string;
  quote: string; // "E rândul Primăverii!"
  natureDescription: string;
  treeDescription: string;
  nucaActivity: string;
  badgeColor: string;
  bgGradient: string;
  accentColor: string;
  iconName: string;
  temperature: string;
  months: string[];
  keyFeatures: string[];
  soundType: 'birds' | 'splash' | 'leaves' | 'wind';
}

export interface StoryPage {
  id: number;
  seasonId?: SeasonId;
  title: string;
  subtitle?: string;
  text: string;
  nucaQuote?: string;
  soundEffect: 'magic' | 'birds' | 'splash' | 'leaves' | 'wind' | 'cycle';
  questionPrompt?: string;
  illustrationType: 'intro' | 'primavara' | 'vara' | 'toamna' | 'iarna' | 'cycle';
}

export interface CraftMaterial {
  id: string;
  name: string;
  description: string;
  icon: string;
  ready: boolean;
}

export interface CraftStep {
  stepNumber: number;
  title: string;
  instruction: string;
  subInstructions?: string[];
  tip?: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  questionAudioText?: string;
  options: {
    id: string;
    text: string;
    seasonId?: SeasonId;
    icon: string;
    isCorrect: boolean;
    feedback: string;
  }[];
  explanation: string;
}

export interface ParentQuestion {
  id: string;
  question: string;
  purpose: string;
  suggestedDiscussion: string;
  ageRecommendation: string;
}
