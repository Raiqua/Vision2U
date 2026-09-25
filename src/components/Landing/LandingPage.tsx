import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Search,
  Dna,
  Swords,
  ShieldAlert,
  ShieldCheck,
  Rocket,
  CheckCircle,
  HelpCircle,
  Cpu,
} from 'lucide-react';
import { Vision2UVisualizer } from '../Vision2UVisualizer/Vision2UVisualizer';
import { useBrand } from '../../context/BrandContext';

export const LandingPage: React.FC = () => {
  const { setStage, loadDemoData, setIsAiWorkflowOpen } = useBrand();

  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] lab-glow pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#086E77]/60 border border-[#9FD3CD]/40 text-[#9FD3CD] text-xs font-heading font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
              AI Brand Intelligence Laboratory
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-heading leading-[1.12]">
              Your idea has a vision.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9FD3CD] via-[#4FB3AE] to-white block sm:inline">
                Let’s give it a brand.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#E6F4F1]/90 font-editorial leading-relaxed max-w-2xl">
              Vision2U investigates your unfinished idea, builds its persistent <strong>Brand DNA</strong>, challenges generic thinking, and transforms strategic intuition into a coherent, launch-ready brand system.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setStage('input')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(25,147,150,0.5)] hover:shadow-[0_0_25px_rgba(25,147,150,0.8)] transition-all cursor-pointer group"
              >
                <span>Investigate My Idea</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToWorkflow}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#086E77]/50 hover:bg-[#086E77] text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30 font-heading font-semibold text-sm transition-all cursor-pointer"
              >
                See How It Works
              </button>

              <button
                onClick={loadDemoData}
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/5 text-[#FF6B6B] border border-[#FF6B6B]/40 font-heading font-semibold text-xs tracking-wide transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>Try Demo Idea (1-Click)</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#9FD3CD]/80 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#4FB3AE]" /> Not a basic logo generator
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#4FB3AE]" /> Persistent Brand DNA memory
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#4FB3AE]" /> Built-in Anti-Generic Critic
              </span>
            </div>
          </div>

          {/* Right Column: Central Vision2U Pipeline Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <Vision2UVisualizer interactive={true} onSelectStage={(targetStage) => setStage(targetStage)} />
            <p className="text-[11px] text-[#9FD3CD]/60 font-mono tracking-widest uppercase mt-4 text-center">
              The Vision2U Pipeline · Click any stage node
            </p>
          </div>
        </div>
      </section>

      {/* Section 28: WHY VISION2U? */}
      <section className="py-20 border-t border-[#9FD3CD]/20 bg-[#086E77]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[#FF6B6B] uppercase">
              THE AI BRAND INVESTIGATION LAB
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Why Vision2U?
            </h2>
            <p className="text-[#E6F4F1]/80 font-editorial text-base">
              Most AI tools suffer from the single-prompt trap: enter idea, receive generic platitudes. Vision2U operates as a forensic brand intelligence agency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-[#044550] border border-[#9FD3CD]/30 hover:border-[#9FD3CD] transition-all relative group shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#086E77] border border-[#9FD3CD]/40 flex items-center justify-center text-[#9FD3CD] mb-6 group-hover:scale-105 transition-transform">
                <Search className="w-6 h-6 text-[#9FD3CD]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-3">
                Don’t Generate. Investigate.
              </h3>
              <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed mb-4">
                Understand the problem, human tension, and audience context before touching visual branding. We diagnose hidden founder assumptions and uncover what truly needs to be solved.
              </p>
              <div className="text-xs font-mono text-[#4FB3AE]">
                → Forensic Discovery Analyst
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-[#044550] border border-[#9FD3CD]/30 hover:border-[#9FD3CD] transition-all relative group shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#086E77] border border-[#9FD3CD]/40 flex items-center justify-center text-[#9FD3CD] mb-6 group-hover:scale-105 transition-transform">
                <Dna className="w-6 h-6 text-[#4FB3AE]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-3">
                Build Your Brand DNA.
              </h3>
              <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed mb-4">
                Create a persistent strategic identity system that guides every future decision. Brand DNA is the immutable memory of your brand: personality scores, tonal principles, and visual guardrails.
              </p>
              <div className="text-xs font-mono text-[#4FB3AE]">
                → Persistent Identity System
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-[#044550] border border-[#9FD3CD]/30 hover:border-[#9FD3CD] transition-all relative group shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#086E77] border border-[#9FD3CD]/40 flex items-center justify-center text-[#9FD3CD] mb-6 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-3">
                Challenge Everything.
              </h3>
              <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed mb-4">
                Detect startup clichés, generic buzzwords, audience mismatches, and DNA contradictions before launch. Great branding is about actively rejecting lazy ideas.
              </p>
              <div className="text-xs font-mono text-[#FF6B6B]">
                → Ruthless Anti-Generic Engine
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 29: WORKFLOW SECTION */}
      <section id="workflow-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-[#9FD3CD] uppercase">
            THE 6-STAGE PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            How Vision2U Works
          </h2>
          <p className="text-[#E6F4F1]/80 font-editorial text-base">
            From raw, unfinished idea to launch-ready brand system in six structured, AI-orchestrated stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-[#9FD3CD]">01</span>
              <Search className="w-5 h-5 text-[#9FD3CD]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">DISCOVER</h4>
            <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed">
              Understand the idea. Map the core problem, real audience, hidden assumptions, and open questions without jumping to logos.
            </p>
            <div className="text-[11px] font-mono text-[#4FB3AE] pt-2">
              Agent: Strategic Researcher
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-[#9FD3CD]">02</span>
              <Dna className="w-5 h-5 text-[#9FD3CD]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">DEFINE</h4>
            <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed">
              Build the persistent Brand DNA. Configure personality sliders, brand principles, voice rules, and visual DNA tokens.
            </p>
            <div className="text-[11px] font-mono text-[#4FB3AE] pt-2">
              Agent: Lead Brand Strategist
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-[#9FD3CD]">03</span>
              <Swords className="w-5 h-5 text-[#9FD3CD]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">EXPLORE</h4>
            <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed">
              Create 3 radically distinct Brand Worlds. Compare strategic risk, memorability, DNA alignment, and audience resonance.
            </p>
            <div className="text-[11px] font-mono text-[#4FB3AE] pt-2">
              Agent: Creative Director
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-[#FF6B6B]">04</span>
              <ShieldAlert className="w-5 h-5 text-[#FF6B6B]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">CHALLENGE</h4>
            <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed">
              Attack generic thinking. Identify clichés, hollow startup jargon, and contradictions, then review differentiated alternatives.
            </p>
            <div className="text-[11px] font-mono text-[#FF6B6B] pt-2">
              Agent: Brand Critic
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-6 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-[#4FB3AE]">05</span>
              <ShieldCheck className="w-5 h-5 text-[#4FB3AE]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">GUARD</h4>
            <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed">
              Test consistency. Paste headlines, campaigns, or visual copy to test adherence against your locked Brand DNA with 1-click fixes.
            </p>
            <div className="text-[11px] font-mono text-[#4FB3AE] pt-2">
              Agent: Brand Guardian
            </div>
          </div>

          {/* Step 6 */}
          <div className="p-6 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-[#9FD3CD]">06</span>
              <Rocket className="w-5 h-5 text-[#9FD3CD]" />
            </div>
            <h4 className="font-heading font-bold text-lg text-white">LAUNCH</h4>
            <p className="font-editorial text-sm text-[#E6F4F1]/80 leading-relaxed">
              Turn strategy into assets. Generate landing headlines, elevator pitch, palette tokens, and launch announcements ready to export.
            </p>
            <div className="text-[11px] font-mono text-[#4FB3AE] pt-2">
              Agent: Launch Strategist
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#086E77] to-[#044550] border border-[#9FD3CD]/40 text-center space-y-4 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Ready to investigate your brand vision?
          </h3>
          <p className="text-sm font-editorial text-[#E6F4F1]/85 max-w-xl mx-auto">
            Start with the unfinished version of your idea. Vision2U will do the forensic strategic heavy lifting.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setStage('input')}
              className="px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              Start Investigation →
            </button>
            <button
              onClick={() => setIsAiWorkflowOpen(true)}
              className="px-5 py-3 rounded-xl bg-[#044550] hover:bg-black/30 text-[#9FD3CD] border border-[#9FD3CD]/30 font-heading font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Inspect AI Workflow</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
