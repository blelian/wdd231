document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".hero-image");

  let currentIndex = Array.from(images).findIndex(img => img.classList.contains("active"));
  if (currentIndex === -1) currentIndex = 0;
  
  function setActive(index) {
    images.forEach((img, i) => {
      img.classList.remove("active");
    });
    images[index].classList.add("active");
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (index === currentIndex) return;
      currentIndex = index;
      setActive(currentIndex);
    });
  });

  setActive(currentIndex);
});
