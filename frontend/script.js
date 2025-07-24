document.addEventListener("DOMContentLoaded", () => {
  console.log("🟢 Page fully loaded");

  const form = document.getElementById("votingForm");
  const alertBox = document.getElementById("alertBox");

  if (!form) {
    console.error("⛔ votingForm not found");
    return;
  }

  const showAlert = (message, type = "success") => {
    alertBox.textContent = message;
    alertBox.className = `text-white text-center font-bold py-3 px-6 rounded-lg mb-4 ${
      type === "success" ? "bg-green-500" : "bg-red-600"
    }`;
    alertBox.style.display = "block";

    setTimeout(() => {
      alertBox.style.display = "none";
    }, 5000);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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

    console.log("📤 Data to send:", data);

    try {
      const res = await fetch("https://laikipia-voting-backend.onrender.com/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("✅ Server response:", result);

      if (res.ok) {
        showAlert(result.message || "Vote submitted successfully!", "success");
        form.reset();
      } else {
        showAlert(result.message || "Vote submission failed.", "error");
      }
    } catch (err) {
      console.error("❌ Error submitting vote:", err);
      showAlert("Network or CORS error. Please try again.", "error");
    }
  });
});
