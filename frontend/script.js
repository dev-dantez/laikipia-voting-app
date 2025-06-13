document.addEventListener("DOMContentLoaded", () => {
console.log("page fully loaded");

const form =document.getElementById("votingForm");

if (!form) {
    console.error("votingForm not found in HTML");
    return;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const data = {
        dancer: document.getElementById("dancer") ? document.getElementById("dancer").value : "",
        dj: document.getElementById("dj") ? document.getElementById("dj").value : "",
        influencer: document.getElementById("influencer") ? document.getElementById("influencer").value : "",
        photographer: document.getElementById("photographer") ? document.getElementById("photographer").value : "",
    };

    console.log("Data to send", data);

    try {
        const res = await
        fetch("http://localhost:5000/votes", {
            method: "POST",
            headers:  {"Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        console.log("Response from server:",
            result);

            document.getElementById("message").textContent =
            result.message || "Vote submitted successfully!";
        } catch (err) {
            console.error("Error during vote submission:", err);

            document.getElementById("message").textContent = "Error submitting your vote. Please try again.";
        }
    });
});

           