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
      if (!$(this).hasClass("active")) {
        $(this).addClass('active');
        animateCounters(this);
      }
    }
  });
  if ($('.blockchainsquare').isInViewport()) {
    $('.blockchainsquare').addClass('active');
  }
  if ($('.square').isInViewport()) {
    $('.square').addClass('active');
  }
};

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
});

$('#playbtn').click(function() {
  $('.hero-video').toggleClass('active');
  $('.close-hero-video').toggleClass('active');
  var videosrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0&autoplay=1";
  $(".hero-video").attr("src",videosrc);
});

$('.close-hero-video').click(function() {
  $(this).toggleClass('active');
  $('.hero-video').toggleClass('active');
  $(".hero-video").attr("src",'');
});

$('#playbtn-blockchain').click(function() {
  $('.blockchain-video').toggleClass('active');
  $('.close-blockchain-video').toggleClass('active');
  var videosrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?modestbranding=1&rel=0&autoplay=1";
  $(".blockchain-video").attr("src",videosrc);
});

$('.close-blockchain-video').click(function() {
  $(this).toggleClass('active');
  $('.blockchain-video').toggleClass('active');
  $(".blockchain-video").attr("src",'');
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

  $('.carroussel-inner, .carroussel-navigation').css('width', (container * slides) + 'px');
  innerElement.css('left', '-' + container * slide + 'px');

  if ($(window).width() * 0.33 > 400) {
    navigationUl.css('left', '-' + 400 * slide + 'px');
  } else {
    navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
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
      slide ++;

      slideElement.removeClass('active');
      $('.slide[data-slide="' + slide + '"]').addClass('active');

      innerElement.css('left', '-' + width * slide + 'px');
      innerElement.data('slide', slide);

      if ($(window).width() * 0.33 > 400) {
        navigationUl.css('left', '-' + 400 * slide + 'px');
      } else {
        navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
      }

      navigationUl.find('li').removeClass('active');
      navigationUl.find('li[data-slide="' + slide + '"]').addClass('active');
    }
  } else if (direction === 'left') {
    if (innerElement.data('slide') > 0) {
      slide --;

      slideElement.removeClass('active');
      $('.slide[data-slide="' + slide + '"]').addClass('active');

      innerElement.css('left', '-' + width * slide + 'px');
      innerElement.data('slide', slide);

      if ($(window).width() * 0.33 > 400) {
        navigationUl.css('left', '-' + 400 * slide + 'px');
      } else {
        navigationUl.css('left', '-' + ($(window).width() * 0.33) * slide + 'px');
      }

      navigationUl.find('li').removeClass('active');
      navigationUl.find('li[data-slide="' + slide + '"]').addClass('active');
    }
  } else {
    slide = direction;

    slideElement.removeClass('active');
    $('.slide[data-slide="' + slide + '"]').addClass('active');

    innerElement.css('left', '-' + width * slide + 'px');
    innerElement.data('slide', slide);

    if ($(window).width() * 0.33 > 400) {
      navigationUl.css('left', '-' + 400 * slide + 'px');
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
  if ($(window).width() < 1440) {
    var containerWidth = ($(window).width() + 10);
  } else {
    var containerWidth = 1440;
  }
  var countSlides = slideElement.length;
  var slideWidth = slideElement.width();

  if ((countSlides * slideWidth) > containerWidth) {
    $('.team-right').css('display', 'block');
    $('.team-left').css('display', 'block');
  }

  $('.team-right').click(function() {
    var currentPos = parseInt($(innerElement).css('left'), 10);
    $(innerElement).css('left', (currentPos - containerWidth) + 'px');
    console.log(containerWidth);
  });

  $('.team-left').click(function() {
    var currentPos = parseInt($(innerElement).css('left'), 10);
    if (currentPos < 0 ) {
      $(innerElement).css('left', (currentPos + containerWidth) + 'px');
    }
  });
}
