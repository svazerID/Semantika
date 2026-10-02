import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Sun, Moon, Globe } from 'lucide-react';

interface NavbarProps {
  activeTab: 'elements' | 'builder' | 'linter' | 'quiz' | 'cheatsheet';
  setActiveTab: (tab: 'elements' | 'builder' | 'linter' | 'quiz' | 'cheatsheet') => void;
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  darkMode,
  setDarkMode,
}) => {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('elements')}
          className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-blue-600 dark:text-blue-400 font-mono">&lt;/&gt;</span>
          <span>Semantika</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Navigasi Utama">
          <button
            onClick={() => setActiveTab('elements')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'elements'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navElements}
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'builder'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navBuilder}
          </button>
          <button
            onClick={() => setActiveTab('linter')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'linter'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navLinter}
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'quiz'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navQuiz}
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'cheatsheet'
                ? 'text-blue-600 dark:text-blue-400 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.navCheatsheet}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions (Language & Theme Toggles) */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
            aria-label={t.languageToggle}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors whitespace-nowrap"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={t.themeToggle}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile subnav */}
      <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800 gap-4 text-xs font-medium scrollbar-none">
        <button
          onClick={() => setActiveTab('elements')}
          className={`whitespace-nowrap py-1 ${activeTab === 'elements' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
        >
          {t.navElements}
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`whitespace-nowrap py-1 ${activeTab === 'builder' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
        >
          {t.navBuilder}
        </button>
        <button
          onClick={() => setActiveTab('linter')}
          className={`whitespace-nowrap py-1 ${activeTab === 'linter' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
        >
          {t.navLinter}
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap py-1 ${activeTab === 'quiz' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
        >
          {t.navQuiz}
        </button>
        <button
          onClick={() => setActiveTab('cheatsheet')}
          className={`whitespace-nowrap py-1 ${activeTab === 'cheatsheet' ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}
        >
          {t.navCheatsheet}
        </button>
      </div>
    </header>
  );
};
