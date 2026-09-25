import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Swords,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  BarChart2,
  Check,
  ChevronRight,
  Eye,
  Lock,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { BrandWorld } from '../../types';

export const BrandWorldsView: React.FC = () => {
  const {
    brandWorlds,
    selectedWorldId,
    setSelectedWorldId,
    selectedWorld,
    runAntiGenericChallenge,
    openWhyModal,
    isLoading,
    dna,
  } = useBrand();

  const [activeTab, setActiveTab] = useState<'cards' | 'comparison'>('cards');

  if (!brandWorlds || brandWorlds.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Swords className="w-12 h-12 text-[#9FD3CD] mx-auto animate-pulse" />
        <h3 className="text-xl font-heading font-bold text-white">Brand Worlds not generated.</h3>
        <p className="text-sm font-editorial text-[#E6F4F1]/70">
          Complete Stage 02 Brand DNA or load demo data to generate the 3 strategic Brand Worlds.
        </p>
      </div>
    );
  }

  const currentChoice = selectedWorld || brandWorlds[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#086E77] border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
            <Swords className="w-3.5 h-3.5 text-[#199396]" />
            STAGE 03 · DIVERGENT STRATEGIC FUTURES
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight mt-2 flex items-center gap-3">
            <span>⚔️ BRAND WORLDS</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#199396] text-white">
              ONE DNA · THREE FUTURES
            </span>
          </h2>
          <p className="text-sm text-[#E6F4F1]/80 font-editorial mt-1 max-w-2xl">
            Each world represents an entirely different posture, tone, and market opportunity interpreting your locked Brand DNA.
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-2 border border-white/10 p-1 rounded-xl bg-[#044550]">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'cards'
                ? 'bg-[#199396] text-white shadow-sm'
                : 'text-[#9FD3CD] hover:text-white'
            }`}
          >
            World Dossiers
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-[#199396] text-white shadow-sm'
                : 'text-[#9FD3CD] hover:text-white'
            }`}
          >
            Strategic Matrix & Scores
          </button>
        </div>
      </div>

      {/* Selected Indicator Banner */}
      <div className="p-4 rounded-2xl bg-[#086E77]/50 border border-[#9FD3CD]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B] animate-ping" />
          <span className="text-[#9FD3CD]">ACTIVE SELECTION:</span>
          <strong className="font-heading font-extrabold text-sm text-white tracking-wide">
            {currentChoice.name} ({currentChoice.archetype})
          </strong>
        </div>

        <div className="text-xs text-[#9FD3CD]/80 font-editorial">
          DNA Alignment: <strong className="text-white font-mono">{currentChoice.evaluation.dnaAlignment.score}%</strong> · 
          Audience Fit: <strong className="text-white font-mono">{currentChoice.evaluation.audienceAlignment.score}%</strong>
        </div>
      </div>

      {/* TAB 1: 3 STRATEGIC WORLD CARDS */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {brandWorlds.map((world) => {
            const isSelected = world.id === currentChoice.id;

            return (
              <motion.div
                key={world.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'bg-[#086E77]/40 border-[#9FD3CD] shadow-[0_0_25px_rgba(25,147,150,0.35)] ring-2 ring-[#9FD3CD]/50'
                    : 'bg-[#086E77]/15 border-white/15 hover:border-[#9FD3CD]/60 hover:bg-[#086E77]/25'
                }`}
              >
                <div className="space-y-5">
                  {/* Card Header & Archetype */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${world.accentColor}20`,
                        color: world.accentColor,
                        border: `1px solid ${world.accentColor}40`,
                      }}
                    >
                      {world.archetype}
                    </span>

                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-[#9FD3CD] font-bold">
                        <Check className="w-3.5 h-3.5 text-[#9FD3CD]" /> SELECTED
                      </span>
                    )}
                  </div>

                  {/* Brand Name & Tagline */}
                  <div>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
                      {world.name}
                    </h3>
                    <p className="font-editorial italic text-sm text-[#9FD3CD] mt-1">
                      "{world.tagline}"
                    </p>
                  </div>

                  {/* Market Positioning */}
                  <div className="p-4 rounded-xl bg-[#044550]/80 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
                      Market Positioning Statement
                    </span>
                    <p className="font-editorial text-xs text-white/90 leading-relaxed">
                      {world.positioning}
                    </p>
                  </div>

                  {/* Voice Cadence */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
                      Voice Cadence:
                    </span>
                    <p className="font-editorial text-xs text-white/80 leading-relaxed">
                      {world.voice}
                    </p>
                  </div>

                  {/* Visual Language */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#4FB3AE] uppercase tracking-wider block">
                      Visual Identity Language:
                    </span>
                    <p className="font-editorial text-xs text-white/80 leading-relaxed">
                      {world.visualLanguage}
                    </p>
                  </div>

                  {/* Audience Perception */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#FF6B6B] uppercase tracking-wider block">
                      Target Audience Perception:
                    </span>
                    <p className="font-editorial text-xs text-white/80 leading-relaxed">
                      {world.audiencePerception}
                    </p>
                  </div>
                </div>

                {/* Card Action & Strategic Rationale */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-editorial text-white/70">Strategic Trade-off:</span>
                    <button
                      onClick={() =>
                        openWhyModal({
                          title: `Strategic Rationale: ${world.name}`,
                          explanation: world.strategicRationale,
                          context: `Risk trade-off: ${world.evaluation.strategicRisk}`,
                          alternative: `DNA alignment score is ${world.evaluation.dnaAlignment.score}%.`,
                        })
                      }
                      className="text-[#9FD3CD] hover:text-white flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Why This World?</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedWorldId(world.id)}
                    className={`w-full py-3 rounded-xl font-heading font-bold text-xs tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-[#199396] text-white shadow-md'
                        : 'bg-[#044550] hover:bg-[#086E77] text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Chosen Strategic Future</span>
                      </>
                    ) : (
                      <span>Choose This World</span>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* TAB 2: STRATEGIC MATRIX & AI SCORES */}
      {activeTab === 'comparison' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6 overflow-x-auto">
          <div className="space-y-1">
            <h3 className="font-heading font-bold text-lg text-white">
              Comparative Dimension Breakdown
            </h3>
            <p className="text-xs font-editorial text-[#E6F4F1]/80">
              Transparent AI evaluation. Every score is backed by a specific strategic justification.
            </p>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/20 text-[#9FD3CD] font-mono tracking-wider">
                <th className="py-3 px-4 font-semibold uppercase">Dimension</th>
                {brandWorlds.map((w) => (
                  <th key={w.id} className="py-3 px-4 font-bold text-white font-heading text-sm">
                    {w.name} ({w.archetype.split('/')[0]})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 font-editorial">
              {/* DNA Alignment */}
              <tr>
                <td className="py-4 px-4 font-heading font-bold text-white">
                  DNA Alignment
                </td>
                {brandWorlds.map((w) => (
                  <td key={w.id} className="py-4 px-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#9FD3CD]">
                        {w.evaluation.dnaAlignment.score}%
                      </span>
                      <button
                        onClick={() =>
                          openWhyModal({
                            title: `DNA Alignment: ${w.name}`,
                            explanation: w.evaluation.dnaAlignment.why,
                          })
                        }
                        className="text-[#9FD3CD] hover:text-white"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-white/70 line-clamp-2">
                      {w.evaluation.dnaAlignment.why}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Audience Alignment */}
              <tr>
                <td className="py-4 px-4 font-heading font-bold text-white">
                  Audience Alignment
                </td>
                {brandWorlds.map((w) => (
                  <td key={w.id} className="py-4 px-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#4FB3AE]">
                        {w.evaluation.audienceAlignment.score}%
                      </span>
                      <button
                        onClick={() =>
                          openWhyModal({
                            title: `Audience Alignment: ${w.name}`,
                            explanation: w.evaluation.audienceAlignment.why,
                          })
                        }
                        className="text-[#9FD3CD] hover:text-white"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-white/70 line-clamp-2">
                      {w.evaluation.audienceAlignment.why}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Distinctiveness */}
              <tr>
                <td className="py-4 px-4 font-heading font-bold text-white">
                  Distinctiveness
                </td>
                {brandWorlds.map((w) => (
                  <td key={w.id} className="py-4 px-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#FF6B6B]">
                        {w.evaluation.distinctiveness.score}%
                      </span>
                      <button
                        onClick={() =>
                          openWhyModal({
                            title: `Distinctiveness: ${w.name}`,
                            explanation: w.evaluation.distinctiveness.why,
                          })
                        }
                        className="text-[#9FD3CD] hover:text-white"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-white/70 line-clamp-2">
                      {w.evaluation.distinctiveness.why}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Clarity */}
              <tr>
                <td className="py-4 px-4 font-heading font-bold text-white">
                  Value Clarity
                </td>
                {brandWorlds.map((w) => (
                  <td key={w.id} className="py-4 px-4 space-y-1">
                    <span className="font-mono font-bold text-sm text-white">
                      {w.evaluation.clarity.score}%
                    </span>
                    <p className="text-[11px] text-white/70 line-clamp-2">
                      {w.evaluation.clarity.why}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Memorability */}
              <tr>
                <td className="py-4 px-4 font-heading font-bold text-white">
                  Memorability
                </td>
                {brandWorlds.map((w) => (
                  <td key={w.id} className="py-4 px-4 space-y-1">
                    <span className="font-mono font-bold text-sm text-[#9FD3CD]">
                      {w.evaluation.memorability.score}%
                    </span>
                    <p className="text-[11px] text-white/70 line-clamp-2">
                      {w.evaluation.memorability.why}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Strategic Risk */}
              <tr>
                <td className="py-4 px-4 font-heading font-bold text-[#FF6B6B]">
                  Strategic Risk
                </td>
                {brandWorlds.map((w) => (
                  <td key={w.id} className="py-4 px-4 text-[11px] text-[#FF6B6B]/90 font-editorial">
                    {w.evaluation.strategicRisk}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Action Footer to Proceed to Stage 04: Anti-Generic Challenge */}
      <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-heading font-bold text-sm">
            <Lock className="w-4 h-4 text-[#9FD3CD]" />
            <span>Ready to lock "{currentChoice.name}" and challenge generic thinking</span>
          </div>
          <p className="text-xs text-[#9FD3CD]/80 font-editorial">
            Agent 04 (Brand Critic) will now aggressively interrogate this direction for startup clichés and weak assumptions.
          </p>
        </div>

        <button
          onClick={() => runAntiGenericChallenge(currentChoice)}
          disabled={isLoading}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Attacking Clichés & Contradictions...</span>
            </>
          ) : (
            <>
              <span>Challenge "{currentChoice.name}"</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
