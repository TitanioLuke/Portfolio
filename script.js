function sendMail() {
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value,
    }

    emailjs.send("service_bqhxl0n", "template_3pgoay2", parms).then(alert("Email Sent!"))
}