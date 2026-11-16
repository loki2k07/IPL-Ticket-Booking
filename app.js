
// ===================================
// IPL 2026 - Activity 7 JavaScript
// ===================================


// 1. Toast Notification Function

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "25px";
        toast.style.right = "25px";
        toast.style.background = "#071b3a";
        toast.style.color = "white";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "8px";
        toast.style.zIndex = "1000";

        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.display = "none";
    }, 2500);
}


// 2. Select HTML Elements Using DOM Selectors

const bookingForm = document.getElementById("booking-form");

const matchSelect = document.getElementById("match");

const categorySelect = document.getElementById("category");

const ticketInput = document.getElementById("tickets");

const summaryMatch = document.getElementById("summary-match");

const summaryCategory = document.getElementById("summary-category");

const summaryQuantity = document.getElementById("summary-quantity");

const ticketPrice = document.getElementById("ticket-price");

const totalPrice = document.getElementById("total-price");


// 3. Ticket Prices

const prices = {
    General: 500,
    Premium: 1000,
    VIP: 2000
};


// 4. Update Booking Summary Function

function updateBookingSummary() {

    const selectedMatch = matchSelect.value;

    const selectedCategory = categorySelect.value;

    let quantity = Number(ticketInput.value);

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
        quantity = 1;
    }

    const price = prices[selectedCategory] || 0;

    const total = price * quantity;

    // Update Booking Summary
    summaryMatch.textContent = selectedMatch || "Not selected";

    summaryCategory.textContent = selectedCategory || "Not selected";

    summaryQuantity.textContent = quantity;

    ticketPrice.textContent = price;

    totalPrice.textContent = total;

    showToast("Booking Summary Updated!");
}


// 5. Add Change Event Listeners

matchSelect.addEventListener("change", updateBookingSummary);

categorySelect.addEventListener("change", updateBookingSummary);

ticketInput.addEventListener("input", updateBookingSummary);


// 6. Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


// 7. Booking Form Submission

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!bookingForm.checkValidity()) {
        bookingForm.reportValidity();
        return;
    }

    updateBookingSummary();

    showToast("Your booking details are ready!");

});
