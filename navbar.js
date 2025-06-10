const navItems = document.querySelectorAll('.navbar-menu ul li');

navItems.forEach(item => {
    item.addEventListener('click', function () {
        navItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Optional: Set active based on current page
const currentPath = window.location.pathname.split("/").pop();
navItems.forEach(item => {
    const anchor = item.querySelector("a");
    if (anchor && anchor.getAttribute("href") === currentPath) {
        item.classList.add("active");
    }
});
