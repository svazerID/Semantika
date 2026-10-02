import { SemanticElement } from '../../types';

export const interactiveElements: SemanticElement[] = [
  {
    id: 'details',
    tag: '<details>',
    name: { id: 'Disclosure Widget', en: 'Disclosure Widget' },
    category: 'interactive',
    summary: {
      id: 'Membuat widget akordeon buka-tutup (disclosure toggle) native tanpa JavaScript.',
      en: 'Creates a native disclosure widget (accordion/toggle) with zero JavaScript required.'
    },
    description: {
      id: '<details> membungkus konten yang dapat disembunyikan atau ditampilkan oleh pengguna. Judul ringkasannya diletakkan di dalam anak pertama yaitu <summary>. Browser secara native menangani status buka/tutup dan animasi panah segitiga.',
      en: '<details> encloses content users can reveal or hide. Its clickable header is placed in the first child <summary>. Browsers handle open/close toggle state and marker arrow natively.'
    },
    whySemantic: {
      id: 'Mendukung keyboard (Enter / Spasi untuk toggle) dan status aria-expanded otomatis tanpa perlu menulis kode JavaScript sebaris pun.',
      en: 'Built-in keyboard support (Enter/Space toggle) and automatic aria-expanded state handling with zero JS lines.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="accordion-header" onclick="toggle()">
  FAQ 1 <span class="arrow">▼</span>
</div>
<div class="accordion-body hidden">Jawaban...</div>`,
      semanticCode: `<details>
  <summary>Pertanyaan FAQ 1</summary>
  <p>Jawaban lengkap...</p>
</details>`,
      benefits: {
        id: ['Zero JavaScript untuk interaksi buka-tutup', 'Screen reader otomatis membaca status "Expanded" atau "Collapsed"', 'Dapat dibuka secara default dengan atribut "open"'],
        en: ['Zero JavaScript required for accordion state', 'Screen readers announce "Expanded" or "Collapsed" automatically', 'Default opened state via "open" attribute']
      }
    },
    attributes: [
      { name: 'open', type: 'specific', description: { id: 'Atribut boolean untuk membuka widget secara default saat halaman dimuat.', en: 'Boolean attribute that opens disclosure on initial page load.' }, example: 'open' },
      { name: 'name', type: 'specific', description: { id: 'Fitur baru HTML5: atribut name yang sama pada beberapa <details> akan membuat perilaku akordeon eksklusif (hanya 1 yang bisa terbuka).', en: 'New HTML5 attribute: identical name across details creates exclusive accordion.' }, example: 'name="faq-group"' }
    ],
    exampleCode: `<div class="space-y-3 max-w-lg mx-auto">
  <details class="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs" open>
    <summary class="font-semibold text-slate-900 dark:text-white cursor-pointer select-none flex items-center justify-between list-none">
      <span>Apakah Semantic HTML penting untuk SEO?</span>
      <span class="text-blue-600 transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
      Sangat penting! Mesin pencari seperti Google menggunakan struktur semantik untuk memahami hierarki artikel, konteks kutipan, dan entitas data kaya (rich snippets).
    </p>
  </details>
  
  <details class="group p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs">
    <summary class="font-semibold text-slate-900 dark:text-white cursor-pointer select-none flex items-center justify-between list-none">
      <span>Apakah butuh JavaScript untuk &lt;details&gt;?</span>
      <span class="text-blue-600 transition-transform group-open:rotate-180">▼</span>
    </summary>
    <p class="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
      Tidak sama sekali. Browser modern menangani seluruh interaksi buka/tutup dan aksesibilitas keyboard secara native.
    </p>
  </details>
</div>`,
    accessibility: {
      role: 'group with disclosure button summary',
      screenReaderDescription: {
        id: 'Screen reader melafalkan: "Tombol, Apakah Semantic HTML penting untuk SEO?, Diperluas/Diciutkan".',
        en: 'Screen reader announces: "Button, Question, Expanded/Collapsed".'
      },
      keyboardSupport: 'Bisa difokuskan dengan Tab, dibuka/tutup dengan Enter atau Spasi.'
    },
    seoImpact: {
      id: 'Teks di dalam <details> tetap dapat diindeks oleh crawler Google meskipun dalam keadaan tertutup.',
      en: 'Search engine crawlers index inner text within <details> even when initially collapsed.'
    },
    bestPractices: {
      dos: {
        id: ['Selalu sediakan elemen <summary> sebagai anak pertama langsung dari <details>.', 'Gunakan untuk FAQ, panel konfigurasi lanjutan, atau catatan kaki.'],
        en: ['Always provide a <summary> as the first child of <details>.', 'Use for FAQs, advanced settings panels, or spoilers.']
      },
      donts: {
        id: ['Jangan gunakan <details> untuk menu navigasi utama situs di mana tautan harus selalu terlihat.'],
        en: ['Do not use <details> for vital site-wide navigation menus that need immediate visibility.']
      }
    },
    relatedElements: ['<summary>', '<dialog>']
  },
  {
    id: 'summary',
    tag: '<summary>',
    name: { id: 'Disclosure Summary Heading', en: 'Disclosure Summary Heading' },
    category: 'interactive',
    summary: {
      id: 'Menentukan label atau judul yang dapat diklik untuk elemen <details>.',
      en: 'Specifies the clickable visible heading/label for a <details> disclosure element.'
    },
    description: {
      id: '<summary> harus menjadi anak pertama di dalam <details>. Ketika diklik atau ditekan tombol Spasi/Enter, ia akan membuka atau menutup konten rahasia di bawahnya.',
      en: '<summary> must be the first child inside <details>. Triggering it with click or Enter/Space toggles disclosure visibility.'
    },
    whySemantic: {
      id: 'Secara implisit dipetakan sebagai tombol interaktif keyboard bagi screen reader.',
      en: 'Implicitly mapped as an accessible interactive toggle button for assistive technologies.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="accordion-title">Judul FAQ</div>`,
      semanticCode: `<summary>Judul FAQ</summary>`,
      benefits: {
        id: ['Dapat di-tab dan fokus otomatis via keyboard', 'Tidak butuh tabindex atau role="button" manual'],
        en: ['Naturally keyboard-focusable without custom tabindex', 'Eliminates need for manual role="button" aria tags']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<details class="p-3 bg-slate-100 dark:bg-slate-800 rounded">
  <summary class="font-medium cursor-pointer text-slate-800 dark:text-slate-200">
    Lihat Cara Kerja Linter
  </summary>
  <p class="text-xs text-slate-600 dark:text-slate-400 mt-2">
    Linter membedah DOM HTML, mencari pola div tak bermakna, dan menguji rasio tag semantik.
  </p>
</details>`,
    accessibility: {
      role: 'button (disclosure)',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan peran tombol dan status keterbukaan saat ini.',
        en: 'Screen reader reads button role and current toggle disclosure state.'
      }
    },
    seoImpact: {
      id: 'Membantu Google mengidentifikasi pertanyaan pada skema FAQPage.',
      en: 'Assists Google in parsing FAQPage schema questions.'
    },
    bestPractices: {
      dos: {
        id: ['Buat judul summary singkat, padat, dan jelas menggambarkan isi yang tersembunyi.'],
        en: ['Keep summary label concise and indicative of hidden contents.']
      },
      donts: {
        id: ['Jangan meletakkan link <a> atau tombol <button> lain di dalam <summary> (interaksi nested dilarang).'],
        en: ['Do not nest interactive links or buttons inside a <summary> (nested interactive violation).']
      }
    },
    relatedElements: ['<details>']
  },
  {
    id: 'dialog',
    tag: '<dialog>',
    name: { id: 'Native Modal Dialog', en: 'Native Modal Dialog' },
    category: 'interactive',
    summary: {
      id: 'Membuat jendela pop-up modal atau dialog native dengan focus trap dan backdrop bawaan browser.',
      en: 'Creates a native modal or non-modal popup window with built-in focus trap and backdrop.'
    },
    description: {
      id: '<dialog> memiliki API JavaScript native: `dialog.showModal()` untuk modal dengan backdrop dan focus-trap, serta `dialog.close()` untuk menutup. Tombol Escape pada keyboard secara otomatis menutup modal modal.',
      en: '<dialog> provides native JS methods: `dialog.showModal()` for focus-trapped backdropped modals, and `dialog.close()`. Pressing Escape automatically dismisses the modal.'
    },
    whySemantic: {
      id: 'Menyelesaikan masalah "Focus Trap" dan latar belakang yang tidak bisa diklik pada modal buatan sendiri, yang sering menjadi pelanggaran aksesibilitas terparah.',
      en: 'Solves focus trapping and aria-hidden inert background issues that plague custom div modals, preventing severe a11y regressions.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="modal-overlay">
  <div class="modal-box">
    <h3>Konfirmasi</h3>
  </div>
</div>`,
      semanticCode: `<dialog id="myDialog">
  <form method="dialog">
    <h3>Konfirmasi</h3>
    <button>Tutup</button>
  </form>
</dialog>`,
      benefits: {
        id: ['Tombol Escape otomatis menutup modal', 'Focus trap bawaan browser mencegah fokus keluar dari modal', 'Styling backdrop native melalui pseudo-element ::backdrop'],
        en: ['Escape key automatically closes modal', 'Native browser focus trap keeps keyboard navigation inside', 'Native backdrop styling via ::backdrop pseudo-element']
      }
    },
    attributes: [
      { name: 'open', type: 'specific', description: { id: 'Menandakan dialog sedang terbuka dalam mode non-modal.', en: 'Indicates dialog is open in non-modal mode.' }, example: 'open' }
    ],
    exampleCode: `<div class="text-center p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
  <button onclick="document.getElementById('demo-modal').showModal()" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
    Buka Modal Native &lt;dialog&gt;
  </button>

  <dialog id="demo-modal" class="p-6 rounded-xl shadow-2xl backdrop:bg-slate-900/60 max-w-sm w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800">
    <h3 class="text-lg font-bold mb-2">Pemberitahuan Semantic</h3>
    <p class="text-sm text-slate-600 dark:text-slate-300 mb-6">
      Modal ini menggunakan elemen &lt;dialog&gt; resmi. Anda dapat menekan tombol <strong>Escape</strong> pada keyboard untuk menutupnya!
    </p>
    <form method="dialog" class="text-right">
      <button class="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium rounded-lg transition-colors">
        Tutup Jendela
      </button>
    </form>
  </dialog>
</div>`,
    accessibility: {
      role: 'dialog',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan "Dialog", memfokuskan elemen interaktif pertama, dan membatasi fokus hanya di dalam dialog saat modal aktif.',
        en: 'Screen reader announces "Dialog", focuses first interactive element, and traps focus while modal.'
      },
      keyboardSupport: 'Tombol Escape menutup modal secara otomatis. Tab bersirkulasi hanya di dalam dialog.'
    },
    seoImpact: {
      id: 'Isi dialog diabaikan dari ranking konten utama hingga dibuka, menjaga konten inti tetap bersih.',
      en: 'Modal contents are recognized as transient dialogs rather than inline article prose.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan showModal() untuk dialog modal dengan backdrop dan focus trap.', 'Sertakan tombol tutup yang mudah diakses.'],
        en: ['Use showModal() for full focus-trapped backdropped modals.', 'Always provide an explicit close button.']
      },
      donts: {
        id: ['Jangan membuka dialog otomatis tanpa interaksi pengguna begitu halaman dimuat (annoying modal).'],
        en: ['Avoid opening dialogs automatically upon initial page visit.']
      }
    },
    relatedElements: ['<form>', '<button>', '<details>']
  },
  {
    id: 'meter',
    tag: '<meter>',
    name: { id: 'Scalar Measurement (Known Range)', en: 'Scalar Measurement (Known Range)' },
    category: 'interactive',
    summary: {
      id: 'Menampilkan nilai skalar numerik dalam rentang tertentu yang telah diketahui (kapasitas disk, suhu, penggunaan kuota).',
      en: 'Displays a scalar measurement within a known range (disk capacity, temperature, quota usage).'
    },
    description: {
      id: '<meter> digunakan untuk pengukuran statis dalam kisaran minimum dan maksimum (bukan proses berjalan seperti progress bar pengunduhan). Mendukung zona rendah (low), optimum, dan tinggi (high) untuk pewarnaan otomatis.',
      en: '<meter> represents a gauge of a measured value within min/max bounds (not an in-progress task like a download). Supports low, high, and optimum thresholds.'
    },
    whySemantic: {
      id: 'Screen reader secara otomatis mengumumkan persentase atau nilai terhadap batas maksimum (cth: "75 dari 100").',
      en: 'Screen readers automatically announce current gauge value relative to maximum bounds (e.g. "75 out of 100").'
    },
    divSoupComparison: {
      divSoupCode: `<div class="progress-bar-bg">
  <div class="progress-fill" style="width: 70%"></div>
</div>`,
      semanticCode: `<meter min="0" max="100" value="70" low="30" high="80" optimum="50">70%</meter>`,
      benefits: {
        id: ['Nilai numerik dibaca presisi oleh assistive tech', 'Mendukung status warning/danger visual otomatis'],
        en: ['Numeric measurements parsed accurately by assistive software', 'Automatic browser warning/danger gauge status color']
      }
    },
    attributes: [
      { name: 'value', type: 'specific', description: { id: 'Nilai skalar saat ini.', en: 'Current measured value.' }, example: 'value="75"', required: true },
      { name: 'min', type: 'specific', description: { id: 'Batas nilai minimum (default 0).', en: 'Lower bound (default 0).' }, example: 'min="0"' },
      { name: 'max', type: 'specific', description: { id: 'Batas nilai maksimum (default 1).', en: 'Upper bound (default 1).' }, example: 'max="100"' },
      { name: 'optimum', type: 'specific', description: { id: 'Nilai titik optimal.', en: 'Optimal target value.' }, example: 'optimum="90"' }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm max-w-sm mx-auto space-y-3">
  <div>
    <div class="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
      <span>Kapasitas Cloud Storage</span>
      <span>75 GB / 100 GB</span>
    </div>
    <meter min="0" max="100" low="30" high="80" optimum="20" value="75" class="w-full h-4 rounded"></meter>
  </div>
  <p class="text-xs text-slate-500">Nilai skalar dengan rentang tetap menggunakan tag semantic &lt;meter&gt;.</p>
</div>`,
    accessibility: {
      role: 'meter',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan: "Meter, 75 dari 100", memberi tahu pengguna persentase penggunaan tepat.',
        en: 'Screen reader reads: "Meter, 75 out of 100", communicating exact gauge level.'
      }
    },
    seoImpact: {
      id: 'Dapat diintegrasikan untuk rating skor atau kuota spesifikasi produk e-commerce.',
      en: 'Aids crawlers in interpreting metric benchmarks in review articles.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan <meter> untuk kapasitas baterai, ruang penyimpanan, atau hasil voting.', 'Sediakan teks fallback angka di dalam tag untuk browser lama.'],
        en: ['Use for battery life, storage capacity, or review scores.', 'Provide inner fallback text for legacy browsers.']
      },
      donts: {
        id: ['Jangan gunakan <meter> untuk menunjukkan proses upload file yang sedang berjalan (gunakan <progress>).'],
        en: ['Do not use <meter> for ongoing tasks like file uploads (use <progress>).']
      }
    },
    relatedElements: ['<progress>', '<output>']
  },
  {
    id: 'progress',
    tag: '<progress>',
    name: { id: 'Task Completion Progress', en: 'Task Completion Progress' },
    category: 'interactive',
    summary: {
      id: 'Menampilkan progres penyelesaian suatu tugas atau proses yang sedang berjalan (cth: unduhan file).',
      en: 'Displays the completion progress of an ongoing task (e.g. file download/upload).'
    },
    description: {
      id: 'Berbeda dengan <meter>, elemen <progress> khusus digunakan untuk proses yang berubah seiring waktu (determinate maupun indeterminate jika atribut value dihilangkan).',
      en: 'Unlike <meter>, <progress> is specifically intended for dynamic ongoing activities (supports indeterminate state if value is omitted).'
    },
    whySemantic: {
      id: 'Screen reader secara berkala mengumumkan kemajuan progres kepada pengguna tanpa perlu memindahkan fokus keyboard.',
      en: 'Screen readers periodically announce task completion percentage without stealing keyboard focus.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="fake-loader"><div class="fill" style="width: 45%"></div></div>`,
      semanticCode: `<progress max="100" value="45">45%</progress>`,
      benefits: {
        id: ['ARIA role "progressbar" otomatis', 'Mendukung mode indeterminate (loading animasi berputar) saat value kosong'],
        en: ['Automatic ARIA "progressbar" role', 'Supports indeterminate animation state when value is omitted']
      }
    },
    attributes: [
      { name: 'value', type: 'specific', description: { id: 'Berapa banyak tugas yang telah selesai. Jika tidak ada, bar menjadi indeterminate.', en: 'How much of task is completed. Indeterminate if omitted.' }, example: 'value="45"' },
      { name: 'max', type: 'specific', description: { id: 'Jumlah total penyelesaian (default 1).', en: 'Upper bound of total work (default 1).' }, example: 'max="100"' }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm max-w-sm mx-auto space-y-4">
  <div>
    <div class="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
      <span>Mengunggah Berkas...</span>
      <span>65%</span>
    </div>
    <progress max="100" value="65" class="w-full h-3 rounded overflow-hidden"></progress>
  </div>
  <div>
    <div class="text-xs font-semibold mb-1 text-slate-500">Memproses data (Indeterminate):</div>
    <progress class="w-full h-2"></progress>
  </div>
</div>`,
    accessibility: {
      role: 'progressbar',
      screenReaderDescription: {
        id: 'Screen reader melafalkan persentase progres saat ini (cth: "Progress bar 65%").',
        en: 'Screen reader announces: "Progress bar 65%".'
      }
    },
    seoImpact: {
      id: 'Menandai komponen interface web dinamis.',
      en: 'Identifies dynamic interactive widgets.'
    },
    bestPractices: {
      dos: {
        id: ['Gunakan saat mengunduh, mengunggah, atau mengisi wizard formulir bertahap.'],
        en: ['Use for uploads, downloads, or multi-step form wizard steps.']
      },
      donts: {
        id: ['Jangan gunakan untuk nilai tetap yang tidak mengalami proses kemajuan (gunakan <meter>).'],
        en: ['Do not use for static gauges (use <meter> instead).']
      }
    },
    relatedElements: ['<meter>', '<output>']
  },
  {
    id: 'output',
    tag: '<output>',
    name: { id: 'Calculation or Form Result', en: 'Calculation or Form Result' },
    category: 'interactive',
    summary: {
      id: 'Menampung hasil dari perhitungan matematika pengguna atau tindakan formulir.',
      en: 'Represents the result of a user calculation or form input operation.'
    },
    description: {
      id: 'Elemen <output> mengaitkan hasil kalkulasi dengan input yang memengaruhinya melalui atribut `for`. Ini memberitahu teknologi asistif saat nilai hasil berubah.',
      en: 'The <output> element binds calculation outputs to governing inputs via the `for` attribute, alerting assistive tools of dynamic updates.'
    },
    whySemantic: {
      id: 'Berfungsi sebagai live region bagi screen reader sehingga perubahan hasil kalkulasi langsung diumumkan tanpa reload halaman.',
      en: 'Acts as an accessible live region so calculation updates are voiced immediately to assistive tech.'
    },
    divSoupComparison: {
      divSoupCode: `<div>Total: <span id="res">Rp 150.000</span></div>`,
      semanticCode: `<output name="total" for="item-qty item-price">Rp 150.000</output>`,
      benefits: {
        id: ['Keterikatan langsung dengan ID input melalui atribut for', 'Diakui resmi dalam Form API HTML5'],
        en: ['Explicit input relationship via for attribute', 'Official HTML5 Form API validation participant']
      }
    },
    attributes: [
      { name: 'for', type: 'specific', description: { id: 'Daftar ID elemen input yang menentukan nilai output ini.', en: 'Space-separated list of IDs of inputs contributing to calculation.' }, example: 'for="rangeA rangeB"' },
      { name: 'name', type: 'specific', description: { id: 'Nama elemen output untuk form data submission.', en: 'Name of the output element for form submission.' }, example: 'name="result"' }
    ],
    exampleCode: `<form oninput="result.value = parseInt(a.value) + parseInt(b.value)" class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm max-w-sm mx-auto">
  <div class="space-y-3">
    <div class="flex items-center gap-3">
      <label for="a" class="w-24 text-xs font-semibold text-slate-600 dark:text-slate-400">Nilai A (0-50):</label>
      <input type="range" id="a" value="25" min="0" max="50" class="flex-1">
    </div>
    <div class="flex items-center gap-3">
      <label for="b" class="w-24 text-xs font-semibold text-slate-600 dark:text-slate-400">Nilai B (0-50):</label>
      <input type="range" id="b" value="15" min="0" max="50" class="flex-1">
    </div>
    <div class="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center font-bold">
      <span class="text-slate-800 dark:text-white">Hasil Penjumlahan:</span>
      <output name="result" for="a b" class="text-xl text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded">40</output>
    </div>
  </div>
</form>`,
    accessibility: {
      role: 'status',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan perubahan nilai output secara langsung.',
        en: 'Screen readers enunciate updated calculated output values immediately.'
      }
    },
    seoImpact: {
      id: 'Membantu search engine memahami kalkulator interaktif dan widget interaktif web.',
      en: 'Aids crawlers in classifying interactive web calculators and tools.'
    },
    bestPractices: {
      dos: {
        id: ['Sertakan atribut for yang berisi ID input yang memengaruhi perhitungan.', 'Gunakan untuk kalkulator pajak, penggeser harga, atau konverter kurs.'],
        en: ['Supply space-separated input IDs in the for attribute.', 'Use for currency converters, price calculators, and sliders.']
      },
      donts: {
        id: ['Jangan gunakan untuk teks statis yang tidak pernah berubah nilainya.'],
        en: ['Do not use for static uncomputed text.']
      }
    },
    relatedElements: ['<form>', '<input>', '<meter>']
  }
];
