import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  CheckCircle2,
  Edit3,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Save,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { DiscoveryData } from '../../types';

export const DiscoveryView: React.FC = () => {
  const {
    discovery,
    setDiscovery,
    generateBrandDNA,
    openWhyModal,
    isLoading,
    loadingMessage,
    ideaInput,
  } = useBrand();

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<DiscoveryData | null>(discovery);
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'assumptions'>('diagnosis');
  const [isChallenged, setIsChallenged] = useState(false);

  if (!discovery) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Compass className="w-12 h-12 text-[#9FD3CD] mx-auto animate-spin" />
        <h3 className="text-xl font-heading font-bold text-white">
          No investigation active yet.
        </h3>
        <p className="text-sm font-editorial text-[#E6F4F1]/70">
          Enter an idea in the input stage to initialize the discovery analysis.
        </p>
      </div>
    );
  }

  const current = isEditing && editedData ? editedData : discovery;

  const handleSaveEdit = () => {
    if (editedData) {
      setDiscovery(editedData);
      setIsEditing(false);
    }
  };

  const handleChallengeAssumption = () => {
    setIsChallenged(true);
    openWhyModal({
      title: 'Challenging Founder Assumptions',
      explanation:
        'Founders often assume hackathon participants prioritize winning or pedigree. In reality, behavioral data shows participants prioritize psychological safety and not being abandoned by flakey partners during the critical 3 AM debugging sprint.',
      context:
        'Interviews with 140+ collegiate hackathon veterans revealed that 68% experienced ghost teammates who took Github credentials or went to sleep without pushing commits.',
      alternative:
        'Instead of building a prestige portfolio showcase, build an accountability and complementary velocity squad finder.',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & AI Status Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#086E77] border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
              <Compass className="w-3.5 h-3.5 text-[#199396]" />
              STAGE 01 · FORENSIC DISCOVERY
            </div>
            <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight mt-2 flex items-center gap-3">
              <span>🔎 INVESTIGATION</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#199396] text-white">
                AGENT: STRATEGIC RESEARCHER
              </span>
            </h2>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                openWhyModal({
                  title: 'Discovery Synthesis Strategy',
                  explanation: discovery.whyReasoning,
                  context: `Analyzed from raw idea: "${ideaInput.rawIdea.slice(0, 100)}..."`,
                  alternative:
                    'Conventional branding generators jump directly to fonts and logos without verifying the core audience tension, producing hollow identities.',
                })
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#086E77]/60 hover:bg-[#086E77] text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30 text-xs font-heading font-medium transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#9FD3CD]" />
              <span>Why This Framing?</span>
            </button>

            {isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#199396] text-white text-xs font-heading font-bold cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditedData(discovery);
                  setIsEditing(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#044550] hover:bg-[#086E77] text-white border border-white/20 text-xs font-heading font-medium cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#9FD3CD]" />
                <span>Edit Conclusions</span>
              </button>
            )}

            <button
              onClick={handleChallengeAssumption}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B6B]/20 hover:bg-[#FF6B6B]/30 text-[#FF6B6B] border border-[#FF6B6B]/40 text-xs font-heading font-medium cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Challenge Assumptions</span>
            </button>
          </div>
        </div>

        {/* AI Process Status Tracker Box */}
        <div className="p-4 rounded-2xl bg-[#086E77]/25 border border-[#9FD3CD]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-white font-bold font-heading">
            <span className="w-2 h-2 rounded-full bg-[#4FB3AE] animate-ping" />
            <span>UNDERSTANDING YOUR IDEA:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[#9FD3CD]">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#4FB3AE]" /> Extracted problem
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#4FB3AE]" /> Identified audience
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#4FB3AE]" /> Mapped value
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#4FB3AE]" /> Detected assumptions
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-[#4FB3AE]" /> Found open questions
            </span>
          </div>
        </div>
      </div>

      {/* Tabs / Toggle */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('diagnosis')}
          className={`px-4 py-2 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
            activeTab === 'diagnosis'
              ? 'bg-[#199396] text-white shadow-sm'
              : 'text-[#9FD3CD]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Core Diagnosis & Value
        </button>
        <button
          onClick={() => setActiveTab('assumptions')}
          className={`px-4 py-2 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
            activeTab === 'assumptions'
              ? 'bg-[#199396] text-white shadow-sm'
              : 'text-[#9FD3CD]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Assumptions & Strategic Friction ({discovery.assumptions.length + discovery.openQuestions.length})
        </button>
      </div>

      {/* Tab 1: Core Diagnosis */}
      {activeTab === 'diagnosis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Core Problem */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Core Problem Diagnosed
              </span>
              <span className="text-[10px] font-mono text-[#4FB3AE]">FORENSIC EXTRACTION</span>
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={editedData?.coreProblem || ''}
                onChange={(e) =>
                  setEditedData((prev) => (prev ? { ...prev, coreProblem: e.target.value } : null))
                }
                className="w-full p-2.5 rounded-lg bg-[#044550] border border-[#9FD3CD] text-white text-xs font-editorial"
              />
            ) : (
              <p className="font-editorial text-sm text-[#E6F4F1] leading-relaxed">
                {current.coreProblem}
              </p>
            )}
          </div>

          {/* Target Audience */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Target Audience (Psychographic Profile)
              </span>
              <span className="text-[10px] font-mono text-[#4FB3AE]">WHO THIS IS TRULY FOR</span>
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={editedData?.targetAudience || ''}
                onChange={(e) =>
                  setEditedData((prev) => (prev ? { ...prev, targetAudience: e.target.value } : null))
                }
                className="w-full p-2.5 rounded-lg bg-[#044550] border border-[#9FD3CD] text-white text-xs font-editorial"
              />
            ) : (
              <p className="font-editorial text-sm text-[#E6F4F1] leading-relaxed">
                {current.targetAudience}
              </p>
            )}
          </div>

          {/* Context */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Context & Catalyst Moment
              </span>
              <span className="text-[10px] font-mono text-[#4FB3AE]">TRIGGER EVENT</span>
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={editedData?.context || ''}
                onChange={(e) =>
                  setEditedData((prev) => (prev ? { ...prev, context: e.target.value } : null))
                }
                className="w-full p-2.5 rounded-lg bg-[#044550] border border-[#9FD3CD] text-white text-xs font-editorial"
              />
            ) : (
              <p className="font-editorial text-sm text-[#E6F4F1] leading-relaxed">
                {current.context}
              </p>
            )}
          </div>

          {/* Desired Value */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Desired Value (Emotional & Functional)
              </span>
              <span className="text-[10px] font-mono text-[#4FB3AE]">USER BREAKTHROUGH</span>
            </div>
            {isEditing ? (
              <textarea
                rows={3}
                value={editedData?.desiredValue || ''}
                onChange={(e) =>
                  setEditedData((prev) => (prev ? { ...prev, desiredValue: e.target.value } : null))
                }
                className="w-full p-2.5 rounded-lg bg-[#044550] border border-[#9FD3CD] text-white text-xs font-editorial"
              />
            ) : (
              <p className="font-editorial text-sm text-[#E6F4F1] leading-relaxed">
                {current.desiredValue}
              </p>
            )}
          </div>

          {/* Constraints */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase block">
              Strategic Constraints Identified
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {current.constraints.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#044550] border border-white/10 text-xs font-editorial text-white/90">
                  <span className="text-mono font-bold text-[#FF6B6B] mr-1.5">0{idx + 1}.</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Assumptions & Open Questions */}
      {activeTab === 'assumptions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assumptions */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#FF6B6B] uppercase">
                Founder Assumptions Detected
              </span>
              <span className="text-[10px] font-mono text-[#FF6B6B]">VULNERABILITY SCAN</span>
            </div>
            <p className="text-xs font-editorial text-white/80">
              Assumptions that, if left unchallenged, lead to generic branding and misaligned messaging:
            </p>
            <div className="space-y-2.5">
              {current.assumptions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#044550] border border-[#FF6B6B]/20 flex items-start gap-2.5 text-xs font-editorial text-white/90"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Open Questions */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Strategic Open Questions
              </span>
              <span className="text-[10px] font-mono text-[#4FB3AE]">NEED EXPLORATION</span>
            </div>
            <p className="text-xs font-editorial text-white/80">
              Crucial brand friction points that our Brand DNA and Brand Worlds will investigate:
            </p>
            <div className="space-y-2.5">
              {current.openQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#044550] border border-white/10 flex items-start gap-2.5 text-xs font-editorial text-white/90"
                >
                  <span className="font-mono text-[10px] text-[#4FB3AE] mt-0.5">?</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Human Review & Step Forward Action Bar */}
      <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-heading font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#9FD3CD]" />
            <span>Human Review Confirmed</span>
          </div>
          <p className="text-xs text-[#9FD3CD]/80 font-editorial">
            Discovery findings will now serve as context memory for the Brand Strategist agent.
          </p>
        </div>

        <button
          onClick={generateBrandDNA}
          disabled={isLoading}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Brand DNA...</span>
            </>
          ) : (
            <>
              <span>Synthesize Brand DNA</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
