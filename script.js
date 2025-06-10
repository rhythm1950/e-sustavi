// Demo data
const cards = [
    {
        img: "./assets/news-1.png",
        title: "Odoo Roadshow 2023 held in Zagreb",
        date: "April 05, 2023"
    },
    {
        img: "./assets/news-2.png",
        title: "Odoo Roadshow 2023 held in Zagreb",
        date: "April 05, 2023"
    },
    {
        img: "./assets/news-3.png",
        title: "Odoo Roadshow 2023 held in Zagreb",
        date: "April 05, 2023"
    },
    {
        img: "./assets/news-4.png",
        title: "Odoo Roadshow 2023 held in Zagreb",
        date: "April 05, 2023"
    },
    {
        img: "./assets/news-1.png",
        title: "Odoo Roadshow 2023 held in Zagreb",
        date: "April 05, 2023"
    },
    {
        img: "./assets/news-2.png",
        title: "Odoo Roadshow 2023 held in Zagreb",
        date: "April 05, 2023"
    }
];

const odooLogo = "./assets/membership-5.png"; // Use your logo

const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const viewport = document.querySelector('.carousel-viewport');

let cardsToShow = 4;
let cardWidth = 0;
let gap = 0;
let currentIndex = 0;
let isTransitioning = false;

function getCardsToShow() {
    if (window.innerWidth <= 800) return 2;
    if (window.innerWidth <= 1100) return 3;
    return 4;
}

// Create clones for infinite effect
function renderCarousel() {
    carousel.innerHTML = '';
    cardsToShow = getCardsToShow();

    // Clone last N cards and first N cards
    const clonesBefore = cards.slice(-cardsToShow);
    const clonesAfter = cards.slice(0, cardsToShow);
    const fullList = [...clonesBefore, ...cards, ...clonesAfter];

    fullList.forEach(card => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        cardDiv.innerHTML = `
            <img src="${card.img}" alt="${card.title}" class="card-img">
            <div class="card-info">
                <img src="${odooLogo}" alt="Odoo Logo" class="odoo-logo">
                <div>
                    <div class="card-title">${card.title}</div>
                    <div class="card-date">${card.date}</div>
                </div>
            </div>
        `;
        carousel.appendChild(cardDiv);
    });

    // Set initial index to first real slide
    currentIndex = cardsToShow;
    setTimeout(() => updateCarousel(true), 10); // Wait for DOM paint
}

function updateCarousel(jump = false) {
    cardsToShow = getCardsToShow();

    const card = carousel.querySelector('.card');
    if (!card) return;
    const cardStyle = window.getComputedStyle(card);
    cardWidth = card.offsetWidth;
    gap = parseInt(cardStyle.marginRight) || parseInt(getComputedStyle(carousel).gap) || 0;

    const slideX = (cardWidth + gap) * currentIndex;
    carousel.style.transition = jump ? 'none' : 'transform 0.5s cubic-bezier(.6,.05,.28,.91)';
    carousel.style.transform = `translateX(-${slideX}px)`;
}

function handleNext() {
    if (isTransitioning) return;
    cardsToShow = getCardsToShow();
    isTransitioning = true;
    currentIndex++;
    updateCarousel();
}

function handlePrev() {
    if (isTransitioning) return;
    cardsToShow = getCardsToShow();
    isTransitioning = true;
    currentIndex--;
    updateCarousel();
}

carousel.addEventListener('transitionend', () => {
    cardsToShow = getCardsToShow();
    // If at clone after real slides, jump to real first
    if (currentIndex === cards.length + cardsToShow) {
        carousel.style.transition = 'none';
        currentIndex = cardsToShow;
        updateCarousel(true);
    }
    // If at clone before real slides, jump to real last
    if (currentIndex === 0) {
        carousel.style.transition = 'none';
        currentIndex = cards.length;
        updateCarousel(true);
    }
    isTransitioning = false;
});

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

// Keyboard arrow navigation
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "ArrowRight") nextBtn.click();
});

// Touch swipe support (for mobile)
let startX = null;
viewport.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
});
viewport.addEventListener('touchmove', function (e) {
    if (startX === null) return;
    let diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            handlePrev();
        } else {
            handleNext();
        }
        startX = null;
    }
});
viewport.addEventListener('touchend', function () {
    startX = null;
});

// Recalculate on resize
window.addEventListener('resize', () => {
    renderCarousel();
});

window.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
});