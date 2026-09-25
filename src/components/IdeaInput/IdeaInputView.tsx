import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, AlertCircle, Compass, HelpCircle } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { ProductType, IdeaStage } from '../../types';
import { HACKATHON_DEMO_INPUT } from '../../lib/demoData';

const PRODUCT_TYPES: ProductType[] = [
  'App',
  'Startup',
  'Product',
  'Community',
  'Creator brand',
  'Service',
  'Other',
];

const IDEA_STAGES: IdeaStage[] = [
  'Just an idea',
  'Prototype',
  'Existing product',
  'Existing brand',
];

export const IdeaInputView: React.FC = () => {
  const {
    ideaInput,
    setIdeaInput,
    startInvestigation,
    isLoading,
    loadingMessage,
    loadDemoData,
  } = useBrand();

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.rawIdea.trim()) {
      setValidationError('Please enter what you want to build to begin the investigation.');
      return;
    }
    setValidationError(null);
    startInvestigation();
  };

  const handleUseDemo = () => {
    setIdeaInput(HACKATHON_DEMO_INPUT);
    setValidationError(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#086E77] border border-[#9FD3CD]/30 text-xs font-mono text-[#9FD3CD]">
            <Compass className="w-3.5 h-3.5 text-[#199396]" />
            STEP 00 · INITIAL DOSSIER
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Start with the unfinished version.
          </h2>
          <p className="text-sm sm:text-base text-[#E6F4F1]/80 font-editorial max-w-xl mx-auto">
            Don’t worry about branding yet. Tell Vision2U what you are trying to build. We’ll investigate the underlying mechanics.
          </p>
        </div>

        {/* Input Card */}
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 rounded-3xl bg-[#086E77]/25 border border-[#9FD3CD]/30 shadow-2xl backdrop-blur-md space-y-6"
        >
          {/* Main Idea Textarea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="rawIdea"
                className="font-heading font-bold text-sm text-white tracking-wide flex items-center gap-2"
              >
                <span>What are you building?</span>
                <span className="text-xs font-normal text-[#9FD3CD]/70 font-mono">(Required)</span>
              </label>

              {/* Demo button */}
              <button
                type="button"
                onClick={handleUseDemo}
                className="flex items-center gap-1.5 text-xs text-[#FF6B6B] hover:text-white font-heading font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B6B]" />
                <span>Fill with Hackathon App Example</span>
              </button>
            </div>

            <textarea
              id="rawIdea"
              rows={4}
              value={ideaInput.rawIdea}
              onChange={(e) => {
                setIdeaInput({ ...ideaInput, rawIdea: e.target.value });
                if (validationError) setValidationError(null);
              }}
              placeholder="e.g., I want to create an app that helps college and self-taught developers find teammates for hackathons based on complimentary skills, work style, and actual code samples instead of desperate midnight Discord pings..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#044550]/80 border border-[#9FD3CD]/40 focus:border-[#9FD3CD] focus:ring-1 focus:ring-[#9FD3CD] text-white placeholder-white/40 text-sm font-editorial leading-relaxed resize-y transition-all outline-hidden"
            />

            {validationError && (
              <div className="flex items-center gap-1.5 text-xs text-[#FF6B6B] font-mono mt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Optional Categorization Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Product Type */}
            <div className="space-y-2">
              <label className="font-heading font-semibold text-xs text-[#9FD3CD] tracking-wider uppercase block">
                Product Type
              </label>
              <div className="flex flex-wrap gap-2">
                {PRODUCT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setIdeaInput({ ...ideaInput, productType: type })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all cursor-pointer ${
                      ideaInput.productType === type
                        ? 'bg-[#199396] text-white border border-[#9FD3CD]'
                        : 'bg-[#044550] text-[#9FD3CD]/80 hover:text-white border border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Stage */}
            <div className="space-y-2">
              <label className="font-heading font-semibold text-xs text-[#9FD3CD] tracking-wider uppercase block">
                Current Maturity Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {IDEA_STAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setIdeaInput({ ...ideaInput, currentStage: s })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-all cursor-pointer ${
                      ideaInput.currentStage === s
                        ? 'bg-[#199396] text-white border border-[#9FD3CD]'
                        : 'bg-[#044550] text-[#9FD3CD]/80 hover:text-white border border-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Audience */}
            <div className="space-y-1.5">
              <label
                htmlFor="targetAudience"
                className="font-heading font-semibold text-xs text-[#9FD3CD] tracking-wider uppercase block"
              >
                Target Audience <span className="text-white/40 normal-case">(Optional)</span>
              </label>
              <input
                id="targetAudience"
                type="text"
                value={ideaInput.targetAudience}
                onChange={(e) => setIdeaInput({ ...ideaInput, targetAudience: e.target.value })}
                placeholder="e.g., CS students, boot camp grads, autodidacts"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#044550]/80 border border-white/10 focus:border-[#9FD3CD] text-white placeholder-white/30 text-xs font-editorial outline-hidden"
              />
            </div>

            {/* Constraints */}
            <div className="space-y-1.5">
              <label
                htmlFor="constraints"
                className="font-heading font-semibold text-xs text-[#9FD3CD] tracking-wider uppercase block"
              >
                Hard Constraints <span className="text-white/40 normal-case">(Optional)</span>
              </label>
              <input
                id="constraints"
                type="text"
                value={ideaInput.constraints}
                onChange={(e) => setIdeaInput({ ...ideaInput, constraints: e.target.value })}
                placeholder="e.g., Must not feel like LinkedIn, lightweight, mobile-first"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#044550]/80 border border-white/10 focus:border-[#9FD3CD] text-white placeholder-white/30 text-xs font-editorial outline-hidden"
              />
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-[#9FD3CD]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#9FD3CD]/80 font-editorial flex items-center gap-1.5">
              <span>Agent 01 will analyze tension, audience, and hidden founder assumptions.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white font-heading font-bold text-sm tracking-wide shadow-lg hover:shadow-[0_0_20px_rgba(25,147,150,0.6)] transition-all cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Investigating...</span>
                  </>
                ) : (
                  <>
                    <span>Begin Investigation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Loading state visual indicator if active */}
        {isLoading && (
          <div className="p-6 rounded-2xl bg-[#086E77]/40 border border-[#9FD3CD] text-center space-y-3 animate-pulse">
            <div className="text-xs font-mono text-[#9FD3CD] uppercase tracking-widest">
              AI AGENT PIPELINE ACTIVE
            </div>
            <p className="font-editorial text-sm text-white">
              {loadingMessage || 'Analyzing idea mechanics...'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
