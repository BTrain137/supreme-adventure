const body = document.querySelector('body');
const loading = document.querySelector('.loading-background');

function loadHeart() {
    body.style.overflow = 'hidden';
    loading.style.display = 'block';
}

function completeHeart() {
    body.style.overflow = 'visible';
    loading.style.display = 'none';
}

function uploadFile(file, signedRequest, url){
    loadHeart();
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                document.getElementById('preview').src = url;
                document.getElementById('thank-you-message').innerHTML = "Thank you for sharing this will be posted in a few hours."
                completeHeart();
            }
            else{
                //TODO create alert via nodemailer or twilio
                document.getElementById('preview').src = './assets/images/sorry.jpg';
                document.getElementById('thank-you-message').innerHTML = "SORRY something happened! Let Kim or Bryan know something happened."
                completeHeart();
            }
        }
    };
    xhr.send(file);
}

function getSignedRequest(file){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/wedding-upload?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                const response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
            }
            else {
                document.getElementById('preview').src = './assets/images/sorry.jpg';
                document.getElementById('thank-you-message').innerHTML = "SORRY something happened! Let Kim or Bryan know something happened."
                completeHeart();

                // Send time and browser info
                let timeNow = (new Date()).toString();
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "/contact-me", true);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.send(JSON.stringify({ "time": timeNow, "userAgent": navigator.userAgent }));
        }
    };
    xhr.send();
}

function initUpload(){
    const files = document.getElementById('file-input').files;
    const file = files[0];
    if(file == null){
        return alert('No file selected.');
    }
    getSignedRequest(file);
}

(() => {
    document.getElementById('file-input').onchange = initUpload;
})();
