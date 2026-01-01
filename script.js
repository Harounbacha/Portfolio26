
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.remove('no-js');

  let gsapLoaded = false;

  try {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsapLoaded = true;
      console.log('GSAP loaded successfully');
    } else {
      throw new Error('GSAP or ScrollTrigger not found');
    }
  } catch (e) {
    console.error('GSAP failed to load:', e);
    console.log('Content will display without animations');
    gsapLoaded = false;
  }

  // Typing effect (unchanged)
  const titles = [
    'Computer Science Student',
    'Full-Stack Developer',
    'UI/UX Designer',
    'Cybersecurity Enthusiast',
    'AI Explorer',
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex);
      charIndex++;
      if (charIndex > currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
  }

  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    setTimeout(typeEffect, 500);
  });

  // Navigation background on scroll (unchanged)
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (!nav) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      nav.style.background = 'rgba(10, 10, 15, 0.95)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.background = 'rgba(10, 10, 15, 0.8)';
      nav.style.boxShadow = 'none';
    }
  });

  // Smooth scroll (unchanged)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ScrollSpy
  if (gsapLoaded) {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActiveLink = id => {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    };

    sections.forEach(section => {
      if (!section.id) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveLink(section.id),
        onEnterBack: () => setActiveLink(section.id),
      });
    });
  }

 // ==============================
// GSAP Animations (if loaded)
// ==============================
if (gsapLoaded) {
  // Hero section
  const heroTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  heroTimeline
    .fromTo(
      '.hero-text',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.2 }
    )
    .fromTo(
      '.hero-avatar',
      { opacity: 0, scale: 0.85, rotation: -5 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.9 },
      '-=0.5'
    )
    .fromTo(
      '.scroll-indicator',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );

  // Section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // About section
  gsap.fromTo(
    '.about-paragraph',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.fromTo(
    '.stat-card',
    { opacity: 0, y: 35, scale: 0.92 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Skills section (batch)
  ScrollTrigger.batch('.skill-card', {
    start: 'top 90%',
    onEnter: batch =>
      gsap.fromTo(
        batch,
        { opacity: 0, y: 45, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          overwrite: true
        }
      ),
    onLeave: batch =>
      gsap.to(batch, { opacity: 0, y: -40, overwrite: true }),
    onEnterBack: batch =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        overwrite: true
      }),
    onLeaveBack: batch =>
      gsap.to(batch, { opacity: 0, y: 40, overwrite: true })
  });

  // Skill cards hover
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { scale: 1.05, duration: 0.25, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { scale: 1, duration: 0.25, ease: 'power2.out' });
    });
  });

  // Timeline (experience)
  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const xOffset = isMobile ? 0 : (index % 2 === 0 ? -45 : 45);
    const yOffset = isMobile ? 25 : 0;

    gsap.fromTo(
      item,
      { opacity: 0, x: xOffset, y: yOffset },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  gsap.utils.toArray('.timeline-marker').forEach(marker => {
    gsap.fromTo(
      marker,
      { scale: 0 },
      {
        scale: 1,
        duration: 0.45,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: marker,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // Projects (batch + parallax + hover)
  ScrollTrigger.batch('.project-card', {
    start: 'top 85%',
    onEnter: batch =>
      gsap.fromTo(
        batch,
        { opacity: 0, y: 55, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.18,
          ease: 'power3.out',
          overwrite: true
        }
      ),
    onLeave: batch =>
      gsap.to(batch, { opacity: 0, y: -55, overwrite: true }),
    onEnterBack: batch =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.18,
        overwrite: true
      }),
    onLeaveBack: batch =>
      gsap.to(batch, { opacity: 0, y: 55, overwrite: true })
  });

  document.querySelectorAll('.project-card').forEach(card => {
    const image = card.querySelector('.project-image');
    if (!image) return;

    gsap.to(image, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(image, { scale: 1.08, duration: 0.4, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(image, { scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

  // Education & certifications
  gsap.fromTo(
    '.education-card',
    { opacity: 0, x: -45 },
    {
      opacity: 1,
      x: 0,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.education-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.fromTo(
    '.cert-item',
    { opacity: 0, x: 45 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.certifications-list',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact section
  gsap.fromTo(
    '.contact-description',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.fromTo(
    '.contact-item',
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.fromTo(
    '.social-link',
    { opacity: 0, scale: 0.6 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.social-links',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Gradient orbs
  gsap.to('.orb-1', {
    x: 100,
    y: -100,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.orb-2', {
    x: -80,
    y: 80,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  gsap.to('.orb-3', {
    x: 60,
    y: -60,
    duration: 22,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}


  // Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle && navLinksContainer) {
  const spans = navToggle.querySelectorAll('span');

  // Toggle menu when clicking hamburger button
  navToggle.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('active');

    // Animate hamburger icon (X animation)
    if (spans.length === 3 && window.gsap) {
      if (isOpen) {
        gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
        gsap.to(spans[1], { opacity: 0, duration: 0.3 });
        gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
      } else {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
      }
    }
  });

  // Close menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      if (spans.length === 3 && window.gsap) {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
      navLinksContainer.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      if (spans.length === 3 && window.gsap) {
        gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(spans[1], { opacity: 1, duration: 0.3 });
        gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
      }
    }
  });
}


  // Custom cursor + magnetic effect (guarded)
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      cursor.style.left = cursorX - 10 + 'px';
      cursor.style.top = cursorY - 10 + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    if (window.gsap) {
      document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: 2, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
      });

      document.querySelectorAll('.btn, .social-link').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x,
            y,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });
    }
  }

  // Scroll progress bar (kept, but guarded)
  if (gsapLoaded) {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #8b5cf6, #06b6d4);
      z-index: 9999;
      transform-origin: left;
      transform: scaleX(0);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.to(progressBar, {
        scaleX: scrollPercent,
        duration: 0.1,
        ease: 'none',
      });
    });
  } else {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #8b5cf6, #06b6d4);
      z-index: 9999;
      transform-origin: left;
      transform: scaleX(0);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = `scaleX(${scrollPercent})`;
    });
  }

  // Low-end devices config (unchanged)
  if (gsapLoaded && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });
  }

  // Lazy load images (unchanged)
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      imageObserver.unobserve(img);
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));

  // Console Easter egg (unchanged)
  console.log('%c Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
  console.log('%cLike what you see? Let\'s connect!', 'font-size: 14px; color: #06b6d4;');
  console.log('%cHarounbacha2005@gmail.com', 'font-size: 12px; color: #ec4899;');
  console.log('%clinkedin.com/in/haroun-errachid-bacha', 'font-size: 12px; color: #ec4899;');
});
