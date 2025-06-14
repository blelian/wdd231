export function initNavigation() {
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
}