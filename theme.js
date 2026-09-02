/* ============================================================================
   Gedeelde chrome (header, footer, WhatsApp, gedrag) — theme.js
   Onderdeel van het theme (repo: vanderburg-theme).

   TWEE ROLLEN, ÉÉN BRON:
   1. Runtime (op de site): geladen via
        <script defer src="https://rjvdburg.github.io/vanderburg-theme/theme.js"></script>
      Leest `site.json` uit de site-repo en injecteert de chrome.
   2. Baker (in de CMS of node): de pure functies headerOuterHTML/footerOuterHTML/
      waOuterHTML (cfg → HTML-string) worden hergebruikt om pagina's te BAKKEN tot
      self-contained platte HTML. Zo bestaat de chrome maar op één plek.

   Config komt uit `site.json` in de root van de SITE-repo; ontbreekt die, dan
   gelden de DEFAULTS (Van der Burg). Override kan via window.SITE = {...}.
   ========================================================================== */
(function () {
  'use strict';
  var BASE = 'https://rjvdburg.github.io/vanderburg-theme/';
  var esc = function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;'); };
  var DEF_LOGO = BASE + 'assets/default-logo.svg';
  var DEF_LOGO_WHITE = BASE + 'assets/default-logo-white.svg';
  var fb = function (def) { return ' onerror="this.onerror=null;this.src=\'' + def + '\'"'; };
  var WA_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';

  /* ── DEFAULTS (Van der Burg) — fallback als er geen site.json is ────────── */
  var DEFAULTS = {
    brand: 'Van der Burg Coaching',
    logo: 'assets/vanderburg-logo.svg',
    logoWhite: 'assets/vanderburg-logo-white.svg',
    logoAlt: 'Van der Burg Coaching & Relatietherapie',
    cta: { label: 'Gratis Kennismaking', href: 'contact.html' },
    nav: [
      { href: 'index.html', label: 'Home' },
      { href: 'over-deborah.html', label: 'Over Deborah' },
      { href: 'diensten.html', label: 'Diensten', sub: [
        { href: 'relatietherapie.html', label: 'Relatietherapie' },
        { href: 'eft-relatietherapie.html', label: 'EFT-relatietherapie' },
        { href: 'individuele-coaching.html', label: 'Individuele Coaching' },
        { href: 'v-cirkel-coaching.html', label: 'V-Cirkel Coaching' },
        { href: 'burn-out-stress-coaching.html', label: 'Burn-out & Stress Coaching' },
        { href: 'kennismaking.html', label: 'Kennismaking' }
      ] },
      { href: 'tarieven.html', label: 'Tarieven' },
      { href: 'contact.html', label: 'Contact' }
    ],
    footer: {
      tagline: 'Waar zelfkennis de basis vormt voor groei. Ontdek wie je bent en versterk je relaties.',
      columns: [
        { title: 'Navigatie', links: [
          { href: 'index.html', label: 'Home' },
          { href: 'over-deborah.html', label: 'Over Deborah' },
          { href: 'diensten.html', label: 'Diensten' },
          { href: 'tarieven.html', label: 'Tarieven' },
          { href: 'contact.html', label: 'Contact' }
        ] },
        { title: 'Diensten', links: [
          { href: 'relatietherapie.html', label: 'Relatietherapie' },
          { href: 'eft-relatietherapie.html', label: 'EFT-relatietherapie' },
          { href: 'v-cirkel-coaching.html', label: 'V-Cirkel Coaching' },
          { href: 'individuele-coaching.html', label: 'Individuele Coaching' },
          { href: 'burn-out-stress-coaching.html', label: 'Burn-out & Stress Coaching' },
          { href: 'werkgebied.html', label: 'Werkgebied' }
        ] }
      ],
      contact: {
        title: 'Contact',
        address: ['Offemweg 47', '2201 HB Noordwijk'],
        phone: '085-1249076', phoneHref: 'tel:+31851249076',
        email: 'deborah@vanderburgcoaching.com'
      },
      bottom: '© 2026 Van der Burg Coaching & Relatietherapie · Noordwijk'
    },
    social: [
      { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/in/deborah-van-der-burg-27343b9/' },
      { label: 'Instagram', short: 'ig', href: 'https://www.instagram.com/vanderburg_coaching/' }
    ],
    whatsapp: { number: '31851249076', text: 'Hoi Deborah, ik heb een vraag.', label: 'Hoe kan ik je helpen?' }
  };

  function currentPage() {
    return (typeof location !== 'undefined' ? (location.pathname.split('/').pop() || 'index.html') : 'index.html');
  }

  function activeHrefFor(cfg, current) {
    for (var i = 0; i < cfg.nav.length; i++) {
      var it = cfg.nav[i];
      if (it.href === current) return it.href;
      if (it.sub) for (var j = 0; j < it.sub.length; j++) if (it.sub[j].href === current) return it.href;
    }
    return current;
  }

  /* ── Pure HTML-builders (cfg → string) — gedeeld door runtime én baker ──── */
  function headerOuterHTML(cfg, current) {
    current = current || currentPage();
    var active = activeHrefFor(cfg, current);
    var links = cfg.nav.map(function (it) {
      var cls = it.href === active ? ' class="active"' : '';
      if (it.sub && it.sub.length) {
        var sub = it.sub.map(function (s) {
          return '<li><a href="' + s.href + '">' + esc(s.label) + '</a></li>';
        }).join('');
        return '<li class="has-sub"><a href="' + it.href + '"' + cls + '>' + esc(it.label) + '</a>' +
               '<div class="submenu"><ul class="submenu-inner">' + sub + '</ul></div></li>';
      }
      return '<li><a href="' + it.href + '"' + cls + '>' + esc(it.label) + '</a></li>';
    }).join('');
    var mobile = cfg.nav.map(function (it) {
      var row = '<a href="' + it.href + '">' + esc(it.label) + '</a>';
      if (it.sub) row += it.sub.map(function (s) {
        return '<a href="' + s.href + '" class="msub">— ' + esc(s.label) + '</a>';
      }).join('');
      return row;
    }).join('');
    var cta = cfg.cta || {};
    return '<header class="site-header" id="siteHeader">' +
      '<nav class="nav">' +
        '<a href="index.html" class="logo" aria-label="' + esc(cfg.brand) + ' home">' +
          '<img src="' + (cfg.logo || DEF_LOGO) + '" alt="' + esc(cfg.logoAlt || cfg.brand) + '"' + fb(DEF_LOGO) + '></a>' +
        '<ul class="nav-links">' + links + '</ul>' +
        (cta.label ? '<a href="' + (cta.href || 'contact.html') + '" class="btn btn-cta cta">' + esc(cta.label) + '</a>' : '') +
        '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">' +
          '<span></span><span></span><span></span></button>' +
      '</nav>' +
      '<div class="mobile-menu" id="mobileMenu">' + mobile +
        (cta.label ? '<a href="' + (cta.href || 'contact.html') + '" class="btn btn-cta">' + esc(cta.label) + '</a>' : '') +
      '</div>' +
    '</header>';
  }

  function footerOuterHTML(cfg) {
    var f = cfg.footer || {};
    var social = (cfg.social || []).map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" aria-label="' + esc(s.label) + '">' + esc(s.short || s.label) + '</a>';
    }).join('');
    var cols = (f.columns || []).map(function (c) {
      var links = (c.links || []).map(function (l) {
        return '<li><a href="' + l.href + '">' + esc(l.label) + '</a></li>';
      }).join('');
      return '<div><h4>' + esc(c.title) + '</h4><ul class="footer-links">' + links + '</ul></div>';
    }).join('');
    var ct = f.contact || {};
    var addr = (ct.address || []).map(esc).join('<br>');
    var contactHtml = '<div class="footer-contact"><h4>' + esc(ct.title || 'Contact') + '</h4>' +
      (addr ? '<p>' + addr + '</p>' : '') +
      (ct.phone ? '<p><a href="' + (ct.phoneHref || 'tel:' + ct.phone) + '">' + esc(ct.phone) + '</a></p>' : '') +
      (ct.email ? '<p><a href="mailto:' + ct.email + '">' + esc(ct.email) + '</a></p>' : '') +
      '</div>';
    return '<footer class="site-footer"><div class="container"><div class="footer-grid">' +
        '<div>' +
          '<div class="flogo"><img src="' + (cfg.logoWhite || DEF_LOGO_WHITE) + '" alt="' + esc(cfg.brand) + '"' + fb(DEF_LOGO_WHITE) + '></div>' +
          (f.tagline ? '<p>' + esc(f.tagline) + '</p>' : '') +
          (social ? '<div class="social">' + social + '</div>' : '') +
        '</div>' + cols + contactHtml +
      '</div>' +
      (f.bottom ? '<div class="footer-bottom">' + esc(f.bottom) + '</div>' : '') +
    '</div></footer>';
  }

  function waOuterHTML(cfg) {
    var w = cfg.whatsapp;
    if (!w || !w.number) return '';
    var href = 'https://wa.me/' + w.number + (w.text ? '?text=' + encodeURIComponent(w.text) : '');
    return '<a class="wa-float" href="' + href + '" target="_blank" rel="noopener" aria-label="WhatsApp — ' +
      esc(w.label || 'Contact') + '">' + WA_SVG + '<span>' + esc(w.label || 'WhatsApp') + '</span></a>';
  }

  /* ── Gedrag (scroll-blur, hamburger, count-up, contactformulier) ─────────── */
  function wireBehaviour() {
    var h = document.getElementById('siteHeader');
    if (h) {
      var RAMP = 120;
      var onScroll = function () {
        var t = Math.min(Math.max(window.scrollY, 0) / RAMP, 1);
        h.style.background = 'rgba(255,255,255,' + (t * 0.97).toFixed(3) + ')';
        var blur = 'blur(' + (t * 12).toFixed(2) + 'px)';
        h.style.backdropFilter = blur; h.style.webkitBackdropFilter = blur;
        h.style.boxShadow = t > 0.02 ? ('0 2px 16px rgba(62,46,109,' + (t * 0.10).toFixed(3) + ')') : 'none';
        h.style.borderBottomColor = 'rgba(240,240,240,' + t.toFixed(3) + ')';
      };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }

    var nums = [].slice.call(document.querySelectorAll('.stat-num'));
    function countUp(el) {
      if (el._counted) return; el._counted = true;
      var target = parseFloat(el.getAttribute('data-target')) || 0;
      var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var suf = el.getAttribute('data-suffix') || '';
      var dur = 1400, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts; var p = Math.min((ts - t0) / dur, 1); var e = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec) + suf;
      }
      requestAnimationFrame(step);
      setTimeout(function () { el.textContent = target.toFixed(dec) + suf; }, dur + 400);
    }
    function checkNums() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      nums.forEach(function (el) {
        if (el._counted) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) countUp(el);
      });
    }
    if (nums.length) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); countUp(en.target); } });
        }, { threshold: 0.4 });
        nums.forEach(function (n) { io.observe(n); });
      }
      window.addEventListener('scroll', checkNums, { passive: true });
      window.addEventListener('resize', checkNums, { passive: true });
      checkNums();
    }

    var burger = document.getElementById('hamburger'), menu = document.getElementById('mobileMenu');
    if (burger && menu) {
      burger.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        burger.setAttribute('aria-expanded', open);
      });
    }

    var cform = document.getElementById('contactForm');
    if (cform) {
      cform.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
        var naam = val('cf-naam'), email = val('cf-email'), tel = val('cf-tel'), bericht = val('cf-bericht');
        if (!naam || !email || !bericht) { alert('Vul je naam, e-mail en bericht in.'); return; }
        var to = (window.__contactEmail) || 'deborah@vanderburgcoaching.com';
        var subject = 'Contactaanvraag via website — ' + naam;
        var body = 'Naam: ' + naam + '\nE-mail: ' + email + '\nTelefoon: ' + (tel || '-') + '\n\nBericht:\n' + bericht;
        window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    }
  }

  /* ── Runtime: config laden + injecteren ─────────────────────────────────── */
  function loadSiteJson() {
    return fetch('site.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; });
  }
  function build(cfg) {
    if (document.getElementById('siteHeader')) return; // al aanwezig (bijv. gebakken pagina)
    if (cfg.footer && cfg.footer.contact && cfg.footer.contact.email) window.__contactEmail = cfg.footer.contact.email;
    document.body.insertAdjacentHTML('afterbegin', headerOuterHTML(cfg));
    document.body.insertAdjacentHTML('beforeend', footerOuterHTML(cfg));
    var wa = waOuterHTML(cfg); if (wa) document.body.insertAdjacentHTML('beforeend', wa);
    wireBehaviour();
  }
  function start() {
    loadSiteJson().then(function (site) {
      var cfg = Object.assign({}, DEFAULTS, site);
      if (window.SITE) cfg = Object.assign(cfg, window.SITE);
      build(cfg);
    });
  }

  /* ── Baker: pagina → platte, self-contained HTML (gedeeld door CMS + builder)
     Inline theme.css, header vóór <main>, footer+WhatsApp+gedrag ná </main>,
     externe theme-verwijzingen weg. Markers maken opnieuw bakken idempotent;
     de <main>-content blijft ongemoeid. ───────────────────────────────────── */
  function bakePage(html, page, cssText, cfg) {
    var email = (cfg.footer && cfg.footer.contact && cfg.footer.contact.email) || '';
    var BEH = '<script>window.__contactEmail=' + JSON.stringify(email) + ';(' + wireBehaviour.toString() + ')();<\/script>';
    var reBlock = function (k) { return new RegExp('<!-- CMS:' + k + ':START -->[\\s\\S]*?<!-- CMS:' + k + ':END -->'); };
    var ensure = function (h, key, inner, fbIns) {
      var b = '<!-- CMS:' + key + ':START -->\n' + inner + '\n<!-- CMS:' + key + ':END -->';
      return reBlock(key).test(h) ? h.replace(reBlock(key), b) : fbIns(h, b);
    };
    html = ensure(html, 'THEMECSS', '<style>\n' + cssText + '\n</style>', function (h, b) {
      return /<link[^>]+theme\.css[^>]*>/.test(h) ? h.replace(/<link[^>]+theme\.css[^>]*>/, b) : h.replace('</head>', b + '\n</head>');
    });
    html = html.replace(/\s*<script[^>]+theme\.js[^>]*><\/script>/g, '');
    var headerHTML = headerOuterHTML(cfg, page).replace(/ onerror="[^"]*"/g, '');
    html = ensure(html, 'HEADER', headerHTML, function (h, b) { return h.replace(/<main\b/, b + '\n<main'); });
    var chrome = (footerOuterHTML(cfg) + '\n' + waOuterHTML(cfg)).replace(/ onerror="[^"]*"/g, '') + '\n' + BEH;
    html = ensure(html, 'CHROME', chrome, function (h, b) { return h.replace(/<\/main>/, '</main>\n' + b); });
    return html;
  }

  /* ── Export (baker) + auto-run (runtime) ────────────────────────────────── */
  var API = {
    DEFAULTS: DEFAULTS, esc: esc, activeHrefFor: activeHrefFor,
    headerOuterHTML: headerOuterHTML, footerOuterHTML: footerOuterHTML, waOuterHTML: waOuterHTML,
    // een gebakken pagina heeft een kleine runtime nodig voor scroll-blur/hamburger/count-up:
    wireBehaviour: wireBehaviour,
    bakePage: bakePage
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.Theme = API;

  var isBrowser = (typeof document !== 'undefined');
  var libOnly = (typeof window !== 'undefined' && window.THEME_LIB_ONLY);
  if (isBrowser && !libOnly) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  }
})();
