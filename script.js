/* ==========================================================================
   ROYAL WEDDING INVITATION — JAVASCRIPT ENGINE
   Interactive Doors, Audio, Scratch Card, Carousel, Countdown, RSVP & Themes
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- DOM REFERENCES ---
  const audio = document.getElementById('weddingAudio');
  const soundWave = document.getElementById('soundWave');
  const musicMuteIcon = document.getElementById('musicMuteIcon');
  const musicBtnLabel = document.getElementById('musicBtnLabel');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const dockMusicBtn = document.getElementById('dockMusicBtn');
  
  const doorsOverlay = document.getElementById('doorsOverlay');
  const openInviteBtn = document.getElementById('openInviteBtn');
  const deviceContainer = document.getElementById('deviceContainer');
  const viewModeBtn = document.getElementById('viewModeBtn');
  const viewModeText = document.getElementById('viewModeText');

  const themeModalBtn = document.getElementById('themeModalBtn');
  const themeModal = document.getElementById('themeModal');
  const closeThemeModalBtn = document.getElementById('closeThemeModalBtn');
  const themeOptions = document.querySelectorAll('.theme-option');

  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  let isAudioPlaying = false;

  // ==========================================================================
  // 1. ROYAL DOOR UNVEILING & MUSIC AUTOPLAY
  // ==========================================================================
  // The audio file (wedding-music.mp3) is frame-accurately cut at 0:24 of Saathiya
  // so it directly starts with "Hansti rahe tu hansti rahe..." with ZERO delay & NO "Saathiya Saathiya"!

  function unveilDoors() {
    doorsOverlay.classList.add('doors-opened');

    // Confetti celebration on opening
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c6a052', '#dfc07b', '#ffffff', '#e8cf8d']
      });
    }

    // Start background music seamlessly on user gesture
    playMusic();
  }

  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', unveilDoors);
  }

  // ==========================================================================
  // 2. AUDIO PLAYBACK & EQUALIZER
  // ==========================================================================
  function playMusic() {
    if (!audio) return;
    audio.play().then(() => {
      isAudioPlaying = true;
      soundWave.classList.add('playing');
      soundWave.style.display = 'flex';
      musicMuteIcon.style.display = 'none';
      if (musicBtnLabel) musicBtnLabel.textContent = 'Hansti Rahe Tu';
    }).catch(err => {
      console.log('Audio autoplay prevented or waiting for interaction:', err);
    });
  }

  function pauseMusic() {
    if (!audio) return;
    audio.pause();
    isAudioPlaying = false;
    soundWave.classList.remove('playing');
    soundWave.style.display = 'none';
    musicMuteIcon.style.display = 'block';
    if (musicBtnLabel) musicBtnLabel.textContent = 'Muted';
  }

  function toggleMusic() {
    if (isAudioPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleMusic);
  if (dockMusicBtn) dockMusicBtn.addEventListener('click', toggleMusic);

  // ==========================================================================
  // 3. THEME SWITCHER ENGINE
  // ==========================================================================
  const savedTheme = localStorage.getItem('wedding_theme_choice') || 'sage';
  setTheme(savedTheme);

  function setTheme(themeId) {
    document.body.setAttribute('data-theme', themeId);
    localStorage.setItem('wedding_theme_choice', themeId);

    // Update active highlight in modal
    themeOptions.forEach(opt => {
      if (opt.dataset.themeId === themeId) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Re-draw scratch card with current theme tone
    if (window.drawScratchSurface) {
      window.drawScratchSurface();
    }
  }

  if (themeModalBtn) {
    themeModalBtn.addEventListener('click', () => {
      themeModal.classList.add('open');
    });
  }

  if (closeThemeModalBtn) {
    closeThemeModalBtn.addEventListener('click', () => {
      themeModal.classList.remove('open');
    });
  }

  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const themeId = opt.dataset.themeId;
      setTheme(themeId);
      showToast(`Applied ${opt.querySelector('.theme-title').textContent} theme!`);
      setTimeout(() => {
        themeModal.classList.remove('open');
      }, 350);
    });
  });

  // Close modal when tapping backdrop
  if (themeModal) {
    themeModal.addEventListener('click', (e) => {
      if (e.target === themeModal) themeModal.classList.remove('open');
    });
  }

  // ==========================================================================
  // 4. VIEW MODE TOGGLE (PHONE / WIDE)
  // ==========================================================================
  if (viewModeBtn) {
    viewModeBtn.addEventListener('click', () => {
      deviceContainer.classList.toggle('wide-mode');
      const isWide = deviceContainer.classList.contains('wide-mode');
      viewModeText.textContent = isWide ? 'Wide View' : 'Phone View';
    });
  }

  // ==========================================================================
  // 5. INTERACTIVE SCRATCH TO REVEAL ENGINE
  // ==========================================================================
  const scratchCanvas = document.getElementById('scratchCanvas');
  let isScratching = false;
  let scratchedPixels = 0;
  let isFullyRevealed = false;

  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d');
    const width = 300;
    const height = 300;
    scratchCanvas.width = width;
    scratchCanvas.height = height;

    window.drawScratchSurface = function() {
      if (isFullyRevealed) return;
      ctx.globalCompositeOperation = 'source-over';

      // Current theme primary color detection
      const currentTheme = document.body.getAttribute('data-theme') || 'sage';
      let foilBase = '#475a4b';
      let foilAccent = '#c6a052';

      if (currentTheme === 'ruby') { foilBase = '#6b1b2d'; foilAccent = '#d4af37'; }
      if (currentTheme === 'rose') { foilBase = '#875560'; foilAccent = '#cca074'; }
      if (currentTheme === 'navy') { foilBase = '#19273f'; foilAccent = '#d4af37'; }
      if (currentTheme === 'ivory') { foilBase = '#52443a'; foilAccent = '#b58d4a'; }

      // Radial metallic foil gradient
      const grad = ctx.createRadialGradient(width/2, height/2, 20, width/2, height/2, 150);
      grad.addColorStop(0, foilAccent);
      grad.addColorStop(0.4, foilBase);
      grad.addColorStop(1, '#1b221c');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold Sparkle Glitter Texture
      for (let i = 0; i < 400; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = Math.random() * 1.5;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(255, 235, 175, 0.7)' : 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Elegant Seal Calligraphy on top of scratch foil
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 13px "Cinzel", Georgia, serif';
      ctx.letterSpacing = '2px';
      ctx.fillText('✦ SCRATCH TO REVEAL ✦', width/2, height/2 - 12);

      ctx.font = '24px "Great Vibes", cursive';
      ctx.fillStyle = '#fce4a6';
      ctx.fillText('Save The Date', width/2, height/2 + 22);

      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Rub with finger or mouse', width/2, height/2 + 45);
    };

    window.drawScratchSurface();

    function getPosition(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (width / rect.width),
        y: (clientY - rect.top) * (height / rect.height)
      };
    }

    function scratch(e) {
      if (!isScratching || isFullyRevealed) return;
      const pos = getPosition(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, Math.PI * 2);
      ctx.fill();

      scratchedPixels++;
      // Periodically check reveal threshold
      if (scratchedPixels % 12 === 0) {
        checkRevealProgress();
      }
    }

    function checkRevealProgress() {
      if (isFullyRevealed) return;
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) { // sample every 4th pixel
        if (pixels[i] === 0) transparentCount++;
      }

      const ratio = transparentCount / (totalPixels / 4);
      if (ratio > 0.42) {
        // Auto-complete reveal
        isFullyRevealed = true;
        scratchCanvas.style.transition = 'opacity 0.6s ease';
        scratchCanvas.style.opacity = '0';
        setTimeout(() => {
          scratchCanvas.style.display = 'none';
        }, 600);

        // Confetti explosion!
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 80,
            spread: 90,
            origin: { y: 0.65 },
            colors: ['#c6a052', '#e8cf8d', '#ffffff', '#475a4b']
          });
        }
        showToast('Date Revealed! Tap Save The Date 🤍');
      }
    }

    // Touch & Mouse Events
    scratchCanvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
    window.addEventListener('mouseup', () => { isScratching = false; });
    scratchCanvas.addEventListener('mousemove', scratch);

    scratchCanvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); }, { passive: true });
    window.addEventListener('touchend', () => { isScratching = false; });
    scratchCanvas.addEventListener('touchmove', scratch, { passive: true });
  }

  // ==========================================================================
  // 6. SAVE THE DATE CALENDAR INTEGRATION
  // ==========================================================================
  const saveTheDateBtn = document.getElementById('saveTheDateBtn');
  const googleCalBtn = document.getElementById('googleCalBtn');
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');

  function openGoogleCalendar() {
    const title = encodeURIComponent("Varsha & Karan's Wedding (Varmala & Phere) 💍");
    const details = encodeURIComponent("You are cordially invited to celebrate the wedding festivities of Varsha & Karan!\n\n• Nov 24, 10:00 AM: Ubtan Utsav (Yellow Pehnawa)\n• Nov 24, 07:00 PM: Dance, Dhol & Dhamaka (Chamak Dhamak)\n• Nov 25, 08:00 PM: Varmala & Phere (Wedding Ceremony)");
    const location = encodeURIComponent("Ovala, Ghodbunder Road, Gowniwada, Owale, Thane West - 400607");
    // Date: Nov 25, 2026, 8:00 PM IST (14:30 UTC)
    const dates = "20261125T143000Z/20261125T210000Z";
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  }

  function downloadIcsCalendar() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Varsha & Karan Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-varsha-karan-20261125@weddinginvite.com',
      'DTSTAMP:20261101T000000Z',
      'DTSTART:20261125T143000Z',
      'DTEND:20261125T210000Z',
      'SUMMARY:Varsha & Karan\'s Wedding Ceremony (Varmala & Phere) 💍',
      'DESCRIPTION:Ubtan Utsav: Nov 24 (10 AM)\\nDance, Dhol & Dhamaka: Nov 24 (7 PM)\\nVarmala & Phere: Nov 25 (8 PM onwards)',
      'LOCATION:Ovala\\, Ghodbunder Road\\, Gowniwada\\, Owale\\, Thane West - 400607',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Varsha_and_Karan_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded Wedding Calendar Invite (.ics)');
  }

  if (saveTheDateBtn) saveTheDateBtn.addEventListener('click', openGoogleCalendar);
  if (googleCalBtn) googleCalBtn.addEventListener('click', openGoogleCalendar);
  if (downloadIcsBtn) downloadIcsBtn.addEventListener('click', downloadIcsCalendar);

  // ==========================================================================
  // 7. PHOTO GALLERY CAROUSEL
  // ==========================================================================
  const carouselTrack = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevSlideBtn');
  const nextBtn = document.getElementById('nextSlideBtn');
  const dots = document.querySelectorAll('.carousel-indicators .dot');
  let currentSlide = 0;
  let carouselInterval;

  function goToSlide(index) {
    if (!carouselTrack || slides.length === 0) return;
    currentSlide = (index + slides.length) % slides.length;
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetCarouselTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetCarouselTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      goToSlide(idx);
      resetCarouselTimer();
    });
  });

  function startCarouselTimer() {
    carouselInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4500);
  }

  function resetCarouselTimer() {
    clearInterval(carouselInterval);
    startCarouselTimer();
  }

  startCarouselTimer();

  // Touch Swipe for Carousel
  let startX = 0;
  if (carouselTrack) {
    carouselTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) goToSlide(currentSlide + 1);
        else goToSlide(currentSlide - 1);
        resetCarouselTimer();
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 8. COUNTDOWN TIMER ENGINE
  // ==========================================================================
  const daysEl = document.getElementById('daysVal');
  const hoursEl = document.getElementById('hoursVal');
  const minsEl = document.getElementById('minsVal');
  const secsEl = document.getElementById('secsVal');

  // Target: Nov 25, 2026, 8:00 PM (Varmala & Phere)
  const targetDate = new Date('2026-11-25T20:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    if (minsEl) minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    if (secsEl) secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ==========================================================================
  // 9. COPY TO CLIPBOARD ACTIONS
  // ==========================================================================
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const copyPromoBtn = document.getElementById('copyPromoBtn');

  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('Ovala, Ghodbunder Road, Gowniwada, Owale, Thane West - 400607').then(() => {
        showToast('Venue address copied to clipboard! 📍');
      });
    });
  }

  if (copyPromoBtn) {
    copyPromoBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('WEDDING2026').then(() => {
        showToast('Hotel Promo Code WEDDING2026 copied! 🏨');
      });
    });
  }

  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  // ==========================================================================
  // 10. INTERACTIVE RSVP ENGINE & STORAGE
  // ==========================================================================
  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpSuccessModal = document.getElementById('rsvpSuccessModal');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const successGuestGreeting = document.getElementById('successGuestGreeting');
  const guestlistCount = document.getElementById('guestlistCount');

  const guestlistModal = document.getElementById('guestlistModal');
  const viewGuestlistBtn = document.getElementById('viewGuestlistBtn');
  const closeGuestlistModalBtn = document.getElementById('closeGuestlistModalBtn');
  const guestlistBody = document.getElementById('guestlistBody');
  const acceptCount = document.getElementById('acceptCount');
  const declineCount = document.getElementById('declineCount');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const clearGuestlistBtn = document.getElementById('clearGuestlistBtn');

  function getStoredRSVPs() {
    try {
      return JSON.parse(localStorage.getItem('wedding_rsvps_list') || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveStoredRSVPs(list) {
    localStorage.setItem('wedding_rsvps_list', JSON.stringify(list));
    updateGuestlistUI();
  }

  function updateGuestlistUI() {
    const list = getStoredRSVPs();
    if (guestlistCount) guestlistCount.textContent = list.length;

    let accepts = 0;
    let declines = 0;

    if (guestlistBody) {
      guestlistBody.innerHTML = '';
      if (list.length === 0) {
        guestlistBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#999; padding:20px;">No RSVPs submitted yet.</td></tr>';
      } else {
        list.forEach(item => {
          if (item.attending === 'Joyfully Accept') accepts++;
          else declines++;

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>${escapeHtml(item.name)}</strong></td>
            <td><span class="summary-pill ${item.attending === 'Joyfully Accept' ? 'accept' : 'decline'}">${item.attending}</span></td>
            <td>${escapeHtml(item.guests)}</td>
            <td>${new Date(item.date).toLocaleDateString()}</td>
          `;
          guestlistBody.appendChild(tr);
        });
      }
    }

    if (acceptCount) acceptCount.textContent = `${accepts} Attending`;
    if (declineCount) declineCount.textContent = `${declines} Declined`;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  updateGuestlistUI();

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value.trim();
      const email = document.getElementById('guestEmail').value.trim();
      const attending = document.getElementById('attendanceSelect').value;
      const guests = document.getElementById('guestCount').value;
      const message = document.getElementById('guestMessage').value.trim();

      const newEntry = {
        name,
        email,
        attending,
        guests,
        message,
        date: new Date().toISOString()
      };

      const list = getStoredRSVPs();
      list.unshift(newEntry);
      saveStoredRSVPs(list);

      // Show Confetti celebration
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }

      // Show personalized success modal
      if (successGuestGreeting) {
        successGuestGreeting.textContent = `Dear ${name},`;
      }
      rsvpSuccessModal.classList.add('open');

      // Reset form
      rsvpForm.reset();
    });
  }

  if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener('click', () => {
      rsvpSuccessModal.classList.remove('open');
    });
  }

  // Guestlist Admin Modal
  if (viewGuestlistBtn) {
    viewGuestlistBtn.addEventListener('click', () => {
      updateGuestlistUI();
      guestlistModal.classList.add('open');
    });
  }

  if (closeGuestlistModalBtn) {
    closeGuestlistModalBtn.addEventListener('click', () => {
      guestlistModal.classList.remove('open');
    });
  }

  // Export CSV
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const list = getStoredRSVPs();
      if (list.length === 0) {
        showToast('No RSVPs to export yet.');
        return;
      }

      let csv = 'Name,Email,Attendance,Guests,Message,Timestamp\r\n';
      list.forEach(r => {
        csv += `"${(r.name || '').replace(/"/g, '""')}","${(r.email || '').replace(/"/g, '""')}","${r.attending}","${r.guests}","${(r.message || '').replace(/"/g, '""')}","${r.date}"\r\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'wedding_rsvps.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('RSVP Guestlist exported to CSV!');
    });
  }

  // Clear list
  if (clearGuestlistBtn) {
    clearGuestlistBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all RSVP submissions?')) {
        saveStoredRSVPs([]);
        showToast('Guestlist cleared.');
      }
    });
  }

  // ==========================================================================
  // 11. QUICK BOTTOM DOCK SCROLL LINKS
  // ==========================================================================
  const dockTimelineBtn = document.getElementById('dockTimelineBtn');
  const dockMapBtn = document.getElementById('dockMapBtn');
  const dockScratchBtn = document.getElementById('dockScratchBtn');
  const dockRsvpBtn = document.getElementById('dockRsvpBtn');

  function smoothScrollTo(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (dockTimelineBtn) dockTimelineBtn.addEventListener('click', () => smoothScrollTo('preweddingSection'));
  if (dockMapBtn) dockMapBtn.addEventListener('click', () => smoothScrollTo('venueSection'));
  if (dockScratchBtn) dockScratchBtn.addEventListener('click', () => smoothScrollTo('scratchSection'));
  if (dockRsvpBtn) dockRsvpBtn.addEventListener('click', () => smoothScrollTo('rsvpSection'));

  // ==========================================================================
  // 12. FALLING ROSE PETALS & GOLD DUST PARTICLE CANVAS
  // ==========================================================================
  const petalsCanvas = document.getElementById('petalsCanvas');
  if (petalsCanvas) {
    const pCtx = petalsCanvas.getContext('2d');
    let width = (petalsCanvas.width = window.innerWidth);
    let height = (petalsCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = petalsCanvas.width = window.innerWidth;
      height = petalsCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        radius: Math.random() * 5 + 3,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: Math.random() * 0.02 - 0.01,
        isGold: Math.random() > 0.4,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    function renderPetals() {
      pCtx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.angle) * 0.8 + p.speedX;
        p.angle += p.angleSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.rotate(p.angle);
        pCtx.beginPath();

        if (p.isGold) {
          // Glistening gold speck
          pCtx.fillStyle = `rgba(223, 192, 123, ${p.opacity})`;
          pCtx.arc(0, 0, p.radius * 0.5, 0, Math.PI * 2);
          pCtx.fill();
        } else {
          // Soft blush rose petal
          pCtx.fillStyle = `rgba(244, 194, 194, ${p.opacity})`;
          pCtx.ellipse(0, 0, p.radius, p.radius * 1.5, Math.PI / 4, 0, Math.PI * 2);
          pCtx.fill();
        }

        pCtx.restore();
      });

      requestAnimationFrame(renderPetals);
    }

    renderPetals();
  }

});
