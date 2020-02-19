//YouTube-App-Carousel
jQuery(document).ready(function () {

    var key = 'AIzaSyCipJMqEaZvCAQycCJHb8Y5tti3h8Z56PQ';
    var playlistId = 'PLillGF-RfqbbnEGy3ROiLWk7JMCuSyQtX';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 25,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#youtube-pod-page-video').html(`
					<iframe class="youtube-pod-page-video-iframe" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }


    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('.youtube-pod-page-main').append(`
							<li class="item youtube-pod-page-li" data-key="${vid}">
								<img src="${thumb}" alt="" class="thumb">
                <img src="https://image.flaticon.com/icons/svg/733/733590.svg" alt="" class="yt-carousel-play-img">
                <div class="yt-carousel-overlays">
                  <div class="yt-carousel-title">${title}</div>
                <div>
							</li>
						`);

            $(document).ready(function() {

                  var track = document.querySelector('.youtube-pod-page-main');
                  var slides = Array.from(track.children);
                  var nextButton = document.querySelector('.carousel__button--right');
                  var prevButton = document.querySelector('.carousel__button--left');

                  var slideWidth = slides[0].getBoundingClientRect().width;

                  var numberOfSlides = slides.length;


                  //slides[0].style.left = slideWidth * 0 + 'px';
                  //slides[1].style.left = slideWidth * 1 + 'px';
                  //slides[2].style.left = slideWidth * 2 + 'px';


                  var setSlidePosition = (slide, index) => {
                      slide.style.left = (slideWidth * index) + 'px';
                  };
                  slides.forEach(setSlidePosition);

                  track.style.width = (numberOfSlides * slideWidth) + 'px';


                  //Click Next Equals Move to Left
                  nextButton.addEventListener('click', e => {
                    var currentTransform = getComputedStyle(track).getPropertyValue("transform").match(/(-?[0-9\.]+)/g);
                    var trackContainerWidth = document.querySelector('.carousel__track-container').getBoundingClientRect().width;

                      if (currentTransform == null || Number(currentTransform[4]) == 0) {
                          track.style.transform = 'translateX(calc(-300px))';
                      } else if (Number(currentTransform[4]) > (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth))
                      && Number(currentTransform[4]) <= (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) + 300) {
                          track.style.transform = 'translateX(calc(' + ( -1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) + 'px))';
                      } else if (Number(currentTransform[4]) > (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) ) {
                          track.style.transform = 'translateX(calc(' + Number(currentTransform[4]) + 'px - 300px))';
                        /***
                          setTimeout(function(){
                            if (Number(currentTransform[4]) < (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) ) {
                              track.style.transform = 'translateX(calc(' + (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) + 'px))';
                            }; }, 3000);
                        ***/
                      }
                    });


                  //Click Prev Equals Move to Right

                  prevButton.addEventListener('click', e => {
                    var currentTransform = getComputedStyle(track).getPropertyValue("transform").match(/(-?[0-9\.]+)/g);

                    if (currentTransform == null || Number(currentTransform[4]) == 0) {
                    track.style.transform = 'translateX(calc(0px))';
                    } else if (Number(currentTransform[4]) >= -299 && Number(currentTransform[4]) < 0) {
                          track.style.transform = 'translateX(calc(0px))';
                    } else if (Number(currentTransform[4]) <= -1) {
                        track.style.transform = 'translateX(calc(' + Number(currentTransform[4]) + 'px + 300px))';



                        /***setTimeout(function(){
                            if (Number(currentTransform[4]) < (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) ) {
                              track.style.transform = 'translateX(calc(' + (-1 * ((numberOfSlides * slideWidth) - trackContainerWidth)) + 'px))';
                            }; }, 3000);
                        ***/



                      }
                  });


                  //find width of "youtube-pod-page-container"
                  //find translateX
                  //if translatex >= (numberOfSlides * widthOfSlides) - widthOfContainer then nextButton does nothing

            });


        });

    }

		// CLICK EVENT
    $('.youtube-pod-page-main').on('click', 'li', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });

});









//Parallax
$(window).scroll(function() {
  parallax();
});

function parallax() {

  var wScroll = $(window).scrollTop();

  $('.parallax--bg').css('background-position', 'center ' + (wScroll * 0.5) + 'px');
}







//Smooth Scrolling
$(document).ready(function() {

  $('.scroll').click(function(e) {
    e.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });
});








//Scroll Animation for Upper About Section
$(window).scroll(function() {

    var upperMidSectHeight = document.querySelector('.upper-mid-sect').offsetHeight;
    var innerMidSectHeight = document.querySelector('.inner-mid-sect').offsetHeight;
    var bottomSectionHeight = document.querySelector('.bottom-section').offsetHeight;
    var lowerBottomSectionHeight = document.querySelector('.lower-bottom-section').offsetHeight;

    if ( $(window).width() > 1000 ) {

        if ($(document).scrollTop() > upperMidSectHeight/4 ) {
            $('.lang-box').addClass('fade-in-scroll');
        }

        if ($(document).scrollTop() > upperMidSectHeight + (innerMidSectHeight/4)) {
            $('.about-me-head-2').addClass('fade-in-scroll');
            $('.about-me-title-line').addClass('fade-in-scroll-delay-100');
            $('.about-me-head-3').addClass('fade-in-scroll-delay-200');

            $('.about-img-descript').addClass('fade-in-scroll-delay-200');

            $('.ind-tech-skill:nth-child(1)').addClass('fade-in-scroll');
            $('.ind-tech-skill:nth-child(2)').addClass('fade-in-scroll-delay-100');
            $('.ind-tech-skill:nth-child(3)').addClass('fade-in-scroll-delay-200');
            $('.ind-tech-skill:nth-child(4)').addClass('fade-in-scroll-delay-300');
        }

        if ($(document).scrollTop() > upperMidSectHeight + innerMidSectHeight + (bottomSectionHeight/4)) {
            $('.port-head-h2').addClass('fade-in-scroll');
            $('.port-head-title-line').addClass('fade-in-scroll-delay-100');
            $('.port-head-h3').addClass('fade-in-scroll-delay-200');

            $('.port-head-two').addClass('fade-in-scroll-delay-100');

            $('.grid-portfolio').addClass('fade-in-scroll-delay-200');
        }

        if ($(document).scrollTop() > upperMidSectHeight + innerMidSectHeight + bottomSectionHeight + (lowerBottomSectionHeight/4)) {
            $('.aci-h2').addClass('fade-in-scroll');
            $('.aci-title-line').addClass('fade-in-scroll-delay-100');
            $('.aci-h3').addClass('fade-in-scroll-delay-200');

            $('.cfa-h2').addClass('fade-in-scroll');
            $('.cfa-title-line').addClass('fade-in-scroll-delay-100');
            $('.cfa-h3').addClass('fade-in-scroll-delay-200');

            $('.contact-form, .contact-info-ind, .social-media').addClass('fade-in-scroll-delay-200');
        }

    } else {
        $(document).ready(function () {
            $('.lang-box, .about-me-head-2, .about-me-title-line, .about-me-head-3, .about-img-descript, .ind-tech-skill, .port-head-h2, .port-head-title-line, .port-head-h3, .port-head-two, .grid-portfolio, .aci-h2, .aci-title-line, .aci-h3, .cfa-h2, .cfa-title-line, .cfa-h3, .contact-form, .contact-info-ind, .social-media').addClass('no-animation');
        });
    }
});






//Load Header on Page Load
$(document).ready(function() {
    $('.head-sect-info-h1').addClass('fade-in-scroll');
});






//Highlight Page Links
$(document).ready(function() {
  $('.nav-item').click(function() {
    $('.nav-item').removeClass("active");
    $(this).addClass("active");

  });
});







//Grid Links
$(".grid-portfolio-item").click(function() {
  window.location = $(this).find("a").attr("href");
  return false;
});
