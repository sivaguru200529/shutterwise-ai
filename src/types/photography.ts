export type TopicSlug =
  | "iso"
  | "aperture"
  | "shutter-speed"
  | "exposure-triangle"
  | "lighting-fundamentals"
  | "photography-troubleshooting";

export type DifficultyLevel = "Beginner" | "Beginner to Intermediate" | "Intermediate";

export interface PracticalExample {
  title: string;
  setting: string;
  scenario: string;
  explanation: string;
  badge?: string;
}

export interface ScenarioSetting {
  scenario: string;
  iso: string;
  aperture: string;
  shutterSpeed: string;
  whyItWorks: string;
  adjustments: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TroubleshootingItem {
  id: string;
  title: string;
  symptom: string;
  possibleCauses: string[];
  howToIdentify: string;
  stepByStepSolution: string[];
  recommendedAdjustments: {
    iso?: string;
    aperture?: string;
    shutterSpeed?: string;
    technique?: string;
  };
  practicalExample: string;
  aiPrompt: string;
}

export interface TopicModule {
  slug: TopicSlug;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedMinutes: number;
  iconName: string;
  keyPrinciples: string[];
  contentSections: {
    title: string;
    content: string;
    highlightBox?: {
      title: string;
      text: string;
      type?: "info" | "tip" | "warning";
    };
  }[];
  practicalExamples?: PracticalExample[];
  scenarios?: ScenarioSetting[];
  troubleshootingItems?: TroubleshootingItem[];
  commonMistakes: {
    mistake: string;
    correction: string;
  }[];
  quizQuestions: QuizQuestion[];
  suggestedAiPrompts: string[];
}
