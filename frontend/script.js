document.addEventListener("DOMContentLoaded", () => {
  console.log("page fully loaded");

  const form = document.getElementById("votingForm");

  if (!form) {
    console.error("votingForm not found in HTML");
    return;
  }

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
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log("Response from server:", result);

      document.getElementById("message").textContent =
        result.message || "Vote submitted successfully!";
    } catch (err) {
      console.error("Error during vote submission:", err);

      document.getElementById("message").textContent = "Error submitting your vote. Please try again.";
    }
  });
});
