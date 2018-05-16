// Init Rellax
new Rellax('.rellax');

// Calculate the time remaining till endtime/
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

// Initialize clock to count down with the correct date set
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daySpan = clock.querySelector('.day');
  var daysSpan = clock.querySelector('.days');
  var hourSpan = clock.querySelector('.hour');
  var hoursSpan = clock.querySelector('.hours');
  var minuteSpan = clock.querySelector('.minute');
  var minutesSpan = clock.querySelector('.minutes');
  var secondSpan = clock.querySelector('.second');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daySpan.innerHTML = ('0' + t.days).slice(-2, -1);
    daysSpan.innerHTML = ('0' + t.days).slice(-1);
    hourSpan.innerHTML = ('0' + t.hours).slice(-2, -1);
    hoursSpan.innerHTML = ('0' + t.hours).slice(-1);
    minuteSpan.innerHTML = ('0' + t.minutes).slice(-2, -1);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-1);
    secondSpan.innerHTML = ('0' + t.seconds).slice(-2, -1);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-1);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

// Set the deadline date
// var deadline = new Date(2018, 11, 24, 10, 33, 30, 0);
// initializeClock('clockdiv', deadline);
// initializeClock('clockdivMobile', deadline);

// True/false if element is in viewport
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

var roadmapCounter = 0;
// Add active to some of the sections when they reach the viewport to start an animation
function checkViewPort() {
  $('.number-container').each(function () {
    if ($(this).isInViewport()) {
      if (!$(this).hasClass('active')) {
        $(this).addClass('active');
        animateCounters(this);
      }
    }
  });

  var blockchainsquare = $('.blockchainsquare');
  if (blockchainsquare.isInViewport()) {
    blockchainsquare.addClass('active');
    setTimeout(function() {
      blockchainsquare.addClass('darken');
    }, 1000);
  }

  var square = $('.square');
  if (square.isInViewport()) {
    square.addClass('active');
    setTimeout(function() {
      square.addClass('darken');
    }, 1000);
  }

  var dataSlider = $('.data-slider');
  if (dataSlider.isInViewport()) {
    dataSlider.addClass('active');
  }

  var membercontainer = $('.team-carousel-inner');
  if (membercontainer.isInViewport()) {
    $('.membercontainer').addClass('active');
  }

  var teamAdvisors = $('.team-advisors');
  if (teamAdvisors.isInViewport()) {
    teamAdvisors.addClass('active');
  }

  var sellingPointsList = $('.selling-points-list');
  if (sellingPointsList.isInViewport()) {
    sellingPointsList.addClass('active');
  }

  var sellingPointsRight = $('.selling-points-right');
  if (sellingPointsRight.isInViewport()) {
    sellingPointsRight.addClass('active');
    $('.selling-points-left').addClass('active');
  }

  var roadmap = $('.roadmap');
  if (roadmap.isInViewport()) {
    roadmapCounter++;

    if (roadmapCounter === 1) {
      setTimeout(function(){
        animateSwirl();
      }, 1000);
    }
  }
};

// Added scrolling function to social icons over 'redblock'
$(window).scroll(function(){
  var element = $('.social.fixed');
  var fixed_position = element.offset().top;
  var fixed_height = element.height();

  var checkpos = function(id){
    var elementToCross = $('#' + id + '.div-to-cross');
    var toCross_position = elementToCross.offset().top;
    var toCross_height = elementToCross.height();

    var fixedtgt = $(".social.fixed");

    if (fixed_position + fixed_height  < toCross_position) {
      fixedtgt.removeClass('active');
    } else if (fixed_position > toCross_position + toCross_height) {
      fixedtgt.removeClass('active');
    } else {
      fixedtgt.addClass('active');
    }
  };

  checkpos('redblock');
});

// Add animation to the counter function in the header
function animateCounters(el) {
  $(el).prop('Counter', 0).animate({
    Counter: $(el).text()
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      if (now < 10000 && $.isNumeric(now)) {
        $(el).text(
          Math.ceil(now)
        );
      } else if ($.isNumeric(now)) {
        $(el).text(
          Math.ceil(now).toLocaleString('nl')
        );
      }
    }
  })
}

$(document).ready(function() {
  function isIEorEDGE(){
    return navigator.appName == 'Microsoft Internet Explorer' || (navigator.appName == "Netscape" && navigator.appVersion.indexOf('Edge') > -1);
  }

  if (isIEorEDGE()) {
    $('html').addClass('ie');
  }

  // Check viewPort height/width on init and resize/scroll
  checkViewPort();
  $(window).on('scroll resize',function(){
    checkViewPort();
  });

  // Calculate the carrousels on init and change of window size
  setCarroussel();
  //setTeamCarousel();
  $(window).resize(function() {
    setCarroussel();
    //setTeamCarousel();
  });

  // Left and right click for the Roadmap carorusel
  $('.buttons .right').on('click', function() {
    slideCarroussel('right');
  });
  $('.buttons .left').on('click', function() {
    slideCarroussel('left');
  });

  // Set the Roadmap caroussel on item click
  $('.carroussel-navigation ul li img, .carroussel-navigation ul li .dot').click(function(){
    slideCarroussel($(this).parent().data('slide'));
  });

  // Set interval for the flipCoins function
  window.setInterval(function(){
    flipCoins();
  }, Math.floor((Math.random() * 5000) + 2000));

  // Flip the coins exta on hover
  $('.flipper').hover(
    function(){ $(this).toggleClass('flip') }
  );

  // Added animated scrolling to menu items
  $('.menu a, .btn.arrow').on('click touchstart', function(event) {
    if (this.hash !== '') {
      event.preventDefault();

      var hash = this.hash;

      var number = $(hash).offset().top - 50;

      $('html, body').animate({
        scrollTop: number
      }, 800);

      if (hash === '#video') {
        var blockchainVideo = $('.blockchain-video');

        blockchainVideo.toggleClass('active');
        $('.close-blockchain-video').toggleClass('active');
        var videosrc = "https://www.youtube.com/embed/MrPVryavPI4?modestbranding=1&rel=0&autoplay=1";
        blockchainVideo.attr("src",videosrc);
      }
    }
  });

  $('.show-more').on('touchstart click', function() {
    if ($(this).hasClass('active')) {
      $('.membercontainer').fadeOut();

      $('.show-more').removeClass('active').find('p').text('Show all');

      var number = $('#team-scroll').offset().top - 50;

      $('html, body').animate({
        scrollTop: number
      }, 800);
    } else {
      setTimeout(function() {
        $('.membercontainer').fadeIn().css('display', 'inline-block');
        $('.show-more').addClass('active').find('p').text('Show less');
      }, 100);
    }
  });



  $('.description').click(function(){
    $('.description').removeClass('open');
    $(this).addClass('open');
  });

  $('.close-description').click(function(){
    setTimeout(function() {
      $('.description').removeClass('open');
    }, 50);
  });

  function pickRandomHeader() {
    //var arr = ['1', '2', '3', '4'];
    var arr = ['1', '4'];

    var rand = arr[Math.floor(Math.random() * arr.length)];

    $('.img-' + rand).fadeIn();

    $('.hero .square img').attr('src', 'assets/img/mobile_square_img_' + rand + '.jpg');
  }

  pickRandomHeader();
});

$('.mobile-nav a').on('touchstart click', function() {
  $('.hamburger').toggleClass('active');
  $('.mobile-nav').toggleClass('active');
});

// Play and setSrc for hero video
$('#playbtn').on('touchstart click', function() {
  var homeVideo = $('.home-video');
  var heroVideo = $('.hero-video');

  homeVideo.toggleClass('active');
  heroVideo.toggleClass('active');
  $('.close-hero-video').toggleClass('active');

  var videosrc = "https://www.youtube.com/embed/KCkW5S5CFOg?modestbranding=1&rel=0&autoplay=1";
  heroVideo.attr("src",videosrc);
});

// Close hero video in the header
$('.close-hero-video').on('touchstart click', function() {
  var homeVideo = $('.home-video');
  var heroVideo = $('.hero-video');

  homeVideo.toggleClass('active');
  $(this).toggleClass('active');
  heroVideo.toggleClass('active');
  heroVideo.attr("src",'');
});

// Play and setSrc for blockChain video
$('#playbtn-blockchain').on('touchstart click', function() {
  var blockchainVideo = $('.blockchain-video');

  blockchainVideo.toggleClass('active');
  $('.close-blockchain-video').toggleClass('active');
  var videosrc = "https://www.youtube.com/embed/MrPVryavPI4?modestbranding=1&rel=0&autoplay=1";
  blockchainVideo.attr("src",videosrc);
});

// Close blockChain video
$('.close-blockchain-video').on('touchstart click', function() {
  var blockchainVideo = $('.blockchain-video');

  $(this).toggleClass('active');
  blockchainVideo.toggleClass('active');
  blockchainVideo.attr("src",'');
});

// Responsive hamburger menu open/close
$('.hamburger').on('click', function() {
  $(this).toggleClass('active');
  $('.mobile-nav').toggleClass('active');
});

// FlipCoins function for the tokenization
function flipCoins() {
  var time = 0;
  $('.coin-flip').each(function() {
    var self = this;
    setTimeout(function() {
      $(self).toggleClass('flip');
    }, time);
    time += 500;
  });
}

// Calculate the width and amount of the roadmap carrousel
function setCarroussel() {
  var slideElement = $('.slide');
  var innerElement = $('.carroussel-inner');
  var navigationUl = $('.carroussel-navigation ul');

  var slides = slideElement.length;
  var container = slideElement.width();
  var slide = innerElement.data('slide');

  if (container < 300) {
    container = 300;
  }

  $('.carroussel-inner, .carroussel-navigation').css('width', (container * slides) + 'px');
  innerElement.css('left', '-' + container * slide + 'px');

  if ($(window).width() * 0.33 > 400) {
    navigationUl.css('left', '-' + 400 * slide + 'px');
  } else if ($(window).width() * 0.33 < 300) {
    navigationUl.css('left', '-' + 300 * slide + 'px');
  } else {
    navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
  }
}

// Set the SVG for the Roadmap caroussel to the new coordinates
var swirlCounter = 0;
function animateSwirl() {
  if (swirlCounter === 0) {
    swirlCounter++;

    TweenLite.to("#swirl1", 1, {morphSVG: "M0.2,68.8C30.7,47.1,58,25.1,79.4,25c31.9-0.1,44.2,23.9,92.5,24.6c31.5,0.4,41.1-20.8,89-22" +
      "c42.5-1,31.5,13,86,19.3c42.9,5,37.9-19.8,81.5-21.9c32.1-1.6,39.3,38,83.5,37.1c46-0.9,69.3-41,109-41c37.1,0,41.1,19,77.6,18.9" +
      "c39.8-0.1,42.7-22.8,82.9-23.4c32.2-0.4,65.5,38.1,104,40c27.9,1.4,28-25.5,78.4-37.6l0.2,49.8H0.2z", ease: Circ.easeInOut});
    TweenLite.to("#swirl2", 1, {morphSVG: "M0.2,68.8C36,36.1,61.7,17.5,78.9,17.6c35.5,0.2,50.9,29.2,94.5,29.3c32.9,0.1,46.3-13.7,85-13.8c37.2,0,52.8,24.6,82.9,24.2c40-0.5,50-42.6,83.1-42.7c29.8-0.2,43.3,36.6,83,36.9c30.9,0.2,41.3-22.9,86.5-23.9c36.6-0.8,51.4,17.3,85.2,16.3c33.5-1.8,22.6-15.9,65.4-26.4C794.7,6.1,808,30,843.2,29.8c13.6-0.1,24-2.2,62.5-12.9c24.1-6.7,43.5-2.4,58-6.8l0.2,58.7H0.2z", ease: Circ.easeInOut});
    TweenLite.to("#swirl3", 1, {morphSVG: "M0.2,69c32.5-5.6,51.9-13.2,70.6-13.5c37.3-0.7,56.6,9,101.3,8.5c38.2-0.4,54.5-51.1,95.3-44.4" +
      "c43,7,43,43.7,73.9,42c48.6-2.7,54.3-14.5,88.1-14.7c33.2-0.2,36.3,14.3,79,15.2c31.2,0.6,45.8-10.4,88.5-11.1" +
      "c30.6-0.5,26.7,4.7,78.7,6.4c36.3,1.2,61.7,9.2,88.8,7.2c40.1-2.9,41.2-26,77-30.1C863.1,32,899.9,56,963.8,59.6L964,69H0.2z", ease: Circ.easeInOut});
    TweenLite.to("#swirl4", 1, {morphSVG: "M0.2,68.8c35.7-19.8,59-4.5,76.2-5.2c35.5-1.6,53.5-16.7,96-9.1c32.4,5.8,47.8-11.9,86.4-11.9" +
      "c37.2,0,52.4,19.2,82.5,18.9c40-0.3,52.6-32.1,85.6-32.2c29.8-0.1,41.6,36.9,80.4,28.5c31.5-6.8,41.9,7.9,87,7.3" +
      "c36.6-0.5,50.8-11.5,80.6-12.1c50.5-1.1,58.2-35.5,91.4-17.4c28.4,15.5,47.5,42,79.9,8.5c12.7-13.2,31.5-9.4,69.5,0" +
      "c20.5,5.1,33.5-16.2,48-19", ease: Circ.easeInOut});
  } else if (swirlCounter === 1) {
    swirlCounter++;

    TweenLite.to("#swirl1", 1, {morphSVG: "M963.9,68.8l-963.8,0L0.3,19c50.4,12.1,69.4,22.4,97.2,21C136,38,144,9.2,176.2,9.7" +
      "c40.2,0.6,49.6,30.2,89.4,30.3c36.5,0.1,40.6-8.4,77.6-8.3c39.7,0,63,29.5,109,30.4c44.2,0.9,51.4-28.6,83.5-27.1" +
      "c43.6,2.1,58.6,36.9,101.5,31.9c54.5-6.3,57.1-46.4,99.6-45.4c47.9,1.2,57,34,88,33c59-2,107.2-29.6,139.1-29.5L963.9,68.8z", ease: Circ.easeInOut});
    TweenLite.to("#swirl2", 1, {morphSVG: "M0.1,68.8l0.2-30.3c14.5,4.4,33.9,0.1,58,6.8c38.5,10.8,70-10.9,83.5-10.8" +
      "c35.2,0.1,42.4-11.6,70.7-11.2c37.8,0.5,26,18.8,76.5,20.6c29.8,1,59.6,10,96.2,10.8c45.1,1,48.7-17.4,79.6-17.7" +
      "c39.7-0.3,45.2,27.4,74.9,27.6c33.1,0.2,43.1-28.8,83.1-28.3c30.1,0.4,45.8,26.8,82.9,26.8c38.7,0,52.1-16.2,85-16.2" +
      "c43.6-0.1,59,12.2,94.5,10.7c25.6-1.1,46.6-47.9,78.7-39.6l0,50.8H0.1z", ease: Circ.easeInOut});
    TweenLite.to("#swirl3", 1, {morphSVG: "M0.1,69l0.2-9.4C64.2,56,75.5,31.8,97.2,34.3c35.8,4.1,62.4,27.4,102.5,30.3" +
      "c27.1,2,58.2-20.9,94.6-22.1c52-1.7,47.3,12.9,77.9,13.4c42.7,0.7,52.4,6.8,83.6,6.2c42.7-0.9,45.8-15.3,79-15.2" +
      "c33.8,0.2,39.4,11.9,88.1,14.7c30.9,1.7,30.9-5,73.9-12c40.8-6.6,57.1,14,95.3,14.4c44.7,0.5,80.4-10.7,117.8-10" +
      "c18.7,0.3,21.6-16.7,54-11.1l0.1,25.9L0.1,69z", ease: Circ.easeInOut});
    TweenLite.to("#swirl4", 1, {morphSVG: "M0.2,25c14.5,2.8,27.5,24.1,48,19c38-9.4,56.8-13.2,69.5,0c32.4,33.6,51.5,7,79.9-8.5" +
      "c33.2-18.1,40.9,16.3,91.4,17.4c29.8,0.7,44.1,11.6,80.6,12.1c45.1,0.6,55.5-14.1,87-7.3c38.8,8.4,50.7-28.6,80.4-28.5" +
      "c33.1,0.1,45.6,31.9,85.6,32.2c30.1,0.3,45.3-19,82.5-18.9c38.7,0,54,17.7,86.4,11.9c42.5-7.6,60.5,7.5,96,9.1" +
      "c17.2,0.8,40.4-33.2,76.1-13.4", ease: Circ.easeInOut});
  } else if (swirlCounter === 2) {
    swirlCounter++;

    TweenLite.to("#swirl1", 1, {morphSVG: "M964,25l0,43.8l-963.8,0L0,51.6C50.4,63.7,69.8,41.4,97.7,40c38.5-1.9,59.7,15.2,91.9,15.7" +
      "c40.2,0.6,28.6-30,68.3-30.6c40.9-0.6,55.1,31.9,90,32.3c39.7,0.5,12-6.7,58-5.7c44.2,0.9,48.9-1.6,81,0" +
      "C530.5,53.7,553,32.4,596,27.4c54.5-6.3,89.8,23.2,132.3,24.2c47.9,1.2,53.7-21.5,84.7-22.6c0,0,25,2.5,43.3,16.1" +
      "c18.3,13.6,69.7-9.1,69.7-9.1S944.1,27,964,25", ease: Circ.easeInOut});
    TweenLite.to("#swirl2", 1, {morphSVG: "M964,69H0.2l0.2-47.3c14.5,4.4,33.9,17.1,58,23.9c38.5,10.8,70-10.9,83.5-10.8" +
      "c35.2,0.1,42.4,15.9,70.7,16.3c37.8,0.5,26-8.7,76.5-6.9c29.8,1,47.6-19.7,84.2-18.9c45.1,1,45.6,29,76.5,28.8" +
      "c39.7-0.3,60.2,10.6,89.9,10.8c33.1,0.2,43.1-18.2,83.1-17.7c30.1,0.4,45.8-27.6,82.9-27.6c38.7,0,44.2,40.2,77.1,40.1" +
      "c43.6-0.1,33.9-32.9,69.3-34.4c25.6-1.1,23.6,16,55.7,24.3c0,0,23.3,6.1,50-27c0,0,3.5-4.2,6-9.5L964,69z", ease: Circ.easeInOut});
    TweenLite.to("#swirl3", 1, {morphSVG: "M618.7,58c22.5,12.2,33.7-12.2,76.7-19.2c40.8-6.6,58.6,24.8,96.7,25.2" +
      "c44.7,0.5,42.8-9.4,80.1-8.7c18.7,0.3,59.3-26.7,91.7-21.2l0.1,34.7L0.2,69l0.2-9.4C64.3,56,75.6,31.8,97.3,34.3" +
      "c35.8,4.1,62.4,27.4,102.5,30.3c27.1,2,58.2-20.9,94.6-22.1c52-1.7,47.3,12.9,77.9,13.4c42.7,0.7,52.4-11.2,83.6-11.8" +
      "c42.7-0.9,40.5,16.7,73.7,16.9c0,0,25-3.7,44.2-8.8C597.1,45.9,618.7,58,618.7,58z", ease: Circ.easeInOut});
    TweenLite.to("#swirl4", 1, {morphSVG: "M0.3,25c14.5,2.8,27.5,24.1,48,19c38-9.4,56.8-13.2,69.5,0c32.4,33.6,51.5,7,79.9-8.5" +
      "C231,17.5,238.7,51.8,289.2,53c29.8,0.7,44.1,11.6,80.6,12.1c45.1,0.6,55.5-14.1,87-7.3c38.8,8.4,50.7-28.6,80.4-28.5" +
      "c33.1,0.1,45.6,31.9,85.6,32.2c30.1,0.3,45.3-19,82.5-18.9c38.7,0,54,17.7,86.4,11.9c42.5-7.6,60.5,7.5,96,9.1" +
      "c17.2,0.8,40.4-33.2,76.1-13.4", ease: Circ.easeInOut});
  }  else {
    swirlCounter = 0;

    TweenLite.to("#swirl1", 1, {morphSVG: "M0,68.8c30.4-21.7,57.5-27.5,78.8-27.5c31.9-0.1,45.2,12.5,93.5,13.2" +
      "c31.5,0.4,37.7-4.8,85.7-5.9c42.5-1,48.9,2.8,82,1.2c43.2-2,42-9,85.7-11.2c32.1-1.6,36.7,2,80.9,1.1c46-0.9,49.7-5,89.3-5" +
      "c37.1,0,39.1,3.5,75.7,3.4c39.8-0.1,46-4.4,86.2-4.9c32.2-0.4,44,2,82.5,4c27.9,1.4,68.9,2.5,123.4,0.6v31H0z", ease: Circ.easeInOut});
    TweenLite.to("#swirl2", 1, {morphSVG: "M0.2,68.8C36,36.1,61.9,29.5,79.1,29.6c35.5,0.2,51,29.4,94.6,29.4" +
      "c32.9,0.1,46.5-16.5,85.1-16.5c37.2,0,52.4,15.2,82.5,14.8c40-0.5,50-27.9,83-28.1c29.8-0.2,43.3,22,83,22.3" +
      "c30.9,0.2,41.6-13,86.7-13.9c36.6-0.8,51.1,7.4,80.9,6.4c50.5-1.8,53.6-26.9,91.4-27.4c28.3-0.4,41.5,13.5,76.7,13.3" +
      "c13.6-0.1,24-2.2,62.5-12.9C929.8,10.2,949.4,4.4,964,0v68.8H0.2z", ease: Circ.easeInOut});
    TweenLite.to("#swirl3", 1, {morphSVG: "M0.2,69c32.5-5.6,60.2-7,78.8-7.4c37.3-0.7,48.3,2.8,93,2.3c38.2-0.4,38.6-3.1,79.9-3.8" +
      "c50.9-0.8,58.4,3.1,89.3,1.3c48.6-2.7,50.8-13.6,84.6-13.8c33.2-0.2,40.8,10.3,83.6,11.1c31.2,0.6,37.2-4.7,79.9-5.4" +
      "c30.6-0.5,34.2,2.2,86.2,3.9c36.3,1.2,62.2,2.1,89.3,0.1c40.1-2.9,41-8.9,76.7-13c21.7-2.5,58.5-4.6,122.3-1V69H0.2z", ease: Circ.easeInOut});
    TweenLite.to("#swirl4", 1, {morphSVG: "M0.2,68.8C35.9,49,61.9,44.6,79.1,43.9c35.5-1.6,51,18.7,94.6,18.7c32.9,0,46.5-10.5,85.1-10.5" +
      "c37.2,0,52.4,9.7,82.5,9.4c40-0.3,50-17.8,83-17.9c29.8-0.1,43.3,14,83,14.2c30.9,0.1,41.6-8.3,86.7-8.9c36.6-0.5,51.1,4.7,80.9,4" +
      "c50.5-1.1,53.6-17.1,91.4-17.4c28.3-0.2,41.5,8.6,76.7,8.5c13.6,0,24-1.4,62.5-8.2c24.1-4.3,43.7-8,58.2-10.8", ease: Circ.easeInOut});
  }
}

// Function to slide the caroussel
function slideCarroussel(direction) {
  var slideElement = $('.slide');
  var innerElement = $('.carroussel-inner');
  var navigationUl = $('.carroussel-navigation ul');

  var width = slideElement.width();
  var slide = innerElement.data('slide');

  if (direction === 'right') {
    if ((slideElement.length - 1) > innerElement.data('slide')) {
      animateSwirl();
      slide ++;

      slideElement.removeClass('active');
      $('.slide[data-slide="' + slide + '"]').addClass('active');

      innerElement.css('left', '-' + width * slide + 'px');
      innerElement.data('slide', slide);

      if ($(window).width() * 0.33 > 400) {
        navigationUl.css('left', '-' + 400 * slide + 'px');
      } else if ($(window).width() * 0.33 < 300) {
        navigationUl.css('left', '-' + 300 * slide + 'px');
      } else {
        navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
      }

      navigationUl.find('li').removeClass('active');
      navigationUl.find('li[data-slide="' + slide + '"]').addClass('active');
    }
  } else if (direction === 'left') {
    if (innerElement.data('slide') > 0) {
      animateSwirl();
      slide --;

      slideElement.removeClass('active');
      $('.slide[data-slide="' + slide + '"]').addClass('active');

      innerElement.css('left', '-' + width * slide + 'px');
      innerElement.data('slide', slide);

      if ($(window).width() * 0.33 > 400) {
        navigationUl.css('left', '-' + 400 * slide + 'px');
      } else if ($(window).width() * 0.33 < 300) {
        navigationUl.css('left', '-' + 300 * slide + 'px');
      } else {
        navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
      }

      navigationUl.find('li').removeClass('active');
      navigationUl.find('li[data-slide="' + slide + '"]').addClass('active');
    }
  } else {
    animateSwirl();
    slide = direction;

    slideElement.removeClass('active');
    $('.slide[data-slide="' + slide + '"]').addClass('active');

    innerElement.css('left', '-' + width * slide + 'px');
    innerElement.data('slide', slide);

    if ($(window).width() * 0.33 > 400) {
      navigationUl.css('left', '-' + 400 * slide + 'px');
    } else if ($(window).width() * 0.33 < 300) {
      navigationUl.css('left', '-' + 300 * slide + 'px');
    } else {
      navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
    }

    navigationUl.find('li').removeClass('active');
    navigationUl.find('li[data-slide="' + slide + '"]').addClass('active');
  }
}

// Calculate width and amount of the team caroussel
function setTeamCarousel() {
  var slideElement = $('.membercontainer');
  var innerElement = $('.team-carousel-inner');
  var teamRight = $('.team-right');
  var teamLeft = $('.team-left');
  var containerWidth;

  if ($(window).width() < 1440) {
    containerWidth = (($(window).width() - 60));
  } else {
    containerWidth = 1440;
  }
  var countSlides = slideElement.length;
  var slideWidth = slideElement.width();

  var totalSlideWidth = parseInt(countSlides * slideWidth);

  if (totalSlideWidth > containerWidth) {
    teamRight.css('display', 'block');
    teamLeft.css('display', 'block');
  }

  teamRight.on('touchstart click', function() {
    var currentPos = parseInt($(innerElement).css('left'), 10);
    if  ((Math.abs(currentPos) + (parseInt(containerWidth))) < totalSlideWidth ) {
      $(innerElement).css('left', (currentPos - containerWidth) + 'px');
    }
  });

  teamLeft.on('touchstart click', function() {
    var currentPos = parseInt($(innerElement).css('left'), 10);
    if (currentPos < 0 ) {
      $(innerElement).css('left', (currentPos + containerWidth) + 'px');
    }
  });
}

// Functions for mobile swiping both the caroussels
$(function() {
  // $('.team-carousel-inner').swipe( {
  //   swipe:function(event, direction) {
  //     if (direction === 'left') {
  //       $('.team-right').trigger('click');
  //     } else if (direction === 'right') {
  //       $('.team-left').trigger('click');
  //     } else if (direction === 'down') {
  //       $('html, body').animate({
  //         scrollTop: '-=300'
  //       }, 300);
  //     } else if (direction === 'up') {
  //       $('html, body').animate({
  //         scrollTop: '+=300'
  //       }, 300);
  //     }
  //   }, threshold: 10
  // });

  $('.carroussel-inner').swipe( {
    swipe:function(event, direction) {
      if (direction === 'left') {
        $('.buttons .right').trigger('click');
      } else if (direction === 'right') {
        $('.buttons .left').trigger('click');
      } else if (direction === 'down') {
        $('html, body').animate({
          scrollTop: '-=300'
        }, 300);
      } else if (direction === 'up') {
        $('html, body').animate({
          scrollTop: '+=300'
        }, 300);
      }
    }, threshold: 10
  });
});


// Mailchimp mail subscribing callback
$('form.mailSubscribe').on('submit', function() {
  var timeOut = Math.random() * 3;

  $('.loading').toggleClass('active');

  setTimeout(function(){
    $('.loading').removeClass('active');
    $( ".form-msg" )
      .html( "Thanks for subscribing! Please check your inbox to complete the subscription." );
  }, timeOut * 1000);

  setTimeout(function(){
    $('.loading').removeClass('active');
    $( ".form-msg" )
      .html('');
  }, timeOut * 3500);
});


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-43515294-2');
