document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.querySelector(".search");
    const mobileSearchBox = document.querySelector(".mobile-search-box>input");
    const bell = document.querySelector(".bell");
    const notificationBadge = document.querySelector(".notification-badge");
    const notificationsDropdown = document.querySelector(".notifications-dropdown");
    const mobileMenuIcon = document.querySelector(".menu");
    const mobileMenuDropdown = document.querySelector(".mobile-secondary-nav");
    const alertsContainer = document.querySelector(".alerts-container");

    //Message Form
    const searchUserBox = document.querySelector(".user-search-box");
    const messageBox = document.querySelector(".message-box");
    const sendButton = document.querySelector(".send-button");
    const messageAlertBox = document.querySelector(".message-alert-box");

    //Settings
    const emailSwitch = document.querySelector("#email-setting");
    const profileSwitch = document.querySelector("#profile-setting");
    const timeZone = document.querySelector("#timezone-list");
    const saveSettingsButton = document.querySelector(".save-settings-button");

    //Event Listeners
    //Hide/Show Search Box on Mobile
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

    //Hide/Show Notifications Dropdown
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

    //Hide/Show Mobile Menu Dropdown
    mobileMenuIcon.addEventListener("click", function() {
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

    //Send Button Event Listener

    sendButton.addEventListener("click", function(event) {
        event.preventDefault();
        let messageAlert = document.createElement("li");
        messageAlert.classList.add("alert");

        if (searchUserBox.value.length <= 0 || messageBox.value.length <= 0) {
            messageAlert.classList.add("failed");
            messageAlert.textContent = "Please provide all required info!";
            messageAlertBox.appendChild(messageAlert);
        } else {
            messageAlertBox.innerHTML = "";
            messageAlert.classList.add("success");
            messageAlert.textContent = "Message Sent!";
            messageAlertBox.appendChild(messageAlert);
            messageBox.value = "";
            searchUserBox.value = "";
        }
        //Remove alert from messageAlerBox after 4 seconds
        setTimeout(function() {
            if (messageAlertBox.children.length > 0) {
                messageAlertBox.removeChild(messageAlertBox.children[0]);
            }
        }, 4000);
    });

    //Settings/Preferences
    function saveSwitchState(element) {
        if (element.checked) {
            localStorage.setItem(element.id.toString(), "true");
        } else {
            localStorage.setItem(element.id.toString(), "false");
        }
    }

    function saveTimeZone() {
        localStorage.setItem("timezone", timeZone.value);
    }

    function getPreference(element) {
        return localStorage.getItem(element.toString());
    }

    function setSwitchPreference(element, value) {
        element.checked = value;
    }

    function loadSwitchPreferences(element) {
        if (getPreference(element.id) === "true") {
            setSwitchPreference(element, true);
        } else {
            setSwitchPreference(element, false);
        }
    }

    function loadTimeZonePreference() {
        if (getPreference("timezone")) {
            timeZone.value = getPreference("timezone");
        }
    }

    //Save Settings Button
    saveSettingsButton.addEventListener("click", function() {
        saveSwitchState(emailSwitch);
        saveSwitchState(profileSwitch);
        saveTimeZone();
    });

    //Check and Adjust Email Settings Toggle State on Page
    loadSwitchPreferences(emailSwitch);

    //Check and Adjust Profile Settings Toggle State on Page
    loadSwitchPreferences(profileSwitch);

    //Check and load Time Zone Preference
    loadTimeZonePreference();

});