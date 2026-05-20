/* Homepage effects */
document.querySelectorAll('[data-open-avatar]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'login.html';
  });
});

const glow = document.querySelector('.cursor-glow');
const dot = document.querySelector('.cursor-dot');
if (glow) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
  const animateCursor = () => {
    glowX += (mouseX - glowX) * 0.14;
    glowY += (mouseY - glowY) * 0.14;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursor);
  };
  animateCursor();
}

const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 38;
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.18;
      this.speedY = (Math.random() - 0.5) * 0.18;
      const colors = ['rgba(0,245,255,0.9)', 'rgba(191,0,255,0.7)', 'rgba(255,255,255,0.7)'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }
  const initParticles = () => {
    particles = [];
    for (let i = 0; i < particleCount; i += 1) particles.push(new Particle());
  };
  const connectParticles = () => {
    for (let a = 0; a < particles.length; a += 1) {
      for (let b = a; b < particles.length; b += 1) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        if (dx * dx + dy * dy < 3500) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(0,245,255,0.035)';
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  };
  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    connectParticles();
    requestAnimationFrame(animateParticles);
  };
  resizeCanvas();
  initParticles();
  animateParticles();
  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

const loadProfile = () => {
  try { return JSON.parse(localStorage.getItem('selestiaProfile') || 'null'); }
  catch (error) { return null; }
};
const renderHomeProfile = () => {
  const profile = loadProfile();
  const card = document.querySelector('#homeProfileCard');
  const exitButton = document.querySelector('#exitUserButton');
  const loginLinks = document.querySelectorAll('.nav-login-link');
  loginLinks.forEach((link) => { link.hidden = Boolean(profile); });
  if (exitButton) exitButton.hidden = !profile;
  if (!profile || !card) return;
  const world = profile.world ? profile.world.charAt(0).toUpperCase() + profile.world.slice(1) : 'Selestia';
  document.querySelector('#homeProfileAvatar').textContent = profile.avatarIcon || '✦';
  document.querySelector('#homeProfileName').textContent = profile.username || 'Selestia Member';
  document.querySelector('#homeProfileMeta').textContent = (profile.bio ? profile.bio + ' • ' : '') + 'Selected space: ' + world;
  card.hidden = false;
};
const highlightChosenSpace = () => {
  const profile = loadProfile();
  if (!profile?.world) return;
  const selectedCard = document.querySelector('a[href="' + profile.world + '.html"]');
  if (!selectedCard) return;
  selectedCard.classList.add('recommended-space');
  if (!selectedCard.querySelector('.recommended-badge')) {
    const badge = document.createElement('div');
    badge.className = 'recommended-badge';
    badge.textContent = 'Your selected space';
    selectedCard.appendChild(badge);
  }
};
renderHomeProfile();
highlightChosenSpace();
document.querySelector('#exitUserButton')?.addEventListener('click', () => {
  localStorage.removeItem('selestiaProfile');
  window.location.href = 'login.html';
});
