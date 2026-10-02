import { SemanticElement } from '../../types';

export const structureElements: SemanticElement[] = [
  {
    id: 'header',
    tag: '<header>',
    name: { id: 'Header Landmark', en: 'Header Landmark' },
    category: 'structure',
    summary: {
      id: 'Merepresentasikan konten pengantar atau tautan navigasi untuk halaman atau sebuah section.',
      en: 'Represents introductory content or navigational links for a page or section.'
    },
    description: {
      id: 'Elemen <header> biasanya berisi heading (h1-h6), logo, formulir pencarian, atau informasi pembuat. <header> dapat digunakan di tingkat halaman utama maupun di dalam elemen seperti <article> atau <section>.',
      en: 'The <header> element typically contains headings (h1-h6), a logo, search form, or author information. It can be used as the page top header or inside <article> and <section>.'
    },
    whySemantic: {
      id: 'Menyediakan landmark "banner" yang otomatis dikenali oleh screen reader, memudahkan tuna netra langsung melompat ke navigasi utama tanpa mendengar seluruh konten.',
      en: 'Provides the "banner" ARIA landmark recognized by screen readers, allowing visually impaired users to jump directly to primary navigation.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="site-header">
  <div class="logo">My App</div>
  <div class="nav-links">...</div>
</div>`,
      semanticCode: `<header>
  <h1>My App</h1>
  <nav>...</nav>
</header>`,
      benefits: {
        id: ['Dikenali screen reader sebagai landmark banner', 'Meningkatkan pemahaman mesin pencari (SEO)', 'Menghilangkan class-name bloat'],
        en: ['Recognized by screen readers as banner landmark', 'Improves search engine structure comprehension (SEO)', 'Eliminates class name bloat']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Mendukung semua atribut global seperti class, id, role.', en: 'Supports all standard global attributes.' } }
    ],
    exampleCode: `<header class="bg-indigo-900 text-white p-6 rounded-lg flex items-center justify-between">
  <div>
    <h1 class="text-2xl font-bold">TechRadar ID</h1>
    <p class="text-indigo-200 text-sm">Warta Teknologi & Open Source</p>
  </div>
  <nav class="flex gap-4 text-sm font-medium">
    <a href="#" class="hover:text-indigo-300">Artikel</a>
    <a href="#" class="hover:text-indigo-300">Tutorial</a>
    <a href="#" class="hover:text-indigo-300">Tentang</a>
  </nav>
</header>`,
    accessibility: {
      role: 'banner (bila di tingkat body), atau region (bila di dalam sectioning element)',
      screenReaderDescription: {
        id: 'Diumumkan sebagai "Banner landmark" saat pengguna bernavigasi menggunakan shortcut tombol "D" pada NVDA/JAWS.',
        en: 'Announced as "Banner landmark" when navigating via landmark shortcut (D key in NVDA/JAWS).'
      },
      keyboardSupport: 'Tidak memiliki fokus bawaan, namun children di dalamnya (link/button) dapat di-tab.'
    },
    seoImpact: {
      id: 'Googlebot menggunakan <header> untuk mengidentifikasi branding, identitas situs, dan hirarki judul utama (H1).',
      en: 'Search engine crawlers use <header> to identify site branding, main title hierarchy, and primary site identity.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan untuk membungkus logo, judul, dan navigasi utama situs.', 'Boleh gunakan di dalam <article> untuk judul dan metadata artikel.'],
        en: ['Use to wrap site logo, title, and primary navigation.', 'Feel free to use inside <article> for post title and author metadata.']
      },
      donts: {
        id: ['Jangan meletakkan <header> di dalam <footer> atau <address>.', 'Jangan membuat banyak <header> tingkat atas tanpa maksud struktural yang jelas.'],
        en: ['Do not place <header> inside <footer> or <address>.', 'Avoid multiple top-level <header> tags unless scoped to distinct sections.']
      }
    },
    relatedElements: ['<nav>', '<main>', '<article>', '<h1>']
  },
  {
    id: 'nav',
    tag: '<nav>',
    name: { id: 'Navigation Landmark', en: 'Navigation Landmark' },
    category: 'structure',
    summary: {
      id: 'Membungkus blok tautan navigasi penting pada halaman web.',
      en: 'Defines a block of navigational links intended for primary site navigation.'
    },
    description: {
      id: 'Gunakan <nav> khusus untuk kelompok navigasi utama (menu bar, daftar isi artikel, breadcrumbs, atau pagination). Tidak semua kumpulan tautan harus dibungkus <nav>.',
      en: 'Use <nav> for primary navigation groups (main menu, table of contents, breadcrumbs, or pagination). Not all links need <nav>.'
    },
    whySemantic: {
      id: 'Screen reader memungkinkan pengguna langsung melompat ke atau melewati blok navigasi (skip link) dengan membaca landmark navigation.',
      en: 'Screen readers allow users to quickly jump to or bypass navigation blocks using navigation landmark shortcuts.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="navigation-menu">
  <div class="menu-item"><a href="/home">Home</a></div>
  <div class="menu-item"><a href="/docs">Docs</a></div>
</div>`,
      semanticCode: `<nav aria-label="Menu Utama">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/docs">Docs</a></li>
  </ul>
</nav>`,
      benefits: {
        id: ['Diumumkan sebagai Navigation Landmark', 'Dapat diberi label unik via aria-label jika terdapat >1 nav', 'Dapat diakses cepat dengan assistive tech'],
        en: ['Announced as Navigation Landmark', 'Supports aria-label for multiple distinct menus', 'Instantly accessible to assistive technology']
      }
    },
    attributes: [
      { name: 'aria-label', type: 'specific', description: { id: 'Memberikan nama pembeda jika ada lebih dari satu <nav> (cth: "Navigasi Utama", "Breadcrumbs").', en: 'Provides distinct name if multiple <nav> exist on page.' }, example: 'aria-label="Navigasi Utama"' }
    ],
    exampleCode: `<nav aria-label="Navigasi Utama Situs" class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
  <ul class="flex flex-wrap gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
    <li><a href="#beranda" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Beranda</a></li>
    <li><a href="#panduan" class="hover:text-blue-600 dark:hover:text-blue-400">Panduan Semantic</a></li>
    <li><a href="#linter" class="hover:text-blue-600 dark:hover:text-blue-400">Linter a11y</a></li>
    <li><a href="#kontak" class="hover:text-blue-600 dark:hover:text-blue-400">Hubungi Kami</a></li>
  </ul>
</nav>`,
    accessibility: {
      role: 'navigation',
      screenReaderDescription: {
        id: 'Screen reader melafalkan: "Navigation landmark, Menu Utama, daftar dengan 4 item".',
        en: 'Screen reader announces: "Navigation landmark, Main Menu, list with 4 items".'
      }
    },
    seoImpact: {
      id: 'Membantu bot crawler memahami arsitektur internal link dan halaman-halaman prioritas pada website Anda.',
      en: 'Helps search crawlers understand site architecture and crawl priority internal links.'
    },
    bestPractices: {
      dos: {
        id: ['Beri atribut aria-label jika terdapat lebih dari satu <nav> di halaman.', 'Gunakan list (<ul> atau <ol>) di dalamnya untuk struktur yang kokoh.'],
        en: ['Add aria-label if multiple <nav> blocks exist.', 'Use unordered lists (<ul>) inside for robust screen reader item counts.']
      },
      donts: {
        id: ['Jangan bungkus setiap link individual dengan <nav>.', 'Jangan gunakan <nav> untuk kumpulan link sosial media kecil di footer kecuali penting.'],
        en: ['Do not wrap single links in <nav>.', 'Avoid wrapping small utility links in <nav> unless they serve as primary site paths.']
      }
    },
    relatedElements: ['<header>', '<ul>', '<li>', '<a>']
  },
  {
    id: 'main',
    tag: '<main>',
    name: { id: 'Main Landmark', en: 'Main Landmark' },
    category: 'structure',
    summary: {
      id: 'Menampung konten dominan dan unik pada sebuah dokumen web.',
      en: 'Specifies the main unique content of the web document.'
    },
    description: {
      id: 'Konten di dalam <main> harus unik untuk dokumen tersebut dan tidak boleh mengulang konten berulang di banyak halaman seperti header, footer, link navigasi, atau sidebar global.',
      en: 'Content inside <main> must be unique to this document, excluding repeated blocks across pages like top nav, global sidebars, and footers.'
    },
    whySemantic: {
      id: 'Screen reader memiliki fitur "Jump to Main Content" langsung ke <main>, menghemat waktu navigasi pengguna penyandang disabilitas.',
      en: 'Screen readers provide direct "Jump to Main Content" keys to <main>, bypassing repetitive headers instantly.'
    },
    divSoupComparison: {
      divSoupCode: `<div id="content" class="wrapper-main">
  <h1>Artikel</h1>
</div>`,
      semanticCode: `<main id="main-content">
  <h1>Artikel</h1>
</main>`,
      benefits: {
        id: ['Menghilangkan kebutuhan workaround skip-links rumit', 'Standar W3C nomor 1 untuk landmark konten inti'],
        en: ['Eliminates hacky skip-link workarounds', 'W3C standard landmark for core document body']
      }
    },
    attributes: [
      { name: 'id', type: 'global', description: { id: 'Sering dipasangkan dengan id="main-content" untuk target skip-link.', en: 'Commonly paired with id="main-content" as skip-link target.' } }
    ],
    exampleCode: `<main id="main-content" class="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
  <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Pengenalan Semantic HTML</h1>
  <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
    Semantic HTML adalah fondasi web modern yang memberikan makna struktural bagi manusia, mesin pencari, dan teknologi asistif.
  </p>
  <div class="p-4 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-900 text-sm">
    Hanya boleh ada 1 elemen &lt;main&gt; yang terlihat per halaman.
  </div>
</main>`,
    accessibility: {
      role: 'main',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan "Main landmark", memungkinkan pengguna langsung membaca isi esensial halaman.',
        en: 'Announced as "Main landmark", enabling users to bypass global navigation and dive into the page topic.'
      }
    },
    seoImpact: {
      id: 'Search engines memprioritaskan kata kunci dan konten yang berada di dalam <main> dibandingkan konten boilerplate.',
      en: 'Search engines assign highest weight to textual content found inside <main> vs repeated boilerplate.'
    },
    bestPractices: {
      dos: {
        id: ['Pastikan hanya ada satu elemen <main> tanpa atribut hidden di dalam satu halaman.', 'Gunakan <main id="main-content"> sebagai target tombol Skip to Content.'],
        en: ['Ensure only one visible <main> exists per page.', 'Target <main> via a "Skip to Content" anchor at page top.']
      },
      donts: {
        id: ['Jangan meletakkan <main> di dalam <header>, <footer>, <article>, <aside>, atau <nav>.', 'Jangan taruh copyright atau navigasi global di dalam <main>.'],
        en: ['Do not nest <main> inside <header>, <footer>, <article>, or <nav>.', 'Do not place global footer copyright inside <main>.']
      }
    },
    relatedElements: ['<header>', '<footer>', '<article>', '<section>']
  },
  {
    id: 'article',
    tag: '<article>',
    name: { id: 'Self-Contained Article', en: 'Self-Contained Article' },
    category: 'structure',
    summary: {
      id: 'Komposisi mandiri yang dapat didistribusikan atau digunakan kembali secara independen (sindikasi RSS).',
      en: 'A self-contained composition independently distributable or reusable (e.g. syndication).'
    },
    description: {
      id: 'Gunakan <article> untuk konten yang tetap masuk akal bila dipisahkan dari sisa halaman: postingan blog, kartu produk, thread forum, komentar pengguna, atau kartu berita.',
      en: 'Use <article> for pieces of content that make sense in isolation: blog posts, product cards, forum threads, comments, or news items.'
    },
    whySemantic: {
      id: 'Mendukung browser "Reader Mode" (Safari, Firefox, Edge) untuk mengekstrak artikel bersih tanpa iklan. Memungkinkan sindikasi feed RSS otomatis.',
      en: 'Powers browser "Reader Mode" (Safari, Firefox) to extract distraction-free reading, and enables automated syndication.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="post-card">
  <div class="post-title">CSS Grid vs Flexbox</div>
  <div class="post-body">...</div>
</div>`,
      semanticCode: `<article>
  <h2>CSS Grid vs Flexbox</h2>
  <p>...</p>
</article>`,
      benefits: {
        id: ['Otomatis dikenali Reader Mode browser', 'Screen reader mengumumkan jumlah artikel mandiri dalam halaman'],
        en: ['Enables reader-mode parsing in browsers', 'Screen readers announce total independent articles']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut standar HTML5.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<article class="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
  <header class="mb-3">
    <h2 class="text-xl font-bold text-slate-900 dark:text-white">Menulis HTML yang Ramah Screen Reader</h2>
    <div class="text-xs text-slate-500 mt-1 flex gap-2">
      <span>Oleh Siti Nurhaliza</span>
      <span>•</span>
      <time datetime="2026-03-15">15 Maret 2026</time>
    </div>
  </header>
  <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
    Dengan memilih elemen yang tepat seperti &lt;button&gt; dan bukannya &lt;div&gt;, kita membuka aksesibilitas bagi jutaan orang.
  </p>
  <footer class="text-xs text-blue-600 dark:text-blue-400 font-semibold">
    <a href="#" class="hover:underline">Baca Selengkapnya →</a>
  </footer>
</article>`,
    accessibility: {
      role: 'article',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan "Article", memberikan konteks bahwa konten ini adalah satu kesatuan utuh.',
        en: 'Announced as "Article", conveying that this is a complete, self-contained unit of information.'
      }
    },
    seoImpact: {
      id: 'Sangat vital untuk Google Article Schema dan cuplikan featured snippets berita/artikel.',
      en: 'Critical for Google Article rich snippets and news card indexing.'
    },
    bestPractices: {
      dos: {
        id: ['Sertakan heading (h2-h6) di dalam setiap <article> untuk hierarki yang jelas.', 'Boleh menyarangkan <article> di dalam <article> (contoh: komentar blog di dalam postingan blog).'],
        en: ['Include a heading (h2-h6) inside every <article>.', 'Nest <article> inside <article> for comments on a blog post.']
      },
      donts: {
        id: ['Jangan gunakan <article> hanya sebagai styling wrapper jika kontennya bukan unit mandiri.', 'Jangan lupa tanggal publikasi menggunakan tag <time>.'],
        en: ['Do not use <article> as a generic decorative card wrapper.', 'Do not omit <time> for publishing metadata.']
      }
    },
    relatedElements: ['<section>', '<header>', '<footer>', '<time>']
  },
  {
    id: 'section',
    tag: '<section>',
    name: { id: 'Generic Semantic Section', en: 'Generic Semantic Section' },
    category: 'structure',
    summary: {
      id: 'Bagian tematik mandiri dari sebuah dokumen yang biasanya diawali dengan judul topik (heading).',
      en: 'A standalone thematic section of a document, typically leading with a heading.'
    },
    description: {
      id: '<section> mengelompokkan konten yang memiliki tema sama dalam sebuah halaman, misalnya: "Bagian Fitur", "Bagian Testimoni", atau "Bab 1". Jika hanya butuh wadah untuk CSS styling, gunakan <div>.',
      en: '<section> groups thematic content sharing a common topic (e.g. Features, Testimonials, Chapter 2). If you only need a container for styling, use <div>.'
    },
    whySemantic: {
      id: 'Membentuk dokumen outline HTML5 yang jelas dan dapat diberi aria-labelledby untuk menjadi region landmark mandiri.',
      en: 'Constructs a clear document outline and converts to an accessible region landmark when paired with an accessible name.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="features-wrapper">
  <h2>Fitur Unggulan</h2>
  <div>...</div>
</div>`,
      semanticCode: `<section aria-labelledby="features-title">
  <h2 id="features-title">Fitur Unggulan</h2>
  <div>...</div>
</section>`,
      benefits: {
        id: ['Dapat diubah menjadi region landmark berlabel', 'Membuat outline dokumen terstruktur rapi'],
        en: ['Elevates to a labeled region landmark with aria-labelledby', 'Produces a clean, hierarchical document outline']
      }
    },
    attributes: [
      { name: 'aria-labelledby', type: 'specific', description: { id: 'Mengaitkan section dengan id judul di dalamnya agar menjadi landmark bernama.', en: 'Associates section with heading id to create a labeled region landmark.' } }
    ],
    exampleCode: `<section aria-labelledby="sec-features" class="py-6 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
  <h2 id="sec-features" class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Mengapa Semantic HTML?</h2>
  <p class="text-sm text-slate-600 dark:text-slate-300">
    Semantic HTML mempermudah pemeliharaan kode tim, meningkatkan skor a11y, dan memaksimalkan peringkat SEO organik.
  </p>
</section>`,
    accessibility: {
      role: 'region (hanya bila memiliki atribut aria-labelledby atau aria-label)',
      screenReaderDescription: {
        id: 'Jika diberi aria-labelledby, screen reader melafalkan: "Region: Mengapa Semantic HTML".',
        en: 'When labeled with aria-labelledby, announced as "Region: Why Semantic HTML".'
      }
    },
    seoImpact: {
      id: 'Membantu Googlebot memetakan topik per bagian dalam artikel panjang untuk fitur "Jump to section" di hasil pencarian.',
      en: 'Helps search engines understand thematic sub-topics, powering in-depth "Jump to section" search results.'
    },
    bestPractices: {
      dos: {
        id: ['Selalu sertakan heading (h2-h6) di dalam section.', 'Gunakan aria-labelledby jika section tersebut penting untuk dicantumkan di daftar region.'],
        en: ['Always include a heading inside the section.', 'Pair with aria-labelledby if the section warrants region status.']
      },
      donts: {
        id: ['Jangan gunakan <section> hanya untuk wrapper grid atau flexbox tanpa nilai tematik.', 'Jangan gunakan jika <article>, <aside>, atau <nav> lebih tepat.'],
        en: ['Do not use <section> strictly as a CSS layout flex/grid wrapper.', 'Do not use when <article>, <aside>, or <nav> is more descriptive.']
      }
    },
    relatedElements: ['<article>', '<aside>', '<main>', '<h2>']
  },
  {
    id: 'aside',
    tag: '<aside>',
    name: { id: 'Complementary Sidebar / Aside', en: 'Complementary Sidebar / Aside' },
    category: 'structure',
    summary: {
      id: 'Menampung konten tambahan yang berhubungan secara tidak langsung dengan konten utama di sekitarnya.',
      en: 'Houses complementary content indirectly related to the surrounding main content.'
    },
    description: {
      id: '<aside> cocok untuk sidebar website, callout box, glosarium istilah, kutipan pull-quote, atau daftar artikel terkait.',
      en: '<aside> is ideal for sidebars, callout alert boxes, glossaries, related articles lists, or advertising blocks.'
    },
    whySemantic: {
      id: 'Memberikan landmark "complementary". Screen reader dapat melewati bagian ini jika pengguna hanya ingin membaca artikel inti.',
      en: 'Provides the "complementary" ARIA landmark so assistive users can bypass or inspect secondary content at will.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="sidebar-info">
  <h3>Catatan Penulis</h3>
  <p>...</p>
</div>`,
      semanticCode: `<aside aria-label="Catatan Tambahan">
  <h3>Catatan Penulis</h3>
  <p>...</p>
</aside>`,
      benefits: {
        id: ['Landmark complementary otomatis', 'Memisahkan alur baca konten utama dari catatan sampingan'],
        en: ['Automatic complementary landmark', 'Prevents secondary tangents from polluting main reading flow']
      }
    },
    attributes: [
      { name: 'aria-label', type: 'specific', description: { id: 'Beri label jelas untuk membedakan beberapa aside pada halaman yang sama.', en: 'Labels aside to differentiate multiple sidebars/callouts.' } }
    ],
    exampleCode: `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="md:col-span-2 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
    <h2 class="text-xl font-bold mb-2">Panduan Accessibility</h2>
    <p class="text-sm text-slate-600 dark:text-slate-300">Konten inti artikel membahas pentingnya kontras warna...</p>
  </div>
  <aside aria-label="Tips Singkat a11y" class="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-lg">
    <h3 class="text-sm font-bold text-amber-900 dark:text-amber-300 mb-1">💡 Tips Kilat</h3>
    <p class="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
      Gunakan rasio kontras minimal 4.5:1 untuk teks normal sesuai pedoman WCAG 2.1 AA.
    </p>
  </aside>
</div>`,
    accessibility: {
      role: 'complementary',
      screenReaderDescription: {
        id: 'Screen reader membunyikan: "Complementary landmark, Tips Singkat a11y".',
        en: 'Announced as "Complementary landmark", designating secondary advisory material.'
      }
    },
    seoImpact: {
      id: 'Search engines memahami bahwa teks di dalam aside adalah pelengkap dan tidak menurunkan relevansi fokus artikel utama.',
      en: 'Informs search algorithms that content is supplementary, preserving primary keyword density.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan untuk sidebar blog, box info menarik, atau tautan artikel terkait.', 'Beri label jika diletakkan di luar <main> sebagai sidebar global.'],
        en: ['Use for sidebars, tip boxes, or related reading blocks.', 'Label properly if acting as a global layout sidebar.']
      },
      donts: {
        id: ['Jangan gunakan aside untuk konten penting yang wajib dibaca sebagai bagian alur artikel utama.'],
        en: ['Do not place vital prerequisite reading inside an aside.']
      }
    },
    relatedElements: ['<article>', '<main>', '<section>']
  },
  {
    id: 'footer',
    tag: '<footer>',
    name: { id: 'Footer Landmark', en: 'Footer Landmark' },
    category: 'structure',
    summary: {
      id: 'Menampung informasi penutup, hak cipta, informasi kontak, atau navigasi sekunder.',
      en: 'Contains closing information, copyright, contact details, or secondary site links.'
    },
    description: {
      id: 'Bisa digunakan untuk footer halaman penuh (di tingkat body) ataupun penutup artikel (di dalam article) yang berisi bio penulis dan tombol share.',
      en: 'Can be used as page footer (body level) or section footer (inside article) containing author bio and tags.'
    },
    whySemantic: {
      id: 'Membuat landmark "contentinfo" di tingkat root, memudahkan pengguna assistive tech langsung menuju copyright atau link kebijakan privasi.',
      en: 'Creates a "contentinfo" ARIA landmark at page root, letting users jump straight to legal policies and contact info.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="bottom-footer">
  <div class="copyright">© 2026 Semantika</div>
</div>`,
      semanticCode: `<footer>
  <p>© 2026 Semantika. Hak Cipta Dilindungi.</p>
</footer>`,
      benefits: {
        id: ['Contentinfo landmark standar', 'Standar semantik bersih tanpa class redundan'],
        en: ['Standard contentinfo landmark', 'Clean standard syntax without redundant wrapper classes']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global HTML5.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<footer class="bg-slate-900 text-slate-400 p-6 rounded-lg text-sm flex flex-col md:flex-row items-center justify-between gap-4">
  <p>© 2026 Semantika. Edukasi Web Standards Terbuka.</p>
  <div class="flex gap-6">
    <a href="#" class="hover:text-white transition-colors">Kebijakan Privasi</a>
    <a href="#" class="hover:text-white transition-colors">Ketentuan Layanan</a>
    <a href="#" class="hover:text-white transition-colors">GitHub</a>
  </div>
</footer>`,
    accessibility: {
      role: 'contentinfo (jika di tingkat body)',
      screenReaderDescription: {
        id: 'Screen reader melafalkan: "Contentinfo landmark", memberi tahu pengguna bahwa ini adalah penutup dokumen.',
        en: 'Announced as "Contentinfo landmark", signaling the document conclusion.'
      }
    },
    seoImpact: {
      id: 'Membantu search engine menemukan tautan legal, sitemap, dan verifikasi kepemilikan hak cipta.',
      en: 'Aids crawlers in discovering copyright ownership, terms, and supplemental footer sitemaps.'
    },
    bestPractices: {
      dos: {
        id: ['Sertakan informasi hak cipta, tautan kebijakan, dan kontak situs.', 'Boleh gabungkan dengan elemen <address> untuk info kontak.'],
        en: ['Include copyright, terms of service, and contact details.', 'Pair with <address> for author or business contact coordinates.']
      },
      donts: {
        id: ['Jangan gunakan footer untuk menyembunyikan kata kunci spam (keyword stuffing).'],
        en: ['Do not use footer for hidden keyword stuffing.']
      }
    },
    relatedElements: ['<header>', '<address>', '<nav>']
  },
  {
    id: 'address',
    tag: '<address>',
    name: { id: 'Author Contact Information', en: 'Author Contact Information' },
    category: 'structure',
    summary: {
      id: 'Menyediakan informasi kontak untuk penulis atau pemilik dokumen/artikel.',
      en: 'Provides contact information for the author or owner of the document or article.'
    },
    description: {
      id: 'Hanya boleh digunakan untuk informasi kontak (email, nomor telepon, alamat fisik, profil media sosial) dari pemilik konten terkait.',
      en: 'Should only be used for actual contact information (email, phone, physical address, social handles) of the article or site creator.'
    },
    whySemantic: {
      id: 'Browser dan bot mengenali teks ini sebagai entitas kontak bisnis/penulis resmi (Rich Snippet Google Knowledge Graph).',
      en: 'Browsers and bots recognize this text as contact coordinates, aiding Google Knowledge Graph mapping.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="author-contact">
  Hubungi: info@semantika.id | Jakarta
</div>`,
      semanticCode: `<address>
  Ditulis oleh <a href="mailto:info@semantika.id">Siti Nur</a>.<br>
  Jakarta, Indonesia.
</address>`,
      benefits: {
        id: ['Format semantik resmi untuk metadata kontak', 'Dipahami secara khusus oleh bot crawler mesin pencari'],
        en: ['Official semantic container for contact metadata', 'Interpreted as author entity by modern search engines']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<address class="not-italic text-sm text-slate-600 dark:text-slate-300 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
  <span class="font-semibold block text-slate-800 dark:text-white">Studio Semantika Nusantara</span>
  Jalan Jenderal Sudirman No. 45<br>
  Jakarta Selatan, DKI Jakarta 12190<br>
  Email: <a href="mailto:halo@semantika.id" class="text-blue-600 dark:text-blue-400 hover:underline">halo@semantika.id</a>
</address>`,
    accessibility: {
      role: 'group / address semantic mapping',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan informasi kontak pemilik halaman.',
        en: 'Screen reader interprets content as contact information for the author/site.'
      }
    },
    seoImpact: {
      id: 'Membantu Google Local SEO dan verifikasi entitas bisnis Schema.org.',
      en: 'Helps Google Local SEO and Schema.org Organization/Person verification.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan class "not-italic" di CSS jika Anda tidak ingin teks otomatis berformat miring default browser.'],
        en: ['Add font-style: normal (or not-italic in Tailwind) to override default browser italics if desired.']
      },
      donts: {
        id: ['Jangan gunakan <address> untuk alamat pos umum yang bukan kontak penulis artikel tersebut.'],
        en: ['Do not use <address> for arbitrary postal addresses mentioned casually in a story.']
      }
    },
    relatedElements: ['<footer>', '<a>', '<time>']
  }
];
