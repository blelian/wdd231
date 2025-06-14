export function initSlideshow() {
    const images = document.querySelectorAll(".hero-image");
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains("active"));
    if (currentIndex === -1) currentIndex = 0;

    let slideshowInterval = null;
    let isPaused = true;

    // Activate image by index
    function setActive(index) {
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");
    }

    // Advance slides automatically
    function resetSlideshow() {
        if (!isPaused) {
            clearInterval(slideshowInterval);
            slideshowInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                setActive(currentIndex);
            }, 5000);
        }
    }

    // Click-to-jump behavior
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            if (index === currentIndex) return;
            currentIndex = index;
            setActive(currentIndex);
            resetSlideshow();
        });
    });

    const heroSection = document.querySelector("#hero-gallery");

    // Arrow buttons
    const createArrowButton = (label, symbol) => {
        const btn = document.createElement("button");
        btn.setAttribute("aria-label", `${label} slide`);
        btn.textContent = symbol;
        Object.assign(btn.style, {
            background: "black",
            color: "white",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "5px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            opacity: "0.7",
            zIndex: "999",
        });
        return btn;
    };

    const prevBtn = createArrowButton("Previous", "◀");
    const nextBtn = createArrowButton("Next", "▶");
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

    heroSection.append(prevBtn, nextBtn);

    // Play/pause button
    const toggleBtn = document.createElement("button");
    toggleBtn.setAttribute("aria-label", "Play slideshow");
    toggleBtn.textContent = "▶";
    Object.assign(toggleBtn.style, {
        display: "block",
        margin: "3rem auto",      // increased spacing below hero section
        background: "black",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        cursor: "pointer",
        borderRadius: "5px",
        opacity: "0.8",
        zIndex: "999",
    });

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
            toggleBtn.textContent = "▶";
            toggleBtn.setAttribute("aria-label", "Play slideshow");
            isPaused = true;
        }
    });

    heroSection.after(toggleBtn);
    setActive(currentIndex);

    return {
        setActive,
        resetSlideshow,
        getCurrentIndex: () => currentIndex,
        setCurrentIndex: i => { currentIndex = i; }
    };
}
