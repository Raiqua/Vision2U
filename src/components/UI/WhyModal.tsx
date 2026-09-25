import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const WhyModal: React.FC = () => {
  const { whyModalData, closeWhyModal } = useBrand();

  if (!whyModalData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-[#044550] border border-[#9FD3CD]/40 rounded-2xl shadow-2xl overflow-hidden text-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#9FD3CD]/20 bg-[#086E77]/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-md bg-[#199396]/30 border border-[#9FD3CD]/30 text-[#9FD3CD]">
                <HelpCircle className="w-5 h-5 text-[#9FD3CD]" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#9FD3CD] uppercase">
                  AI STRATEGIC REASONING
                </span>
                <h3 className="font-heading font-bold text-base text-white">
                  {whyModalData.title}
                </h3>
              </div>
            </div>
            <button
              onClick={closeWhyModal}
              className="p-1 rounded-md text-[#9FD3CD] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4">
            {/* Decision -> Reason */}
            <div className="p-4 rounded-xl bg-[#086E77]/20 border border-[#199396]/30">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9FD3CD] block mb-1">
                Strategic Rationale (Why?):
              </span>
              <p className="font-editorial text-sm leading-relaxed text-[#E6F4F1]">
                {whyModalData.explanation}
              </p>
            </div>

            {/* Evidence / Context */}
            {whyModalData.context && (
              <div className="p-3.5 rounded-xl bg-[#044550] border border-white/10">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#4FB3AE] block mb-1">
                  Evidence & Market Context:
                </span>
                <p className="font-editorial text-xs leading-relaxed text-white/80">
                  {whyModalData.context}
                </p>
              </div>
            )}

            {/* Alternative Considered */}
            {whyModalData.alternative && (
              <div className="p-3.5 rounded-xl bg-[#044550] border border-white/10">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#FF6B6B] block mb-1">
                  Alternative Explored & Rejected:
                </span>
                <p className="font-editorial text-xs leading-relaxed text-white/70 italic">
                  "{whyModalData.alternative}"
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#9FD3CD]/20 bg-[#086E77]/20 flex justify-end">
            <button
              onClick={closeWhyModal}
              className="px-4 py-2 rounded-lg bg-[#199396] text-white hover:bg-[#4FB3AE] font-heading text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Understood
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
