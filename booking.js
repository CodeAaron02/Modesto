// JavaScript to manage calendar and forms
// JavaScript to manage calendar and forms
// JavaScript to manage calendar and forms
// JavaScript to manage calendar and forms
// JavaScript to manage calendar and forms
// JavaScript to manage calendar and forms
// JavaScript to manage calendar and forms

const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  form = document.querySelector("form"),
  modal = document.getElementById("confirmation-modal"),
  closeModalBtn = document.querySelector(".close-btn"),
  confirmBtn = document.getElementById("confirm-btn"),
  cancelBtn = document.getElementById("cancel-btn"),
  confirmationDetails = document.getElementById("confirmation-details"),
  popupModal = document.getElementById("popup-modal"),
  popupOkBtn = document.getElementById("popup-ok-btn");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const bookedDates = new Set(); // This will store dates already booked

// Fetch booked dates from the server
const fetchBookedDates = async () => {
  try {
    const response = await fetch("/api/booked-dates"); // Replace with actual API endpoint
    if (response.ok) {
      const data = await response.json();
      data.forEach((date) => bookedDates.add(date));
      renderCalendar(); // Render calendar after fetching booked dates
    } else {
      console.error("Failed to fetch booked dates.");
    }
  } catch (error) {
    console.error("Error fetching booked dates:", error);
  }
};

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let dateStr = `${currYear}-${String(currMonth + 1).padStart(
      2,
      "0"
    )}-${String(i).padStart(2, "0")}`;
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    let isBooked = bookedDates.has(dateStr) ? "booked" : "";
    liTag += `<li class="${isToday} ${isBooked}" data-date="${dateStr}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;

  const days = daysTag.querySelectorAll("li:not(.inactive):not(.booked)");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      const selectedDate = e.target.getAttribute("data-date");
      document.getElementById("selected-date").value = selectedDate;
      days.forEach((day) => day.classList.remove("active"));
      e.target.classList.add("active");
    });
  });
};

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const packageChoice = formData.get("package");
  const selectedDate = formData.get("date");

  confirmationDetails.innerText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${packageChoice}\nDate: ${selectedDate}`;
  modal.style.display = "block";
  modal.style.lineHeight = 3;
  modal.style.textTransform = "uppercase";
});

closeModalBtn.onclick = () => {
  modal.style.display = "none";
};

cancelBtn.onclick = () => {
  modal.style.display = "none";
};

// confirmBtn.onclick = async () => {
//   const selectedDate = document.getElementById("selected-date").value;
//   const formData = new FormData(form);
//   const data = {
//     name: formData.get("name"),
//     email: formData.get("email"),
//     phone: formData.get("phone"),
//     package: formData.get("package"),
//     date: formData.get("date"),
//   };

//   try {
//     const response = await fetch("/submit-reservation", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (response.ok) {
//       showConfirmationPopup();
//       modal.style.display = "none";
//       bookedDates.add(selectedDate);
//       renderCalendar();
//     } else {
//       console.error("Failed to save reservation.");
//     }
//   } catch (error) {
//     console.error("Error saving reservation:", error);
//   }
// };

// // Function to show the confirmation pop-up message
// const showConfirmationPopup = () => {
//   popupModal.style.display = "block";
// };

// // Handle closing the pop-up modal
// popupOkBtn.onclick = () => {
//   popupModal.style.display = "none";
//   window.location.href = "guest.html"; // Redirect to guest.html
// };

// window.onclick = (event) => {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
//   if (event.target == popupModal) {
//     popupModal.style.display = "none";
//   }
// };

// Fetch booked dates and render calendar on page load
document.addEventListener("DOMContentLoaded", fetchBookedDates);

//
document.addEventListener("DOMContentLoaded", function () {
  // Get all confirm buttons
  const confirmButtons = document.querySelectorAll(".confirm-btn");

  confirmButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get the parent row
      const row = button.closest("tr");
      const guest = row.querySelector("td:nth-child(1) p").innerText;
      const email = row.querySelector("td:nth-child(2) p").innerText;
      const phone = row.querySelector("td:nth-child(3) p").innerText;
      const packageType = row.querySelector("td:nth-child(4) p").innerText;
      const dateOrder = row.querySelector("td:nth-child(5)").innerText;

      // Construct the URL with query parameters
      const url = new URL("index.html", window.location.origin);
      url.searchParams.append("guest", guest);
      url.searchParams.append("email", email);
      url.searchParams.append("phone", phone);
      url.searchParams.append("package", packageType);
      url.searchParams.append("date", dateOrder);

      // Redirect to index.html with the data as query parameters
      window.location.href = url.toString();
    });
  });
});
