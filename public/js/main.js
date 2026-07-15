// Sticky Navbar
window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

// Animated Counter
const counters = document.querySelectorAll(".count");

counters.forEach(counter => {

    const update = () => {

        const target = +counter.dataset.target;

        const current = +counter.innerText;

        const increment = Math.ceil(target / 120);

        if (current < target) {

            counter.innerText = current + increment;

            setTimeout(update, 30);

        } else {

            counter.innerText = target;

        }

    };

    update();

});

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>80){

navbar.style.padding="12px 0";

navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

}

else{

navbar.style.padding="18px 0";

navbar.style.boxShadow="none";

}

});

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    // Toggle menu
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.classList.toggle("active");
    });

    // Close when clicking a menu link
    document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {

        if (
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            navMenu.classList.remove("active");
        }

    });

    // Optional: Close with ESC key
    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {
            navMenu.classList.remove("active");
        }

    });

});



document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".why-card");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));

});