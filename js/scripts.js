/*!
    * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  
  })(jQuery); // End of use strict
  
let baby_check_search_btn = document.getElementById('baby_check_search_btn');
let baby_search_txt = document.getElementById('baby_search');
let older_check_search_btn = document.getElementById('older_check_search_btn');
let older_search_txt = document.getElementById('older_search');
let index_id = 0;

baby_check_search_btn.addEventListener("click", baby_searchByCheckbox);
baby_search_txt.addEventListener("keyup", baby_searchByTextKeyUp);
older_check_search_btn.addEventListener("click", older_searchByCheckbox);
older_search_txt.addEventListener("keyup", older_searchByTextKeyUp);

function baby_searchByCheckbox() {
    let result = [];
    $('input[name="baby_symptom"]:checked').each(function(i){
        result.push($(this).val());
    });

    $.ajax({
        url: 'php/findBaby.php',
        type: 'POST',
        data: {
            sym_list: result.sort(),
            id: index_id
        },
        success: function(data) {
          const temp = data.split('@');
            document.getElementById('baby_result_div').innerHTML = temp[0];
            index_id = temp[1];
            let more_btn = document.getElementById('more1');
            more_btn.addEventListener("click", open_explain_page);
            index_id = 0;
        },
        error: function(e) {
            alert(e.reponseText);
        }
    })
}

function baby_searchByTextKeyUp() {
    const str_list = (document.getElementById('baby_search').value).split(",");

    $.ajax({
        url: 'php/findBaby.php',
        type: 'POST',
        data: {
            sym_list: str_list.sort(),
            id: index_id
        },
        success: function(data) {
          const temp = data.split('@');
          document.getElementById('baby_result_div').innerHTML = temp[0];
          index_id = temp[1];
          let more_btn = document.getElementById('more1');
          more_btn.addEventListener("click", open_explain_page);
          index_id = 0;
        },
        error: function(e) {
            alert(e.reponseText);
        }
    })
}

function older_searchByCheckbox() {
    let result = [];
    $('input[name="older_symptom"]:checked').each(function(i){
        result.push($(this).val());
    });

    $.ajax({
        url: 'php/findOlder.php',
        type: 'POST',
        data: {
            sym_list: result.sort()
        },
        success: function(data) {
            document.getElementById('older_result_div').innerHTML = data;
        },
        error: function(e) {
            alert(e.reponseText);
        }
    })
}

function older_searchByTextKeyUp() {
    const str_list = (document.getElementById('older_search').value).split(",");

    $.ajax({
        url: 'php/findOlder.php',
        type: 'POST',
        data: {
            sym_list: str_list.sort()
        },
        success: function(data) {
            document.getElementById('older_result_div').innerHTML = data;
        },
        error: function(e) {
            alert(e.reponseText);
        }
    })
}

function open_explain_page() {
  location.href = "second_index.html";
}