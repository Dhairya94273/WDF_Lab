document.addEventListener("DOMContentLoaded", function () {

    // ===========================
    // SIDEBAR TOGGLE
    // ===========================

    const menuIcon = document.querySelector(".navbar-left .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuIcon && sidebar && mainContent) {

        menuIcon.addEventListener("click", function () {

            if (sidebar.style.display === "none") {
                sidebar.style.display = "flex";
                mainContent.style.marginLeft = "250px";
            } else {
                sidebar.style.display = "none";
                mainContent.style.marginLeft = "0";
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
    // ASSIGNMENT SUBMISSION
    // ===========================

    const submissionForm = document.querySelector(".submission-form");
    const assignmentSelect = document.getElementById("assignment");
    const assignmentFile = document.getElementById("assignment-file");
    const comment = document.getElementById("comment");

    if (submissionForm) {

        submissionForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Check assignment
            if (!assignmentSelect.value) {
                alert("Please select an assignment.");
                assignmentSelect.focus();
                return;
            }


            // Check file
            if (!assignmentFile.files.length) {
                alert("Please upload your assignment.");
                assignmentFile.focus();
                return;
            }


            const file = assignmentFile.files[0];

            // Allowed extensions
            const allowedExtensions = [
                "pdf",
                "doc",
                "docx",
                "zip"
            ];

            const fileName = file.name.toLowerCase();
            const extension = fileName.split(".").pop();


            if (!allowedExtensions.includes(extension)) {

                alert(
                    "Invalid file format.\n\n" +
                    "Allowed formats: PDF, DOC, DOCX and ZIP."
                );

                assignmentFile.value = "";
                return;
            }


            // File size limit: 10 MB
            const maxSize = 10 * 1024 * 1024;

            if (file.size > maxSize) {

                alert("File size must be less than 10 MB.");

                assignmentFile.value = "";
                return;
            }


            // Get selected assignment name
            const selectedAssignment =
                assignmentSelect.options[
                    assignmentSelect.selectedIndex
                ].text;


            // Submit confirmation
            const confirmation = confirm(
                "Submit this assignment?\n\n" +
                "Assignment: " + selectedAssignment +
                "\nFile: " + file.name
            );


            if (!confirmation) {
                return;
            }


            // Simulate submission
            alert(
                "Assignment submitted successfully!\n\n" +
                "Assignment: " + selectedAssignment +
                "\nFile: " + file.name
            );


            // Update assignment row
            updateAssignmentStatus(assignmentSelect.value);


            // Clear form
            submissionForm.reset();

        });

    }


    // ===========================
    // UPDATE ASSIGNMENT STATUS
    // ===========================

    function updateAssignmentStatus(assignmentValue) {

        const rows =
            document.querySelectorAll(".assignment-table tbody tr");


        rows.forEach(function (row) {

            const assignmentName =
                row.cells[1].textContent.trim().toLowerCase();


            let matched = false;


            if (
                assignmentValue === "cn" &&
                assignmentName.includes("ip addressing")
            ) {
                matched = true;
            }


            if (
                assignmentValue === "oop" &&
                assignmentName.includes("java oop")
            ) {
                matched = true;
            }


            if (
                assignmentValue === "dsa" &&
                assignmentName.includes("linked list")
            ) {
                matched = true;
            }


            if (matched) {

                const status =
                    row.querySelector(".status");

                if (status) {

                    status.textContent = "Submitted";

                    status.classList.remove(
                        "pending",
                        "overdue"
                    );

                    status.classList.add("submitted");

                }


                const action =
                    row.querySelector(".submit-link");

                if (action) {

                    const button =
                        document.createElement("button");

                    button.className = "view-button";
                    button.textContent = "View";

                    action.replaceWith(button);

                    addViewButtonEvent(button);

                }

            }

        });


        updateSummaryCards();

    }


    // ===========================
    // VIEW BUTTONS
    // ===========================

    function addViewButtonEvent(button) {

        button.addEventListener("click", function () {

            const row = button.closest("tr");

            if (!row) {
                return;
            }

            const subject =
                row.cells[0].textContent.trim();

            const assignment =
                row.cells[1].textContent.trim();

            const marks =
                row.cells[3].textContent.trim();


            alert(
                "Assignment Details\n\n" +
                "Subject: " + subject +
                "\nAssignment: " + assignment +
                "\nMarks: " + marks +
                "\nStatus: Submitted"
            );

        });

    }


    document.querySelectorAll(".view-button").forEach(function (button) {
        addViewButtonEvent(button);
    });


    // ===========================
    // FILE NAME DISPLAY
    // ===========================

    if (assignmentFile) {

        assignmentFile.addEventListener("change", function () {

            if (!assignmentFile.files.length) {
                return;
            }

            const file = assignmentFile.files[0];

            const fileUpload =
                document.querySelector(".file-upload");

            if (fileUpload) {

                const fileName =
                    fileUpload.querySelector(".selected-file");

                if (fileName) {

                    fileName.textContent =
                        "Selected: " + file.name;

                } else {

                    const text = document.createElement("p");

                    text.className = "selected-file";

                    text.textContent =
                        "Selected: " + file.name;

                    fileUpload.appendChild(text);

                }

            }

        });

    }


    // ===========================
    // UPDATE SUMMARY CARDS
    // ===========================

    function updateSummaryCards() {

        const rows =
            document.querySelectorAll(".assignment-table tbody tr");

        let pending = 0;
        let submitted = 0;
        let overdue = 0;


        rows.forEach(function (row) {

            const status =
                row.querySelector(".status");

            if (!status) {
                return;
            }


            if (status.classList.contains("pending")) {
                pending++;
            }

            if (status.classList.contains("submitted")) {
                submitted++;
            }

            if (status.classList.contains("overdue")) {
                overdue++;
            }

        });


        const total =
            rows.length;


        const summaryCards =
            document.querySelectorAll(".summary-card p");


        if (summaryCards.length >= 4) {

            summaryCards[0].textContent = total;
            summaryCards[1].textContent = pending;
            summaryCards[2].textContent = submitted;
            summaryCards[3].textContent = overdue;

        }

    }


    // ===========================
    // SEARCH ICON
    // ===========================

    const searchIcon =
        document.querySelector(".fa-magnifying-glass");

    if (searchIcon) {

        searchIcon.addEventListener("click", function () {

            const searchText =
                prompt("Search assignment:");

            if (!searchText || !searchText.trim()) {
                return;
            }

            const search =
                searchText.toLowerCase().trim();

            const rows =
                document.querySelectorAll(
                    ".assignment-table tbody tr"
                );

            let found = false;


            rows.forEach(function (row) {

                const text =
                    row.textContent.toLowerCase();

                if (text.includes(search)) {

                    row.style.display = "";
                    row.style.background = "#EFF6FF";

                    found = true;

                } else {

                    row.style.display = "none";

                }

            });


            if (!found) {

                alert("No assignment found.");

                rows.forEach(function (row) {
                    row.style.display = "";
                    row.style.background = "";
                });

            }

        });

    }


    // ===========================
    // NOTIFICATION ICON
    // ===========================

    const notificationIcon =
        document.querySelector(".fa-bell");

    if (notificationIcon) {

        notificationIcon.addEventListener("click", function () {

            alert(
                "Notifications\n\n" +
                "You have 3 pending assignments."
            );

        });

    }


    // ===========================
    // PROFILE ICON
    // ===========================

    const profileIcon =
        document.querySelector(".fa-user-circle");

    if (profileIcon) {

        profileIcon.addEventListener("click", function () {

            window.location.href = "profile.html";

        });

    }


    // ===========================
    // SUBMIT LINKS
    // ===========================

    document.querySelectorAll(".submit-link").forEach(function (link) {

        link.addEventListener("click", function () {

            setTimeout(function () {

                if (assignmentSelect) {

                    const row =
                        link.closest("tr");

                    if (!row) {
                        return;
                    }

                    const assignment =
                        row.cells[1].textContent
                            .trim()
                            .toLowerCase();


                    if (assignment.includes("ip addressing")) {
                        assignmentSelect.value = "cn";
                    }

                    else if (assignment.includes("java oop")) {
                        assignmentSelect.value = "oop";
                    }

                    else if (assignment.includes("linked list")) {
                        assignmentSelect.value = "dsa";
                    }

                }

            }, 100);

        });

    });


    // ===========================
    // INITIAL SUMMARY
    // ===========================

    updateSummaryCards();

});


