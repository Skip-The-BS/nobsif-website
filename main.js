const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pendingHomepageHashKey = 'pendingHomepageHash';

// Scroll reveal
if (prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Active nav link on scroll
const sections = ['features', 'pricing'];
const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');

if (!prefersReducedMotion) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '/#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

// Active state for current page link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  }
});

// Smooth redirected section jumps back onto the homepage.
if (window.location.pathname === '/') {
  const pendingHash = sessionStorage.getItem(pendingHomepageHashKey);
  if (pendingHash && pendingHash.startsWith('/#')) {
    const target = document.getElementById(pendingHash.slice(2));
    sessionStorage.removeItem(pendingHomepageHashKey);
    if (target) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        history.replaceState(null, '', pendingHash);
      });
    }
  }
}

// Hybrid nav: smooth scroll on homepage, navigate on other pages
document.querySelectorAll('a[href^="/#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const id = href.slice(2);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      history.pushState(null, '', href);
      return;
    }

    sessionStorage.setItem(pendingHomepageHashKey, href);
    e.preventDefault();
    window.location.href = '/';
  });
});

// Burger menu
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

// Theme switcher
const THEMES = {
  OCEAN: {
    '--bg':           '#080f11',
    '--surface':      '#0d1a1e',
    '--border':       '#122228',
    '--border2':      '#1a3040',
    '--accent':       '#2a8fa0',
    '--accent-text':  '#080f11',
    '--text':         '#f0ede8',
    '--muted':        '#8aaa9a',
    '--dimmed':       '#67877f',
    '--faint':        '#2a5060',
    '--green':        '#bada55',
  },
  ICE: {
    '--bg':           '#f8fdff',
    '--surface':      '#eaf6fa',
    '--border':       '#c8e8f4',
    '--border2':      '#a8d4e8',
    '--accent':       '#1a8aa8',
    '--accent-text':  '#09181c',
    '--text':         '#0a1a1e',
    '--muted':        '#487684',
    '--dimmed':       '#5a747e',
    '--faint':        '#a8c8d8',
    '--green':        '#bada55',
  },
  MOSS: {
    '--bg':           '#0d1a0f',
    '--surface':      '#142318',
    '--border':       '#1e3022',
    '--border2':      '#243828',
    '--accent':       '#bada55',
    '--accent-text':  '#0d1a0f',
    '--text':         '#f0ede8',
    '--muted':        '#8aaa8a',
    '--dimmed':       '#6f8f70',
    '--faint':        '#2a4a2e',
    '--green':        '#bada55',
  },
  SOIL: {
    '--bg':           '#110c08',
    '--surface':      '#1a1208',
    '--border':       '#241a10',
    '--border2':      '#302214',
    '--accent':       '#8b5e3c',
    '--accent-text':  '#f0ede8',
    '--text':         '#f0ede8',
    '--muted':        '#9a8878',
    '--dimmed':       '#8c7a6a',
    '--faint':        '#3a2818',
    '--green':        '#bada55',
  },
  GLAM: {
    '--bg':           '#1a0d14',
    '--surface':      '#241220',
    '--border':       '#301828',
    '--border2':      '#3c2030',
    '--accent':       '#d47fa6',
    '--accent-text':  '#1a0d14',
    '--text':         '#f0ede8',
    '--muted':        '#9a7888',
    '--dimmed':       '#997787',
    '--faint':        '#3a2030',
    '--green':        '#bada55',
  },
  SOLAR: {
    '--bg':           '#1a1608',
    '--surface':      '#252010',
    '--border':       '#302a14',
    '--border2':      '#3c3418',
    '--accent':       '#d4aa3a',
    '--accent-text':  '#1a1608',
    '--text':         '#f0ede8',
    '--muted':        '#9a9878',
    '--dimmed':       '#8b8969',
    '--faint':        '#3a3418',
    '--green':        '#bada55',
  },
  CRIMSON: {
    '--bg':           '#1a080a',
    '--surface':      '#250d10',
    '--border':       '#321216',
    '--border2':      '#3e181c',
    '--accent':       '#c45c6a',
    '--accent-text':  '#1a080a',
    '--text':         '#f0ede8',
    '--muted':        '#9a7878',
    '--dimmed':       '#987676',
    '--faint':        '#3a2020',
    '--green':        '#bada55',
  },
  GRAPHITE: {
    '--bg':           '#0f0f0f',
    '--surface':      '#161616',
    '--border':       '#202020',
    '--border2':      '#2a2a2a',
    '--accent':       '#8a8a8a',
    '--accent-text':  '#0f0f0f',
    '--text':         '#f0ede8',
    '--muted':        '#909090',
    '--dimmed':       '#7f7f7f',
    '--faint':        '#404040',
    '--green':        '#bada55',
  },
};

function applyTheme(name) {
  const theme = THEMES[name];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme).forEach(([k, v]) => root.style.setProperty(k, v));

  document.querySelectorAll('.swatch-dot').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === name);
  });

  localStorage.setItem('nobsif-theme', name);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.swatch-dot').forEach(el => {
    el.addEventListener('click', () => applyTheme(el.dataset.theme));
  });

  const saved = localStorage.getItem('nobsif-theme') || 'OCEAN';
  applyTheme(saved);
});
