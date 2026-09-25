import React from 'react';
import { BrandProvider, useBrand } from './context/BrandContext';
import { Navbar } from './components/Navigation/Navbar';
import { LandingPage } from './components/Landing/LandingPage';
import { IdeaInputView } from './components/IdeaInput/IdeaInputView';
import { DiscoveryView } from './components/Discovery/DiscoveryView';
import { BrandDNAView } from './components/BrandDNA/BrandDNAView';
import { BrandWorldsView } from './components/BrandWorlds/BrandWorldsView';
import { ChallengeView } from './components/Challenge/ChallengeView';
import { GuardianView } from './components/Guardian/GuardianView';
import { LaunchKitView } from './components/LaunchKit/LaunchKitView';
import { ExportView } from './components/Export/ExportView';
import { WorkflowPanel } from './components/Workflow/WorkflowPanel';
import { WhyModal } from './components/UI/WhyModal';

const StageRenderer: React.FC = () => {
  const { stage } = useBrand();

  switch (stage) {
    case 'landing':
      return <LandingPage />;
    case 'input':
      return <IdeaInputView />;
    case 'discovery':
      return <DiscoveryView />;
    case 'brand_dna':
      return <BrandDNAView />;
    case 'brand_worlds':
      return <BrandWorldsView />;
    case 'challenge':
      return <ChallengeView />;
    case 'guardian':
      return <GuardianView />;
    case 'launch':
      return <LaunchKitView />;
    case 'export':
      return <ExportView />;
    default:
      return <LandingPage />;
  }
};

export default function App() {
  return (
    <BrandProvider>
      <div className="min-h-screen bg-[#044550] text-[#E6F4F1] lab-grid flex flex-col font-editorial selection:bg-[#199396] selection:text-white">
        <Navbar />
        <main className="flex-1">
          <StageRenderer />
        </main>

        {/* Global Expandable Modals & Panels */}
        <WorkflowPanel />
        <WhyModal />

        {/* Footer */}
        <footer className="border-t border-[#9FD3CD]/15 py-8 mt-12 bg-[#044550]/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9FD3CD]/70">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md overflow-hidden border border-[#9FD3CD]/40 shrink-0">
                <img
                  src="/logo.png"
                  alt="Vision2U"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-white font-heading">VISION2U</span>
              <span>·</span>
              <span>AI Brand Intelligence Laboratory</span>
            </div>
            <div>
              Persistent Brand DNA Architecture · Built with Gemini 3.8
            </div>
          </div>
        </footer>
      </div>
    </BrandProvider>
  );
}
