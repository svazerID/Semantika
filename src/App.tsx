import React, { useState, useEffect } from 'react';
import { Language, SemanticElement } from './types';
import { allSemanticElements, getElementById } from './data/elements';
import { Navbar } from './components/Navbar';
import { ElementList } from './components/ElementList';
import { ElementDetailModal } from './components/ElementDetailModal';
import { PageBuilder } from './components/PageBuilder';
import { SemanticLinter } from './components/SemanticLinter';
import { QuizView } from './components/QuizView';
import { CheatsheetView } from './components/CheatsheetView';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('semantika_lang') as Language) || 'id';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('semantika_dark');
    if (saved !== null) return saved === 'true';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState<'elements' | 'builder' | 'linter' | 'quiz' | 'cheatsheet'>('elements');
  const [selectedElement, setSelectedElement] = useState<SemanticElement | null>(null);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('semantika_dark', String(darkMode));
  }, [darkMode]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('semantika_lang', lang);
  }, [lang]);

  // Deep linking via URL params (e.g. ?element=article or ?tab=linter)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const elementParam = params.get('element');
    const tabParam = params.get('tab');

    if (tabParam && ['elements', 'builder', 'linter', 'quiz', 'cheatsheet'].includes(tabParam)) {
      setActiveTab(tabParam as any);
    }

    if (elementParam) {
      const found = getElementById(elementParam);
      if (found) {
        setSelectedElement(found);
      }
    }
  }, []);

  const handleSelectRelatedTag = (tagStr: string) => {
    const cleanId = tagStr.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = getElementById(cleanId);
    if (found) {
      setSelectedElement(found);
    }
  };

  const handleCloseModal = () => {
    setSelectedElement(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('element');
    window.history.replaceState({}, '', url.toString());
  };

  const handleOpenElement = (el: SemanticElement) => {
    setSelectedElement(el);
    const url = new URL(window.location.href);
    url.searchParams.set('element', el.id);
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          const url = new URL(window.location.href);
          url.searchParams.set('tab', tab);
          window.history.replaceState({}, '', url.toString());
        }}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'elements' && (
          <ElementList
            elements={allSemanticElements}
            onSelectElement={handleOpenElement}
            lang={lang}
          />
        )}

        {activeTab === 'builder' && <PageBuilder lang={lang} />}

        {activeTab === 'linter' && <SemanticLinter lang={lang} />}

        {activeTab === 'quiz' && <QuizView lang={lang} />}

        {activeTab === 'cheatsheet' && (
          <CheatsheetView
            elements={allSemanticElements}
            lang={lang}
            onSelectElement={handleOpenElement}
          />
        )}
      </main>

      {/* Detail Modal */}
      {selectedElement && (
        <ElementDetailModal
          element={selectedElement}
          onClose={handleCloseModal}
          lang={lang}
          onSelectRelated={handleSelectRelatedTag}
        />
      )}

      {/* Semantic Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Semantika. Standar Web Terbuka untuk Edukasi Semantic HTML5 & Aksesibilitas (WCAG 2.1 AA).</p>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cheatsheet
            </button>
            <button
              onClick={() => setActiveTab('linter')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Linter a11y
            </button>
            <a
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              W3C Guidelines ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
