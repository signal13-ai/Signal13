// ═══════════════════════════════════════════════════
// SIGNAL — script.js
// ═══════════════════════════════════════════════════

// ─── КОНТЕНТ ПО ЯЗЫКАМ ─────────────────────────────
// Меняй тексты здесь

const i18n = {
  ru: {
    heroTitle:    'Видео&nbsp;· Статика<br><em>· AI · Кино</em>',
    heroQuote:    'Мы внедрили ИИ в кино.<br>Кино нам этого ещё не простило.',
    heroCta:      'смотреть работы',
    labelWorks:   '— РАБОТЫ',
    labelAbout:   '— О НАС',
    labelContact: '// СВЯЗАТЬСЯ',
    filmLabel:    'фильмография · Elizaveta Shefova',
    aboutText:    'SIGNAL — творческий коллектив. Производство видео и интеграция ИИ в кино — и не только. Бэкграунд: 15 лет профессионального кинопроизводства. В какой-то момент мы тоже решили не отставать от происходящего.',
  },
  en: {
    heroTitle:    'Video&nbsp;· Stills<br><em>· AI · Cinema</em>',
    heroQuote:    'We put AI into cinema.<br>Cinema has not forgiven us yet.',
    heroCta:      'view works',
    labelWorks:   '— WORKS',
    labelAbout:   '— ABOUT',
    labelContact: '// CONTACT',
    filmLabel:    'filmography · Elizaveta Shefova',
    aboutText:    'SIGNAL — creative collective. Video production and AI integration in cinema — and beyond. Background: 15 years in professional filmmaking. At some point we decided to keep up with what\'s happening.',
  },
  de: {
    heroTitle:    'Video&nbsp;· Fotografie<br><em>· KI · Kino</em>',
    heroQuote:    'Wir haben KI ins Kino gebracht.<br>Das Kino hat uns das noch nicht verziehen.',
    heroCta:      'arbeiten ansehen',
    labelWorks:   '— ARBEITEN',
    labelAbout:   '— ÜBER UNS',
    labelContact: '// KONTAKT',
    filmLabel:    'Filmografie · Elizaveta Shefova',
    aboutText:    'SIGNAL — kreatives Kollektiv. Videoproduktion und KI-Integration im Kino — und darüber hinaus. Hintergrund: 15 Jahre professionelles Filmschaffen. Irgendwann haben wir beschlossen, nicht zurückzubleiben.',
  }
};

// ─── ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ ──────────────────────────

function setLang(lang) {
  const t = i18n[lang] || i18n.ru;

  // html lang атрибут для SEO и скринридеров
  document.documentElement.lang = lang;

  // Обновляем блоки через data-атрибуты
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const text = el.dataset[lang];
    if (text !== undefined) el.innerHTML = text;
  });

  // Обновляем навигационные ссылки
  document.querySelectorAll('.nav-links a[data-' + lang + ']').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Обновляем заголовки и метки из i18n
  const heroTitle = document.getElementById('hero-title');
  const heroQuote = document.getElementById('hero-quote');
  const heroCta   = document.querySelector('#hero-cta span');
  const labelWorks   = document.getElementById('label-works');
  const labelAbout   = document.getElementById('label-about');
  const labelContact = document.getElementById('label-contact');

  if (heroTitle)    heroTitle.innerHTML     = t.heroTitle;
  if (heroQuote)    heroQuote.innerHTML     = t.heroQuote;
  if (heroCta)      heroCta.textContent     = t.heroCta;
  if (labelWorks)   labelWorks.textContent  = t.labelWorks;
  if (labelAbout)   labelAbout.textContent  = t.labelAbout;
  if (labelContact) labelContact.textContent= t.labelContact;

  // About text и film label
  const aboutText = document.querySelector('.about-text');
  const filmLabel = document.querySelector('.film-label');
  if (aboutText) aboutText.innerHTML = t.aboutText;
  if (filmLabel) filmLabel.textContent = t.filmLabel;

  // Кнопки языков
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  // Сохраняем выбор
  try { localStorage.setItem('signal-lang', lang); } catch(e) {}
}

// Инициализация языка
(function() {
  let lang = 'ru';
  try { lang = localStorage.getItem('signal-lang') || 'ru'; } catch(e) {}
  if (!i18n[lang]) lang = 'ru';
  setLang(lang);
})();

// Кнопки языков
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});


// ─── МОБИЛЬНОЕ МЕНЮ ────────────────────────────────

const burger   = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

function toggleMenu(open) {
  burger.classList.toggle('open', open);
  navLinks.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
}

if (burger) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Закрываем при клике на ссылку
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Закрываем при клике вне меню
  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      toggleMenu(false);
    }
  });
}


// ─── АНИМАЦИЯ ПОЯВЛЕНИЯ ────────────────────────────
// Элементы плавно появляются при прокрутке

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // один раз и хватит
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.video-card, .film-table tr, .about-text').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}
