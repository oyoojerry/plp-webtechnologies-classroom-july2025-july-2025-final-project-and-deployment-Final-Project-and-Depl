/* script.js
   Interactivity for Oyoo Jerry portfolio:
   - Mobile menu toggle
   - Smooth scroll for nav links
   - Contact form validation + fake submit
   - Simple gallery lightbox
*/

/* ---------- Helpers ---------- */
const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

/* ---------- DOM references ---------- */
const menuToggle = $('#menuToggle');
const primaryNav = $('#primaryNav');
const navLinks = $$('.nav-link');
const form = $('#contactForm');
const feedback = $('#formFeedback');
const yearSpan = $('#year');

const lightbox = $('#lightbox');
const lightboxImage = $('#lightboxImage');
const lightboxClose = $('#lightboxClose');
const galleryItems = $$('.gallery-item');

/* ---------- Initialize year in footer ---------- */
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* ---------- Menu Toggle (mobile) ---------- */
if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', (!expanded).toString());
    primaryNav.classList.toggle('open');
  });
}

/* ---------- Smooth scroll for internal links ---------- */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Let default work for ctrl/cmd click etc.
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav after click
      if (primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

/* ---------- Contact form validation & submit (fake) ---------- */
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = '';
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const message = $('#message').value.trim();

    // Basic validations
    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all fields.';
      feedback.style.color = 'crimson';
      return;
    }

    // Simple email validation
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      feedback.textContent = 'Please provide a valid email address.';
      feedback.style.color = 'crimson';
      return;
    }

    // Simulate sending (replace with real endpoint if available)
    feedback.textContent = 'Sending…';
    feedback.style.color = '#444';
    setTimeout(() => {
      feedback.textContent = '✅ Message sent successfully. Thank you!';
      feedback.style.color = 'green';
      form.reset();
    }, 900);
  });
}

/* ---------- Lightbox for gallery ---------- */
function openLightbox(src, alt = '') {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.style.display = 'flex';
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeLightbox() {
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

galleryItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const full = btn.getAttribute('data-full');
    const img = btn.querySelector('img');
    const alt = img ? img.alt || '' : '';
    if (full) openLightbox(full, alt);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  // close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox();
  });
}

/* ---------- Accessibility: focus outline for keyboard users ---------- */
(function manageFocusOutline(){
  function handleMouse() { document.documentElement.classList.add('using-mouse'); }
  function handleKey() { document.documentElement.classList.remove('using-mouse'); }
  document.addEventListener('mousedown', handleMouse);
  document.addEventListener('keydown', handleKey);
})();

/* End of script.js */
