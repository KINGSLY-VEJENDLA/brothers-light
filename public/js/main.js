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