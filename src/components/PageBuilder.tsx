import React, { useState } from 'react';
import { BuilderNode, Language } from '../types';
import { translations } from '../data/translations';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Download,
  Layout,
  Layers,
  Code2,
  Sparkles,
  AlertCircle,
  FileCode
} from 'lucide-react';

interface PageBuilderProps {
  lang: Language;
}

const defaultBlogTree: BuilderNode = {
  id: 'root-body',
  tag: 'body',
  label: 'Dokumen Web',
  children: [
    {
      id: 'b-header',
      tag: 'header',
      label: 'Header Landmark',
      children: [
        { id: 'b-h1', tag: 'h1', label: 'Judul Situs', content: 'Blog Rekayasa Web' },
        {
          id: 'b-nav',
          tag: 'nav',
          label: 'Menu Navigasi Utama',
          attributes: { 'aria-label': 'Navigasi Utama' },
          children: [
            { id: 'b-link1', tag: 'a', label: 'Link Beranda', content: 'Beranda' },
            { id: 'b-link2', tag: 'a', label: 'Link Artikel', content: 'Daftar Artikel' },
            { id: 'b-link3', tag: 'a', label: 'Link Kontak', content: 'Kontak' }
          ]
        }
      ]
    },
    {
      id: 'b-main',
      tag: 'main',
      label: 'Main Content Landmark',
      attributes: { id: 'main-content' },
      children: [
        {
          id: 'b-article',
          tag: 'article',
          label: 'Artikel Mandiri',
          children: [
            { id: 'b-art-h2', tag: 'h2', label: 'Judul Artikel', content: 'Masa Depan Semantic Web' },
            { id: 'b-time', tag: 'time', label: 'Tanggal Publikasi', attributes: { datetime: '2026-10-02' }, content: '2 Oktober 2026' },
            { id: 'b-p1', tag: 'p', label: 'Paragraf Utama', content: 'Semantic HTML5 memberikan struktur yang kokoh dan aksesibel bagi jutaan pengguna di seluruh dunia.' },
            {
              id: 'b-figure',
              tag: 'figure',
              label: 'Figure Media',
              children: [
                { id: 'b-img', tag: 'img', label: 'Gambar', attributes: { src: 'diagram.svg', alt: 'Peta Arsitektur Semantic DOM' } },
                { id: 'b-figcaption', tag: 'figcaption', label: 'Caption Gambar', content: 'Diagram 1: Visualisasi struktur node dokumen' }
              ]
            }
          ]
        },
        {
          id: 'b-aside',
          tag: 'aside',
          label: 'Sidebar Tambahan',
          attributes: { 'aria-label': 'Bacaan Terkait' },
          children: [
            { id: 'b-aside-h3', tag: 'h3', label: 'Judul Sidebar', content: 'Artikel Terpopuler' },
            { id: 'b-aside-p', tag: 'p', label: 'Info Sidebar', content: 'Pelajari pula panduan ARIA Authoring Practices Guide.' }
          ]
        }
      ]
    },
    {
      id: 'b-footer',
      tag: 'footer',
      label: 'Footer Landmark',
      children: [
        { id: 'b-copy', tag: 'p', label: 'Hak Cipta', content: '© 2026 Edukasi Semantika. Hak Cipta Dilindungi.' }
      ]
    }
  ]
};

const defaultLandingTree: BuilderNode = {
  id: 'root-body',
  tag: 'body',
  label: 'Landing Page',
  children: [
    {
      id: 'l-header',
      tag: 'header',
      label: 'Header Navigasi',
      children: [
        { id: 'l-logo', tag: 'h1', label: 'Brand Wordmark', content: 'SuperApp' },
        {
          id: 'l-nav',
          tag: 'nav',
          label: 'Navigasi',
          attributes: { 'aria-label': 'Menu Produk' },
          children: [
            { id: 'l-n1', tag: 'a', label: 'Fitur', content: 'Fitur' },
            { id: 'l-n2', tag: 'a', label: 'Harga', content: 'Harga' },
            { id: 'l-n3', tag: 'a', label: 'Dokumentasi', content: 'Dokumentasi' }
          ]
        }
      ]
    },
    {
      id: 'l-main',
      tag: 'main',
      label: 'Main Showcase',
      children: [
        {
          id: 'l-hero',
          tag: 'section',
          label: 'Hero Section',
          attributes: { 'aria-labelledby': 'hero-heading' },
          children: [
            { id: 'l-hh', tag: 'h2', label: 'Hero Title', content: 'Solusi Web Aksesibel Tanpa Batas' },
            { id: 'l-hp', tag: 'p', label: 'Hero Subtitle', content: 'Tingkatkan performa web Anda dengan arsitektur semantic berstandar W3C.' }
          ]
        },
        {
          id: 'l-features',
          tag: 'section',
          label: 'Section Fitur',
          attributes: { 'aria-labelledby': 'features-heading' },
          children: [
            { id: 'l-fh', tag: 'h2', label: 'Features Title', content: 'Fitur Unggulan' },
            { id: 'l-details', tag: 'details', label: 'FAQ Disclosure', children: [
              { id: 'l-summary', tag: 'summary', label: 'Summary Question', content: 'Bagaimana cara integrasinya?' },
              { id: 'l-ans', tag: 'p', label: 'Answer Text', content: 'Cukup gunakan tag HTML semantic standar tanpa dependensi tambahan.' }
            ]}
          ]
        }
      ]
    },
    {
      id: 'l-footer',
      tag: 'footer',
      label: 'Footer Legal',
      children: [
        { id: 'l-fc', tag: 'p', label: 'Copyright', content: '© 2026 SuperApp Inc. All rights reserved.' }
      ]
    }
  ]
};

export const PageBuilder: React.FC<PageBuilderProps> = ({ lang }) => {
  const t = translations[lang];
  const [tree, setTree] = useState<BuilderNode>(defaultBlogTree);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('root-body');
  const [copied, setCopied] = useState(false);

  // Convert Tree to HTML string
  const renderHtmlString = (node: BuilderNode, indent = 0): string => {
    const spaces = '  '.repeat(indent);
    const attrString = node.attributes
      ? ' ' + Object.entries(node.attributes).map(([k, v]) => `${k}="${v}"`).join(' ')
      : '';

    if (node.tag === 'img') {
      return `${spaces}<img${attrString}>\n`;
    }

    if (node.children && node.children.length > 0) {
      const childrenHtml = node.children
        .map(child => renderHtmlString(child, indent + 1))
        .join('');
      return `${spaces}<${node.tag}${attrString}>\n${childrenHtml}${spaces}</${node.tag}>\n`;
    }

    return `${spaces}<${node.tag}${attrString}>${node.content || ''}</${node.tag}>\n`;
  };

  const generatedHtml = renderHtmlString(tree);

  // Copy HTML
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Download HTML file
  const handleDownload = () => {
    const fullDoc = `<!DOCTYPE html>\n<html lang="${lang}">\n<head>\n  <meta charset="UTF-8">\n  <title>Semantic Page</title>\n</head>\n${generatedHtml}</html>`;
    const blob = new Blob([fullDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'semantic-page.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add child to a selected node
  const handleAddChild = (parentId: string, tag: string, label: string) => {
    const newNode: BuilderNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      tag,
      label,
      content: tag === 'p' ? 'Konten teks semantik...' : tag.startsWith('h') ? 'Judul Baru' : undefined
    };

    const insertNode = (current: BuilderNode): BuilderNode => {
      if (current.id === parentId) {
        return {
          ...current,
          children: [...(current.children || []), newNode]
        };
      }
      if (current.children) {
        return {
          ...current,
          children: current.children.map(insertNode)
        };
      }
      return current;
    };

    setTree(insertNode(tree));
  };

  // Delete node
  const handleDeleteNode = (idToDelete: string) => {
    if (idToDelete === 'root-body') return;

    const removeNode = (current: BuilderNode): BuilderNode => {
      if (!current.children) return current;
      return {
        ...current,
        children: current.children
          .filter(child => child.id !== idToDelete)
          .map(removeNode)
      };
    };

    setTree(removeNode(tree));
    if (selectedNodeId === idToDelete) {
      setSelectedNodeId('root-body');
    }
  };

  // Render visual representation of the DOM tree
  const renderVisualNode = (node: BuilderNode) => {
    const isSelected = selectedNodeId === node.id;

    // Special layout styling for semantic elements
    const tagBgColors: Record<string, string> = {
      header: 'border-blue-300 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/20',
      nav: 'border-cyan-300 dark:border-cyan-900 bg-cyan-50/60 dark:bg-cyan-950/20',
      main: 'border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20',
      article: 'border-indigo-300 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20',
      section: 'border-violet-300 dark:border-violet-900 bg-violet-50/50 dark:bg-violet-950/20',
      aside: 'border-amber-300 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20',
      footer: 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/40',
      figure: 'border-teal-300 dark:border-teal-900 bg-teal-50/50 dark:bg-teal-950/20',
      details: 'border-purple-300 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20',
    };

    const containerStyle = tagBgColors[node.tag] || 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900';

    return (
      <div
        key={node.id}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedNodeId(node.id);
        }}
        className={`p-3 my-1.5 rounded-lg border transition-all text-xs cursor-pointer ${containerStyle} ${
          isSelected ? 'ring-2 ring-blue-500 shadow-xs' : 'hover:border-blue-400'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
              &lt;{node.tag}&gt;
            </span>
            <span className="text-[10px] text-slate-500 capitalize">· {node.label}</span>
          </div>

          {node.id !== 'root-body' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNode(node.id);
              }}
              title="Hapus elemen"
              className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>

        {node.content && (
          <p className="text-slate-600 dark:text-slate-300 italic mb-1 text-[11px] truncate">
            "{node.content}"
          </p>
        )}

        {node.children && node.children.length > 0 && (
          <div className="pl-3 border-l-2 border-slate-300 dark:border-slate-700 mt-2 space-y-1">
            {node.children.map(renderVisualNode)}
          </div>
        )}
      </div>
    );
  };

  // Inspect tree accessibility
  const hasMain = JSON.stringify(tree).includes('"tag":"main"');
  const hasHeader = JSON.stringify(tree).includes('"tag":"header"');
  const hasFooter = JSON.stringify(tree).includes('"tag":"footer"');

  return (
    <div className="space-y-6">
      {/* Header section */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          {t.builderTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {t.builderDesc}
        </p>

        {/* Template Selector Preset */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">{t.loadPreset}:</span>
          <button
            onClick={() => setTree(defaultBlogTree)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            {t.presetBlog}
          </button>
          <button
            onClick={() => setTree(defaultLandingTree)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            {t.presetLanding}
          </button>
        </div>
      </section>

      {/* Main Builder Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Palette & Structure Tree (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Element Insertion Palette */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-blue-500" />
              <span>{lang === 'id' ? `Sisipkan Tag ke Target yang Dipilih` : `Insert Tag to Selected Node`}</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {[
                { tag: 'header', label: 'Header' },
                { tag: 'nav', label: 'Navigation' },
                { tag: 'main', label: 'Main' },
                { tag: 'article', label: 'Article' },
                { tag: 'section', label: 'Section' },
                { tag: 'aside', label: 'Aside' },
                { tag: 'footer', label: 'Footer' },
                { tag: 'figure', label: 'Figure' },
                { tag: 'details', label: 'Details' },
                { tag: 'p', label: 'Paragraph' },
                { tag: 'h2', label: 'Heading 2' },
                { tag: 'time', label: 'Time' },
              ].map((btn) => (
                <button
                  key={btn.tag}
                  onClick={() => handleAddChild(selectedNodeId, btn.tag, btn.label)}
                  className="px-2.5 py-1.5 text-xs font-mono font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors text-left flex items-center justify-between group"
                >
                  <span>&lt;{btn.tag}&gt;</span>
                  <Plus className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {lang === 'id'
                ? `Elemen akan disisipkan di dalam node target aktif (ID: ${selectedNodeId}).`
                : `New element will be placed inside target node (ID: ${selectedNodeId}).`}
            </p>
          </div>

          {/* Interactive DOM Tree Canvas */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>{t.domHierarchy}</span>
              </h2>
              <span className="text-[11px] text-slate-400">Klik node untuk memilih target</span>
            </div>

            <div className="max-h-[460px] overflow-y-auto pr-1">
              {renderVisualNode(tree)}
            </div>
          </div>
        </div>

        {/* Right Side: Generated Semantic HTML & A11y Audit (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Landmark Checklist Status */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              {lang === 'id' ? 'Audit Kelengkapan Landmark Halaman' : 'Landmark Completeness Audit'}
            </h2>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                hasHeader ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}>
                <span>{hasHeader ? '✓' : '✕'}</span>
                <span className="font-semibold">&lt;header&gt;</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                hasMain ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}>
                <span>{hasMain ? '✓' : '✕'}</span>
                <span className="font-semibold">&lt;main&gt;</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                hasFooter ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
              }`}>
                <span>{hasFooter ? '✓' : '✕'}</span>
                <span className="font-semibold">&lt;footer&gt;</span>
              </div>
            </div>
            {!hasMain && (
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Peringatan: Dokumen wajib memiliki satu elemen &lt;main&gt; untuk konten utama.</span>
              </p>
            )}
          </div>

          {/* Generated Code Window */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg flex flex-col">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span>{t.generatedHtml}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.codeCopied : t.copyCode}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .html</span>
                </button>
              </div>
            </div>

            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[380px] leading-relaxed">
              <code>{generatedHtml}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
