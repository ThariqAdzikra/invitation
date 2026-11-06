/**
 * Web Undangan Pernikahan — Script Core
 * Single Landing Page Statis (Editorial Minimalist)
 * - XSS Sanitization & Cover Gate
 * - Hero Split-Text Reveal
 * - ScrollTrigger Section Reveals & Monoline SVG Drawing
 * - Subtle SVG Parallax
 * - Timezone-Aware Countdown with Digit Tick Transition
 * - Add to Calendar (.ics generation)
 * - Audio Background Toggle (Default OFF, Safe Autoplay)
 * - Custom Editorial Cursor (Desktop Only)
 * - Full prefers-reduced-motion compliance
 */

(function () {
  'use strict';

  // ========================================================================
  // 1. DOM Elements & State
  // ========================================================================
  const body = document.body;
  const coverOverlay = document.getElementById('cover-overlay');
  const envelopeFlap = document.getElementById('envelope-flap');
  const guestNameElement = document.getElementById('guest-name');
  const btnOpenInvitation = document.getElementById('btn-open-invitation');
  const heroTextInners = document.querySelectorAll('.hero-text-inner');

  // Countdown elements
  const countdownSection = document.getElementById('countdown');
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const countdownPassedMsg = document.getElementById('countdown-passed');

  // Calendar button
  const btnAddCalendar = document.getElementById('btn-add-calendar');

  // Audio elements
  const audioToggleBtn = document.getElementById('audio-toggle');
  const iconSpeakerOff = document.getElementById('icon-speaker-off');
  const iconSpeakerOn = document.getElementById('icon-speaker-on');
  const bgAudio = document.getElementById('bg-audio');

  // Toast element (digunakan untuk feedback kalender)
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  // Custom Cursor element
  const customCursor = document.getElementById('custom-cursor');

  // State flags
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis = null;
  let isInvitationOpened = false;
  let isAudioPlaying = false;
  let sanitizedGuestName = '';

  // ========================================================================
  // 2. Toast Notification (Design System Section 5.4)
  // ========================================================================
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  }

  // ========================================================================
  // 3. XSS Sanitization & URL Parameter Parsing (?to=)
  // ========================================================================
  function parseAndSanitizeGuestName() {
    const urlParams = new URLSearchParams(window.location.search);
    const rawTo = urlParams.get('to');

    if (!rawTo || typeof rawTo !== 'string') {
      sanitizedGuestName = 'Tamu Undangan Terhormat';
      guestNameElement.textContent = sanitizedGuestName;
      return;
    }

    let decoded = '';
    try {
      decoded = decodeURIComponent(rawTo.replace(/\+/g, ' '));
    } catch (e) {
      decoded = rawTo.replace(/\+/g, ' ');
    }

    // Strict XSS Sanitization:
    let stripped = decoded.replace(/<[^>]*>/g, '');
    const sanitized = stripped
      .replace(/[<>'"/\\`~^;={}[\]|]/g, '')
      .trim()
      .substring(0, 75);

    if (sanitized.length === 0) {
      sanitizedGuestName = 'Tamu Undangan Terhormat';
    } else {
      sanitizedGuestName = sanitized;
    }

    if (sanitizedGuestName.length > 28) {
      guestNameElement.style.fontSize = 'clamp(1.5rem, 4vw + 0.25rem, 2.25rem)';
    }

    guestNameElement.textContent = sanitizedGuestName;
  }

  // ========================================================================
  // 4. Lenis Smooth Scroll Setup with GSAP ScrollTrigger
  // ========================================================================
  function initSmoothScroll() {
    if (prefersReducedMotion || typeof window.Lenis === 'undefined') {
      return;
    }

    try {
      lenis = new window.Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });

      if (typeof window.ScrollTrigger !== 'undefined') {
        lenis.on('scroll', window.ScrollTrigger.update);

        window.gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          if (lenis) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
        }
        requestAnimationFrame(raf);
      }
    } catch (err) {
      console.warn('Lenis smooth scroll failed to initialize:', err);
    }
  }

  // ========================================================================
  // 5. Hero Split-Text Reveal Animation
  // ========================================================================
  function playHeroReveal() {
    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
      heroTextInners.forEach((el) => {
        el.style.transform = 'none';
        el.style.opacity = '1';
      });
      return;
    }

    window.gsap.to(heroTextInners, {
      y: '0%',
      opacity: 1,
      duration: 0.85,
      stagger: 0.12,
      ease: 'expo.out',
      clearProps: 'willChange'
    });
  }

  // ========================================================================
  // 6. ScrollTrigger Reveals, Monoline SVG Drawing, & Parallax
  // ========================================================================
  function initScrollTriggers() {
    if (prefersReducedMotion || typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
      document.querySelectorAll('.svg-monogram-circle, .timeline-svg-track').forEach((el) => {
        el.classList.add('is-drawn');
      });
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);

    // Section 03: Opening
    window.gsap.fromTo(
      '.opening-reveal',
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#opening', start: 'top 82%', once: true }
      }
    );

    // Section 04: Couple & Monograms
    window.gsap.fromTo(
      '.couple-reveal',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#couple',
          start: 'top 78%',
          once: true,
          onEnter: () => {
            document.querySelectorAll('.svg-monogram-circle').forEach((c) => {
              c.classList.add('is-drawn');
            });
          }
        }
      }
    );

    // Section 05: Events Cards
    window.gsap.fromTo(
      '.events-reveal',
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#events', start: 'top 78%', once: true }
      }
    );

    // Section 06: Countdown
    window.gsap.fromTo(
      '.countdown-reveal',
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#countdown', start: 'top 82%', once: true }
      }
    );

    // Section 07: Love Story
    window.gsap.fromTo(
      '.love-story-reveal',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#love-story',
          start: 'top 78%',
          once: true,
          onEnter: () => {
            const track = document.querySelector('.timeline-svg-track');
            if (track) track.classList.add('is-drawn');
          }
        }
      }
    );

    // Subtle Parallax on Ornaments
    document.querySelectorAll('.ornament-parallax').forEach((el) => {
      window.gsap.to(el, {
        y: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    });
  }

  // ========================================================================
  // 7. Background Audio Controller
  // ========================================================================
  function setAudioUIState(playing) {
    isAudioPlaying = playing;
    if (playing) {
      audioToggleBtn.classList.add('is-playing');
      audioToggleBtn.setAttribute('aria-label', 'Matikan Musik');
      if (iconSpeakerOff) iconSpeakerOff.style.display = 'none';
      if (iconSpeakerOn) iconSpeakerOn.style.display = 'block';
    } else {
      audioToggleBtn.classList.remove('is-playing');
      audioToggleBtn.setAttribute('aria-label', 'Nyalakan Musik');
      if (iconSpeakerOff) iconSpeakerOff.style.display = 'block';
      if (iconSpeakerOn) iconSpeakerOn.style.display = 'none';
    }
  }

  function playAudio(fadeIn = false) {
    if (!bgAudio) return;
    if (fadeIn && typeof window.gsap !== 'undefined') {
      bgAudio.volume = 0;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioUIState(true);
            window.gsap.to(bgAudio, { volume: 0.65, duration: 2, ease: 'power1.out' });
          })
          .catch((err) => {
            console.warn('Audio playback was prevented by browser policy or file not ready:', err);
            setAudioUIState(false);
          });
      }
    } else {
      bgAudio.volume = 0.65;
      const playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioUIState(true);
          })
          .catch((err) => {
            console.warn('Audio playback was prevented by browser policy or file not ready:', err);
            setAudioUIState(false);
          });
      }
    }
  }

  function pauseAudio() {
    if (!bgAudio) return;
    bgAudio.pause();
    setAudioUIState(false);
  }

  function toggleAudio() {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      playAudio(false);
    }
  }

  function initAudioToggle() {
    if (!audioToggleBtn || !bgAudio) return;
    audioToggleBtn.addEventListener('click', toggleAudio);
  }

  // ========================================================================
  // 8. Cover Aperture Clip-Path & 3D Envelope Unboxing Sequence
  // ========================================================================
  function openInvitation() {
    if (isInvitationOpened) return;
    isInvitationOpened = true;
    if (btnOpenInvitation) btnOpenInvitation.disabled = true;

    // Fade in ambient audio
    playAudio(true);

    if (prefersReducedMotion || typeof window.gsap === 'undefined') {
      coverOverlay.style.opacity = '0';
      setTimeout(() => {
        coverOverlay.style.display = 'none';
        body.classList.remove('is-locked');
        initSmoothScroll();
        playHeroReveal();
        initScrollTriggers();
      }, 250);
      return;
    }

    const rect = btnOpenInvitation.getBoundingClientRect();
    const xPercent = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const yPercent = ((rect.top + rect.height / 2) / window.innerHeight) * 100;

    const tl = window.gsap.timeline({
      onComplete: () => {
        coverOverlay.style.display = 'none';
        body.classList.remove('is-locked');
        initSmoothScroll();
        initScrollTriggers();
      }
    });

    // Step 1: Wax seal tactile press
    tl.to(btnOpenInvitation, {
      scale: 0.9,
      duration: 0.16,
      ease: 'power2.in'
    });

    // Step 2: Flap unfolds smoothly in 3D + seal dissolves with slight expansion
    if (envelopeFlap) {
      tl.to(envelopeFlap, {
        rotateX: 180,
        duration: 0.6,
        ease: 'power2.inOut'
      }, '+=0.04');
    }

    tl.to(btnOpenInvitation, {
      opacity: 0,
      scale: 1.15,
      filter: 'blur(3px)',
      duration: 0.35,
      ease: 'power2.out'
    }, '-=0.45');

    // Step 3: Aperture clip-path smoothly unveils the editorial invitation
    tl.fromTo(
      coverOverlay,
      {
        clipPath: `circle(0% at ${xPercent}% ${yPercent}%)`
      },
      {
        clipPath: `circle(150% at ${xPercent}% ${yPercent}%)`,
        duration: 0.95,
        ease: 'power4.inOut'
      },
      '-=0.15'
    );

    // Step 4: Hero Split-Text reveals right as aperture expands
    tl.add(() => {
      playHeroReveal();
    }, '-=0.45');
  }

  // ========================================================================
  // 9. Timezone-Aware Countdown with Digit Tick Micro-Interaction
  // ========================================================================
  function updateDigitWithTick(el, newVal) {
    if (el.textContent === newVal) return;
    el.textContent = newVal;

    if (!prefersReducedMotion && typeof window.gsap !== 'undefined') {
      window.gsap.fromTo(
        el,
        { y: 5, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out', clearProps: 'transform' }
      );
    }
  }

  function initCountdown() {
    if (!countdownSection || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const dateStr = countdownSection.getAttribute('data-date');
    const timeStr = countdownSection.getAttribute('data-time');
    const tzStr = countdownSection.getAttribute('data-timezone');

    const tzOffsets = { WIB: '+07:00', WITA: '+08:00', WIT: '+09:00' };
    const offset = tzOffsets[tzStr] || '+07:00';

    let cleanDate = dateStr && !dateStr.includes('[') ? dateStr : '2026-12-31';
    let cleanTime = timeStr && !timeStr.includes('[') ? timeStr.split(' ')[0] : '08:00';
    if (cleanTime.length === 5) cleanTime += ':00';

    const isoString = `${cleanDate}T${cleanTime}${offset}`;
    let targetTime = new Date(isoString).getTime();

    if (isNaN(targetTime)) {
      targetTime = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime();
    }

    function updateTimer() {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        if (countdownGrid) countdownGrid.style.display = 'none';
        if (countdownPassedMsg) countdownPassedMsg.style.display = 'block';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      updateDigitWithTick(daysEl, String(days).padStart(2, '0'));
      updateDigitWithTick(hoursEl, String(hours).padStart(2, '0'));
      updateDigitWithTick(minutesEl, String(minutes).padStart(2, '0'));
      updateDigitWithTick(secondsEl, String(seconds).padStart(2, '0'));
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // ========================================================================
  // 10. Add to Calendar Action (.ics generation)
  // ========================================================================
  function initAddToCalendar() {
    if (!btnAddCalendar) return;

    btnAddCalendar.addEventListener('click', () => {
      const icsLines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Undangan Pernikahan//ID',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'SUMMARY:Pernikahan [Nama Pria] & [Nama Wanita]',
        'DESCRIPTION:Akad Nikah & Resepsi Pernikahan [Nama Pria] & [Nama Wanita]',
        'LOCATION:[Nama Venue], [Alamat Lengkap]',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ];

      const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pernikahan.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      showToast('Jadwal kalender (.ics) berhasil diunduh');
    });
  }

  // ========================================================================
  // 11. Magnetic Button Hover (Desktop Only)
  // ========================================================================
  function initMagneticButtons() {
    if (prefersReducedMotion || window.innerWidth < 1024 || typeof window.gsap === 'undefined') {
      return;
    }

    const focalButtons = [btnOpenInvitation, audioToggleBtn].filter(Boolean);

    focalButtons.forEach((btn) => {
      const maxOffset = 5;
      const xTo = window.gsap.quickTo(btn, 'x', { duration: 0.3, ease: 'power3.out' });
      const yTo = window.gsap.quickTo(btn, 'y', { duration: 0.3, ease: 'power3.out' });

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo((relX / rect.width) * maxOffset * 2);
        yTo((relY / rect.height) * maxOffset * 2);
      });

      btn.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  // ========================================================================
  // 12. Custom Editorial Cursor (Desktop Only)
  // ========================================================================
  function initCustomCursor() {
    if (prefersReducedMotion || !customCursor || window.innerWidth < 1024 || 'ontouchstart' in window) {
      if (customCursor) customCursor.style.display = 'none';
      return;
    }

    const xTo = window.gsap.quickTo(customCursor, 'x', { duration: 0.18, ease: 'power2.out' });
    const yTo = window.gsap.quickTo(customCursor, 'y', { duration: 0.18, ease: 'power2.out' });

    window.addEventListener('mousemove', (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!customCursor.classList.contains('is-active')) {
        customCursor.classList.add('is-active');
      }
    });

    document.addEventListener('mouseleave', () => {
      customCursor.classList.remove('is-active');
    });

    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('is-hovering');
      });
    });
  }

  // ========================================================================
  // 13. Initialization on DOMContentLoaded
  // ========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    body.classList.add('is-locked');
    parseAndSanitizeGuestName();
    btnOpenInvitation.addEventListener('click', openInvitation);
    initMagneticButtons();
    initCountdown();
    initAddToCalendar();
    initAudioToggle();
    initCustomCursor();
  });
})();
