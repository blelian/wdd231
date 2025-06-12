document.addEventListener("DOMContentLoaded", () => {
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
  toggleBtn.setAttribute("aria-label", "Play slideshow");
  toggleBtn.classList.add("slideshow-toggle");

  toggleBtn.style.backgroundColor = "black";
  toggleBtn.style.color = "white";
  toggleBtn.style.border = "none";
  toggleBtn.style.padding = "0.5rem 1rem";
  toggleBtn.style.borderRadius = "5px";
  toggleBtn.style.cursor = "pointer";
  toggleBtn.style.outline = "none";
  toggleBtn.style.boxShadow = "none";
  toggleBtn.textContent = "▶";

  toggleBtn.addEventListener("click", () => {
    if (isPaused) {
      slideshowInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        setActive(currentIndex);
      }, 5000);
      toggleBtn.textContent = "⏸";
      toggleBtn.setAttribute("aria-label", "Pause slideshow");
      isPaused = false;
    } else {
      clearInterval(slideshowInterval);
      slideshowInterval = null;
      toggleBtn.textContent = "▶";
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

  const prevBtn = document.createElement("button");
  prevBtn.setAttribute("aria-label", "Previous slide");
  prevBtn.classList.add("nav-arrow");
  prevBtn.textContent = "◀";

  const nextBtn = document.createElement("button");
  nextBtn.setAttribute("aria-label", "Next slide");
  nextBtn.classList.add("nav-arrow");
  nextBtn.textContent = "▶";

  [prevBtn, nextBtn].forEach(btn => {
    btn.style.backgroundColor = "black";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.padding = "0.25rem 0.5rem";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "5px";
    btn.style.position = "absolute";
    btn.style.top = "50%";
    btn.style.transform = "translateY(-50%)";
    btn.style.opacity = "0.7";
    btn.style.zIndex = "999";
    btn.style.outline = "none";
    btn.style.boxShadow = "none";
  });

  prevBtn.style.left = "10px";
  nextBtn.style.right = "10px";

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setActive(currentIndex);
    resetSlideshow();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    setActive(currentIndex);
    resetSlideshow();
  });

  heroSection.appendChild(prevBtn);
  heroSection.appendChild(nextBtn);

  let touchStartX = 0;
  let touchEndX = 0;

  heroSection.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  heroSection.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
  }, false);

  function handleSwipeGesture() {
    if (touchEndX < touchStartX - 50) {
      currentIndex = (currentIndex + 1) % images.length;
      setActive(currentIndex);
      resetSlideshow();
    } else if (touchEndX > touchStartX + 50) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      setActive(currentIndex);
      resetSlideshow();
    }
  }

  const nav = document.querySelector("nav");
  const navList = nav?.querySelector("ul");

  if (nav && navList) {
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.textContent = "☰";
    hamburgerBtn.setAttribute("aria-label", "Toggle navigation menu");
    hamburgerBtn.classList.add("hamburger-menu");

    nav.insertBefore(hamburgerBtn, nav.firstChild);

    hamburgerBtn.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      navList.classList.toggle("show");
      hamburgerBtn.classList.toggle("active");
    });
  }
});
