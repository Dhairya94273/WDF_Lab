// =====================================================
// STUDENT HUB PORTAL - LOGIN.JS
// =====================================================


// =====================================================
// 1. ELEMENTS
// =====================================================

const menuToggle =
    document.getElementById("menu-toggle");

const sidebar =
    document.getElementById("sidebar");

const mainContent =
    document.getElementById("main-content");

const notificationBtn =
    document.getElementById("notification-btn");

const profileBtn =
    document.getElementById("profile-btn");

const loginForm =
    document.getElementById("login-form");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("toggle-password");

const rememberMe =
    document.getElementById("remember-me");

const loginMessage =
    document.getElementById("login-message");

const emailError =
    document.getElementById("email-error");

const passwordError =
    document.getElementById("password-error");

const googleContainer =
    document.getElementById("google-login-container");

const googleMessage =
    document.getElementById("google-message");

const microsoftLogin =
    document.getElementById("microsoft-login");


// =====================================================
// 2. SIDEBAR TOGGLE
// =====================================================

if (menuToggle && sidebar && mainContent) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("hidden");

        mainContent.classList.toggle("full-width");

    });

}


// =====================================================
// 3. ACTIVE SIDEBAR MENU
// =====================================================

const currentPage =
    window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


const sidebarLinks =
    document.querySelectorAll(".sidebar .menu a");


sidebarLinks.forEach(function (link) {

    const href =
        link.getAttribute("href");


    if (!href) {
        return;
    }


    const linkPage =
        href
            .split("/")
            .pop()
            .toLowerCase();


    link.classList.remove("active");


    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});


// =====================================================
// 4. PASSWORD SHOW / HIDE
// =====================================================

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", function () {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

            togglePassword.setAttribute(
                "aria-label",
                "Hide Password"
            );

        }
        else {

            passwordInput.type = "password";

            togglePassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

            togglePassword.setAttribute(
                "aria-label",
                "Show Password"
            );

        }

    });

}


// =====================================================
// 5. EMAIL VALIDATION
// =====================================================

function validateEmail() {

    const email =
        emailInput.value.trim();


    /*
        Basic email validation.

        Example:
        student@gmail.com
        abc.xyz@example.com
    */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (email === "") {

        emailInput.classList.add("input-error");

        emailInput.classList.remove("input-success");

        emailError.textContent =
            "Email address is required.";

        return false;
    }


    if (!emailRegex.test(email)) {

        emailInput.classList.add("input-error");

        emailInput.classList.remove("input-success");

        emailError.textContent =
            "Please enter a valid email address.";

        return false;
    }


    emailInput.classList.remove("input-error");

    emailInput.classList.add("input-success");

    emailError.textContent = "";

    return true;

}


// =====================================================
// 6. PASSWORD VALIDATION
// =====================================================

function validatePassword() {

    const password =
        passwordInput.value;


    /*
        Password requirements:

        8 - 16 characters
        At least 1 uppercase
        At least 1 lowercase
        At least 1 number
        At least 1 special character
    */

    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%&])[A-Za-z\d@#$!%&]{8,16}$/;


    if (password === "") {

        passwordInput.classList.add("input-error");

        passwordInput.classList.remove("input-success");

        passwordError.textContent =
            "Password is required.";

        return false;
    }


    if (!passwordRegex.test(password)) {

        passwordInput.classList.add("input-error");

        passwordInput.classList.remove("input-success");

        passwordError.textContent =
            "Password must be 8-16 characters with uppercase, lowercase, number and special character.";

        return false;
    }


    passwordInput.classList.remove("input-error");

    passwordInput.classList.add("input-success");

    passwordError.textContent = "";

    return true;

}


// =====================================================
// 7. REAL-TIME EMAIL VALIDATION
// =====================================================

if (emailInput) {

    emailInput.addEventListener(
        "input",
        function () {

            if (emailInput.value.trim() !== "") {

                validateEmail();

            }
            else {

                emailInput.classList.remove(
                    "input-error",
                    "input-success"
                );

                emailError.textContent = "";

            }

        }
    );

}


// =====================================================
// 8. REAL-TIME PASSWORD VALIDATION
// =====================================================

if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        function () {

            if (passwordInput.value !== "") {

                validatePassword();

            }
            else {

                passwordInput.classList.remove(
                    "input-error",
                    "input-success"
                );

                passwordError.textContent = "";

            }

        }
    );

}


// =====================================================
// 9. REMEMBER ME
// =====================================================

if (rememberMe) {

    const savedEmail =
        localStorage.getItem(
            "studenthub_remember_email"
        );


    if (savedEmail) {

        emailInput.value =
            savedEmail;

        rememberMe.checked =
            true;

    }


    rememberMe.addEventListener(
        "change",
        function () {

            if (!rememberMe.checked) {

                localStorage.removeItem(
                    "studenthub_remember_email"
                );

            }

        }
    );

}


// =====================================================
// 10. NORMAL LOGIN
// =====================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            loginMessage.textContent = "";

            loginMessage.className =
                "form-message";


            const emailValid =
                validateEmail();


            const passwordValid =
                validatePassword();


            if (!emailValid || !passwordValid) {

                loginMessage.textContent =
                    "Please fix the errors above.";

                loginMessage.classList.add(
                    "message-error"
                );

                return;

            }


            const email =
                emailInput.value.trim();


            // Remember email

            if (rememberMe.checked) {

                localStorage.setItem(
                    "studenthub_remember_email",
                    email
                );

            }
            else {

                localStorage.removeItem(
                    "studenthub_remember_email"
                );

            }


            /*
                IMPORTANT:

                This is frontend-only login.

                In a real application:

                Browser
                    ↓
                Node.js / Express
                    ↓
                Database
                    ↓
                Verify email/password
            */


            loginMessage.textContent =
                "Sign in successful! Redirecting...";

            loginMessage.classList.add(
                "message-success"
            );


            /*
                Demo session
            */

            sessionStorage.setItem(
                "studenthub_user_email",
                email
            );


            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1000);

        }
    );

}


// =====================================================
// 11. GOOGLE SIGN IN
// =====================================================

const GOOGLE_CLIENT_ID =
    "309378241381-duspsup0khm11inonvv4fcm87r6112hn.apps.googleusercontent.com";


// =====================================================
// 12. HANDLE GOOGLE RESPONSE
// =====================================================

function handleGoogleCredentialResponse(response) {

    console.log(
        "Google credential received."
    );


    if (!response || !response.credential) {

        googleMessage.textContent =
            "Google sign-in failed.";

        return;

    }


    try {

        /*
            Google sends an ID token as a JWT.

            For DEMO purposes we decode the payload
            in the browser.

            IMPORTANT:
            Production applications should send this
            token to the backend and verify it there.
        */

        const payload =
            parseJwt(response.credential);


        console.log(
            "Google User:",
            payload
        );


        const user = {

            name:
                payload.name || "",

            email:
                payload.email || "",

            picture:
                payload.picture || "",

            googleId:
                payload.sub || ""

        };


        /*
            Store demo session information.
        */

        sessionStorage.setItem(
            "studenthub_google_user",
            JSON.stringify(user)
        );


        googleMessage.textContent =
            "Google sign-in successful! Redirecting...";


        googleMessage.style.color =
            "#16A34A";


        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 1000);


    }
    catch (error) {

        console.error(
            "Google authentication error:",
            error
        );


        googleMessage.textContent =
            "Unable to process Google sign-in.";

    }

}


// =====================================================
// 13. DECODE JWT
// =====================================================

function parseJwt(token) {

    const base64Url =
        token.split(".")[1];


    const base64 =
        base64Url
            .replace(/-/g, "+")
            .replace(/_/g, "/");


    const jsonPayload =
        decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (char) {

                    return "%" +
                        ("00" +
                        char.charCodeAt(0)
                        .toString(16))
                        .slice(-2);

                })
                .join("")
        );


    return JSON.parse(jsonPayload);

}


// =====================================================
// 14. INITIALIZE GOOGLE
// =====================================================

function initializeGoogleLogin() {

    if (
        typeof google === "undefined" ||
        !google.accounts ||
        !google.accounts.id
    ) {

        console.error(
            "Google Identity Services did not load."
        );

        googleMessage.textContent =
            "Google Sign-In could not be loaded.";

        return;

    }


    if (!googleContainer) {

        return;

    }


    /*
        Initialize Google Identity Services.

        We use POPUP mode with a JavaScript callback.
    */

    google.accounts.id.initialize({

        client_id:
            GOOGLE_CLIENT_ID,

        callback:
            handleGoogleCredentialResponse,

        ux_mode:
            "popup"

    });


    /*
        Render Google's official button.

        We intentionally do NOT create our own
        button and trigger Google programmatically.
    */

    google.accounts.id.renderButton(

        googleContainer,

        {

            type:
                "standard",

            theme:
                "outline",

            size:
                "large",

            text:
                "signin_with",

            shape:
                "rectangular",

            logo_alignment:
                "left",

            width:
                380

        }

    );

}


// =====================================================
// 15. WAIT FOR GOOGLE LIBRARY
// =====================================================

window.addEventListener(
    "load",
    function () {

        initializeGoogleLogin();

    }
);


// =====================================================
// 16. MICROSOFT LOGIN
// =====================================================

if (microsoftLogin) {

    microsoftLogin.addEventListener(
        "click",
        function () {

            /*
                Microsoft authentication requires
                Microsoft Entra ID / OAuth configuration.

                This button is currently a placeholder.
            */

            alert(
                "Microsoft Sign-In will be connected after Microsoft OAuth configuration."
            );

        }
    );

}


// =====================================================
// 17. NOTIFICATION
// =====================================================

if (notificationBtn) {

    notificationBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "notice.html";

        }
    );

}


// =====================================================
// 18. PROFILE
// =====================================================

if (profileBtn) {

    profileBtn.addEventListener(
        "click",
        function () {

            window.location.href =
                "profile.html";

        }
    );

}