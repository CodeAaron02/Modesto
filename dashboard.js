const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
// Function to update the counters and display
function updateCounters() {
  document.getElementById(
    "total-reservations"
  ).textContent = `${totalReservations} /mo`;
  document.getElementById(
    "completed-reservations"
  ).textContent = `${completedReservations} /mo`;
  document.getElementById(
    "total-sales"
  ).textContent = `₱${totalSales.toLocaleString()} /mo`;
}
document.addEventListener("DOMContentLoaded", () => {
  const pendingReservations = document.getElementById("pending-reservations");
  const recentReservations = document.getElementById("recent-reservations");

  pendingReservations.addEventListener("click", (event) => {
    if (event.target.classList.contains("confirm-btn")) {
      const row = event.target.closest("tr");
      confirmReservation(row);
    } else if (event.target.classList.contains("delete-btn")) {
      const row = event.target.closest("tr");
      deleteReservation(row);
    }
  });

  recentReservations.addEventListener("click", (event) => {
    if (event.target.classList.contains("complete-btn")) {
      const row = event.target.closest("tr");
      completeReservation(row);
    }
  });

  function confirmReservation(row) {
    const newRow = row.cloneNode(true);
    newRow.querySelector(".confirm-btn").remove(); // Remove Confirm button
    newRow.querySelector(".delete-btn").remove(); // Remove Delete button
    const statusCell = document.createElement("td");
    statusCell.innerHTML = `<span class="status pending">Pending</span>`;
    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `<button class="complete-btn">Complete</button>`;
    newRow.replaceChild(statusCell, newRow.children[5]);
    newRow.appendChild(actionsCell);
    newRow.dataset.status = "pending";
    recentReservations.appendChild(newRow);
    row.remove();
  }

  function deleteReservation(row) {
    row.remove();
  }

  function completeReservation(row) {
    const statusSpan = row.querySelector(".status");
    statusSpan.classList.remove("pending");
    statusSpan.classList.add("completed");
    statusSpan.textContent = "Completed";
    row.querySelector(".complete-btn").remove(); // Remove the Complete button
    row.dataset.status = "completed";
  }
});

//

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const guest = urlParams.get("guest");
  const email = urlParams.get("email");
  const phone = urlParams.get("phone");
  const packageType = urlParams.get("package");
  const dateOrder = urlParams.get("date");

  if (guest && email && phone && packageType && dateOrder) {
    // Do something with the data, e.g., populate a form or display a message
    document.getElementById("reservation-form").elements["name"].value = guest;
    document.getElementById("reservation-form").elements["email"].value = email;
    document.getElementById("reservation-form").elements["phone"].value = phone;
    document.getElementById("reservation-form").elements["package"].value =
      packageType;
    document.getElementById("reservation-form").elements["date"].value =
      dateOrder;
  }
});
