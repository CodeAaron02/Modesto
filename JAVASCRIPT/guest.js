var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

const navEl = document.querySelector(".nav");
const hamburgerEl = document.querySelector(".hamburger");

/* hamburgerEl.addEventListener("click", () => {
  navEl.classList.add("nav--open");
}); */
``;

//

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

// SCROLL UP NAVBAR

let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add("hidden");
  } else {
    // Scrolling up
    navbar.classList.remove("hidden");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
