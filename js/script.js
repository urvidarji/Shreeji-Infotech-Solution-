// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hero rotating typewriter effect
const typerEl = document.getElementById('heroTyper');
if(typerEl){
  const phrases = [
    'web & mobile development.',
    'CRM & sales automation.',
    'digital marketing & SEO.',
    'AI & workflow automation.',
    'cloud setup & migration.',
    'outsourcing & IT consultancy.'
  ];
  let pIndex = 0, charIndex = 0, deleting = false;
  const cursor = document.createElement('span');
  cursor.className = 'typer-cursor';
  cursor.textContent = '\u00A0';
  typerEl.after(cursor);

  function tick(){
    const current = phrases[pIndex];
    if(!deleting){
      charIndex++;
      typerEl.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      typerEl.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        pIndex = (pIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
}

// Mobile burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=>{
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link, .nav-cta').forEach(l=>{
  l.addEventListener('click', ()=> navLinks.classList.remove('open'));
});

// Animated counters
const counters = document.querySelectorAll('.count');
let countersStarted = false;
function animateCounters(){
  counters.forEach(c=>{
    const target = +c.dataset.target;
    let cur = 0;
    const step = Math.max(target/60, 1);
    const tick = ()=>{
      cur += step;
      if(cur >= target){ c.textContent = target; return; }
      c.textContent = Math.floor(cur);
      requestAnimationFrame(tick);
    };
    tick();
  });
}
const counterSection = document.querySelector('.counters');
const counterObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting && !countersStarted){
      countersStarted = true;
      animateCounters();
    }
  });
},{threshold:0.4});
counterObserver.observe(counterSection);

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
},{threshold:0.15});
revealEls.forEach(el=> revealObserver.observe(el));

// Testimonials slider
const slidesWrap = document.getElementById('testiSlides');
const slides = slidesWrap.children;
const dotsWrap = document.getElementById('testiDots');
let testiIndex = 0;
for(let i=0;i<slides.length;i++){
  const dot = document.createElement('div');
  dot.className = 'testi-dot' + (i===0?' active':'');
  dot.addEventListener('click', ()=> goToSlide(i));
  dotsWrap.appendChild(dot);
}
const dots = dotsWrap.children;
function goToSlide(i){
  testiIndex = (i+slides.length) % slides.length;
  slidesWrap.style.transform = `translateX(-${testiIndex*100}%)`;
  [...dots].forEach((d,idx)=> d.classList.toggle('active', idx===testiIndex));
}
document.getElementById('testiPrev').addEventListener('click', ()=> goToSlide(testiIndex-1));
document.getElementById('testiNext').addEventListener('click', ()=> goToSlide(testiIndex+1));
setInterval(()=> goToSlide(testiIndex+1), 6000);

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click', ()=>{
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i=> i.classList.remove('active'));
    if(!isActive) item.classList.add('active');
  });
});
