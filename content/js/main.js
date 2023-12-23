// Start Aside code //
const btnNavBars = document.querySelector(".nav__icon-bars");
const navLinks = document.querySelector(".nav__links");
const btnCloseAside = document.querySelector(".close__aside");
btnNavBars.addEventListener("click", () =>{
    navLinks.classList.add("active")
});
btnCloseAside.addEventListener("click", () =>{
    navLinks.classList.remove("active")
});
// End Aside code //


// Start Arrow To Top //
const arrow_to_top = document.querySelector(".arrow-to-top");
arrow_to_top.addEventListener("click", ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
arrow_to_top.style.display = "none"
window.addEventListener("scroll", ()=>{
    if (window.scrollY >= 350) {
        arrow_to_top.style.display = "flex"
    }else{
        arrow_to_top.style.display = "none"
    };
});
// End Arrow To Top //
