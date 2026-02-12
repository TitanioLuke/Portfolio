function sendMail(event) {

    event.preventDefault();

    const button = document.querySelector("button[type='submit']");

    // parms in emailjs
    let parms = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
    }

    // validate empty parms
    if (!parms.name || !parms.email || !parms.message) {
        showToast("Please fill in all fields", "error");
        return;
    }

    // validate email
    if (!validateEmail(parms.email)) {
        showToast("Please enter a valid email address", "error");
        return;
    }

    // block button
    button.disabled = true;
    button.textContent = "Sending...";

    // send email
    emailjs.send("service_bqhxl0n", "template_3pgoay2", parms)
        .then(function () {

            showToast("Email sent successfully!", "success");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

        })
        .catch(function (error) {

            console.error("Error:", error);
            showToast("Failed to send email. Try again!", "error");

        })
        .finally(function () {

            // return button to text
            button.disabled = false;
            button.textContent = "Send Message";

        });
}


function showToast(message, type) {

    // clear previous toast 
    const existingToast = document.querySelector(".toast");
    if (existingToast) {
        existingToast.remove();
    }

    // create toast
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;  

    // add icon 
    const icon = document.createElement("i");
    icon.className = type === "success"
        ? "fa-solid fa-circle-check"
        : "fa-solid fa-circle-xmark";

    const text = document.createElement("span");
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);

    // show
    setTimeout(() => toast.classList.add("show"), 100);

    // remove after 3s
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
