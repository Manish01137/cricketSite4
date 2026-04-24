/* RoyalCric — shared JS */

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.hamburger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
  }

  // Active nav link based on current page
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) a.classList.add('active');
  });

  // FAQ toggle
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) q.addEventListener('click', () => item.classList.toggle('open'));
  });

  // Tabs
  document.querySelectorAll('.tabs').forEach(tabs => {
    const buttons = tabs.querySelectorAll('button');
    const panels = tabs.parentElement.querySelectorAll('.tab-panel');
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        if (panels[i]) panels[i].classList.add('active');
      });
    });
  });

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animate = (el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: .4 });
    counters.forEach(c => io.observe(c));
  }

  // Live proof rotator
  const proofFeed = document.getElementById('proofFeed');
  if (proofFeed) {
    const samples = [
      { name: 'Rahul K.', city: 'Mumbai', amount: 45000, bank: 'HDFC', mins: 3 },
      { name: 'Amit S.',  city: 'Delhi',  amount: 28500, bank: 'SBI',  mins: 7 },
      { name: 'Priya M.', city: 'Pune',   amount: 62100, bank: 'ICICI',mins: 12 },
      { name: 'Vikas R.', city: 'Jaipur', amount: 18700, bank: 'Axis', mins: 18 },
      { name: 'Sonal T.', city: 'Kolkata',amount: 91000, bank: 'PNB',  mins: 24 },
      { name: 'Karan D.', city: 'Bangalore', amount: 37500, bank: 'Kotak', mins: 31 },
      { name: 'Rohit P.', city: 'Lucknow', amount: 52300, bank: 'HDFC', mins: 41 },
      { name: 'Neha J.',  city: 'Ahmedabad', amount: 24800, bank: 'SBI', mins: 48 }
    ];
    const render = () => {
      proofFeed.innerHTML = samples.map(s => `
        <div class="proof-row">
          <div class="user">
            <div class="avatar">${s.name.charAt(0)}</div>
            <div>
              <div>${s.name} — <span style="color:var(--muted)">${s.city}</span></div>
              <small>via ${s.bank} • ${s.mins} min ago</small>
            </div>
          </div>
          <div>
            <div class="amt">+₹${s.amount.toLocaleString('en-IN')}</div>
            <small>Withdrawal ✓</small>
          </div>
        </div>`).join('');
    };
    render();
    // shuffle / bump minutes occasionally
    setInterval(() => {
      samples.forEach(s => s.mins = Math.min(s.mins + 1, 99));
      samples.sort(() => Math.random() - .5);
      render();
    }, 8000);
  }

  // Get-ID form validation
  const idForm = document.getElementById('getIdForm');
  if (idForm) {
    idForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = idForm.fullname.value.trim();
      const phone = idForm.phone.value.trim();
      const deposit = idForm.deposit.value;
      const errBox = document.getElementById('formMsg');
      errBox.style.color = 'var(--red)';
      if (!name || name.length < 3) { errBox.textContent = 'Please enter your full name.'; return; }
      if (!/^[6-9]\d{9}$/.test(phone)) { errBox.textContent = 'Enter a valid 10-digit Indian mobile number.'; return; }
      if (!deposit) { errBox.textContent = 'Please choose a deposit amount.'; return; }
      errBox.style.color = 'var(--green)';
      errBox.innerHTML = '✓ Request received! Our agent will WhatsApp you within 90 seconds with your ID.';
      idForm.reset();
    });
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('contactMsg');
      msg.style.color = 'var(--green)';
      msg.textContent = '✓ Message sent — we will reply within 15 minutes.';
      contactForm.reset();
    });
  }

  // Live blog auto-scroll (fake live feed ticker)
  const ticker = document.querySelector('.topbar .ticker');
  if (ticker) {
    const items = ticker.querySelectorAll('span');
    let idx = 0;
    setInterval(() => {
      items.forEach((it, i) => it.style.display = i === idx ? 'inline' : 'none');
      idx = (idx + 1) % items.length;
    }, 3500);
    items.forEach((it, i) => { if (i !== 0) it.style.display = 'none'; });
  }
});
