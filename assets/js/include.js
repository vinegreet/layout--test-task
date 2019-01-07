
jQuery(document).ready(function($){

  $('.header-hamburgerBtn').click(function() {
    $(this).find('.header-hamburgerSlider').toggleClass('header-hamburgerSlider--active');
    $('.header-menuDropdown').toggleClass('header-menuDropdown--open');
  });
  
  $('.header-langToggle').click(function() {
    $(this).toggleClass('header-langToggle--right');
  });

  $('.jumbo-playBtn').click(function() {
    $(this).remove();
  });

  let ticking;

  $(window).on('scroll', function(e) {
    if (!ticking) {
      const scroll = $(this).scrollTop();
      requestAnimationFrame(function() {
        if (scroll) {
          $('.header').addClass('header--shadow');
        } else {
          $('.header').removeClass('header--shadow');
        }
        ticking = false;
      });
    }
    ticking = true;
  });

});