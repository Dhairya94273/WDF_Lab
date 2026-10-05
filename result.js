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
    // RESULT ACTIONS
    // ===========================

    const resultRows = document.querySelectorAll(".table-container tbody tr");

    resultRows.forEach(function (row) {
        row.addEventListener("mouseenter", function () {
            row.style.transform = "translateY(-2px)";
            row.style.transition = "all 0.25s ease";
        });

        row.addEventListener("mouseleave", function () {
            row.style.transform = "translateY(0)";
        });
    });


    const downloadButtons = document.querySelectorAll("a[download]");

    downloadButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const fileName = button.getAttribute("href") || "result.pdf";

            console.log("Downloading result file:", fileName);
        });
    });


    // ===========================
    // RESULT SUMMARY HIGHLIGHT
    // ===========================

    const passStatus = document.querySelector(".summary-card .pass");

    if (passStatus) {
        passStatus.style.fontWeight = "700";
        passStatus.style.letterSpacing = "0.04em";
    }

});
