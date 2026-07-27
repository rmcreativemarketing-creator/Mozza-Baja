/* ═══════════════════════════════════════════════════════════════════════
   TEMPORARY CLOSURE NOTICE — Sep 2 to Oct 7, 2026
   Self-contained pop-up shared by index.html and events.html.
   To retire it early, delete this file and its two <script> tags.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Stops showing itself once the closure is over (Baja California Sur, UTC-7).
  var HIDE_AFTER = Date.parse('2026-10-08T00:00:00-07:00');
  var STORAGE_KEY = 'mozza-closure-notice-2026';
  var OPEN_DELAY = 900;

  if (Date.now() >= HIDE_AFTER) return;

  try {
    if (window.sessionStorage.getItem(STORAGE_KEY) === 'dismissed') return;
  } catch (e) { /* private browsing — show it anyway */ }

  var css = `
.closure-notice {
  position: fixed; inset: 0; z-index: 900;
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
  background: rgba(28,26,22,0.74);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1);
}
.closure-notice.open { opacity: 1; }

.closure-card {
  position: relative;
  width: 100%; max-width: 34rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  background: var(--warm-white, #FDFAF4);
  border-top: 2px solid var(--terracotta, #C2623F);
  box-shadow: 0 30px 90px rgba(0,0,0,0.4);
  padding: 3.25rem 3rem 2.75rem;
  text-align: center;
  transform: translateY(22px);
  transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
}
.closure-notice.open .closure-card { transform: none; }
.closure-card:focus { outline: none; }

.closure-close {
  position: absolute; top: 1rem; right: 1.25rem;
  background: none; border: none; cursor: pointer;
  font-family: 'Jost', sans-serif; font-weight: 200;
  font-size: 1.6rem; line-height: 1;
  color: var(--muted, #6B6158);
  padding: 0.35rem 0.5rem;
  transition: color 0.3s;
}
.closure-close:hover { color: var(--terracotta, #C2623F); }

.closure-rule {
  width: 2.5rem; height: 1px;
  background: var(--terracotta, #C2623F);
  margin: 0 auto 1.5rem;
  opacity: 0.5;
}

.closure-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 300; line-height: 1.1;
  font-size: clamp(1.9rem, 4.5vw, 2.6rem);
  color: var(--dark, #1C1A16);
  margin-bottom: 1.5rem;
}

.closure-body {
  font-family: 'Jost', sans-serif;
  font-weight: 300; font-size: 0.95rem; line-height: 1.8;
  color: var(--muted, #6B6158);
}

.closure-sign {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic; font-weight: 300;
  font-size: 1.3rem; line-height: 1.5;
  color: var(--terracotta, #C2623F);
  margin: 1.75rem 0 2.25rem;
}

.closure-actions {
  display: flex; justify-content: center;
  gap: 0.75rem; flex-wrap: wrap;
}
.closure-btn {
  font-family: 'Jost', sans-serif;
  font-size: 0.66rem; font-weight: 300;
  letter-spacing: 0.25em; text-transform: uppercase;
  padding: 1rem 2.25rem;
  text-decoration: none; cursor: pointer;
  display: inline-block;
  transition: all 0.3s;
}
.closure-btn-primary {
  color: var(--cream, #F8F3EA);
  background: var(--terracotta, #C2623F);
  border: 1px solid var(--terracotta, #C2623F);
}
.closure-btn-primary:hover { background: var(--terracotta-light, #D97B55); border-color: var(--terracotta-light, #D97B55); }
.closure-btn-ghost {
  color: var(--muted, #6B6158);
  background: transparent;
  border: 1px solid var(--border, rgba(74,82,64,0.15));
}
.closure-btn-ghost:hover { border-color: var(--terracotta, #C2623F); color: var(--terracotta, #C2623F); }

.closure-lock { overflow: hidden; }

@media (max-width: 640px) {
  .closure-notice { padding: 1.25rem; }
  .closure-card { padding: 2.75rem 1.75rem 2rem; }
  .closure-actions { flex-direction: column; }
  .closure-btn { width: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .closure-notice, .closure-card { transition: none; }
  .closure-card { transform: none; }
}
`;

  var html = `
<div class="closure-card" role="dialog" aria-modal="true" tabindex="-1"
     aria-labelledby="closure-title" aria-describedby="closure-body">
  <button class="closure-close" type="button" aria-label="Close announcement">&times;</button>
  <div class="closure-rule" aria-hidden="true"></div>
  <h2 class="closure-title" id="closure-title">Marina-side evenings<br>are taking a pause</h2>
  <p class="closure-body" id="closure-body">Mozza will be closed from Wednesday, September&nbsp;2nd to Wednesday, October&nbsp;7th for some kitchen enhancements and an expanded beach deck.</p>
  <p class="closure-sign">Can&rsquo;t wait to have you back.</p>
  <div class="closure-actions">
    <a class="closure-btn closure-btn-primary"
       href="https://www.opentable.com/r/mozza-baja-los-cabos"
       target="_blank" rel="noopener">Reserve a Future Date</a>
    <button class="closure-btn closure-btn-ghost" type="button" data-closure-dismiss>Continue to Site</button>
  </div>
</div>
`;

  function init() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'closure-notice';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    var card = overlay.querySelector('.closure-card');
    var lastFocused = null;

    function focusable() {
      return Array.prototype.filter.call(
        card.querySelectorAll('a[href], button'),
        function (el) { return !el.disabled && el.offsetParent !== null; }
      );
    }

    function close() {
      overlay.classList.remove('open');
      document.documentElement.classList.remove('closure-lock');
      document.body.classList.remove('closure-lock');
      document.removeEventListener('keydown', onKeydown);
      try { window.sessionStorage.setItem(STORAGE_KEY, 'dismissed'); } catch (e) {}
      window.setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        if (lastFocused && lastFocused.focus) lastFocused.focus();
      }, 500);
    }

    function onKeydown(e) {
      if (e.key === 'Escape') { close(); return; }
      if (e.key !== 'Tab') return;
      var items = focusable();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      var active = document.activeElement;
      // Focus sits on the card itself right after opening, or has escaped entirely.
      if (active === card || !card.contains(active)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault(); first.focus();
      }
    }

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector('.closure-close').addEventListener('click', close);
    overlay.querySelector('[data-closure-dismiss]').addEventListener('click', close);

    window.setTimeout(function () {
      lastFocused = document.activeElement;
      document.documentElement.classList.add('closure-lock');
      document.body.classList.add('closure-lock');
      overlay.classList.add('open');
      document.addEventListener('keydown', onKeydown);
      card.focus();
    }, OPEN_DELAY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
