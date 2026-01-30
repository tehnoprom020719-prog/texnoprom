// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");
  mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';

  // Toggle body scroll
  document.body.style.overflow = navLinks.classList.contains("active")
    ? "hidden"
    : "";
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "";
  });
});

// Smooth scrolling for navigation links
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

// Download price list button
const priceBtn = document.getElementById("priceBtn");
priceBtn.addEventListener("click", () => {
  // Ripple effect
  const rect = priceBtn.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ripple = document.createElement("span");
  ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: 100px;
                height: 100px;
                top: ${y - 50}px;
                left: ${x - 50}px;
                pointer-events: none;
            `;

  priceBtn.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);

  // Alert message
  setTimeout(() => {
    alert(
      "Прайс-лист будет доступен для скачивания после обновления контактной информации. Мы свяжемся с вами в ближайшее время.",
    );
  }, 600);
});

// Scroll reveal animation
function reveal() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");

      // Trigger counter animation for years counter
      if (
        reveals[i].id === "years-counter" ||
        reveals[i].querySelector(".counter")
      ) {
        animateCounter();
      }

      // Trigger progress bar animation
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

// Counter animation
function animateCounter() {
  const counter = document.getElementById("years-counter");
  if (counter && !counter.classList.contains("animated")) {
    counter.classList.add("animated");

    let count = 0;
    const target = 6;
    const increment = target / 100;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  }
}

// Initialize animations on load
window.addEventListener("load", () => {
  // Add animated class to elements that should animate immediately
  document.querySelectorAll(".slideInLeft, .slideInRight").forEach((el) => {
    el.classList.add("animated");
  });

  // Trigger initial reveal check
  reveal();
});

// Check for scroll to trigger reveal animations
window.addEventListener("scroll", reveal);

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe product cards and benefit items
document.querySelectorAll(".product-card, .benefit-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s, transform 0.5s";
  observer.observe(el);
});

// Kontakt formasi uchun JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = submitBtn.querySelector("span");
  const submitBtnIcon = submitBtn.querySelector("i");

  // Telegram Bot Configuration
  const botToken = "8531086708:AAFVgJWEj3Hz2PNW-46quXzqt7KUI0JRJQI";
  const chatId = "7874501248";

  // Phone input mask
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (x) {
        e.target.value =
          "+7" +
          (x[2] ? " (" + x[2] : "") +
          (x[3] ? ") " + x[3] : "") +
          (x[4] ? "-" + x[4] : "") +
          (x[5] ? "-" + x[5] : "");
      }
    });

    // iOS uchun zoomni oldini olish
    phoneInput.addEventListener("focus", function () {
      if (window.innerWidth <= 768) {
        this.style.fontSize = "16px";
      }
    });

    phoneInput.addEventListener("blur", function () {
      this.style.fontSize = "";
    });
  }

  // Form validation
  function validateForm() {
    let isValid = true;
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((el) => {
      el.style.display = "none";
    });

    // Validate name
    if (!name) {
      document.getElementById("name-error").style.display = "block";
      isValid = false;
    }

    // Validate phone (simple Russian phone validation)
    const phoneRegex = /^\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[\-]?\d{2}[\-]?\d{2}$/;
    if (!phone || !phoneRegex.test(phone)) {
      document.getElementById("phone-error").style.display = "block";
      isValid = false;
    }

    // Validate product
    if (!product) {
      document.getElementById("product-error").style.display = "block";
      isValid = false;
    }

    return isValid;
  }

  // Format message for Telegram
  function formatTelegramMessage(formData) {
    const date = new Date().toLocaleString("ru-RU");
    return (
      `📩 НОВАЯ ЗАЯВКА С САЙТА ТЕХНОПРОМ\n\n` +
      `📅 Дата: ${date}\n` +
      `👤 Имя: ${formData.name}\n` +
      `📞 Телефон: ${formData.phone}\n` +
      `🏭 Продукция: ${formData.product}\n` +
      `📝 Комментарий: ${formData.message || "Не указано"}\n\n` +
      `🔗 Источник: https://технопром.net`
    );
  }

  // Send data to Telegram
  async function sendToTelegram(formData) {
    const message = formatTelegramMessage(formData);
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      return false;
    }
  }

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      // Get form data
      const formData = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        product: document.getElementById("product").value,
        message: document.getElementById("message").value.trim(),
      };

      // Change button state to "Sending..."
      submitBtn.disabled = true;
      submitBtnText.textContent = "Отправка...";
      submitBtnIcon.className = "fas fa-spinner fa-spin";

      try {
        // Send to Telegram
        const success = await sendToTelegram(formData);

        if (success) {
          // Show success message
          contactForm.style.display = "none";
          successMessage.style.display = "flex";

          // Reset form
          contactForm.reset();

          // Start countdown timer
          let seconds = 10;
          const timerElement = document.querySelector(".timer");
          const timerInterval = setInterval(() => {
            timerElement.textContent = `Перенаправление через ${seconds} сек...`;
            seconds--;

            if (seconds < 0) {
              clearInterval(timerInterval);
              // Scroll to top of form section
              window.scrollTo({
                top: document.getElementById("contact-form").offsetTop - 100,
                behavior: "smooth",
              });

              // After 3 seconds, show form again
              setTimeout(() => {
                successMessage.style.display = "none";
                contactForm.style.display = "flex";
                timerElement.textContent = "Ожидайте звонка";
              }, 3000);
            }
          }, 1000);
        } else {
          throw new Error("Telegram API error");
        }
      } catch (error) {
        // Show error message
        alert(
          "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.",
        );
      } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtnText.textContent = "Отправить заявку";
        submitBtnIcon.className = "fas fa-paper-plane";
      }
    });
  }

  // Real-time validation
  const inputs = document.querySelectorAll(
    ".form-input, .form-select, .form-textarea",
  );
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorId = this.id + "-error";
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.style.display = "none";
      }
    });

    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        const errorId = this.id + "-error";
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.style.display = "block";
        }
      }
    });
  });
});

// Window resize handler
window.addEventListener("resize", function () {
  // Close mobile menu if open on larger screens
  if (window.innerWidth > 850 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "";
  }
});

// Touch event handlers for better mobile experience
document.addEventListener("touchstart", function () {}, {
  passive: true,
});
