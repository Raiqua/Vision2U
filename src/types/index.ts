export type StageId =
  | 'landing'
  | 'input'
  | 'discovery'
  | 'brand_dna'
  | 'brand_worlds'
  | 'challenge'
  | 'guardian'
  | 'launch'
  | 'export';

export type ProductType =
  | 'Startup'
  | 'Product'
  | 'App'
  | 'Community'
  | 'Creator brand'
  | 'Service'
  | 'Other';

export type IdeaStage =
  | 'Just an idea'
  | 'Prototype'
  | 'Existing product'
  | 'Existing brand';

export interface IdeaInputData {
  rawIdea: string;
  productType: ProductType;
  targetAudience: string;
  currentStage: IdeaStage;
  constraints: string;
}

export interface DiscoveryData {
  coreProblem: string;
  targetAudience: string;
  context: string;
  desiredValue: string;
  constraints: string[];
  assumptions: string[];
  openQuestions: string[];
  whyReasoning: string;
  isAccepted: boolean;
}

export interface PersonalityTrait {
  name: string;
  score: number; // 0 - 100
  why: string;
}

export interface BrandPrinciple {
  title: string;
  description: string;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  role: string;
}

export interface BrandDNAData {
  personality: PersonalityTrait[];
  traitsToAvoid: string[];
  principles: BrandPrinciple[];
  promise: string;
  audienceCore: string;
  voice: {
    soundsLike: string[];
    doesNotSoundLike: string[];
    tonalRules: string[];
  };
  visualDna: {
    colorMood: string;
    palette: ColorSwatch[];
    typographyDirection: string;
    shapeLanguage: string;
    imagery: string;
    composition: string;
    symbolStyle: string;
    visualAvoids: string[];
  };
  isLocked: boolean;
  version: number;
}

export interface WorldEvaluationDimension {
  score: number;
  why: string;
}

export interface BrandWorld {
  id: 'world-a' | 'world-b' | 'world-c';
  archetype: string; // e.g. "THE REBEL", "THE GUIDE", "THE FUTURIST"
  name: string;
  tagline: string;
  positioning: string;
  voice: string;
  visualLanguage: string;
  audiencePerception: string;
  strategicRationale: string;
  accentColor: string;
  evaluation: {
    dnaAlignment: WorldEvaluationDimension;
    audienceAlignment: WorldEvaluationDimension;
    distinctiveness: WorldEvaluationDimension;
    clarity: WorldEvaluationDimension;
    strategicRisk: string;
    memorability: WorldEvaluationDimension;
  };
}

export type ChallengeCategory =
  | 'cliche'
  | 'generic_language'
  | 'contradiction'
  | 'audience_mismatch'
  | 'weak_assumption';

export interface ChallengeIssue {
  id: string;
  category: ChallengeCategory;
  categoryLabel: string;
  target: string;
  severity: 'high' | 'medium' | 'low';
  why: string[];
  alternatives: string[];
  selectedAlternative?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ConsistencyDimension {
  score: number;
  status: 'pass' | 'warning' | 'fail';
  why: string;
}

export interface GuardianDetectedIssue {
  id: string;
  dimension: string;
  title: string;
  explanation: string;
  suggestion: string;
  fixText?: string;
}

export interface ConsistencyReport {
  assetTested: string;
  assetType: string;
  overallScore: number;
  dimensions: {
    voice: ConsistencyDimension;
    personality: ConsistencyDimension;
    audienceFit: ConsistencyDimension;
    positioning: ConsistencyDimension;
    visualDna: ConsistencyDimension;
    genericity: ConsistencyDimension;
  };
  detectedIssues: GuardianDetectedIssue[];
}

export interface LaunchKitData {
  strategy: {
    problem: string;
    audience: string;
    positioning: string;
    valueProp: string;
  };
  identity: {
    brandName: string;
    tagline: string;
    promise: string;
    archetype: string;
    personalitySummary: string;
  };
  messaging: {
    oneLinePitch: string;
    elevatorPitch: string;
    voiceRules: string[];
    sampleCopy: string[];
  };
  visualSystem: {
    palette: ColorSwatch[];
    typography: {
      headlineFont: string;
      bodyFont: string;
      hierarchyRules: string;
    };
    logoDirection: string;
    imageryDirection: string;
    compositionRules: string[];
  };
  launchAssets: {
    landingHeadline: string;
    landingSubheadline: string;
    primaryCta: string;
    secondaryCta: string;
    instagramCaption: string;
    linkedInAnnouncement: string;
    twitterThreadOpening: string;
    productHuntTagline: string;
  };
}

export interface AgentWorkflowStep {
  stageId: StageId;
  agentRole: string;
  stageName: string;
  inputDescription: string;
  outputDescription: string;
  status: 'idle' | 'running' | 'completed';
  lastRunTimestamp?: string;
}
