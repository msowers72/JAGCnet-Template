/**
* Template Name: Active
* Template URL: https://bootstrapmade.com/active-bootstrap-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  // const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  // function mobileNavToogle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   mobileNavToggleBtn.classList.toggle('bi-list');
  //   mobileNavToggleBtn.classList.toggle('bi-x');
  // }
  // mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper tabs sliders
   */
  function initSwiperTabs() {
    document
      .querySelectorAll(".init-swiper-tabs")
      .forEach(function(swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        const dotsContainer = swiperElement
          .closest("section")
          .querySelector(".js-custom-dots");
        if (!dotsContainer) return;

        const customDots = dotsContainer.querySelectorAll("a");

        // Remove the default pagination setting
        delete config.pagination;

        const swiperInstance = new Swiper(swiperElement, config);

        swiperInstance.on("slideChange", function() {
          updateSwiperTabsPagination(swiperInstance, customDots);
        });

        customDots.forEach((dot, index) => {
          dot.addEventListener("click", function(e) {
            e.preventDefault();
            swiperInstance.slideToLoop(index);
            updateSwiperTabsPagination(swiperInstance, customDots);
          });
        });

        updateSwiperTabsPagination(swiperInstance, customDots);
      });
  }

  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", initSwiperTabs);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

})();

// custom header code 
const mobileBtn = document.getElementById('hamburger-icon')
const mobileMenu = document.getElementById('mobile-menu')
const mobileMenuicon = document.querySelector('#hamburger-icon i')

mobileBtn.addEventListener('click', () => {
    // Open/hide mobile menu
    mobileMenu.classList.toggle('hidden')

    // Change mobile toggler icon on open/close
    if(!mobileMenu.classList.contains('hidden')) {
        mobileMenuicon.classList.remove('fa-bars')
        mobileMenuicon.classList.add('fa-xmark')
    } else {
        mobileMenuicon.classList.remove('fa-xmark')
        mobileMenuicon.classList.add('fa-bars')
    }

})
// End custom header code

// Code for the Pagination feature
let link = document.getElementsByClassName('page-link');
let announce1 = document.querySelector('.announce1');
let announce2 = document.querySelector('.announce2');
let announce3 = document.querySelector('.announce3');
let announce4 = document.querySelector('.announce4');
let announce5 = document.querySelector('.announce5');
let announce6 = document.querySelector('.announce6');

let currentValue = 1;



// activeLink function
function activeLink() { 
 
  for (l of link) {
    l.classList.remove('my-active');
   
  };
  event.target.classList.add('my-active');  
  currentValue = event.target.value;
 let current_page = currentValue
 console.log(currentValue)
 console.log(current_page)
 
  // Logic for pagination
  if (current_page === 1) {
    announce1.style.display = "block"
  } else if (current_page !== 1) {
    announce1.style.display = "none"
  } 

   if (current_page === 2) {
    announce2.style.display = "block"
  } else if (current_page !== 2) {
    announce2.style.display = "none"
  }

  if (current_page === 3) {
    announce3.style.display = "block"
  } else if (current_page !== 3) {
    announce3.style.display = "none"
  }

  if (current_page === 4) {
    announce4.style.display = "block"
  } else if (current_page !== 4) {
    announce4.style.display = "none"
  }

  if (current_page === 5) {
    announce5.style.display = "block"
  } else if (current_page !== 5) {
    announce5.style.display = "none"
  }

  if (current_page === 6) {
    announce6.style.display = "block"
  } else if (current_page !== 6) {
    announce6.style.display = "none"
  }
   
 
  
};

function backBtn() {
  console.log(currentValue)
  if (currentValue > 1) {
    for (l of link) {
      l.classList.remove('my-active');
    };
    currentValue--;
    link[currentValue - 1].classList.add('my-active');
    
    if (currentValue === 5) {
      announce5.style.display = "block";
      announce6.style.display = "none";
    } else if (currentValue === 4) {
      announce4.style.display = "block";
      announce5.style.display = 'none';
    } else if (currentValue === 3) {
      announce3.style.display = "block";
      announce4.style.display = "none";
    } else if (currentValue === 2) {
      announce2.style.display = "block";
      announce3.style.display = "none";
    } else if (currentValue === 1) {
      announce1.style.display = "block";
      announce2.style.display = "none"
    }

  };
};

function nextBtn() {
  if (currentValue < 6) {
    for (l of link) {
      l.classList.remove('my-active');
    };
    currentValue++;
    link[currentValue - 1].classList.add('my-active');

    if (currentValue === 2) {
      announce2.style.display = "block";
      announce1.style.display = "none";
    } else if (currentValue === 3) {
      announce3.style.display = "block";
      announce2.style.display = "none";
    } else if (currentValue === 4) {
      announce4.style.display = "block";
      announce3.style.display = "none";
    } else if (currentValue === 5) {
      announce5.style.display = "block";
      announce4.style.display = "none";
    } else if (currentValue === 6) {
      announce6.style.display = "block";
      announce5.style.display = "none";
    }
  };
};
// End Code for the Pagination feature