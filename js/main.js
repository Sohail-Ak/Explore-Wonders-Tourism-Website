// Function to filter accommodation items
function filterAccommodation(criteria) {
  const items = document.querySelectorAll(".accommodation-item");

  // First, show all items
  items.forEach((item) => {
    item.style.display = "block";
  });

  if (criteria === "price") {
    // Sort by price
    const sortedItems = Array.from(items).sort((a, b) => {
      const priceA = parseFloat(
        a
          .querySelector(".accommodation-details p:nth-child(3)") // Price
          .innerText.replace(/[^0-9.-]+/g, "")
      );
      const priceB = parseFloat(
        b
          .querySelector(".accommodation-details p:nth-child(3)") // Price
          .innerText.replace(/[^0-9.-]+/g, "")
      );
      return priceA - priceB; // Sort ascending
    });

    // Append sorted items back to the container
    const container = document.querySelector(".accommodation-listings");
    sortedItems.forEach((item) => container.appendChild(item));
  } else if (criteria === "location") {
    // Filter by specific location
    const specificLocation = prompt("Enter location to filter:");
    if (specificLocation) {
      items.forEach((item) => {
        const itemLocation = item
          .querySelector(".location")
          .innerText.split(": ")[1];
        if (
          !itemLocation.toLowerCase().includes(specificLocation.toLowerCase())
        ) {
          item.style.display = "none"; // Hide items not matching the location
        }
      });
    }
  }
}

// Add event listeners to the filter buttons
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const criteria = button.getAttribute("data-filter"); // Get the filter criteria from the button's data attribute
    filterAccommodation(criteria);
  });
});

// Accordion Functionality with Icon Rotation
document.querySelectorAll(".accordion-button").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionItem = button.parentElement;

    // Toggle the active class
    accordionItem.classList.toggle("active");

    // Close other open accordions
    document.querySelectorAll(".accordion-item").forEach((item) => {
      if (item !== accordionItem && item.classList.contains("active")) {
        item.classList.remove("active");
      }
    });
  });
});

// Simple form validation and submission
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent actual form submission for this demo

    // Simple validation check for the email and name fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Gather form data (this is where you would send the data to a server)
    const formData = {
      name: name,
      email: email,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      travelDate: document.getElementById("travelDate").value,
      message: message,
      contactMethod: document.getElementById("contactMethod").value,
      country: document.getElementById("country").value,
    };

    console.log("Form Data Submitted:", formData);
    alert("Your message has been sent successfully!");

    // Reset the form
    document.getElementById("contactForm").reset();
  });
