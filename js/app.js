document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    //Main Nav
    const searchIcon = document.querySelector(".search");
    const mobileSearchBox = document.querySelector(".mobile-search-box>input");
    const bell = document.querySelector(".bell");
    const notificationBadge = document.querySelector(".notification-badge");
    const notificationsDropdown = document.querySelector(".notifications-dropdown");
    const mobileMenuIcon = document.querySelector(".menu");
    const mobileMenuDropdown = document.querySelector(".mobile-secondary-nav");

    //Alerts
    const alertsContainer = document.querySelector(".alerts-container");

    //Graphs
    const dailyTrafficGraph = document.getElementById('dailyTrafficGraph').getContext('2d');
    const mobileUsersGraph = document.querySelector("#mobileUsersGraph").getContext("2d");

    //Message Form
    const searchUserBox = document.querySelector(".user-search-box");
    const messageBox = document.querySelector(".message-box");
    const sendButton = document.querySelector(".send-button");
    const messageAlertBox = document.querySelector(".message-alert-box");
    const autocomplete = document.querySelector(".autocomplete");

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

    //-----------------//
    //Charts and Graphs
    //-----------------//

    const hourlyView = document.querySelector(".hourly-traffic");
    const dailyView = document.querySelector(".daily-traffic");
    const weeklyView = document.querySelector(".weekly-traffic");
    const monthlyView = document.querySelector(".monthly-traffic");
    const trafficViewTabs = document.querySelector(".traffic-view-tabs").children;
    const trafficLineGraph = document.getElementById('trafficLineGraph').getContext('2d');
    let trafficLineChart;

    function removeActiveGraphView() {
        let len = trafficViewTabs.length;
        for (let i = 0; i < len; i++) {
            if (trafficViewTabs[i].classList.contains("active-tab")) {
                trafficViewTabs[i].classList.remove("active-tab");
            }
        }
    }

    function showWeeklyTraffic() {
        removeActiveGraphView();
        weeklyView.classList.add("active-tab");
        trafficLineChart = new Chart(trafficLineGraph, {
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
    }

    function showMonthlyTraffic() {
        removeActiveGraphView();
        monthlyView.classList.add("active-tab");
        trafficLineChart = new Chart(trafficLineGraph, {
            type: 'line',
            data: {
                labels: ['1-5', '6-12', '13-19', '20-26', '27-30'],
                datasets: [{
                    label: 'Monthly Traffic',
                    data: [1750, 1250, 1750, 2250, 1750],
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
    }

    function showDailyTraffic() {
        removeActiveGraphView();
        dailyView.classList.add("active-tab");
        trafficLineChart = new Chart(trafficLineGraph, {
            type: 'line',
            data: {
                labels: ['30', '31'],
                datasets: [{
                    label: 'Daily Traffic',
                    data: [2250, 1750],
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
    }

    function showHourlyTraffic() {
        removeActiveGraphView();
        hourlyView.classList.add("active-tab");
        trafficLineChart = new Chart(trafficLineGraph, {
            type: 'line',
            data: {
                labels: ['12 am', '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am'],
                datasets: [{
                    label: 'Hourly Traffic',
                    data: [1750, 1250, 1750, 2250, 1750, 2000, 2500, 3000, 2700, 2900],
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
    }

    showWeeklyTraffic(); //Weekly View by Default

    //Graph View Tabs Event Listeners
    hourlyView.addEventListener("click", showHourlyTraffic);
    dailyView.addEventListener("click", showDailyTraffic);
    weeklyView.addEventListener("click", showWeeklyTraffic);
    monthlyView.addEventListener("click", showMonthlyTraffic);


    //Daily Traffic Bar Graph
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

    //-------------------------//
    // User Search Autocomplete
    //-------------------------//    

    let Users = {
        "victoria chambers": "victoria.chambers80@example.com",
        "dale byrd": "dale.byrd52@example.com",
        "dawn wood": "dawn.wood16@example.com",
        "dan oliver": "dan.oliver82@example.com"
    };

    let searchUserInput; //contains input text from User search field

    //Function Hides/Shows the Aucomplete ul containing User's Info
    function autocompleteHideShow(input) {
        if (input.length > 0) {
            if (autocomplete.classList.contains("hidden")) {
                autocomplete.classList.remove("hidden");
            }
        } else {
            autocomplete.classList.add("hidden");
        }
    }

    //Function Populates the Autocomplete ul with relevant User's Info
    function autoCompleteShowData(input) {
        let allUsers = Object.keys(Users);
        autocomplete.innerHTML = "";
        //Check for Usernames that contain the input text
        if (input.length > 0) {
            for (let user in allUsers) {
                if (allUsers[user].includes(input)) {
                    //Add to autocomplete ul
                    let li = document.createElement("li");
                    let name = document.createElement("h3");
                    let email = document.createElement("p");
                    li.className = "card";
                    name.innerHTML = `${allUsers[user]}`;
                    email.className = "email";
                    email.innerHTML = `${Users[allUsers[user]]}`;
                    li.appendChild(name);
                    li.appendChild(email);
                    autocomplete.appendChild(li);
                }
            }
        }
    }

    searchUserBox.addEventListener("input", function(event) {
        searchUserInput = searchUserBox.value.toLowerCase();
        autocompleteHideShow(searchUserInput);
        autoCompleteShowData(searchUserInput);
    });

    autocomplete.addEventListener("click", function(event) {
        let li = event.target;
        if (li.tagName !== "LI") {
            li = li.parentNode;
        }
        searchUserBox.value = li.querySelector("h3").textContent;
        autocomplete.classList.add("hidden");
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