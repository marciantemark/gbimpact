(() => {
  'use strict';

  // Keep anchor and keyboard scrolling clear of the persistent header.
  const headerInner = document.querySelector('.header-inner');
  if (headerInner) {
    const updateHeaderHeight = () => document.documentElement.style.setProperty('--header-height', headerInner.getBoundingClientRect().height + 'px');
    updateHeaderHeight();
    if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(headerInner);
    else window.addEventListener('resize', updateHeaderHeight);
  }

  // Copy each tag independently, preserving partial UTM sets and existing URL params.
  const incoming = new URLSearchParams(window.location.search);
  const tags = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  document.querySelectorAll('a[href]').forEach(link => {
    const url = new URL(link.href, window.location.href);
    const campaign = url.hostname === 'givebutter.com' || url.hostname.endsWith('.givebutter.com');
    const internal = url.origin === window.location.origin;
    // Carry tags through Questions/Privacy/home navigation as well as donations.
    if (!campaign && !internal) return;
    tags.forEach(key => {
      if (incoming.has(key)) url.searchParams.set(key, incoming.get(key));
    });
    link.href = url.href;
  });

  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  if (toggle && menu) {
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      menu.hidden = true;
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.hidden = !open;
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) {
        closeMenu();
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1000px)').addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  }

  document.querySelectorAll('button[data-video]').forEach(button => {
    button.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(button.dataset.video) + '?autoplay=1&rel=0';
      frame.title = button.dataset.title || 'Welcome video';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture';
      frame.allowFullscreen = true;
      frame.tabIndex = 0;
      button.replaceWith(frame);
      frame.focus();
    });
  });
})();
