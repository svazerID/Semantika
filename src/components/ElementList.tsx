import React, { useState, useMemo } from 'react';
import { SemanticElement, ElementCategory, Language } from '../types';
import { translations } from '../data/translations';
import { Search, ArrowRight, Layout, Type, Image as ImageIcon, Sparkles, FormInput, Table as TableIcon } from 'lucide-react';

interface ElementListProps {
  elements: SemanticElement[];
  onSelectElement: (el: SemanticElement) => void;
  lang: Language;
}

export const ElementList: React.FC<ElementListProps> = ({
  elements,
  onSelectElement,
  lang,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[lang];

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: t.allCategories, icon: null },
    { id: 'structure', label: t.catStructure, icon: <Layout className="w-3.5 h-3.5" /> },
    { id: 'text', label: t.catText, icon: <Type className="w-3.5 h-3.5" /> },
    { id: 'media', label: t.catMedia, icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'interactive', label: t.catInteractive, icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'form', label: t.catForm, icon: <FormInput className="w-3.5 h-3.5" /> },
    { id: 'tabular', label: t.catTabular, icon: <TableIcon className="w-3.5 h-3.5" /> },
  ];

  const filteredElements = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return elements.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const tagMatch = item.tag.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      const nameMatch = item.name[lang].toLowerCase().includes(q);
      const summaryMatch = item.summary[lang].toLowerCase().includes(q);
      const whyMatch = item.whySemantic[lang].toLowerCase().includes(q);

      return tagMatch || nameMatch || summaryMatch || whyMatch;
    });
  }, [elements, searchQuery, selectedCategory, lang]);

  return (
    <div className="space-y-8">
      {/* Hero Presentation */}
      <section className="text-center py-6 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {lang === 'id' ? 'Kuasai Semantic HTML5 Secara Mendalam' : 'Master Semantic HTML5 Interactively'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {lang === 'id'
            ? 'Tinggalkan kebiasaan div-soup. Pelajari makna sejati, dampak aksesibilitas (a11y), dan optimasi SEO dari setiap tag semantik web modern.'
            : 'Move beyond div-soup architecture. Discover the semantic purpose, screen reader a11y roles, and SEO indexing power of modern HTML5.'}
        </p>
      </section>

      {/* Search & Filter Controls */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Reset
            </button>
          )}
        </div>

        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Result Counter (Unboxed metadata per frontend-design skill) */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <div>
            <span>{filteredElements.length}</span>
            <span className="ml-1">{t.elementsCount}</span>
          </div>
          {searchQuery && (
            <span>
              {lang === 'id' ? `Hasil pencarian untuk "${searchQuery}"` : `Results for "${searchQuery}"`}
            </span>
          )}
        </div>
      </div>

      {/* Elements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredElements.map((el) => (
          <article
            key={el.id}
            onClick={() => onSelectElement(el)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectElement(el);
              }
            }}
            className="group flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div>
              {/* Card Header: Tag & Unboxed Category Metadata */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-base font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  {el.tag}
                </span>
                {/* Zero-Pill text metadata with separator */}
                <span className="text-xs text-slate-400 dark:text-slate-500 capitalize">
                  {el.category}
                </span>
              </div>

              <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                {el.name[lang]}
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {el.summary[lang]}
              </p>
            </div>

            {/* Card Footer: Metadata info & Action affordance */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate max-w-[170px]" title={el.accessibility.role}>
                Role: <span className="font-mono text-slate-700 dark:text-slate-300">{el.accessibility.role.split(' ')[0]}</span>
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                <span>Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredElements.length === 0 && (
        <div className="text-center py-16 bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8">
          <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {lang === 'id' ? 'Tidak ada elemen yang cocok' : 'No matching elements found'}
          </p>
          <p className="text-xs text-slate-500 mb-4">
            {lang === 'id'
              ? 'Coba gunakan kata kunci lain atau pilih kategori "Semua Kategori".'
              : 'Try a different search keyword or select "All Categories".'}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {lang === 'id' ? 'Reset Pencarian' : 'Clear Filters'}
          </button>
        </div>
      )}
    </div>
  );
};
