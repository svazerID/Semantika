import React from 'react';
import { SemanticElement, Language } from '../types';
import { translations } from '../data/translations';
import { Printer, Download, BookOpen } from 'lucide-react';

interface CheatsheetViewProps {
  elements: SemanticElement[];
  lang: Language;
  onSelectElement: (el: SemanticElement) => void;
}

export const CheatsheetView: React.FC<CheatsheetViewProps> = ({
  elements,
  lang,
  onSelectElement,
}) => {
  const t = translations[lang];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.cheatsheetTitle}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.cheatsheetDesc}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{t.printOrExport}</span>
        </button>
      </section>

      {/* Cheatsheet Table */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="p-3.5 font-bold">Tag Semantic</th>
              <th className="p-3.5 font-bold">Kategori</th>
              <th className="p-3.5 font-bold">Fungsi & Makna</th>
              <th className="p-3.5 font-bold">ARIA Role</th>
              <th className="p-3.5 font-bold">Alternatif Div Soup</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {elements.map((el) => (
              <tr
                key={el.id}
                onClick={() => onSelectElement(el)}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                <td className="p-3.5 font-mono font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  {el.tag}
                </td>
                <td className="p-3.5 capitalize text-slate-500 whitespace-nowrap">
                  {el.category}
                </td>
                <td className="p-3.5 text-slate-700 dark:text-slate-300 max-w-md">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">
                    {el.name[lang]}
                  </span>
                  {el.summary[lang]}
                </td>
                <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                  {el.accessibility.role.split(' ')[0]}
                </td>
                <td className="p-3.5 font-mono text-rose-500/80 dark:text-rose-400/80 text-[11px] whitespace-nowrap">
                  {`<div class="${el.id}">`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
