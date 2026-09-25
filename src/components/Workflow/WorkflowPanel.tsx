import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Circle, Clock, ArrowDown, Cpu, Sparkles } from 'lucide-react';
import { useBrand } from '../../context/BrandContext';
import { StageId } from '../../types';

export const WorkflowPanel: React.FC = () => {
  const { isAiWorkflowOpen, setIsAiWorkflowOpen, aiLogs, stage, setStage, completedStages } = useBrand();

  if (!isAiWorkflowOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-xl bg-[#044550] border-l border-[#9FD3CD]/30 shadow-2xl flex flex-col h-full overflow-hidden text-white"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#9FD3CD]/20 bg-[#086E77]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#199396]/20 border border-[#9FD3CD]/30 text-[#9FD3CD]">
                <Cpu className="w-5 h-5 text-[#9FD3CD]" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg tracking-wide flex items-center gap-2">
                  AI WORKFLOW ARCHITECTURE
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#199396] text-white font-mono uppercase tracking-wider">
                    6-AGENT PIPELINE
                  </span>
                </h3>
                <p className="text-xs text-[#9FD3CD]/80 font-editorial">
                  Context preservation across stages. No single-prompt generation.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsAiWorkflowOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-[#9FD3CD] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Workflow Sequence */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div className="p-4 rounded-xl bg-[#086E77]/20 border border-[#199396]/40 text-xs text-[#E6F4F1] font-editorial leading-relaxed">
              <span className="font-bold text-[#9FD3CD] font-heading block mb-1">
                Persistent Memory Rule:
              </span>
              Every agent passes its structured JSON payload into subsequent agents. Brand DNA functions as the central immutable strategic memory throughout all testing and launch pipelines.
            </div>

            {aiLogs.map((step, idx) => {
              const isCurrent = stage === step.stageId;
              const isDone = completedStages.includes(step.stageId);

              return (
                <div key={step.stageId} className="relative">
                  <div
                    onClick={() => {
                      if (isDone || isCurrent) {
                        setStage(step.stageId);
                        setIsAiWorkflowOpen(false);
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#086E77] border-[#9FD3CD] shadow-[0_0_15px_rgba(25,147,150,0.3)]'
                        : isDone
                        ? 'bg-[#044550] border-[#199396]/50 hover:border-[#9FD3CD]'
                        : 'bg-[#044550]/40 border-white/10 opacity-70'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-[#9FD3CD]" />
                        ) : isCurrent ? (
                          <div className="relative">
                            <span className="w-4 h-4 rounded-full bg-[#FF6B6B] block animate-ping absolute" />
                            <Circle className="w-4 h-4 text-[#FF6B6B]" />
                          </div>
                        ) : (
                          <Circle className="w-4 h-4 text-white/30" />
                        )}
                        <h4 className="font-heading font-bold text-sm tracking-wide text-white">
                          {step.stageName}
                        </h4>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#044550] border border-[#9FD3CD]/30 text-[#9FD3CD]">
                          {step.agentRole}
                        </span>
                        {step.lastRunTimestamp && (
                          <span className="block text-[10px] text-[#9FD3CD]/60 font-mono mt-1">
                            {step.lastRunTimestamp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded bg-[#044550]/80 border border-white/5">
                        <span className="text-[10px] font-mono text-[#9FD3CD] uppercase tracking-wider block mb-0.5">
                          Input Context:
                        </span>
                        <p className="text-white/80 font-editorial text-[11px]">
                          {step.inputDescription}
                        </p>
                      </div>

                      <div className="p-2.5 rounded bg-[#044550]/80 border border-white/5">
                        <span className="text-[10px] font-mono text-[#4FB3AE] uppercase tracking-wider block mb-0.5">
                          Structured Output:
                        </span>
                        <p className="text-white/80 font-editorial text-[11px]">
                          {step.outputDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  {idx < aiLogs.length - 1 && (
                    <div className="flex justify-center my-1.5 text-[#9FD3CD]/40">
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-[#9FD3CD]/20 bg-[#086E77]/20 flex items-center justify-between text-xs text-[#9FD3CD]">
            <span className="font-mono">Engine: Gemini 3.8 Flash + Context Memory</span>
            <button
              onClick={() => setIsAiWorkflowOpen(false)}
              className="px-4 py-1.5 rounded-lg bg-[#199396] text-white hover:bg-[#4FB3AE] transition-colors font-heading font-medium cursor-pointer"
            >
              Close Architecture
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
