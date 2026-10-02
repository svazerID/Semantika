import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'structure',
    scenario: {
      id: 'Sebuah website portal berita ingin menampilkan postingan artikel berita independen yang nantinya dapat disindikasi ke RSS feed dan tampil bersih di Reader Mode Safari/Firefox.',
      en: 'A news portal wants to display independent news articles that can be syndicated via RSS and rendered cleanly in Safari/Firefox Reader Mode.'
    },
    question: {
      id: 'Elemen HTML5 mana yang paling tepat untuk membungkus setiap berita independen tersebut?',
      en: 'Which HTML5 element is most appropriate to enclose each independent news story?'
    },
    codeSnippet: `<!-- Manakah tag pembungkus yang tepat? -->
<___>
  <h2>Teknologi AI Terbaru 2026</h2>
  <p>Perkembangan pesat kecerdasan buatan...</p>
</___>`,
    options: [
      { id: 'opt_section', text: { id: '<section>', en: '<section>' } },
      { id: 'opt_article', text: { id: '<article>', en: '<article>' } },
      { id: 'opt_main', text: { id: '<main>', en: '<main>' } },
      { id: 'opt_aside', text: { id: '<aside>', en: '<aside>' } }
    ],
    correctOptionId: 'opt_article',
    explanation: {
      id: '<article> dirancang khusus untuk komposisi mandiri yang tetap bermakna utuh jika dipisahkan dari halaman (seperti berita, postingan blog, atau kartu produk). Ini juga memicu Reader Mode di browser.',
      en: '<article> is specifically designed for self-contained compositions that retain complete meaning in isolation (news items, blog posts, cards) and triggers browser Reader Mode.'
    }
  },
  {
    id: 'q2',
    category: 'text',
    scenario: {
      id: 'Anda sedang membuat halaman artikel blog dan ingin menampilkan tanggal publikasi "3 hari yang lalu" sekaligus memastikan Google Search mengerti tanggal pastinya (ISO standard).',
      en: 'You are building a blog post and displaying relative publication date "3 days ago" while ensuring Google Search parses the exact ISO date.'
    },
    question: {
      id: 'Bagaimana penulisan tag semantik yang benar?',
      en: 'What is the correct semantic tag implementation?'
    },
    options: [
      { id: 'opt_span', text: { id: '<span data-date="2026-10-02">3 hari lalu</span>', en: '<span data-date="2026-10-02">3 days ago</span>' } },
      { id: 'opt_time_valid', text: { id: '<time datetime="2026-09-29">3 hari lalu</time>', en: '<time datetime="2026-09-29">3 days ago</time>' } },
      { id: 'opt_date', text: { id: '<date value="2026-09-29">3 hari lalu</date>', en: '<date value="2026-09-29">3 days ago</date>' } },
      { id: 'opt_p_time', text: { id: '<p class="time">3 hari lalu</p>', en: '<p class="time">3 days ago</p>' } }
    ],
    correctOptionId: 'opt_time_valid',
    explanation: {
      id: 'Tag <time> dengan atribut "datetime" (bukan atribut acak) adalah standar resmi HTML5 untuk stempel waktu yang dapat dipahami oleh mesin dan mesin pencari.',
      en: 'The <time> element with the standardized "datetime" attribute is the official HTML5 way to provide machine-readable timestamps.'
    }
  },
  {
    id: 'q3',
    category: 'interactive',
    scenario: {
      id: 'Tim desain meminta komponen FAQ akordeon yang bisa diklik untuk membuka/menutup jawaban, tanpa perlu menambah library JavaScript berukuran besar.',
      en: 'The design team requests an FAQ accordion widget to expand/collapse answers with zero external JavaScript libraries.'
    },
    question: {
      id: 'Kombinasi elemen HTML5 native manakah yang dapat mewujudkan ini tanpa JavaScript?',
      en: 'Which pair of native HTML5 elements achieves this accordion behavior with zero JavaScript?'
    },
    options: [
      { id: 'opt_dialog', text: { id: '<dialog> dan <header>', en: '<dialog> and <header>' } },
      { id: 'opt_details_summary', text: { id: '<details> dan <summary>', en: '<details> and <summary>' } },
      { id: 'opt_section_h3', text: { id: '<section> dan <h3>', en: '<section> and <h3>' } },
      { id: 'opt_accordion', text: { id: '<accordion> dan <panel>', en: '<accordion> and <panel>' } }
    ],
    correctOptionId: 'opt_details_summary',
    explanation: {
      id: '<details> membungkus konten yang dapat disembunyikan, dan <summary> menjadi judul yang dapat diklik serta mendukung navigasi keyboard (Enter/Space) secara native.',
      en: '<details> wraps collapsible content, and <summary> acts as the clickable label with native keyboard toggle support.'
    }
  },
  {
    id: 'q4',
    category: 'media',
    scenario: {
      id: 'Sebuah artikel riset menampilkan diagram alur arsitektur dengan deskripsi keterangan "Gambar 2.1: Arsitektur Cloud". Deskripsi ini harus terikat secara semantik ke diagram.',
      en: 'A research paper displays an architecture flowchart with caption "Figure 2.1: Cloud Architecture". This caption must be semantically linked to the diagram.'
    },
    question: {
      id: 'Elemen semantic manakah yang paling tepat?',
      en: 'Which semantic elements are best suited?'
    },
    options: [
      { id: 'opt_fig_cap', text: { id: '<figure> yang memuat <img> dan <figcaption>', en: '<figure> containing <img> and <figcaption>' } },
      { id: 'opt_div_p', text: { id: '<div class="figure"> dengan <p class="caption">', en: '<div class="figure"> with <p class="caption">' } },
      { id: 'opt_aside_cap', text: { id: '<aside> dengan <caption>', en: '<aside> with <caption>' } },
      { id: 'opt_picture_only', text: { id: '<picture> dengan atribut title', en: '<picture> with title attribute' } }
    ],
    correctOptionId: 'opt_fig_cap',
    explanation: {
      id: '<figure> dan <figcaption> mengikat media secara semantik. Screen reader secara otomatis membaca figcaption sebagai accessible description bagi figure tersebut.',
      en: '<figure> and <figcaption> bind media and description semantically, allowing assistive tech to read figcaption as the accessible description.'
    }
  },
  {
    id: 'q5',
    category: 'structure',
    scenario: {
      id: 'Dalam sebuah halaman web, Anda ingin meletakkan tautan navigasi utama situs, banner logo, dan kotak pencarian global di bagian atas.',
      en: 'At the top of a webpage, you want to house the primary site links, logo banner, and global search box.'
    },
    question: {
      id: 'Tag semantik apa yang berperan sebagai landmark banner di tingkat halaman?',
      en: 'What semantic tag serves as the banner landmark at page root?'
    },
    options: [
      { id: 'opt_top', text: { id: '<top>', en: '<top>' } },
      { id: 'opt_nav', text: { id: '<nav>', en: '<nav>' } },
      { id: 'opt_header', text: { id: '<header>', en: '<header>' } },
      { id: 'opt_section', text: { id: '<section>', en: '<section>' } }
    ],
    correctOptionId: 'opt_header',
    explanation: {
      id: '<header> di tingkat halaman body otomatis memiliki ARIA role "banner". Di dalamnya biasanya diletakkan logo dan elemen <nav> untuk navigasi.',
      en: '<header> at the body level implicitly receives the "banner" ARIA landmark role, encapsulating branding and primary <nav>.'
    }
  },
  {
    id: 'q6',
    category: 'form',
    scenario: {
      id: 'Anda memiliki formulir pembayaran dengan 3 pilihan radio button: Kartu Kredit, Transfer Bank, dan Dompet Digital.',
      en: 'You have a checkout form with 3 radio button options: Credit Card, Bank Transfer, and E-Wallet.'
    },
    question: {
      id: 'Bagaimana membungkus radio button tersebut agar pengguna screen reader mendengar pertanyaan pilihan di setiap tombol radio?',
      en: 'How should you group these radio buttons so screen reader users hear the governing question on every option?'
    },
    options: [
      { id: 'opt_fieldset_legend', text: { id: '<fieldset> dengan <legend>Metode Pembayaran</legend>', en: '<fieldset> with <legend>Payment Method</legend>' } },
      { id: 'opt_div_label', text: { id: '<div role="radiogroup"><p>Metode Pembayaran</p>', en: '<div role="radiogroup"><p>Payment Method</p>' } },
      { id: 'opt_form_h4', text: { id: '<form> dengan <h4>Metode Pembayaran</h4>', en: '<form> with <h4>Payment Method</h4>' } },
      { id: 'opt_section_label', text: { id: '<section> dengan <label>Metode Pembayaran</label>', en: '<section> with <label>Payment Method</label>' } }
    ],
    correctOptionId: 'opt_fieldset_legend',
    explanation: {
      id: '<fieldset> dan <legend> adalah standar emas aksesibilitas formulir. Screen reader akan membacakan teks <legend> sebelum menyebutkan label setiap radio button yang sedang difokuskan.',
      en: '<fieldset> and <legend> ensure screen readers announce the group legend heading when focusing any child radio button.'
    }
  },
  {
    id: 'q7',
    category: 'interactive',
    scenario: {
      id: 'Anda membuat panel dashboard server dan ingin menampilkan penggunaan memori RAM (misalnya 6.4 GB dari total 8.0 GB).',
      en: 'You are building a server dashboard and want to display current RAM memory usage (e.g. 6.4 GB out of 8.0 GB total).'
    },
    question: {
      id: 'Tag semantik mana yang paling tepat untuk mengukur nilai skalar statis dalam batas rentang tertentu?',
      en: 'Which semantic tag is intended for measuring a scalar gauge within known min/max bounds?'
    },
    options: [
      { id: 'opt_progress', text: { id: '<progress>', en: '<progress>' } },
      { id: 'opt_meter', text: { id: '<meter>', en: '<meter>' } },
      { id: 'opt_output', text: { id: '<output>', en: '<output>' } },
      { id: 'opt_data', text: { id: '<data>', en: '<data>' } }
    ],
    correctOptionId: 'opt_meter',
    explanation: {
      id: '<meter> digunakan untuk pengukuran skalar dengan rentang tetap yang diketahui (kapasitas disk, memori, suhu). Sebaliknya, <progress> digunakan untuk tugas yang sedang berproses (seperti download file).',
      en: '<meter> is for scalar measurements within known limits. <progress> is specifically for in-progress tasks like downloads.'
    }
  }
];
