// Mobile nav toggle and small utilities
const toggle: HTMLButtonElement | null = document.querySelector('.nav-toggle');
const links: HTMLElement | null = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', (): void => {
    const isOpen: boolean = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Handle navigation links (both internal anchors and external pages)
document.querySelectorAll('a').forEach((element: Element): void => {
  const a = element as HTMLAnchorElement;
  a.addEventListener('click', (e: Event): void => {
    const href: string | null = a.getAttribute('href');
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
        const el: HTMLElement | null = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
});

// Dark Mode Toggle
function initDarkMode(): void {
  const darkModeToggle: HTMLElement | null = document.getElementById('dark-mode-toggle');
  const htmlElement: HTMLElement = document.documentElement;
  
  const savedTheme: string | null = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    htmlElement.classList.add('dark-mode');
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', (): void => {
      htmlElement.classList.toggle('dark-mode');
      const isDark: boolean = htmlElement.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
}

// Search Functionality
function initSearch(): void {
  const searchInput: HTMLInputElement | null = document.querySelector('#search-input') as HTMLInputElement;
  const searchResults: HTMLElement | null = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) return;
  
  const experienceItems: NodeListOf<Element> = document.querySelectorAll('[data-searchable="true"]');
  
  searchInput.addEventListener('input', (e: Event): void => {
    const query: string = (e.target as HTMLInputElement).value.toLowerCase().trim();
    
    if (!query) {
      experienceItems.forEach(item => item.classList.remove('hidden'));
      searchResults.innerHTML = '';
      return;
    }
    
    let matchCount: number = 0;
    const matches: string[] = [];
    
    experienceItems.forEach(item => {
      const text: string = item.textContent?.toLowerCase() || '';
      const title: string = item.querySelector('.title')?.textContent || '';
      
      if (text.includes(query)) {
        item.classList.remove('hidden');
        matches.push(title);
        matchCount++;
      } else {
        item.classList.add('hidden');
      }
    });
    
    if (matchCount === 0) {
      searchResults.innerHTML = '<p class="no-results">No results found</p>';
    } else {
      searchResults.innerHTML = `<p class="search-info">Found ${matchCount} result${matchCount !== 1 ? 's' : ''}</p>`;
    }
  });
}

// Newsletter Signup
function initNewsletter(): void {
  const form: HTMLFormElement | null = document.querySelector('#newsletter-form') as HTMLFormElement;
  const emailInput: HTMLInputElement | null = document.querySelector('#newsletter-email') as HTMLInputElement;
  const message: HTMLElement | null = document.getElementById('newsletter-message');
  
  if (!form || !emailInput || !message) return;
  
  form.addEventListener('submit', (e: Event): void => {
    e.preventDefault();
    
    const email: string = emailInput.value.trim();
    
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
  const regex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Data Visualization - Experience Timeline Stats
function initStatsVisualization(): void {
  const statsContainer: HTMLElement | null = document.getElementById('stats-container');
  if (!statsContainer) return;
  
  const stats = [
    { label: 'Research Projects', count: 4, icon: '📊' },
    { label: 'Professional Roles', count: 3, icon: '💼' },
    { label: 'Awards & Achievements', count: 4, icon: '🏆' },
    { label: 'Programming Languages', count: 3, icon: '💻' }
  ];
  
  const statsHTML: string = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-icon">${stat.icon}</div>
      <div class="stat-number">${stat.count}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
  
  statsContainer.innerHTML = statsHTML;
  
  const statNumbers: NodeListOf<Element> = statsContainer.querySelectorAll('.stat-number');
  statNumbers.forEach((el: Element) => {
    animateCounter(el as HTMLElement);
  });
}

function animateCounter(element: HTMLElement): void {
  const target: number = parseInt(element.textContent || '0', 10);
  let current: number = 0;
  const increment: number = Math.ceil(target / 30);
  
  const timer: ReturnType<typeof setInterval> = setInterval(() => {
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
const yearEl: HTMLElement | null = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Initialize all features
document.addEventListener('DOMContentLoaded', (): void => {
  initDarkMode();
  initSearch();
  initNewsletter();
  initStatsVisualization();
});
