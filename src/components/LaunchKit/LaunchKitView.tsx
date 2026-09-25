import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  Copy,
  Check,
  Share2,
  FileText,
  Palette,
  MessageSquare,
  Sparkles,
  Download,
  HelpCircle,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const LaunchKitView: React.FC = () => {
  const { launchKit, selectedWorld, dna, setStage, openWhyModal } = useBrand();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!launchKit) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Rocket className="w-12 h-12 text-[#9FD3CD] mx-auto animate-pulse" />
        <h3 className="text-xl font-heading font-bold text-white">
          Launch Kit not yet generated.
        </h3>
        <p className="text-sm font-editorial text-[#E6F4F1]/70">
          Complete Stage 05 Guardian or load demo data to compile your launch-ready assets.
        </p>
      </div>
    );
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#086E77] border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
            <Rocket className="w-3.5 h-3.5 text-[#199396]" />
            STAGE 06 · LAUNCH ASSETS
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight mt-2 flex items-center gap-3">
            <span>🚀 LAUNCH KIT</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#199396] text-white">
              LAUNCH READY
            </span>
          </h2>
          <p className="text-sm text-[#E6F4F1]/80 font-editorial mt-1 max-w-2xl">
            Everything your team needs to launch: positioning statements, landing page copy, social announcements, and brand guidelines.
          </p>
        </div>

        <button
          onClick={() => setStage('export')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#086E77] hover:bg-[#199396] text-white border border-[#9FD3CD]/40 font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          <FileText className="w-4 h-4" />
          <span>Full Executive Dossier</span>
        </button>
      </div>

      {/* Brand Hero Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#086E77] via-[#044550] to-[#044550] border-2 border-[#9FD3CD]/40 shadow-2xl relative overflow-hidden space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#9FD3CD] uppercase">
            BRAND SYSTEM IDENTIFIER
          </span>
          <span className="text-xs font-mono text-[#FF6B6B] border border-[#FF6B6B]/40 px-2 py-0.5 rounded">
            {launchKit.identity.archetype}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
            {launchKit.identity.brandName}
          </h3>
          <p className="font-editorial italic text-lg sm:text-xl text-[#9FD3CD]">
            "{launchKit.identity.tagline}"
          </p>
        </div>

        <p className="font-editorial text-sm text-[#E6F4F1]/90 max-w-3xl leading-relaxed pt-2">
          <strong>Strategic Promise:</strong> "{launchKit.identity.promise}"
        </p>
      </div>

      {/* Grid: Brand Strategy & Pitch Messaging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Strategy Summary */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-5">
          <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#9FD3CD]" />
            <span>Brand Strategy Foundation</span>
          </h4>

          <div className="space-y-3 text-xs font-editorial text-[#E6F4F1]/85">
            <div className="p-3.5 rounded-xl bg-[#044550]/80 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
                Problem Solved:
              </span>
              <p>{launchKit.strategy.problem}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#044550]/80 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
                Target Audience:
              </span>
              <p>{launchKit.strategy.audience}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#044550]/80 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
                Market Positioning:
              </span>
              <p>{launchKit.strategy.positioning}</p>
            </div>
          </div>
        </div>

        {/* Messaging Pitches */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-5">
          <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#4FB3AE]" />
            <span>Core Messaging Pitches</span>
          </h4>

          {/* One-Line Pitch */}
          <div className="p-4 rounded-xl bg-[#044550]/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider">
                One-Line Pitch
              </span>
              <button
                onClick={() => copyToClipboard(launchKit.messaging.oneLinePitch, 'oneline')}
                className="text-[#9FD3CD] hover:text-white text-xs flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey === 'oneline' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'oneline' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-editorial text-xs text-white leading-relaxed">
              "{launchKit.messaging.oneLinePitch}"
            </p>
          </div>

          {/* Elevator Pitch */}
          <div className="p-4 rounded-xl bg-[#044550]/80 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider">
                Elevator Pitch (30-Sec)
              </span>
              <button
                onClick={() => copyToClipboard(launchKit.messaging.elevatorPitch, 'elevator')}
                className="text-[#9FD3CD] hover:text-white text-xs flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey === 'elevator' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'elevator' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-editorial text-xs text-white/90 leading-relaxed">
              {launchKit.messaging.elevatorPitch}
            </p>
          </div>
        </div>
      </div>

      {/* Ready-to-use Digital Launch Assets */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF6B6B]" />
            <span>Digital Launch Collateral</span>
          </h4>
          <span className="text-xs font-mono text-[#9FD3CD]">Click any block to copy</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Landing Page Hero Package */}
          <div className="p-5 rounded-2xl bg-[#044550] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#9FD3CD] uppercase">
                Landing Page Hero Copy
              </span>
              <button
                onClick={() =>
                  copyToClipboard(
                    `${launchKit.launchAssets.landingHeadline}\n\n${launchKit.launchAssets.landingSubheadline}\n\nCTA: ${launchKit.launchAssets.primaryCta}`,
                    'landing'
                  )
                }
                className="text-[#9FD3CD] hover:text-white text-xs flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey === 'landing' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'landing' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="space-y-2">
              <p className="font-heading font-extrabold text-base text-white">
                {launchKit.launchAssets.landingHeadline}
              </p>
              <p className="font-editorial text-xs text-white/80 leading-relaxed">
                {launchKit.launchAssets.landingSubheadline}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-lg bg-[#199396] text-white text-xs font-heading font-bold">
                  {launchKit.launchAssets.primaryCta}
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white/70 text-xs font-heading">
                  {launchKit.launchAssets.secondaryCta}
                </span>
              </div>
            </div>
          </div>

          {/* Product Hunt Tagline */}
          <div className="p-5 rounded-2xl bg-[#044550] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#FF6B6B] uppercase">
                Product Hunt / Meta Tagline (60 Char)
              </span>
              <button
                onClick={() =>
                  copyToClipboard(launchKit.launchAssets.productHuntTagline, 'ph')
                }
                className="text-[#9FD3CD] hover:text-white text-xs flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey === 'ph' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'ph' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-[#086E77]/20 border border-white/5">
              <p className="font-heading font-bold text-sm text-white">
                "{launchKit.launchAssets.productHuntTagline}"
              </p>
            </div>

            <span className="text-[11px] font-editorial text-white/60 block">
              Optimized for high CTR without triggering anti-generic sentiment flags.
            </span>
          </div>

          {/* LinkedIn Announcement */}
          <div className="p-5 rounded-2xl bg-[#044550] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#9FD3CD] uppercase">
                LinkedIn Launch Post
              </span>
              <button
                onClick={() =>
                  copyToClipboard(launchKit.launchAssets.linkedInAnnouncement, 'li')
                }
                className="text-[#9FD3CD] hover:text-white text-xs flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey === 'li' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'li' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="font-editorial text-xs text-white/85 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto p-3 rounded-xl bg-black/20">
              {launchKit.launchAssets.linkedInAnnouncement}
            </pre>
          </div>

          {/* Instagram Caption */}
          <div className="p-5 rounded-2xl bg-[#044550] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#4FB3AE] uppercase">
                Instagram / Threads Caption
              </span>
              <button
                onClick={() =>
                  copyToClipboard(launchKit.launchAssets.instagramCaption, 'ig')
                }
                className="text-[#9FD3CD] hover:text-white text-xs flex items-center gap-1 font-mono cursor-pointer"
              >
                {copiedKey === 'ig' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'ig' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="font-editorial text-xs text-white/85 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto p-3 rounded-xl bg-black/20">
              {launchKit.launchAssets.instagramCaption}
            </pre>
          </div>
        </div>
      </div>

      {/* Visual System Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
        <h4 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#9FD3CD]" />
          <span>Visual System Rules & Design Tokens</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-[#044550] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
              Logo Direction
            </span>
            <p className="font-editorial text-xs text-white/85 leading-relaxed">
              {launchKit.visualSystem.logoDirection}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#044550] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
              Typography Stack
            </span>
            <p className="font-editorial text-xs text-white/85 leading-relaxed">
              <strong>Headlines:</strong> {launchKit.visualSystem.typography.headlineFont}
              <br />
              <strong>Body:</strong> {launchKit.visualSystem.typography.bodyFont}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#044550] border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
              Composition Rules
            </span>
            <ul className="text-xs font-editorial text-white/80 space-y-1">
              {launchKit.visualSystem.compositionRules.map((rule, idx) => (
                <li key={idx}>• {rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="font-heading font-bold text-sm text-white block">
            Investigation Complete & Ready for Export
          </span>
          <p className="text-xs text-[#9FD3CD]/80 font-editorial">
            View the executive dossier summary or download the full brand blueprint.
          </p>
        </div>

        <button
          onClick={() => setStage('export')}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer"
        >
          <span>View Executive Brand Dossier</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
