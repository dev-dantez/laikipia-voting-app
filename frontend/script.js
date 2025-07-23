document.addEventListener("DOMContentLoaded", () => {
  console.log("Page fully loaded");

  const form = document.getElementById("votingForm");
  const messageEl = document.getElementById("message");

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

    console.log("Collected vote data:", data);

    // Validation: Make sure all fields are selected
    const missingFields = Object.entries(data)
      .filter(([key, value]) => value === "")
      .map(([key]) => key);

    if (missingFields.length > 0) {
      messageEl.textContent = `Please vote in all categories: ${missingFields.join(", ")}`;
      messageEl.style.color = "red";
      return;
    }

    try {
      const res = await fetch("https://laikipia-voting-backend.onrender.com/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Response from server:", result);

      if (res.ok) {
        messageEl.textContent = result.message || "Vote submitted successfully!";
        messageEl.style.color = "green";
        form.reset(); // Optional: reset after submission
      } else {
        messageEl.textContent = result.message || "Error submitting your vote.";
        messageEl.style.color = "red";
      }
    } catch (err) {
      console.error("Error during vote submission:", err);
      messageEl.textContent = "Error submitting your vote. Please try again.";
      messageEl.style.color = "red";
    }
  });
});
