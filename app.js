
/* TEAM FILTER */

const teamFilter = document.getElementById("teamFilter");
const matchCards = document.querySelectorAll(".match-card");

teamFilter.addEventListener("change", function () {

    const selectedTeam = teamFilter.value;

    matchCards.forEach(function (card) {

        const teams = card.dataset.team;

        if (selectedTeam === "all" || teams.includes(selectedTeam)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

});


/* GRID AND LIST VIEW */

const matchContainer = document.getElementById("matchContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

gridBtn.addEventListener("click", function () {

    matchContainer.classList.remove("list-view");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");

});

listBtn.addEventListener("click", function () {

    matchContainer.classList.add("list-view");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");

});


/* HAMBURGER MENU */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {

    navbar.classList.toggle("active");

});

// Close menu after clicking a navigation link
const navLinks = document.querySelectorAll("#navbar a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        navbar.classList.remove("active");
    });

});


/* BOOKING SUMMARY */

const matchSelect = document.getElementById("match");
const categorySelect = document.getElementById("category");
const ticketInput = document.getElementById("tickets");

const summaryMatch = document.getElementById("summary-match");
const summaryCategory = document.getElementById("summary-category");
const summaryQuantity = document.getElementById("summary-quantity");

const ticketPrice = document.getElementById("ticket-price");
const totalPrice = document.getElementById("total-price");

function updateSummary() {

    const selectedMatch = matchSelect.value;
    const selectedCategory = categorySelect.value;
    const quantity = Number(ticketInput.value) || 0;

    let price = 0;

    // Calculate ticket price
    if (selectedCategory === "General") {
        price = 500;
    }
    else if (selectedCategory === "Premium") {
        price = 1000;
    }
    else if (selectedCategory === "VIP") {
        price = 2000;
    }

    // Update booking summary
    summaryMatch.textContent = selectedMatch || "Not selected";
    summaryCategory.textContent = selectedCategory || "Not selected";
    summaryQuantity.textContent = quantity;

    ticketPrice.textContent = price;
    totalPrice.textContent = price * quantity;

}

// Update summary whenever the user changes an input
matchSelect.addEventListener("change", updateSummary);
categorySelect.addEventListener("change", updateSummary);
ticketInput.addEventListener("input", updateSummary);


/* BOOK MATCH BUTTON */

const bookButtons = document.querySelectorAll(".book-btn");

bookButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedMatch = button.dataset.match;

        if (selectedMatch) {
            matchSelect.value = selectedMatch;
            updateSummary();
        }

    });

});


/* BOOKING FORM */

const bookingForm = document.getElementById("booking-form");

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const match = matchSelect.value;
    const quantity = ticketInput.value;
    const category = categorySelect.value;
    const total = totalPrice.textContent;

    alert(
        "Booking Successful!\n\n" +
        "Name: " + name + "\n" +
        "Match: " + match + "\n" +
        "Tickets: " + quantity + "\n" +
        "Category: " + category + "\n" +
        "Total Amount: ₹" + total
    );

});


/* INITIAL BOOKING SUMMARY */

updateSummary();
