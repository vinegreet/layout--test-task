
jQuery(document).ready(function($){
  const isMobile = $(window).width() < 768;

  // ------------ Header toggles ------------

  $('.header-hamburgerBtn').click(function() {
    $(this).find('.header-hamburgerSlider').toggleClass('header-hamburgerSlider--active');
    $('.header-menuDropdown').toggleClass('header-menuDropdown--open');
  });
  
  $('.header-langToggle').click(function() {
    $(this).toggleClass('header-langToggle--right');
  });

  // ------------ Header on scroll ------------

  const $window = $(window);
  const $header = $('.header');
  let scrollTop = $window.scrollTop();
  let ticking, hasClass;

  if (scrollTop) {
    $header.addClass('header--shadow');
    hasClass = true;
  }

  $window.on('scroll', function() {
    if (!ticking) {
      scrollTop = $window.scrollTop();
      requestAnimationFrame(function() {
        if (scrollTop && !hasClass) {
          $header.addClass('header--shadow');
          hasClass = true;
        } else if (!scrollTop && hasClass) {
          $header.removeClass('header--shadow');
          hasClass = false;
        }
        ticking = false;
      });
    }
    ticking = true;
  });

  // ------------ Jumbotron -- Play button  ------------

  $('.jumbo-playBtn').click(function() {
    $(this).toggleClass('jumbo-playBtn--paused');
  });

  // ------------ Services -- Modal elements ------------

  const $servicesItem = $('.services-item');
  const $servicesModal = $('.services-modal');

  $servicesItem.each((idx, $item) => {
    const isEven = idx % 2 === 0;
    new Tether({
      element: $servicesModal.eq(idx),
      target: $item,
      attachment: isMobile? 'top left' :
        isEven? 'top left' : 'top right',
      targetAttachment: isMobile? 'bottom left' :
        isEven? 'top right' : 'top left'
    });
  });

  $servicesModal.hide();

  $servicesItem.click(function() {
    const thisIdx = $servicesItem.index(this);
    const $thisModal = $servicesModal.eq(thisIdx);
    if ($thisModal.is(':visible')) {
      $thisModal.hide(250);
      return;
    }
    $servicesModal.hide();
    $thisModal.show(250);
  });


  // ------------ Contact -- Dropdown ------------

  const $dropdown = $('.contact-dropdown');
  const $multiselect =  $('.contact-multiselect');
  const multiselectHeight = $multiselect[0].offsetHeight;
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

  const $contactSelect = $('.contact-select');
  const $contactSelectDefinition = $('.contact-selectDefinition');

  $contactSelect.click(function() {
    const $this = $(this);
    $this.find('.contact-selectInput')[0].checked = !$this.find('.contact-selectInput')[0].checked;
    $this.toggleClass('contact-select--checked');
    $this.next('.contact-selectDefinition').toggleClass('contact-selectDefinition--checked');
  });
  
  $contactSelectDefinition.click(function() {
    const $this = $(this);
    const $select = $this.prev('.contact-select');
    $select.find('.contact-selectInput')[0].checked = !$select.find('.contact-selectInput')[0].checked;
    $select.toggleClass('contact-select--checked');
    $this.toggleClass('contact-selectDefinition--checked');
  });

  $contactSelect.on('mouseover mouseleave', function() {
    $(this).next('.contact-selectDefinition').toggleClass('contact-selectDefinition--hover');    
  });
  
  $contactSelectDefinition.on('mouseover mouseleave', function() {
    $(this).prev('.contact-select').toggleClass('contact-select--hover');
  });

});