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


    //Charts and Graphs
    const trafficLineGraph = document.getElementById('trafficLineGraph').getContext('2d');
    const trafficWeeklyLineChart = new Chart(trafficLineGraph, {
        type: 'line',
        data: {
            labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
            datasets: [{
                label: 'Weekly Traffic',
                data: [750, 1250, 1100, 1500, 2000, 1500, 1750, 1250, 1750, 2250, 1750, 2250],
                backgroundColor: 'rgba(48.6%, 50.2%, 77.6%, 0.5)',
                borderColor: 'rgba(48.6%, 50.2%, 77.6%)',
                pointBorderColor: 'rgba(48.6%, 50.2%, 77.6%)',
                pointBackgroundColor: 'rgb(255,255,255)',
                borderWidth: 1,
                lineTension: 0
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    //Daily Traffic Bar Graph
    const dailyTrafficGraph = document.getElementById('dailyTrafficGraph').getContext('2d');
    const dailyTrafficBarChart = new Chart(dailyTrafficGraph, {
        type: 'bar',
        data: {
            labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            datasets: [{
                label: 'Daily Traffic',
                barPercentage: 0.9,
                barThickness: 'flex',
                maxBarThickness: 20,
                minBarLength: 2,
                data: [75, 100, 175, 125, 225, 200, 100],
                backgroundColor: 'rgb(48.6%, 50.2%, 77.6%)',
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 250
                    }
                }]
            }
        }
    });

    //Mobile/Device Users Doughnut Chart
    const mobileUsersGraph = document.querySelector("#mobileUsersGraph").getContext("2d");
    const mobileUsersChart = new Chart(mobileUsersGraph, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [15, 15, 70],
                backgroundColor: ['rgb(88, 207, 118)', 'rgb(53, 174, 204)', 'rgb(124, 128, 198)'],
                borderWidth: 0
            }],
            labels: ['Tablets', 'Phones', 'Desktop'],
        },
        options: {
            rotation: 4.25
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