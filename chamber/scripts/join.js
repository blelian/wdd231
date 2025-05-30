
document.querySelectorAll(".membership-cards a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.querySelector(link.getAttribute("href"));
        if (modal) modal.showModal();
    });
});

document.getElementById("membershipForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        params.append(key, value);
    }

    window.location.href = `thank-you.html?${params.toString()}`;
});

const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});