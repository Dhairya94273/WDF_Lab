document.addEventListener("DOMContentLoaded", function () {

    // ===========================
    // SIDEBAR TOGGLE
    // ===========================

    const menuIcon = document.querySelector(".navbar-left .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuIcon && sidebar && mainContent) {
        menuIcon.addEventListener("click", function () {
            const isHidden = sidebar.style.display === "none";

            sidebar.style.display = isHidden ? "flex" : "none";
            mainContent.style.marginLeft = isHidden ? "250px" : "0";
        });
    }


    // ===========================
    // ACTIVE SIDEBAR MENU
    // ===========================

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const sidebarLinks = document.querySelectorAll(".sidebar .menu a");

    sidebarLinks.forEach(function (link) {
        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage = href.split("/").pop().toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    // ===========================
    // TODAY'S SCHEDULE
    // ===========================

    const todayCardText = document.querySelector(".today-card p");
    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const today = new Date();
    const currentDayIndex = today.getDay();
    let activeDayIndex = currentDayIndex;

    if (currentDayIndex === 0 || currentDayIndex === 6) {
        activeDayIndex = 1;
    }

    const dayName = weekdays[activeDayIndex];

    if (todayCardText) {
        todayCardText.textContent = dayName + " • Semester 3 • Information Technology";
    }


    // Highlight current day column in the timetable table
    const headerCells = document.querySelectorAll(".table-container thead th");
    const bodyRows = document.querySelectorAll(".table-container tbody tr");

    headerCells.forEach(function (cell, index) {
        if (index === activeDayIndex) {
            cell.style.background = "#dbeafe";
            cell.style.color = "#0f172a";
            cell.style.fontWeight = "700";
        }
    });

    bodyRows.forEach(function (row) {
        const cells = row.querySelectorAll("td");

        cells.forEach(function (cell, index) {
            if (index === activeDayIndex && cell.getAttribute("colspan") === null) {
                cell.style.background = "#eff6ff";
                cell.style.border = "1px solid #93c5fd";
                cell.style.fontWeight = "700";
                cell.style.color = "#1d4ed8";
            }
        });
    });


    // ===========================
    // RESPONSE TO COURSE CLICK
    // ===========================

    const timetableCells = document.querySelectorAll(".table-container tbody td");

    timetableCells.forEach(function (cell) {
        if (cell.getAttribute("colspan") !== null) {
            return;
        }

        cell.addEventListener("click", function () {
            timetableCells.forEach(function (item) {
                item.style.boxShadow = "none";
            });

            cell.style.boxShadow = "inset 0 0 0 2px #2563EB";
            cell.style.transition = "all 0.2s ease";
        });
    });

});
