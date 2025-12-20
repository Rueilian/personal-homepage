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
    // External page links will navigate normally (no preventDefault)
  });
});

// Footer year
const yearEl: HTMLElement | null = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
