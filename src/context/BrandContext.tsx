import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StageId,
  IdeaInputData,
  DiscoveryData,
  BrandDNAData,
  BrandWorld,
  ChallengeIssue,
  ConsistencyReport,
  LaunchKitData,
  AgentWorkflowStep,
} from '../types';
import {
  HACKATHON_DEMO_INPUT,
  HACKATHON_DEMO_DISCOVERY,
  HACKATHON_DEMO_DNA,
  HACKATHON_DEMO_WORLDS,
  HACKATHON_DEMO_CHALLENGES,
  HACKATHON_DEMO_CONSISTENCY,
  HACKATHON_DEMO_LAUNCH_KIT,
} from '../lib/demoData';
import {
  runDiscoveryAgent,
  runBrandDnaAgent,
  runBrandWorldsAgent,
  runAntiGenericAgent,
  runGuardianAgent,
  runLaunchKitAgent,
} from '../lib/ai/geminiClient';

interface WhyModalData {
  title: string;
  explanation: string;
  context?: string;
  alternative?: string;
}

interface BrandContextType {
  stage: StageId;
  setStage: (stage: StageId) => void;
  completedStages: StageId[];
  ideaInput: IdeaInputData;
  setIdeaInput: React.Dispatch<React.SetStateAction<IdeaInputData>>;
  discovery: DiscoveryData | null;
  setDiscovery: React.Dispatch<React.SetStateAction<DiscoveryData | null>>;
  dna: BrandDNAData | null;
  setDna: React.Dispatch<React.SetStateAction<BrandDNAData | null>>;
  dnaUpdateNotice: string | null;
  brandWorlds: BrandWorld[];
  setBrandWorlds: React.Dispatch<React.SetStateAction<BrandWorld[]>>;
  selectedWorldId: 'world-a' | 'world-b' | 'world-c' | null;
  selectedWorld: BrandWorld | null;
  setSelectedWorldId: (id: 'world-a' | 'world-b' | 'world-c') => void;
  challenges: ChallengeIssue[];
  setChallenges: React.Dispatch<React.SetStateAction<ChallengeIssue[]>>;
  guardianReport: ConsistencyReport | null;
  setGuardianReport: React.Dispatch<React.SetStateAction<ConsistencyReport | null>>;
  launchKit: LaunchKitData | null;
  setLaunchKit: React.Dispatch<React.SetStateAction<LaunchKitData | null>>;
  isLoading: boolean;
  loadingMessage: string;
  aiLogs: AgentWorkflowStep[];
  isAiWorkflowOpen: boolean;
  setIsAiWorkflowOpen: (open: boolean) => void;
  whyModalData: WhyModalData | null;
  openWhyModal: (data: WhyModalData) => void;
  closeWhyModal: () => void;
  // Actions
  startInvestigation: (data?: IdeaInputData) => Promise<void>;
  generateBrandDNA: () => Promise<void>;
  updateDnaTraitScore: (traitName: string, newScore: number) => void;
  toggleDnaLock: () => void;
  generateBrandWorlds: () => Promise<void>;
  runAntiGenericChallenge: (world?: BrandWorld) => Promise<void>;
  resolveChallengeIssue: (issueId: string, status: 'accepted' | 'rejected', chosenAlt?: string) => void;
  runConsistencyCheck: (testText: string, testType: string) => Promise<void>;
  generateLaunchKit: () => Promise<void>;
  loadDemoData: () => void;
  resetInvestigation: () => void;
}

const INITIAL_IDEA_INPUT: IdeaInputData = {
  rawIdea: '',
  productType: 'App',
  targetAudience: '',
  currentStage: 'Just an idea',
  constraints: '',
};

const DEFAULT_WORKFLOW_LOGS: AgentWorkflowStep[] = [
  {
    stageId: 'discovery',
    agentRole: 'Discovery Analyst',
    stageName: '01 DISCOVERY',
    inputDescription: "User's raw idea & context",
    outputDescription: 'Problem, Audience, Context, Value, Constraints, Assumptions',
    status: 'idle',
  },
  {
    stageId: 'brand_dna',
    agentRole: 'Brand Strategist',
    stageName: '02 BRAND DNA',
    inputDescription: 'Discovery investigation output',
    outputDescription: 'Personality traits (with rationales), Avoids, Principles, Voice, Visual DNA',
    status: 'idle',
  },
  {
    stageId: 'brand_worlds',
    agentRole: 'Creative Director',
    stageName: '03 BRAND WORLDS',
    inputDescription: 'Locked Brand DNA + Discovery',
    outputDescription: '3 radically distinct strategic futures with Radar & Alignment evaluations',
    status: 'idle',
  },
  {
    stageId: 'challenge',
    agentRole: 'Brand Critic',
    stageName: '04 CHALLENGE',
    inputDescription: 'Selected Brand World + Brand DNA',
    outputDescription: 'Anti-Generic critique: Clichés, Contradictions, and Differentiated Alternatives',
    status: 'idle',
  },
  {
    stageId: 'guardian',
    agentRole: 'Brand Guardian',
    stageName: '05 CONSISTENCY',
    inputDescription: 'Test asset + Brand DNA memory',
    outputDescription: '6-Dimension consistency audit & one-click on-brand remediation',
    status: 'idle',
  },
  {
    stageId: 'launch',
    agentRole: 'Launch Strategist',
    stageName: '06 LAUNCH',
    inputDescription: 'Verified Brand System & DNA',
    outputDescription: 'Launch kit, positioning, design tokens, and multi-channel launch copy',
    status: 'idle',
  },
];

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<StageId>('landing');
  const [completedStages, setCompletedStages] = useState<StageId[]>([]);
  const [ideaInput, setIdeaInput] = useState<IdeaInputData>(INITIAL_IDEA_INPUT);
  const [discovery, setDiscovery] = useState<DiscoveryData | null>(null);
  const [dna, setDna] = useState<BrandDNAData | null>(null);
  const [dnaUpdateNotice, setDnaUpdateNotice] = useState<string | null>(null);
  const [brandWorlds, setBrandWorlds] = useState<BrandWorld[]>([]);
  const [selectedWorldId, setSelectedWorldId] = useState<'world-a' | 'world-b' | 'world-c' | null>('world-b');
  const [challenges, setChallenges] = useState<ChallengeIssue[]>([]);
  const [guardianReport, setGuardianReport] = useState<ConsistencyReport | null>(null);
  const [launchKit, setLaunchKit] = useState<LaunchKitData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [aiLogs, setAiLogs] = useState<AgentWorkflowStep[]>(DEFAULT_WORKFLOW_LOGS);
  const [isAiWorkflowOpen, setIsAiWorkflowOpen] = useState<boolean>(false);
  const [whyModalData, setWhyModalData] = useState<WhyModalData | null>(null);

  const selectedWorld = brandWorlds.find((w) => w.id === selectedWorldId) || brandWorlds[0] || null;

  const updateStageProgress = (finishedStage: StageId) => {
    setCompletedStages((prev) => (prev.includes(finishedStage) ? prev : [...prev, finishedStage]));
  };

  const updateAgentLogStatus = (stageId: StageId, status: 'idle' | 'running' | 'completed') => {
    setAiLogs((prev) =>
      prev.map((step) =>
        step.stageId === stageId
          ? { ...step, status, lastRunTimestamp: new Date().toLocaleTimeString() }
          : step
      )
    );
  };

  const openWhyModal = (data: WhyModalData) => {
    setWhyModalData(data);
  };

  const closeWhyModal = () => {
    setWhyModalData(null);
  };

  // Actions
  const startInvestigation = async (data?: IdeaInputData) => {
    const input = data || ideaInput;
    setIsLoading(true);
    setLoadingMessage('AGENT 01 [Discovery Analyst]: Extracting problem, mapping audience & detecting hidden assumptions...');
    updateAgentLogStatus('discovery', 'running');

    try {
      const result = await runDiscoveryAgent(input);
      setDiscovery(result);
      updateStageProgress('discovery');
      updateAgentLogStatus('discovery', 'completed');
      setStage('discovery');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const generateBrandDNA = async () => {
    if (!discovery) return;
    setIsLoading(true);
    setLoadingMessage('AGENT 02 [Brand Strategist]: Synthesizing persistent Brand DNA system, personality traits & visual rules...');
    updateAgentLogStatus('brand_dna', 'running');

    try {
      const result = await runBrandDnaAgent(ideaInput, discovery);
      setDna(result);
      updateStageProgress('brand_dna');
      updateAgentLogStatus('brand_dna', 'completed');
      setStage('brand_dna');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const updateDnaTraitScore = (traitName: string, newScore: number) => {
    if (!dna) return;
    const oldTrait = dna.personality.find((t) => t.name === traitName);
    const oldScore = oldTrait ? oldTrait.score : 50;

    const updatedPersonality = dna.personality.map((t) =>
      t.name === traitName ? { ...t, score: newScore } : t
    );

    setDna({
      ...dna,
      personality: updatedPersonality,
      version: dna.version + 1,
    });

    setDnaUpdateNotice(
      `DNA UPDATED: Adjusted "${traitName}" from ${oldScore}% → ${newScore}%. This calibration actively shapes the tone and strategic posture of generated Brand Worlds and Guardian filters.`
    );

    setTimeout(() => {
      setDnaUpdateNotice(null);
    }, 7000);
  };

  const toggleDnaLock = () => {
    if (!dna) return;
    setDna({ ...dna, isLocked: !dna.isLocked });
  };

  const generateBrandWorlds = async () => {
    if (!discovery || !dna) return;
    setIsLoading(true);
    setLoadingMessage('AGENT 03 [Creative Director]: Generating 3 radically divergent Brand Worlds based on locked DNA...');
    updateAgentLogStatus('brand_worlds', 'running');

    try {
      const worlds = await runBrandWorldsAgent(discovery, dna);
      setBrandWorlds(worlds);
      if (worlds.length > 0 && !selectedWorldId) {
        setSelectedWorldId(worlds[1].id || 'world-b');
      }
      updateStageProgress('brand_worlds');
      updateAgentLogStatus('brand_worlds', 'completed');
      setStage('brand_worlds');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const runAntiGenericChallenge = async (chosenWorld?: BrandWorld) => {
    const worldToTest = chosenWorld || selectedWorld;
    if (!worldToTest || !dna) return;
    setIsLoading(true);
    setLoadingMessage('AGENT 04 [Brand Critic]: Scanning chosen world for startup clichés, generic language, and DNA contradictions...');
    updateAgentLogStatus('challenge', 'running');

    try {
      const issues = await runAntiGenericAgent(worldToTest, dna);
      setChallenges(issues);
      updateStageProgress('challenge');
      updateAgentLogStatus('challenge', 'completed');
      setStage('challenge');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const resolveChallengeIssue = (issueId: string, status: 'accepted' | 'rejected', chosenAlt?: string) => {
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === issueId
          ? {
              ...item,
              status,
              selectedAlternative: chosenAlt || item.selectedAlternative || item.alternatives[0],
            }
          : item
      )
    );
  };

  const runConsistencyCheck = async (testText: string, testType: string) => {
    if (!selectedWorld || !dna) return;
    setIsLoading(true);
    setLoadingMessage('AGENT 05 [Brand Guardian]: Testing submitted asset against Brand DNA memory...');
    updateAgentLogStatus('guardian', 'running');

    try {
      const report = await runGuardianAgent(testText, testType, selectedWorld, dna);
      setGuardianReport(report);
      updateStageProgress('guardian');
      updateAgentLogStatus('guardian', 'completed');
      setStage('guardian');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const generateLaunchKit = async () => {
    if (!selectedWorld || !dna || !discovery) return;
    setIsLoading(true);
    setLoadingMessage('AGENT 06 [Launch Strategist]: Compiling finalized Brand System into high-velocity Launch Kit...');
    updateAgentLogStatus('launch', 'running');

    try {
      const kit = await runLaunchKitAgent(selectedWorld, dna, discovery, challenges);
      setLaunchKit(kit);
      updateStageProgress('launch');
      updateAgentLogStatus('launch', 'completed');
      setStage('launch');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const loadDemoData = () => {
    setIdeaInput(HACKATHON_DEMO_INPUT);
    setDiscovery(HACKATHON_DEMO_DISCOVERY);
    setDna(HACKATHON_DEMO_DNA);
    setBrandWorlds(HACKATHON_DEMO_WORLDS);
    setSelectedWorldId('world-b');
    setChallenges(HACKATHON_DEMO_CHALLENGES);
    setGuardianReport(HACKATHON_DEMO_CONSISTENCY);
    setLaunchKit(HACKATHON_DEMO_LAUNCH_KIT);
    setCompletedStages(['discovery', 'brand_dna', 'brand_worlds', 'challenge', 'guardian', 'launch']);
    setAiLogs(
      DEFAULT_WORKFLOW_LOGS.map((s) => ({
        ...s,
        status: 'completed',
        lastRunTimestamp: new Date().toLocaleTimeString(),
      }))
    );
    setStage('discovery');
  };

  const resetInvestigation = () => {
    setIdeaInput(INITIAL_IDEA_INPUT);
    setDiscovery(null);
    setDna(null);
    setBrandWorlds([]);
    setSelectedWorldId(null);
    setChallenges([]);
    setGuardianReport(null);
    setLaunchKit(null);
    setCompletedStages([]);
    setAiLogs(DEFAULT_WORKFLOW_LOGS);
    setStage('landing');
  };

  return (
    <BrandContext.Provider
      value={{
        stage,
        setStage,
        completedStages,
        ideaInput,
        setIdeaInput,
        discovery,
        setDiscovery,
        dna,
        setDna,
        dnaUpdateNotice,
        brandWorlds,
        setBrandWorlds,
        selectedWorldId,
        selectedWorld,
        setSelectedWorldId,
        challenges,
        setChallenges,
        guardianReport,
        setGuardianReport,
        launchKit,
        setLaunchKit,
        isLoading,
        loadingMessage,
        aiLogs,
        isAiWorkflowOpen,
        setIsAiWorkflowOpen,
        whyModalData,
        openWhyModal,
        closeWhyModal,
        startInvestigation,
        generateBrandDNA,
        updateDnaTraitScore,
        toggleDnaLock,
        generateBrandWorlds,
        runAntiGenericChallenge,
        resolveChallengeIssue,
        runConsistencyCheck,
        generateLaunchKit,
        loadDemoData,
        resetInvestigation,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
