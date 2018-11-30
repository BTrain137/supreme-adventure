let response;

document.addEventListener('click',function(event){
    if(event.target && event.target.classList == 'engagement-image') {
        console.log(event.target['data-index'], event.target.src);
    }
 });

(function getEngagementPhotos(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/get-engagement-photos-thumbnail');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                    const photoDiv = document.getElementById('engagement-photo-area');

                    response.forEach((photoURL, index) => {
                        console.log(photoURL);
                        let img = document.createElement('img');
                        let picture = document.createElement('picture');
                        picture.classList.add('engagement-image__wrapper');
                        img.classList.add('engagement-image');
                        img.setAttribute('srcset', photoURL);
                        img.setAttribute('data-index', index);
                        img.setAttribute('alt', `bryan and kim wedding photo# ${index}`);
                        picture.appendChild(img)
                        photoDiv.appendChild(picture);
                    });
                    setTimeout(() => {
                    //    photoDiv. 
                    }, 200);
                    
            } else {
                // console.log("This ",this);
                console.log("error");
            }
        }
    }
    xhr.send();
})();
