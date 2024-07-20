// MENU TOGGLE

var menulist = document.getElementById("menulist");
menulist.style.maxHeight = "0px";

function menutoggle() {
  if (menulist.style.maxHeight == "0px") {
    menulist.style.maxHeight = "100svh";
  } else {
    menulist.style.maxHeight = "0px";
  }
}

// LOG IN FORM

function openLoginForm() {
  document.getElementById("loginForm").style.display = "block";
}

function closeLoginForm() {
  document.getElementById("loginForm").style.display = "none";
}

//
const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const loginButton = document.querySelector("#login_button");

loginButton.addEventListener("click", async () => {
  const username = inputUsername.value;
  const password = inputPassword.value;

  console.log(username, password);

  try {
    const data = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const res = await data.json();
  } catch (error) {
    console.log(error);
  }
});

// ADMIN ACCOUNT
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // For demonstration, using hardcoded credentials
    if (username === "admin" && password === "password") {
      localStorage.setItem("authenticated", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });

const fetchBookedDates = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/booked-dates"); // Adjust the URL as necessary
    if (response.ok) {
      const data = await response.json();
      data.forEach((date) => bookedDates.add(date));
      renderCalendar();
    } else {
      console.error("Failed to fetch booked dates.");
    }
  } catch (error) {
    console.error("Error fetching booked dates:", error);
  }
};

// Fetch booked dates and render calendar on page load
document.addEventListener("DOMContentLoaded", fetchBookedDates);

// IMAGE FULLSCREEN
document.querySelectorAll(".gallery-wrapper img").forEach((img) => {
  img.addEventListener("click", () => {
    document.getElementById("fullscreenImage").src = img.src;
    document.getElementById("fullscreen").style.display = "flex";
  });
});

function closeFullscreen() {
  document.getElementById("fullscreen").style.display = "none";
}
