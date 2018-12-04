let response;

function getLgImgUrl(thumbnailURL){
    let parsed = thumbnailURL.split('/');
    let thumbnailName = parsed[parsed.length - 1];
    let imageName = thumbnailName.split('-thumbnail').join('');
    return `https://s3.amazonaws.com/bryankim/engagement-photos/${imageName}`;
}

document.addEventListener('click',function(event){

    if (event.target && event.target.classList == 'lg-image-container') {
        event.target.remove();
    }
    else if (event.target && event.target.classList == 'lg-image__right-arrow') {
        let lgEngageImg = document.getElementsByClassName('lg-engagement-image')[0];
        let current = parseInt(lgEngageImg.dataset.index);
        let nextImg = getLgImgUrl(response[current + 1])

        lgEngageImg.setAttribute('srcset', nextImg);
        lgEngageImg.setAttribute('data-index', current + 1);
    }
    else if (event.target && event.target.classList == 'lg-image__left-arrow') {
        let lgEngageImg = document.getElementsByClassName('lg-engagement-image')[0];
        let current = parseInt(lgEngageImg.dataset.index);
        let previousImg = getLgImgUrl(response[current - 1])

        lgEngageImg.setAttribute('srcset', previousImg);
        lgEngageImg.setAttribute('data-index', current - 1);
    } 
    else if (event.target && event.target.classList == 'engagement-image') {
        let body = document.getElementsByTagName('body')[0];
        let index = event.target.dataset.index;
        let highQualityUrl = getLgImgUrl(event.target.srcset);

        let div = document.createElement('div');
        let leftDiv = document.createElement('div');
        let rightDiv = document.createElement('div');
        let largePicture = document.createElement('picture');
        let largeImage = document.createElement('img');

        leftDiv.classList.add('lg-image__left-arrow');
        rightDiv.classList.add('lg-image__right-arrow');
        div.classList.add('lg-image-container');
        largePicture.classList.add('lg-engagement__wrapper');
        largeImage.classList.add('lg-engagement-image');
        largeImage.setAttribute('srcset', highQualityUrl);
        largeImage.setAttribute('data-index', index);

        if(index < (response.length - 1)) largePicture.appendChild(rightDiv);
        if(index > 0) largePicture.appendChild(leftDiv);
        largePicture.appendChild(largeImage);
        div.appendChild(largePicture);
        body.appendChild(div);
    }

 });

(function getEngagementPhotos(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/get-engagement-photos-thumbnail');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                    let photoDiv = document.getElementById('engagement-photo-area');

                    response.forEach((photoURL, index) => {
                        let img = document.createElement('img');
                        let picture = document.createElement('picture');
                        picture.classList.add('engagement-image__wrapper');
                        img.classList.add('engagement-image');
                        img.setAttribute('srcset', photoURL);
                        img.setAttribute('data-index', index);
                        img.setAttribute('alt', `bryan and kim wedding photo #${index}`);
                        picture.appendChild(img)
                        photoDiv.appendChild(picture);
                    });

            } else {
                console.log("error");
            }
        }
    }
    xhr.send();
})();
