import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dna,
  Lock,
  Unlock,
  Sliders,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  Sparkles,
  AlertTriangle,
  Layers,
  Palette,
  Volume2,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { PersonalityTrait } from '../../types';

export const BrandDNAView: React.FC = () => {
  const {
    dna,
    setDna,
    updateDnaTraitScore,
    toggleDnaLock,
    dnaUpdateNotice,
    generateBrandWorlds,
    openWhyModal,
    isLoading,
  } = useBrand();

  const [activeTab, setActiveTab] = useState<'personality' | 'voice' | 'visual' | 'principles'>(
    'personality'
  );
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!dna) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Dna className="w-12 h-12 text-[#9FD3CD] mx-auto animate-pulse" />
        <h3 className="text-xl font-heading font-bold text-white">Brand DNA not initialized.</h3>
        <p className="text-sm font-editorial text-[#E6F4F1]/70">
          Complete Stage 01 Discovery or load demo data to synthesize the Brand DNA.
        </p>
      </div>
    );
  }

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#086E77] border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
            <Dna className="w-3.5 h-3.5 text-[#199396]" />
            STAGE 02 · PERSISTENT STRATEGIC IDENTITY
          </div>
          <h2 className="text-3xl font-extrabold text-white font-heading tracking-tight mt-2 flex items-center gap-3">
            <span>🧬 BRAND DNA</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#199396] text-white">
              v{dna.version}.0
            </span>
          </h2>
          <p className="text-sm text-[#E6F4F1]/80 font-editorial mt-1 max-w-2xl">
            The strategic identity that every future brand decision must follow. Memory of the brand.
          </p>
        </div>

        {/* Lock / Unlock Toggle & Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDnaLock}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
              dna.isLocked
                ? 'bg-[#199396] text-white border border-[#9FD3CD] shadow-[0_0_15px_rgba(25,147,150,0.4)]'
                : 'bg-[#086E77]/60 text-[#9FD3CD] hover:text-white border border-white/20'
            }`}
          >
            {dna.isLocked ? (
              <>
                <Lock className="w-3.5 h-3.5 text-white" />
                <span>🔒 Brand DNA Locked</span>
              </>
            ) : (
              <>
                <Unlock className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>DNA Unlocked (Editable)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* DNA Updated Dynamic Banner (Section 11 requirement) */}
      <AnimatePresence>
        {dnaUpdateNotice && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-[#086E77] border border-[#9FD3CD] flex items-start gap-3 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-[#FF6B6B] shrink-0 mt-0.5" />
            <div className="text-xs text-white">
              <span className="font-heading font-bold tracking-wider text-[#9FD3CD] uppercase mr-2">
                DNA CALIBRATION UPDATED:
              </span>
              <span className="font-editorial">{dnaUpdateNotice}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Promise Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#086E77]/80 to-[#044550] border-2 border-[#9FD3CD]/40 shadow-xl space-y-3 relative overflow-hidden">
        <div className="text-[10px] font-mono tracking-widest text-[#9FD3CD] uppercase">
          FOUNDATIONAL BRAND PROMISE
        </div>
        <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
          "{dna.promise}"
        </p>
        <div className="text-xs font-editorial text-[#E6F4F1]/80 max-w-3xl pt-1">
          <strong className="text-[#9FD3CD] font-heading font-semibold">Audience Anchor:</strong>{' '}
          {dna.audienceCore}
        </div>
      </div>

      {/* Navigation Tabs for DNA Sections */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('personality')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
            activeTab === 'personality'
              ? 'bg-[#199396] text-white shadow-md'
              : 'text-[#9FD3CD] hover:bg-white/5'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Personality & Calibration</span>
        </button>

        <button
          onClick={() => setActiveTab('voice')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
            activeTab === 'voice'
              ? 'bg-[#199396] text-white shadow-md'
              : 'text-[#9FD3CD] hover:bg-white/5'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Voice & Tonal Discipline</span>
        </button>

        <button
          onClick={() => setActiveTab('visual')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
            activeTab === 'visual'
              ? 'bg-[#199396] text-white shadow-md'
              : 'text-[#9FD3CD] hover:bg-white/5'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Visual DNA & Design Tokens</span>
        </button>

        <button
          onClick={() => setActiveTab('principles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
            activeTab === 'principles'
              ? 'bg-[#199396] text-white shadow-md'
              : 'text-[#9FD3CD] hover:bg-white/5'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Strategic Principles</span>
        </button>
      </div>

      {/* TAB 1: PERSONALITY SLIDERS & TRAITS TO AVOID */}
      {activeTab === 'personality' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Personality Sliders (Col 7) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Strategic Personality Traits
                </h3>
                <p className="text-xs text-[#9FD3CD]/80 font-editorial">
                  Interactive calibration sliders. Adjusting weights directly influences downstream agents.
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#044550] border border-white/20 text-[#9FD3CD]">
                {dna.isLocked ? 'READ ONLY (LOCKED)' : 'DRAG TO CALIBRATE'}
              </span>
            </div>

            <div className="space-y-6">
              {dna.personality.map((trait) => (
                <div key={trait.name} className="space-y-2 p-4 rounded-xl bg-[#044550]/80 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-sm tracking-wide text-white uppercase">
                        {trait.name}
                      </span>
                      <button
                        onClick={() =>
                          openWhyModal({
                            title: `Personality Trait: ${trait.name} (${trait.score}%)`,
                            explanation: trait.why,
                            context: 'Derived from target audience psychological alignment in Stage 01 Discovery.',
                            alternative: `A lower ${trait.name} score would risk yielding generic or timid market positioning.`,
                          })
                        }
                        className="text-[#9FD3CD] hover:text-white transition-colors cursor-pointer"
                        title="Why this trait?"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-[#9FD3CD]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[#9FD3CD]">
                        {trait.score}%
                      </span>
                    </div>
                  </div>

                  {/* Visual Progress Bar / Slider */}
                  <div className="space-y-1">
                    <div className="relative w-full h-3 rounded-full bg-[#086E77] overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#199396] to-[#9FD3CD]"
                        style={{ width: `${trait.score}%` }}
                        animate={{ width: `${trait.score}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {!dna.isLocked && (
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={trait.score}
                        onChange={(e) => updateDnaTraitScore(trait.name, parseInt(e.target.value, 10))}
                        className="w-full accent-[#199396] cursor-pointer"
                      />
                    )}
                  </div>

                  {/* Trait Strategic Explanation */}
                  <p className="text-xs font-editorial text-[#E6F4F1]/80 leading-relaxed pt-1">
                    <strong className="text-[#9FD3CD] font-heading font-semibold">Why:</strong> {trait.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Traits to Avoid (Col 5) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#FF6B6B]">
                  Traits to Avoid
                </h3>
                <span className="text-[10px] font-mono text-[#FF6B6B] border border-[#FF6B6B]/40 px-2 py-0.5 rounded">
                  BANNED ARCHETYPES
                </span>
              </div>
              <p className="text-xs text-white/80 font-editorial leading-relaxed">
                Brand postures that are strictly prohibited across all copy, design, and marketing collateral:
              </p>

              <div className="space-y-3">
                {dna.traitsToAvoid.map((avoid, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#044550] border border-[#FF6B6B]/30 flex items-center justify-between text-xs font-editorial text-white/90"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                      <span className="font-heading font-semibold">{avoid}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#FF6B6B]">RESTRICTED</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#044550]/60 border border-white/10 text-xs font-editorial text-white/70">
              <span className="font-heading font-bold text-[#9FD3CD] block mb-1">
                Guardian Enforcement:
              </span>
              The Stage 05 Consistency Guardian checks every submitted headline against these prohibited traits.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VOICE & TONAL RULES */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sounds Like vs Does Not Sound Like */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Voice Matrix</h3>

            {/* Sounds Like */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-wider text-[#9FD3CD] uppercase block">
                Sounds Like:
              </span>
              <div className="space-y-2">
                {dna.voice.soundsLike.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#044550] border border-[#9FD3CD]/30 flex items-center gap-2.5 text-xs font-editorial text-white"
                  >
                    <Check className="w-4 h-4 text-[#4FB3AE] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Does NOT Sound Like */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold tracking-wider text-[#FF6B6B] uppercase block">
                Does NOT Sound Like:
              </span>
              <div className="space-y-2">
                {dna.voice.doesNotSoundLike.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#044550] border border-[#FF6B6B]/30 flex items-center gap-2.5 text-xs font-editorial text-white/80"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF6B6B] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tonal Rules */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
            <h3 className="font-heading font-bold text-lg text-white">Concrete Tonal Rules</h3>
            <p className="text-xs font-editorial text-white/80">
              Prescriptive guidelines for product micro-copy, email dispatches, and public campaigns:
            </p>

            <div className="space-y-3">
              {dna.voice.tonalRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#044550] border border-white/10 space-y-1 text-xs font-editorial text-white/90"
                >
                  <span className="text-[10px] font-mono text-[#9FD3CD] font-bold uppercase tracking-wider block">
                    Rule 0{idx + 1}
                  </span>
                  <p>{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VISUAL DNA & DESIGN TOKENS */}
      {activeTab === 'visual' && (
        <div className="space-y-8">
          {/* Color Palette Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-heading font-bold text-lg text-white">Visual Color System</h3>
                <p className="text-xs font-editorial text-[#E6F4F1]/80">{dna.visualDna.colorMood}</p>
              </div>
              <span className="text-xs font-mono text-[#9FD3CD]">Click swatch to copy HEX</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {dna.visualDna.palette.map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => handleCopyHex(swatch.hex)}
                  className="p-3 rounded-2xl bg-[#044550] border border-white/10 hover:border-[#9FD3CD] text-left transition-all cursor-pointer group space-y-3 shadow-md"
                >
                  <div
                    className="w-full h-16 rounded-xl border border-white/20 shadow-inner flex items-center justify-center text-xs font-mono font-bold"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {copiedHex === swatch.hex && (
                      <span className="px-2 py-0.5 rounded bg-black/70 text-white text-[10px]">
                        COPIED
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="font-heading font-bold text-xs text-white block truncate">
                      {swatch.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#9FD3CD] block mt-0.5">
                      {swatch.hex}
                    </span>
                    <span className="text-[10px] font-editorial text-white/60 block mt-1 line-clamp-1">
                      {swatch.role}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Typography, Shapes, Imagery Direction */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Typography Direction
              </span>
              <p className="font-editorial text-xs text-white/90 leading-relaxed">
                {dna.visualDna.typographyDirection}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Shape Language
              </span>
              <p className="font-editorial text-xs text-white/90 leading-relaxed">
                {dna.visualDna.shapeLanguage}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-2">
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#9FD3CD] uppercase">
                Imagery & Art Direction
              </span>
              <p className="font-editorial text-xs text-white/90 leading-relaxed">
                {dna.visualDna.imagery}
              </p>
            </div>
          </div>

          {/* Visual concepts to avoid */}
          <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#FF6B6B]/30 space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#FF6B6B] uppercase block">
              Visual Clichés Strictly Banned:
            </span>
            <div className="flex flex-wrap gap-2">
              {dna.visualDna.visualAvoids.map((avoid, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#044550] border border-[#FF6B6B]/40 text-xs font-editorial text-white"
                >
                  ✕ {avoid}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRINCIPLES */}
      {activeTab === 'principles' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dna.principles.map((p, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/30 space-y-3"
            >
              <span className="text-mono font-bold text-sm text-[#FF6B6B]">
                PRINCIPLE 0{idx + 1}
              </span>
              <h4 className="font-heading font-bold text-base text-white">{p.title}</h4>
              <p className="font-editorial text-xs text-[#E6F4F1]/80 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Proceed to Brand Worlds Action Footer */}
      <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-heading font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-[#9FD3CD]" />
            <span>Brand DNA Active & Ready</span>
          </div>
          <p className="text-xs text-[#9FD3CD]/80 font-editorial">
            Next, Creative Director agent generates 3 radically distinct futures interpreting this exact DNA.
          </p>
        </div>

        <button
          onClick={generateBrandWorlds}
          disabled={isLoading}
          className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating 3 Brand Worlds...</span>
            </>
          ) : (
            <>
              <span>Explore Brand Worlds</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
