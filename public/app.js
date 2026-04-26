// === PRODUCT DATA ===
const bags = [
  { id:1, name:'Canvas Tote Bag', cat:'tote', size:'37×42×11 cm', img:'/images/ikat-tote.jpg', tag:'Bestseller', hot:true, viewers:12 },
  { id:2, name:'Shopping Tote', cat:'tote', size:'37×42 cm', img:'/images/shopping-bag.jpg', tag:'Hot', hot:true, viewers:8 },
  { id:3, name:'Ikat Stripe Tote', cat:'tote', size:'37×42 cm', img:'/images/ikat-tote.jpg', tag:'New', hot:false, viewers:15 },
  { id:4, name:'Pineapple Tote', cat:'tote', size:'37×42 cm', img:'/images/pineapple-tote.jpg', tag:null, hot:false, viewers:6 },
  { id:5, name:'Drawstring Bag S', cat:'drawstring', size:'15×20 cm', img:'/images/drawstring-bag.jpg', tag:null, hot:false, viewers:4 },
  { id:6, name:'Drawstring Bag M', cat:'drawstring', size:'25×30 cm', img:'/images/drawstring-bag.jpg', tag:null, hot:false, viewers:7 },
  { id:7, name:'Drawstring Bag L', cat:'drawstring', size:'30×40 cm', img:'/images/drawstring-bag.jpg', tag:'Custom', hot:false, viewers:9 },
  { id:8, name:'Zipper Foldable', cat:'zipper', size:'28×18×8 cm', img:'/images/pineapple-tote.jpg', tag:null, hot:false, viewers:5 },
  { id:9, name:'Zip Pouch', cat:'zipper', size:'20×12 cm', img:'/images/shopping-bag.jpg', tag:null, hot:false, viewers:3 },
  { id:10, name:'Lunch Tote', cat:'special', size:'21×21×12 cm', img:'/images/shopping-bag.jpg', tag:'Limited', hot:true, viewers:11 },
  { id:11, name:'Kids Character Bag', cat:'special', size:'Custom', img:'/images/drawstring-bag.jpg', tag:'Kids', hot:false, viewers:14 },
  { id:12, name:'Shoe Bag', cat:'special', size:'35×45 cm', img:'/images/ikat-tote.jpg', tag:null, hot:false, viewers:2 },
];

// === RENDER PRODUCTS ===
function renderProducts(filter) {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'all' ? bags : bags.filter(b => b.cat === filter);
  grid.innerHTML = filtered.map((b, i) => `
    <div class="product-card reveal" style="transition-delay:${i * 0.05}s">
      <div class="product-img-wrap">
        ${b.tag ? `<div class="product-tag ${b.hot ? 'product-tag-hot' : ''}">${b.tag}</div>` : ''}
        <img src="${b.img}" alt="${b.name}" loading="lazy">
        <div class="product-stock">Only ${Math.floor(Math.random()*15)+3} left</div>
      </div>
      <div class="product-info">
        <div class="product-name">${b.name}</div>
        <div class="product-size">${b.size}</div>
        <div class="product-actions">
          <span class="product-material">🌱 100% Cotton</span>
          <span class="product-viewers">👁 ${b.viewers} viewing</span>
        </div>
        <a href="https://wa.me/919975572700?text=Hi! I'm interested in ${encodeURIComponent(b.name)}" target="_blank" class="btn btn-primary btn-sm" style="width:100%;justify-content:center;margin-top:12px;">Inquire Now →</a>
      </div>
    </div>
  `).join('');
  setTimeout(observeReveals, 100);
}

function filterBags(cat, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

// === FAQ ===
const faqs = [
  { q: 'What is your minimum order quantity (MOQ)?', a: 'Just 30 pieces! Unlike most manufacturers, we happily cater to small-volume orders without cutting corners on quality.' },
  { q: 'Can I fully customize my design?', a: 'Absolutely. Choose size, fabric, handle style, color, prints — even add your logo or custom artwork. We make it exactly your way.' },
  { q: 'Do you ship internationally?', a: 'Yes! We deliver worldwide with reliable logistics and tracking. Most international orders arrive within 2-3 weeks.' },
  { q: 'What fabrics do you use?', a: 'We primarily work with 100% cotton canvas and organic cotton. On request, we can offer recycled or blended materials too.' },
  { q: 'How long will my order take?', a: 'For 30-100 pieces: 1-2 weeks. For 100-500 pieces: 2-3 weeks. Larger or highly customized orders may take slightly longer.' },
  { q: 'Do you offer design help?', a: 'Yes! We assist with print design, layout, and logo placement to ensure your bag looks exactly how you envision it — at no extra cost.' },
];

function renderFAQ() {
  const list = document.getElementById('faq-list');
  list.innerHTML = faqs.map((f, i) => `
    <div class="faq-item reveal">
      <div class="faq-q" onclick="toggleFAQ(${i})">
        <span>${f.q}</span>
        <span class="faq-icon" id="fiq-${i}">+</span>
      </div>
      <div class="faq-a" id="fa-${i}" style="display:none">${f.a}</div>
    </div>
  `).join('');
}

function toggleFAQ(i) {
  const a = document.getElementById('fa-' + i);
  const ic = document.getElementById('fiq-' + i);
  const open = a.style.display === 'block';
  a.style.display = open ? 'none' : 'block';
  ic.textContent = open ? '+' : '−';
  ic.classList.toggle('open', !open);
}

// === STICKY NAV ===
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// === COUNTER ANIMATION ===
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.closest('.stat').dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// === SCROLL REVEAL ===
function observeReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.closest('.stats-bar')) animateCounters();
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .stat').forEach(el => observer.observe(el));
}

// === FOMO POPUP ===
const fomoMessages = [
  { city: 'Mumbai', item: '50 Custom Totes', time: '2 min ago' },
  { city: 'Delhi', item: '100 Shopping Bags', time: '5 min ago' },
  { city: 'Bangalore', item: '30 Drawstring Bags', time: '8 min ago' },
  { city: 'Pune', item: '75 Ikat Totes', time: '12 min ago' },
  { city: 'Chennai', item: '40 Zipper Bags', time: '15 min ago' },
  { city: 'Hyderabad', item: '60 Kids Bags', time: '20 min ago' },
];
let fomoIdx = 0;
function showFomoPopup() {
  const popup = document.getElementById('fomo-popup');
  const msg = fomoMessages[fomoIdx % fomoMessages.length];
  popup.querySelector('.fp-text').innerHTML = `<strong>Someone in ${msg.city}</strong> just ordered ${msg.item}<br><small>${msg.time}</small>`;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 4000);
  fomoIdx++;
}
setTimeout(() => { showFomoPopup(); setInterval(showFomoPopup, 15000); }, 5000);

// === COUNTDOWN TIMER ===
function updateTimer() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = end - now;
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('timer-h').textContent = String(h).padStart(2, '0');
  document.getElementById('timer-m').textContent = String(m).padStart(2, '0');
  document.getElementById('timer-s').textContent = String(s).padStart(2, '0');
}
setInterval(updateTimer, 1000);
updateTimer();

// === TICKER DUPLICATION ===
const tickerInner = document.querySelector('.ticker-inner');
if (tickerInner) tickerInner.innerHTML += tickerInner.innerHTML;

// === VIEWER COUNT RANDOMIZER ===
setInterval(() => {
  document.querySelectorAll('.product-viewers').forEach(el => {
    const text = el.textContent;
    const match = text.match(/\d+/);
    const base = match ? parseInt(match[0]) : 5;
    const newVal = base + Math.floor(Math.random() * 5) - 2;
    el.innerHTML = `👁 ${Math.max(1, newVal)} viewing`;
  });
}, 8000);

// === INIT ===
renderProducts('all');
renderFAQ();
observeReveals();
