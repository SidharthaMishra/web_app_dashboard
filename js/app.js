const searchIcon = document.querySelector(".search");
const mobileSearchBox = document.querySelector(".mobile-search-box>input");

searchIcon.addEventListener("click", function() {

    if (mobileSearchBox.classList.contains("hidden")) {
        mobileSearchBox.classList.add("slideIn");
        mobileSearchBox.classList.remove("hidden");
    } else if (mobileSearchBox.classList.contains("slideIn")) {
        mobileSearchBox.classList.remove("slideIn");
        mobileSearchBox.classList.add("slideOut");
    } else if (mobileSearchBox.classList.contains("slideOut")) {
        mobileSearchBox.classList.remove("slideOut");
        mobileSearchBox.classList.add("slideIn");
    }

});