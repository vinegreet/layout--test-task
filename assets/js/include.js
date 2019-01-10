
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

  $('.contact-select').click(function(e) {
    $(this).toggleClass('contact-select--checked');
    $(this).next('.contact-selectDefinition').toggleClass('contact-selectDefinition--checked');
  });
  
  $('.contact-selectDefinition').click(function(e) {
    $(this).toggleClass('contact-selectDefinition--checked');
    $(this).prev('.contact-select').toggleClass('contact-select--checked');
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