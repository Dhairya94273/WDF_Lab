document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".register-card form");

    if (!form) {
        return;
    }

    const fields = {
        firstName: form.querySelector('input[placeholder="Enter First Name"]'),
        lastName: form.querySelector('input[placeholder="Enter Last Name"]'),
        middleName: form.querySelector('input[placeholder="Enter Middle Name"]'),
        email: form.querySelector('input[placeholder="Enter Email Address"]'),
        mobile: form.querySelector('input[placeholder="Enter Mobile Number"]'),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirmPassword"),
        checkbox: form.querySelector('input[type="checkbox"]')
    };

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirm = document.getElementById("toggleConfirm");

    function showMessage(message, type = "success") {
        let box = document.getElementById("register-message");

        if (!box) {
            box = document.createElement("div");
            box.id = "register-message";
            form.insertBefore(box, form.querySelector(".register-btn"));
        }

        box.textContent = message;
        box.className = "register-message " + type;
    }

    function validateName(input, fieldName) {
        if (!input) return true;

        const value = input.value.trim();

        if (value === "") {
            input.classList.add("input-error");
            input.classList.remove("input-success");
            showMessage(fieldName + " is required.", "error");
            return false;
        }

        input.classList.remove("input-error");
        input.classList.add("input-success");
        return true;
    }

    function validateEmail() {
        if (!fields.email) return true;

        const value = fields.email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            fields.email.classList.add("input-error");
            fields.email.classList.remove("input-success");
            showMessage("Email address is required.", "error");
            return false;
        }

        if (!emailPattern.test(value)) {
            fields.email.classList.add("input-error");
            fields.email.classList.remove("input-success");
            showMessage("Please enter a valid email address.", "error");
            return false;
        }

        fields.email.classList.remove("input-error");
        fields.email.classList.add("input-success");
        return true;
    }

    function validateMobile() {
        if (!fields.mobile) return true;

        const value = fields.mobile.value.trim();
        const mobilePattern = /^[0-9]{10,15}$/;

        if (value === "") {
            fields.mobile.classList.add("input-error");
            fields.mobile.classList.remove("input-success");
            showMessage("Mobile number is required.", "error");
            return false;
        }

        if (!mobilePattern.test(value)) {
            fields.mobile.classList.add("input-error");
            fields.mobile.classList.remove("input-success");
            showMessage("Mobile number must contain 10 to 15 digits only.", "error");
            return false;
        }

        fields.mobile.classList.remove("input-error");
        fields.mobile.classList.add("input-success");
        return true;
    }

    function validatePassword() {
        if (!fields.password) return true;

        const value = fields.password.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&*?])[A-Za-z\d@#$!%&*?]{8,16}$/;

        if (value === "") {
            fields.password.classList.add("input-error");
            fields.password.classList.remove("input-success");
            showMessage("Password is required.", "error");
            return false;
        }

        if (!passwordPattern.test(value)) {
            fields.password.classList.add("input-error");
            fields.password.classList.remove("input-success");
            showMessage("Password must be 8–16 chars with uppercase, lowercase, number, and special character.", "error");
            return false;
        }

        fields.password.classList.remove("input-error");
        fields.password.classList.add("input-success");
        return true;
    }

    function validateConfirmPassword() {
        if (!fields.confirmPassword) return true;

        const value = fields.confirmPassword.value;

        if (value === "") {
            fields.confirmPassword.classList.add("input-error");
            fields.confirmPassword.classList.remove("input-success");
            showMessage("Please confirm your password.", "error");
            return false;
        }

        if (value !== fields.password.value) {
            fields.confirmPassword.classList.add("input-error");
            fields.confirmPassword.classList.remove("input-success");
            showMessage("Passwords do not match.", "error");
            return false;
        }

        fields.confirmPassword.classList.remove("input-error");
        fields.confirmPassword.classList.add("input-success");
        return true;
    }

    function validateTerms() {
        if (!fields.checkbox) return true;

        if (!fields.checkbox.checked) {
            showMessage("You must agree to the Terms & Conditions.", "error");
            return false;
        }

        return true;
    }

    function toggleVisibility(input, button) {
        if (!input || !button) return;

        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";

        const icon = button.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-eye", isPassword);
            icon.classList.toggle("fa-eye-slash", !isPassword);
        }
    }

    if (togglePassword && fields.password) {
        togglePassword.addEventListener("click", function () {
            toggleVisibility(fields.password, togglePassword);
        });
    }

    if (toggleConfirm && fields.confirmPassword) {
        toggleConfirm.addEventListener("click", function () {
            toggleVisibility(fields.confirmPassword, toggleConfirm);
        });
    }

    if (fields.firstName) {
        fields.firstName.addEventListener("input", function () {
            validateName(fields.firstName, "First name");
        });
    }

    if (fields.lastName) {
        fields.lastName.addEventListener("input", function () {
            validateName(fields.lastName, "Last name");
        });
    }

    if (fields.email) {
        fields.email.addEventListener("input", validateEmail);
    }

    if (fields.mobile) {
        fields.mobile.addEventListener("input", validateMobile);
    }

    if (fields.password) {
        fields.password.addEventListener("input", validatePassword);
    }

    if (fields.confirmPassword) {
        fields.confirmPassword.addEventListener("input", validateConfirmPassword);
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const isFirstNameValid = validateName(fields.firstName, "First name");
        const isLastNameValid = validateName(fields.lastName, "Last name");
        const isEmailValid = validateEmail();
        const isMobileValid = validateMobile();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsAccepted = validateTerms();

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isEmailValid &&
            isMobileValid &&
            isPasswordValid &&
            isConfirmPasswordValid &&
            isTermsAccepted
        ) {
            showMessage("Registration successful! Redirecting to sign in...", "success");
            form.reset();

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1200);
        }
    });
});
