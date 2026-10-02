import React, { useState } from 'react';
import { Language, LintResult } from '../types';
import { translations } from '../data/translations';
import { runSemanticLint, sampleDivSoupHtml, sampleCleanHtml } from '../utils/linter';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  Check,
  Copy,
  Wand2,
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';

interface SemanticLinterProps {
  lang: Language;
}

export const SemanticLinter: React.FC<SemanticLinterProps> = ({ lang }) => {
  const t = translations[lang];
  const [inputHtml, setInputHtml] = useState<string>(sampleDivSoupHtml);
  const [result, setResult] = useState<LintResult>(() => runSemanticLint(sampleDivSoupHtml));
  const [copiedClean, setCopiedClean] = useState(false);
  const [activeTab, setActiveTab] = useState<'issues' | 'refactored'>('issues');

  const handleAudit = (html: string) => {
    setInputHtml(html);
    const auditRes = runSemanticLint(html);
    setResult(auditRes);
  };

  const handleApplyAutoFix = () => {
    if (result.cleanedHtml) {
      setInputHtml(result.cleanedHtml);
      const auditRes = runSemanticLint(result.cleanedHtml);
      setResult(auditRes);
      setActiveTab('refactored');
    }
  };

  const handleCopyCleaned = async () => {
    if (!result.cleanedHtml) return;
    try {
      await navigator.clipboard.writeText(result.cleanedHtml);
      setCopiedClean(true);
      setTimeout(() => setCopiedClean(false), 2000);
    } catch {
      // fallback
    }
  };

  // Grade color
  const gradeColors: Record<string, string> = {
    A: 'text-emerald-500 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30',
    B: 'text-blue-500 border-blue-500 bg-blue-50 dark:bg-blue-950/30',
    C: 'text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-950/30',
    D: 'text-orange-500 border-orange-500 bg-orange-50 dark:bg-orange-950/30',
    F: 'text-rose-500 border-rose-500 bg-rose-50 dark:bg-rose-950/30',
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          {t.linterTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.linterDesc}
        </p>

        {/* Preset Sample Buttons */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          <button
            onClick={() => handleAudit(sampleDivSoupHtml)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 transition-colors"
          >
            {t.loadSampleDivSoup}
          </button>
          <button
            onClick={() => handleAudit(sampleCleanHtml)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 transition-colors"
          >
            {t.loadSampleClean}
          </button>
        </div>
      </section>

      {/* Editor & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Code Textarea (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{lang === 'id' ? 'Kode HTML untuk diperiksa:' : 'Raw HTML to evaluate:'}</span>
            <button
              onClick={() => handleAudit(inputHtml)}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs transition-colors"
            >
              {t.runAudit}
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner flex flex-col">
            <textarea
              value={inputHtml}
              onChange={(e) => {
                setInputHtml(e.target.value);
                setResult(runSemanticLint(e.target.value));
              }}
              spellCheck={false}
              placeholder={t.pasteHtmlPlaceholder}
              className="w-full h-[440px] p-4 font-mono text-xs text-emerald-400 bg-transparent resize-none focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right Side: Score & Issues Deck (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Health Score & Stats Card */}
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {t.healthScore}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {result.score}
                  </span>
                  <span className="text-sm font-semibold text-slate-400">/ 100</span>
                </div>
              </div>

              {/* Grade Badge */}
              <div
                className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center font-mono text-2xl font-black ${
                  gradeColors[result.grade]
                }`}
              >
                {result.grade}
              </div>
            </div>

            {/* Metrics Breakdown (Clean unboxed figures) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block">{t.divCountLabel}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {result.stats.divCount}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.semanticCountLabel}</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {result.stats.semanticCount}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.semanticRatioLabel}</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {Math.round(result.stats.semanticRatio * 100)}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">{t.landmarksLabel}</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {result.stats.landmarksCount}
                </span>
              </div>
            </div>
          </div>

          {/* Action: Auto-Fix Trigger */}
          {result.issues.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 border border-blue-200 dark:border-slate-700 rounded-xl flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5">
                  <Wand2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{t.autoFix}</span>
                </h4>
                <p className="text-[11px] text-blue-800 dark:text-slate-300 mt-0.5">
                  {lang === 'id'
                    ? 'Konversi div class="header", class="nav", dll. menjadi tag semantic resmi dalam 1 klik.'
                    : 'Transform div class="header", class="nav", etc. into official semantic tags automatically.'}
                </p>
              </div>
              <button
                onClick={handleApplyAutoFix}
                className="px-3.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1"
              >
                <span>Terapkan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Issues Deck Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-medium">
            <button
              onClick={() => setActiveTab('issues')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'issues'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {t.detectedIssues} ({result.issues.length})
            </button>
            <button
              onClick={() => setActiveTab('refactored')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'refactored'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              Hasil Refactor Semantic
            </button>
          </div>

          {/* TAB: Issues list */}
          {activeTab === 'issues' && (
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {result.issues.length === 0 ? (
                <div className="p-6 text-center bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    {t.noIssuesFound}
                  </p>
                </div>
              ) : (
                result.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold">
                        {issue.severity === 'error' && <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />}
                        {issue.severity === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                        {issue.severity === 'info' && <Info className="w-3.5 h-3.5 text-blue-500" />}
                        <span className="text-slate-900 dark:text-white">{issue.title[lang]}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">{issue.severity}</span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      {issue.message[lang]}
                    </p>

                    {issue.suggestedFix && (
                      <div className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded text-[11px] font-mono text-blue-600 dark:text-blue-400">
                        <span className="text-slate-400 select-none">Fix: </span>
                        {issue.suggestedFix}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Refactored preview */}
          {activeTab === 'refactored' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">HTML Semantic Bersih:</span>
                <button
                  onClick={handleCopyCleaned}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {copiedClean ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedClean ? t.codeCopied : t.copyCode}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 text-emerald-400 font-mono text-xs rounded-lg overflow-x-auto max-h-[300px] leading-relaxed border border-slate-800">
                <code>{result.cleanedHtml}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
