// 1. Forwards campaign tags (utm_*, fbclid, gclid) from this page's address to every Give link,
//    so Givebutter can show which email, post, or QR code led to each gift.
//    If a visitor arrives with no tags, a default source of "site" is added.
(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];
    var hasSource = !!params.get('utm_source');
    document.querySelectorAll('a[data-give]').forEach(function (a) {
      var url = new URL(a.href);
      keys.forEach(function (k) {
        if (params.get(k)) url.searchParams.set(k, params.get(k));
      });
      if (!hasSource) {
        url.searchParams.set('utm_source', 'site');
        url.searchParams.set('utm_medium', 'web');
        url.searchParams.set('utm_campaign', 'greater-impact');
      }
      a.href = url.toString();
    });
  } catch (e) { /* links still work without tags */ }
})();

// 2. Welcome video: nothing loads from YouTube until the visitor presses play.
(function () {
  try {
    document.querySelectorAll('button[data-video]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var frame = document.createElement('iframe');
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(btn.getAttribute('data-video')) + '?autoplay=1&rel=0';
        frame.title = btn.getAttribute('data-title') || 'Welcome video';
        frame.allow = 'autoplay; encrypted-media; picture-in-picture';
        frame.setAttribute('allowfullscreen', '');
        btn.replaceWith(frame);
        frame.focus();
      });
    });
  } catch (e) { /* the page still works without the video */ }
})();
