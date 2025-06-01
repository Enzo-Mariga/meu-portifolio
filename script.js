// script.js
document.addEventListener('DOMContentLoaded', function() {
  // 1. Controle do Tema Claro/Escuro
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Aplicar tema salvo
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  // Alternar tema ao clicar no botão
  themeToggle.addEventListener('click', toggleTheme);
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }
  
  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', 
      theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro');
  }

  // 2. Menu Mobile
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    this.setAttribute('aria-expanded', !isExpanded);
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animar ícone do hamburguer
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

  // Fechar menu ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // 3. Scroll suave para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Ajuste para o header fixo
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Formulário de contato
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData.entries());
      
      // Aqui você pode adicionar o código para enviar o formulário
      // Para um servidor, EmailJS, ou qualquer outro serviço
      console.log('Dados do formulário:', formObject);
      
      // Feedback visual para o usuário
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;
      
      // Simulação de envio (substitua por código real)
      setTimeout(() => {
        submitButton.textContent = 'Mensagem Enviada!';
        submitButton.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          submitButton.style.backgroundColor = '';
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // 5. Atualizar ano no footer automaticamente
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 6. Efeito de fade-in quando elementos entram na viewport
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

  // 7. Adicionar classe ao scroll para header
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      header.style.padding = '0.5rem 2rem';
    } else {
      header.style.boxShadow = '';
      header.style.padding = '1rem 2rem';
    }
  });
});