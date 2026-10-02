import { SemanticElement } from '../../types';

export const textElements: SemanticElement[] = [
  {
    id: 'time',
    tag: '<time>',
    name: { id: 'Machine-Readable Time', en: 'Machine-Readable Time' },
    category: 'text',
    summary: {
      id: 'Merepresentasikan waktu tertentu (jam, tanggal, atau durasi) dalam format yang dapat dibaca manusia sekaligus dipahami mesin.',
      en: 'Represents a specific period in time (hour, date, or duration) readable by humans and parseable by machines.'
    },
    description: {
      id: 'Elemen <time> menggunakan atribut datetime berstandar ISO 8601 (cth: "2026-10-02T16:30"). Hal ini memungkinkan kalender, mesin pencari, dan screen reader memahami tanggal persis meskipun teks yang tampil berupa "kemarin" atau "3 hari lalu".',
      en: 'The <time> element uses an ISO 8601 datetime attribute (e.g. "2026-10-02T16:30"). This allows calendars, search engines, and screen readers to parse the exact timestamp even when human text reads "yesterday" or "3 days ago".'
    },
    whySemantic: {
      id: 'Memungkinkan browser dan smartphone menawarkan fitur "Tambahkan ke Kalender" otomatis, serta Google menampilkan tanggal update pada cuplikan hasil pencarian.',
      en: 'Allows mobile OS to suggest "Add to Calendar" events automatically, and lets Google render fresh publication dates in search results.'
    },
    divSoupComparison: {
      divSoupCode: `<span class="date">Dipublikasikan 2 hari lalu</span>`,
      semanticCode: `<time datetime="2026-09-30T10:00:00Z">Dipublikasikan 2 hari lalu</time>`,
      benefits: {
        id: ['Mesin mengerti timestamp eksak ISO 8601', 'Tanggal artikel tampil akurat di Google SERP', 'Dapat diintegrasikan ke widget kalender'],
        en: ['Machines read exact ISO 8601 timestamp', 'Article dates display accurately in Google SERP', 'Enables calendar integrations']
      }
    },
    attributes: [
      { name: 'datetime', type: 'specific', description: { id: 'Waktu dalam format ISO 8601 (YYYY-MM-DD atau jam hh:mm). Wajib disertakan bila teks di dalamnya relatif.', en: 'ISO 8601 timestamp (YYYY-MM-DD or hh:mm). Mandatory if inner text is relative.' }, example: 'datetime="2026-10-02T08:00"', required: true }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm">
  <p class="text-slate-700 dark:text-slate-300">
    Webinar Accessibility diselenggarakan pada 
    <time datetime="2026-11-20T19:00+07:00" class="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
      20 November 2026 pukul 19:00 WIB
    </time>.
  </p>
  <p class="text-xs text-slate-500 mt-2">
    Pembaruan terakhir: <time datetime="2026-10-01">1 Oktober 2026</time>
  </p>
</div>`,
    accessibility: {
      role: 'time semantic format',
      screenReaderDescription: {
        id: 'Screen reader dapat melafalkan tanggal penuh dan waktu secara presisi kepada pengguna.',
        en: 'Screen readers read the precise date and time format to users.'
      }
    },
    seoImpact: {
      id: 'Sangat krusial untuk Google News dan Google Search "Date Published / Date Modified" ranking signal.',
      en: 'Vital ranking signal for Google Search "Date Published / Modified" rich cards.'
    },
    bestPractices: {
      dos: {
        id: ['Selalu gunakan atribut datetime dengan format ISO yang valid.', 'Gunakan <time> untuk tanggal artikel, acara kalender, dan durasi.'],
        en: ['Always supply a valid ISO datetime attribute.', 'Use <time> for article dates, event schedules, and durations.']
      },
      donts: {
        id: ['Jangan gunakan <time> untuk angka atau waktu fiktif yang tidak memiliki tanggal/waktu riil.'],
        en: ['Do not use <time> for non-calendar figures or fantasy timestamps without dates.']
      }
    },
    relatedElements: ['<article>', '<data>']
  },
  {
    id: 'mark',
    tag: '<mark>',
    name: { id: 'Highlighted Relevance', en: 'Highlighted Relevance' },
    category: 'text',
    summary: {
      id: 'Menandai teks yang relevan atau disorot karena konteks saat ini (cth: hasil pencarian).',
      en: 'Highlights text for reference or relevance purposes (e.g. search keyword match).'
    },
    description: {
      id: '<mark> berbeda dengan <em> (penekanan nada bicara) atau <strong> (urgensi/kepentingan). <mark> digunakan ketika suatu bagian teks disorot agar menarik perhatian pengguna dalam konteks pencarian atau tinjauan dokumen.',
      en: '<mark> differs from <em> (stress emphasis) and <strong> (importance). <mark> designates text marked or highlighted due to current context like search term hits.'
    },
    whySemantic: {
      id: 'Screen reader modern mengumumkan teks ini sebagai "highlighted" atau "sorotan", memberi tahu pengguna ada kata kunci yang cocok.',
      en: 'Modern screen readers announce highlighted text to let visually impaired users know search terms were matched.'
    },
    divSoupComparison: {
      divSoupCode: `<p>Hasil: Belajar <span class="yellow-bg">Semantic</span> HTML</p>`,
      semanticCode: `<p>Hasil: Belajar <mark>Semantic</mark> HTML</p>`,
      benefits: {
        id: ['Semantik penandaan konteks', 'Styling bawaan warna sorotan kuning cerah', 'Aksesibel bagi assistive tech'],
        en: ['Semantic search match relevance', 'Built-in accessible highlight styling', 'Accessible to assistive tech']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-200">
  <p class="mb-2 text-xs text-slate-500">Hasil pencarian untuk kata: "Aksesibilitas"</p>
  <p class="leading-relaxed">
    Kunci utama pembuatan web modern adalah <mark class="bg-amber-200 dark:bg-amber-500/40 text-slate-900 dark:text-amber-200 px-1 rounded">Aksesibilitas</mark> yang memastikan semua pengguna dapat menjelajah tanpa batasan fisik atau sensorik.
  </p>
</div>`,
    accessibility: {
      role: 'mark / highlight',
      screenReaderDescription: {
        id: 'Diumumkan sebagai "highlighted text" pada browser dan screen reader pendukung.',
        en: 'Announced as "highlighted text" on supporting screen readers.'
      }
    },
    seoImpact: {
      id: 'Membantu search bot mengidentifikasi relevansi istilah pencarian pada halaman dinamis.',
      en: 'Helps search bots correlate term relevance in search results pages.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan untuk menandai kecocokan query pencarian dalam teks.', 'Gunakan untuk menyoroti bagian penting dalam tinjauan kode atau dokumen.'],
        en: ['Use to highlight search query matches in text.', 'Use for document annotation callouts.']
      },
      donts: {
        id: ['Jangan gunakan <mark> jika tujuan Anda memberi tekanan kata (gunakan <em>) atau peringatan bahaya (gunakan <strong>).'],
        en: ['Do not use <mark> for stress emphasis (use <em>) or strong importance (use <strong>).']
      }
    },
    relatedElements: ['<em>', '<strong>', '<del>', '<ins>']
  },
  {
    id: 'blockquote',
    tag: '<blockquote>',
    name: { id: 'Block Quotation', en: 'Block Quotation' },
    category: 'text',
    summary: {
      id: 'Menunjukkan bagian teks yang dikutip dari sumber lain secara ekstensif.',
      en: 'Indicates a section quoted from an external source or speech.'
    },
    description: {
      id: 'Gunakan <blockquote> untuk kutipan panjang multi-baris. Pasangkan dengan atribut `cite` (URL sumber) dan elemen `<cite>` di dalamnya untuk nama pengarang atau buku.',
      en: 'Use <blockquote> for multi-line quotations. Pair with the `cite` attribute (source URL) and an internal `<cite>` element for author or publication name.'
    },
    whySemantic: {
      id: 'Screen reader secara otomatis mengumumkan "Buka kutipan" dan "Tutup kutipan", mencegah kebingungan pengguna disabilitas.',
      en: 'Screen readers automatically announce "Start of quote" and "End of quote", providing critical speech context.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="quote-box">
  <p>"Kekuatan Web ada pada sifat universalnya."</p>
  <div class="author">- Tim Berners-Lee</div>
</div>`,
      semanticCode: `<blockquote cite="https://www.w3.org">
  <p>Kekuatan Web ada pada sifat universalnya.</p>
  <footer>— <cite>Tim Berners-Lee</cite></footer>
</blockquote>`,
      benefits: {
        id: ['Screen reader melafalkan start & end quotation', 'URL sumber terpasang di atribut cite mesin', 'Terstruktur rapi dengan footer & cite'],
        en: ['Screen reader announces start & end quotation', 'Source URL embedded machine-readably', 'Properly structured with footer & cite']
      }
    },
    attributes: [
      { name: 'cite', type: 'specific', description: { id: 'URL sumber referensi kutipan asli.', en: 'URL referencing original source citation.' }, example: 'cite="https://w3.org/standards"' }
    ],
    exampleCode: `<blockquote cite="https://www.w3.org/WAI/" class="p-4 my-2 border-l-4 border-blue-600 bg-blue-50 dark:bg-slate-900/60 dark:border-blue-500 rounded-r-lg">
  <p class="text-base italic text-slate-800 dark:text-slate-200 mb-2">
    "Aksesibilitas web berarti bahwa situs web, alat, dan teknologi dirancang dan dikembangkan sedemikian rupa sehingga penyandang disabilitas dapat menggunakannya."
  </p>
  <footer class="text-xs text-slate-600 dark:text-slate-400">
    — <cite class="font-medium text-slate-900 dark:text-white not-italic">W3C Web Accessibility Initiative (WAI)</cite>
  </footer>
</blockquote>`,
    accessibility: {
      role: 'blockquote',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan "Blockquote" di awal dan "End of blockquote" di akhir kutipan.',
        en: 'Announced as "Blockquote" at the start and "End of blockquote" at conclusion.'
      }
    },
    seoImpact: {
      id: 'Google mengidentifikasi kutipan terpercaya dan atribut cite untuk verifikasi kutipan kutipan otoritatif.',
      en: 'Aids Google in identifying authoritative attributed quotations.'
    },
    bestPractices: {
      dos: {
        id: ['Bungkus teks di dalam <p> di dalam <blockquote>.', 'Gunakan <cite> untuk menyebutkan nama pengarang atau karya yang dikutip.'],
        en: ['Wrap the quoted prose in <p> tags within <blockquote>.', 'Use <cite> to name the referenced author or publication.']
      },
      donts: {
        id: ['Jangan gunakan <blockquote> hanya untuk membuat teks ber-indentasi ke dalam.'],
        en: ['Do not use <blockquote> purely to indent regular text visually.']
      }
    },
    relatedElements: ['<cite>', '<q>', '<figure>']
  },
  {
    id: 'cite',
    tag: '<cite>',
    name: { id: 'Citation of Creative Work', en: 'Citation of Creative Work' },
    category: 'text',
    summary: {
      id: 'Menandai judul karya cipta (buku, lagu, film, makalah penelitian, artikel, dll.).',
      en: 'References the title of a creative work (book, song, film, paper, article, etc.).'
    },
    description: {
      id: '<cite> digunakan khusus untuk judul karya kreatif yang dirujuk. Menuliskan nama pengarang tanpa merujuk karyanya di dalam <cite> merupakan pelanggaran spesifikasi HTML5.',
      en: '<cite> specifically marks the title of a referenced creative work. Naming an author alone without their work violates HTML5 spec.'
    },
    whySemantic: {
      id: 'Membedakan judul referensi literatur dari nama orang biasa, memungkinkan alat bibliografi otomatis mengekstrak sitasi.',
      en: 'Distinguishes creative citations from regular names, allowing academic parsers to index bibliography.'
    },
    divSoupComparison: {
      divSoupCode: `Buku <span class="italic">Atomic Habits</span> karya James Clear.`,
      semanticCode: `Buku <cite>Atomic Habits</cite> karya James Clear.`,
      benefits: {
        id: ['Standardisasi metadata karya cipta', 'Styling semantik miring bawaan'],
        en: ['Standardized creative work metadata', 'Default semantic italics representation']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300">
  <p>
    Dalam buku <cite class="font-medium text-indigo-600 dark:text-indigo-400">Don't Make Me Think</cite> karangan Steve Krug, ditegaskan bahwa navigasi web harus intuitif dan tidak memaksa pengguna berpikir keras.
  </p>
</div>`,
    accessibility: {
      role: 'citation semantic',
      screenReaderDescription: {
        id: 'Screen reader mengenali teks sebagai referensi sitasi karya cipta.',
        en: 'Screen reader treats content as a creative work citation reference.'
      }
    },
    seoImpact: {
      id: 'Membantu Google Scholar dan mesin pencari mengindeks kutipan referensi ilmiah dan karya kreatif.',
      en: 'Assists search engines in cataloging creative works and academic citations.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan untuk judul buku, film, lagu, game, lukisan, atau artikel.', 'Gunakan bersama <blockquote>.'],
        en: ['Use for titles of books, films, songs, games, paintings, or papers.', 'Use inside or adjacent to <blockquote>.']
      },
      donts: {
        id: ['Jangan gunakan <cite> untuk nama orang atau akun Twitter.'],
        en: ['Do not use <cite> to contain just an author’s personal name without their work.']
      }
    },
    relatedElements: ['<blockquote>', '<q>', '<dfn>']
  },
  {
    id: 'code',
    tag: '<code>',
    name: { id: 'Inline Code Fragment', en: 'Inline Code Fragment' },
    category: 'text',
    summary: {
      id: 'Mendefinisikan fragmen kode komputer, sintaks bahasa pemrograman, atau nama fungsi.',
      en: 'Defines a computer code fragment, programming language syntax, or function name.'
    },
    description: {
      id: 'Untuk kode inline di tengah kalimat, gunakan <code> saja. Untuk blok kode multi-baris yang mempertahankan spasi dan baris baru, bungkus <code> di dalam <pre> (yaitu <pre><code>...</code></pre>).',
      en: 'For inline code snippets within prose, use <code>. For multi-line code blocks preserving indentation, nest <code> inside <pre> (<pre><code>...</code></pre>).'
    },
    whySemantic: {
      id: 'Menginstruksikan screen reader untuk melafalkan kode karakter demi karakter dan font monospace otomatis di browser.',
      en: 'Prompts screen readers to announce code and switch to character-by-character pronunciation.'
    },
    divSoupComparison: {
      divSoupCode: `Gunakan fungsi <span class="mono-font">fetch()</span> di JS.`,
      semanticCode: `Gunakan fungsi <code>fetch()</code> di JS.`,
      benefits: {
        id: ['Screen reader mengeja karakter kode secara akurat', 'Dukungan font monospace universal bawaan'],
        en: ['Screen reader spells syntax accurately', 'Universal monospace typography default']
      }
    },
    attributes: [
      { name: 'class', type: 'global', description: { id: 'Biasanya digunakan untuk class library syntax highlighter (cth: class="language-javascript").', en: 'Commonly used for syntax highlighters (e.g. class="language-javascript").' } }
    ],
    exampleCode: `<div class="p-4 bg-slate-950 text-slate-200 rounded-lg text-sm font-mono border border-slate-800">
  <p class="mb-2 text-slate-400 font-sans text-xs">Contoh penggunaan tag code inline & block:</p>
  <p class="font-sans mb-3 text-slate-300">
    Gunakan metode <code class="text-pink-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">addEventListener('click', handler)</code> untuk menangkap klik.
  </p>
  <pre class="bg-slate-900 p-3 rounded overflow-x-auto text-xs"><code class="text-emerald-400">const button = document.querySelector('button');
button.addEventListener('click', () => {
  console.log('Button di-klik!');
});</code></pre>
</div>`,
    accessibility: {
      role: 'code',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan "Code" sebelum membaca fragmen kode.',
        en: 'Screen reader announces "Code" prior to reading the snippet.'
      }
    },
    seoImpact: {
      id: 'Membantu developer portals dan search engines memahami bahwa halaman berisi dokumentasi teknis atau tutorial pemrograman.',
      en: 'Signals technical documentation and developer tutorials to search algorithms.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan <pre><code> untuk blok kode panjang.', 'Encode karakter khusus seperti &lt; dan &gt; menjadi HTML entities di dalam kode.'],
        en: ['Wrap in <pre><code> for multi-line snippets.', 'Escape special HTML entities like &lt; and &gt; inside code.']
      },
      donts: {
        id: ['Jangan gunakan <code> jika teks yang ditulis adalah input keyboard pengguna (gunakan <kbd>).'],
        en: ['Do not use <code> for user keyboard keystrokes (use <kbd>).']
      }
    },
    relatedElements: ['<kbd>', '<samp>', '<pre>']
  },
  {
    id: 'kbd',
    tag: '<kbd>',
    name: { id: 'Keyboard Input', en: 'Keyboard Input' },
    category: 'text',
    summary: {
      id: 'Menandai input keyboard pengguna, pintasan tombol (shortcut), atau perintah suara.',
      en: 'Denotes user keyboard input, key shortcuts, or voice command entries.'
    },
    description: {
      id: 'Elemen <kbd> secara semantik menandakan tombol fisik yang harus ditekan oleh pengguna, misalnya: <kbd>Ctrl</kbd> + <kbd>C</kbd>.',
      en: 'The <kbd> element represents user keystrokes that must be pressed, e.g. <kbd>Ctrl</kbd> + <kbd>C</kbd>.'
    },
    whySemantic: {
      id: 'Memberi tahu assistive tech bahwa ini adalah instruksi fisik tombol keyboard yang harus ditekan oleh pengguna.',
      en: 'Informs assistive tech that content represents physical keyboard strokes required from the user.'
    },
    divSoupComparison: {
      divSoupCode: `Tekan <span class="key-badge">Ctrl</span> + <span class="key-badge">S</span>`,
      semanticCode: `Tekan <kbd>Ctrl</kbd> + <kbd>S</kbd>`,
      benefits: {
        id: ['Semantik resmi keyboard shortcut', 'Mudah distilasi seperti tombol fisik keyboard'],
        en: ['Official keyboard shortcut semantics', 'Clean aesthetic styling for keycaps']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300">
  <p class="flex items-center gap-2">
    <span>Untuk mencari teks di halaman, tekan:</span>
    <kbd class="px-2 py-1 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-300 rounded shadow-xs dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">Ctrl</kbd>
    <span>+</span>
    <kbd class="px-2 py-1 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-300 rounded shadow-xs dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">F</kbd>
  </p>
</div>`,
    accessibility: {
      role: 'keyboard input semantic',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan input tombol keyboard yang harus ditekan.',
        en: 'Screen readers enunciate physical keyboard buttons to be pressed.'
      }
    },
    seoImpact: {
      id: 'Membantu dokumentasi software muncul pada snippet "how-to keyboard shortcuts" Google.',
      en: 'Powers Google "How-to keyboard shortcuts" SERP feature snippets.'
    },
    bestPractices: {
      dos: {
        id: ['Bungkus setiap tombol individual dalam tag <kbd> masing-masing.', 'Boleh sarangkan <kbd> di dalam <samp> untuk input dalam terminal.'],
        en: ['Wrap each individual key in its own <kbd> tag.', 'Nest <kbd> within <samp> for command terminal prompts.']
      },
      donts: {
        id: ['Jangan gunakan <kbd> untuk output program komputer (gunakan <samp>).'],
        en: ['Do not use <kbd> for computer output messages (use <samp>).']
      }
    },
    relatedElements: ['<code>', '<samp>']
  },
  {
    id: 'samp',
    tag: '<samp>',
    name: { id: 'Sample Computer Output', en: 'Sample Computer Output' },
    category: 'text',
    summary: {
      id: 'Menampung contoh keluaran (output) dari program komputer, terminal, atau skrip.',
      en: 'Encloses sample output from a computer program, CLI terminal, or script.'
    },
    description: {
      id: 'Gunakan <samp> untuk menampilkan pesan error, respon API terminal, atau teks status yang dihasilkan oleh sistem komputer.',
      en: 'Use <samp> to display error messages, CLI terminal output, or machine-generated log lines.'
    },
    whySemantic: {
      id: 'Membedakan kode sumber (code) dari teks hasil eksekusi program (samp), meningkatkan kejernihan dokumentasi teknis.',
      en: 'Distinguishes source code (code) from program execution results (samp), clarifying documentation.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="cli-output">Error 404: Not Found</div>`,
      semanticCode: `<samp>Error 404: File Not Found</samp>`,
      benefits: {
        id: ['Semantik jelas untuk output sistem', 'Monospace font styling bawaan'],
        en: ['Clean semantics for system output', 'Default monospace font presentation']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="p-4 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 border border-slate-800">
  <p class="text-slate-400 mb-1">$ git push origin main</p>
  <samp class="text-emerald-400 block">Everything up-to-date.</samp>
  <samp class="text-rose-400 block mt-1">Warning: 1 vulnerability found in dependencies.</samp>
</div>`,
    accessibility: {
      role: 'sample output',
      screenReaderDescription: {
        id: 'Screen reader membedakan output sistem dari teks instruksi biasa.',
        en: 'Screen readers distinguish system output from instructional prose.'
      }
    },
    seoImpact: {
      id: 'Membantu search engine mengenali pesan error spesifik yang dicari pengguna ketika troubleshooting kode.',
      en: 'Aids crawlers in matching error messages during developer troubleshooting queries.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan untuk pesan log terminal, status server, atau prompt dialog konsol.'],
        en: ['Use for terminal log traces, status prompts, or console outputs.']
      },
      donts: {
        id: ['Jangan gunakan <samp> untuk menulis source code program (gunakan <code>).'],
        en: ['Do not use <samp> for writing program source code (use <code>).']
      }
    },
    relatedElements: ['<code>', '<kbd>']
  },
  {
    id: 'ruby',
    tag: '<ruby>',
    name: { id: 'Ruby Annotation', en: 'Ruby Annotation' },
    category: 'text',
    summary: {
      id: 'Digunakan untuk menampilkan anotasi pengucapan fonetik kecil (furigana/pinyin) di atas teks karakter Asia Timur.',
      en: 'Provides small phonetic pronunciation annotations (furigana/pinyin) above East Asian characters.'
    },
    description: {
      id: '<ruby> membungkus teks utama bersama dengan <rt> (ruby text pengucapan) dan <rp> (fallback tanda kurung untuk browser lama). Sangat penting untuk web multibahasa (Jepang, Mandarin, dsb.).',
      en: '<ruby> wraps base text with <rt> (ruby text pronunciation) and <rp> (parenthesis fallback). Essential for multilingual East Asian typography.'
    },
    whySemantic: {
      id: 'Merupakan standar internasional W3C untuk tipografi fonetik Asia Timur yang dirender presisi di atas karakter kanji/hanzi.',
      en: 'W3C international standard for East Asian phonetic typography rendered cleanly above base glyphs.'
    },
    divSoupComparison: {
      divSoupCode: `<span>漢 (kan) 字 (ji)</span>`,
      semanticCode: `<ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby>`,
      benefits: {
        id: ['Furigana melayang rapi di atas karakter kanji', 'Fallback kurung otomatis untuk browser lama via <rp>'],
        en: ['Pronunciation floats directly above characters', 'Graceful fallback parentheses via <rp> for older engines']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-center">
  <p class="text-sm text-slate-500 mb-2">Contoh tipografi Jepang dengan Furigana fonetik:</p>
  <div class="text-3xl font-serif text-slate-800 dark:text-slate-100">
    <ruby class="ruby-text">
      日<rp>(</rp><rt class="text-xs text-blue-600 dark:text-blue-400">ni</rt><rp>)</rp>
      本<rp>(</rp><rt class="text-xs text-blue-600 dark:text-blue-400">hon</rt><rp>)</rp>
      語<rp>(</rp><rt class="text-xs text-blue-600 dark:text-blue-400">go</rt><rp>)</rp>
    </ruby>
  </div>
  <p class="text-xs text-slate-500 mt-2">Nihongo = Bahasa Jepang</p>
</div>`,
    accessibility: {
      role: 'ruby phonetic annotation',
      screenReaderDescription: {
        id: 'Screen reader dapat membacakan pengucapan fonetik yang benar untuk karakter logografis.',
        en: 'Assistive software reads correct phonetic pronunciation for logographic characters.'
      }
    },
    seoImpact: {
      id: 'Mendukung indexing bahasa multibahasa secara akurat di mesin pencari global.',
      en: 'Enhances multilingual keyword indexing accuracy in international search.'
    },
    bestPractices: {
      dos: {
        id: ['Selalu sertakan <rp> untuk kompatibilitas jika browser tidak mendukung rendering ruby.', 'Gunakan <rt> untuk setiap suku kata.'],
        en: ['Include <rp> fallback parentheses.', 'Map <rt> to each respective syllable.']
      },
      donts: {
        id: ['Jangan gunakan trik CSS posisi absolut manual untuk menaruh teks kecil di atas karakter.'],
        en: ['Do not use brittle absolute CSS positioning to place pronunciation hints above glyphs.']
      }
    },
    relatedElements: ['<rt>', '<rp>', '<bdi>']
  },
  {
    id: 'bdi',
    tag: '<bdi>',
    name: { id: 'Bi-directional Isolation', en: 'Bi-directional Isolation' },
    category: 'text',
    summary: {
      id: 'Mengisolasi fragmen teks yang arah bacaannya (Kiri-ke-Kanan vs Kanan-ke-Kiri / RTL) belum diketahui atau dinamis.',
      en: 'Isolates text with unknown bidirectional directionality (LTR vs RTL) from surrounding text.'
    },
    description: {
      id: 'Ketika menampilkan nama pengguna atau komentar dari user dalam bahasa Arab/Ibrani (RTL) di tengah teks bahasa Indonesia/Inggris (LTR), teks di sekitarnya bisa rusak arah spasinya. <bdi> mencegah kebocoran arah teks tersebut.',
      en: 'When rendering user usernames or comments in Arabic/Hebrew (RTL) inside an Indonesian/English (LTR) sentence, layout punctuation flips awkwardly. <bdi> isolates bidirectional bleed.'
    },
    whySemantic: {
      id: 'Mencegah kerusakan tata letak kalimat saat mencampur bahasa LTR dan RTL secara dinamis.',
      en: 'Prevents bidirectional punctuation layout bugs when mixing dynamic LTR and RTL inputs.'
    },
    divSoupComparison: {
      divSoupCode: `<div>Pengguna: <span>إيان</span> - Skor 95 poin</div>`,
      semanticCode: `<div>Pengguna: <bdi>إيان</bdi> - Skor 95 poin</div>`,
      benefits: {
        id: ['Tanda hubung (-) dan angka 95 tidak akan terbalik atau tertukar posisi', 'Wajib untuk aplikasi internasional yang menerima input multi-bahasa'],
        en: ['Punctuation and trailing numbers remain in correct sequence', 'Mandatory for international apps accepting Arabic/Hebrew usernames']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300">
  <p class="mb-2 font-medium">Papan Peringkat Peserta Internasional:</p>
  <ul class="space-y-1">
    <li>Peringkat 1: <bdi class="font-bold text-blue-600 dark:text-blue-400">إيان (Iyan)</bdi> — 98 poin</li>
    <li>Peringkat 2: <bdi class="font-bold text-blue-600 dark:text-blue-400">Ahmad B.</bdi> — 94 poin</li>
  </ul>
</div>`,
    accessibility: {
      role: 'bidirectional isolation',
      screenReaderDescription: {
        id: 'Screen reader melafalkan teks sesuai algoritma Unicode Bidirectional yang diisolasi dengan benar.',
        en: 'Ensures correct Unicode BiDi speech engine synthesis.'
      }
    },
    seoImpact: {
      id: 'Menjamin akurasi parsing nama entitas dalam berbagai alfabet dunia.',
      en: 'Guarantees entity parsing accuracy across diverse world scripts.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan setiap kali Anda menampilkan string yang berasal dari input pengguna tak terduga (nama profil, ulasan).'],
        en: ['Use whenever outputting untrusted user strings that may contain mixed Arabic/Hebrew characters.']
      },
      donts: {
        id: ['Jangan gunakan <bdo> jika Anda tidak ingin memaksakan arah teks secara manual (bdo = Bi-directional Override).'],
        en: ['Do not confuse <bdi> (auto-isolation) with <bdo> (manual override).']
      }
    },
    relatedElements: ['<bdo>', '<ruby>']
  }
];
