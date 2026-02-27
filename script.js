// =============================
// BOOKING FUNCTIONALITY
// =============================

const boatType = document.getElementById("boatType");
const hours = document.getElementById("hours");
const total = document.getElementById("total");
const bookingForm = document.getElementById("bookingForm");
const bookingResult = document.getElementById("bookingResult");

// Prevent past date selection
const dateInput = document.getElementById("date");
if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
}

// Calculate total price
function calculateTotal() {
    if (boatType && hours) {
        const price = parseInt(boatType.value) || 0;
        const hourValue = parseInt(hours.value) || 0;
        total.textContent = price * hourValue;
    }
}

if (boatType) boatType.addEventListener("change", calculateTotal);
if (hours) hours.addEventListener("input", calculateTotal);

// Handle booking submission
if (bookingForm) {
    bookingForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const bookingData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            boat: boatType.options[boatType.selectedIndex].text,
            date: dateInput.value,
            hours: hours.value,
            total: total.textContent
        };

        // Save to LocalStorage
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // Show confirmation
        bookingResult.innerHTML = `
            <div style="margin-top:20px; padding:15px; background:#e6f7ff; border-radius:8px;">
                <h3>Booking Confirmed ✅</h3>
                <p><strong>Name:</strong> ${bookingData.name}</p>
                <p><strong>Boat:</strong> ${bookingData.boat}</p>
                <p><strong>Date:</strong> ${bookingData.date}</p>
                <p><strong>Hours:</strong> ${bookingData.hours}</p>
                <p><strong>Total Paid:</strong> $${bookingData.total}</p>
            </div>
        `;

        bookingForm.reset();
        total.textContent = "0";
    });
}

// =============================
// CONTACT FORM FUNCTIONALITY
// =============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const contactData = {
            name: document.getElementById("contactName").value,
            email: document.getElementById("contactEmail").value,
            message: document.getElementById("message").value
        };

        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(contactData);
        localStorage.setItem("messages", JSON.stringify(messages));

        alert("Message sent successfully! ✅");

        contactForm.reset();
    });
}