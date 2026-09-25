import {
  DiscoveryData,
  BrandDNAData,
  BrandWorld,
  ChallengeIssue,
  ConsistencyReport,
  LaunchKitData,
  IdeaInputData,
} from '../types';

export const HACKATHON_DEMO_INPUT: IdeaInputData = {
  rawIdea:
    'An app that helps college and self-taught developers find high-commitment teammates for hackathons based on complimentary skills, work style, and actual code samples instead of desperate midnight Discord pings.',
  productType: 'App',
  targetAudience:
    'CS students, boot camp grads, and self-taught builders who want to ship winning projects without flakey teammates.',
  currentStage: 'Just an idea',
  constraints:
    'Must remain lightweight, avoid feeling like a boring corporate LinkedIn, and prioritize trust and fast chemistry.',
};

export const HACKATHON_DEMO_DISCOVERY: DiscoveryData = {
  coreProblem:
    'Hackathon participants waste critical kickoff hours or end up with inactive teammates because existing discovery relies on unstructured Discord chats and resume fluff rather than verified skills, urgency, and complementary grit.',
  targetAudience:
    'Ambitious student engineers, designers, and aspiring founders seeking high-velocity collaboration with peers who match their intensity and reliability.',
  context:
    'Hackathons are 24-48 hour hyper-pressured sprints. A single uncommunicative teammate ruins the entire weekend and kills project momentum.',
  desiredValue:
    'Zero-friction matchmaking into balanced, committed trios and quads (Frontend + Backend + Design/Story) within 5 minutes, backed by verified past project commits.',
  constraints: [
    'Cannot feel like corporate LinkedIn or HR recruiting',
    'Profiles must take under 90 seconds to configure',
    'Must handle extreme urgency right before project submission deadlines',
  ],
  assumptions: [
    'Assumes students care more about reliability and complementary skills than personal friendships during competitions',
    'Assumes users are willing to connect GitHub/Figma handles for auto-derived skill signals',
    'Assumes winning/shipping is the primary motivator for this demographic',
  ],
  openQuestions: [
    'How do we disincentivize last-minute ghosting once a team is formed?',
    'Should the matching be algorithmic or an interactive speed-swiping deck?',
    'What happens when solo builders already have 70% of an idea fleshed out?',
  ],
  whyReasoning:
    'By framing the problem as psychological alignment and grit matching rather than resume searching, we differentiate from job boards and unlock an emotionally resonant brand identity.',
  isAccepted: true,
};

export const HACKATHON_DEMO_DNA: BrandDNAData = {
  personality: [
    {
      name: 'Bold',
      score: 88,
      why: 'Hackathon builders thrive on high-energy, ambitious environments. The brand must feel confident, decisive, and fearless.',
    },
    {
      name: 'Curious',
      score: 92,
      why: 'The core audience are hackers exploring emerging tech; the voice must celebrate rapid experimentation and unconventional solutions.',
    },
    {
      name: 'Approachable',
      score: 84,
      why: 'First-time hackathon attendees suffer from imposter syndrome; the brand cannot feel gatekept or elitist.',
    },
    {
      name: 'Playful',
      score: 72,
      why: 'Hacking at 3 AM is fueled by memes, camaraderie, and caffeine. A sterile corporate tool will be rejected immediately.',
    },
    {
      name: 'Technical',
      score: 65,
      why: 'Needs enough technical cred to respect git repos and tech stacks without drowning in sterile engineering jargon.',
    },
  ],
  traitsToAvoid: [
    'Corporate HR tone',
    'Sterile LinkedIn formality',
    'Childish gamification',
    'Aggressive bro-culture hustle porn',
  ],
  principles: [
    {
      title: 'Ship Over Posture',
      description: 'We celebrate real demo links and working code over prestige credentials and credential inflation.',
    },
    {
      title: 'Chemistry Beats Pedigree',
      description: 'The best hackathon teams are defined by shared momentum and psychological safety, not identical resumes.',
    },
    {
      title: 'Zero Bureaucracy',
      description: 'Every interaction must happen in seconds. The hackathon clock is always ticking.',
    },
  ],
  promise: 'Never hack alone, never ship with strangers.',
  audienceCore:
    'The 3 AM builders: restless students, autodidacts, and makers who measure weekends in git commits and shipped demos.',
  voice: {
    soundsLike: [
      'Fast-paced and witty',
      'Encouraging yet unapologetically ambitious',
      'Fluent in developer culture and builder memes',
    ],
    doesNotSoundLike: [
      'Corporate recruiting recruiter-speak',
      'Paternalistic academic advisor lectures',
      'Over-polished enterprise SaaS pitch deck',
    ],
    tonalRules: [
      'Use active verbs and kinetic phrasing ("Form squad", "Lock stack", "Deploy crew")',
      'Keep sentences tight and energetic; cut introductory fluff',
      'Acknowledge the chaos of 3 AM debugging with affectionate camaraderie',
    ],
  },
  visualDna: {
    colorMood: 'Deep midnight electric teal with neon terminal accents and high-contrast mint highlights.',
    palette: [
      { name: 'Abyssal Teal', hex: '#044550', role: 'Deep canvas background' },
      { name: 'Bioluminescent Mint', hex: '#9FD3CD', role: 'Primary structure & glow lines' },
      { name: 'Velocity Cyan', hex: '#199396', role: 'Core actions & interactive buttons' },
      { name: 'Seafoam Signal', hex: '#4FB3AE', role: 'Secondary cards & radar traces' },
      { name: 'Sprint Red', hex: '#FF6B6B', role: 'Urgent accents & live countdowns' },
    ],
    typographyDirection:
      'Aggressive, architectural sans-serif headings (Montserrat/Space Grotesk) paired with high-clarity editorial body copy.',
    shapeLanguage: 'Geometric chamfers, crisp 45-degree slash badges, radar grids, and dynamic squad nodes.',
    imagery: 'Real unvarnished workbench photography: dual monitors, cold brew cans, sticky notes, and terminal traces.',
    composition: 'Asymmetric kinetic split layouts with live status pulses and modular workbench panels.',
    symbolStyle: 'Vector constellation glyphs, linked node brackets, and signal beacons.',
    visualAvoids: [
      'Generic 3D cartoon purple characters',
      'Stock corporate shaking hands in business suits',
      'Cheesy graduation caps or textbook clip-art',
    ],
  },
  isLocked: true,
  version: 1,
};

export const HACKATHON_DEMO_WORLDS: BrandWorld[] = [
  {
    id: 'world-a',
    archetype: 'THE SYNDICATE / REBEL',
    name: 'CREW_ZERO',
    tagline: 'Assembly required. Pedigree optional.',
    positioning:
      'The underground counter-cultural launchpad for rogue student builders who reject corporate job boards and build raw, legendary projects.',
    voice: 'Crisp, irreverent, hyper-direct. Speaks in terminal commands, git diffs, and rapid squad dispatches.',
    visualLanguage:
      'Dark-mode command terminal aesthetic, wireframe badges, neon mint accents, and brutalist typographic stamps.',
    audiencePerception:
      'Feels like an exclusive guild of elite builders; high cultural cachet among hardcore computer science hackers.',
    strategicRationale:
      'Leverages developer counter-culture to create intense organic community loyalty. Turns team-finding into a badge of builder honor.',
    accentColor: '#FF6B6B',
    evaluation: {
      dnaAlignment: {
        score: 93,
        why: 'Maximizes the Bold (88%) and Curious (92%) traits; hits the anti-corporate sweet spot dead center.',
      },
      audienceAlignment: {
        score: 91,
        why: 'Speaks the exact dialect of midnight hackathon veterans and open-source contributors.',
      },
      distinctiveness: {
        score: 96,
        why: 'Completely demolishes the generic pastel "student collaboration" trope seen in university portals.',
      },
      clarity: {
        score: 84,
        why: 'May feel slightly intense or intimidating to absolute first-time freshman coders without guidance.',
      },
      strategicRisk:
        'Could risk alienating beginner non-technical majors (designers, business pitches) if code elitism creeps in.',
      memorability: {
        score: 95,
        why: 'Unmistakable aesthetic; creates an instant brand tribe that members will stick on their MacBooks.',
      },
    },
  },
  {
    id: 'world-b',
    archetype: 'THE EMPOWERING CATALYST / GUIDE',
    name: 'SQUADRON',
    tagline: 'Find your missing piece. Ship by Sunday.',
    positioning:
      'The intuitive builder intelligence platform that pairs complementary skills and work rhythms so no great idea dies alone.',
    voice: 'Encouraging, momentum-driven, empathetic. Clear, decisive, and focused on shared breakthrough moments.',
    visualLanguage:
      'Clean architectural gridlines, smooth kinetic transitions, glowing connection nodes, and warm high-contrast teals.',
    audiencePerception:
      'The reliable, indispensable toolkit for hackathon success. Trustworthy, smart, and empowering.',
    strategicRationale:
      'Broadest appeal across developers, UI/UX designers, and domain experts. Positions the product as the catalyst for shipping.',
    accentColor: '#4FB3AE',
    evaluation: {
      dnaAlignment: {
        score: 94,
        why: 'Balanced harmony across Bold (88%), Curious (92%), and Approachable (84%). Avoids alienating any builder role.',
      },
      audienceAlignment: {
        score: 96,
        why: 'Welcoming to both competitive hackathon veterans and eager first-timers searching for mentors.',
      },
      distinctiveness: {
        score: 88,
        why: 'Very polished and differentiated from LinkedIn, though requires vigilant copy discipline to avoid standard SaaS tropes.',
      },
      clarity: {
        score: 95,
        why: 'Value proposition is understood within 2 seconds: form a complementary squad fast and build.',
      },
      strategicRisk:
        'Slightly lower brand edge than World A; requires bold typography and crisp micro-copy to stay memorable.',
      memorability: {
        score: 90,
        why: 'High recall due to clear visual metaphor of interlocking squad puzzle pieces.',
      },
    },
  },
  {
    id: 'world-c',
    archetype: 'THE FUTURIST / CO-LABORATORY',
    name: 'NEXUS ARCH',
    tagline: 'Algorithmic chemistry for zero-hour makers.',
    positioning:
      'The predictive collaboration engine using skill-graph vectors to orchestrate balanced, high-output dream teams.',
    voice: 'Analytical, visionary, forward-looking. Emphasizes velocity vectors, complementary mastery, and compound output.',
    visualLanguage:
      '3D node topologies, interactive radar skill graphs, dark teal glassmorphism, and precision vector coordinates.',
    audiencePerception:
      'Feels like next-generation frontier research lab software, high-tech and scientifically optimized.',
    strategicRationale:
      'Appeals deeply to AI/ML engineers, data science students, and hackers passionate about algorithmic matching.',
    accentColor: '#9FD3CD',
    evaluation: {
      dnaAlignment: {
        score: 82,
        why: 'Leans heavily into Technical (65%) and Curious (92%), but loses some Playfulness (72%) and Approachability (84%).',
      },
      audienceAlignment: {
        score: 85,
        why: 'Loved by technical purists, but might feel overly cerebral for narrative storytellers and visual designers.',
      },
      distinctiveness: {
        score: 92,
        why: 'Distinct from consumer social apps; feels like an advanced MIT Media Lab prototype.',
      },
      clarity: {
        score: 79,
        why: 'Scientific language can obscure the simple emotional problem: "I just need someone who knows React by 9 PM."',
      },
      strategicRisk:
        'Over-indexing on algorithmic complexity can distract from fast human connection and emotional chemistry.',
      memorability: {
        score: 87,
        why: 'Graph visualizations are striking, but brand voice risks sounding slightly detached.',
      },
    },
  },
];

export const HACKATHON_DEMO_CHALLENGES: ChallengeIssue[] = [
  {
    id: 'issue-01',
    category: 'cliche',
    categoryLabel: 'Startup Cliche',
    target: 'Empowering the next generation of builders',
    severity: 'high',
    why: [
      'Overused by 10,000+ university incubators and corporate CSR decks',
      'Completely empty of specific functional value or emotional tension',
      'Contradicts your "Ship Over Posture" Brand DNA principle',
    ],
    alternatives: [
      'Turn midnight brainstorms into Sunday morning pull requests',
      'The anti-flake squad finder for high-stakes hackathons',
      'Stop searching Discord at 2 AM. Lock your dream crew in 5 minutes.',
    ],
    selectedAlternative: 'Stop searching Discord at 2 AM. Lock your dream crew in 5 minutes.',
    status: 'accepted',
  },
  {
    id: 'issue-02',
    category: 'generic_language',
    categoryLabel: 'Generic Language',
    target: 'Seamless all-in-one collaborative platform',
    severity: 'high',
    why: [
      '"Seamless" and "all-in-one" are filler words with zero differentiation',
      'Fails to highlight your secret weapon: complementary skill verification',
      'Sounds like a generic enterprise productivity suite rather than an adrenaline-fueled hackathon tool',
    ],
    alternatives: [
      'Full-stack squad assembly with zero resume fluff',
      'Where React wizards meet PyTorch monsters and Figma obsessives',
      'Zero-bureaucracy squad matchmaking calibrated for hackathon speed',
    ],
    selectedAlternative: 'Full-stack squad assembly with zero resume fluff',
    status: 'accepted',
  },
  {
    id: 'issue-03',
    category: 'contradiction',
    categoryLabel: 'DNA Contradiction',
    target: 'Comprehensive 12-step career assessment survey',
    severity: 'medium',
    why: [
      'Directly violates Brand Principle: "Zero Bureaucracy"',
      'Conflicts with the Playful and Fast-paced voice',
      'Students in high-intensity weekend sprints will abandon the onboarding immediately',
    ],
    alternatives: [
      'Instant 60-second GitHub sync + 3-tag vibe check',
      'Two-tap squad builder: pick your stack, pick your sleep schedule',
      'Interactive skill card shuffle that builds your profile in 45 seconds',
    ],
    selectedAlternative: 'Instant 60-second GitHub sync + 3-tag vibe check',
    status: 'accepted',
  },
  {
    id: 'issue-04',
    category: 'audience_mismatch',
    categoryLabel: 'Audience Mismatch',
    target: 'Enterprise-grade talent pipeline for corporate campus recruiters',
    severity: 'high',
    why: [
      'Triggers immediate skepticism from students who despise being sold as leads',
      'Destroys peer-to-peer authenticity and builder culture',
      'Violates "Traits to Avoid: Corporate HR tone"',
    ],
    alternatives: [
      'Built by hackers, for hackers: your projects stay yours',
      'No recruiters in the lobby. Just pure builder chemistry.',
      'A community of shipping machines, not candidate resumes.',
    ],
    selectedAlternative: 'No recruiters in the lobby. Just pure builder chemistry.',
    status: 'accepted',
  },
];

export const HACKATHON_DEMO_CONSISTENCY: ConsistencyReport = {
  assetTested:
    'Squadron is an intuitive workspace empowering creators to find teammates seamlessly. Take our comprehensive skill quiz to unlock professional campus networking opportunities.',
  assetType: 'Landing Page Hero Copy',
  overallScore: 74,
  dimensions: {
    voice: {
      score: 72,
      status: 'warning',
      why: 'Drifts into formal corporate recruitment jargon ("comprehensive skill quiz", "professional campus networking"). Loses developer wit.',
    },
    personality: {
      score: 78,
      status: 'warning',
      why: 'Boldness dropped from 88% to 60%; sounds like a university career services brochure.',
    },
    audienceFit: {
      score: 82,
      status: 'pass',
      why: 'Targets student creators, but underestimates their appetite for speed and irreverence.',
    },
    positioning: {
      score: 76,
      status: 'warning',
      why: 'Positions as general "networking" rather than adrenaline-fueled hackathon squad assembly.',
    },
    visualDna: {
      score: 89,
      status: 'pass',
      why: 'Dark teal palette and typography remain aligned with the brand design token library.',
    },
    genericity: {
      score: 61,
      status: 'fail',
      why: 'Uses three high-frequency cliches: "empowering", "seamlessly", and "comprehensive quiz".',
    },
  },
  detectedIssues: [
    {
      id: 'issue-cons-01',
      dimension: 'Voice & Genericity',
      title: 'Corporate Recruitment Drift',
      explanation:
        'Phrases like "comprehensive skill quiz" and "professional campus networking" clash with the brand promise ("Never hack alone, never ship with strangers").',
      suggestion:
        'Replace with action-oriented, fast-paced language that highlights shipping code.',
      fixText:
        'Squadron connects high-velocity student builders into balanced hackathon squads. Sync your GitHub in 60 seconds, lock your stack, and ship before the deadline.',
    },
    {
      id: 'issue-cons-02',
      dimension: 'Brand DNA Alignment',
      title: 'Missing Brand Velocity',
      explanation:
        'The copy lacks the urgency of a 36-hour sprint. Hackathons are about the ticking clock.',
      suggestion: 'Incorporate time and commitment triggers.',
      fixText:
        'The hackathon clock is ticking. Find your frontend partner, design lead, and backend beast in under 5 minutes.',
    },
  ],
};

export const HACKATHON_DEMO_LAUNCH_KIT: LaunchKitData = {
  strategy: {
    problem:
      'Hackathons are won or lost in the first 2 hours. Builders waste precious momentum scrolling noisy Discord channels or end up paired with ghost teammates.',
    audience:
      'Ambitious student engineers, designers, and autodidacts who want to ship award-winning projects at top hackathons.',
    positioning:
      'The anti-flake squad assembly platform that pairs builders on verified code velocity, complementary stacks, and grit.',
    valueProp:
      'Zero-fluff team formation in under 5 minutes, backed by real github commits and verified skill chemistry.',
  },
  identity: {
    brandName: 'SQUADRON',
    tagline: 'Find your missing piece. Ship by Sunday.',
    promise: 'Never hack alone, never ship with strangers.',
    archetype: 'The Empowering Catalyst / Guide',
    personalitySummary: 'Bold (88%), Curious (92%), Approachable (84%), Fast-paced, Anti-Corporate.',
  },
  messaging: {
    oneLinePitch:
      'Squadron is the instant hackathon squad assembler that matches developers and designers based on real code commits, timezone, and commitment level.',
    elevatorPitch:
      'Every weekend, thousands of talented builders show up to hackathons with big ambitions, only to have their projects crushed by mismatched skills or uncommunicative teammates. Squadron solves this in 60 seconds: by syncing your GitHub and Figma portfolios, we match you into balanced, high-velocity trios and quads ready to build. No Discord spam, no ghosting, just pure shipping chemistry.',
    voiceRules: [
      'Talk like an experienced builder helping another builder, never like an HR representative.',
      'Treat the countdown clock with respect: keep words short, punchy, and actionable.',
      'Highlight concrete artifacts: repos, commits, wireframes, and live demos.',
    ],
    sampleCopy: [
      'Your frontend needs a backend beast. We found three who sleep in your timezone.',
      'Stop pitching strangers in general chat. Match with builders who stay awake until the deploy.',
      'Built for 36-hour miracles.',
    ],
  },
  visualSystem: {
    palette: [
      { name: 'Abyssal Teal', hex: '#044550', role: 'Deep laboratory canvas background' },
      { name: 'Velocity Cyan', hex: '#199396', role: 'Primary interactive button & active highlights' },
      { name: 'Bioluminescent Mint', hex: '#9FD3CD', role: 'Structure borders, node links, badges' },
      { name: 'Seafoam Signal', hex: '#4FB3AE', role: 'Secondary panels, metrics, radar charts' },
      { name: 'Sprint Red', hex: '#FF6B6B', role: 'Countdown alert badges & live matchmaking beacon' },
    ],
    typography: {
      headlineFont: 'Montserrat (Bold 700 / ExtraBold 800)',
      bodyFont: 'Merriweather (Light 300 / Regular 400)',
      hierarchyRules:
        'High contrast scale: tight letter-spaced uppercase labels for telemetry and status; rich serif copy for strategic rationale.',
    },
    logoDirection:
      'A stylized geometric chevron node forming an open square and directional arrow, signifying complementary assembly and forward momentum.',
    imageryDirection:
      'Authentic candid workbench shots: dual monitor setups, code editors, cold brew, terminal windows, whiteboard sketches with glowing UI overlays.',
    compositionRules: [
      'Modular command cards with subtle 1px mint borders (#9FD3CD/30)',
      'Subtle 32px lab grid lines with radial bioluminescent glow',
      'Never use rounded bubbly cartoon illustrations or generic corporate stock photos',
    ],
  },
  launchAssets: {
    landingHeadline: 'Your idea has a vision. Assemble the squad to ship it.',
    landingSubheadline:
      'Stop scrambling through chaotic Discord chats at 2 AM. Squadron matches you with high-commitment hackathon teammates who complement your stack and match your intensity.',
    primaryCta: 'Assemble Your Squad →',
    secondaryCta: 'Explore How Matching Works',
    instagramCaption:
      'The worst feeling at a hackathon isn’t fixing bugs at 3 AM. It’s realizing your teammate went to sleep 6 hours ago and took the repo credentials with them. 💀\n\nMeet @SquadronApp: Instant, verified squad formation for college builders. Match by stack, timezone, and commitment. Link in bio to lock your crew for your next hackathon. ⚡️🚀 #hackathon #buildinpublic #devlife #studentdeveloper #csmajor',
    linkedInAnnouncement:
      'Most hackathons don’t fail because of bad ideas. They fail because of mismatched expectations.\n\nOver the past 3 months, we interviewed 140+ student builders. The #1 frustration was consistent: spending the first 4 critical hours of a 36-hour sprint spamming Discord #team-formation channels with zero clue if potential teammates are reliable.\n\nToday, we’re unveiling Squadron — an intelligent squad assembler designed specifically for student hackers, designers, and autodidacts.\n\n✓ 60-second GitHub & Figma integration\n✓ Algorithmic complementary stack pairing\n✓ Real commitment level calibration\n✓ Zero corporate recruiter noise\n\nSee how we built the brand and explore the platform today: [link]',
    twitterThreadOpening:
      '1/8 Finding hackathon teammates in 2026 is still broken: desperate Discord pings, awkward elevator pitches, and waking up Sunday to a ghosted repo.\n\nWe built Squadron to change this forever. Here’s how we’re turning random hackers into shipping machines 🧵👇',
    productHuntTagline: 'Anti-flake hackathon squad assembly powered by verified skill chemistry',
  },
};
