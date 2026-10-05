document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       SIDEBAR TOGGLE
    ========================= */

    const menuButton = document.querySelector(".navbar-left .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (menuButton) {

        menuButton.addEventListener("click", function () {

            if (window.innerWidth <= 600) {

                if (sidebar.style.display === "none") {
                    sidebar.style.display = "flex";
                } else {
                    sidebar.style.display = "none";
                }

            } else {

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
       CONTACT FORM
    ========================= */

    const contactForm = document.querySelector(".contact-form form");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectInput.value;
            const message = messageInput.value.trim();


            /* Name validation */

            if (name.length < 2) {

                alert("Please enter a valid name.");

                nameInput.focus();

                return;

            }


            /* Email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                emailInput.focus();

                return;

            }


            /* Subject validation */

            if (subject === "") {

                alert("Please select a subject.");

                subjectInput.focus();

                return;

            }


            /* Message validation */

            if (message.length < 10) {

                alert(
                    "Please enter a message of at least 10 characters."
                );

                messageInput.focus();

                return;

            }


            /* Successful submission */

            alert(
                "Message Sent Successfully!\n\n" +
                "Thank you, " + name + ".\n" +
                "Our StudentHub support team will get back to you."
            );

            contactForm.reset();

        });

    }


    /* =========================
       INPUT CHARACTER FEEDBACK
    ========================= */

    if (messageInput) {

        messageInput.addEventListener("input", function () {

            const length = messageInput.value.length;

            if (length > 0 && length < 10) {
                messageInput.style.borderColor = "#F59E0B";
            } else if (length >= 10) {
                messageInput.style.borderColor = "#22C55E";
            } else {
                messageInput.style.borderColor = "#ddd";
            }

        });

    }


    /* =========================
       SEARCH
    ========================= */

    const searchIcon =
        document.querySelector(".fa-magnifying-glass");

    if (searchIcon) {

        searchIcon.addEventListener("click", function () {

            const searchText = prompt(
                "Search Contact page:"
            );

            if (!searchText) {
                return;
            }

            const searchValue =
                searchText.toLowerCase().trim();

            const pageText =
                document.querySelector(".main-content")
                    .innerText
                    .toLowerCase();

            if (pageText.includes(searchValue)) {

                alert(
                    "Found \"" +
                    searchText +
                    "\" on this page."
                );

            } else {

                alert(
                    "No information found for \"" +
                    searchText +
                    "\"."
                );

            }

        });

    }


    /* =========================
       NOTIFICATION
    ========================= */

    const notificationIcon =
        document.querySelector(".fa-bell");

    if (notificationIcon) {

        notificationIcon.addEventListener("click", function () {

            alert(
                "Notifications\n\n" +
                "No new contact or support notifications."
            );

        });

    }


    /* =========================
       PROFILE ICON
    ========================= */

    const profileIcon =
        document.querySelector(".fa-user-circle");

    if (profileIcon) {

        profileIcon.addEventListener("click", function () {

            window.location.href = "profile.html";

        });

    }


    /* =========================
       LOCATION BUTTON
    ========================= */

    const mapButton =
        document.querySelector(".map-btn");

    if (mapButton) {

        mapButton.addEventListener("click", function () {

            const location =
                "CHARUSAT University, Changa, Anand, Gujarat, India";

            const mapURL =
                "https://www.google.com/maps/search/?api=1&query=" +
                encodeURIComponent(location);

            window.open(mapURL, "_blank");

        });

    }


    /* =========================
       CONTACT INFORMATION HOVER
    ========================= */

    const infoBoxes =
        document.querySelectorAll(".info-box");

    infoBoxes.forEach(function (box) {

        box.addEventListener("click", function () {

            const heading =
                box.querySelector("h3");

            if (!heading) {
                return;
            }

            const title =
                heading.innerText.toLowerCase();

            if (title === "phone") {

                const phone =
                    box.querySelector("p").innerText.trim();

                window.location.href =
                    "tel:" + phone.replace(/\s/g, "");

            }

            else if (title === "email") {

                const email =
                    box.querySelector("p").innerText.trim();

                window.location.href =
                    "mailto:" + email;

            }

        });

    });


    /* =========================
       RESIZE HANDLING
    ========================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth <= 600) {

            if (sidebar.style.display === "none") {
                mainContent.style.marginLeft = "0";
            } else {
                mainContent.style.marginLeft = "70px";
            }

        } else if (window.innerWidth <= 768) {

            sidebar.style.display = "flex";
            mainContent.style.marginLeft = "210px";

        } else {

            sidebar.style.display = "flex";
            mainContent.style.marginLeft = "250px";

        }

    });

});





