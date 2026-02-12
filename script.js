function sendMail(event) {

    event.preventDefault();

    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    }

    // simple validation 
    if (!parms.name || !parms.email || !parms.message) {
        showToast("Please fill in all fields", "error");
        return;
    }

    // email validation 
    if (!validateEmailInput()) {
        showToast("Please enter a valid email address", "error");
        return;
    }

    emailjs.send("service_bqhxl0n", "template_3pgoay2", parms)
        .then(function(response) {

            showToast('Email sent successfully!', 'success');

            // clear the forms
            document.getElementById("name").value = '';
            document.getElementById("email").value = '';
            document.getElementById("message").value = '';

        })
        .catch(function(error) {

            showToast('Failed to send email. Try again!', 'error');
            console.error('Error:', error);

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

function validateEmailInput() {
  const emailInput = document.getElementById('email').value; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(emailInput);
}
