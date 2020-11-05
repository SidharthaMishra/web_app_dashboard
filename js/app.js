const searchIcon = document.querySelector(".search");
const mobileSearchBox = document.querySelector(".mobile-search-box>input");

searchIcon.addEventListener("click", function() {

    if (mobileSearchBox.classList.contains("hidden")) {
        mobileSearchBox.classList.add("fadeIn");
        mobileSearchBox.classList.remove("hidden");
    } else if (mobileSearchBox.classList.contains("fadeIn")) {
        mobileSearchBox.classList.remove("fadeIn");
        mobileSearchBox.classList.add("fadeOut");
    } else if (mobileSearchBox.classList.contains("fadeOut")) {
        mobileSearchBox.classList.remove("fadeOut");
        mobileSearchBox.classList.add("fadeIn");
    }

});