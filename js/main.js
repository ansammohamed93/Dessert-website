// GSAP Hero Animation
gsap.from(".hero-title", { duration: 1.4, y: 70, opacity: 0, ease: "power4.out" });
gsap.from(".hero-subtitle", { duration: 1.2, delay: 0.3, y: 70, opacity: 0, ease: "power4.out" });
gsap.from(".hero-btn", { duration: 1, delay: 0.6, y: 50, opacity: 1, ease: "power4.out" });
// صورة تدخل من اليسار، النص من اليمين
// gsap.from(".about-image", { duration: 1, x: -100, opacity: 0, ease: "power3.out", scrollTrigger: ".about-section" });
// gsap.from(".about-text", { duration: 1, x: 100, opacity: 0, delay: 0.3, ease: "power3.out", scrollTrigger: ".about-section" });

// صورة تدخل من اليسار
gsap.from(".about-image", {
  duration: 1,
  x: -50,
  opacity: 0,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%",
  }
});

// نص يدخل من اليمين
gsap.from(".about-text", {
  duration: 1,
  x: 50,
  opacity: 0,
  delay: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".about-section",
    start: "top 80%", } }); 
    // ===== Contact Animation ===== 
  gsap.from(".contact .content", {
     scrollTrigger: ".contact", 
     x: -60,
     opacity: 0,
      duration: 1,
       ease: "power3.out" });
   gsap.from(".contact .map", { 
    scrollTrigger: ".contact", x: 60, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
    // ===== Footer Animation ===== 
gsap.from("#footer-main .row > div", { scrollTrigger: "#footer", y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" });




// ===== Cake Builder JS =====
const canvas = document.getElementById('cakeCanvas');
const ctx = canvas.getContext('2d');

let cakeBase = null;
let elements = []; // كل الكريم والفواكه وال toppings هنا
let draggingElement = null;

// Image Loader
function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
}

// رسم كل حاجة على الكانفاس
async function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Base
  if (cakeBase) ctx.drawImage(cakeBase.img, 0, 0, canvas.width, canvas.height);

  // Extras
  elements.forEach(el => {
    ctx.drawImage(el.img, el.x, el.y, el.size, el.size);
  });
}

// ===== اختيار Base =====
document.querySelectorAll('.cake-base').forEach(base => {
  base.addEventListener('click', async () => {
    const type = base.dataset.type;
    cakeBase = { type, img: await loadImage(base.src) };
    drawCanvas();
  });
});

// ===== إضافة Cream أو Toppings =====
document.querySelectorAll('.cake-cream, .cake-extra').forEach(item => {
  item.addEventListener('click', async () => {
    const imgObj = await loadImage(item.src);
    elements.push({
      type: item.dataset.type,
      img: imgObj,
      x: canvas.width/2 - 30, // مركز الكانفاس
      y: canvas.height/2 - 30,
      size: 60
    });
    drawCanvas();
  });
});

// ===== Drag & Drop =====
canvas.addEventListener('mousedown', e => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    if (mouseX >= el.x && mouseX <= el.x + el.size && mouseY >= el.y && mouseY <= el.y + el.size) {
      draggingElement = el;
      break;
    }
  }
});

canvas.addEventListener('mousemove', e => {
  if (!draggingElement) return;
  const rect = canvas.getBoundingClientRect();
  draggingElement.x = e.clientX - rect.left - draggingElement.size/2;
  draggingElement.y = e.clientY - rect.top - draggingElement.size/2;
  drawCanvas();
});

canvas.addEventListener('mouseup', () => { draggingElement = null; });
canvas.addEventListener('mouseleave', () => { draggingElement = null; });

// ===== Undo =====
document.getElementById('undoBtn').addEventListener('click', () => {
  elements.pop();
  drawCanvas();
});

// ===== Clear All =====
document.getElementById('clearBtn').addEventListener('click', () => {
  elements = [];
  cakeBase = null;
  drawCanvas();
});



// ===== Offers Data =====
gsap.from(".offer-image", {
  scrollTrigger: "#offers",
  scale: 0.7,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".discount-badge", {
  scrollTrigger: "#offers",
  scale: 0,
  rotation: -180,
  duration: 1,
  delay: 0.3,
  ease: "back.out(1.7)"
});


document.querySelectorAll(".stars").forEach(starBox => {
  const rate = starBox.dataset.rate;
  starBox.innerHTML = "⭐".repeat(rate) + "☆".repeat(5 - rate);
});







// ===== Newsletter Form Submission (EmailJS example) =====
const newsletterForm = document.getElementById("newsletterForm");
const formMessage = document.getElementById("formMessage");

newsletterForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const feedback = document.getElementById("feedback").value;

  // EmailJS Example
  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
    from_email: email,
    message: feedback
  }).then(() => {
    formMessage.textContent = "Thank you! Your feedback has been sent.";
    newsletterForm.reset();
  }).catch(() => {
    formMessage.textContent = "Oops! Something went wrong, try again.";
  });
});
