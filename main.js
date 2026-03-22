// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Theme switcher
const THEMES = {
  OCEAN: {
    '--bg':      '#080f11',
    '--surface': '#0d1a1e',
    '--border':  '#122228',
    '--border2': '#1a3040',
    '--accent':  '#2a8fa0',
    '--text':    '#f0ede8',
    '--muted':   '#8aaa9a',
    '--dimmed':  '#3a6a6e',
    '--faint':   '#2a5060',
    '--green':   '#bada55',
  },
  MOSS: {
    '--bg':      '#0d1a0f',
    '--surface': '#142318',
    '--border':  '#1e3022',
    '--border2': '#243828',
    '--accent':  '#bada55',
    '--text':    '#f0ede8',
    '--muted':   '#8aaa8a',
    '--dimmed':  '#3a5a3e',
    '--faint':   '#2a4a2e',
    '--green':   '#bada55',
  },
  ICE: {
    '--bg':      '#f8fdff',
    '--surface': '#eaf6fa',
    '--border':  '#c8e8f4',
    '--border2': '#a8d4e8',
    '--accent':  '#1a8aa8',
    '--text':    '#0a1a1e',
    '--muted':   '#4a7a88',
    '--dimmed':  '#7aaab8',
    '--faint':   '#a8c8d8',
    '--green':   '#bada55',
  },
  SOIL: {
    '--bg':      '#110c08',
    '--surface': '#1a1208',
    '--border':  '#241a10',
    '--border2': '#302214',
    '--accent':  '#8b5e3c',
    '--text':    '#f0ede8',
    '--muted':   '#9a8878',
    '--dimmed':  '#5a4838',
    '--faint':   '#3a2818',
    '--green':   '#bada55',
  },
  GLAM: {
    '--bg':      '#1a0d14',
    '--surface': '#241220',
    '--border':  '#301828',
    '--border2': '#3c2030',
    '--accent':  '#d47fa6',
    '--text':    '#f0ede8',
    '--muted':   '#9a7888',
    '--dimmed':  '#5a3848',
    '--faint':   '#3a2030',
    '--green':   '#bada55',
  },
  SOLAR: {
    '--bg':      '#1a1608',
    '--surface': '#252010',
    '--border':  '#302a14',
    '--border2': '#3c3418',
    '--accent':  '#d4aa3a',
    '--text':    '#f0ede8',
    '--muted':   '#9a9878',
    '--dimmed':  '#5a5838',
    '--faint':   '#3a3418',
    '--green':   '#bada55',
  },
  CRIMSON: {
    '--bg':      '#1a080a',
    '--surface': '#250d10',
    '--border':  '#321216',
    '--border2': '#3e181c',
    '--accent':  '#c45c6a',
    '--text':    '#f0ede8',
    '--muted':   '#9a7878',
    '--dimmed':  '#5a3838',
    '--faint':   '#3a2020',
    '--green':   '#bada55',
  },
  GRAPHITE: {
    '--bg':      '#0f0f0f',
    '--surface': '#161616',
    '--border':  '#202020',
    '--border2': '#2a2a2a',
    '--accent':  '#8a8a8a',
    '--text':    '#f0ede8',
    '--muted':   '#909090',
    '--dimmed':  '#606060',
    '--faint':   '#404040',
    '--green':   '#bada55',
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
