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

var deadline = new Date(2018, 11, 24, 10, 33, 30, 0);
initializeClock('clockdiv', deadline);

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

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
  }

  var square = $('.square');
  if (square.isInViewport()) {
    square.addClass('active');
  }

  var dataSlider = $('.data-slider');
  if (dataSlider.isInViewport()) {
    dataSlider.addClass('active');
  }

  var membercontainer = $('.membercontainer');
  if (membercontainer.isInViewport()) {
    membercontainer.addClass('active');
  }
};

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

  checkpos("redblock");
});

function animateCounters(el) {
  $(el).prop('Counter', 0).animate({
    Counter: $(el).text()
  }, {
    duration: 2000,
    easing: 'swing',
    step: function (now) {
      $(el).text(Math.ceil(now));
    }
  })
}

$(document).ready(function() {
  checkViewPort();
  $(window).on("scroll resize",function(e){
    checkViewPort();
  });

  setCarroussel();
  setTeamCarousel();

  $(window).resize(function() {
    setCarroussel();
    setTeamCarousel();
  });

  $('.buttons .right').click(function(){
    slideCarroussel('right');
  });

  $('.buttons .left').click(function(){
    slideCarroussel('left');
  });

  $('.carroussel-navigation ul li img, .carroussel-navigation ul li .dot').click(function(){
    slideCarroussel($(this).parent().data('slide'));
  });

  $('.flipper').hover(
    function(){ $(this).toggleClass('flip') }
  );

  window.setInterval(function(){
    flipCoins();
  }, Math.floor((Math.random() * 5000) + 2000));

  $('.data-slider li').each(function(){
    var data = $(this).data('percent');
  });

  $('.menu a').on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== '') {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      var number = $(hash).offset().top - 50;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: number
      }, 800);
    }
  });
});

$('#playbtn').click(function() {
  var homeVideo = $('.home-video');
  var heroVideo = $('.hero-video');

  homeVideo.toggleClass('active');
  heroVideo.toggleClass('active');
  $('.close-hero-video').toggleClass('active');

  var videosrc = "https://www.youtube.com/embed/QVcp4DW9v7U?modestbranding=1&rel=0&autoplay=1";
  heroVideo.attr("src",videosrc);
});

$('.close-hero-video').click(function() {
  var homeVideo = $('.home-video');
  var heroVideo = $('.hero-video');

  homeVideo.toggleClass('active');
  $(this).toggleClass('active');
  heroVideo.toggleClass('active');
  heroVideo.attr("src",'');
});

$('#playbtn-blockchain').click(function() {
  var blockchainVideo = $('.blockchain-video');

  blockchainVideo.toggleClass('active');
  $('.close-blockchain-video').toggleClass('active');
  var videosrc = "https://www.youtube.com/embed/QVcp4DW9v7U?modestbranding=1&rel=0&autoplay=1";
  blockchainVideo.attr("src",videosrc);
});

$('.close-blockchain-video').click(function() {
  var blockchainVideo = $('.blockchain-video');

  $(this).toggleClass('active');
  blockchainVideo.toggleClass('active');
  blockchainVideo.attr("src",'');
});

$('.hamburger').click(function() {
  $(this).toggleClass('active');
  $('.mobile-nav').toggleClass('active');
});

function flipCoins() {
  var time = 0;
  $('.flipper').each(function() {
    var self = this;
    setTimeout(function() {
      $(self).toggleClass('flip');
    }, time);
    time += 500;
  });
}

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

var swirlCounter = 0;
function animateSwirl() {
  if (swirlCounter === 0) {
    swirlCounter++;

    TweenLite.to("#swirl1", 1, {morphSVG: "M0.2,68.8C30.7,47.1,58,25.1,79.4,25c31.9-0.1,44.2,23.9,92.5,24.6c31.5,0.4,41.1-20.8,89-22" +
      "c42.5-1,31.5,13,86,19.3c42.9,5,37.9-19.8,81.5-21.9c32.1-1.6,39.3,38,83.5,37.1c46-0.9,69.3-41,109-41c37.1,0,41.1,19,77.6,18.9" +
      "c39.8-0.1,42.7-22.8,82.9-23.4c32.2-0.4,65.5,38.1,104,40c27.9,1.4,28-25.5,78.4-37.6l0.2,49.8H0.2z", ease: Circ.easeInOut});
    TweenLite.to("#swirl2", 1, {morphSVG: "M0.2,68.8C36,36.1,61.7,17.5,78.9,17.6c35.5,0.2,50.9,29.2,94.5,29.3" +
      "c32.9,0.1,46.3-13.7,85-13.8c37.2,0,52.8,24.6,82.9,24.2c40-0.5,50-42.6,83.1-42.7c29.8-0.2,43.3,36.6,83,36.9" +
      "c30.9,0.2,41.3-22.9,86.5-23.9c36.6-0.8,51.4,17.3,81.2,16.3c50.5-1.8,53.6-36.9,91.4-37.4C794.7,6.1,808,30,843.2,29.8" +
      "c13.6-0.1,24-2.2,62.5-12.9c24.1-6.7,43.5-2.4,58-6.8l0.2,58.7H0.2z", ease: Circ.easeInOut});
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

var rellax = new Rellax('.rellax');

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

  teamRight.click(function() {
    var currentPos = parseInt($(innerElement).css('left'), 10);
    if  ((Math.abs(currentPos) + (parseInt(containerWidth))) < totalSlideWidth ) {
      $(innerElement).css('left', (currentPos - containerWidth) + 'px');
    }
  });

  teamLeft.click(function() {
    var currentPos = parseInt($(innerElement).css('left'), 10);
    if (currentPos < 0 ) {
      $(innerElement).css('left', (currentPos + containerWidth) + 'px');
    }
  });
}

(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var y="1.6.12",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe",preventDefaultEvents:true};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(F&&typeof H==="object"){F.option.apply(this,arguments)}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a4,au){var au=f.extend({},au);var az=(a||d||!au.fallbackToMouseEvents),K=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ax=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ac=0,a1=0,aZ=0,H=1,ap=0,aJ=0,N=null;var aR=f(a4);var aa="start";var X=0;var aQ={};var U=0,a2=0,a5=0,ay=0,O=0;var aW=null,af=null;try{aR.bind(K,aN);aR.bind(aD,a9)}catch(aj){f.error("events not supported "+K+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(K,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(C,null);aR=null};this.option=function(bc,bb){if(typeof bc==="object"){au=f.extend(au,bc)}else{if(au[bc]!==undefined){if(bb===undefined){return au[bc]}else{au[bc]=bb}}else{if(!bc){return au}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}}}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(au.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bf=be.touches,bb=bf?bf[0]:be;aa=g;if(bf){X=bf.length}else{if(au.preventDefaultEvents!==false){bd.preventDefault()}}ag=0;aP=null;aJ=null;ac=0;a1=0;aZ=0;H=1;ap=0;N=ab();S();ai(0,bb);if(!bf||(X===au.fingers||au.fingers===i)||aX()){U=ar();if(X==2){ai(1,bf[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}if(au.swipeStatus||au.pinchStatus){bc=P(be,aa)}}else{bc=false}if(bc===false){aa=q;P(be,aa);return bc}else{if(au.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(au.hold){bc=au.hold.call(aR,be,be.target)}},this),au.longTapThreshold)}an(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(aa===h||aa===q||al()){return}var bd,bi=bh.touches,bc=bi?bi[0]:bh;var bf=aH(bc);a2=ar();if(bi){X=bi.length}if(au.hold){clearTimeout(af)}aa=k;if(X==2){if(a1==0){ai(1,bi[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}else{aH(bi[1]);aZ=at(aQ[0].end,aQ[1].end);aJ=aq(aQ[0].end,aQ[1].end)}H=a7(a1,aZ);ap=Math.abs(a1-aZ)}if((X===au.fingers||au.fingers===i)||!bi||aX()){aP=aL(bf.start,bf.end);ak(be,aP);ag=aS(bf.start,bf.end);ac=aM();aI(aP,ag);if(au.swipeStatus||au.pinchStatus){bd=P(bh,aa)}if(!au.triggerOnTouchEnd||au.triggerOnTouchLeave){var bb=true;if(au.triggerOnTouchLeave){var bg=aY(this);bb=F(bf.end,bg)}if(!au.triggerOnTouchEnd&&bb){aa=aC(k)}else{if(au.triggerOnTouchLeave&&!bb){aa=aC(h)}}if(aa==q||aa==h){P(bh,aa)}}}else{aa=q;P(bh,aa)}if(bd===false){aa=q;P(bh,aa)}}function M(bb){var bc=bb.originalEvent?bb.originalEvent:bb,bd=bc.touches;if(bd){if(bd.length&&!al()){G();return true}else{if(bd.length&&al()){return true}}}if(al()){X=ay}a2=ar();ac=aM();if(ba()||!am()){aa=q;P(bc,aa)}else{if(au.triggerOnTouchEnd||(au.triggerOnTouchEnd==false&&aa===k)){if(au.preventDefaultEvents!==false){bb.preventDefault()}aa=h;P(bc,aa)}else{if(!au.triggerOnTouchEnd&&a6()){aa=h;aF(bc,aa,B)}else{if(aa===k){aa=q;P(bc,aa)}}}}an(false);return null}function a9(){X=0;a2=0;U=0;a1=0;aZ=0;H=1;S();an(false)}function L(bb){var bc=bb.originalEvent?bb.originalEvent:bb;if(au.triggerOnTouchLeave){aa=aC(h);P(bc,aa)}}function aK(){aR.unbind(K,aN);aR.unbind(aD,a9);aR.unbind(ax,a3);aR.unbind(V,M);if(T){aR.unbind(T,L)}an(false)}function aC(bf){var be=bf;var bd=aA();var bc=am();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!au.triggerOnTouchEnd||au.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&au.triggerOnTouchLeave){be=q}}}return be}function P(bd,bb){var bc,be=bd.touches;if((J()&&W())||(Q()&&aX())){if(J()&&W()){bc=aF(bd,bb,l)}if((Q()&&aX())&&bc!==false){bc=aF(bd,bb,t)}}else{if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ao()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,B)}}}}if(bb===q){if(W()){bc=aF(bd,bb,l)}if(aX()){bc=aF(bd,bb,t)}a9(bd)}if(bb===h){if(be){if(!be.length){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ac||0,X,aQ]);if(au.swipeStatus){bc=au.swipeStatus.call(aR,be,bb,aP||null,ag||0,ac||0,X,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ac,X,aQ]);if(au.swipe){bc=au.swipe.call(aR,be,aP,ag,ac,X,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ac,X,aQ]);if(au.swipeLeft){bc=au.swipeLeft.call(aR,be,aP,ag,ac,X,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ac,X,aQ]);if(au.swipeRight){bc=au.swipeRight.call(aR,be,aP,ag,ac,X,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ac,X,aQ]);if(au.swipeUp){bc=au.swipeUp.call(aR,be,aP,ag,ac,X,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ac,X,aQ]);if(au.swipeDown){bc=au.swipeDown.call(aR,be,aP,ag,ac,X,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchStatus){bc=au.pinchStatus.call(aR,be,bb,aJ||null,ap||0,ac||0,X,H,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchIn){bc=au.pinchIn.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break;case A:aR.trigger("pinchOut",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchOut){bc=au.pinchOut.call(aR,be,aJ||null,ap||0,ac||0,X,H,aQ)}break}}}if(bd==B){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Z()&&!I()){O=ar();aW=setTimeout(f.proxy(function(){O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}},this),au.doubleTapThreshold)}else{O=null;aR.trigger("tap",[be.target]);if(au.tap){bc=au.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("doubletap",[be.target]);if(au.doubleTap){bc=au.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);O=null;aR.trigger("longtap",[be.target]);if(au.longTap){bc=au.longTap.call(aR,be,be.target)}}}}}return bc}function am(){var bb=true;if(au.threshold!==null){bb=ag>=au.threshold}return bb}function ba(){var bb=false;if(au.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=au.cancelThreshold}return bb}function ae(){if(au.pinchThreshold!==null){return ap>=au.pinchThreshold}return true}function aA(){var bb;if(au.maxTimeThreshold){if(ac>=au.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function ak(bb,bc){if(au.preventDefaultEvents===false){return}if(au.allowPageScroll===m){bb.preventDefault()}else{var bd=au.allowPageScroll===s;switch(bc){case p:if((au.swipeLeft&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case o:if((au.swipeRight&&bd)||(!bd&&au.allowPageScroll!=E)){bb.preventDefault()}break;case e:if((au.swipeUp&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((au.swipeDown&&bd)||(!bd&&au.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=Y();var bd=ae();return bc&&bb&&bd}function aX(){return !!(au.pinchStatus||au.pinchIn||au.pinchOut)}function Q(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=am();var bd=aO();var bb=Y();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function W(){return !!(au.swipe||au.swipeStatus||au.swipeLeft||au.swipeRight||au.swipeUp||au.swipeDown)}function J(){return !!(aV()&&W())}function aO(){return((X===au.fingers||au.fingers===i)||!a)}function Y(){return aQ[0].end.x!==0}function a6(){return !!(au.tap)}function Z(){return !!(au.doubleTap)}function aU(){return !!(au.longTap)}function R(){if(O==null){return false}var bb=ar();return(Z()&&((bb-O)<=au.doubleTapThreshold))}function I(){return R()}function aw(){return((X===1||!a)&&(isNaN(ag)||ag<au.threshold))}function a0(){return((ac>au.longTapThreshold)&&(ag<r))}function ah(){return !!(aw()&&a6())}function aG(){return !!(R()&&Z())}function ao(){return !!(a0()&&aU())}function G(){a5=ar();ay=event.touches.length+1}function S(){a5=0;ay=0}function al(){var bb=false;if(a5){var bc=ar()-a5;if(bc<=au.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(C+"_intouch")===true)}function an(bb){if(bb===true){aR.bind(ax,a3);aR.bind(V,M);if(T){aR.bind(T,L)}}else{aR.unbind(ax,a3,false);aR.unbind(V,M,false);if(T){aR.unbind(T,L,false)}}aR.data(C+"_intouch",bb===true)}function ai(bd,bb){var bc={start:{x:0,y:0},end:{x:0,y:0}};bc.start.x=bc.end.x=bb.pageX||bb.clientX;bc.start.y=bc.end.y=bb.pageY||bb.clientY;aQ[bd]=bc;return bc}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ad(bd);if(bc===null){bc=ai(bd,bb)}bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ad(bb){return aQ[bb]||null}function aI(bb,bc){bc=Math.max(bc,aT(bb));N[bb].distance=bc}function aT(bb){if(N[bb]){return N[bb].distance}return undefined}function ab(){var bb={};bb[p]=av(p);bb[o]=av(o);bb[e]=av(e);bb[x]=av(x);return bb}function av(bb){return{direction:bb,distance:0}}function aM(){return a2-U}function at(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function aq(){if(H<1){return A}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function ar(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function F(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));

$(function() {
  $(".team-carousel-inner").swipe( {
    swipe:function(event, direction) {
      if (direction === "left") {
        $( ".team-right" ).trigger( "click" );
      } else if (direction === "right") {
        $( ".team-left" ).trigger( "click" );
      }
    }, threshold: 0
  });

  $('.carroussel-inner').swipe( {
    swipe:function(event, direction) {
      if (direction === 'left') {
        $('.buttons .right').trigger('click');
      } else if (direction === 'right') {
        $('.buttons .left').trigger('click');
      }
    }, threshold: 0
  });
});


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