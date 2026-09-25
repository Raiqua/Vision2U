import React from 'react';
import { motion } from 'motion/react';
import { StageId } from '../../types';

interface Vision2UVisualizerProps {
  currentStage?: StageId;
  onSelectStage?: (stage: StageId) => void;
  interactive?: boolean;
}

const STAGES = [
  { id: 'input', label: 'IDEA', icon: '💡', angle: -90 },
  { id: 'discovery', label: 'DISCOVERY', icon: '🔎', angle: -38 },
  { id: 'brand_dna', label: 'BRAND DNA', icon: '🧬', angle: 14 },
  { id: 'brand_worlds', label: 'BRAND WORLDS', icon: '⚔️', angle: 66 },
  { id: 'challenge', label: 'CHALLENGE', icon: '🧨', angle: 118 },
  { id: 'guardian', label: 'CONSISTENCY', icon: '🛡️', angle: 170 },
  { id: 'launch', label: 'LAUNCH', icon: '🚀', angle: 222 },
];

export const Vision2UVisualizer: React.FC<Vision2UVisualizerProps> = ({
  currentStage,
  onSelectStage,
  interactive = true,
}) => {
  const radius = 130;

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center select-none">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-[#199396]/10 blur-2xl animate-pulse" />

      {/* Orbit Rings */}
      <div className="absolute w-[290px] h-[290px] sm:w-[330px] sm:h-[330px] rounded-full border border-[#9FD3CD]/15 border-dashed" />
      <div className="absolute w-[240px] h-[240px] sm:w-[270px] sm:h-[270px] rounded-full border border-[#199396]/30" />
      <div className="absolute w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] rounded-full border border-[#9FD3CD]/20" />

      {/* Rotating radar sweep */}
      <motion.div
        className="absolute w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, rgba(25, 147, 150, 0.25) 0deg, rgba(79, 179, 174, 0.05) 60deg, transparent 90deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
      />

      {/* Central Vision2U Brand Core */}
      <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#044550] border-2 border-[#9FD3CD] shadow-[0_0_25px_rgba(25,147,150,0.4)] flex flex-col items-center justify-center p-2 text-center overflow-hidden">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#9FD3CD]/60 mb-1 shadow-inner shrink-0">
          <img
            src="/logo.png"
            alt="Vision2U Core"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[9px] tracking-widest font-mono text-[#9FD3CD]/90 uppercase font-bold">VISION2U</span>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF6B6B] animate-ping" />
          <span className="text-[8px] font-mono text-[#4FB3AE]">DNA CORE</span>
        </div>
      </div>

      {/* Node connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {STAGES.map((s, idx) => {
          const rad = (s.angle * Math.PI) / 180;
          const x = 160 + radius * Math.cos(rad) * (384 / 320);
          const y = 160 + radius * Math.sin(rad) * (384 / 320);
          return (
            <line
              key={idx}
              x1="50%"
              y1="50%"
              x2={`${(x / 384) * 100}%`}
              y2={`${(y / 384) * 100}%`}
              stroke="rgba(159, 211, 205, 0.18)"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Orbiting Stage Nodes */}
      {STAGES.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const xOffset = radius * Math.cos(rad);
        const yOffset = radius * Math.sin(rad);
        const isActive = currentStage === s.id;

        return (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => interactive && onSelectStage && onSelectStage(s.id as StageId)}
            className={`absolute z-20 flex flex-col items-center group transition-transform ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
            style={{
              transform: `translate(${xOffset}px, ${yOffset}px)`,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border text-xs sm:text-sm transition-all shadow-md ${
                isActive
                  ? 'bg-[#199396] border-white text-white shadow-[0_0_15px_rgba(25,147,150,0.8)] scale-110'
                  : 'bg-[#086E77] border-[#9FD3CD]/40 text-[#9FD3CD] group-hover:border-[#9FD3CD] group-hover:bg-[#199396]/40'
              }`}
            >
              <span>{s.icon}</span>
            </div>
            <span
              className={`text-[9px] font-heading font-semibold tracking-wider mt-1 px-1 rounded transition-colors whitespace-nowrap ${
                isActive ? 'text-white bg-[#086E77]/80' : 'text-[#9FD3CD]/80 group-hover:text-white'
              }`}
            >
              {s.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

// Backwards compatibility alias
export const Brandoscope = Vision2UVisualizer;
export default Vision2UVisualizer;
