document.addEventListener("DOMContentLoaded", function () {

    // ===========================
    // SIDEBAR TOGGLE
    // ===========================

    const menuIcon = document.querySelector(".navbar-left .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuIcon && sidebar) {

        menuIcon.addEventListener("click", function () {

            sidebar.classList.toggle("collapsed");

            if (sidebar.classList.contains("collapsed")) {
                sidebar.style.width = "70px";
                mainContent.style.marginLeft = "70px";

                document.querySelectorAll(".sidebar span").forEach(function (span) {
                    span.style.display = "none";
                });

                document.querySelectorAll(".sidebar a").forEach(function (link) {
                    link.style.justifyContent = "center";
                    link.style.padding = "15px 10px";
                });

            } else {
                sidebar.style.width = "250px";
                mainContent.style.marginLeft = "250px";

                document.querySelectorAll(".sidebar span").forEach(function (span) {
                    span.style.display = "inline";
                });

                document.querySelectorAll(".sidebar a").forEach(function (link) {
                    link.style.justifyContent = "flex-start";
                    link.style.padding = "15px 24px";
                });
            }
        });
    }


    // ===========================
    // ACTIVE MENU
    // ===========================

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".sidebar .menu a").forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    // ===========================
    // SEARCH ICON
    // ===========================

    const searchIcon = document.querySelector(".fa-magnifying-glass");

    if (searchIcon) {

        searchIcon.addEventListener("click", function () {

            const searchText = prompt("What do you want to search?");

            if (searchText && searchText.trim() !== "") {

                const text = searchText.toLowerCase().trim();

                const pageText = document.body.innerText.toLowerCase();

                if (pageText.includes(text)) {
                    alert("The search text was found on this page.");
                } else {
                    alert("No matching content found.");
                }

            }

        });

    }


    // ===========================
    // NOTIFICATION ICON
    // ===========================

    const notificationIcon = document.querySelector(".fa-bell");

    if (notificationIcon) {

        notificationIcon.addEventListener("click", function () {

            alert("You have no new notifications.");

        });

    }


    // ===========================
    // PROFILE ICON
    // ===========================

    const profileIcon = document.querySelector(".fa-user-circle");

    if (profileIcon) {

        profileIcon.addEventListener("click", function () {

            window.location.href = "profile.html";

        });

    }


    // ===========================
    // FEATURE CARD ANIMATION
    // ===========================

    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(function () {

            card.style.transition = "opacity 0.5s ease, transform 0.5s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 100 * index);

    });


    // ===========================
    // PROJECT CARD
    // ===========================

    const projectCard = document.querySelector(".project-card");

    if (projectCard) {

        projectCard.addEventListener("click", function () {

            projectCard.classList.toggle("selected");

        });

    }


    // ===========================
    // SMOOTH SIDEBAR NAVIGATION
    // ===========================

    document.querySelectorAll(".sidebar a").forEach(function (link) {

        link.addEventListener("click", function () {

            document.querySelectorAll(".sidebar a").forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

        });

    });

});