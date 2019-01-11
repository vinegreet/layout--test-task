
jQuery(document).ready(function($){

  // ------------ Header toggles ------------

  $('.header-hamburgerBtn').click(function() {
    $(this).find('.header-hamburgerSlider').toggleClass('header-hamburgerSlider--active');
    $('.header-menuDropdown').toggleClass('header-menuDropdown--open');
  });
  
  $('.header-langToggle').click(function() {
    $(this).toggleClass('header-langToggle--right');
  });

  // ------------ Header on scroll ------------

  const $header = $('.header');
  let ticking;

  $(window).on('scroll', function() {
    if (!ticking) {
      const scroll = $(this).scrollTop();
      requestAnimationFrame(function() {
        if (scroll) {
          $header.addClass('header--shadow');
        } else {
          $header.removeClass('header--shadow');
        }
        ticking = false;
      });
    }
    ticking = true;
  });

  // ------------ Jumbotron play button  ------------

  $('.jumbo-playBtn').click(function() {
    $(this).toggleClass('jumbo-playBtn--paused');
  });

  // ------------ Dropdown ------------

  const $dropdown = $('.contact-dropdown');
  const $multiselect =  $('.contact-multiselect');
  const multiselectHeight = $multiselect[0].offsetHeight;
  const isMobile = $(window).width() < 768;
  let isDropdownSqueezed;

  $('.contact-dropdownHeader').click(function(e) {
    e.preventDefault();
    $dropdown.toggleClass('contact-dropdown--squeezed');
    if (!isMobile) {
      $dropdown.css('margin-bottom', (isDropdownSqueezed? 0 : multiselectHeight + 1));
    }
    $multiselect.css('margin-top', (isDropdownSqueezed? 0 : -multiselectHeight - 1));
    isDropdownSqueezed = !isDropdownSqueezed;
  });

  // ------------ Miltiselect in Contact ------------

  $('.contact-select').click(function() {
    const $this = $(this);
    $this.find('.contact-selectInput')[0].checked = !$this.find('.contact-selectInput')[0].checked;
    $this.toggleClass('contact-select--checked');
    $this.next('.contact-selectDefinition').toggleClass('contact-selectDefinition--checked');
  });
  
  $('.contact-selectDefinition').click(function() {
    const $this = $(this);
    const $select = $this.prev('.contact-select');
    $select.find('.contact-selectInput')[0].checked = !$select.find('.contact-selectInput')[0].checked;
    $select.toggleClass('contact-select--checked');
    $this.toggleClass('contact-selectDefinition--checked');
  });

});