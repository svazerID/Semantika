import React, { useState, useEffect, useRef } from 'react';
import { SemanticElement, Language } from '../types';
import { translations } from '../data/translations';
import {
  X,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Share2,
  Code2,
  Eye,
  GitCompare,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';

interface ElementDetailModalProps {
  element: SemanticElement;
  onClose: () => void;
  lang: Language;
  onSelectRelated: (tag: string) => void;
}

export const ElementDetailModal: React.FC<ElementDetailModalProps> = ({
  element,
  onClose,
  lang,
  onSelectRelated,
}) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'editor' | 'compare' | 'attributes' | 'a11y' | 'practices'>('editor');
  const [currentCode, setCurrentCode] = useState(element.exampleCode);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Sync code when element changes
  useEffect(() => {
    setCurrentCode(element.exampleCode);
    setActiveTab('editor');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [element]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set('element', element.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // fallback
    }
  };

  // Screen Reader Speech Simulation
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert(lang === 'id' ? 'Browser Anda tidak mendukung Web Speech API' : 'Browser does not support Web Speech API');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const narrationText = `${element.tag}. Role: ${element.accessibility.role}. ${element.accessibility.screenReaderDescription[lang]}`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = lang === 'id' ? 'id-ID' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Prepare iframe safe document
  const previewHtmlDocument = `
    <!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 1.25rem; background-color: transparent; }
          dialog::backdrop { background: rgba(15, 23, 42, 0.6); }
        </style>
      </head>
      <body>
        ${currentCode}
      </body>
    </html>
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="element-modal-title"
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
                {element.tag}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 capitalize">
                · {element.category}
              </span>
            </div>
            <h2 id="element-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              {element.name[lang]}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {element.description[lang]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title={t.shareLink}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              title={t.close}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/40 overflow-x-auto scrollbar-none py-2 text-xs font-medium">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'editor'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>{t.livePlayground}</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{t.divVsSemantic}</span>
          </button>

          <button
            onClick={() => setActiveTab('attributes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'attributes'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t.tagAttributes}</span>
          </button>

          <button
            onClick={() => setActiveTab('a11y')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'a11y'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>A11y & Screen Reader</span>
          </button>

          <button
            onClick={() => setActiveTab('practices')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'practices'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{t.bestPractices}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: Live Code Editor & Preview */}
          {activeTab === 'editor' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{lang === 'id' ? 'Edit kode HTML di bawah untuk melihat rendering langsung:' : 'Edit the HTML markup below to observe live rendering:'}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentCode(element.exampleCode)}
                    className="flex items-center gap-1 px-2.5 py-1 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.resetCode}</span>
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? t.codeCopied : t.copyCode}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Code Editor Window */}
                <div className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                  <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>HTML Live Editor</span>
                    <span className="text-[10px] text-slate-500 font-sans">Ctrl+C to copy</span>
                  </div>
                  <textarea
                    value={currentCode}
                    onChange={(e) => setCurrentCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-64 p-4 font-mono text-xs text-emerald-400 bg-transparent resize-none focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Render Output Window */}
                <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t.previewTab} (Sandboxed Iframe)</span>
                  </div>
                  <iframe
                    ref={iframeRef}
                    title="Live Preview"
                    sandbox="allow-scripts"
                    srcDoc={previewHtmlDocument}
                    className="w-full h-64 border-none bg-transparent"
                  />
                </div>
              </div>

              {/* Why Semantic callout */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                <span className="font-bold block mb-1">💡 {lang === 'id' ? 'Mengapa Tag Ini Krusial?' : 'Why is this tag critical?'}</span>
                {element.whySemantic[lang]}
              </div>
            </div>
          )}

          {/* TAB 2: Div Soup vs Semantic Comparison */}
          {activeTab === 'compare' && (
            <div className="space-y-5">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {lang === 'id'
                  ? 'Bandingkan bagaimana pola non-semantik (div-soup) menyebabkan kode membengkak dan minim makna, dibandingkan tag semantik resmi HTML5:'
                  : 'Compare legacy div-soup anti-patterns against modern clean semantic HTML5 markup:'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bad Div Soup */}
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20">
                  <div className="flex items-center gap-2 mb-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <XCircle className="w-4 h-4" />
                    <span>Non-Semantic (Div Soup)</span>
                  </div>
                  <pre className="p-3 bg-slate-900 text-rose-300 font-mono text-xs rounded-lg overflow-x-auto leading-relaxed">
                    <code>{element.divSoupComparison.divSoupCode}</code>
                  </pre>
                </div>

                {/* Clean Semantic */}
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Semantic HTML5</span>
                  </div>
                  <pre className="p-3 bg-slate-900 text-emerald-300 font-mono text-xs rounded-lg overflow-x-auto leading-relaxed">
                    <code>{element.divSoupComparison.semanticCode}</code>
                  </pre>
                </div>
              </div>

              {/* Benefits breakdown */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                  {lang === 'id' ? 'Keunggulan Menggunakan Tag Semantic:' : 'Key Advantages of Semantic Markup:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {element.divSoupComparison.benefits[lang].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: Attributes Table */}
          {activeTab === 'attributes' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {lang === 'id'
                  ? `Daftar atribut spesifik dan global yang didukung oleh elemen ${element.tag}:`
                  : `Supported specific and global attributes for ${element.tag}:`}
              </p>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    <tr>
                      <th className="p-3 font-semibold">Atribut</th>
                      <th className="p-3 font-semibold">Jenis</th>
                      <th className="p-3 font-semibold">Deskripsi</th>
                      <th className="p-3 font-semibold">Contoh Sintaks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-sans">
                    {element.attributes.map((attr, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                          {attr.name}
                          {attr.required && <span className="ml-1 text-rose-500 text-[10px]">(wajib)</span>}
                        </td>
                        <td className="p-3 capitalize text-slate-500">{attr.type}</td>
                        <td className="p-3 text-slate-700 dark:text-slate-300">{attr.description[lang]}</td>
                        <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                          {attr.example || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Accessibility & Screen Reader Audio Simulator */}
          {activeTab === 'a11y' && (
            <div className="space-y-5">
              {/* Screen Reader Voice Simulator Widget */}
              <div className="p-5 bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl shadow-lg border border-blue-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest block mb-1">
                      {lang === 'id' ? 'Simulator Audio Teknologi Asistif' : 'Assistive Speech Synthesis Simulator'}
                    </span>
                    <h3 className="text-base font-bold flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-blue-400" />
                      <span>{t.screenReaderPreview}</span>
                    </h3>
                    <p className="text-xs text-blue-200 mt-1 max-w-lg leading-relaxed">
                      {lang === 'id'
                        ? 'Dengarkan bagaimana screen reader (seperti NVDA, JAWS, atau Apple VoiceOver) melafalkan tag ini dan perannya bagi pengguna tuna netra.'
                        : 'Hear how assistive screen readers (NVDA, VoiceOver) announce this tag and its landmark role to visually impaired users.'}
                    </p>
                  </div>

                  <button
                    onClick={handleToggleSpeech}
                    className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shrink-0 ${
                      isSpeaking
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : 'bg-blue-500 hover:bg-blue-400 text-slate-950'
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>{t.stopAudio}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>{t.listenAudio}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Spoken phrase box */}
                <div className="mt-4 p-3 bg-black/40 rounded-lg border border-blue-800/60 font-mono text-xs text-blue-100 flex items-start gap-2">
                  <span className="text-blue-400 font-bold">Speech:</span>
                  <span className="italic">
                    "{element.tag}. Role: {element.accessibility.role}. {element.accessibility.screenReaderDescription[lang]}"
                  </span>
                </div>
              </div>

              {/* A11y Details Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    ARIA Role Mapping:
                  </h4>
                  <p className="font-mono text-blue-600 dark:text-blue-400 text-sm mb-3">
                    {element.accessibility.role}
                  </p>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    Dukungan Keyboard:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {element.accessibility.keyboardSupport || (lang === 'id' ? 'Navigasi normal mengikuti alur DOM dokumen.' : 'Normal DOM flow navigation.')}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    {t.seoRating}:
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {element.seoImpact[lang]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Best Practices (Do's & Don'ts) */}
          {activeTab === 'practices' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DOs */}
                <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <h4 className="flex items-center gap-1.5 font-bold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.dos}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {element.bestPractices.dos[lang].map((doItem, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{doItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* DONTs */}
                <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20">
                  <h4 className="flex items-center gap-1.5 font-bold text-xs text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-3">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>{t.donts}</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    {element.bestPractices.donts[lang].map((dontItem, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-600 font-bold shrink-0">✕</span>
                        <span>{dontItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Related Elements */}
              {element.relatedElements.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                  <span>{t.relatedElements}:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {element.relatedElements.map((relTag) => (
                      <button
                        key={relTag}
                        onClick={() => onSelectRelated(relTag.replace(/[<>]/g, ''))}
                        className="px-2 py-0.5 font-mono text-blue-600 dark:text-blue-400 hover:underline bg-slate-100 dark:bg-slate-800 rounded transition-colors"
                      >
                        {relTag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
