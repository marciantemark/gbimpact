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

  // Bank transfer (ACH): open the church giving page in an in-page dialog.
  // Centered card on desktop, full-screen sheet on phones. The links keep their
  // normal href, so without JS (or with a modified click) they still navigate.
  const achLinks = document.querySelectorAll('a[data-ach]');
  if (achLinks.length && 'HTMLDialogElement' in window) {
    const dialog = document.createElement('dialog');
    dialog.className = 'ach-dialog';
    dialog.setAttribute('aria-labelledby', 'ach-title');
    dialog.innerHTML =
      '<div class="ach-bar">' +
        '<h2 id="ach-title">Give by bank transfer (ACH)</h2>' +
        '<a class="ach-newtab" target="_blank" rel="noopener">Open in new tab <span aria-hidden="true">↗</span></a>' +
        '<button class="ach-close" type="button" aria-label="Close">×</button>' +
      '</div>' +
      '<p class="ach-loading" role="status">Loading secure giving page…</p>' +
      '<iframe class="ach-frame" title="Give by bank transfer (ACH) — Greater Baltimore Church giving" allow="payment" referrerpolicy="strict-origin-when-cross-origin"></iframe>';
    document.body.appendChild(dialog);
    const frame = dialog.querySelector('.ach-frame');
    const newTab = dialog.querySelector('.ach-newtab');
    const loading = dialog.querySelector('.ach-loading');
    let opener = null;
    let pushed = false;

    frame.addEventListener('load', () => { if (frame.src) loading.hidden = true; });

    const open = link => {
      opener = link;
      newTab.href = link.href;
      loading.hidden = false;
      frame.src = link.href;
      document.documentElement.classList.add('ach-open');
      dialog.showModal();
      // Let the phone Back button close the sheet instead of leaving the site.
      history.pushState({ ach: true }, '');
      pushed = true;
    };
    const close = () => { if (dialog.open) dialog.close(); };

    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('ach-open');
      frame.removeAttribute('src');
      if (pushed) { pushed = false; history.back(); }
      if (opener) opener.focus();
    });
    window.addEventListener('popstate', () => { if (pushed) { pushed = false; close(); } });
    dialog.querySelector('.ach-close').addEventListener('click', close);
    // Click on the dimmed backdrop (outside the card) closes it.
    dialog.addEventListener('click', event => { if (event.target === dialog) close(); });

    achLinks.forEach(link => link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(link);
    }));
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
