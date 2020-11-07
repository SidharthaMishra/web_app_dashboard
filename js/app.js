document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.querySelector(".search");
    const mobileSearchBox = document.querySelector(".mobile-search-box>input");
    const bell = document.querySelector(".bell");
    const notificationBadge = document.querySelector(".notification-badge");
    const notificationsDropdown = document.querySelector(".notifications-dropdown");

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



});