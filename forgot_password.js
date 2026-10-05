document.addEventListener("DOMContentLoaded", function () {

// ============================
// ELEMENTS
// ============================

const form = document.querySelector(".forgot-card form");
const input = document.querySelector(".forgot-card input");
const button = document.querySelector(".forgot-card button");

const notificationIcon =
    document.querySelector(".navbar-right .fa-bell");

const profileIcon =
    document.querySelector(".navbar-right .fa-user-circle");


// ============================
// SEND OTP
// ============================

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const value = input.value.trim();

        if (value === "") {
            alert("Please enter your email or mobile number.");
            input.focus();
            return;
        }


        // Email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Mobile validation
        const mobilePattern =
            /^[6-9]\d{9}$/;


        const isEmail =
            emailPattern.test(value);

        const isMobile =
            mobilePattern.test(value);


        if (!isEmail && !isMobile) {

            alert(
                "Please enter a valid email address or 10-digit mobile number."
            );

            input.focus();

            return;
        }


        // Loading state
        button.disabled = true;

        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending OTP...';


        // Simulate OTP sending
        setTimeout(function () {

            alert(
                "OTP has been sent successfully to your registered " +
                (isEmail ? "email address." : "mobile number.")
            );


            button.disabled = false;

            button.innerHTML = "Send OTP";


            // Clear input
            input.value = "";

        }, 1200);

    });

}


// ============================
// INPUT FEEDBACK
// ============================

if (input) {

    input.addEventListener("input", function () {

        const value = this.value.trim();

        if (value === "") {

            this.style.borderColor = "#ccc";

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const mobilePattern =
            /^[6-9]\d{9}$/;


        if (
            emailPattern.test(value) ||
            mobilePattern.test(value)
        ) {

            this.style.borderColor = "#22c55e";

        } else {

            this.style.borderColor = "#f59e0b";

        }

    });

}


// ============================
// NOTIFICATION
// ============================

if (notificationIcon) {

    notificationIcon.addEventListener("click", function () {

        alert("You have no new notifications.");

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
// BACK TO LOGIN
// ============================

const backLogin =
    document.querySelector(".back-login a");

if (backLogin) {

    backLogin.addEventListener("click", function () {

        // Allow normal navigation to login.html

    });

}


// ============================
// ENTER KEY
// ============================

if (input) {

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            form.requestSubmit();

        }

    });

}


});
