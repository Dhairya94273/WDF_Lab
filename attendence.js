document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SIDEBAR TOGGLE
    ========================= */

    const menuButton = document.querySelector(".navbar-left .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuButton) {
        menuButton.addEventListener("click", function () {

            if (window.innerWidth <= 768) {

                if (sidebar.style.display === "flex") {
                    sidebar.style.display = "none";
                } else {
                    sidebar.style.display = "flex";
                }

            } else {

                if (sidebar.style.display === "none") {
                    sidebar.style.display = "flex";
                    mainContent.style.marginLeft = "250px";
                } else {
                    sidebar.style.display = "none";
                    mainContent.style.marginLeft = "0";
                }

            }

        });
    }


    /* =========================
       ACTIVE SIDEBAR MENU
    ========================= */

    const menuLinks = document.querySelectorAll(".menu a");

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    menuLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        link.classList.remove("active");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =========================
       SEARCH
    ========================= */

    const searchIcon = document.querySelector(".fa-magnifying-glass");

    if (searchIcon) {

        searchIcon.addEventListener("click", function () {

            const searchText = prompt(
                "Search subject or attendance record:"
            );

            if (!searchText) {
                return;
            }

            const searchValue = searchText.toLowerCase().trim();

            const attendanceRows =
                document.querySelectorAll(".attendance-table tbody tr");

            const recentRows =
                document.querySelectorAll(".recent-table tbody tr");

            let found = false;


            /* Subject-wise attendance search */

            attendanceRows.forEach(function (row) {

                const text = row.innerText.toLowerCase();

                if (text.includes(searchValue)) {
                    row.style.display = "";
                    row.style.background = "#EFF6FF";
                    found = true;
                } else {
                    row.style.display = "none";
                }

            });


            /* Recent attendance search */

            recentRows.forEach(function (row) {

                const text = row.innerText.toLowerCase();

                if (text.includes(searchValue)) {
                    row.style.display = "";
                    row.style.background = "#EFF6FF";
                    found = true;
                } else {
                    row.style.display = "none";
                }

            });


            if (!found) {

                alert(
                    "No attendance record found for: " + searchText
                );

                attendanceRows.forEach(function (row) {
                    row.style.display = "";
                    row.style.background = "";
                });

                recentRows.forEach(function (row) {
                    row.style.display = "";
                    row.style.background = "";
                });

            }

        });

    }


    /* =========================
       NOTIFICATION
    ========================= */

    const notificationIcon = document.querySelector(".fa-bell");

    if (notificationIcon) {

        notificationIcon.addEventListener("click", function () {

            alert(
                "Attendance Alert\n\n" +
                "Mathematics attendance is currently 75%.\n" +
                "Maintain your attendance above the required minimum."
            );

        });

    }


    /* =========================
       PROFILE ICON
    ========================= */

    const profileIcon = document.querySelector(".fa-user-circle");

    if (profileIcon) {

        profileIcon.addEventListener("click", function () {

            window.location.href = "profile.html";

        });

    }


    /* =========================
       CALCULATE ATTENDANCE
    ========================= */

    const attendanceRows =
        document.querySelectorAll(".attendance-table tbody tr");

    let totalLectures = 0;
    let totalPresent = 0;
    let totalAbsent = 0;


    attendanceRows.forEach(function (row) {

        const cells = row.querySelectorAll("td");

        if (cells.length < 4) {
            return;
        }

        const lectures =
            parseInt(cells[1].innerText);

        const present =
            parseInt(cells[2].innerText);

        const absent =
            parseInt(cells[3].innerText);

        if (
            !isNaN(lectures) &&
            !isNaN(present) &&
            !isNaN(absent)
        ) {

            totalLectures += lectures;
            totalPresent += present;
            totalAbsent += absent;

        }

    });


    /* =========================
       UPDATE SUMMARY
    ========================= */

    const summaryNumbers =
        document.querySelectorAll(".summary-card .big-number");

    if (summaryNumbers.length >= 4 && totalLectures > 0) {

        const overallAttendance =
            Math.round((totalPresent / totalLectures) * 100);

        summaryNumbers[0].innerText =
            overallAttendance + "%";

        summaryNumbers[1].innerText =
            totalPresent;

        summaryNumbers[2].innerText =
            totalAbsent;

        summaryNumbers[3].innerText =
            totalLectures;

    }


    /* =========================
       UPDATE ATTENDANCE STATUS
    ========================= */

    attendanceRows.forEach(function (row) {

        const cells = row.querySelectorAll("td");

        if (cells.length < 6) {
            return;
        }

        const lectures =
            parseInt(cells[1].innerText);

        const present =
            parseInt(cells[2].innerText);

        if (!isNaN(lectures) && !isNaN(present) && lectures > 0) {

            const percentage =
                Math.round((present / lectures) * 100);

            const status =
                cells[5].querySelector(".status");

            if (!status) {
                return;
            }

            if (percentage >= 75) {

                status.innerText = "Good";

                status.classList.remove("warning");
                status.classList.add("good");

            } else {

                status.innerText = "Warning";

                status.classList.remove("good");
                status.classList.add("warning");

            }

        }

    });


    /* =========================
       PROGRESS BAR ANIMATION
    ========================= */

    const progressBars =
        document.querySelectorAll(".progress-fill");

    progressBars.forEach(function (bar) {

        const targetWidth =
            bar.style.width;

        bar.style.width = "0%";

        setTimeout(function () {

            bar.style.width = targetWidth;

        }, 200);

    });


    /* =========================
       ROW HOVER EFFECT
    ========================= */

    attendanceRows.forEach(function (row) {

        row.addEventListener("click", function () {

            attendanceRows.forEach(function (otherRow) {
                otherRow.style.background = "";
            });

            row.style.background = "#EFF6FF";

        });

    });


    /* =========================
       RECENT ATTENDANCE CLICK
    ========================= */

    const recentRows =
        document.querySelectorAll(".recent-table tbody tr");

    recentRows.forEach(function (row) {

        row.addEventListener("click", function () {

            recentRows.forEach(function (otherRow) {
                otherRow.style.background = "";
            });

            row.style.background = "#EFF6FF";

        });

    });


    /* =========================
       RESIZE HANDLING
    ========================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth <= 768) {

            sidebar.style.display = "none";
            mainContent.style.marginLeft = "0";

        } else {

            sidebar.style.display = "flex";
            mainContent.style.marginLeft = "250px";

        }

    });

});
