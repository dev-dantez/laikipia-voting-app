document.addEventListener("DOMContentLoaded", () => {
  console.log("page fully loaded");

  const form = document.getElementById("votingForm");
  const alertBox = document.getElementById("alertBox");

  if (!form) {
    console.error("votingForm not found in HTML");
    return;
  }

  const showAlert = (message, type = "success") => {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.style.display = "block";

    // Auto-hide after 5 seconds
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 5000);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const getSelectedRadioValue = (name) => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      return selected ? selected.value : "";
    };

    const data = {
      dancer: getSelectedRadioValue("dancer"),
      dj: getSelectedRadioValue("dj"),
      influencer: getSelectedRadioValue("influencer"),
      photographer: getSelectedRadioValue("photographer"),
    };

    console.log("Data to send", data);

    try {
      const res = await fetch("https://laikipia-voting-backend.onrender.com/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Response from server:", result);

      if (res.ok) {
        showAlert(result.message || "Vote submitted successfully!", "success");
      } else {
        showAlert(result.message || "Failed to submit vote", "error");
      }
    } catch (err) {
      console.error("Error during vote submission:", err);
      showAlert("Error submitting your vote. Please try again.", "error");
    }
  });
});
