// Mobile nav toggle and small utilities
const toggle = document.querySelector('.nav-toggle') as HTMLElement | null;
const links = document.querySelector('.nav-links') as HTMLElement | null;

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Handle navigation links (both internal anchors and external pages)
document.querySelectorAll('a').forEach((element) => {
  const a = element as HTMLAnchorElement;
  a.addEventListener('click', (e: MouseEvent) => {
    const href = a.getAttribute('href');
    if (!href) return;

    // Close mobile menu when any nav link is clicked
    links?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');

    // Handle internal anchor links with smooth scrolling
    if (href.startsWith('#')) {
      const targetId = href;
      e.preventDefault();
      if (targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
});

// Dark Mode Toggle
function initDarkMode(): void {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

// Newsletter Signup
function initNewsletter(): void {
  const form = document.querySelector('#newsletter-form') as HTMLFormElement | null;
  const emailInput = document.querySelector('#newsletter-email') as HTMLInputElement | null;
  const message = document.getElementById('newsletter-message');

  if (!form || !emailInput || !message) return;

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!validateEmail(email)) {
      message.textContent = 'Please enter a valid email';
      message.classList.add('error');
      return;
    }

    message.textContent = 'Thank you for subscribing!';
    message.classList.remove('error');
    message.classList.add('success');
    emailInput.value = '';

    setTimeout(() => {
      message.textContent = '';
      message.classList.remove('success');
    }, 3000);
  });
}

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Data Visualization - Experience Timeline Stats
interface Stat {
  label: string;
  count: number;
  icon: string;
}

function initStatsVisualization(): void {
  const statsContainer = document.getElementById('stats-container');
  if (!statsContainer) return;

  const stats: Stat[] = [
    { label: 'Research Projects', count: 4, icon: '📊' },
    { label: 'Professional Roles', count: 3, icon: '💼' },
    { label: 'Awards & Achievements', count: 4, icon: '🏆' },
    { label: 'Programming Languages', count: 3, icon: '💻' }
  ];

  const statsHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-icon">${stat.icon}</div>
      <div class="stat-number">${stat.count}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');

  statsContainer.innerHTML = statsHTML;

  const statNumbers = statsContainer.querySelectorAll('.stat-number');
  statNumbers.forEach((el) => {
    animateCounter(el as HTMLElement);
  });
}

function animateCounter(element: HTMLElement): void {
  const target = parseInt(element.textContent || '0', 10);
  let current = 0;
  const increment = Math.ceil(target / 30);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = String(target);
      clearInterval(timer);
    } else {
      element.textContent = String(current);
    }
  }, 30);
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNewsletter();
  initStatsVisualization();
});
