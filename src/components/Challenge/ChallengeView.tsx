import React from 'react';
import { motion } from 'motion/react';
import {
  Bomb,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Check,
  RotateCcw,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { ChallengeIssue } from '../../types';

export const ChallengeView: React.FC = () => {
  const {
    challenges,
    resolveChallengeIssue,
    selectedWorld,
    setStage,
    openWhyModal,
    runAntiGenericChallenge,
    isLoading,
  } = useBrand();

  if (!challenges || challenges.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Bomb className="w-12 h-12 text-[#FF6B6B] mx-auto animate-pulse" />
        <h3 className="text-xl font-heading font-bold text-white">
          No brand challenges active.
        </h3>
        <p className="text-sm font-editorial text-[#E6F4F1]/70">
          Select a Brand World in Stage 03 to scan for startup clichés, buzzwords, and DNA contradictions.
        </p>
      </div>
    );
  }

  const acceptedCount = challenges.filter((c) => c.status === 'accepted').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B6B]/20 border border-[#FF6B6B]/40 text-xs font-mono text-[#FF6B6B]">
            <Bomb className="w-3.5 h-3.5" />
            STAGE 04 · ANTI-GENERIC ENGINE
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight mt-2 flex items-center gap-3">
            <span>🧨 CHALLENGE THE BRAND</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FF6B6B] text-white">
              AGENT: BRAND CRITIC
            </span>
          </h2>
          <p className="text-sm text-[#E6F4F1]/80 font-editorial mt-1 max-w-2xl">
            Good branding isn’t just about generating ideas. It’s about rejecting weak ones.
          </p>
        </div>

        {/* Counter badge */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-[#086E77]/50 border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
            Vulnerabilities Neutralized: <strong className="text-white font-bold">{acceptedCount}</strong> / {challenges.length}
          </div>
          <button
            onClick={() => runAntiGenericChallenge()}
            disabled={isLoading}
            className="p-2 rounded-xl bg-[#044550] hover:bg-[#086E77] text-[#9FD3CD] border border-white/20 transition-colors cursor-pointer"
            title="Re-scan for clichés"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Brand Reference */}
      {selectedWorld && (
        <div className="p-4 rounded-2xl bg-[#086E77]/20 border border-white/10 flex items-center justify-between text-xs">
          <span className="font-editorial text-white/80">
            Target Brand Analyzed: <strong className="text-white font-heading">{selectedWorld.name}</strong> ({selectedWorld.archetype})
          </span>
          <span className="font-mono text-[#FF6B6B]">Scan Status: 4 Critical Flags Identified</span>
        </div>
      )}

      {/* Issues List */}
      <div className="space-y-6">
        {challenges.map((issue) => {
          const isAccepted = issue.status === 'accepted';
          const isRejected = issue.status === 'rejected';

          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-6 ${
                isAccepted
                  ? 'bg-[#086E77]/30 border-[#4FB3AE]/60'
                  : isRejected
                  ? 'bg-[#044550]/40 border-white/10 opacity-70'
                  : 'bg-[#086E77]/20 border-[#FF6B6B]/40 shadow-lg'
              }`}
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/40 text-xs font-mono font-bold uppercase">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    ⚠ GENERICITY DETECTED
                  </span>
                  <span className="text-xs font-mono text-[#9FD3CD]">
                    [{issue.categoryLabel}]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${
                      issue.severity === 'high'
                        ? 'bg-[#FF6B6B] text-white font-bold'
                        : 'bg-[#086E77] text-[#9FD3CD]'
                    }`}
                  >
                    {issue.severity} severity
                  </span>

                  {isAccepted && (
                    <span className="text-xs font-mono text-[#4FB3AE] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#4FB3AE]" /> RESOLVED
                    </span>
                  )}
                  {isRejected && (
                    <span className="text-xs font-mono text-white/50 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> REJECTED CHALLENGE
                    </span>
                  )}
                </div>
              </div>

              {/* Target phrase flagged */}
              <div className="p-4 rounded-2xl bg-[#044550] border border-[#FF6B6B]/30">
                <span className="text-[10px] font-mono text-[#FF6B6B] uppercase tracking-wider block mb-1">
                  Hollow Phrase / Assumption Under Interrogation:
                </span>
                <p className="font-heading font-bold text-lg text-white">
                  "{issue.target}"
                </p>
              </div>

              {/* Why Points */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block">
                  Why this weakens the brand:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {issue.why.map((reason, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-[#044550]/70 border border-white/5 text-xs font-editorial text-white/80"
                    >
                      <span className="text-[#FF6B6B] font-bold mr-1.5">•</span>
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              {/* Differentiated Alternatives (Challenge It) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#4FB3AE] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#4FB3AE]" />
                    CHALLENGE IT → High-Differentiation Alternatives:
                  </span>
                  <span className="text-[10px] font-mono text-[#9FD3CD]/70">
                    Click an alternative to select
                  </span>
                </div>

                <div className="space-y-2">
                  {issue.alternatives.map((alt, idx) => {
                    const isSelectedAlt =
                      issue.selectedAlternative === alt || (!issue.selectedAlternative && idx === 0);

                    return (
                      <button
                        key={idx}
                        onClick={() => resolveChallengeIssue(issue.id, 'accepted', alt)}
                        className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                          isSelectedAlt && isAccepted
                            ? 'bg-[#086E77] border-[#9FD3CD] text-white shadow-md'
                            : 'bg-[#044550]/90 border-white/10 hover:border-[#9FD3CD]/60 text-white/90'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs font-bold text-[#9FD3CD] mt-0.5">
                            0{idx + 1}.
                          </span>
                          <span className="font-editorial text-sm leading-relaxed">
                            "{alt}"
                          </span>
                        </div>

                        {isSelectedAlt && isAccepted && (
                          <span className="text-xs font-mono text-[#9FD3CD] font-bold shrink-0 flex items-center gap-1">
                            <Check className="w-4 h-4 text-[#9FD3CD]" /> ADOPTED
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  onClick={() => resolveChallengeIssue(issue.id, 'rejected')}
                  className="px-3 py-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white text-xs font-heading font-medium transition-colors cursor-pointer"
                >
                  Dismiss / Keep Original
                </button>

                <button
                  onClick={() => resolveChallengeIssue(issue.id, 'accepted')}
                  className={`px-4 py-2 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
                    isAccepted
                      ? 'bg-[#086E77] text-[#9FD3CD] border border-[#9FD3CD]/30'
                      : 'bg-[#199396] hover:bg-[#4FB3AE] text-white shadow-sm'
                  }`}
                >
                  {isAccepted ? 'Adopted In Brand System' : 'Accept Alternative'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Footer to Proceed to Stage 05 Guardian */}
      <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-heading font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#9FD3CD]" />
            <span>Anti-Generic Defense Complete</span>
          </div>
          <p className="text-xs text-[#9FD3CD]/80 font-editorial">
            Now test whether new copy and campaigns stay 100% consistent with the Brand DNA.
          </p>
        </div>

        <button
          onClick={() => setStage('guardian')}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer"
        >
          <span>Test Consistency with Guardian</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
