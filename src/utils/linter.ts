import { LintIssue, LintResult } from '../types';

export function runSemanticLint(htmlString: string): LintResult {
  const issues: LintIssue[] = [];
  const trimmed = htmlString.trim();

  if (!trimmed) {
    return {
      score: 100,
      grade: 'A',
      issues: [],
      stats: {
        divCount: 0,
        semanticCount: 0,
        semanticRatio: 1,
        headingHierarchyOk: true,
        landmarksCount: 0
      }
    };
  }

  // Parse HTML using DOMParser
  const parser = new DOMParser();
  const doc = parser.parseFromString(trimmed, 'text/html');

  // Count elements
  const allElements = Array.from(doc.body.querySelectorAll('*'));
  const divs = doc.body.querySelectorAll('div');
  const divCount = divs.length;

  const semanticTags = [
    'header', 'nav', 'main', 'article', 'section', 'aside', 'footer',
    'figure', 'figcaption', 'time', 'mark', 'details', 'summary',
    'dialog', 'meter', 'progress', 'output', 'fieldset', 'legend',
    'table', 'caption', 'thead', 'tbody', 'tfoot', 'th', 'cite',
    'blockquote', 'code', 'kbd', 'samp', 'ruby', 'bdi'
  ];

  let semanticCount = 0;
  semanticTags.forEach(tag => {
    semanticCount += doc.body.querySelectorAll(tag).length;
  });

  const landmarks = ['header', 'nav', 'main', 'aside', 'footer'];
  let landmarksCount = 0;
  landmarks.forEach(lm => {
    landmarksCount += doc.body.querySelectorAll(lm).length;
  });

  // 1. Check for Div Soup: div with semantic class names or IDs
  divs.forEach((div, index) => {
    const classAttr = (div.getAttribute('class') || '').toLowerCase();
    const idAttr = (div.getAttribute('id') || '').toLowerCase();
    const combined = `${classAttr} ${idAttr}`;

    if (/\b(header|top-bar|site-header|navbar-header)\b/.test(combined)) {
      issues.push({
        id: `div-header-${index}`,
        severity: 'error',
        category: 'div-soup',
        title: { id: 'Penyalahgunaan <div> untuk Header', en: 'Misuse of <div> for Header' },
        message: {
          id: `Ditemukan <div class="${classAttr}">. Gunakan elemen semantik <header> untuk memberikan landmark "banner" pada assistive tech.`,
          en: `Found <div class="${classAttr}">. Use semantic <header> to provide the "banner" landmark to assistive technology.`
        },
        suggestedFix: `<header class="${classAttr}">...</header>`,
        offendingCode: div.outerHTML.slice(0, 100)
      });
    }

    if (/\b(nav|navigation|menu|navbar|site-nav)\b/.test(combined)) {
      issues.push({
        id: `div-nav-${index}`,
        severity: 'error',
        category: 'div-soup',
        title: { id: 'Penyalahgunaan <div> untuk Navigasi', en: 'Misuse of <div> for Navigation' },
        message: {
          id: `Ditemukan elemen navigasi yang dibungkus <div>. Gunakan tag <nav aria-label="..."> agar pembaca layar dapat langsung melompat ke daftar menu.`,
          en: `Found navigation wrapped in <div>. Use <nav aria-label="..."> so screen readers can jump to menu links immediately.`
        },
        suggestedFix: `<nav class="${classAttr}">...</nav>`,
        offendingCode: div.outerHTML.slice(0, 100)
      });
    }

    if (/\b(footer|site-footer|bottom-bar)\b/.test(combined)) {
      issues.push({
        id: `div-footer-${index}`,
        severity: 'error',
        category: 'div-soup',
        title: { id: 'Penyalahgunaan <div> untuk Footer', en: 'Misuse of <div> for Footer' },
        message: {
          id: `Ditemukan footer yang menggunakan <div>. Gunakan tag <footer> agar dikenali sebagai "contentinfo" landmark resmi.`,
          en: `Found footer using <div>. Use <footer> so it registers as an official "contentinfo" landmark.`
        },
        suggestedFix: `<footer class="${classAttr}">...</footer>`,
        offendingCode: div.outerHTML.slice(0, 100)
      });
    }

    if (/\b(sidebar|aside|drawer-aside)\b/.test(combined)) {
      issues.push({
        id: `div-aside-${index}`,
        severity: 'warning',
        category: 'div-soup',
        title: { id: 'Gunakan <aside> untuk Sidebar', en: 'Use <aside> for Sidebars' },
        message: {
          id: `Elemen sidebar <div class="${classAttr}"> sebaiknya diganti dengan <aside> agar konten pelengkap terpisah dari alur baca konten utama.`,
          en: `Sidebar container <div class="${classAttr}"> should use <aside> to decouple complementary content from primary article reading flow.`
        },
        suggestedFix: `<aside class="${classAttr}">...</aside>`,
        offendingCode: div.outerHTML.slice(0, 100)
      });
    }

    if (/\b(post|article|card-article|news-item)\b/.test(combined)) {
      issues.push({
        id: `div-article-${index}`,
        severity: 'warning',
        category: 'div-soup',
        title: { id: 'Gunakan <article> untuk Konten Mandiri', en: 'Use <article> for Standalone Content' },
        message: {
          id: `Konten kartu postingan/berita lebih tepat dibungkus dengan <article> agar mendukung RSS feed dan browser Reader Mode.`,
          en: `Cards representing independent posts or news items are best enclosed in <article> to support RSS and browser Reader Mode.`
        },
        suggestedFix: `<article class="${classAttr}">...</article>`,
        offendingCode: div.outerHTML.slice(0, 100)
      });
    }

    // Check for fake button: div with onclick or class="btn"
    if (div.hasAttribute('onclick') || /\b(btn|button)\b/.test(classAttr)) {
      if (div.getAttribute('role') !== 'button') {
        issues.push({
          id: `div-button-${index}`,
          severity: 'error',
          category: 'accessibility',
          title: { id: 'Fake Button Ditemukan (<div> alih-alih <button>)', en: 'Fake Button Detected (<div> instead of <button>)' },
          message: {
            id: `Elemen <div> digunakan sebagai tombol interaktif. Ini tidak dapat diakses pengguna keyboard (Tab/Enter/Spasi). Gunakan <button type="button">!`,
            en: `An interactive button is built using <div>. It is unreachable via keyboard navigation (Tab/Enter/Space). Always use <button type="button">!`
          },
          suggestedFix: `<button type="button" class="${classAttr}">...</button>`,
          offendingCode: div.outerHTML.slice(0, 100)
        });
      }
    }
  });

  // 2. Check for missing Main landmark if layout is substantial
  const hasMain = doc.body.querySelector('main') !== null;
  if (!hasMain && allElements.length > 5) {
    issues.push({
      id: 'missing-main',
      severity: 'error',
      category: 'structure',
      title: { id: 'Tidak Ada Landmark <main>', en: 'Missing <main> Landmark' },
      message: {
        id: 'Halaman belum memiliki elemen <main>. Pengguna screen reader bergantung pada <main> untuk melompati navigasi atas dan langsung menuju isi topik.',
        en: 'The document lacks a <main> element. Screen reader users rely on <main> to bypass top nav and jump directly to topic content.'
      },
      suggestedFix: '<main id="main-content"> ... konten utama ... </main>'
    });
  }

  // 3. Check for Images missing alt attribute
  const images = Array.from(doc.body.querySelectorAll('img'));
  images.forEach((img, idx) => {
    if (!img.hasAttribute('alt')) {
      issues.push({
        id: `img-missing-alt-${idx}`,
        severity: 'error',
        category: 'accessibility',
        title: { id: 'Gambar Kehilangan Atribut alt', en: 'Image Missing alt Attribute' },
        message: {
          id: `Tag <img> tidak memiliki atribut alt. Screen reader akan membacakan nama file URL yang panjang dan membingungkan pengguna disabilitas.`,
          en: `Tag <img> is missing an alt attribute. Screen readers will enunciate raw file paths, severely degrading accessibility.`
        },
        suggestedFix: '<img src="..." alt="Deskripsi gambar yang bermakna">',
        offendingCode: img.outerHTML.slice(0, 100)
      });
    }
  });

  // 4. Check for Form inputs without labels
  const inputs = Array.from(doc.body.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])'));
  inputs.forEach((input, idx) => {
    const id = input.getAttribute('id');
    const hasLabel = id ? doc.body.querySelector(`label[for="${id}"]`) !== null : false;
    const isWrappedInLabel = input.closest('label') !== null;
    const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');

    if (!hasLabel && !isWrappedInLabel && !hasAriaLabel) {
      issues.push({
        id: `input-unlabeled-${idx}`,
        severity: 'warning',
        category: 'accessibility',
        title: { id: 'Form Input Tanpa <label>', en: 'Form Input Without <label>' },
        message: {
          id: `Elemen <input type="${input.getAttribute('type') || 'text'}"> tidak terhubung dengan <label>. Placeholder bukan pengganti label aksesibel!`,
          en: `Element <input> is not associated with any <label>. Note that placeholders are never an accessible replacement for real labels!`
        },
        suggestedFix: `<label for="${id || 'input-id'}">Label Teks</label>\n<input id="${id || 'input-id'}">`,
        offendingCode: input.outerHTML.slice(0, 100)
      });
    }
  });

  // 5. Check for Image with Caption not using <figure>
  const imageWrappers = Array.from(doc.body.querySelectorAll('div, p'));
  imageWrappers.forEach((wrapper, idx) => {
    const hasImg = wrapper.querySelector('img') !== null;
    const classStr = (wrapper.getAttribute('class') || '').toLowerCase();
    if (hasImg && (classStr.includes('caption') || classStr.includes('figure') || classStr.includes('image-box'))) {
      if (wrapper.tagName.toLowerCase() !== 'figure') {
        issues.push({
          id: `div-figure-${idx}`,
          severity: 'info',
          category: 'div-soup',
          title: { id: 'Rekomendasi: Gunakan <figure> dan <figcaption>', en: 'Recommendation: Use <figure> and <figcaption>' },
          message: {
            id: 'Terdapat gambar bersanding dengan teks keterangan. Bungkus dengan <figure> dan <figcaption> agar terikat secara semantik.',
            en: 'Found image paired with visual caption. Enclose in <figure> and <figcaption> for semantic binding.'
          },
          suggestedFix: '<figure><img src="..." alt="..."><figcaption>Keterangan</figcaption></figure>'
        });
      }
    }
  });

  // 6. Check for Heading Hierarchy Jumps
  const headings = Array.from(doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let prevLevel = 0;
  let headingHierarchyOk = true;
  headings.forEach((h, idx) => {
    const level = parseInt(h.tagName.substring(1), 10);
    if (prevLevel > 0 && level > prevLevel + 1) {
      headingHierarchyOk = false;
      issues.push({
        id: `heading-jump-${idx}`,
        severity: 'warning',
        category: 'structure',
        title: { id: `Hierarki Heading Melompat dari H${prevLevel} ke H${level}`, en: `Heading Hierarchy Skipped from H${prevLevel} to H${level}` },
        message: {
          id: `Struktur heading tidak boleh melompat tingkat (misal dari <h${prevLevel}> langsung ke <h${level}>) karena mengaburkan outline dokumen bagi screen reader.`,
          en: `Heading sequence must not skip levels (e.g. from <h${prevLevel}> directly to <h${level}>) as it confuses assistive navigation outlines.`
        },
        suggestedFix: `Gunakan <h${prevLevel + 1}> sebelum <h${level}>`
      });
    }
    prevLevel = level;
  });

  // 7. Check for dates in text spans instead of <time>
  const spans = Array.from(doc.body.querySelectorAll('span, p'));
  spans.forEach((span, idx) => {
    const text = span.textContent || '';
    const classStr = (span.getAttribute('class') || '').toLowerCase();
    if (classStr.includes('date') || classStr.includes('time') || classStr.includes('published')) {
      if (span.tagName.toLowerCase() !== 'time') {
        issues.push({
          id: `date-time-span-${idx}`,
          severity: 'info',
          category: 'seo',
          title: { id: 'Gunakan <time datetime="..."> untuk Tanggal', en: 'Use <time datetime="..."> for Dates' },
          message: {
            id: `Ditemukan tanggal pada <${span.tagName.toLowerCase()} class="${classStr}">. Ubah menjadi <time datetime="YYYY-MM-DD"> agar dapat dipahami oleh Google Search.`,
            en: `Found date string on <${span.tagName.toLowerCase()}>. Convert to <time datetime="YYYY-MM-DD"> for search engine indexing.`
          },
          suggestedFix: `<time datetime="2026-10-02">${text.trim()}</time>`,
          offendingCode: span.outerHTML.slice(0, 100)
        });
      }
    }
  });

  // Calculate score
  const totalElements = allElements.length || 1;
  const semanticRatio = Math.min(1, semanticCount / Math.max(1, divCount + semanticCount));
  
  // Base penalty per severity
  let penalty = 0;
  issues.forEach(issue => {
    if (issue.severity === 'error') penalty += 18;
    else if (issue.severity === 'warning') penalty += 10;
    else penalty += 4;
  });

  // Div soup density penalty
  if (divCount > 5 && semanticCount === 0) {
    penalty += 25;
  }

  const score = Math.max(15, Math.min(100, Math.round(100 - penalty)));
  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'A';
  if (score >= 90) grade = 'A';
  else if (score >= 75) grade = 'B';
  else if (score >= 60) grade = 'C';
  else if (score >= 45) grade = 'D';
  else grade = 'F';

  return {
    score,
    grade,
    issues,
    stats: {
      divCount,
      semanticCount,
      semanticRatio: Math.round(semanticRatio * 100) / 100,
      headingHierarchyOk,
      landmarksCount
    },
    cleanedHtml: refactorToSemanticHtml(trimmed)
  };
}

export function refactorToSemanticHtml(rawHtml: string): string {
  let refactored = rawHtml;

  // Header replacement
  refactored = refactored.replace(/<div\b([^>]*)\b(class|id)=["']([^"']*\b(header|site-header|top-bar)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi, 
    '<header$1$2="$3"$5>$6</header>');

  // Nav replacement
  refactored = refactored.replace(/<div\b([^>]*)\b(class|id)=["']([^"']*\b(nav|navigation|navbar|menu)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi, 
    '<nav aria-label="Navigasi"$1$2="$3"$5>$6</nav>');

  // Main replacement
  refactored = refactored.replace(/<div\b([^>]*)\b(class|id)=["']([^"']*\b(main|content-main|page-content)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi, 
    '<main id="main-content"$1$2="$3"$5>$6</main>');

  // Footer replacement
  refactored = refactored.replace(/<div\b([^>]*)\b(class|id)=["']([^"']*\b(footer|site-footer|bottom)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi, 
    '<footer$1$2="$3"$5>$6</footer>');

  // Aside replacement
  refactored = refactored.replace(/<div\b([^>]*)\b(class|id)=["']([^"']*\b(sidebar|aside)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi, 
    '<aside$1$2="$3"$5>$6</aside>');

  // Article replacement
  refactored = refactored.replace(/<div\b([^>]*)\b(class|id)=["']([^"']*\b(post|article|card-article)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi, 
    '<article$1$2="$3"$5>$6</article>');

  // Button replacement for div with onclick or class="btn"
  refactored = refactored.replace(/<div\b([^>]*)\bclass=["']([^"']*\b(btn|button)\b[^"']*)["']([^>]*)>([\s\S]*?)<\/div>/gi,
    '<button type="button" class="$2"$1$4>$5</button>');

  return refactored;
}

export const sampleDivSoupHtml = `<div class="site-header">
  <div class="logo">MyTech News</div>
  <div class="navigation-menu">
    <a href="#home">Home</a>
    <a href="#articles">Articles</a>
    <a href="#contact">Contact</a>
  </div>
</div>

<div class="page-content">
  <div class="article-post">
    <h1>Masa Depan AI dan Web Standards</h1>
    <span class="publish-date">2 Oktober 2026</span>
    <img src="banner.jpg">
    <p>Penggunaan semantic HTML memberikan pemahaman mendalam bagi crawler AI.</p>
    <div class="btn" onclick="alert('Liked!')">Suka Artikel</div>
  </div>

  <div class="sidebar-wrapper">
    <h3>Artikel Populer</h3>
    <ul>
      <li>CSS Grid Mastery</li>
      <li>WCAG 2.1 Guidelines</li>
    </ul>
  </div>
</div>

<div class="site-footer">
  <p>© 2026 MyTech. Hak Cipta Dilindungi.</p>
</div>`;

export const sampleCleanHtml = `<header class="site-header">
  <h1>MyTech News</h1>
  <nav aria-label="Navigasi Utama">
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#articles">Articles</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main id="main-content">
  <article>
    <header>
      <h2>Masa Depan AI dan Web Standards</h2>
      <p>Dipublikasikan: <time datetime="2026-10-02">2 Oktober 2026</time></p>
    </header>
    <figure>
      <img src="banner.jpg" alt="Visualisasi keterhubungan graph Semantic HTML dan AI">
      <figcaption>Gambar 1: Ekosistem Web Modern</figcaption>
    </figure>
    <p>Penggunaan semantic HTML memberikan pemahaman mendalam bagi crawler AI.</p>
    <button type="button" class="btn-like">Suka Artikel</button>
  </article>

  <aside aria-label="Artikel Populer">
    <h3>Artikel Terkait</h3>
    <ul>
      <li><a href="#">CSS Grid Mastery</a></li>
      <li><a href="#">WCAG 2.1 Guidelines</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>© 2026 MyTech. Hak Cipta Dilindungi.</p>
</footer>`;
