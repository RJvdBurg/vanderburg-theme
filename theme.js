/* ============================================================================
   Van der Burg Coaching — gedeelde chrome (header, footer, WhatsApp, gedrag)
   Onderdeel van het theme (repo: vanderburg-theme). Geladen via:
     <script defer src="https://rjvdburg.github.io/vanderburg-theme/theme.js"></script>
   Injecteert de site-header + footer + WhatsApp-knop en zet het gedrag op.
   Pagina's bevatten zelf alleen nog <main>-content + hun eigen <head> (SEO/schema).
   ========================================================================== */
(function () {
  var BASE = 'https://rjvdburg.github.io/vanderburg-theme/';
  var esc = function (s) { return String(s).replace(/&/g, '&amp;'); };

  var SERVICES = [
    ['relatietherapie.html', 'Relatietherapie'],
    ['eft-relatietherapie.html', 'EFT-relatietherapie'],
    ['individuele-coaching.html', 'Individuele Coaching'],
    ['v-cirkel-coaching.html', 'V-Cirkel Coaching'],
    ['burn-out-stress-coaching.html', 'Burn-out & Stress Coaching'],
    ['kennismaking.html', 'Kennismaking']
  ];
  var NAV = [
    ['index.html', 'Home'],
    ['over-deborah.html', 'Over Deborah'],
    ['diensten.html', 'Diensten', true],
    ['tarieven.html', 'Tarieven'],
    ['contact.html', 'Contact']
  ];

  // Huidige pagina + welke top-nav-link "actief" is
  var current = (location.pathname.split('/').pop() || 'index.html');
  var servicePages = SERVICES.map(function (s) { return s[0]; }).concat(['diensten.html']);
  var activeHref = servicePages.indexOf(current) !== -1 ? 'diensten.html' : current;

  /* ---- Header ------------------------------------------------------------- */
  function buildHeader() {
    var links = NAV.map(function (item) {
      var href = item[0], label = item[1], hasSub = item[2];
      var cls = href === activeHref ? ' class="active"' : '';
      if (hasSub) {
        var sub = SERVICES.map(function (s) {
          return '<li><a href="' + s[0] + '">' + esc(s[1]) + '</a></li>';
        }).join('');
        return '<li class="has-sub"><a href="' + href + '"' + cls + '>' + esc(label) + '</a>' +
               '<div class="submenu"><ul class="submenu-inner">' + sub + '</ul></div></li>';
      }
      return '<li><a href="' + href + '"' + cls + '>' + esc(label) + '</a></li>';
    }).join('');

    var mobile = NAV.map(function (item) {
      var href = item[0], label = item[1], hasSub = item[2];
      var row = '<a href="' + href + '">' + esc(label) + '</a>';
      if (hasSub) {
        row += SERVICES.map(function (s) {
          return '<a href="' + s[0] + '" class="msub">— ' + esc(s[1]) + '</a>';
        }).join('');
      }
      return row;
    }).join('');

    var h = document.createElement('header');
    h.className = 'site-header';
    h.id = 'siteHeader';
    h.innerHTML =
      '<nav class="nav">' +
        '<a href="index.html" class="logo" aria-label="Van der Burg Coaching home">' +
          '<img src="' + BASE + 'assets/vanderburg-logo.svg" alt="Van der Burg Coaching &amp; Relatietherapie"></a>' +
        '<ul class="nav-links">' + links + '</ul>' +
        '<a href="contact.html" class="btn btn-cta cta">Gratis Kennismaking</a>' +
        '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">' +
          '<span></span><span></span><span></span></button>' +
      '</nav>' +
      '<div class="mobile-menu" id="mobileMenu">' + mobile +
        '<a href="contact.html" class="btn btn-cta">Gratis Kennismaking</a></div>';
    return h;
  }

  /* ---- Footer + WhatsApp -------------------------------------------------- */
  function buildFooter() {
    var f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML =
      '<div class="container"><div class="footer-grid">' +
        '<div>' +
          '<div class="flogo"><img src="' + BASE + 'assets/vanderburg-logo-white.svg" alt="Van der Burg Coaching"></div>' +
          '<p>Waar zelfkennis de basis vormt voor groei. Ontdek wie je bent en versterk je relaties.</p>' +
          '<div class="social">' +
            '<a href="https://www.linkedin.com/in/deborah-van-der-burg-27343b9/" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>' +
            '<a href="https://www.instagram.com/vanderburg_coaching/" target="_blank" rel="noopener" aria-label="Instagram">ig</a>' +
          '</div>' +
        '</div>' +
        '<div><h4>Navigatie</h4><ul class="footer-links">' +
          '<li><a href="index.html">Home</a></li>' +
          '<li><a href="over-deborah.html">Over Deborah</a></li>' +
          '<li><a href="diensten.html">Diensten</a></li>' +
          '<li><a href="tarieven.html">Tarieven</a></li>' +
          '<li><a href="contact.html">Contact</a></li>' +
        '</ul></div>' +
        '<div><h4>Diensten</h4><ul class="footer-links">' +
          '<li><a href="relatietherapie.html">Relatietherapie</a></li>' +
          '<li><a href="eft-relatietherapie.html">EFT-relatietherapie</a></li>' +
          '<li><a href="v-cirkel-coaching.html">V-Cirkel Coaching</a></li>' +
          '<li><a href="individuele-coaching.html">Individuele Coaching</a></li>' +
          '<li><a href="burn-out-stress-coaching.html">Burn-out &amp; Stress Coaching</a></li>' +
          '<li><a href="werkgebied.html">Werkgebied</a></li>' +
        '</ul></div>' +
        '<div class="footer-contact"><h4>Contact</h4>' +
          '<p>Offemweg 47<br>2201 HB Noordwijk</p>' +
          '<p><a href="tel:+31851249076">085-1249076</a></p>' +
          '<p><a href="mailto:deborah@vanderburgcoaching.com">deborah@vanderburgcoaching.com</a></p>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">© 2026 Van der Burg Coaching &amp; Relatietherapie · Noordwijk</div>' +
      '</div>';
    return f;
  }

  function buildWhatsApp() {
    var a = document.createElement('a');
    a.className = 'wa-float';
    a.href = 'https://wa.me/31851249076?text=Hoi%20Deborah%2C%20ik%20heb%20een%20vraag.';
    a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', 'WhatsApp — Hoe kan ik je helpen?');
    a.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>' +
      '<span>Hoe kan ik je helpen?</span>';
    return a;
  }

  /* ---- Gedrag (scroll-blur, hamburger, count-up, contactformulier) -------- */
  function wireBehaviour() {
    var h = document.getElementById('siteHeader');
    var RAMP = 120; // px waarover de blur/achtergrond opbouwt
    function onScroll() {
      var t = Math.min(Math.max(window.scrollY, 0) / RAMP, 1);
      h.style.background = 'rgba(255,255,255,' + (t * 0.97).toFixed(3) + ')';
      var blur = 'blur(' + (t * 12).toFixed(2) + 'px)';
      h.style.backdropFilter = blur; h.style.webkitBackdropFilter = blur;
      h.style.boxShadow = t > 0.02 ? ('0 2px 16px rgba(62,46,109,' + (t * 0.10).toFixed(3) + ')') : 'none';
      h.style.borderBottomColor = 'rgba(240,240,240,' + t.toFixed(3) + ')';
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // Count-up: robuust — start zodra een cijfer in beeld komt. Werkt via
    // IntersectionObserver én een scroll/resize/load-vangnet (getBoundingClientRect),
    // zodat het gegarandeerd afspeelt, onafhankelijk van IO-eigenaardigheden.
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
      checkNums(); // meteen bij laden: al zichtbare cijfers tellen direct
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
        var subject = 'Contactaanvraag via website — ' + naam;
        var body = 'Naam: ' + naam + '\nE-mail: ' + email + '\nTelefoon: ' + (tel || '-') + '\n\nBericht:\n' + bericht;
        window.location.href = 'mailto:deborah@vanderburgcoaching.com' +
          '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      });
    }
  }

  /* ---- Injecteren --------------------------------------------------------- */
  function build() {
    if (document.getElementById('siteHeader')) return; // dubbel-injectie voorkomen
    document.body.insertBefore(buildHeader(), document.body.firstChild);
    document.body.appendChild(buildFooter());
    document.body.appendChild(buildWhatsApp());
    wireBehaviour();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
