function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    window.addEventListener('load', () => {
        const $recaptcha = document.querySelector('#g-recaptcha-response');
        if ($recaptcha) {
          $recaptcha.setAttribute('required', 'required');
        }
      })
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formData = new FormData(document.getElementById('contactForm'));
    
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });
    const notificationElement = document.getElementById('filer_tje');
            notificationElement.classList.add("laat_zien");
    fetch('https://localhost:7238/api/Email/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    })


    .then(response => {
        if (!response.ok) {
            const notificationElement = document.getElementById('notification');
            notificationElement.classList.add("bad");
            notificationElement.textContent = "error";

            const notificationElement2 = document.getElementById('filer_tje');
            notificationElement2.classList.add("weg");
            throw new Error('Network response was not ok');
          
            
        }
        return response.json();
    })
    .then(data => {
        console.log('Ontvangen van server:', data);
        const notificationElement2 = document.getElementById('filer_tje');
        notificationElement2.classList.add("weg");
        const notificationElement = document.getElementById('notification');
        notificationElement.classList.add("good");

        if (notificationElement) {
            notificationElement.textContent = data.message;
        }
        clearFormFields();
    })
    .catch(error => {
        console.error('Fout bij het verzenden van formulier:', error);
        const notificationElement2 = document.getElementById('filer_tje');
        notificationElement2.classList.add("weg");
        const notificationElement = document.getElementById('notification');
        notificationElement.classList.add("bad");
        notificationElement.textContent = "Fout opgelopen met het verzenden van het formulier, " + error;
    });
    setTimeout(function(){
        window.location.reload(1);
     }, 10000);
}
function clearFormFields() {
    const form = document.getElementById('contactForm');
    form.reset();
}