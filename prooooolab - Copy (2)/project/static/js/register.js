document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const phone = document.getElementById("phone").value.trim();
        const role = document.getElementById("role").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, lastname, email, password, phone, role})
            });

            if (response.status === 201) {
                window.location.href = "/index.html";
            } else {
                const result = await response.json();
                alert(result.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error registering:", error);
            alert("An error occurred. Please try again.");
        }
    });
});
