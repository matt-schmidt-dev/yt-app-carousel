//YouTube-App-Pod-Page
jQuery(document).ready(function () {

    var key = 'AIzaSyCipJMqEaZvCAQycCJHb8Y5tti3h8Z56PQ';
    var playlistId = 'PLD6HNsanBrgYIzXbwpzqLc0mFjlS6AMur';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 10,
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
							</li>
						`);

            $(document).ready(function() {

                  var track = document.querySelector('.youtube-pod-page-main');
                  var slides = Array.from(track.children);
                  var nextButton = document.querySelector('.carousel__button--right');
                  var prevButton = document.querySelector('.carousel__button--left');
                  var dotsNav = document.querySelector('.carousel__nav');
                  var dots = Array.from(dotsNav.children);


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
                    var currentTrackPositionLeft = document.querySelector('.youtube-pod-page-main').getBoundingClientRect().left;
                    var currentTrackPositionRight = document.querySelector('.youtube-pod-page-main').getBoundingClientRect().right;
                    var currentTrackContainerWidth = document.querySelector('.youtube-pod-page-main').getBoundingClientRect().width;
                    var currentCarouselLeft = document.querySelector('.carousel').getBoundingClientRect().left;

                    if (currentTrackPositionRight < currentTrackContainerWidth + 5 || currentTrackPositionRight == currentTrackContainerWidth + 5) {
                    track.style.right = currentTrackPositionLeft + 'px)';
                  }else {
                    track.style.transform = 'translateX(calc(' + (currentTrackPositionLeft - currentCarouselLeft) + 'px - 355px))';
                  }
                    });

                  //Click Prev Equals Move to Right
                  prevButton.addEventListener('click', e => {
                    var currentTrackPositionLeft = document.querySelector('.youtube-pod-page-main').getBoundingClientRect().left;
                    var currentCarouselLeft = document.querySelector('.carousel').getBoundingClientRect().left;

                    if (currentTrackPositionLeft > 5 || currentTrackPositionLeft == 5) {
                    track.style.left = currentTrackPositionLeft + 'px)';
                  }else {
                    track.style.transform = 'translateX(calc(' + (currentTrackPositionLeft - currentCarouselLeft) + 'px + 335px))';
                  }
                  });


            });


        });

    }

		// CLICK EVENT
    $('.youtube-pod-page-main').on('click', 'li', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});
