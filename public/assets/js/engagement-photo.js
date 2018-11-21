let response;

document.addEventListener('click',function(event){
    if(event.target && event.target.classList == 'engagement-image') {
        console.log(event.target['data-index'], event.target.src);
    }
 });

(function getEngagementPhotos(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/place-engagement-photos');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                    const photoDiv = document.getElementById('engagement-photo-area');

                    response.forEach((photoURL, index) => {
                        console.log(photoURL);
                        let img = document.createElement('img');
                        img.classList.add('engagement-image');
                        img.src = photoURL;
                        img['data-index'] = index;
                        img.alt = `bryan and kim wedding photo# ${index}`; 
                        photoDiv.appendChild(img);
                    });
                    
            } else {
                // console.log("This ",this);
                console.log("error");
            }
        }
    }
    xhr.send();
})();
