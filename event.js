document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const menuButton = document.querySelector(".navbar-left .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    const eventGrid = document.getElementById("eventGrid");
    const pastEventList = document.getElementById("pastEventList");
    const searchInput = document.getElementById("eventSearch");

    const searchIcon = document.querySelector(".fa-magnifying-glass");
    const notificationIcon = document.querySelector(".fa-bell");
    const profileIcon = document.querySelector(".fa-user-circle");


    // ==========================================
    // SIDEBAR TOGGLE
    // ==========================================

    function toggleSidebar() {

        if (!sidebar || !mainContent) {
            return;
        }

        if (window.innerWidth <= 600) {

            if (sidebar.style.display === "none") {
                sidebar.style.display = "flex";
            } else {
                sidebar.style.display = "none";
            }

            return;
        }

        if (sidebar.style.display === "none") {

            sidebar.style.display = "flex";

            if (window.innerWidth <= 768) {
                mainContent.style.marginLeft = "210px";
            } else {
                mainContent.style.marginLeft = "250px";
            }

        } else {

            sidebar.style.display = "none";
            mainContent.style.marginLeft = "0";
        }
    }


    if (menuButton) {

        menuButton.addEventListener("click", toggleSidebar);

    }


    // ==========================================
    // ACTIVE MENU
    // ==========================================

    const menuLinks = document.querySelectorAll(".menu a");

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    menuLinks.forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = href
            .split("/")
            .pop()
            .toLowerCase();

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    // ==========================================
    // RENDER UPCOMING EVENT
    // ==========================================

    function renderEventCard(event) {

        return `
            <div class="event-card"
                data-search="${(
                    (event.title || "") + " " +
                    (event.type || "") + " " +
                    (event.description || "") + " " +
                    (event.location || "") + " " +
                    (event.host || "")
                ).toLowerCase()}">

                <div class="event-date">

                    <span class="date-day">
                        ${event.day || ""}
                    </span>

                    <span class="date-month">
                        ${event.month || ""}
                    </span>

                </div>


                <div class="event-content">

                    <span class="event-type">
                        ${event.type || ""}
                    </span>


                    <h3>
                        ${event.title || ""}
                    </h3>


                    <p>
                        ${event.description || ""}
                    </p>


                    <div class="event-info">

                        <p>
                            <i class="fa-solid fa-clock"></i>
                            ${event.time || "Not specified"}
                        </p>


                        <p>
                            <i class="fa-solid fa-location-dot"></i>
                            ${event.location || "Not specified"}
                        </p>


                        <p>
                            <i class="fa-solid fa-user-tie"></i>
                            ${event.host || "Not specified"}
                        </p>

                    </div>


                    <button
                        class="register-btn"
                        data-event-id="${event.id}"
                        data-registered="false">

                        <i class="fa-solid fa-user-plus"></i>
                        Register Now

                    </button>

                </div>

            </div>
        `;
    }


    // ==========================================
    // RENDER PAST EVENT
    // ==========================================

    function renderPastEvent(event) {

        return `
            <div class="past-event"
                data-search="${(
                    (event.title || "") + " " +
                    (event.date || "") + " " +
                    (event.category || "")
                ).toLowerCase()}">

                <div>

                    <h3>
                        ${event.title || ""}
                    </h3>


                    <p>
                        <i class="fa-solid fa-calendar"></i>
                        ${event.date || ""}
                    </p>

                </div>


                <span class="completed">
                    Completed
                </span>

            </div>
        `;
    }


    // ==========================================
    // REGISTER EVENT
    // ==========================================

    function registerEvent(button) {

        const eventCard =
            button.closest(".event-card");


        if (!eventCard) {
            return;
        }


        const eventName =
            eventCard.querySelector("h3").innerText;


        const day =
            eventCard.querySelector(".date-day").innerText;


        const month =
            eventCard.querySelector(".date-month").innerText;


        const eventDate =
            day + " " + month;


        const eventId =
            button.dataset.eventId;


        const alreadyRegistered =
            button.dataset.registered === "true";


        // ======================================
        // CANCEL REGISTRATION
        // ======================================

        if (alreadyRegistered) {

            const cancelRegistration = confirm(

                "You are already registered for:\n\n" +

                eventName +

                "\n" +

                eventDate +

                "\n\n" +

                "Do you want to cancel your registration?"

            );


            if (cancelRegistration) {

                button.dataset.registered = "false";


                button.innerHTML =
                    '<i class="fa-solid fa-user-plus"></i> Register Now';


                button.style.background = "";


                alert(
                    "Registration cancelled for:\n" +
                    eventName
                );

            }

            return;
        }


        // ======================================
        // REGISTER
        // ======================================

        const confirmRegistration = confirm(

            "Register for this event?\n\n" +

            eventName +

            "\n" +

            eventDate

        );


        if (confirmRegistration) {

            button.dataset.registered = "true";


            button.innerHTML =
                '<i class="fa-solid fa-check"></i> Registered';


            button.style.background = "#198754";


            alert(

                "Registration successful!\n\n" +

                "Event: " +

                eventName +

                "\nDate: " +

                eventDate +

                "\nEvent ID: " +

                eventId

            );

        }

    }


    // ==========================================
    // EVENT CLICK ACTIONS
    // ==========================================

    function bindEventActions() {


        // --------------------------------------
        // REGISTER BUTTON
        // --------------------------------------

        const registerButtons =
            document.querySelectorAll(".register-btn");


        registerButtons.forEach(function (button) {

            button.addEventListener("click", function (event) {

                event.stopPropagation();

                registerEvent(button);

            });

        });


        // --------------------------------------
        // UPCOMING EVENT CARD
        // --------------------------------------

        const eventCards =
            document.querySelectorAll(".event-card");


        eventCards.forEach(function (card) {

            card.addEventListener("click", function (event) {

                if (
                    event.target.closest(".register-btn")
                ) {
                    return;
                }


                const eventName =
                    card.querySelector("h3").innerText;


                const eventType =
                    card.querySelector(".event-type").innerText;


                const eventInfo =
                    card.querySelector(".event-info")
                        .innerText
                        .trim();


                alert(

                    eventName +

                    "\n\nType: " +

                    eventType +

                    "\n\n" +

                    eventInfo

                );

            });

        });


        // --------------------------------------
        // PAST EVENT
        // --------------------------------------

        const pastEvents =
            document.querySelectorAll(".past-event");


        pastEvents.forEach(function (eventItem) {

            eventItem.addEventListener("click", function () {

                const eventName =
                    eventItem.querySelector("h3").innerText;


                const eventDate =
                    eventItem.querySelector("p").innerText.trim();


                alert(

                    "Event Details\n\n" +

                    eventName +

                    "\n" +

                    eventDate +

                    "\n\n" +

                    "Status: Completed"

                );

            });

        });

    }


    // ==========================================
    // EMPTY STATE
    // ==========================================

    function showEmptyState(container, message) {

        if (!container) {
            return;
        }


        let emptyState =
            container.querySelector(".empty-state");


        if (!emptyState) {

            emptyState =
                document.createElement("div");


            emptyState.className =
                "empty-state";


            container.appendChild(emptyState);

        }


        emptyState.textContent = message;

    }


    // ==========================================
    // SEARCH EVENTS
    // ==========================================

    function filterEvents(searchTerm) {

        const value =
            searchTerm.trim().toLowerCase();


        const eventCards =
            document.querySelectorAll(".event-card");


        const pastEvents =
            document.querySelectorAll(".past-event");


        let upcomingFound = false;
        let pastFound = false;


        // ======================================
        // SEARCH UPCOMING EVENTS
        // ======================================

        eventCards.forEach(function (card) {

            const searchData =
                card.dataset.search || "";


            const visible =
                value === "" ||
                searchData.includes(value);


            card.style.display =
                visible ? "flex" : "none";


            if (visible) {
                upcomingFound = true;
            }

        });


        // ======================================
        // SEARCH PAST EVENTS
        // ======================================

        pastEvents.forEach(function (eventItem) {

            const searchData =
                eventItem.dataset.search || "";


            const visible =
                value === "" ||
                searchData.includes(value);


            eventItem.style.display =
                visible ? "flex" : "none";


            if (visible) {
                pastFound = true;
            }

        });


        // ======================================
        // UPCOMING EMPTY STATE
        // ======================================

        if (eventGrid) {

            const emptyState =
                eventGrid.querySelector(".empty-state");


            if (value !== "" && !upcomingFound) {

                if (!emptyState) {

                    showEmptyState(
                        eventGrid,
                        "No upcoming events found."
                    );

                }

            } else {

                if (emptyState) {
                    emptyState.remove();
                }

            }

        }


        // ======================================
        // PAST EMPTY STATE
        // ======================================

        if (pastEventList) {

            const emptyState =
                pastEventList.querySelector(".empty-state");


            if (value !== "" && !pastFound) {

                if (!emptyState) {

                    showEmptyState(
                        pastEventList,
                        "No past events found."
                    );

                }

            } else {

                if (emptyState) {
                    emptyState.remove();
                }

            }

        }

    }


    // ==========================================
    // LOAD EVENTS FROM events.json
    // ==========================================

    async function loadEvents() {

        try {

            console.log("Loading events.json...");


            // ----------------------------------
            // FETCH JSON
            // ----------------------------------

            const response =
                await fetch("./events.json");


            if (!response.ok) {

                throw new Error(
                    "HTTP Error: " +
                    response.status
                );

            }


            // ----------------------------------
            // CONVERT TO JAVASCRIPT OBJECT
            // ----------------------------------

            const data =
                await response.json();


            // ----------------------------------
            // VALIDATE JSON
            // ----------------------------------

            if (
                !data ||
                !Array.isArray(data.events)
            ) {

                throw new Error(
                    "Invalid events.json format. Expected an 'events' array."
                );

            }


            const allEvents =
                data.events;


            console.log(
                "Events loaded successfully:",
                allEvents
            );


            // ==================================
            // UPCOMING EVENTS
            // ==================================

            const upcomingEvents =
                allEvents.filter(function (event) {

                    return event.status === "upcoming";

                });


            // ==================================
            // PAST EVENTS
            // ==================================

            const pastEvents =
                allEvents.filter(function (event) {

                    return event.status === "past";

                });


            // ==================================
            // DISPLAY UPCOMING EVENTS
            // ==================================

            if (eventGrid) {

                if (upcomingEvents.length === 0) {

                    showEmptyState(
                        eventGrid,
                        "No upcoming events available."
                    );

                } else {

                    eventGrid.innerHTML =
                        upcomingEvents
                            .map(renderEventCard)
                            .join("");

                }

            }


            // ==================================
            // DISPLAY PAST EVENTS
            // ==================================

            if (pastEventList) {

                if (pastEvents.length === 0) {

                    showEmptyState(
                        pastEventList,
                        "No past events available."
                    );

                } else {

                    pastEventList.innerHTML =
                        pastEvents
                            .map(renderPastEvent)
                            .join("");

                }

            }


            // ==================================
            // ADD CLICK EVENTS
            // ==================================

            bindEventActions();


        } catch (error) {

            console.error(
                "Error loading events.json:",
                error
            );


            // ==================================
            // ERROR MESSAGE
            // ==================================

            if (eventGrid) {

                eventGrid.innerHTML = `
                    <div class="empty-state">
                        Unable to load upcoming events.
                    </div>
                `;

            }


            if (pastEventList) {

                pastEventList.innerHTML = `
                    <div class="empty-state">
                        Unable to load past events.
                    </div>
                `;

            }

        }

    }


    // ==========================================
    // SEARCH INPUT
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function (event) {

                filterEvents(
                    event.target.value
                );

            }
        );

    }


    // ==========================================
    // SEARCH ICON
    // ==========================================

    if (searchIcon) {

        searchIcon.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.focus();
                }

            }
        );

    }


    // ==========================================
    // NOTIFICATION
    // ==========================================

    if (notificationIcon) {

        notificationIcon.addEventListener(
            "click",
            function () {

                const upcomingEvents =
                    document.querySelectorAll(".event-card");


                let message =
                    "Upcoming Events\n\n";


                upcomingEvents.forEach(
                    function (card) {

                        const title =
                            card.querySelector("h3")
                                .innerText;


                        const day =
                            card.querySelector(".date-day")
                                .innerText;


                        const month =
                            card.querySelector(".date-month")
                                .innerText;


                        message +=
                            "• " +
                            title +
                            " - " +
                            day +
                            " " +
                            month +
                            "\n";

                    }
                );


                if (upcomingEvents.length === 0) {

                    message +=
                        "No upcoming events.";

                }


                alert(message);

            }
        );

    }


    // ==========================================
    // PROFILE ICON
    // ==========================================

    if (profileIcon) {

        profileIcon.addEventListener(
            "click",
            function () {

                window.location.href =
                    "profile.html";

            }
        );

    }


    // ==========================================
    // RESPONSIVE SIDEBAR
    // ==========================================

    function handleResize() {

        if (!sidebar || !mainContent) {
            return;
        }


        if (window.innerWidth <= 600) {

            if (sidebar.style.display === "none") {

                mainContent.style.marginLeft = "0";

            } else {

                mainContent.style.marginLeft = "70px";

            }

        }

        else if (window.innerWidth <= 768) {

            sidebar.style.display = "flex";

            mainContent.style.marginLeft =
                "210px";

        }

        else {

            sidebar.style.display = "flex";

            mainContent.style.marginLeft =
                "250px";

        }

    }


    window.addEventListener(
        "resize",
        handleResize
    );


    // ==========================================
    // INITIALIZE
    // ==========================================

    handleResize();

    loadEvents();

});