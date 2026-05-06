function sendMail(event) {

    event.preventDefault();

    const button = document.querySelector("button[type='submit']");
    const lang = getCurrentLang();

    // parms in emailjs
    let parms = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        message: document.getElementById("message").value.trim(),
    }

    // validate empty parms
    if (!parms.name || !parms.email || !parms.message) {
        showToast(translations[lang].toast_empty, "error");
        return;
    }

    // validate email
    if (!validateEmail(parms.email)) {
        showToast(translations[lang].toast_invalid_email, "error");
        return;
    }

    // block button
    button.disabled = true;
    button.textContent = translations[lang].sending;

    // send email
    emailjs.send("service_bqhxl0n", "template_3pgoay2", parms)
        .then(function () {

            showToast(translations[lang].toast_success, "success");

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

        })
        .catch(function (error) {

            console.error("Error:", error);
            showToast(translations[lang].toast_error, "error");

        })
        .finally(function () {

            // return button to text
            button.disabled = false;
            button.textContent = translations[lang].send_button;

        });
}

// show toast
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

// simple email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// translations
const translations = {
  en: {
    // NAV
    nav_github: "GitHub",
    nav_linkedin: "LinkedIn",
    nav_email: "Email",

    // HERO
    hero_title: "Hello, I'm Afonso!",
    hero_text: "I'm an Informatics Engineering student aiming to build a career in cybersecurity. I'm driven by curiosity. I love understanding how systems work and how they can be made stronger and more secure. When I'm not coding you'll find me playing one of my many instruments, listening to music, reading books or writing poetry - always exploring new ideas.",

    hero_skills: "Skills",
    hero_projects: "Projects",
    hero_contact: "Contact",

    // SKILLS
    skills_title: "Skills",
    skills_text: "These are some of the technologies and concepts I've been working with throughout my degree and personal projects. I'm continuously learning and expanding my skills, and I'm always open to explore new ideas and technologies.",

    // PROJECTS
    projects_subtitle: "Browse My Recent",
    projects_title: "Projects",
    project_description_solvehub: "A collaborative desktop-only platform for solving academic exercises, where students can share, solve, and discuss exercises within a community.",
    project_description_gobraga: "A cross-platform application that provides tourists and visitors with essential information about Braga, including tourist attractions, restaurants and much more.",
    project_description_warehousegpt: "Local AI-powered warehouse assistant built with Streamlit, Ollama, ChromaDB and RAG. It combines internal warehouse procedures with structured stock data to answer operational questions with source-based responses.",
    live_demo: "Live Demo",

    // CONTACT
    contact_title: "Contact Me",
    contact_description: "Have a question or want to work together? Drop me a message!",
    label_name: "Name",
    label_email: "Email",
    label_message: "Message",
    send_button: "Send Message",

    // TOAST
    toast_success: "Email sent successfully!",
    toast_error: "Failed to send email. Try again!",
    toast_empty: "Please fill in all fields",
    toast_invalid_email: "Please enter a valid email address",
    sending: "Sending...",
  },

  pt: { 
    // NAV
    nav_github: "GitHub",
    nav_linkedin: "LinkedIn",
    nav_email: "Email",

    // HERO
    hero_title: "Olá, eu sou o Afonso!",
    hero_text: "Sou estudante de Engenharia Informática com o objetivo de seguir carreira em cibersegurança. Sou movido pela curiosidade. Gosto de compreender como os sistemas funcionam e como podem ser tornados mais fortes e seguros. Quando não estou a programar estou a tocar um dos meus muitos instrumentos, a ouvir música, a ler livros ou a escrever poesia - sempre a explorar novas ideias.",

    hero_skills: "Competências",
    hero_projects: "Projetos",
    hero_contact: "Contacto",

    // SKILLS
    skills_title: "Competências",
    skills_text: "Estas são algumas das tecnologias e conceitos com que tenho trabalhado ao longo do meu curso e projetos pessoais. Estou constantemente a aprender e a expandir as minhas competências, e estou sempre aberto a explorar novas ideias e tecnologias.",

    // PROJECTS
    projects_subtitle: "Explora os Meus Projetos Recentes",
    projects_title: "Projetos",
    project_description_solvehub: "Uma plataforma colaborativa para desktop dedicada à resolução de exercícios académicos, onde estudantes podem partilhar, resolver e discutir exercícios em comunidade.",
    project_description_gobraga: "Uma aplicação multiplataforma que fornece a turistas e visitantes informações essenciais sobre Braga, incluindo atrações turísticas, restaurantes e muito mais.",
    project_description_warehousegpt: "Assistente local de inteligência artificial para operações de armazém, desenvolvido com Streamlit, Ollama, ChromaDB e RAG. Combina procedimentos internos com dados estruturados de stock para responder a perguntas operacionais com indicação das fontes utilizadas.",
    live_demo: "Demo",

    // CONTACT
    contact_title: "Contacta-me",
    contact_description: "Tens alguma questão ou queres trabalhar comigo? Envia-me uma mensagem!",
    label_name: "Nome",
    label_email: "Email",
    label_message: "Mensagem",
    send_button: "Enviar Mensagem",

    // TOAST
    toast_success: "Email enviado com sucesso!",
    toast_error: "Falha ao enviar email. Tenta novamente!",
    toast_empty: "Preenche todos os campos",
    toast_invalid_email: "Insere um email válido",
    sending: "A enviar..."
  }
};

// set language
function setLanguage(lang) {

  localStorage.setItem("language", lang);

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.getAttribute("data-i18n");
    element.textContent = translations[lang][key];
  });

  document.documentElement.lang = lang;
}

// load saved language
document.addEventListener("DOMContentLoaded", () => {

    const savedLang = localStorage.getItem("language") || "en";

    setLanguage(savedLang);

    document.getElementById("lang-text").textContent =
        savedLang === "en" ? "PT" : "EN";
});

// change language
function toggleLanguage() {

    const currentLang = localStorage.getItem("language") || "en";
    const newLang = currentLang === "en" ? "pt" : "en";

    setLanguage(newLang);

    document.getElementById("lang-text").textContent =
        newLang === "en" ? "PT" : "EN";
}

// function to get current language set
function getCurrentLang() {
    return localStorage.getItem("language") || "en";
}


