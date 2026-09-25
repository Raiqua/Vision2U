import React, { useState } from 'react';
import {
  Compass,
  Dna,
  Swords,
  Bomb,
  ShieldCheck,
  Rocket,
  Cpu,
  RotateCcw,
  Sparkles,
  FileText,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { StageId } from '../../types';

const NAV_ITEMS: { id: StageId; number: string; label: string; icon: any }[] = [
  { id: 'discovery', number: '01', label: 'Discover', icon: Compass },
  { id: 'brand_dna', number: '02', label: 'Brand DNA', icon: Dna },
  { id: 'brand_worlds', number: '03', label: 'Worlds', icon: Swords },
  { id: 'challenge', number: '04', label: 'Challenge', icon: Bomb },
  { id: 'guardian', number: '05', label: 'Guardian', icon: ShieldCheck },
  { id: 'launch', number: '06', label: 'Launch', icon: Rocket },
];

export const Navbar: React.FC = () => {
  const {
    stage,
    setStage,
    completedStages,
    setIsAiWorkflowOpen,
    loadDemoData,
    resetInvestigation,
    discovery,
    launchKit,
  } = useBrand();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleStageClick = (targetStage: StageId) => {
    // Allow navigation if stage is completed or current or previous stages done
    setStage(targetStage);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#9FD3CD]/20 bg-[#044550]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setStage('landing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#9FD3CD]/60 flex items-center justify-center shadow-[0_0_15px_rgba(25,147,150,0.4)] group-hover:scale-105 transition-transform bg-[#FA6868] shrink-0">
              <img
                src="/logo.png"
                alt="Vision2U Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-heading font-black tracking-wider text-base text-white flex items-center gap-1.5">
                VISION2U
                <span className="text-[9px] font-mono font-medium px-1.5 py-0.2 rounded bg-[#086E77] text-[#9FD3CD] border border-[#9FD3CD]/30">
                  LAB
                </span>
              </div>
              <p className="text-[10px] text-[#9FD3CD]/80 font-editorial tracking-tight -mt-0.5 hidden sm:block">
                See the vision. Shape the brand.
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Pipeline Stage Tracker */}
        <nav className="hidden lg:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCurrent = stage === item.id;
            const isCompleted = completedStages.includes(item.id);
            const isAccessible = isCompleted || isCurrent || (discovery && item.id === 'discovery');

            return (
              <button
                key={item.id}
                onClick={() => isAccessible && handleStageClick(item.id)}
                disabled={!isAccessible}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-heading font-medium transition-all ${
                  isCurrent
                    ? 'bg-[#086E77] text-white border border-[#9FD3CD] shadow-[0_0_10px_rgba(25,147,150,0.4)]'
                    : isCompleted
                    ? 'text-[#9FD3CD] hover:bg-[#086E77]/50 hover:text-white cursor-pointer'
                    : isAccessible
                    ? 'text-white/80 hover:bg-[#086E77]/40 cursor-pointer'
                    : 'text-white/30 cursor-not-allowed opacity-50'
                }`}
              >
                <span
                  className={`text-[10px] font-mono ${
                    isCurrent ? 'text-[#FF6B6B]' : isCompleted ? 'text-[#4FB3AE]' : 'text-white/40'
                  }`}
                >
                  {item.number}
                </span>
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {isCompleted && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9FD3CD]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right utility actions */}
        <div className="flex items-center gap-2">
          {/* Quick Demo Loader */}
          <button
            onClick={loadDemoData}
            title="Load Hackathon Teammates Demo Data"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#086E77]/80 hover:bg-[#199396] text-white border border-[#9FD3CD]/30 text-xs font-heading font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
            <span className="hidden sm:inline">Try Demo Idea</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* AI Workflow Architecture Inspector */}
          <button
            onClick={() => setIsAiWorkflowOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#199396]/20 hover:bg-[#199396]/40 text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30 text-xs font-heading font-medium transition-all cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden md:inline">AI Workflow</span>
          </button>

          {/* Brand Kit / Export Link */}
          {(launchKit || completedStages.length >= 3) && (
            <button
              onClick={() => setStage('export')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#9FD3CD]/15 hover:bg-[#9FD3CD]/25 text-[#9FD3CD] border border-[#9FD3CD]/40 text-xs font-heading font-medium transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Dossier</span>
            </button>
          )}

          {/* Reset */}
          <button
            onClick={() => resetInvestigation()}
            title="Start New Brand Investigation"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-[#9FD3CD] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#9FD3CD]/20 bg-[#044550] px-4 py-3 space-y-2">
          <div className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider mb-2">
            Investigation Stages
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCurrent = stage === item.id;
            const isCompleted = completedStages.includes(item.id);

            return (
              <button
                key={item.id}
                onClick={() => handleStageClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-heading ${
                  isCurrent
                    ? 'bg-[#086E77] text-white font-bold'
                    : 'text-white/80 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs text-[#9FD3CD]">{item.number}</span>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isCompleted && (
                  <span className="text-[10px] font-mono text-[#4FB3AE]">COMPLETED</span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10 flex gap-2">
            <button
              onClick={() => {
                setStage('export');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-heading font-medium bg-[#086E77] text-white rounded-lg"
            >
              View Dossier
            </button>
            <button
              onClick={() => {
                setIsAiWorkflowOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-heading font-medium border border-[#9FD3CD]/30 text-[#9FD3CD] rounded-lg"
            >
              AI Workflow
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
