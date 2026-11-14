
// =====================================
// 1. REUSABLE TOAST NOTIFICATION FUNCTION
// =====================================

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);

        toast.style.position = "fixed";
        toast.style.bottom = "25px";
        toast.style.right = "25px";
        toast.style.backgroundColor = "#071b3e";
        toast.style.color = "white";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "8px";
        toast.style.fontSize = "15px";
        toast.style.zIndex = "1000";
        toast.style.display = "none";
        toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    }

    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}


// =====================================
// 2. MAIN JAVASCRIPT FUNCTIONALITY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const bookButtons = document.querySelectorAll(
        'a[href="#booking"]'
    );

    const bookingSection = document.getElementById("booking");
    const matchSelect = document.getElementById("match");
    const bookingForm = document.querySelector("#booking form");
    const summary = document.getElementById("booking-summary");

    let selectedMatchDetails = null;


    // =====================================
    // 3. UPDATE BOOKING INFORMATION
    // =====================================

    function updateSummary() {

        const match = matchSelect.value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const tickets = document.getElementById("tickets").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;

        summary.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "Booking Information";
        summary.appendChild(heading);

        function addInfo(label, value) {

            const p = document.createElement("p");

            p.textContent = label + ": " + (value || "Not selected");

            summary.appendChild(p);
        }

        addInfo("Match", match);

        if (selectedMatchDetails) {

            addInfo("Match Date", selectedMatchDetails.date);
            addInfo("Time", selectedMatchDetails.time);
            addInfo("Venue", selectedMatchDetails.venue);
        }

        addInfo("Name", name);
        addInfo("Email", email);
        addInfo("Mobile", phone);
        addInfo("Number of Tickets", tickets);
        addInfo("Ticket Category", category);
        addInfo("Booking Date", date);
    }


    // =====================================
    // 4. BOOK BUTTON AND AUTOMATIC SELECTION
    // =====================================

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const row = button.closest("tr");

            // Only process match schedule Book buttons
            if (!row) {
                return;
            }

            event.preventDefault();

            const cells = row.querySelectorAll("td");

            const match = cells[1].textContent.trim();

            selectedMatchDetails = {

                match: match,
                date: cells[2].textContent.trim(),
                time: cells[3].textContent.trim(),
                venue: cells[4].textContent.trim()

            };

            // Automatically select match
            matchSelect.value = match;

            // Update booking information
            updateSummary();

            // Smooth scrolling
            bookingSection.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

            showToast("Match selected! Complete your booking.");

        });

    });


    // =====================================
    // 5. MANUAL MATCH SELECTION
    // =====================================

    matchSelect.addEventListener("change", function () {

        const rows = document.querySelectorAll(
            "#schedule tbody tr"
        );

        selectedMatchDetails = null;

        rows.forEach(function (row) {

            const cells = row.querySelectorAll("td");

            if (
                cells[1].textContent.trim() === matchSelect.value
            ) {

                selectedMatchDetails = {

                    match: cells[1].textContent.trim(),
                    date: cells[2].textContent.trim(),
                    time: cells[3].textContent.trim(),
                    venue: cells[4].textContent.trim()

                };

            }

        });

        updateSummary();

    });


    // =====================================
    // 6. UPDATE DETAILS WHEN USER TYPES
    // =====================================

    bookingForm.addEventListener("input", function () {

        updateSummary();

    });

    bookingForm.addEventListener("change", function () {

        updateSummary();

    });


    // =====================================
    // 7. BOOKING FORM SUBMISSION
    // =====================================

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        updateSummary();

        showToast("Your IPL ticket booking was successful!");

    });


});
