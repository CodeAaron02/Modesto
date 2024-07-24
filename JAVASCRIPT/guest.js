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

// CONTACT FORM
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Your form submission logic here
      const formData = new FormData(contactForm);
      fetch("/send-email", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          alert("Message sent successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error sending your message.");
        });
    });
  } else {
    console.error("Contact form not found");
  }
});
