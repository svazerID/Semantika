import { SemanticElement } from '../../types';

export const formsAndTabularElements: SemanticElement[] = [
  {
    id: 'fieldset',
    tag: '<fieldset>',
    name: { id: 'Form Fieldset Group', en: 'Form Fieldset Group' },
    category: 'form',
    summary: {
      id: 'Mengelompokkan beberapa kontrol formulir dan label terkait ke dalam satu kesatuan tematik.',
      en: 'Groups several related form controls and labels into a coherent thematic set.'
    },
    description: {
      id: '<fieldset> sangat penting ketika memiliki kumpulan radio button atau checkbox (seperti pilihan metode pembayaran atau ukuran kaos). Dipasangkan dengan <legend> sebagai judul grup.',
      en: '<fieldset> is vital for clustering radio buttons or checkboxes (like payment methods or sizes). Always paired with <legend> as the set title.'
    },
    whySemantic: {
      id: 'Screen reader secara otomatis membacakan teks <legend> sebelum setiap opsi radio button, sehingga pengguna disabilitas mengetahui konteks pertanyaan pilihan tersebut.',
      en: 'Screen readers automatically announce the <legend> text prior to each radio option, preserving essential question context.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="radio-group">
  <p>Pilih Metode Pembayaran:</p>
  <input type="radio" id="qris" name="pay">
  <label for="qris">QRIS</label>
</div>`,
      semanticCode: `<fieldset>
  <legend>Pilih Metode Pembayaran:</legend>
  <input type="radio" id="qris" name="pay">
  <label for="qris">QRIS</label>
</fieldset>`,
      benefits: {
        id: ['Screen reader membaca judul legend di setiap pilihan radio', 'Dapat menonaktifkan seluruh input di dalamnya via atribut disabled pada fieldset', 'Menyediakan batas visual native yang rapi'],
        en: ['Screen reader voices legend caption on each radio option focus', 'Can disable entire fieldset via single disabled attribute', 'Native accessible border presentation']
      }
    },
    attributes: [
      { name: 'disabled', type: 'specific', description: { id: 'Menonaktifkan seluruh kontrol form di dalam fieldset sekaligus.', en: 'Disables all descendant form controls simultaneously.' }, example: 'disabled' }
    ],
    exampleCode: `<form class="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-md mx-auto">
  <fieldset class="border border-slate-300 dark:border-slate-700 p-4 rounded-lg">
    <legend class="px-2 text-sm font-bold text-slate-800 dark:text-slate-100">
      Pilihan Notifikasi Akun
    </legend>
    <div class="space-y-2 mt-2 text-sm">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="notif" value="email" checked class="text-blue-600">
        <span>Kirim notifikasi via Email</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="notif" value="sms" class="text-blue-600">
        <span>Kirim notifikasi via SMS</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="notif" value="none" class="text-blue-600">
        <span>Jangan kirim notifikasi</span>
      </label>
    </div>
  </fieldset>
</form>`,
    accessibility: {
      role: 'group',
      screenReaderDescription: {
        id: 'Screen reader melafalkan: "Pilihan Notifikasi Akun, grup. Radio button 1 dari 3, Kirim via Email, dipilih".',
        en: 'Announced as: "Account Notification Options, group. Radio button 1 of 3, Send via Email, checked".'
      }
    },
    seoImpact: {
      id: 'Membantu Googlebot memahami formulir kontak dan lead generation secara terstruktur.',
      en: 'Structures lead capture forms for crawler interpretation.'
    },
    bestPractices: {
      dos: {
        id: ['Selalu sertakan elemen <legend> sebagai anak pertama langsung.', 'Gunakan untuk setiap kelompok input radio atau kelompok checkbox.'],
        en: ['Always include <legend> as the first child.', 'Use for any group of radio buttons or related checkboxes.']
      },
      donts: {
        id: ['Jangan gunakan <fieldset> tanpa <legend> (akan kehilangan manfaat aksesibilitas utamanya).'],
        en: ['Never omit <legend> inside a <fieldset> (loses prime accessibility benefit).']
      }
    },
    relatedElements: ['<legend>', '<form>', '<label>', '<input>']
  },
  {
    id: 'legend',
    tag: '<legend>',
    name: { id: 'Fieldset Caption / Legend', en: 'Fieldset Caption / Legend' },
    category: 'form',
    summary: {
      id: 'Menentukan judul keterangan untuk elemen pembungkus <fieldset>.',
      en: 'Provides the caption/label for a parent <fieldset> container.'
    },
    description: {
      id: '<legend> harus diletakkan tepat sebagai elemen pertama di dalam <fieldset>. Menjadi judul resmi bagi screen reader saat bernavigasi di antara opsi input.',
      en: '<legend> must be placed as the immediate first child within <fieldset>. Acts as the accessible name for the entire group.'
    },
    whySemantic: {
      id: 'Menjamin pengguna tuna netra mengetahui pertanyaan dari pilihan tombol yang sedang mereka pilih.',
      en: 'Ensures visually impaired users hear the governing question when cycling through radio buttons.'
    },
    divSoupComparison: {
      divSoupCode: `<p class="group-title">Ukuran Kaos:</p>`,
      semanticCode: `<legend>Pilih Ukuran Kaos:</legend>`,
      benefits: {
        id: ['Diumumkan pada setiap radio option di screen reader', 'Tampil membelah garis border fieldset secara elegan'],
        en: ['Repeated on every radio button focus in assistive mode', 'Naturally overlays fieldset border line']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<fieldset class="border border-blue-300 dark:border-blue-900 p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
  <legend class="px-2 font-bold text-xs uppercase tracking-wider text-blue-700 dark:text-blue-300">
    Preferensi Bahasa
  </legend>
  <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
    Teks legend di atas dibacakan screen reader sebelum opsi radio di bawahnya.
  </p>
</fieldset>`,
    accessibility: {
      role: 'legend / group accessible name',
      screenReaderDescription: {
        id: 'Screen reader membaca teks legend sebagai label nama untuk seluruh grup fieldset.',
        en: 'Screen readers enunciate legend text as the group accessible name.'
      }
    },
    seoImpact: {
      id: 'Membantu mesin pencari mengklasifikasikan formulir kuis atau kalkulator.',
      en: 'Aids bot classification of form input clusters.'
    },
    bestPractices: {
      dos: {
        id: ['Buat teks legend jelas dan spesifik (cth: "Pilih Jenis Kelamin", bukan hanya "Pilihan").'],
        en: ['Make legend text descriptive and contextual.']
      },
      donts: {
        id: ['Jangan meletakkan <legend> di luar <fieldset>.'],
        en: ['Do not place <legend> outside <fieldset>.']
      }
    },
    relatedElements: ['<fieldset>', '<label>']
  },
  {
    id: 'datalist',
    tag: '<datalist>',
    name: { id: 'Autocomplete Datalist', en: 'Autocomplete Datalist' },
    category: 'form',
    summary: {
      id: 'Menyediakan daftar saran pelengkapan otomatis (autocomplete) untuk elemen <input>.',
      en: 'Provides a native autocomplete suggestion list for an <input> element.'
    },
    description: {
      id: 'Pengguna dapat mengetik secara bebas (seperti input teks biasa) atau memilih salah satu dari daftar saran yang muncul otomatis di bawah input tanpa JavaScript eksternal.',
      en: 'Users can freely type arbitrary text or choose from suggested options appearing natively below the input with zero custom JS.'
    },
    whySemantic: {
      id: 'Menyediakan fungsionalitas combobox bawaan browser yang ramah keyboard dan aksesibel bagi screen reader.',
      en: 'Provides a native keyboard-friendly and accessible combobox experience without complex JS dropdowns.'
    },
    divSoupComparison: {
      divSoupCode: `<input id="search">
<div class="custom-autocomplete-dropdown hidden">...</div>`,
      semanticCode: `<input list="browsers" id="browser-choice">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
</datalist>`,
      benefits: {
        id: ['Autocomplete native tanpa paket JS eksternal', 'Mendukung keyboard navigasi panah atas/bawah bawaan', 'Performa instan dan ringan'],
        en: ['Native autocomplete with zero JS bundle size', 'Built-in Arrow Up/Down keyboard selection', 'Instant performant execution']
      }
    },
    attributes: [
      { name: 'id', type: 'global', description: { id: 'ID yang harus dicocokkan dengan atribut list pada elemen <input>.', en: 'ID linked to the input list attribute.' }, example: 'id="city-list"', required: true }
    ],
    exampleCode: `<div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm max-w-sm mx-auto">
  <label for="framework-input" class="block font-semibold mb-1 text-slate-800 dark:text-white">
    Ketik atau Pilih Framework:
  </label>
  <input list="frameworks" id="framework-input" name="framework" 
         placeholder="Ketik 'R' atau 'V'..." 
         class="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100">

  <datalist id="frameworks">
    <option value="React"></option>
    <option value="Vue.js"></option>
    <option value="Svelte"></option>
    <option value="Next.js"></option>
    <option value="Nuxt"></option>
  </datalist>
</div>`,
    accessibility: {
      role: 'combobox with listbox suggestions',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan jumlah saran yang tersedia saat pengguna mengetik.',
        en: 'Screen readers announce number of autocomplete suggestions as user types.'
      }
    },
    seoImpact: {
      id: 'Membantu mendefinisikan kamus opsi nilai yang diantisipasi pada formulir.',
      en: 'Supplies search crawlers with predefined option sets for form schema understanding.'
    },
    bestPractices: {
      dos: {
        id: ['Pastikan atribut id pada <datalist> sama persis dengan atribut list pada <input>.', 'Gunakan untuk opsi yang fleksibel di mana pengguna tetap boleh mengetik di luar daftar.'],
        en: ['Ensure datalist id strictly matches the input list attribute.', 'Use when arbitrary input is acceptable alongside suggestions.']
      },
      donts: {
        id: ['Jangan gunakan <datalist> jika pengguna wajib memilih dari pilihan terbatas (gunakan <select> untuk pilihan eksklusif).'],
        en: ['Do not use <datalist> if user input must strictly be one of predefined options (use <select>).']
      }
    },
    relatedElements: ['<input>', '<select>', '<option>']
  },
  {
    id: 'table',
    tag: '<table>',
    name: { id: 'Tabular Data Table', en: 'Tabular Data Table' },
    category: 'tabular',
    summary: {
      id: 'Menampilkan data tabular dalam bentuk baris dan kolom yang memiliki relasi dua dimensi.',
      en: 'Presents two-dimensional relational data in rows and columns.'
    },
    description: {
      id: 'Tabel HTML wajib menggunakan elemen pelengkap: <caption> (judul tabel), <thead> (baris kepala), <tbody> (badan data), dan <th> dengan atribut scope="col" atau scope="row".',
      en: 'HTML tables require structure: <caption> (accessible title), <thead>, <tbody>, and <th> header cells with scope attributes.'
    },
    whySemantic: {
      id: 'Screen reader dapat membaca koordinat sel (cth: "Kolom Harga, Baris 2: Rp 50.000"), mencegah disorientasi fatal pada pengguna tunanetra.',
      en: 'Screen readers read exact cell coordinates (e.g. "Column Price, Row 2: $50"), preventing total disorientation.'
    },
    divSoupComparison: {
      divSoupCode: `<div class="table-grid">
  <div class="row header"><div class="cell">Nama</div></div>
  <div class="row"><div class="cell">Budi</div></div>
</div>`,
      semanticCode: `<table>
  <caption>Daftar Karyawan</caption>
  <thead>
    <tr><th scope="col">Nama</th></tr>
  </thead>
  <tbody>
    <tr><td>Budi</td></tr>
  </tbody>
</table>`,
      benefits: {
        id: ['Screen reader mengumumkan koordinat baris & kolom', 'Bisa dinavigasi dengan shortcut tabel di NVDA/JAWS', 'Mendukung caption judul aksesibel'],
        en: ['Screen readers announce row/col coordinate context', 'Navigable via dedicated screen reader table shortcuts', 'Built-in accessible caption element']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<div class="overflow-x-auto p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
  <table class="w-full text-left text-sm border-collapse">
    <caption class="text-xs font-bold text-slate-500 mb-2 text-left">
      Tabel 1: Perbandingan Performa Semantic vs Div Soup
    </caption>
    <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
      <tr>
        <th scope="col" class="p-3 font-semibold">Kriteria</th>
        <th scope="col" class="p-3 font-semibold">Semantic HTML</th>
        <th scope="col" class="p-3 font-semibold">Div Soup</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
      <tr>
        <th scope="row" class="p-3 font-medium text-slate-800 dark:text-slate-100">Screen Reader</th>
        <td class="p-3 text-emerald-600 font-semibold">Navigasi Sempurna</td>
        <td class="p-3 text-rose-600">Membingungkan</td>
      </tr>
      <tr>
        <th scope="row" class="p-3 font-medium text-slate-800 dark:text-slate-100">SEO Score</th>
        <td class="p-3 text-emerald-600 font-semibold">Tinggi</td>
        <td class="p-3 text-rose-600">Rendah</td>
      </tr>
    </tbody>
  </table>
</div>`,
    accessibility: {
      role: 'table',
      screenReaderDescription: {
        id: 'Screen reader mengumumkan: "Tabel dengan 3 kolom dan 3 baris. Judul: Tabel 1...".',
        en: 'Screen reader announces: "Table with 3 columns and 3 rows. Caption: Table 1...".'
      }
    },
    seoImpact: {
      id: 'Google mengekstrak tabel HTML5 yang rapi langsung ke Google Featured Snippets tabel!',
      en: 'Google pulls semantic HTML5 tables directly into Google SERP Featured Snippets!'
    },
    bestPractices: {
      dos: {
        id: ['Wajib gunakan <caption> untuk judul tabel.', 'Gunakan <th scope="col"> untuk kolom dan <th scope="row"> untuk baris.'],
        en: ['Always include <caption>.', 'Specify scope="col" or scope="row" on all <th> cells.']
      },
      donts: {
        id: ['JANGAN PERNAH gunakan <table> untuk tata letak halaman (CSS layout)! Gunakan CSS Grid atau Flexbox.'],
        en: ['NEVER use <table> for general page layout. Use CSS Grid or Flexbox instead.']
      }
    },
    relatedElements: ['<caption>', '<thead>', '<tbody>', '<th>', '<td>']
  },
  {
    id: 'caption',
    tag: '<caption>',
    name: { id: 'Table Caption', en: 'Table Caption' },
    category: 'tabular',
    summary: {
      id: 'Menentukan judul atau keterangan ringkas untuk elemen <table>.',
      en: 'Specifies the accessible title or summary caption for a <table>.'
    },
    description: {
      id: '<caption> harus menjadi anak pertama langsung dari <table>. Menjadi nama aksesibel (accessible name) bagi tabel yang dibacakan screen reader sebelum baris data diperiksa.',
      en: '<caption> must be the immediate first child of <table>. It serves as the table’s accessible name.'
    },
    whySemantic: {
      id: 'Memberikan gambaran singkat mengenai tujuan isi tabel sebelum pengguna assistive tech membaca puluhan baris data.',
      en: 'Gives assistive users immediate context about table contents before navigating dozens of cells.'
    },
    divSoupComparison: {
      divSoupCode: `<p class="table-header">Data Penjualan 2026</p>
<table>...</table>`,
      semanticCode: `<table>
  <caption>Data Penjualan Q1 2026</caption>
  ...
</table>`,
      benefits: {
        id: ['Terikat secara semantik ke tabel', 'Dibaca otomatis oleh screen reader saat tabel ditemukan'],
        en: ['Semantically linked to the table', 'Read automatically upon finding the table in screen reader']
      }
    },
    attributes: [
      { name: 'global', type: 'global', description: { id: 'Atribut global.', en: 'Standard global attributes.' } }
    ],
    exampleCode: `<table class="w-full text-xs text-left border">
  <caption class="p-2 font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-b">
    Jadwal Rilis Versi 2.0
  </caption>
  <tr><td class="p-2">Minggu 1: Alpha Testing</td></tr>
  <tr><td class="p-2">Minggu 2: Public Beta</td></tr>
</table>`,
    accessibility: {
      role: 'caption / accessible table name',
      screenReaderDescription: {
        id: 'Screen reader membacakan caption sebagai identitas tabel.',
        en: 'Screen reader voices caption as the table identity.'
      }
    },
    seoImpact: {
      id: 'Membantu Google mengidentifikasi topik data angka dalam tabel.',
      en: 'Identifies tabular data topic for search algorithms.'
    },
    bestPractices: {
      dos: {
        id: ['Letakkan <caption> tepat setelah tag pembuka <table>.'],
        en: ['Place <caption> immediately after the opening <table> tag.']
      },
      donts: {
        id: ['Jangan taruh <caption> di tengah atau akhir tabel.'],
        en: ['Do not place <caption> inside <tbody> or at table end.']
      }
    },
    relatedElements: ['<table>', '<th>', '<td>']
  }
];
