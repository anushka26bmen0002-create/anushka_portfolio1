/**
 * ==========================================================================
 * MODERN 4-SLIDE PERSONAL PORTFOLIO CONTROLLER
 * ==========================================================================
 * Features:
 * - 4-Slide Fullscreen / Responsive Slide Navigation Engine
 * - Keyboard, Touch Swipe, URL Hash, Dots, and Header Navigation
 * - Dynamic Theme & Color Customizer (Presets, Custom Color Pickers, Fonts)
 * - Live In-Browser Text & Profile Photo Editing
 * - One-click Copy to Clipboard with Animated Toast
 * - Interactive Filter Tabs & Client-Side Contact Form
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================================================
  // 1. SLIDE NAVIGATION CONTROLLER
  // ========================================================================
  const TOTAL_SLIDES = 4;
  let currentSlide = 1;
  let isNavigating = false;

  const slides = document.querySelectorAll('.portfolio-slide');
  const navButtons = document.querySelectorAll('.slide-nav-btn');
  const dotButtons = document.querySelectorAll('.dot-nav-item');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const counterBadge = document.getElementById('slideCounterBadge');
  const progressBar = document.getElementById('slideProgressFill');

  const slideHashMap = {
    1: 'about',
    2: 'education-skills',
    3: 'projects-achievements',
    4: 'contact'
  };

  const hashSlideMap = {
    'about': 1,
    'education-skills': 2,
    'skills': 2,
    'education': 2,
    'projects-achievements': 3,
    'projects': 3,
    'certifications': 3,
    'contact': 4
  };

  /**
   * Switch to a specific slide (1 to 4)
   */
  function goToSlide(targetSlide) {
    if (targetSlide < 1 || targetSlide > TOTAL_SLIDES || isNavigating) return;
    isNavigating = true;

    const previousIndex = currentSlide;
    currentSlide = targetSlide;

    // Update slides visibility and directional animation
    slides.forEach((slide) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide'), 10);
      slide.classList.remove('active', 'slide-prev');

      if (slideIndex === currentSlide) {
        slide.classList.add('active');
        slide.scrollTop = 0; // Reset scroll to top
      } else if (slideIndex < currentSlide) {
        slide.classList.add('slide-prev');
      }
    });

    // Update Header Navigation Active State
    navButtons.forEach((btn) => {
      const target = parseInt(btn.getAttribute('data-slide-target'), 10);
      btn.classList.toggle('active', target === currentSlide);
    });

    // Update Lateral Floating Dots Active State
    dotButtons.forEach((dot) => {
      const target = parseInt(dot.getAttribute('data-slide-target'), 10);
      dot.classList.toggle('active', target === currentSlide);
    });

    // Update Slide Counter Badge
    if (counterBadge) {
      counterBadge.textContent = `0${currentSlide} / 0${TOTAL_SLIDES}`;
    }

    // Update Bottom Progress Bar
    if (progressBar) {
      const percentage = (currentSlide / TOTAL_SLIDES) * 100;
      progressBar.style.width = `${percentage}%`;
    }

    // Update Prev/Next Buttons disabled status
    if (prevBtn) prevBtn.disabled = (currentSlide === 1);
    if (nextBtn) nextBtn.disabled = (currentSlide === TOTAL_SLIDES);

    // Update URL hash smoothly without jump
    if (history.replaceState && slideHashMap[currentSlide]) {
      history.replaceState(null, '', `#${slideHashMap[currentSlide]}`);
    }

    // Debounce to prevent rapid double-clicks
    setTimeout(() => {
      isNavigating = false;
    }, 450);
  }

  // Prev / Next button click handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  // Header Nav button click handlers
  navButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-slide-target'), 10);
      goToSlide(target);
      // Close mobile menu if open
      const navMenu = document.getElementById('slideNavMenu');
      if (navMenu && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
      }
    });
  });

  // Lateral Dot button click handlers
  dotButtons.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.getAttribute('data-slide-target'), 10);
      goToSlide(target);
    });
  });

  // Quick action buttons inside slides that link to other slides
  document.querySelectorAll('[data-jump-slide]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = parseInt(btn.getAttribute('data-jump-slide'), 10);
      goToSlide(target);
    });
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    // Ignore keyboard shortcuts if user is typing in form or editing text
    const activeEl = document.activeElement;
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
      if (currentSlide < TOTAL_SLIDES) {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) {
      if (currentSlide > 1) {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }
    } else if (e.key >= '1' && e.key <= '4') {
      goToSlide(parseInt(e.key, 10));
    }
  });

  // Touch Swipe Navigation
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleTouchGesture();
  }, { passive: true });

  function handleTouchGesture() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Ensure horizontal gesture is stronger than vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 48) {
      if (diffX < 0 && currentSlide < TOTAL_SLIDES) {
        // Swiped Left -> Go Next
        goToSlide(currentSlide + 1);
      } else if (diffX > 0 && currentSlide > 1) {
        // Swiped Right -> Go Previous
        goToSlide(currentSlide - 1);
      }
    }
  }

  // Initial Hash routing check
  function checkUrlHash() {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && hashSlideMap[hash]) {
      goToSlide(hashSlideMap[hash]);
    } else {
      goToSlide(1);
    }
  }
  checkUrlHash();

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (hash && hashSlideMap[hash] && hashSlideMap[hash] !== currentSlide) {
      goToSlide(hashSlideMap[hash]);
    }
  });


  // ========================================================================
  // 2. TOAST NOTIFICATION UTILITY
  // ========================================================================
  const toastElement = document.getElementById('portfolioToast');
  let toastTimer = null;

  function showToast(message, duration = 3000) {
    if (!toastElement) return;
    toastElement.innerHTML = `<span>${message}</span>`;
    toastElement.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastElement.classList.remove('show');
    }, duration);
  }


  // ========================================================================
  // 3. COPY TO CLIPBOARD HANDLERS
  // ========================================================================
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target');
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          const tempArea = document.createElement('textarea');
          tempArea.value = textToCopy;
          tempArea.style.position = 'fixed';
          tempArea.style.left = '-9999px';
          document.body.appendChild(tempArea);
          tempArea.focus();
          tempArea.select();
          document.execCommand('copy');
          document.body.removeChild(tempArea);
        }
        showToast(`Copied "${textToCopy}" to clipboard!`);
      } catch (err) {
        showToast(`Failed to copy: ${textToCopy}`);
      }
    });
  });


  // ========================================================================
  // 4. THEME & CUSTOMIZER CONTROLLER
  // ========================================================================
  const customizerDrawer = document.getElementById('customizerDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const openCustomizerBtn = document.getElementById('openCustomizerBtn');
  const closeCustomizerBtn = document.getElementById('closeCustomizerBtn');
  const quickThemeToggle = document.getElementById('quickThemeToggle');

  // Open & Close Drawer
  function toggleDrawer(open) {
    if (customizerDrawer && drawerBackdrop) {
      customizerDrawer.classList.toggle('open', open);
      drawerBackdrop.classList.toggle('show', open);
    }
  }

  if (openCustomizerBtn) {
    openCustomizerBtn.addEventListener('click', () => toggleDrawer(true));
  }
  if (closeCustomizerBtn) {
    closeCustomizerBtn.addEventListener('click', () => toggleDrawer(false));
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  // Theme Preset Palettes
  const themePresets = {
    indigo: {
      primary: '#6366f1',
      accent: '#10b981',
      theme: 'dark',
      bgDark: '#0b0f19'
    },
    emerald: {
      primary: '#10b981',
      accent: '#06b6d4',
      theme: 'dark',
      bgDark: '#091512'
    },
    ocean: {
      primary: '#0ea5e9',
      accent: '#6366f1',
      theme: 'dark',
      bgDark: '#071220'
    },
    sunset: {
      primary: '#f43f5e',
      accent: '#f59e0b',
      theme: 'dark',
      bgDark: '#190a12'
    },
    light: {
      primary: '#4f46e5',
      accent: '#059669',
      theme: 'light',
      bgDark: '#f8fafc'
    }
  };

  function applyPreset(presetKey) {
    const config = themePresets[presetKey];
    if (!config) return;

    document.documentElement.setAttribute('data-theme', config.theme);
    document.documentElement.style.setProperty('--primary', config.primary);
    document.documentElement.style.setProperty('--primary-hover', config.primary);
    document.documentElement.style.setProperty('--accent', config.accent);
    document.documentElement.style.setProperty('--accent-hover', config.accent);
    document.documentElement.style.setProperty('--bg-dark', config.bgDark);

    // Sync input color pickers if they exist
    const primaryInput = document.getElementById('primaryColorInput');
    const accentInput = document.getElementById('accentColorInput');
    const bgInput = document.getElementById('bgColorInput');

    if (primaryInput) primaryInput.value = config.primary;
    if (accentInput) accentInput.value = config.accent;
    if (bgInput) bgInput.value = config.bgDark;

    showToast(`Applied "${presetKey.charAt(0).toUpperCase() + presetKey.slice(1)}" theme!`);
  }

  document.querySelectorAll('[data-theme-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-theme-preset');
      applyPreset(preset);
    });
  });

  // Quick theme toggle button in header
  if (quickThemeToggle) {
    quickThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      if (nextTheme === 'light') {
        applyPreset('light');
      } else {
        applyPreset('indigo');
      }
    });
  }

  // Custom Color Pickers
  const primaryColorInput = document.getElementById('primaryColorInput');
  const accentColorInput = document.getElementById('accentColorInput');
  const bgColorInput = document.getElementById('bgColorInput');

  if (primaryColorInput) {
    primaryColorInput.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--primary', e.target.value);
    });
  }

  if (accentColorInput) {
    accentColorInput.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--accent', e.target.value);
    });
  }

  if (bgColorInput) {
    bgColorInput.addEventListener('input', (e) => {
      document.documentElement.style.setProperty('--bg-dark', e.target.value);
    });
  }

  // Font Family Selector
  const fontSelect = document.getElementById('fontFamilySelect');
  if (fontSelect) {
    fontSelect.addEventListener('change', (e) => {
      const fontName = e.target.value;
      document.documentElement.style.setProperty('--font-family', `'${fontName}', sans-serif`);
      document.documentElement.style.setProperty('--font-heading', `'${fontName}', sans-serif`);
      showToast(`Updated typography to "${fontName}"!`);
    });
  }

  // Live Edit Mode Toggle (contenteditable)
  const liveEditToggle = document.getElementById('liveEditToggle');
  if (liveEditToggle) {
    liveEditToggle.addEventListener('change', (e) => {
      const enabled = e.target.checked;
      document.body.classList.toggle('live-editing', enabled);

      const editableElements = document.querySelectorAll(
        '.profile-name, .profile-role-tag, .about-intro-hero, .about-bio-text, ' +
        '.interest-pill, .goal-item span, .edu-degree-title, .edu-institution-line span, ' +
        '.edu-details-text, .lang-name, .skill-chip, .tool-badge span, ' +
        '.item-title, .item-org-subtitle, .item-description, .contact-value-link span'
      );

      editableElements.forEach(el => {
        el.setAttribute('contenteditable', enabled ? 'true' : 'false');
      });

      if (enabled) {
        showToast('Live Edit Mode ON! Click any text to edit directly.');
      } else {
        showToast('Live Edit Mode OFF. Changes saved in current session.');
      }
    });
  }

  // Quick Profile Photo Uploader
  const photoFileInput = document.getElementById('photoFileInput');
  const photoUrlInput = document.getElementById('photoUrlInput');
  const profileImgPreview = document.getElementById('profileImgPreview');
  const initialsFallback = document.getElementById('avatarInitials');

  function updateProfilePhoto(src) {
    if (!profileImgPreview) return;
    profileImgPreview.src = src;
    profileImgPreview.style.display = 'block';
    if (initialsFallback) initialsFallback.style.display = 'none';
    showToast('Profile photo updated!');
  }

  if (photoFileInput) {
    photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => updateProfilePhoto(event.target.result);
        reader.readAsDataURL(file);
      }
    });
  }

  if (photoUrlInput) {
    photoUrlInput.addEventListener('change', (e) => {
      const url = e.target.value.trim();
      if (url) updateProfilePhoto(url);
    });
  }

  // Trigger file upload when clicking avatar change button on Slide 1
  const triggerPhotoUploadBtn = document.getElementById('triggerPhotoUploadBtn');
  if (triggerPhotoUploadBtn && photoFileInput) {
    triggerPhotoUploadBtn.addEventListener('click', () => {
      photoFileInput.click();
    });
  }

  // Reset Theme to Defaults
  const resetThemeBtn = document.getElementById('resetThemeBtn');
  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', () => {
      applyPreset('indigo');
      if (fontSelect) fontSelect.value = 'Plus Jakarta Sans';
      document.documentElement.style.setProperty('--font-family', "'Plus Jakarta Sans', sans-serif");
      document.documentElement.style.setProperty('--font-heading', "'Plus Jakarta Sans', sans-serif");
      showToast('Theme reset to initial defaults.');
    });
  }


  // ========================================================================
  // 5. SLIDE 3 CATEGORY TABS / FILTER
  // ========================================================================
  const catTabBtns = document.querySelectorAll('.cat-tab-btn');
  const showcaseColumns = document.querySelectorAll('.showcase-section-col');

  catTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-filter');

      showcaseColumns.forEach(col => {
        const colCat = col.getAttribute('data-category');
        if (targetCategory === 'all' || colCat === targetCategory) {
          col.style.display = 'flex';
        } else {
          col.style.display = 'none';
        }
      });
    });
  });


  // ========================================================================
  // 6. CONTACT FORM SUBMISSION HANDLER
  // ========================================================================
  const contactForm = document.getElementById('portfolioContactForm');
  const formStatusAlert = document.getElementById('formStatusAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactSenderName')?.value || 'Friend';
      const email = document.getElementById('contactSenderEmail')?.value || '';
      const subject = document.getElementById('contactSubject')?.value || 'Portfolio Inquiry';
      const message = document.getElementById('contactMessage')?.value || '';

      if (formStatusAlert) {
        formStatusAlert.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your message has been sent successfully. 
          I will respond to <em>${email}</em> as soon as possible.
        `;
        formStatusAlert.className = 'form-status-alert success';
      }

      showToast('Message sent successfully!');
      contactForm.reset();
    });
  }
});
