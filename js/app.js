document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.querySelector(".search");
    const mobileSearchBox = document.querySelector(".mobile-search-box>input");
    const bell = document.querySelector(".bell");
    const notificationBadge = document.querySelector(".notification-badge");
    const notificationsDropdown = document.querySelector(".notifications-dropdown");
    const mobileMenuIcon = document.querySelector(".menu");
    const mobileMenuDropdown = document.querySelector(".mobile-secondary-nav");
    const alertsContainer = document.querySelector(".alerts-container");
    //Event Listeners
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

    bell.addEventListener("click", function() {
        let nbStyles = getComputedStyle(notificationBadge);
        if (nbStyles.visibility === "visible") {
            notificationBadge.style.visibility = "hidden";
        }

        if (notificationsDropdown.classList.contains("hidden")) {
            if (notificationsDropdown.classList.contains("lift")) {
                notificationsDropdown.classList.remove("lift");
            }
            notificationsDropdown.classList.add("drop");
            notificationsDropdown.classList.remove("hidden");

        } else {
            if (notificationsDropdown.classList.contains("drop")) {
                notificationsDropdown.classList.remove("drop");
                notificationsDropdown.classList.add("lift");
                setTimeout(function() {
                    notificationsDropdown.classList.add("hidden");
                }, 200);
            }
        }

    });

    mobileMenuIcon.addEventListener("click", function() {
        console.log("Menu Icon Clicked!");

        if (mobileMenuDropdown.classList.contains("hidden")) {
            if (mobileMenuDropdown.classList.contains("lift")) {
                mobileMenuDropdown.classList.remove("lift");
            }
            mobileMenuDropdown.classList.add("drop");
            mobileMenuDropdown.classList.remove("hidden");

        } else {
            if (mobileMenuDropdown.classList.contains("drop")) {
                mobileMenuDropdown.classList.remove("drop");
                mobileMenuDropdown.classList.add("lift");
                setTimeout(function() {
                    mobileMenuDropdown.classList.add("hidden");
                }, 200);
            }
        }
    });

    //Remove Alerts when X is clicked
    alertsContainer.addEventListener("click", function(event) {
        let target = event.target;
        if (target.classList.contains("ion-close")) {
            let alert = event.target.parentNode;
            alertsContainer.removeChild(alert);
        }
    });

});