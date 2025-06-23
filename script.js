document.addEventListener('DOMContentLoaded', function () {
  // Sistema de internacionalização
  let currentLanguage = localStorage.getItem('language') || 'pt';
  let translations = {};

  // Carrega as traduções
  async function loadTranslations(lang) {
    try {
      const response = await fetch(`lang/${lang}.json`);
      translations[lang] = await response.json();
    } catch (error) {
      console.error(`Erro ao carregar traduções para ${lang}:`, error);
    }
  }

  // Aplica as traduções aos elementos
  function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[currentLanguage] && translations[currentLanguage][key]) {
        element.textContent = translations[currentLanguage][key];
      }
    });

    // Aplica traduções para placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations[currentLanguage] && translations[currentLanguage][key]) {
        element.placeholder = translations[currentLanguage][key];
      }
    });
  }

  // Muda o idioma
  async function changeLanguage(lang) {
    if (!translations[lang]) {
      await loadTranslations(lang);
    }
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyTranslations();
  }

  // Inicializa o sistema de tradução
  async function initI18n() {
    await loadTranslations(currentLanguage);
    applyTranslations();
  }

  // Configura o seletor de idioma
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    langSelector.value = currentLanguage;
    langSelector.addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });
  }

  // Inicializa as traduções
  initI18n();

  // Controle de tema claro/escuro
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';

  console.log('Tema salvo:', savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    console.log('Mudando tema de', currentTheme, 'para', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute(
      'aria-label',
      theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro'
    );
    console.log('Ícone atualizado para tema:', theme);
  }

  // Menu mobile toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuToggle.addEventListener('click', function () {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    this.classList.toggle('active');
    navLinks.classList.toggle('active');

    const spans = this.querySelectorAll('span');
    if (!isExpanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Fecha menu ao clicar em link (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Atualiza ano no footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Fade-in quando elementos entram na viewport
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(element);
  });
});
