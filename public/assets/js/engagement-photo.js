let response;

function getLgImgUrl(thumbnailURL){
    
    if (thumbnailURL) {
        let parsed = thumbnailURL.split('/');
        let thumbnailName = parsed[parsed.length - 1];
        let imageName = thumbnailName.split('-thumbnail').join('');
        return `https://s3.amazonaws.com/bryankim/engagement-photos/${imageName}`;
    } else {
        let lgImgContainer = document.getElementsByClassName('lg-image-container')[0];
        lgImgContainer.remove();
    }
};

function getPerviousPhoto() {
    let lgEngageImg = document.getElementsByClassName('lg-engagement-image')[0];
    let current = parseInt(lgEngageImg.dataset.index);

    if ((current - 1) >= 0) {
        let previousImg = getLgImgUrl(response[current - 1]);
        lgEngageImg.setAttribute('srcset', previousImg);
        lgEngageImg.setAttribute('data-index', current - 1);
    } 
    else {
        let lgImgContainer = document.getElementsByClassName('lg-image-container')[0];
        lgImgContainer.remove();
    }
};

function getNextPhoto() {
    let lgEngageImg = document.getElementsByClassName('lg-engagement-image')[0];
    let current = parseInt(lgEngageImg.dataset.index);

    if((current + 1)) {
        let nextImg = getLgImgUrl(response[current + 1]);
        lgEngageImg.setAttribute('srcset', nextImg);
        lgEngageImg.setAttribute('data-index', current + 1);
    }
    else {
        let lgImgContainer = document.getElementsByClassName('lg-image-container')[0];
        lgImgContainer.remove();
    }
};

function viewLgImg(event) {
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

    leftDiv.innerHTML = '&nbsp;';
    rightDiv.innerHTML = '&nbsp;';
    if(index < (response.length - 1)) largePicture.appendChild(rightDiv);
    if(index > 0) largePicture.appendChild(leftDiv);
    largePicture.appendChild(largeImage);
    div.appendChild(largePicture);
    body.appendChild(div);
};

document.addEventListener('click',function(event){

    if (event.target && (event.target.classList == 'lg-image-container' || event.target.classList == 'lg-engagement-image' || event.target.classList == 'lg-engagement__wrapper')) {
        let lgImgContainer = document.getElementsByClassName('lg-image-container')[0];
        lgImgContainer.remove();
    }
    else if (event.target && event.target.classList == 'lg-image__right-arrow') {
        getNextPhoto();
    }
    else if (event.target && event.target.classList == 'lg-image__left-arrow') {
        getPerviousPhoto();
    } 
    else if (event.target && event.target.classList == 'engagement-image') {
        viewLgImg(event);
    }

 });

// Mobile Touch event
document.addEventListener('touchstart', function (event) {
    if (event.target && event.target.classList == 'lg-image__right-arrow') {
        getNextPhoto();
    }
    else if (event.target && event.target.classList == 'lg-image__left-arrow') {
        getPerviousPhoto();
    }  
});        

(function getEngagementPhotos(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/get-engagement-photos-thumbnail');
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                    response = JSON.parse(xhr.responseText);
                    let photoDiv = document.getElementById('photo-area');

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

//Scroll back to top.
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("to-top").style.display = "block";
  } else {
    document.getElementById("to-top").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}