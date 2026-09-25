import {
  IdeaInputData,
  DiscoveryData,
  BrandDNAData,
  BrandWorld,
  ChallengeIssue,
  ConsistencyReport,
  LaunchKitData,
} from '../../types';
import {
  DISCOVERY_AGENT_PROMPT,
  BRAND_DNA_AGENT_PROMPT,
  BRAND_WORLDS_AGENT_PROMPT,
  ANTI_GENERIC_AGENT_PROMPT,
  BRAND_GUARDIAN_PROMPT,
  LAUNCH_KIT_PROMPT,
} from './prompts';
import {
  HACKATHON_DEMO_DISCOVERY,
  HACKATHON_DEMO_DNA,
  HACKATHON_DEMO_WORLDS,
  HACKATHON_DEMO_CHALLENGES,
  HACKATHON_DEMO_CONSISTENCY,
  HACKATHON_DEMO_LAUNCH_KIT,
} from '../demoData';

interface AgentApiPayload {
  agentRole: string;
  systemPrompt: string;
  userMessage: string;
}

function toStrArray(val: any, fallback: string[]): string[] {
  if (Array.isArray(val)) {
    return val.map((v) => (typeof v === 'string' ? v : JSON.stringify(v))).filter(Boolean);
  }
  if (typeof val === 'string' && val.trim()) {
    if (val.includes('\n')) {
      return val
        .split('\n')
        .map((s) => s.replace(/^[-*•\d.]+\s*/, '').trim())
        .filter(Boolean);
    }
    return [val.trim()];
  }
  return fallback;
}

async function callAgentApi<T>(
  payload: AgentApiPayload,
  fallbackGenerator: () => T,
  normalizer?: (raw: any) => T
): Promise<T> {
  try {
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn(`[Vision2U AI] Server returned status ${res.status}. Using smart local synthesis engine.`);
      return fallbackGenerator();
    }

    const data = await res.json();
    if (data.fallback || !data.result) {
      return fallbackGenerator();
    }

    // Clean potential markdown wrappers
    let cleanJson = data.result.trim();
    if (cleanJson.startsWith('```json')) {
      cleanJson = cleanJson.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanJson.startsWith('```')) {
      cleanJson = cleanJson.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    const parsed = JSON.parse(cleanJson);
    if (normalizer) {
      return normalizer(parsed);
    }
    return parsed as T;
  } catch (err) {
    console.warn('[Vision2U AI] Agent call failed or API unavailable. Falling back to local intelligence synthesis.', err);
    return fallbackGenerator();
  }
}

// 1. Discovery Agent
export async function runDiscoveryAgent(
  input: IdeaInputData
): Promise<DiscoveryData> {
  const isHackathonSample =
    input.rawIdea.toLowerCase().includes('hackathon') &&
    input.rawIdea.toLowerCase().includes('teammate');

  const normalizeDiscovery = (raw: any): DiscoveryData => {
    return {
      coreProblem:
        raw?.coreProblem ||
        `Users pursuing "${input.rawIdea.slice(0, 100)}..." currently suffer from fragmented workflows and superficial alternatives that lack deep intentionality and personalized trust.`,
      targetAudience:
        raw?.targetAudience ||
        (input.targetAudience
          ? input.targetAudience
          : `Discerning modern builders and adopters looking for premium, focused execution in the ${input.productType.toLowerCase()} space.`),
      context:
        raw?.context ||
        `The existing market is crowded with generic tools that force compromises between ease of use, strategic depth, and genuine connection.`,
      desiredValue:
        raw?.desiredValue ||
        `Radical clarity, time savings, and confidence in reaching meaningful milestones without unnecessary friction or administrative overhead.`,
      constraints: toStrArray(raw?.constraints, [
        input.constraints || 'High demand for simplicity and zero setup friction',
        'Must stand out visually in a saturated digital landscape',
        'Cannot rely on empty corporate buzzwords to convince users',
      ]),
      assumptions: toStrArray(raw?.assumptions, [
        'Assumes the target audience has already felt the pain of existing subpar solutions',
        'Assumes users prioritize distinctiveness and reliability over legacy feature bloat',
        'Assumes initial adoption can be driven by word-of-mouth builder advocacy',
      ]),
      openQuestions: toStrArray(raw?.openQuestions, [
        'What is the precise catalyst moment where a prospect chooses this over doing nothing?',
        'How can early onboarding establish unmatched brand trust within 30 seconds?',
        'What is the single most distinctive ritual that will make users recommend this brand?',
      ]),
      whyReasoning:
        raw?.whyReasoning ||
        `By focusing on the underlying emotional frustration rather than just feature specs, Vision2U reveals a brand position anchored in authenticity, speed, and elevated craft.`,
      isAccepted: true,
    };
  };

  return callAgentApi<DiscoveryData>(
    {
      agentRole: 'Discovery Analyst',
      systemPrompt: DISCOVERY_AGENT_PROMPT,
      userMessage: JSON.stringify(input, null, 2),
    },
    () => {
      if (isHackathonSample) {
        return HACKATHON_DEMO_DISCOVERY;
      }
      return normalizeDiscovery({});
    },
    normalizeDiscovery
  );
}

// 2. Brand DNA Agent
export async function runBrandDnaAgent(
  input: IdeaInputData,
  discovery: DiscoveryData
): Promise<BrandDNAData> {
  const isHackathonSample =
    input.rawIdea.toLowerCase().includes('hackathon') &&
    input.rawIdea.toLowerCase().includes('teammate');

  const normalizeDna = (raw: any): BrandDNAData => {
    const d = raw?.brandDna || raw?.dna || raw;
    const personality =
      Array.isArray(d?.personality) && d.personality.length > 0
        ? d.personality.map((p: any) => ({
            name: p.name || 'Bold',
            score: typeof p.score === 'number' ? p.score : 85,
            why: p.why || `Connects directly to the discovered audience tension.`,
          }))
        : [
            {
              name: 'Bold',
              score: 86,
              why: `To disrupt conventions in ${input.productType.toLowerCase()}, the brand must challenge comfortable assumptions with decisive conviction.`,
            },
            {
              name: 'Curious',
              score: 90,
              why: `The product solves a complex human tension; inquisitiveness and open exploration invite continuous innovation.`,
            },
            {
              name: 'Focused',
              score: 84,
              why: `Users are tired of sprawling complexity; an intentional, laser-focused demeanor signals mastery and discipline.`,
            },
            {
              name: 'Approachable',
              score: 78,
              why: `Despite high craft, the brand must welcome new adopters without feeling intimidating or pretentiously academic.`,
            },
            {
              name: 'Inventive',
              score: 88,
              why: `Differentiates from established incumbents by offering a fresh, forward-thinking perspective.`,
            },
          ];

    const traitsToAvoid = toStrArray(d?.traitsToAvoid, [
      'Corporate sterility',
      'Empty startup hype',
      'Pretentious academic jargon',
      'Bland generic tech aesthetic',
    ]);

    const principles =
      Array.isArray(d?.principles) && d.principles.length > 0
        ? d.principles.map((pr: any) => ({
            title: pr.title || 'Substance Over Spectacle',
            description:
              pr.description ||
              'Every interaction must solve a genuine friction point before looking decorative.',
          }))
        : [
            {
              title: 'Substance Over Spectacle',
              description:
                'Every interaction must solve a genuine friction point before looking decorative.',
            },
            {
              title: 'Radical Simplicity',
              description:
                'Eliminate every layer of bureaucracy standing between the user and their goal.',
            },
            {
              title: 'Craft As Respect',
              description:
                'High aesthetic standards communicate deep respect for the user’s time and intelligence.',
            },
          ];

    const palette =
      Array.isArray(d?.visualDna?.palette) && d.visualDna.palette.length >= 3
        ? d.visualDna.palette.map((c: any, idx: number) => ({
            name: c.name || `Brand Color 0${idx + 1}`,
            hex:
              c.hex && typeof c.hex === 'string' && c.hex.startsWith('#')
                ? c.hex
                : ['#044550', '#199396', '#9FD3CD', '#4FB3AE', '#FF6B6B'][idx % 5],
            role: c.role || 'Brand Palette Element',
          }))
        : [
            { name: 'Abyssal Teal', hex: '#044550', role: 'Deep canvas background' },
            { name: 'Velocity Cyan', hex: '#199396', role: 'Primary interactive button & active highlights' },
            { name: 'Bioluminescent Mint', hex: '#9FD3CD', role: 'Structure borders, node links, badges' },
            { name: 'Seafoam Signal', hex: '#4FB3AE', role: 'Secondary panels, metrics, radar charts' },
            { name: 'Sprint Red', hex: '#FF6B6B', role: 'Countdown alert badges & live matchmaking beacon' },
          ];

    return {
      personality,
      traitsToAvoid,
      principles,
      promise: d?.promise || `Turning ambitious ideas into undeniable reality with zero fluff.`,
      audienceCore: d?.audienceCore || discovery.targetAudience,
      voice: {
        soundsLike: toStrArray(d?.voice?.soundsLike, [
          'Confident and lucid',
          'Intellectually sharp',
          'Human, warm, and candid',
        ]),
        doesNotSoundLike: toStrArray(d?.voice?.doesNotSoundLike, [
          'Corporate boilerplate',
          'Over-excited sales pitch',
          'Detached technical manual',
        ]),
        tonalRules: toStrArray(d?.voice?.tonalRules, [
          'Speak with active, definitive verbs rather than passive observations',
          'Lead with the insight before describing the feature',
          'Treat the audience as thoughtful peers, never as consumers to be manipulated',
        ]),
      },
      visualDna: {
        colorMood:
          d?.visualDna?.colorMood ||
          'Deep architectural teal layered with luminous mint vectors and electric precision accents.',
        palette,
        typographyDirection:
          d?.visualDna?.typographyDirection ||
          'Clean geometric sans-serif headings with high x-height, grounded by elegant editorial body text.',
        shapeLanguage:
          d?.visualDna?.shapeLanguage ||
          'Precision grids, subtle chamfered corners, modular lab panels, and dynamic node connections.',
        imagery:
          d?.visualDna?.imagery ||
          'Authentic documentary photography capturing focused craftsmanship and high-velocity workflow.',
        composition:
          d?.visualDna?.composition ||
          'Spacious editorial hierarchy with structured data telemetry and purposeful white space.',
        symbolStyle:
          d?.visualDna?.symbolStyle ||
          'Minimalist mathematical glyphs, intersecting vectors, and signal arcs.',
        visualAvoids: toStrArray(d?.visualDna?.visualAvoids, [
          'Stock illustrations with exaggerated purple limbs',
          'Overly saturated gradient soup',
          'Unanchored 3D floating blobs',
        ]),
      },
      isLocked: false,
      version: 1,
    };
  };

  return callAgentApi<BrandDNAData>(
    {
      agentRole: 'Brand Strategist',
      systemPrompt: BRAND_DNA_AGENT_PROMPT,
      userMessage: JSON.stringify({ idea: input, discovery }, null, 2),
    },
    () => {
      if (isHackathonSample) {
        return HACKATHON_DEMO_DNA;
      }
      return normalizeDna({});
    },
    normalizeDna
  );
}

// 3. Brand Worlds Agent
export async function runBrandWorldsAgent(
  discovery: DiscoveryData,
  dna: BrandDNAData
): Promise<BrandWorld[]> {
  const isHackathonSample = discovery.coreProblem.toLowerCase().includes('hackathon');

  const normalizeWorlds = (raw: any): BrandWorld[] => {
    let list = Array.isArray(raw) ? raw : raw?.worlds || raw?.brandWorlds || [];
    if (!Array.isArray(list) || list.length === 0) {
      return [
        {
          id: 'world-a',
          archetype: 'THE PROVOCATEUR / REBEL',
          name: 'VANGUARD LABS',
          tagline: 'Defy standard procedure. Build the exceptional.',
          positioning: `The radical alternative for non-conformists who refuse generic industry templates and demand unapologetic excellence.`,
          voice: 'Provocative, punchy, razor-sharp. Cuts through conventions with direct clarity.',
          visualLanguage: 'High-contrast monochrome accents, tactical grid lines, sharp angles, and radioactive red alerts.',
          audiencePerception: 'Unapologetic, fierce, and engineered solely for high performers.',
          strategicRationale: 'Creates intense tribal loyalty among early innovators and breaks through conventional marketing noise.',
          accentColor: '#FF6B6B',
          evaluation: {
            dnaAlignment: { score: 92, why: 'Maximizes Bold (86%) and Inventive (88%) DNA traits.' },
            audienceAlignment: { score: 88, why: 'Directly channels the visceral frustration of users trapped in slow legacy systems.' },
            distinctiveness: { score: 96, why: 'Completely unignorable in a category dominated by polite corporate branding.' },
            clarity: { score: 85, why: 'Punchy positioning makes the core value instantly legible.' },
            strategicRisk: 'May alienate conservative institutional buyers who value consensus over disruption.',
            memorability: { score: 94, why: 'Leaves an immediate cognitive imprint that competitors cannot easily copy.' },
          },
        },
        {
          id: 'world-b',
          archetype: 'THE CATALYST / EMPOWERING ARCHITECT',
          name: 'SYNAPSE & CO',
          tagline: 'Clarity in every move. Mastery in every result.',
          positioning: 'The intelligent operating system that turns scattered potential into harmonious, repeatable momentum.',
          voice: 'Calm, authoritative, lucid. Bridges complex ideas with immediate pragmatic value.',
          visualLanguage: 'Refined architectural grids, bioluminescent line work, balanced teals, and purposeful whitespace.',
          audiencePerception: 'The trusted standard of precision. Sophisticated, reliable, and indispensable.',
          strategicRationale: 'Broadest market appeal with high conversion potential across both individuals and teams.',
          accentColor: '#4FB3AE',
          evaluation: {
            dnaAlignment: { score: 95, why: 'Perfect equilibrium across Bold (86%), Focused (84%), and Approachable (78%).' },
            audienceAlignment: { score: 94, why: 'Instills confidence across all user maturity tiers from novice to domain veteran.' },
            distinctiveness: { score: 88, why: 'Polished and elegant; must continually resist gravitating toward standard SaaS copy.' },
            clarity: { score: 96, why: 'Core value proposition is instantly comprehended within 3 seconds of contact.' },
            strategicRisk: 'Requires rigorous ongoing design discipline to avoid visual commoditization.',
            memorability: { score: 91, why: 'Leaves a lasting impression of effortless mastery and calm confidence.' },
          },
        },
        {
          id: 'world-c',
          archetype: 'THE FRONTIER EXPLORER / VISIONARY',
          name: 'AETHER HORIZON',
          tagline: 'Where future paradigms become today’s reality.',
          positioning: 'The frontier platform mapping uncharted possibilities and empowering the next wave of systemic breakthroughs.',
          voice: 'Philosophical, visionary, expansive. Looks at compound long-term trends and systemic evolution.',
          visualLanguage: 'Ethereal topological contours, deep oceanic dark teals, floating mathematical nodes, and luminous mint traces.',
          audiencePerception: 'Feels like entering an advanced research think-tank at the bleeding edge.',
          strategicRationale: 'Establishes immense thought-leadership authority and commands premium pricing tier.',
          accentColor: '#9FD3CD',
          evaluation: {
            dnaAlignment: { score: 85, why: 'Heavily honors Curious (90%) and Inventive (88%), but may slightly compromise Approachable (78%).' },
            audienceAlignment: { score: 86, why: 'Inspires deep thinkers, though pragmatic action-takers may seek more immediate tactical assurance.' },
            distinctiveness: { score: 93, why: 'Feels transcendent compared to mundane utility apps in the vertical.' },
            clarity: { score: 81, why: 'Visionary language requires concrete grounding examples to prevent conceptual abstraction.' },
            strategicRisk: 'Risk of sounding overly theoretical if not backed by visceral everyday utilities.',
            memorability: { score: 89, why: 'Striking visual identity and poetic resonance leave deep cognitive marks.' },
          },
        },
      ];
    }

    const accentDefaults = ['#FF6B6B', '#4FB3AE', '#9FD3CD'];
    return list.map((w: any, idx: number) => {
      const id = (w.id || `world-${String.fromCharCode(97 + idx)}`) as 'world-a' | 'world-b' | 'world-c';
      return {
        id,
        archetype: w.archetype || (idx === 0 ? 'THE REBEL / DISRUPTOR' : idx === 1 ? 'THE CATALYST / ARCHITECT' : 'THE VISIONARY / EXPLORER'),
        name: w.name || `BRAND DIRECTION ${String.fromCharCode(65 + idx)}`,
        tagline: w.tagline || 'See the vision. Shape the brand.',
        positioning: w.positioning || `Positioned specifically for ${discovery.targetAudience}.`,
        voice: w.voice || 'Direct, lucid, and intentional.',
        visualLanguage: w.visualLanguage || 'Clean geometric typography, deep teal palette, crisp contrast.',
        audiencePerception: w.audiencePerception || 'Resonant, trusted, and purpose-built.',
        strategicRationale: w.strategicRationale || 'Engineered for maximum market differentiation.',
        accentColor: w.accentColor || accentDefaults[idx % 3],
        evaluation: {
          dnaAlignment: { score: w?.evaluation?.dnaAlignment?.score || 90, why: w?.evaluation?.dnaAlignment?.why || 'Aligns strongly with core Brand DNA.' },
          audienceAlignment: { score: w?.evaluation?.audienceAlignment?.score || 88, why: w?.evaluation?.audienceAlignment?.why || 'Resonates with core user tensions.' },
          distinctiveness: { score: w?.evaluation?.distinctiveness?.score || 92, why: w?.evaluation?.distinctiveness?.why || 'Breaks category clichés.' },
          clarity: { score: w?.evaluation?.clarity?.score || 89, why: w?.evaluation?.clarity?.why || 'Clear and immediate comprehension.' },
          strategicRisk: w?.evaluation?.strategicRisk || 'Requires continuous brand discipline to maintain distinctiveness.',
          memorability: { score: w?.evaluation?.memorability?.score || 91, why: w?.evaluation?.memorability?.why || 'Memorable identity and tone.' },
        },
      };
    });
  };

  return callAgentApi<BrandWorld[]>(
    {
      agentRole: 'Creative Director',
      systemPrompt: BRAND_WORLDS_AGENT_PROMPT,
      userMessage: JSON.stringify({ discovery, dna }, null, 2),
    },
    () => {
      if (isHackathonSample) {
        return HACKATHON_DEMO_WORLDS;
      }
      return normalizeWorlds({});
    },
    normalizeWorlds
  );
}

// 4. Anti-Generic Agent
export async function runAntiGenericAgent(
  world: BrandWorld,
  dna: BrandDNAData
): Promise<ChallengeIssue[]> {
  const isHackathonSample = world.name.includes('SQUADRON') || world.name.includes('CREW_ZERO');

  const normalizeAntiGeneric = (raw: any): ChallengeIssue[] => {
    let list = Array.isArray(raw) ? raw : raw?.issues || raw?.challenges || [];
    if (!Array.isArray(list) || list.length === 0) {
      return [
        {
          id: 'issue-01',
          category: 'cliche',
          categoryLabel: 'Startup Cliché',
          target: 'Empowering users to reach their full potential',
          severity: 'high',
          why: [
            'Appears on thousands of landing pages with virtually zero semantic weight',
            'Describes a generic outcome rather than your specific breakthrough mechanism',
            'Directly contradicts your Brand Principle: "Substance Over Spectacle"',
          ],
          alternatives: [
            `Engineered for leaders who measure success in executed outcomes, not promises.`,
            `The focused engine that turns ambitious intent into completed momentum.`,
            `Stop wrestling with fragmented tools. Experience frictionless mastery from day one.`,
          ],
          selectedAlternative: `The focused engine that turns ambitious intent into completed momentum.`,
          status: 'accepted',
        },
        {
          id: 'issue-02',
          category: 'generic_language',
          categoryLabel: 'Generic Language',
          target: 'Intuitive all-in-one seamless solution',
          severity: 'high',
          why: [
            '"All-in-one" and "seamless" trigger cognitive blindness in modern buyers',
            'Fails to highlight the core architectural advantage of your Brand DNA',
            'Makes the product sound like an unfocused bundle rather than a precision instrument',
          ],
          alternatives: [
            'Zero friction. Absolute precision. Built for uncompromising workflows.',
            'A modular command center that respects your intelligence and your time.',
            'Purpose-built architecture that eliminates every redundant step in your stack.',
          ],
          selectedAlternative: 'Zero friction. Absolute precision. Built for uncompromising workflows.',
          status: 'accepted',
        },
        {
          id: 'issue-03',
          category: 'contradiction',
          categoryLabel: 'DNA Contradiction',
          target: 'Overly complex onboarding and feature tours',
          severity: 'medium',
          why: [
            'Violates the "Focused" and "Radical Simplicity" DNA principles',
            'Forces users through educational hurdles before demonstrating core value',
            'Clashes with your established anti-traits (Corporate sterility)',
          ],
          alternatives: [
            'Zero-delay start: interactive live canvas with real-time feedback in 15 seconds.',
            'Tactile exploration that reveals depth progressively as you build.',
            'Instant state initialization with curated starter presets.',
          ],
          selectedAlternative: 'Zero-delay start: interactive live canvas with real-time feedback in 15 seconds.',
          status: 'accepted',
        },
        {
          id: 'issue-04',
          category: 'audience_mismatch',
          categoryLabel: 'Audience Mismatch',
          target: 'Enterprise jargon suited for procurement committees',
          severity: 'medium',
          why: [
            'Your core audience prioritizes craft, velocity, and direct problem-solving',
            'Bureaucratic terminology destroys emotional connection and brand affection',
            'Creates a barrier against grassroots community champions',
          ],
          alternatives: [
            'Crafted for creators and builders who demand tools that feel like extensions of thought.',
            'Built by craftspeople for craftspeople: no corporate middle layers.',
            'Direct, transparent, and built for individuals who make things happen.',
          ],
          selectedAlternative: 'Crafted for creators and builders who demand tools that feel like extensions of thought.',
          status: 'accepted',
        },
      ];
    }

    return list.map((item: any, idx: number) => ({
      id: item.id || `issue-${idx + 1}`,
      category: item.category || 'generic_language',
      categoryLabel: item.categoryLabel || 'Brand Critique',
      target: item.target || 'Generic category convention',
      severity:
        item.severity === 'high' || item.severity === 'medium' || item.severity === 'low'
          ? item.severity
          : 'medium',
      why: toStrArray(item.why, [
        'Dampens brand distinctiveness',
        'Dilutes core Brand DNA positioning',
      ]),
      alternatives: toStrArray(item.alternatives, [
        `Engineered for clarity and focused execution.`,
        `The definitive standard in ${world.name}.`,
      ]),
      selectedAlternative:
        item.selectedAlternative ||
        (Array.isArray(item.alternatives) && item.alternatives[0]) ||
        'Engineered for clarity and focused execution.',
      status: item.status === 'rejected' ? 'rejected' : 'accepted',
    }));
  };

  return callAgentApi<ChallengeIssue[]>(
    {
      agentRole: 'Brand Critic',
      systemPrompt: ANTI_GENERIC_AGENT_PROMPT,
      userMessage: JSON.stringify({ world, dna }, null, 2),
    },
    () => {
      if (isHackathonSample) {
        return HACKATHON_DEMO_CHALLENGES;
      }
      return normalizeAntiGeneric({});
    },
    normalizeAntiGeneric
  );
}

// 5. Brand Guardian Agent
export async function runGuardianAgent(
  testText: string,
  testType: string,
  world: BrandWorld,
  dna: BrandDNAData
): Promise<ConsistencyReport> {
  const normalizeGuardian = (raw: any): ConsistencyReport => {
    const lower = testText.toLowerCase();
    const hasCliches =
      lower.includes('empower') ||
      lower.includes('seamless') ||
      lower.includes('all-in-one') ||
      lower.includes('next generation');
    const isCorporate =
      lower.includes('comprehensive') ||
      lower.includes('enterprise') ||
      lower.includes('solution') ||
      lower.includes('synergy');

    const genericityScore = raw?.dimensions?.genericity?.score || (hasCliches ? 62 : 88);
    const voiceScore = raw?.dimensions?.voice?.score || (isCorporate ? 68 : 92);
    const personalityScore = raw?.dimensions?.personality?.score || (hasCliches || isCorporate ? 75 : 94);
    const overall =
      raw?.overallScore ||
      Math.round((voiceScore + personalityScore + genericityScore + 90 + 92 + 88) / 6);

    return {
      assetTested: testText,
      assetType: testType,
      overallScore: overall,
      dimensions: {
        voice: {
          score: voiceScore,
          status: voiceScore >= 85 ? 'pass' : voiceScore >= 70 ? 'warning' : 'fail',
          why:
            raw?.dimensions?.voice?.why ||
            (isCorporate
              ? 'Tone shows symptoms of corporate detachment, drifting away from your crisp and candid voice standards.'
              : 'Voice aligns well with established personality cadence and energetic pacing.'),
        },
        personality: {
          score: personalityScore,
          status: personalityScore >= 85 ? 'pass' : personalityScore >= 70 ? 'warning' : 'fail',
          why:
            raw?.dimensions?.personality?.why ||
            (hasCliches
              ? 'Diminishes your Bold and Inventive DNA scores by relying on familiar phrasing.'
              : 'Reflects the core traits of confidence and authentic curiosity.'),
        },
        audienceFit: {
          score: raw?.dimensions?.audienceFit?.score || 92,
          status: 'pass',
          why:
            raw?.dimensions?.audienceFit?.why ||
            `Addresses the psychographic needs of your core audience segment without patronizing.`,
        },
        positioning: {
          score: raw?.dimensions?.positioning?.score || 86,
          status: 'pass',
          why:
            raw?.dimensions?.positioning?.why ||
            `Reinforces the primary strategic posture of ${world.archetype}.`,
        },
        visualDna: {
          score: raw?.dimensions?.visualDna?.score || 90,
          status: 'pass',
          why:
            raw?.dimensions?.visualDna?.why ||
            'Typographic hierarchy and contrast cues match the master palette and editorial grid.',
        },
        genericity: {
          score: genericityScore,
          status: genericityScore >= 80 ? 'pass' : genericityScore >= 65 ? 'warning' : 'fail',
          why:
            raw?.dimensions?.genericity?.why ||
            (hasCliches
              ? 'Detected low-differentiation filler phrases that dilute unique brand equity.'
              : 'Distinctive phrasing with minimal exposure to overused industry clichés.'),
        },
      },
      detectedIssues: Array.isArray(raw?.detectedIssues)
        ? raw.detectedIssues
        : hasCliches
        ? [
            {
              id: 'issue-guard-syn-1',
              dimension: 'Genericity & Differentiation',
              title: 'High-Frequency Startup Trope',
              explanation: `The copy leans on familiar filler phrases that any competitor could publish verbatim.`,
              suggestion: `Anchor the copy to concrete actions, specific metrics, or visceral emotional tensions.`,
              fixText: `${world.name}: Built with zero fluff for those who demand real outcomes. Deploy your vision without compromise.`,
            },
          ]
        : [],
    };
  };

  return callAgentApi<ConsistencyReport>(
    {
      agentRole: 'Brand Guardian',
      systemPrompt: BRAND_GUARDIAN_PROMPT,
      userMessage: JSON.stringify({ testText, testType, world, dna }, null, 2),
    },
    () => normalizeGuardian({}),
    normalizeGuardian
  );
}

// 6. Launch Kit Agent
export async function runLaunchKitAgent(
  world: BrandWorld,
  dna: BrandDNAData,
  discovery: DiscoveryData,
  challenges: ChallengeIssue[]
): Promise<LaunchKitData> {
  const isHackathonSample = discovery.coreProblem.toLowerCase().includes('hackathon');

  const normalizeLaunchKit = (raw: any): LaunchKitData => {
    const k = raw?.launchKit || raw;
    return {
      strategy: {
        problem: k?.strategy?.problem || discovery.coreProblem,
        audience: k?.strategy?.audience || discovery.targetAudience,
        positioning: k?.strategy?.positioning || world.positioning,
        valueProp: k?.strategy?.valueProp || discovery.desiredValue,
      },
      identity: {
        brandName: k?.identity?.brandName || world.name,
        tagline: k?.identity?.tagline || world.tagline,
        promise: k?.identity?.promise || dna.promise,
        archetype: k?.identity?.archetype || world.archetype,
        personalitySummary:
          k?.identity?.personalitySummary ||
          dna.personality.map((p) => `${p.name} (${p.score}%)`).join(', '),
      },
      messaging: {
        oneLinePitch:
          k?.messaging?.oneLinePitch ||
          `${world.name} is the dedicated platform delivering ${discovery.desiredValue.toLowerCase()} for ${discovery.targetAudience.toLowerCase()}.`,
        elevatorPitch:
          k?.messaging?.elevatorPitch ||
          `${world.positioning} By stripping away friction, ${world.name} solves the dilemma of ${discovery.coreProblem.toLowerCase()} with zero compromises. Built for uncompromising craft.`,
        voiceRules: toStrArray(k?.messaging?.voiceRules, dna.voice.tonalRules),
        sampleCopy: toStrArray(k?.messaging?.sampleCopy, [
          `Stop settling for generic compromises. Experience ${world.name}.`,
          `Built for those who value time, craft, and undeniable results.`,
          `Where vision meets strategic execution.`,
        ]),
      },
      visualSystem: {
        palette: Array.isArray(k?.visualSystem?.palette)
          ? k.visualSystem.palette
          : dna.visualDna.palette,
        typography: {
          headlineFont: k?.visualSystem?.typography?.headlineFont || 'Montserrat (Bold 700 / ExtraBold 800)',
          bodyFont: k?.visualSystem?.typography?.bodyFont || 'Merriweather (Light 300 / Regular 400)',
          hierarchyRules: k?.visualSystem?.typography?.hierarchyRules || dna.visualDna.typographyDirection,
        },
        logoDirection:
          k?.visualSystem?.logoDirection ||
          `Dynamic vector emblem balancing structural order and directional energy, rendering cleanly in both dark teal backgrounds and neon accents.`,
        imageryDirection: k?.visualSystem?.imageryDirection || dna.visualDna.imagery,
        compositionRules: toStrArray(k?.visualSystem?.compositionRules, [
          'Precision lab grid layout with 1px mint borders',
          'High contrast typographic hierarchy: bold sans titles and rich serif body copy',
          'Intentional restraint: no unnecessary pills or decorative gradient slop',
        ]),
      },
      launchAssets: {
        landingHeadline:
          k?.launchAssets?.landingHeadline ||
          `Your idea has a vision. Let's make ${world.name} undeniable.`,
        landingSubheadline: k?.launchAssets?.landingSubheadline || world.positioning,
        primaryCta: k?.launchAssets?.primaryCta || `Experience ${world.name} →`,
        secondaryCta: k?.launchAssets?.secondaryCta || 'Explore Brand Architecture',
        instagramCaption:
          k?.launchAssets?.instagramCaption ||
          `We’re officially unveiling ${world.name} today. ✨\n\nMost tools in our space focus on generic templates and empty hype. We built ${world.name} around a single Brand DNA: uncompromising clarity, real craft, and zero friction.\n\nLink in bio to explore the launch experience. #branding #design #strategy #launch #vision2u`,
        linkedInAnnouncement:
          k?.launchAssets?.linkedInAnnouncement ||
          `After weeks of forensic investigation, we’re proud to introduce ${world.name}.\n\nWhen we started looking into this problem, we realized the market was filled with generic solutions that failed to solve the real tension: ${discovery.coreProblem.slice(0, 140)}...\n\n${world.name} is built differently from the ground up.\n\nExplore our interactive Brand DNA and launch platform: [link]`,
        twitterThreadOpening:
          k?.launchAssets?.twitterThreadOpening ||
          `1/7 We just launched ${world.name}. Here is why we rejected every standard playbook in our industry to build something truly distinctive 🧵👇`,
        productHuntTagline:
          k?.launchAssets?.productHuntTagline ||
          `${world.tagline} — Powered by Vision2U Brand Intelligence`,
      },
    };
  };

  return callAgentApi<LaunchKitData>(
    {
      agentRole: 'Launch Strategist',
      systemPrompt: LAUNCH_KIT_PROMPT,
      userMessage: JSON.stringify({ world, dna, discovery, challenges }, null, 2),
    },
    () => {
      if (isHackathonSample) {
        return HACKATHON_DEMO_LAUNCH_KIT;
      }
      return normalizeLaunchKit({});
    },
    normalizeLaunchKit
  );
}
