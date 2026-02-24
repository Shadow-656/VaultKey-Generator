document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const moonIcon = document.getElementById("moon-icon");
    const sunIcon = document.getElementById("sun-icon");
    
    const tabPin = document.getElementById("tab-pin");
    const tabPass = document.getElementById("tab-pass");
    const pinOptions = document.getElementById("pin-options");
    const passwordOptions = document.getElementById("password-options");
    
    const passLengthInput = document.getElementById("pass-length");
    const lengthValDisplay = document.getElementById("length-val");
    
    const generateBtn = document.getElementById("generate-btn");
    const resultInput = document.getElementById("result");
    const outputContainer = document.getElementById("output-container");
    const toast = document.getElementById("toast");

    const easyToSay = document.getElementById("easy-to-say");
    const incNumbers = document.getElementById("inc-numbers");
    const incSymbols = document.getElementById("inc-symbols");
    const labelNumbers = document.getElementById("label-numbers");
    const labelSymbols = document.getElementById("label-symbols");

    let currentMode = "PIN";

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        moonIcon.style.display = isDark ? "none" : "block";
        sunIcon.style.display = isDark ? "block" : "none";
    });

    tabPin.addEventListener("change", () => {
        currentMode = "PIN";
        pinOptions.classList.add("active");
        passwordOptions.classList.remove("active");
        resultInput.value = ""; 
    });

    tabPass.addEventListener("change", () => {
        currentMode = "PASSWORD";
        passwordOptions.classList.add("active");
        pinOptions.classList.remove("active");
        resultInput.value = "";
    });

    passLengthInput.addEventListener("input", (e) => {
        lengthValDisplay.textContent = e.target.value;
    });

    easyToSay.addEventListener("change", (e) => {
        if (e.target.checked) {
            incNumbers.checked = false;
            incSymbols.checked = false;
        }
    });

    incNumbers.addEventListener("change", (e) => {
        if (e.target.checked) {
            easyToSay.checked = false;
        }
    });

    incSymbols.addEventListener("change", (e) => {
        if (e.target.checked) {
            easyToSay.checked = false;
        }
    });

    generateBtn.addEventListener("click", () => {
        generateBtn.style.transform = "scale(0.97)";
        setTimeout(() => generateBtn.style.transform = "", 150);

        if (currentMode === "PIN") {
            generatePIN();
        } else {
            generatePassword();
        }
    });

    function generatePIN() {
        const length = document.querySelector('input[name="pin-length"]:checked').value;
        let pin = "";
        for (let i = 0; i < length; i++) {
            pin += Math.floor(Math.random() * 10);
        }
        resultInput.value = pin;
    }

    function generatePassword() {
        const length = passLengthInput.value;
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const numbers = "0123456789";
        const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (easyToSay.checked) {
            const consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
            const vowels = "aeiouAEIOU";
            let password = "";
            let useConsonant = Math.random() > 0.5;
            
            for (let i = 0; i < length; i++) {
                if (useConsonant) {
                    password += consonants[Math.floor(Math.random() * consonants.length)];
                } else {
                    password += vowels[Math.floor(Math.random() * vowels.length)];
                }
                useConsonant = !useConsonant;
            }
            resultInput.value = password;
            return;
        }

        let charPool = lowercase + uppercase;
        if (incNumbers.checked) charPool += numbers;
        if (incSymbols.checked) charPool += symbols;

        if (charPool === "") {
            resultInput.value = "Select an option!";
            return;
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool[randomIndex];
        }
        resultInput.value = password;
    }

    outputContainer.addEventListener("click", () => {
        const textToCopy = resultInput.value;
        if (!textToCopy || textToCopy === "Select an option!" || textToCopy === "Tap generate...") return;

        navigator.clipboard.writeText(textToCopy).then(() => {
            toast.classList.add("show");
            outputContainer.style.background = "rgba(147, 129, 255, 0.15)";
            setTimeout(() => {
                toast.classList.remove("show");
                outputContainer.style.background = "";
            }, 2000);
        }).catch(err => console.error('Failed to copy text: ', err));
    });
});