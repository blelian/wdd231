document.addEventListener("DOMContentLoaded", () => {
  // === HERO IMAGE SLIDESHOW ===
  const images = document.querySelectorAll(".hero-image");
  let currentIndex = Array.from(images).findIndex(img => img.classList.contains("active"));
  if (currentIndex === -1) currentIndex = 0;

  function setActive(index) {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (index === currentIndex) return;
      currentIndex = index;
      setActive(currentIndex);
      resetSlideshow();
    });
  });

  setActive(currentIndex);

  let slideshowInterval = null;
  let isPaused = true;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "▶️";
  toggleBtn.setAttribute("aria-label", "Play slideshow");
  toggleBtn.classList.add("slideshow-toggle");

  toggleBtn.addEventListener("click", () => {
    if (isPaused) {
      slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        setActive(currentIndex);
      }, 5000);
      toggleBtn.textContent = "⏸️";
      toggleBtn.setAttribute("aria-label", "Pause slideshow");
      isPaused = false;
    } else {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      toggleBtn.textContent = "▶️";
      toggleBtn.setAttribute("aria-label", "Play slideshow");
      isPaused = true;
    }
  });

  function resetSlideshow() {
    if (!isPaused) {
      clearInterval(slideshowInterval);
      slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        setActive(currentIndex);
      }, 5000);
    }
  }

  const heroSection = document.querySelector("#hero-gallery");
  heroSection.appendChild(toggleBtn);

  // === HAMBURGER MENU SETUP ===
  const nav = document.querySelector("nav");
  const navList = nav?.querySelector("ul");

  if (nav && navList) {
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.textContent = "☰";
    hamburgerBtn.setAttribute("aria-label", "Toggle navigation menu");
    hamburgerBtn.classList.add("hamburger-menu");
    
    nav.insertBefore(hamburgerBtn, nav.firstChild);

    hamburgerBtn.addEventListener("click", () => {
      navList.classList.toggle("show");
      hamburgerBtn.classList.toggle("active");
    });
  }
});
