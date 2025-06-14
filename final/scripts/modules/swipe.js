export function initSwipe({ setActive, resetSlideshow, getCurrentIndex, setCurrentIndex }) {
    const heroSection = document.querySelector("#hero-gallery");
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
        const index = getCurrentIndex();
        if (touchEndX < touchStartX - 50) {
            const newIndex = (index + 1) % document.querySelectorAll(".hero-image").length;
            setCurrentIndex(newIndex);
            setActive(newIndex);
            resetSlideshow();
        } else if (touchEndX > touchStartX + 50) {
            const newIndex = (index - 1 + document.querySelectorAll(".hero-image").length) % document.querySelectorAll(".hero-image").length;
            setCurrentIndex(newIndex);
            setActive(newIndex);
            resetSlideshow();
        }
    }
}