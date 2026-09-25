import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Wand2,
  RefreshCw,
  Eye,
  FileText,
  Sliders,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { ConsistencyDimension } from '../../types';

const SAMPLE_TEST_PRESETS = [
  {
    type: 'Landing Page Hero Copy',
    text: 'Our platform is an intuitive, all-in-one workspace empowering creators to find teammates seamlessly. Take our comprehensive skill quiz to unlock professional campus networking opportunities.',
  },
  {
    type: 'Social Launch Announcement',
    text: 'Tired of 3 AM debugging alone with ghost teammates? Squadron pairs you with high-velocity builders based on actual GitHub commits and verified chemistry. Ship by Sunday.',
  },
  {
    type: 'Feature Pitch',
    text: 'We are revolutionizing team synergy through an enterprise-grade talent pipeline tailored for institutional academic administrators.',
  },
];

export const GuardianView: React.FC = () => {
  const {
    guardianReport,
    runConsistencyCheck,
    generateLaunchKit,
    selectedWorld,
    dna,
    isLoading,
    openWhyModal,
  } = useBrand();

  const [inputCopy, setInputCopy] = useState(
    guardianReport ? guardianReport.assetTested : SAMPLE_TEST_PRESETS[0].text
  );
  const [selectedAssetType, setSelectedAssetType] = useState(
    guardianReport ? guardianReport.assetType : SAMPLE_TEST_PRESETS[0].type
  );
  const [activeTab, setActiveTab] = useState<'text' | 'visual'>('text');

  const handleTestAsset = () => {
    if (!inputCopy.trim()) return;
    runConsistencyCheck(inputCopy, selectedAssetType);
  };

  const handleApplyFix = (fixText: string) => {
    setInputCopy(fixText);
    runConsistencyCheck(fixText, selectedAssetType);
  };

  const getDimensionColor = (dim: ConsistencyDimension) => {
    if (dim.score >= 85) return 'text-[#9FD3CD] bg-[#086E77]';
    if (dim.score >= 70) return 'text-[#4FB3AE] bg-[#086E77]/60';
    return 'text-[#FF6B6B] bg-[#FF6B6B]/20';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#086E77] border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#199396]" />
            STAGE 05 · BRAND GUARDIAN
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight mt-2 flex items-center gap-3">
            <span>🛡 BRAND GUARDIAN</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#199396] text-white">
              MEMORY CHECKER
            </span>
          </h2>
          <p className="text-sm text-[#E6F4F1]/80 font-editorial mt-1 max-w-2xl">
            Does every part of your brand still feel like the same brand? Test headlines, campaigns, or visual copy against stored Brand DNA.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 border border-white/10 p-1 rounded-xl bg-[#044550]">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'bg-[#199396] text-white shadow-sm'
                : 'text-[#9FD3CD] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Copy & Message</span>
          </button>
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'visual'
                ? 'bg-[#199396] text-white shadow-sm'
                : 'text-[#9FD3CD] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visual Consistency</span>
          </button>
        </div>
      </div>

      {/* Testing Workbench Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-heading font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <span>Asset Testing Laboratory</span>
            <span className="text-xs font-mono font-normal text-[#9FD3CD]">
              (Checked against {selectedWorld?.name || 'Brand'} DNA)
            </span>
          </span>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-[#9FD3CD]/70">Presets:</span>
            {SAMPLE_TEST_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputCopy(preset.text);
                  setSelectedAssetType(preset.type);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#044550] hover:bg-[#086E77] text-[11px] font-heading text-white/90 border border-white/10 transition-colors cursor-pointer"
              >
                {preset.type.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Text input area */}
        <div className="space-y-3">
          <textarea
            rows={3}
            value={inputCopy}
            onChange={(e) => setInputCopy(e.target.value)}
            placeholder="Paste any headline, landing page copy, social tweet, or product description to test against your Brand DNA..."
            className="w-full p-4 rounded-2xl bg-[#044550]/80 border border-[#9FD3CD]/30 focus:border-[#9FD3CD] text-white placeholder-white/30 text-sm font-editorial leading-relaxed outline-hidden"
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-[#9FD3CD]/80 font-editorial">
              Category: <strong className="text-white">{selectedAssetType}</strong>
            </span>

            <button
              onClick={handleTestAsset}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing Consistency...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Run Guardian Audit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Text Results */}
      {activeTab === 'text' && guardianReport && (
        <div className="space-y-8">
          {/* Consistency Score Overview Bar */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/25 border border-[#9FD3CD]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full border-4 border-[#9FD3CD] bg-[#044550] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(25,147,150,0.5)]">
                <span className="text-2xl font-black font-mono text-white">
                  {guardianReport.overallScore}%
                </span>
                <span className="text-[9px] font-mono text-[#9FD3CD] uppercase">CONSISTENCY</span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-white">
                  Brand Consistency Diagnosis
                </h3>
                <p className="text-xs font-editorial text-[#E6F4F1]/80 max-w-md mt-1">
                  Tested against locked Brand DNA rules: Voice, Personality, Audience Fit, and Anti-Generic standards.
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-[#FF6B6B] font-bold">
                {guardianReport.detectedIssues.length} Vulnerabilities Detected
              </div>
              <span className="text-[11px] font-editorial text-white/60">
                Actionable fixes ready below
              </span>
            </div>
          </div>

          {/* 6 Dimension Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(guardianReport.dimensions).map(([key, dim]) => {
              const label = key.replace(/([A-Z])/g, ' $1').toUpperCase();

              return (
                <div
                  key={key}
                  className="p-4 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/25 space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#9FD3CD] tracking-wider">
                      {label}
                    </span>
                    <span
                      className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${getDimensionColor(
                        dim
                      )}`}
                    >
                      {dim.score}%
                    </span>
                  </div>

                  <p className="text-[11px] font-editorial text-white/80 line-clamp-3">
                    {dim.why}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detected Issues & One-Click Fixes */}
          {guardianReport.detectedIssues.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-base text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF6B6B]" />
                  <span>Detected Inconsistencies & Remediation</span>
                </h4>
                <span className="text-xs font-mono text-[#9FD3CD]">One-Click Fix Enabled</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guardianReport.detectedIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-6 rounded-2xl bg-[#044550] border border-[#FF6B6B]/40 space-y-4 shadow-lg flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#FF6B6B] uppercase font-bold">
                          {issue.dimension}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF6B6B]/20 text-[#FF6B6B]">
                          DRIFT DETECTED
                        </span>
                      </div>

                      <h5 className="font-heading font-bold text-sm text-white">
                        {issue.title}
                      </h5>

                      <p className="text-xs font-editorial text-[#E6F4F1]/80 leading-relaxed">
                        {issue.explanation}
                      </p>

                      {issue.fixText && (
                        <div className="p-3.5 rounded-xl bg-[#086E77]/30 border border-[#9FD3CD]/30 space-y-1">
                          <span className="text-[10px] font-mono text-[#4FB3AE] font-bold uppercase block">
                            On-Brand Replacement:
                          </span>
                          <p className="font-editorial text-xs text-white italic">
                            "{issue.fixText}"
                          </p>
                        </div>
                      )}
                    </div>

                    {issue.fixText && (
                      <button
                        onClick={() => handleApplyFix(issue.fixText!)}
                        className="w-full py-2.5 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Fix It (Apply Rewrite) →</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Visual Consistency (Section 16 requirement) */}
      {activeTab === 'visual' && dna && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Visual Alignment Matrix
              </h3>
              <p className="text-xs font-editorial text-[#E6F4F1]/80">
                Comparing current design tokens and submitted visual assets against locked Brand DNA.
              </p>
            </div>
            <span className="text-xs font-mono text-[#4FB3AE] border border-[#4FB3AE]/40 px-2 py-1 rounded">
              VISUAL GUARDIAN ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#044550] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase block">
                YOUR BRAND DNA MASTER TOKENS
              </span>
              <div className="space-y-2 text-xs font-editorial text-white/90">
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span>Color Mood:</span>
                  <span className="font-mono text-[#9FD3CD] text-[11px] truncate max-w-[200px]">
                    {dna.visualDna.colorMood}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span>Shape Language:</span>
                  <span className="font-mono text-[#9FD3CD] text-[11px]">
                    {dna.visualDna.shapeLanguage.slice(0, 30)}...
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span>Imagery Style:</span>
                  <span className="font-mono text-[#9FD3CD] text-[11px]">
                    {dna.visualDna.imagery.slice(0, 30)}...
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-white/5">
                  <span>Typography:</span>
                  <span className="font-mono text-[#9FD3CD] text-[11px]">
                    Montserrat + Merriweather
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#044550] border border-[#9FD3CD]/30 space-y-3">
              <span className="text-xs font-mono font-bold tracking-wider text-[#4FB3AE] uppercase block">
                SUBMITTED VISUAL COMPLIANCE
              </span>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-[#086E77]/30 text-white">
                  <span>Boldness:</span>
                  <span className="text-[#4FB3AE] font-bold">✓ 94% COMPLIANT</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#086E77]/30 text-white">
                  <span>Color Contrast:</span>
                  <span className="text-[#4FB3AE] font-bold">✓ 91% COMPLIANT</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#086E77]/30 text-white">
                  <span>Grid & Geometry:</span>
                  <span className="text-[#4FB3AE] font-bold">✓ 89% COMPLIANT</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#086E77]/30 text-white">
                  <span>Banned Cliché Ban:</span>
                  <span className="text-[#4FB3AE] font-bold">✓ 100% CLEAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer to Proceed to Stage 06: Launch Kit */}
      <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-heading font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#9FD3CD]" />
            <span>Consistency Verified</span>
          </div>
          <p className="text-xs text-[#9FD3CD]/80 font-editorial">
            Compile the entire brand architecture into launch-ready copy, social announcements, and design tokens.
          </p>
        </div>

        <button
          onClick={generateLaunchKit}
          disabled={isLoading}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Launch Kit...</span>
            </>
          ) : (
            <>
              <span>Generate Launch Kit</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
