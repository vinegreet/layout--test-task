
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

  // ------------ Menu scroll ------------

  const $htmlAndBody = $('html, body');
  const headerHeightWithCorrection = 66;
  const $buttons = $('.header-menuBtn, .jumbo-btn');

  $buttons.click(function() {
    const $this = $(this);
    const scrollTo = $($this.data('scroll-to')).offset().top;
    $htmlAndBody.animate({ scrollTop: scrollTo - headerHeightWithCorrection }, 250);
  });

  $('.header-logoBtn').click(function() {
    $htmlAndBody.animate({ scrollTop: 0 }, 250);
  });

  // ------------ Header on scroll ------------

  // --- Menu buttons highlighting  ---

  const $menuBtn = $('.header-menuBtn');
  const sectionsOffsets = [];
  const menuBtnHasClass = new Array(3).fill(false);
  const headerHeight = 71;
  let classesDeleted;

  $('section:not(.jumbo)').each(function(idx, $section) {
    const offset = $section.offsetTop;
    sectionsOffsets.push(offset);
  });

  function currentSection(scrollTop) {
    const sectionIdx = sectionsOffsets.findIndex(offset => scrollTop < offset - headerHeight);
    return (sectionIdx >= 0)? sectionIdx : 3;
  }

  function activateMenuBtn(scrollTop) {
    const activeIdx = currentSection(scrollTop) - 1;
    if (activeIdx >= 0 && !menuBtnHasClass[activeIdx]) {
      $menuBtn.removeClass('header-menuBtn--active');
      $menuBtn.eq(activeIdx).addClass('header-menuBtn--active');
      menuBtnHasClass.fill(false);
      menuBtnHasClass[activeIdx] = true;
      classesDeleted = false;
    } else if (activeIdx < 0 && !classesDeleted) {
      $menuBtn.removeClass('header-menuBtn--active');
      menuBtnHasClass[0] = false;
      classesDeleted = true;
    }
  }

  // --- Header shadow  ---

  const $window = $(window);
  const $header = $('.header');
  let scrollTop = $window.scrollTop();
  let hasClass;

  if (scrollTop) {
    $header.addClass('header--shadow');
    hasClass = true;
  }

  function headerShadow(scrollTop) {
    if (scrollTop && !hasClass) {
      $header.addClass('header--shadow');
      hasClass = true;
    } else if (!scrollTop && hasClass) {
      $header.removeClass('header--shadow');
      hasClass = false;
    }
  }

  // --- Scroll event listener  ---

  let ticking;

  $window.on('scroll', function() {
    if (!ticking) {
      scrollTop = $window.scrollTop();
      requestAnimationFrame(function() {
        headerShadow(scrollTop);
        activateMenuBtn(scrollTop);
        ticking = false;
      });
    }
    ticking = true;
  });

  // ------------ Jumbotron -- Play button  ------------

  $('.jumbo-playBtn').click(function() {
    $(this).toggleClass('jumbo-playBtn--paused');
  });

  // ------------ Services -- horizontal dotted line ------------

  const $servicesItem = $('.services-item');

  if (!isMobile) {
    new Tether({
      element: $('.services-horizontalDottedLine'),
      target: $servicesItem.eq(0),
      attachment: 'top middle',
      targetAttachment: 'bottom right',
      offset: '0 1%'
    });
  }

  // ------------ Services -- Modal elements ------------

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
    $(this).toggleClass('services-item--active');
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
  
  $contactSelectDefinition.click(function(e) {
    e.preventDefault();
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
