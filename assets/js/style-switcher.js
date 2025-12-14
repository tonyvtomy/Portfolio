/*----------------------------- Toggle Style Switcher -----------------------------------------*/

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style-switcher").classList.toggle("open");
});

// hide style-switcher on scroll
window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
});

/*----------------------------- Theme Colors -----------------------------------------*/

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    localStorage.setItem("color", color);
    changeColor();
}

function changeColor() {
    alternateStyles.forEach((style) => {
        if (localStorage.getItem("color") === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
        if (document.querySelector(".style-switcher").classList.contains("open")) {
            document.querySelector(".style-switcher").classList.remove("open");
        }
    });

    // Update particles when color changes
    const isDark = document.body.classList.contains("dark");
    if (typeof initParticles === "function") {
        initParticles(isDark, getSkinColor());
    }
}

// check if 'color' key exists
if (localStorage.getItem("color") !== null) {
    changeColor();
} else {
    // If no color saved, still init particles with default
    /* We can call initParticles directly or let window.onload handle it.
       window.onload handles it at the bottom of the file. */
}

/*----------------------------- Theme light and dark mode -----------------------------------------*/

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
    updateIcon();

    // Update particles
    const isDark = document.body.classList.contains("dark");
    if (typeof initParticles === "function") {
        initParticles(isDark, getSkinColor());
    }
})

function themeMode() {
    // checking if 'theme' key exists
    if (localStorage.getItem("theme") !== null) {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.remove("dark");
        }
        else {
            document.body.classList.add("dark");
        }
    }
}



themeMode();
updateIcon();

function updateIcon() {
    if (document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else {
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
}

// Helper to get skin color
function getSkinColor() {
    const colorMap = {
        "color-1": "#fb839e",
        "color-2": "#ec9412",
        "color-3": "#1fc586",
        "color-4": "#2eb1ed",
        "color-5": "#cc3a3b"
    }
    const currentColor = localStorage.getItem("color") || "color-1";
    return colorMap[currentColor] || "#fb839e";
}

// Initialize particles on load
window.addEventListener("load", () => {
    // Only init if not already handled by changeColor (though calling twice is usually fine if it overwrites)
    // Actually, ensuring it runs once everything is ready is good.
    const isDark = document.body.classList.contains("dark");
    if (typeof initParticles === "function") {
        initParticles(isDark, getSkinColor());
    }
});
