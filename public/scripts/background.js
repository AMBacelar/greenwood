var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://static.pexels.com/photos/34676/pexels-photo.jpg)",
        "url(https://static.pexels.com/photos/29346/pexels-photo-29346.jpg)",
        "url(https://static.pexels.com/photos/6182/man-hands-photographer-cameras.jpg)",
        "url(https://static.pexels.com/photos/140945/pexels-photo-140945.jpeg)",
        "url(https://static.pexels.com/photos/159839/office-home-house-desk-159839.jpeg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 10000);