document.addEventListener("DOMContentLoaded", function () {

// =====================================================
// ELEMENTS
// =====================================================

const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

const menuToggle = document.getElementById("menu-toggle");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

const notificationBtn =
    document.getElementById("notification-btn");

const profileBtn =
    document.getElementById("profile-btn");


// =====================================================
// SIDEBAR TOGGLE
// =====================================================

if (menuToggle && sidebar && mainContent) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("hidden");
        mainContent.classList.toggle("full-width");

    });

}


// =====================================================
// ACTIVE SIDEBAR MENU
// =====================================================

const menuLinks =
    document.querySelectorAll(".menu a");

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


// =====================================================
// SEARCH DATA
// =====================================================

const searchData = [

    {
        name: "Home",
        page: "index.html",
        icon: "fa-house",
        keywords: "home dashboard student portal"
    },

    {
        name: "Profile",
        page: "profile.html",
        icon: "fa-user",
        keywords: "profile student personal information"
    },

    {
        name: "Timetable",
        page: "timetable.html",
        icon: "fa-calendar-days",
        keywords: "timetable schedule classes lecture"
    },

    {
        name: "Attendance",
        page: "attendence.html",
        icon: "fa-clipboard-user",
        keywords: "attendance present absent percentage"
    },

    {
        name: "Assignments",
        page: "assignment.html",
        icon: "fa-file-lines",
        keywords: "assignment submit homework tasks"
    },

    {
        name: "Notices",
        page: "notice.html",
        icon: "fa-bullhorn",
        keywords: "notice announcement notification"
    },

    {
        name: "Results",
        page: "result.html",
        icon: "fa-graduation-cap",
        keywords: "result marks grades examination"
    },

    {
        name: "Events",
        page: "event.html",
        icon: "fa-calendar-check",
        keywords: "events hackathon seminar workshop"
    },

    {
        name: "Contact",
        page: "contect.html",
        icon: "fa-phone",
        keywords: "contact support phone email"
    },

    {
        name: "Feedback",
        page: "feedback.html",
        icon: "fa-comment-dots",
        keywords: "feedback suggestion review"
    },

    {
        name: "About Us",
        page: "about.html",
        icon: "fa-address-card",
        keywords: "about student hub information"
    }

];


// =====================================================
// DISPLAY SEARCH RESULTS
// =====================================================

function showSearchResults(query) {

    if (!searchResults) {
        return;
    }

    const value = query.toLowerCase().trim();

    searchResults.innerHTML = "";

    if (value === "") {

        searchResults.classList.remove("active");

        return;

    }


    const results =
        searchData.filter(item => {

            return (
                item.name.toLowerCase().includes(value) ||
                item.keywords.toLowerCase().includes(value)
            );

        });


    if (results.length === 0) {

        searchResults.innerHTML = `
            <div class="no-result">
                <i class="fa-solid fa-circle-exclamation"></i>
                <span>No results found</span>
            </div>
        `;

        searchResults.classList.add("active");

        return;

    }


    results.forEach(item => {

        const resultItem =
            document.createElement("a");

        resultItem.href = item.page;

        resultItem.className =
            "search-result-item";

        resultItem.innerHTML = `
            <i class="fa-solid ${item.icon}"></i>
            <span>${item.name}</span>
        `;

        searchResults.appendChild(resultItem);

    });


    searchResults.classList.add("active");

}


// =====================================================
// SEARCH INPUT
// =====================================================

if (searchInput) {

    searchInput.addEventListener("input", function () {

        showSearchResults(this.value);

    });


    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            performSearch();

        }

    });

}


// =====================================================
// SEARCH BUTTON
// =====================================================

function performSearch() {

    if (!searchInput) {
        return;
    }

    const query =
        searchInput.value.trim().toLowerCase();

    if (query === "") {

        searchInput.focus();

        return;

    }


    const result =
        searchData.find(item => {

            return (
                item.name.toLowerCase() === query ||
                item.keywords.toLowerCase().includes(query)
            );

        });


    if (result) {

        window.location.href = result.page;

    } else {

        showSearchResults(query);

    }

}


if (searchBtn) {

    searchBtn.addEventListener("click", function () {

        performSearch();

    });

}


// =====================================================
// CLOSE SEARCH RESULTS
// =====================================================

document.addEventListener("click", function (event) {

    if (
        searchResults &&
        !event.target.closest("#navbar-search")
    ) {

        searchResults.classList.remove("active");

    }

});


// =====================================================
// NOTIFICATIONS
// =====================================================

if (notificationBtn) {

    notificationBtn.addEventListener("click", function () {

        alert(
            "Notifications\n\n" +
            "• DBMS Assignment is due Friday.\n" +
            "• Hackathon registration closes tomorrow.\n" +
            "• Semester Examination starts from 15 August."
        );

    });

}


// =====================================================
// PROFILE
// =====================================================

if (profileBtn) {

    profileBtn.addEventListener("click", function () {

        window.location.href = "profile.html";

    });

}


// =====================================================
// DASHBOARD CARDS
// =====================================================

const cards =
    document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("click", function () {

        const heading =
            this.querySelector("h3");

        if (!heading) {
            return;
        }

        const title =
            heading.textContent.trim();

        const pages = {

            "Latest Notice": "notice.html",

            "Assignment": "assignment.html",

            "Upcoming Event": "event.html",

            "Attendance": "attendence.html",

            "Courses": "timetable.html",

            "CGPA": "result.html"

        };

        if (pages[title]) {

            window.location.href =
                pages[title];

        }

    });

});


// =====================================================
// QUICK ACTIONS
// =====================================================

const quickBoxes =
    document.querySelectorAll(".quick-box");

quickBoxes.forEach(box => {

    box.addEventListener("click", function () {

        const heading =
            this.querySelector("h4");

        if (!heading) {
            return;
        }

        const title =
            heading.textContent.trim();


        if (title === "Upload Assignment") {

            window.location.href =
                "assignment.html";

        }

        else if (title === "Study Material") {

            alert(
                "Study Material section is currently being prepared."
            );

        }

        else if (title === "Academic Calendar") {

            window.location.href =
                "timetable.html";

        }

        else if (title === "Message Faculty") {

            window.location.href =
                "contect.html";

        }

    });

});


// =====================================================
// CARD HOVER ACCESSIBILITY
// =====================================================

cards.forEach(card => {

    card.setAttribute("tabindex", "0");

    card.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            card.click();

        }

    });

});


// =====================================================
// RESPONSIVE SIDEBAR
// =====================================================

window.addEventListener("resize", function () {

    if (
        window.innerWidth <= 768 &&
        sidebar
    ) {

        sidebar.classList.add("hidden");
        mainContent.classList.add("full-width");

    }

});


// =====================================================
// INITIAL STATE
// =====================================================

if (
    window.innerWidth <= 768 &&
    sidebar &&
    mainContent
) {

    sidebar.classList.add("hidden");
    mainContent.classList.add("full-width");

}


});
