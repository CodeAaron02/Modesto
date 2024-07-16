document.addEventListener("DOMContentLoaded", () => {
  const reservationData = JSON.parse(localStorage.getItem("reservationData"));
  if (reservationData) {
    const { name, email, phone, package, date } = reservationData;
    document.getElementById(
      "reservation-details"
    ).innerText = `Reservation Details:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPackage: ${package}\nDate: ${date}`;
  }

  document
    .getElementById("payment-form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const paymentData = {
        cardNumber: formData.get("cardNumber"),
        cardName: formData.get("cardName"),
        expiryDate: formData.get("expiryDate"),
        cvv: formData.get("cvv"),
      };

      try {
        const response = await fetch("/process-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        });

        if (response.ok) {
          const result = await response.json();
          alert("Payment processed successfully!");
          // Redirect to a success page
          window.location.href = "success.html";
        } else {
          alert(
            "There was a problem processing your payment. Please try again."
          );
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        alert(
          "There was a problem processing your payment. Please try again later."
        );
      }
    });
});
