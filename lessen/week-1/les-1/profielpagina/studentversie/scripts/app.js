const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

const tel = document.getElementById("tel");
const telError = document.querySelector("#tel + span.tel_error");

window.addEventListener('load', () => {
    const $recaptcha = document.querySelector('#g-recaptcha-response');
    if ($recaptcha) {
      $recaptcha.setAttribute('required', 'required');
    }
  })

email.addEventListener("input", (event) => {
    // Each time the user types something, we check if the
    // form fields are valid.

    if (email.validity.valid) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        emailError.textContent = ""; // Reset the content of the message
        emailError.className = "error"; // Reset the visual state of the message
    } else {
        // If there is still an error, show the correct error
        showError();
    }
});

tel.addEventListener("input", (event) => {
    if (tel.validity.valid) {
        telError.textContent = ""; 
        telError.className = "error"; 
    } else {
        showErrortel();
    }
});


form.addEventListener("submit", (event) => {
    // if the email field is valid, we let the form submit
    if (!email.validity.valid) {
        // If it isn't, we display an appropriate error message
        showError();
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
    }

});

form.addEventListener("submit", (event) => {
    if (!tel.validity.valid) {
        showErrortel();
        event.preventDefault();
    }
});

function showError() {
    if (email.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        emailError.textContent = "Voer email adres in";
    } else if (email.validity.typeMismatch) {
        // If the field doesn't contain an email address,
        // display the following error message.
        emailError.textContent = "voer geldig email adres in";
    } else if (email.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        emailError.textContent = `E-mail should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }

    // Set the styling appropriately
    emailError.className = "error active";
}



function showErrortel() {
    var telInput = tel.value;
    var telRegex = /^\d{10}$/;  

    if (tel.validity.valueMissing) {
        telError.textContent = "Voer een telefoon nummer in";
    } else if (!telRegex.test(telInput)) {
        telError.textContent = "Voer een geldig telefoon nummer in";
    } else {
        telError.textContent = "";  
    }

    telError.className = "error active";
}
function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(input_str);
}



// function showError() {


//      if (!grecaptcha.getResponse()) {
//         vu.textContent = "Please complete the reCAPTCHA.";
//     } else {
//         telError.textContent = "";  // Geen fout, dus leeg maken
//         // Hier kun je het formulier verzenden als alles in orde is
//     }

//     telError.className = "error active";
// }
