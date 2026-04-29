// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "";
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

const priceBtn = document.getElementById("priceBtn");
priceBtn.addEventListener("click", (event) => {
  const rect = priceBtn.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const ripple = document.createElement("span");
  ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(255,255,255,0.7);transform:scale(0);animation:ripple 0.6s linear;width:100px;height:100px;top:${y - 50}px;left:${x - 50}px;pointer-events:none;`;
  priceBtn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
  setTimeout(() => {
    alert(
      "Прайс-лист будет доступен для скачивания после обновления контактной информации. Мы свяжемся с вами в ближайшее время.",
    );
  }, 600);
});

function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 150) {
      reveals[i].classList.add("active");
      const progressBar = document.getElementById("experience-bar");
      if (progressBar && !progressBar.classList.contains("animated")) {
        progressBar.classList.add("animated");
        setTimeout(() => {
          progressBar.style.width = "100%";
        }, 300);
      }
    }
  }
}

function animateCounter() {
  const counter = document.getElementById("years-counter");
  if (counter && !counter.classList.contains("animated")) {
    counter.classList.add("animated");
    let count = 0;
    const target = 6;
    const updateCount = () => {
      if (count < target) {
        count += target / 100;
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  }
}

window.addEventListener("load", () => {
  document
    .querySelectorAll(".slideInLeft, .slideInRight")
    .forEach((el) => el.classList.add("animated"));
  reveal();
});
window.addEventListener("scroll", reveal);

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      animateCounter();
    }
  });
}, observerOptions);

document.querySelectorAll(".product-card, .benefit-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s, transform 0.5s";
  observer.observe(el);
});

// ✅ TUZATILGAN FORMA: Telegram API to'g'ri ishlaydi
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = submitBtn.querySelector("span");
  const submitBtnIcon = submitBtn.querySelector("i");

  const botToken = "8531086708:AAFVgJWEj3Hz2PNW-46quXzqt7KUI0JRJQI";
  const chatId = "7874501248";

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let digits = e.target.value.replace(/\D/g, "");
      if (digits.startsWith("7")) digits = digits.substring(1);
      if (digits.startsWith("8")) digits = digits.substring(1);
      let result = "+7";
      if (digits.length > 0) result += " (" + digits.substring(0, 3);
      if (digits.length >= 3) result += ") " + digits.substring(3, 6);
      if (digits.length >= 6) result += "-" + digits.substring(6, 8);
      if (digits.length >= 8) result += "-" + digits.substring(8, 10);
      e.target.value = result;
    });
  }

  function validateForm() {
    let isValid = true;
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;

    document.querySelectorAll(".error-message").forEach((el) => {
      el.style.display = "none";
    });

    if (!name || name.length < 2) {
      document.getElementById("name-error").style.display = "block";
      isValid = false;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 11) {
      document.getElementById("phone-error").style.display = "block";
      isValid = false;
    }

    if (!product) {
      document.getElementById("product-error").style.display = "block";
      isValid = false;
    }

    return isValid;
  }

  function formatTelegramMessage(formData) {
    const date = new Date().toLocaleString("ru-RU");
    return (
      "📩 НОВАЯ ЗАЯВКА С САЙТА ТЕХНОПРОМ\n\n" +
      "📅 Дата: " +
      date +
      "\n" +
      "👤 Имя: " +
      formData.name +
      "\n" +
      "📞 Телефон: " +
      formData.phone +
      "\n" +
      "🏭 Продукция: " +
      formData.product +
      "\n" +
      "📝 Комментарий: " +
      (formData.message || "Не указано") +
      "\n\n" +
      "🔗 Источник: technoprom.net"
    );
  }

  async function sendToTelegram(formData) {
    const message = formatTelegramMessage(formData);
    const url = "https://api.telegram.org/bot" + botToken + "/sendMessage";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error("Telegram error: " + err);
    }

    const data = await response.json();
    if (!data.ok) throw new Error("Telegram API: " + data.description);
    return true;
  }

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      const formData = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        product: document.getElementById("product").value,
        message: document.getElementById("message").value.trim(),
      };

      submitBtn.disabled = true;
      submitBtnText.textContent = "Отправка...";
      submitBtnIcon.className = "fas fa-spinner fa-spin";

      try {
        await sendToTelegram(formData);

        contactForm.style.display = "none";
        successMessage.style.display = "flex";
        contactForm.reset();

        let seconds = 10;
        const timerElement = document.querySelector(".timer");
        const timerInterval = setInterval(() => {
          timerElement.textContent =
            "Перенаправление через " + seconds + " сек...";
          seconds--;
          if (seconds < 0) {
            clearInterval(timerInterval);
            window.scrollTo({
              top: document.getElementById("contact-form").offsetTop - 100,
              behavior: "smooth",
            });
            setTimeout(() => {
              successMessage.style.display = "none";
              contactForm.style.display = "flex";
              timerElement.textContent = "Ожидайте звонка";
            }, 3000);
          }
        }, 1000);
      } catch (error) {
        console.error("Send error:", error);
        alert(
          "Произошла ошибка при отправке заявки. Пожалуйста, свяжитесь с нами напрямую по телефону +7 (995) 294-44-10 или в Telegram.",
        );
      } finally {
        submitBtn.disabled = false;
        submitBtnText.textContent = "Отправить заявку";
        submitBtnIcon.className = "fas fa-paper-plane";
      }
    });
  }

  document
    .querySelectorAll(".form-input, .form-select, .form-textarea")
    .forEach((input) => {
      input.addEventListener("input", function () {
        const errorEl = document.getElementById(this.id + "-error");
        if (errorEl) errorEl.style.display = "none";
      });
    });
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 850 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "";
  }
});

document.addEventListener("touchstart", function () {}, {
  passive: true,
});
