import { initSlideshow } from './slideshow.js';
import { initNavigation } from './navigation.js';
import { initSwipe } from './swipe.js';

document.addEventListener("DOMContentLoaded", () => {
    const { setActive, resetSlideshow, getCurrentIndex, setCurrentIndex } = initSlideshow();
    initNavigation();
    initSwipe({ setActive, resetSlideshow, getCurrentIndex, setCurrentIndex });
});