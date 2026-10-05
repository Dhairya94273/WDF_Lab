document.addEventListener("DOMContentLoaded", function () {

// ============================
// SIDEBAR TOGGLE
// ============================

const menuIcon = document.querySelector(".navbar-left .fa-bars");
const sidebar = document.querySelector(".sidebar");

if (menuIcon && sidebar) {

    menuIcon.addEventListener("click", function () {

        if (window.innerWidth <= 700) {
            sidebar.classList.toggle("show");
        } else {
            sidebar.classList.toggle("collapsed");
        }

    });

}


// ============================
// ACTIVE SIDEBAR MENU
// ============================

const menuLinks = document.querySelectorAll(".menu a");

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
// FEEDBACK FORM
// ============================

const form = document.querySelector(".feedback-card form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const categoryInput = document.getElementById("category");
const messageInput = document.getElementById("message");
const submitButton = document.querySelector(".submit-btn");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const category = categoryInput.value;
        const message = messageInput.value.trim();

        const selectedRating =
            document.querySelector('input[name="rating"]:checked');

        // Name validation
        if (name.length < 2) {
            alert("Please enter a valid name.");
            nameInput.focus();
            return;
        }

        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        // Category validation
        if (category === "") {
            alert("Please select a feedback category.");
            categoryInput.focus();
            return;
        }

        // Rating validation
        if (!selectedRating) {
            alert("Please rate your experience.");
            return;
        }

        // Message validation
        if (message.length < 10) {
            alert("Please enter at least 10 characters in your feedback.");
            messageInput.focus();
            return;
        }

        // Submit button state
        submitButton.disabled = true;
        submitButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

        setTimeout(function () {

            alert(
                "Thank you, " +
                name +
                "! Your feedback has been submitted successfully."
            );

            form.reset();

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Submit Feedback';

        }, 1000);

    });

}


// ============================
// RATING HIGHLIGHT
// ============================

const ratingInputs =
    document.querySelectorAll('.rating input[name="rating"]');

ratingInputs.forEach(input => {

    input.addEventListener("change", function () {

        ratingInputs.forEach(rating => {

            const label = rating.closest("label");

            if (label) {
                label.style.transform = "scale(1)";
            }

        });

        const selectedLabel = this.closest("label");

        if (selectedLabel) {
            selectedLabel.style.transform = "scale(1.1)";
        }

    });

});


// ============================
// TEXTAREA CHARACTER FEEDBACK
// ============================

if (messageInput) {

    messageInput.addEventListener("input", function () {

        const length = this.value.trim().length;

        if (length > 0 && length < 10) {
            this.style.borderColor = "#f59e0b";
        } else if (length >= 10) {
            this.style.borderColor = "#22c55e";
        } else {
            this.style.borderColor = "#ddd";
        }

    });

}


// ============================
// SEARCH
// ============================

const searchIcon =
    document.querySelector(".navbar-right .fa-magnifying-glass");

if (searchIcon) {

    searchIcon.addEventListener("click", function () {

        const searchTerm =
            prompt("What would you like to search for?");

        if (!searchTerm) {
            return;
        }

        const term = searchTerm.toLowerCase().trim();

        const content =
            document.querySelector(".feedback-container");

        if (!content) {
            return;
        }

        const text =
            content.innerText.toLowerCase();

        if (text.includes(term)) {

            alert(
                'Search result found for "' +
                searchTerm +
                '".'
            );

        } else {

            alert(
                'No result found for "' +
                searchTerm +
                '".'
            );

        }

    });

}


// ============================
// NOTIFICATION
// ============================

const notificationIcon =
    document.querySelector(".navbar-right .fa-bell");

if (notificationIcon) {

    notificationIcon.addEventListener("click", function () {

        alert(
            "You have no new notifications."
        );

    });

}


// ============================
// PROFILE
// ============================

const profileIcon =
    document.querySelector(".navbar-right .fa-user-circle");

if (profileIcon) {

    profileIcon.addEventListener("click", function () {

        window.location.href = "profile.html";

    });

}


// ============================
// SIDEBAR CLICK
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
// WINDOW RESIZE
// ============================

window.addEventListener("resize", function () {

    if (window.innerWidth > 700) {
        sidebar.classList.remove("show");
    }

});

});
