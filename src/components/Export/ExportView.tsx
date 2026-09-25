import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Download,
  Share2,
  RotateCcw,
  Printer,
  Check,
  Dna,
  ShieldAlert,
  ShieldCheck,
  Rocket,
  Compass,
  Copy,
  Eye,
  X,
  Swords,
  Sparkles,
} from 'lucide-react';
import { useBrand } from '../../context/BrandContext';

export const ExportView: React.FC = () => {
  const {
    discovery,
    dna,
    selectedWorld,
    challenges,
    guardianReport,
    launchKit,
    resetInvestigation,
    ideaInput,
    setStage,
  } = useBrand();

  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<boolean>(false);
  const [viewRawModal, setViewRawModal] = useState<'json' | 'markdown' | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const brandName = selectedWorld?.name || launchKit?.identity.brandName || 'Vision2U Brand';
  const tagline = selectedWorld?.tagline || launchKit?.identity.tagline || 'See the vision. Shape the brand.';

  const fullDossier = {
    title: 'Vision2U Brand Intelligence Dossier',
    timestamp: new Date().toISOString(),
    rawIdea: ideaInput,
    discovery,
    dna,
    selectedWorld,
    antiGenericChallenges: challenges,
    consistencyAudit: guardianReport,
    launchKit,
  };

  const jsonStr = JSON.stringify(fullDossier, null, 2);

  const markdownStr = `# YOUR BRAND, INVESTIGATED.
## ${brandName}
*${tagline}*

---

### 1. Executive Summary
Investigated by Vision2U Brand Intelligence Engine.
**Promise:** ${dna?.promise || ''}
**Archetype:** ${selectedWorld?.archetype || ''}

### 2. Discovered Audience Tension
**Target Audience:** ${discovery?.targetAudience || ''}
**Context:** ${discovery?.context || ''}

### 3. Core Problem Diagnosed
${discovery?.coreProblem || ''}

### 4. Market Positioning
${selectedWorld?.positioning || ''}

### 5. Brand DNA Personality
${dna?.personality.map((p) => `- **${p.name} (${p.score}%)**: ${p.why}`).join('\n') || ''}

**Traits to Avoid:**
${dna?.traitsToAvoid.map((t) => `- ${t}`).join('\n') || ''}

### 6. Voice Standards
- **Sounds Like:** ${dna?.voice.soundsLike.join(', ') || ''}
- **Does NOT Sound Like:** ${dna?.voice.doesNotSoundLike.join(', ') || ''}

### 7. Visual Palette
${dna?.visualDna.palette.map((c) => `- ${c.name} (${c.hex}): ${c.role}`).join('\n') || ''}

### 8. Anti-Generic Challenge Report
${challenges.map((c) => `#### [${c.categoryLabel}] ${c.target}
- Status: ${c.status}
- Adopted Alternative: ${c.selectedAlternative || c.alternatives[0]}`).join('\n\n')}

### 9. Launch Kit
- **Landing Headline:** ${launchKit?.launchAssets.landingHeadline || ''}
- **Elevator Pitch:** ${launchKit?.messaging.elevatorPitch || ''}
- **Primary CTA:** ${launchKit?.launchAssets.primaryCta || ''}
`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  const handleExportJSON = () => {
    try {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-brand-dossier.json`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 300);
      setCopiedNotification('JSON Dossier download initiated!');
      setDownloadSuccessModal(true);
      setTimeout(() => setCopiedNotification(null), 3500);
    } catch (err) {
      console.error(err);
      copyToClipboard(jsonStr, 'JSON Dossier');
      setDownloadSuccessModal(true);
    }
  };

  const handleExportMarkdown = () => {
    try {
      const blob = new Blob([markdownStr], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-brand-kit.md`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 300);
      setCopiedNotification('Markdown Kit download initiated!');
      setDownloadSuccessModal(true);
      setTimeout(() => setCopiedNotification(null), 3500);
    } catch (err) {
      console.error(err);
      copyToClipboard(markdownStr, 'Markdown Kit');
      setDownloadSuccessModal(true);
    }
  };

  const handleShare = () => {
    copyToClipboard(window.location.href, 'Vision2U Brand Link');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner and Quick Exports */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#9FD3CD] uppercase">
            FORENSIC BRAND INTELLIGENCE DOSSIER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight mt-1">
            YOUR BRAND, INVESTIGATED.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#086E77] hover:bg-[#199396] text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#086E77] hover:bg-[#199396] text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>

          <button
            onClick={() => setViewRawModal('json')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#044550] hover:bg-[#086E77] text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30 text-xs font-heading font-medium transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Raw</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#044550] hover:bg-[#086E77] text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30 text-xs font-heading font-medium transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#044550] hover:bg-[#086E77] text-[#9FD3CD] hover:text-white border border-[#9FD3CD]/30 text-xs font-heading font-medium transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Copied Notification Toast */}
      {copiedNotification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-3.5 rounded-xl bg-[#086E77] border border-[#9FD3CD] text-xs font-mono text-white text-center flex items-center justify-center gap-2 shadow-lg"
        >
          <Check className="w-4 h-4 text-[#9FD3CD]" />
          <span>{copiedNotification}</span>
        </motion.div>
      )}

      {/* Downloaded Success Notification Card */}
      {downloadSuccessModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-[#086E77]/80 to-[#044550] border-2 border-[#9FD3CD]/60 shadow-xl space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#199396] text-white flex items-center justify-center shadow-md">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-white">
                  Dossier Export Initiated & Ready!
                </h4>
                <p className="text-xs text-[#E6F4F1]/80 font-editorial">
                  Your complete brand architecture is saved. You can copy the raw data, review any previous stage, or start investigating a brand-new idea.
                </p>
              </div>
            </div>
            <button
              onClick={() => setDownloadSuccessModal(false)}
              className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => copyToClipboard(jsonStr, 'Full JSON Dossier')}
              className="px-3 py-1.5 rounded-lg bg-[#044550] hover:bg-[#199396] text-white text-xs font-mono border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full JSON</span>
            </button>

            <button
              onClick={() => copyToClipboard(markdownStr, 'Full Markdown Kit')}
              className="px-3 py-1.5 rounded-lg bg-[#044550] hover:bg-[#199396] text-white text-xs font-mono border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Markdown</span>
            </button>

            <button
              onClick={() => {
                resetInvestigation();
              }}
              className="px-4 py-1.5 rounded-lg bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-white text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Investigate Another Idea →</span>
            </button>

            <button
              onClick={() => setStage('launch')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-medium transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Back to Launch Kit</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Dossier Document Sheet */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#044550] border-2 border-[#9FD3CD]/30 shadow-2xl space-y-12 text-[#E6F4F1]">
        {/* Cover Header */}
        <div className="border-b border-[#9FD3CD]/20 pb-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#9FD3CD]">
            <span>CONFIDENTIAL BRAND SPECIFICATION</span>
            <span>VERIFIED BY VISION2U ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white">
            {brandName}
          </h1>

          <p className="text-xl font-editorial italic text-[#9FD3CD]">
            "{tagline}"
          </p>

          <p className="text-sm font-editorial text-[#E6F4F1]/90 max-w-2xl pt-2">
            Strategic Archetype: <strong className="text-white font-heading">{selectedWorld?.archetype || 'THE STRATEGIC CATALYST'}</strong>.
            Grounded in forensic discovery and shielded by active Brand DNA enforcement.
          </p>
        </div>

        {/* Section 1: Executive Summary */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9FD3CD] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#199396]" />
            <span>01 · Executive Summary</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-editorial">
            <div className="p-5 rounded-2xl bg-[#086E77]/20 border border-white/5 space-y-2">
              <strong className="text-white font-heading block">Brand Promise:</strong>
              <p className="italic text-[#9FD3CD]">"{dna?.promise}"</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#086E77]/20 border border-white/5 space-y-2">
              <strong className="text-white font-heading block">Strategic Position:</strong>
              <p>{selectedWorld?.positioning}</p>
            </div>
          </div>
        </section>

        {/* Section 2: Discovered Audience Tension */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9FD3CD] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#199396]" />
            <span>02 · Audience & Problem Diagnostic</span>
          </div>

          <div className="space-y-4 text-sm font-editorial leading-relaxed">
            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/20 space-y-2">
              <strong className="text-white font-heading block">The Underlying Tension:</strong>
              <p>{discovery?.coreProblem}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#086E77]/20 border border-white/5 space-y-1">
                <span className="font-mono text-[#9FD3CD] uppercase">Target Audience:</span>
                <p>{discovery?.targetAudience}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#086E77]/20 border border-white/5 space-y-1">
                <span className="font-mono text-[#9FD3CD] uppercase">Catalyst Context:</span>
                <p>{discovery?.context}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Brand DNA Core */}
        {dna && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9FD3CD] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#199396]" />
              <span>03 · Brand DNA Specification</span>
            </div>

            {/* Personality Matrix */}
            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/20 space-y-4">
              <strong className="text-white font-heading text-sm block">Personality Traits:</strong>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {dna.personality.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#044550] border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs font-heading font-bold text-white">
                      <span>{p.name}</span>
                      <span className="font-mono text-[#9FD3CD]">{p.score}%</span>
                    </div>
                    <p className="text-[11px] font-editorial text-white/70">{p.why}</p>
                  </div>
                ))}
              </div>

              {/* Anti-Traits */}
              <div className="pt-2">
                <span className="text-xs font-mono text-[#FF6B6B] uppercase tracking-wider block mb-2">
                  Traits Banned From Brand:
                </span>
                <div className="flex flex-wrap gap-2">
                  {dna.traitsToAvoid.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#FF6B6B]/15 border border-[#FF6B6B]/30 text-[11px] font-mono text-[#FF6B6B]"
                    >
                      ✕ {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 4: Visual System */}
        {dna && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9FD3CD] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#199396]" />
              <span>04 · Visual DNA Architecture</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/20 space-y-6">
              {/* Palette */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {dna.visualDna.palette.map((c, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-white/10 space-y-2 pb-2 bg-[#044550]">
                    <div className="h-16 w-full shadow-inner" style={{ backgroundColor: c.hex }} />
                    <div className="px-2.5 space-y-0.5">
                      <div className="text-xs font-heading font-bold text-white truncate">{c.name}</div>
                      <div className="text-[10px] font-mono text-[#9FD3CD]">{c.hex}</div>
                      <div className="text-[10px] text-white/60 font-editorial truncate">{c.role}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Typography & Imagery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-editorial">
                <div className="p-4 rounded-xl bg-[#044550] border border-white/5 space-y-1">
                  <strong className="text-[#9FD3CD] font-heading block">Typography Rules:</strong>
                  <p>{dna.visualDna.typographyDirection}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#044550] border border-white/5 space-y-1">
                  <strong className="text-[#9FD3CD] font-heading block">Imagery Atmosphere:</strong>
                  <p>{dna.visualDna.imagery}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Anti-Generic Engine Decisions */}
        {challenges.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9FD3CD] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#199396]" />
              <span>05 · Anti-Generic Remediation Report</span>
            </div>

            <div className="space-y-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl bg-[#086E77]/20 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2 font-mono text-[#FF6B6B]">
                      <span>[{c.categoryLabel}]</span>
                      <span className="text-white font-medium line-through">"{c.target}"</span>
                    </div>
                    <p className="font-editorial text-[#9FD3CD]">
                      → <strong>Adopted Replacement:</strong> "{c.selectedAlternative || c.alternatives[0]}"
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#199396]/20 border border-[#199396]/40 text-[10px] font-mono text-[#9FD3CD] self-start sm:self-center">
                    PASSED AUDIT
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Launch Assets */}
        {launchKit && (
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9FD3CD] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#199396]" />
              <span>06 · Launch Kit Excerpt</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#086E77]/20 border border-[#9FD3CD]/20 space-y-4 text-xs font-editorial">
              <div>
                <strong className="text-[#9FD3CD] font-heading block">Landing Page H1:</strong>
                "{launchKit.launchAssets.landingHeadline}"
              </div>
              <div>
                <strong className="text-[#9FD3CD] font-heading block">Product Hunt Tagline:</strong>
                "{launchKit.launchAssets.productHuntTagline}"
              </div>
              <div>
                <strong className="text-[#9FD3CD] font-heading block">Elevator Pitch:</strong>
                "{launchKit.messaging.elevatorPitch}"
              </div>
            </div>
          </section>
        )}

        {/* Dossier Sign-off */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">
          <span>Vision2U Brand Intelligence Engine · Production Spec</span>
          <span>Status: Verified & Deployed</span>
        </div>
      </div>

      {/* Bottom return and restart bar */}
      <div className="p-6 rounded-2xl bg-[#086E77]/30 border border-[#9FD3CD]/30 flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="font-heading font-bold text-sm text-white">
            What would you like to do next?
          </div>
          <p className="text-xs text-[#E6F4F1]/70 font-editorial">
            Your brand is preserved. You can refine earlier decisions or start a new brand investigation anytime.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setStage('launch')}
            className="px-4 py-2 rounded-xl bg-[#199396] hover:bg-[#4FB3AE] text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Stage 06: Launch Kit</span>
          </button>

          <button
            onClick={() => setStage('brand_dna')}
            className="px-4 py-2 rounded-xl bg-[#086E77] hover:bg-[#199396] text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Stage 02: Brand DNA</span>
          </button>

          <button
            onClick={() => setStage('brand_worlds')}
            className="px-4 py-2 rounded-xl bg-[#086E77] hover:bg-[#199396] text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Stage 03: Worlds</span>
          </button>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-[#FF6B6B]/20 hover:bg-[#FF6B6B] text-[#FF6B6B] hover:text-white border border-[#FF6B6B]/40 text-xs font-heading font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Investigate Another Idea</span>
          </button>
        </div>
      </div>

      {/* In-App Safe Reset Confirmation Modal (NO window.confirm!) */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-2xl bg-[#044550] border-2 border-[#9FD3CD] shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/20 border border-[#FF6B6B] flex items-center justify-center text-[#FF6B6B]">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base">Start New Brand Investigation?</h3>
                  <p className="text-xs text-white/70 font-editorial">
                    Make sure you downloaded or copied your current dossier if you want to keep it.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-heading font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowResetConfirm(false);
                    resetInvestigation();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-white text-xs font-heading font-bold transition-all cursor-pointer shadow-sm"
                >
                  Yes, Start Fresh
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Raw Dossier Modal */}
      <AnimatePresence>
        {viewRawModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[85vh] p-6 rounded-2xl bg-[#044550] border-2 border-[#9FD3CD] shadow-2xl flex flex-col space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-heading font-bold text-white text-base">
                    Raw Dossier Output
                  </span>
                  <div className="flex rounded-lg overflow-hidden border border-[#9FD3CD]/30">
                    <button
                      onClick={() => setViewRawModal('json')}
                      className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        viewRawModal === 'json'
                          ? 'bg-[#199396] text-white font-bold'
                          : 'bg-[#086E77] text-[#9FD3CD] hover:text-white'
                      }`}
                    >
                      JSON
                    </button>
                    <button
                      onClick={() => setViewRawModal('markdown')}
                      className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                        viewRawModal === 'markdown'
                          ? 'bg-[#199396] text-white font-bold'
                          : 'bg-[#086E77] text-[#9FD3CD] hover:text-white'
                      }`}
                    >
                      MARKDOWN
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = viewRawModal === 'json' ? jsonStr : markdownStr;
                      copyToClipboard(text, viewRawModal.toUpperCase());
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#199396] hover:bg-[#4FB3AE] text-white text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </button>

                  <button
                    onClick={() => setViewRawModal(null)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-auto rounded-xl bg-[#022830] p-4 border border-white/5">
                <pre className="text-xs font-mono text-[#9FD3CD] whitespace-pre-wrap select-all">
                  {viewRawModal === 'json' ? jsonStr : markdownStr}
                </pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExportView;
