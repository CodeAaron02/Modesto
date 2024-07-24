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

// const fetchBookedDates = async () => {
//   try {
//     const response = await fetch("/api/booked-dates"); // Replace with actual API endpoint
//     if (response.ok) {
//       const data = await response.json();
//       data.forEach((date) => bookedDates.add(date));
//       renderCalendar(); // Render calendar after fetching booked dates
//     } else {
//       console.error("Failed to fetch booked dates.");
//     }
//   } catch (error) {
//     console.error("Error fetching booked dates:", error);
//   }
// };

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
    let isRestricted = restrictedDates.has(dateStr) ? "restricted" : "";
    liTag += `<li class="${isToday} ${isBooked} ${isRestricted}" data-date="${dateStr}">${i}</li>`;
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
      if (restrictedDates.has(selectedDate)) {
        alert("This date is restricted and cannot be selected.");
        return;
      }
      document.getElementById("selected-date").value = selectedDate;
      days.forEach((day) => day.classList.remove("active"));
      e.target.classList.add("active");
    });
  });
};

const restrictedDates = new Set([
  "2024-07-25",
  "2024-07-26",
  "2024-07-12",
  // Add more restricted dates here in YYYY-MM-DD format
]);

//

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

//
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservation-form");

  if (form) {
    form.onsubmit = function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Collect form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Send form data to the server
      fetch(form.action, {
        method: form.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((result) => {
          alert("Reservation request sent successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
  } else {
    console.error("Form element not found");
  }
});
