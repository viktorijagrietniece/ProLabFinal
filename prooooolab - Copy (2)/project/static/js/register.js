document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const messageBox = document.getElementById("messageBox");
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const phone = document.getElementById("phone").value.trim();
        const role = document.getElementById("role").value;
        const department = document.getElementById("department").value;

        messageBox.innerHTML = "";
        if (password !== confirmPassword) {
            messageBox.innerHTML = `<p style="color: red;">Passwords do not match!</p>`;
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, lastname, email, password, phone, role, department })
            });
            if (response.status === 201) {
                messageBox.innerHTML = `
                    <p style="color: green;">Registration successful!</p>
                    <button id="loginRedirect">Go to Login</button>
                `;
                document.getElementById("loginRedirect").addEventListener("click", () => {
                    window.location.href = "/index.html";
                });
            } else {
                const result = await response.json();
                messageBox.innerHTML = `<p style="color: red;">${result.message || "Registration failed. Please try again."}</p>`;
            }
        } catch (error) {
            console.error("Error registering:", error);
            messageBox.innerHTML = `<p style="color: red;">An error occurred. Please try again.</p>`;
        }
    });
});
