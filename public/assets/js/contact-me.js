const sendMessage = document.getElementById('send-contact');

sendMessage.addEventListener('click', function(evt){
    evt.preventDefault();
    let email = document.getElementById('user-email').value;
    let name = document.getElementById('user-name').value;
    let message = document.getElementById('user-message').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/contact-me", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() { 
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let form = document.getElementsByClassName("contact__form")[0];
            form.innerHTML = "";

            let header = document.createElement('h2');
            header.classList.add('text-center');
            header.innerHTML = "We will get back to you. <br> Thank you ";
            form.appendChild(header);
        }
        else {
            let form = document.getElementsByClassName("contact__form")[0];
            form.innerHTML = "";

            let header = document.createElement('h2');
            header.classList.add('text-center');
            header.innerHTML = "Sorry Something is really wrong. I didn't get your message. Contact us on social media. Sorry!";
            form.appendChild(header);
        }
    }
    xhr.send(JSON.stringify({ "email": email, "name": name, "message": message}));
});