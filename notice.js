document.addEventListener("DOMContentLoaded", function () {
    
// ============================
// ELEMENTS
// ============================

const sidebar = document.querySelector(".sidebar");

const menuIcon =
    document.querySelector(".navbar-left .fa-bars");

const searchIcon =
    document.querySelector(".navbar-right .fa-magnifying-glass");

const notificationIcon =
    document.querySelector(".navbar-right .fa-bell");

const profileIcon =
    document.querySelector(".navbar-right .fa-user-circle");

const noticeCards =
    document.querySelectorAll(".notice-card");


// ============================
// SIDEBAR TOGGLE
// ============================

if (menuIcon && sidebar) {

    menuIcon.addEventListener("click", function () {

        if (window.innerWidth <= 700) {

            if (sidebar.style.display === "flex") {
                sidebar.style.display = "none";
            } else {
                sidebar.style.display = "flex";
            }

        } else {

            if (sidebar.style.width === "0px") {

                sidebar.style.width = "250px";

                document.querySelector(".main-content")
                    .style.marginLeft = "250px";

            } else {

                sidebar.style.width = "0px";

                document.querySelector(".main-content")
                    .style.marginLeft = "0";

            }

        }

    });

}


// ============================
// ACTIVE MENU
// ============================

const menuLinks =
    document.querySelectorAll(".menu a");

const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

menuLinks.forEach(link => {

    const linkPage =
        link.getAttribute("href").split("/").pop();

    link.classList.remove("active");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});


// ============================
// SEARCH NOTICES
// ============================

if (searchIcon) {

    searchIcon.addEventListener("click", function () {

        const searchTerm =
            prompt("Search notices:");

        if (!searchTerm) {
            return;
        }

        const term =
            searchTerm.toLowerCase().trim();

        let found = false;

        noticeCards.forEach(card => {

            const text =
                card.innerText.toLowerCase();

            if (text.includes(term)) {

                card.style.display = "flex";

                card.style.borderColor = "#2563EB";

                card.style.boxShadow =
                    "0 8px 20px rgba(37,99,235,.20)";

                found = true;

            } else {

                card.style.display = "none";

            }

        });


        if (found) {

            alert(
                'Notice found for "' +
                searchTerm +
                '".'
            );

        } else {

            alert(
                'No notice found for "' +
                searchTerm +
                '".'
            );

            noticeCards.forEach(card => {

                card.style.display = "flex";

            });

        }

    });

}


// ============================
// NOTICE CARD CLICK
// ============================

noticeCards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", function () {

        noticeCards.forEach(item => {

            item.style.borderColor = "transparent";

            item.style.boxShadow =
                "0 5px 15px rgba(0,0,0,.07)";

        });

        this.style.borderColor = "#2563EB";

        this.style.boxShadow =
            "0 8px 20px rgba(37,99,235,.20)";

    });

});


// ============================
// NEW NOTICE
// ============================

const newBadge =
    document.querySelector(".new-badge");

if (newBadge) {

    newBadge.addEventListener("click", function (event) {

        event.stopPropagation();

        alert(
            "This is a new notice. Please read the complete announcement."
        );

    });

}


// ============================
// IMPORTANT NOTICE
// ============================

const importantNotice =
    document.querySelector(".important-notice");

if (importantNotice) {

    importantNotice.addEventListener("click", function () {

        alert(
            "Please regularly check the StudentHub portal for important college updates."
        );

    });

}


// ============================
// NOTIFICATIONS
// ============================

if (notificationIcon) {

    notificationIcon.addEventListener("click", function () {

        alert(
            "Notifications\n\n" +
            "• Mid-Semester Examination Schedule published.\n" +
            "• Assignment submission deadline approaching.\n" +
            "• Please maintain the required attendance."
        );

    });

}


// ============================
// PROFILE
// ============================

if (profileIcon) {

    profileIcon.addEventListener("click", function () {

        window.location.href = "profile.html";

    });

}


// ============================
// SIDEBAR LINK CLICK
// ============================

menuLinks.forEach(link => {

    link.addEventListener("click", function () {

        menuLinks.forEach(item =>
            item.classList.remove("active")
        );

        this.classList.add("active");

    });

});


// ============================
// RESPONSIVE
// ============================

window.addEventListener("resize", function () {

    if (window.innerWidth > 700) {

        sidebar.style.display = "flex";
        sidebar.style.width = "250px";

        document.querySelector(".main-content")
            .style.marginLeft = "250px";

    } else {

        sidebar.style.width = "250px";
        sidebar.style.display = "none";

        document.querySelector(".main-content")
            .style.marginLeft = "0";

    }

});


// ============================
// INITIAL MOBILE STATE
// ============================

if (window.innerWidth <= 700 && sidebar) {

    sidebar.style.display = "none";

}

});
