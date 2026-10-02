import { SemanticElement } from '../../types';

export const mediaElements: SemanticElement[] = [
  {
    id: 'figure',
    tag: '<figure>',
    name: { id: 'Self-Contained Media Figure', en: 'Self-Contained Media Figure' },
    category: 'media',
    summary: {
      id: 'Menampung konten media mandiri (gambar, diagram, cuplikan kode, atau kutipan) yang dirujuk dari teks utama.',
      en: 'Encapsulates self-contained media (images, diagrams, code snippets, or charts) referenced from the main flow.'
    },
    description: {
      id: '<figure> bertindak sebagai satu kesatuan visual yang bisa dipindahkan posisinya tanpa mengubah arti naskah artikel. Biasanya dipasangkan dengan caption keterangan melalui tag <figcaption>.',
      en: '<figure> represents an isolated unit that could be moved around without affecting article flow. Typically paired with a descriptive caption via <figcaption>.'
    },
    whySemantic: {
      id: 'Mengikat gambar dengan teks keterangannya secara semantik sehingga screen reader mengumumkan caption sebagai keterangan resmi gambar.',
      en: 'Semantically links image and caption so screen readers identify the caption as the official accessible description.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="image-wrapper">
  <img src="diagram.png" alt="Diagram">
  <div class="caption">Gambar 1: Alur Kerja</div>
</div>`,
      semanticCode: `<figure>
  <img src="diagram.png" alt="Diagram alur kerja dari input ke verifikasi">
  <figcaption>Gambar 1: Alur Kerja Sistem</figcaption>
</figure>`,
      benefits: {
        id: ['Screen reader mengasosiasikan figcaption sebagai accessible description', 'Meningkatkan pemahaman gambar oleh Google Image Search', 'Standar W3C untuk grafik akademis dan editorial'],
        en: ['Screen reader binds figcaption as accessible description', 'Boosts Google Image Search indexing and caption accuracy', 'W3C standard for editorial figures and diagrams']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global standar.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<figure class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-center max-w-md mx-auto">
  <div class="h-40 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-mono text-sm shadow-inner">
    [ Ilustrasi: Visualisasi DOM Tree Semantic ]
  </div>
  <figcaption class="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
    Gambar 1.1: Pemetaan hierarki node HTML5 dari &lt;header&gt; hingga &lt;footer&gt;.
  </figcaption>
</figure>`,
    accessibility: {
      role: 'figure',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan "Figure: Gambar 1.1: Pemetaan hierarki node...", menghubungkan gambar dengan keterangannya.',
        en: 'Announced as "Figure: Figure 1.1...", associating the visual media directly with its caption.'
      }
    },
    seoImpact: {
      id: 'Google Image Search memprioritaskan teks di dalam <figcaption> untuk memberi peringkat gambar pada hasil pencarian visual.',
      en: 'Google Image Search heavily weights <figcaption> text when ranking visual search results.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan <figcaption> sebagai anak pertama atau anak terakhir dari <figure>.', 'Selalu sertakan atribut alt pada <img> di dalam figure.'],
        en: ['Place <figcaption> as either the very first or very last child of <figure>.', 'Always retain a descriptive alt attribute on <img>.']
      },
      donts: {
        id: ['Jangan gunakan lebih dari satu <figcaption> di dalam satu <figure>.'],
        en: ['Do not include multiple <figcaption> elements inside a single <figure>.']
      }
    },
    relatedElements: ['<figcaption>', '<picture>', '<img>']
  },
  {
    id: 'figcaption',
    tag: '<figcaption>',
    name: { id: 'Figure Caption', en: 'Figure Caption' },
    category: 'media',
    summary: {
      id: 'Menyediakan teks keterangan atau judul untuk elemen pembungkus <figure>.',
      en: 'Provides a descriptive caption or legend for its parent <figure>.'
    },
    description: {
      id: 'Harus menjadi anak langsung pertama atau terakhir dari <figure>. Menjadi nama aksesibel (accessible name) untuk seluruh figure tersebut.',
      en: 'Must be the direct first or last child of a <figure>, serving as the figure’s accessible label.'
    },
    whySemantic: {
      id: 'Otomatis dihitung sebagai deskripsi ARIA tanpa perlu menuliskan aria-describedby secara manual.',
      en: 'Automatically serves as the accessible description without requiring manual aria-describedby plumbing.'
    },
    divSoupComparison: {
      divSoupCode: `<p class="image-subtext">Keterangan foto</p>`,
      semanticCode: `<figcaption>Keterangan resmi foto</figcaption>`,
      benefits: {
        id: ['Hubungan semantik terikat otomatis dengan parent <figure>', 'Dibaca serentak oleh pembaca layar'],
        en: ['Semantic binding directly tied to parent <figure>', 'Read seamlessly by assistive screen readers']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<figure class="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
  <div class="p-8 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold rounded text-sm">
    Grafik Peningkatan Aksesibilitas Web 2026
  </div>
  <figcaption class="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
    Sumber data: W3C Global Accessibility Report 2026.
  </figcaption>
</figure>`,
    accessibility: {
      role: 'caption',
      screenReaderDescription: {
        id: 'Screen reader membaca figcaption sebagai keterangan dari figure yang sedang diinspeksi.',
        en: 'Screen reader enunciates the text as the caption of the inspected figure.'
      }
    },
    seoImpact: {
      id: 'Memberikan konteks semantik kontekstual tertinggi untuk gambar di sekitarnya.',
      en: 'Provides direct semantic relevance scoring for adjacent media assets.'
    },
    bestPractices: {
      dos: {
        id: ['Beri keterangan yang melengkapi atribut alt, bukan hanya mengulang alt kata per kata.'],
        en: ['Provide caption text that supplements alt text rather than repeating it verbatim.']
      },
      donts: {
        id: ['Jangan meletakkan <figcaption> di luar elemen <figure>.'],
        en: ['Do not place <figcaption> outside of a <figure> element.']
      }
    },
    relatedElements: ['<figure>', '<img>']
  },
  {
    id: 'picture',
    tag: '<picture>',
    name: { id: 'Responsive Image Container', en: 'Responsive Image Container' },
    category: 'media',
    summary: {
      id: 'Menampung satu atau lebih elemen <source> dan satu elemen <img> untuk rendering gambar adaptif (art direction & next-gen formats).',
      en: 'Wraps multiple <source> elements and one <img> to provide responsive art direction and next-gen format fallbacks.'
    },
    description: {
      id: 'Gunakan <picture> ketika Anda ingin menyajikan format modern seperti AVIF/WebP dengan fallback JPEG, atau gambar rasio vertikal di layar ponsel dan rasio panorama di layar desktop (art direction).',
      en: 'Use <picture> to serve next-gen formats (AVIF, WebP) with JPG fallbacks, or serve cropped mobile vs landscape desktop visuals.'
    },
    whySemantic: {
      id: 'Browser hanya mengunduh 1 file gambar yang paling optimal sesuai resolusi dan kapabilitas format, menghemat bandwidth data seluler pengguna.',
      en: 'Browsers only download the single most optimal asset matching viewport and format support, drastically saving mobile bandwidth.'
    },
    divSoupComparison: {
      divSoupCode: `<img src="desktop-hero.jpg" class="desktop-only">
<img src="mobile-hero.jpg" class="mobile-only">`,
      semanticCode: `<picture>
  <source media="(min-width: 768px)" srcset="hero-desktop.avif" type="image/avif">
  <source srcset="hero-mobile.webp" type="image/webp">
  <img src="hero-fallback.jpg" alt="Pemandangan lanskap alam Indonesia">
</picture>`,
      benefits: {
        id: ['Browser tidak mendownload kedua gambar sekaligus (menghemat kuota)', 'Dukungan format mutakhir AVIF/WebP otomatis', 'Lolos audit Google PageSpeed Core Web Vitals'],
        en: ['Browser avoids downloading duplicate images (saves data)', 'Automatic modern AVIF/WebP negotiation', 'Passes Google Core Web Vitals audit']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<picture class="block rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
  <!-- Simulasi Art Direction -->
  <source media="(min-width: 640px)" srcset="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='300' style='background:%232563eb'><text x='50%' y='50%' fill='white' font-size='24' font-family='sans-serif' text-anchor='middle'>Gambar Tampilan Desktop (800x300)</text></svg>">
  <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' style='background:%230284c7'><text x='50%' y='50%' fill='white' font-size='18' font-family='sans-serif' text-anchor='middle'>Gambar Ponsel (400x300)</text></svg>" 
       alt="Pratinjau responsif adaptif elemen picture" class="w-full h-auto block">
</picture>`,
    accessibility: {
      role: 'image',
      screenReaderDescription: {
        id: 'Aksesibilitas dikendalikan oleh tag <img> di dalamnya yang wajib memiliki atribut alt bermakna.',
        en: 'Accessibility is governed by the nested <img> tag which must have a meaningful alt attribute.'
      }
    },
    seoImpact: {
      id: 'Sangat vital untuk skor PageSpeed LCP (Largest Contentful Paint) dan SEO Mobile-First.',
      en: 'Crucial for PageSpeed LCP (Largest Contentful Paint) metrics and Mobile-First SEO indexing.'
    },
    bestPractices: {
      dos: {
        id: ['Wajib menyertakan satu elemen <img> sebagai anak terakhir sebagai fallback browser lama dan penyedia alt text.'],
        en: ['Always include an <img> element as the final fallback child providing alt text.']
      },
      donts: {
        id: ['Jangan meletakkan atribut alt pada tag <picture> itu sendiri (alt diletakkan pada <img>).'],
        en: ['Do not place alt attributes on the <picture> container itself.']
      }
    },
    relatedElements: ['<source>', '<img>', '<figure>']
  },
  {
    id: 'audio',
    tag: '<audio>',
    name: { id: 'Native Audio Player', en: 'Native Audio Player' },
    category: 'media',
    summary: {
      id: 'Menyematkan konten suara/audio secara native di browser tanpa plugin eksternal.',
      en: 'Embeds sound content natively in browser without third-party plugins.'
    },
    description: {
      id: '<audio> mendukung atribut controls untuk memunculkan pemutar suara native browser (play, pause, volume, timeline) serta dapat dipasangkan dengan <track> untuk transkrip lirik.',
      en: '<audio> supports the controls attribute for native playback UI (play, pause, volume, seekbar) and pairs with <track> for transcripts.'
    },
    whySemantic: {
      id: 'Kontrol audio native sepenuhnya dapat dioperasikan menggunakan keyboard (Space untuk play/pause, Panah untuk volume) dan terbaca oleh screen reader.',
      en: 'Native audio controls are completely keyboard operable (Space/Arrow keys) and announced to screen readers out of the box.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="audio-btn" onclick="playMusic()">▶ Putar Lagu</div>`,
      semanticCode: `<audio controls src="audio.mp3">
  Browser Anda tidak mendukung elemen audio.
</audio>`,
      benefits: {
        id: ['Aksesibilitas keyboard bawaan tanpa kode JS tambahan', 'Dukungan hardware media keys di laptop dan smartphone'],
        en: ['Built-in keyboard accessibility without custom JS', 'Supports hardware media keys on OS and mobile']
      }
    },
    attributes: [
      { name: 'controls', type: 'specific', description: { id: 'Menampilkan tombol play, pause, volume, dan progress bar bawaan browser.', en: 'Displays browser native player controls.' }, example: 'controls' },
      { name: 'preload', type: 'specific', description: { id: 'Menentukan apakah file audio dimuat awal (none, metadata, auto).', en: 'Specifies preload behavior (none, metadata, auto).' }, example: 'preload="metadata"' }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
  <p class="text-sm font-semibold mb-2 text-slate-800 dark:text-slate-100">Podcast: Filosofi Aksesibilitas Web</p>
  <audio controls class="w-full">
    <!-- Menggunakan sample audio stream data -->
    <source src="https://actions.google.com/sounds/v1/water/rain_heavy.ogg" type="audio/ogg">
    Browser Anda tidak mendukung pemutar audio native.
  </audio>
  <p class="text-xs text-slate-500 mt-2">Dapat dikontrol dengan keyboard (Tombol Spasi untuk putar/jeda).</p>
</div>`,
    accessibility: {
      role: 'audio player',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan status pemutar audio, durasi saat ini, dan tombol kontrol.',
        en: 'Screen reader reads playback state, track duration, and timeline position.'
      }
    },
    seoImpact: {
      id: 'Dapat diintegrasikan dengan Google Podcast & Audio Schema markup.',
      en: 'Qualifies for Google Audio & Podcast rich snippet schema metadata.'
    },
    bestPractices: {
      dos: {
        id: ['Selalu sertakan atribut controls kecuali Anda membangun kustom player yang teruji a11y-nya.', 'Sediakan transkrip teks tertulis bagi tunarungu.'],
        en: ['Always include controls attribute.', 'Provide a text transcript for deaf and hard-of-hearing users.']
      },
      donts: {
        id: ['Jangan pernah menggunakan autoplay tanpa interaksi eksplisit pengguna (melanggar WCAG 1.4.2).'],
        en: ['Never enable autoplay audio without explicit user intent (violates WCAG 1.4.2).']
      }
    },
    relatedElements: ['<video>', '<track>', '<source>']
  },
  {
    id: 'video',
    tag: '<video>',
    name: { id: 'Native Video Player', en: 'Native Video Player' },
    category: 'media',
    summary: {
      id: 'Menyematkan pemutar video native dengan dukungan subtitle dan multi-resolusi.',
      en: 'Embeds native video player with subtitle, caption, and multi-format support.'
    },
    description: {
      id: 'Elemen <video> mendukung atribut poster (thumbnail gambar awal), controls, autoplay terbisukan (muted), dan teks subtitle terjemahan melalui tag <track>.',
      en: 'The <video> element supports poster thumbnails, controls, muted autoplay, and timed text tracks via <track>.'
    },
    whySemantic: {
      id: 'Menyediakan kontrol bawaan browser yang memenuhi standar aksesibilitas keyboard dan subtitle tertutup (closed captioning).',
      en: 'Provides native accessible playback controls and closed-captioning track capabilities.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="fake-video-wrapper">...</div>`,
      semanticCode: `<video controls poster="cover.jpg">
  <source src="movie.mp4" type="video/mp4">
  <track src="subs-id.vtt" kind="subtitles" srclang="id" label="Indonesia">
</video>`,
      benefits: {
        id: ['Dukungan subtitle VTT bawaan untuk tunarungu', 'Picture-in-Picture native browser otomatis'],
        en: ['Built-in WebVTT subtitle track rendering', 'Automatic native Picture-in-Picture window support']
      }
    },
    attributes: [
      { name: 'poster', type: 'specific', description: { id: 'URL gambar thumbnail sebelum video diputar.', en: 'URL of image displayed while video is downloading or unplayed.' }, example: 'poster="thumb.jpg"' },
      { name: 'controls', type: 'specific', description: { id: 'Menampilkan kontrol pemutaran video.', en: 'Shows native browser controls.' } }
    ],
    exampleCode: `<div class="max-w-md mx-auto bg-slate-900 p-3 rounded-xl border border-slate-800">
  <video controls class="w-full rounded-lg" poster="https://placehold.co/600x340/1e293b/ffffff?text=Video+Tutorial">
    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
    <track kind="captions" label="English" srclang="en">
    Browser Anda tidak mendukung video HTML5.
  </video>
  <p class="text-xs text-slate-400 mt-2 text-center">Video HTML5 native dengan dukungan Picture-in-Picture.</p>
</div>`,
    accessibility: {
      role: 'video player',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan durasi video dan kontrol timeline.',
        en: 'Screen reader reports video duration and playback state.'
      }
    },
    seoImpact: {
      id: 'Memungkinkan Google Video Indexing untuk menampilkan cuplikan video di tab Google Video.',
      en: 'Enables Google Video Indexing schema to surface key moments in search.'
    },
    bestPractices: {
      dos: {
        id: ['Wajib sertakan <track kind="captions"> untuk teks terjemahan/closed captions (WCAG 1.2.2).', 'Gunakan poster image yang menarik dan relevan.'],
        en: ['Always include <track kind="captions"> for accessibility compliance (WCAG 1.2.2).', 'Include a relevant poster thumbnail image.']
      },
      donts: {
        id: ['Jangan gunakan autoplay bersuara karena mengganggu pembaca layar dan pengguna umum.'],
        en: ['Do not use audio autoplay without mute.']
      }
    },
    relatedElements: ['<track>', '<source>', '<audio>']
  },
  {
    id: 'track',
    tag: '<track>',
    name: { id: 'Timed Text Track (Captions & Subtitles)', en: 'Timed Text Track (Captions & Subtitles)' },
    category: 'media',
    summary: {
      id: 'Menyediakan teks terikat waktu (subtitle, closed captions, deskripsi audio, atau bab) untuk <video> dan <audio>.',
      en: 'Provides timed text tracks (subtitles, closed captions, audio descriptions, or chapters) for video/audio.'
    },
    description: {
      id: 'Elemen <track> merujuk ke file format WebVTT (.vtt) yang memuat teks dan stempel waktu (timestamp). Teks subtitle ini otomatis disinkronkan browser saat media diputar.',
      en: 'The <track> element points to a WebVTT (.vtt) file containing timed cues, synchronized automatically by the browser.'
    },
    whySemantic: {
      id: 'Merupakan syarat mutlak aksesibilitas WCAG Level A & AA bagi penyandang disabilitas pendengaran untuk memahami percakapan video.',
      en: 'Mandatory WCAG Level A & AA compliance requirement for deaf and hard-of-hearing users to comprehend speech.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="manual-subtitles">Halo dunia</div>`,
      semanticCode: `<track kind="subtitles" src="subtitles.vtt" srclang="id" label="Bahasa Indonesia" default>`,
      benefits: {
        id: ['Pengguna bisa memilih bahasa subtitle di kontrol native video', 'Dapat diaktifkan/dinonaktifkan sesuai kebutuhan pengguna'],
        en: ['Users can toggle subtitle languages in native video controls', 'Toggable on and off according to viewer preference']
      }
    },
    attributes: [
      { name: 'kind', type: 'specific', description: { id: 'Jenis teks: subtitles, captions, descriptions, chapters, atau metadata.', en: 'Track type: subtitles, captions, descriptions, chapters, or metadata.' }, example: 'kind="subtitles"', required: true },
      { name: 'srclang', type: 'specific', description: { id: 'Kode bahasa (cth: "id", "en", "ja").', en: 'Language code of track data.' }, example: 'srclang="id"', required: true },
      { name: 'label', type: 'specific', description: { id: 'Nama bahasa yang tampil di menu pilihan pengguna.', en: 'User-readable title displayed in subtitle selector.' }, example: 'label="Indonesia"' }
    ],
    exampleCode: `<div class="p-4 bg-slate-900 text-white rounded-lg text-sm">
  <p class="font-mono text-xs text-blue-400 mb-2">&lt;track&gt; WebVTT Implementation:</p>
  <pre class="bg-slate-950 p-3 rounded text-xs overflow-x-auto text-emerald-400 font-mono"><code>&lt;video controls&gt;
  &lt;source src="panduan-a11y.mp4" type="video/mp4"&gt;
  &lt;track kind="captions" src="captions-id.vtt" 
         srclang="id" label="Bahasa Indonesia" default&gt;
  &lt;track kind="subtitles" src="subtitles-en.vtt" 
         srclang="en" label="English"&gt;
&lt;/video&gt;</code></pre>
</div>`,
    accessibility: {
      role: 'timed text track',
      screenReaderDescription: {
        id: 'Teks caption WebVTT dapat diteruskan ke display braille atau screen reader secara tersinkronisasi.',
        en: 'Timed cues can be output to refreshable Braille displays and assistive speech synths.'
      }
    },
    seoImpact: {
      id: 'Google men-transkrip file WebVTT untuk mencocokkan kata kunci dalam video dengan query pencarian spesifik.',
      en: 'Search bots index WebVTT transcript texts to match precise video timestamps with search queries.'
    },
    bestPractices: {
      dos: {
        id: ['Sertakan atribut srclang dan label pada setiap track.', 'Gunakan kind="captions" jika menyertakan efek suara latar (cth: [musik ceria], [tepuk tangan]).'],
        en: ['Always include srclang and label.', 'Use kind="captions" when including background sound cues (e.g. [applause]).']
      },
      donts: {
        id: ['Jangan gunakan format subtitle selain WebVTT standar (.vtt).'],
        en: ['Do not use proprietary subtitle formats instead of valid WebVTT (.vtt).']
      }
    },
    relatedElements: ['<video>', '<audio>']
  }
];
