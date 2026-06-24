/* ================================================================
   EEZEE TRANSIT — shared.js v2
   Injects: nav, footer, modal, WhatsApp float
   Handles: scroll nav, hamburger, reveal, modal, FAQ
   ================================================================ */

const WA = '2348000000000';   // ← replace with real number
const WA_MSG = encodeURIComponent('Hi, I need a courier, freight, or vehicle rental quote.');

function currentPage() {
  return location.pathname.split('/').pop() || 'index.html';
}

/* ── NAV HTML ── */
function navHTML() {
  const p = currentPage();
  const links = [
    { h: 'index.html',    l: 'Home' },
    { h: 'services.html', l: 'Services' },
    { h: 'about.html',    l: 'About' },
    { h: 'contact.html',  l: 'Contact' },
  ];
  const isHome = p === 'index.html' || p === '';
  const desktop = links.map(x =>
    `<a href="${x.h}" class="nav__link${p===x.h?' active':''}">${x.l}</a>`).join('');
  const mobile = links.map(x =>
    `<a href="${x.h}" class="mobile-menu__link">${x.l}</a>`).join('');
  return `
<nav class="nav ${isHome ? 'nav--clear' : 'nav--solid'}" id="mainNav">
  <div class="nav__inner">
    <a href="index.html" class="nav__logo">
      <img src="ET_Logo.png" alt="Eezee Transit logo" class="nav__logo-img"/>
      <span class="nav__logo-text">Eezee<span>Transit</span></span>
    </a>
    <div class="nav__links">${desktop}</div>
    <button class="btn btn--primary btn--sm nav__cta" onclick="openModal()">Get a Quote</button>
    <button class="hamburger" id="hb" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  ${mobile}
  <button class="btn btn--primary mobile-menu__cta" onclick="openModal();closeMobile();">Get a Quote</button>
</div>`;
}

/* ── FOOTER HTML ── */
function footerHTML() {
  return `
<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <a href="index.html" class="footer__brand-logo">
          <img src="ET_Logo.png" alt="Eezee Transit"/>
          <span>EezeeTransit</span>
        </a>
        <p>Nigeria's trusted partner for courier delivery, freight transport, and vehicle rentals with professional drivers.</p>
        <div class="footer__social">
          <a href="#" class="footer__social-link" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" class="footer__social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://wa.me/${WA}" class="footer__social-link" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.989.518 3.858 1.425 5.484L2 22l4.644-1.215A9.955 9.955 0 0012.004 22C17.53 22 22 17.523 22 12S17.53 2 12.004 2zm0 18.18a8.164 8.164 0 01-4.17-1.145l-.299-.178-3.1.812.826-3.017-.195-.31A8.18 8.18 0 013.82 12c0-4.514 3.671-8.18 8.184-8.18C16.513 3.82 20.18 7.486 20.18 12c0 4.514-3.667 8.18-8.176 8.18z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <p class="footer__col-title">Services</p>
        <div class="footer__links">
          <a href="services.html#courier"    class="footer__link">Courier Delivery</a>
          <a href="services.html#freight"    class="footer__link">Freight Transport</a>
          <a href="services.html#rental"     class="footer__link">Car Rentals</a>
          <a href="services.html#bus"        class="footer__link">Bus Charter</a>
        </div>
      </div>
      <div>
        <p class="footer__col-title">Company</p>
        <div class="footer__links">
          <a href="about.html"             class="footer__link">About Us</a>
          <a href="about.html#careers"     class="footer__link">Careers</a>
          <a href="contact.html"           class="footer__link">Contact</a>
        </div>
      </div>
      <div>
        <p class="footer__col-title">Contact</p>
        <div class="footer__contact-item">
          <span class="footer__contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.7A2 2 0 012 .96h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg></span>
          <span class="footer__contact-text">+234 800 000 0000</span>
        </div>
        <div class="footer__contact-item">
          <span class="footer__contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
          <span class="footer__contact-text">hello@eezeetransit.com</span>
        </div>
        <div class="footer__contact-item">
          <span class="footer__contact-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
          <span class="footer__contact-text">Lagos, Nigeria</span>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <span class="footer__copy">&copy; 2025 Eezee Transit. All rights reserved.</span>
      <div class="footer__bottom-links">
        <a href="#" class="footer__bottom-link">Privacy Policy</a>
        <a href="#" class="footer__bottom-link">Terms</a>
      </div>
    </div>
  </div>
</footer>`;
}

/* ── MODAL HTML ── */
function modalHTML() {
  return `
<div class="modal-overlay" id="modalOverlay" onclick="handleOverlay(event)">
  <div class="modal">
    <button class="modal__close" onclick="closeModal()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div id="mFormBody">
      <h2>Book a Delivery or Rental</h2>
      <p class="modal__sub">Tell us your route, package size, or passenger count and we will send a firm, all-inclusive price within 30 minutes.</p>
      <div class="form-group">
        <label class="form-label">Service</label>
        <select class="form-input form-select" id="mService">
          <option value="">Select a service</option>
          <option>Courier Delivery (same-day)</option>
          <option>Freight Transport</option>
          <option>Car Rental with Driver</option>
          <option>Bus Charter</option>
          <option>Corporate Account</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Your Name</label>
          <input class="form-input" type="text" placeholder="Full name" id="mName"/>
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input class="form-input" type="tel" placeholder="+234 800 000 0000" id="mPhone"/>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Pickup</label>
          <input class="form-input" type="text" placeholder="Area or address" id="mPickup"/>
        </div>
        <div class="form-group">
          <label class="form-label">Drop-off</label>
          <input class="form-input" type="text" placeholder="Area or address" id="mDropoff"/>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input class="form-input" type="date" id="mDate"/>
        </div>
        <div class="form-group">
          <label class="form-label">Package / Load</label>
          <select class="form-input form-select" id="mSize">
            <option value="">Select size</option>
            <option>Document / Small parcel (under 5kg)</option>
            <option>Medium package (5 to 20kg)</option>
            <option>Large / Bulk (20kg+)</option>
            <option>Freight / Pallet</option>
            <option>Passengers only</option>
          </select>
        </div>
      </div>
      <button class="btn btn--primary btn--lg" style="width:100%;justify-content:center;margin-top:4px;" onclick="submitModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Send Request
      </button>
      <p class="form-note">No payment needed. We call you with a price within 30 minutes.</p>
    </div>
    <div class="form-success" id="mSuccess">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <h3>Request Sent</h3>
      <p>Our team will call you within 30 minutes to confirm pricing and pickup details.</p>
      <button class="btn btn--outline-dark" style="margin-top:20px;" onclick="closeModal()">Close</button>
    </div>
  </div>
</div>`;
}

/* ── WA FLOAT ── */
function waHTML() {
  return `<a href="https://wa.me/${WA}?text=${WA_MSG}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.989.518 3.858 1.425 5.484L2 22l4.644-1.215A9.955 9.955 0 0012.004 22C17.53 22 22 17.523 22 12S17.53 2 12.004 2zm0 18.18a8.164 8.164 0 01-4.17-1.145l-.299-.178-3.1.812.826-3.017-.195-.31A8.18 8.18 0 013.82 12c0-4.514 3.671-8.18 8.184-8.18C16.513 3.82 20.18 7.486 20.18 12c0 4.514-3.667 8.18-8.176 8.18z"/></svg>
</a>`;
}

/* ── INJECT ── */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('nav-ph').innerHTML   = navHTML();
  document.getElementById('foot-ph').innerHTML  = footerHTML();
  document.getElementById('modal-ph').innerHTML = modalHTML();
  document.getElementById('wa-ph').innerHTML    = waHTML();

  /* Scroll nav */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const wasHero = nav.classList.contains('nav--clear');
    const onScroll = () => {
      if (window.scrollY > 64) {
        nav.classList.add('nav--scrolled');
        nav.classList.remove('nav--clear');
      } else {
        nav.classList.remove('nav--scrolled');
        if (wasHero) nav.classList.add('nav--clear');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Hamburger */
  const hb = document.getElementById('hb');
  const mm = document.getElementById('mobileMenu');
  if (hb && mm) {
    hb.addEventListener('click', () => {
      hb.classList.toggle('open');
      mm.classList.toggle('open');
      document.body.style.overflow = mm.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* Scroll reveal */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        if (e.target.querySelectorAll) {
          e.target.querySelectorAll('.count-value').forEach(runCounter);
        }
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
});

/* ── MODAL CONTROLS ── */
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('mFormBody').style.display = 'block';
  document.getElementById('mSuccess').style.display  = 'none';
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function closeMobile() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('hb')?.classList.remove('open');
  document.body.style.overflow = '';
}
function runCounter(el) {
  const target = Number(el.getAttribute('data-count-target')?.replace(/,/g, '') || 0);
  if (!target || el._countStarted) return;
  el._countStarted = true;
  const start = 0;
  const duration = 1200;
  const step = timestamp => {
    if (!el._countStartTime) el._countStartTime = timestamp;
    const progress = Math.min((timestamp - el._countStartTime) / duration, 1);
    const value = Math.floor(progress * (target - start) + start);
    el.textContent = value.toLocaleString();
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}
function handleOverlay(e) { if (e.target === document.getElementById('modalOverlay')) closeModal(); }
function submitModal() {
  if (!document.getElementById('mName').value.trim() ||
      !document.getElementById('mPhone').value.trim() ||
      !document.getElementById('mService').value) {
    alert('Please fill in your name, phone, and service type.');
    return;
  }
  document.getElementById('mFormBody').style.display = 'none';
  document.getElementById('mSuccess').style.display  = 'block';
}
