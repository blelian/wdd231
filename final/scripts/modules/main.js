import { initSlideshow } from './slideshow.js';
import { initSwipe } from './swipe.js';

document.addEventListener("DOMContentLoaded", () => {
    const { setActive, resetSlideshow, getCurrentIndex, setCurrentIndex } = initSlideshow();
    initSwipe({ setActive, resetSlideshow, getCurrentIndex, setCurrentIndex });
});