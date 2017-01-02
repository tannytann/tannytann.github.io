jQuery(document).ready(function ($) {

    "use strict";

    /*----------------------------------------------------*/
    /* Initializing jQuery Nice Scroll
     ------------------------------------------------------ */

    $("html").niceScroll({
        cursorcolor: "#11abb0", // Set cursor color
        cursorwidth: "8", // Sety cursor width
        cursorborder: "" // Set cursor border color, default left none
    });


    /*----------------------------------------------------*/
    /* FitText Settings
     ------------------------------------------------------ */

    setTimeout(function () {
        $('h1.responsive-headline').fitText(1, {minFontSize: '28px', maxFontSize: '72px'});
    }, 100);


    /*----------------------------------------------------*/
    /* Smooth Scrolling
     ------------------------------------------------------ */

    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });

    });

    /*----------------------------------------------------*/
    /* Appear Animation
     ------------------------------------------------------*/
    new WOW().init();

    /*----------------------------------------------------*/
    /* Parallax for Header Content
     ------------------------------------------------------*/
    $(window).scroll(function (e) {
        parallax();
    });


    function parallax() {
        var scrollPosition = $(window).scrollTop();
        $('.banner').css('margin-top', (0 - (scrollPosition * .8)) + 'px');
    }

    /*----------------------------------------------------*/
    /* Highlight the current section in the navigation bar
     ------------------------------------------------------*/

    var sections = $("section");
    var navigation_links = $("#m-nav a");

    sections.waypoint({

        handler: function (event, direction) {

            var active_section;

            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('#m-nav a[href="#' + active_section.attr("id") + '"]');

            navigation_links.parent().removeClass("current");
            active_link.parent().addClass("current");

        },
        offset: '35%'

    });


    /*----------------------------------------------------*/
    /*	Make sure that #header-background-image height is
     /* equal to the browser height.
     ------------------------------------------------------ */

    $('header').css({'height': $(window).height()});
    $(window).on('resize', function () {

        $('header').css({'height': $(window).height()});
        $('body').css({'width': $(window).width()})
    });


    /*----------------------------------------------------*/
    /*  On scroll blur header
     ------------------------------------------------------*/
    (function () {
        $(window).scroll(function () {
            var oVal;
            oVal = $(window).scrollTop() / 100;
            return $(".header-overlay").css("opacity", oVal);
        });

    }).call(this);


    /*----------------------------------------------------*/
    /*	Fade In/Out Primary Navigation
     ------------------------------------------------------*/

    $(window).on('scroll', function () {

        var h = $('header').height();
        var y = $(window).scrollTop();
        var nav = $('#m-nav');

        if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768 )) {
            nav.fadeOut('fast');
        }
        else {
            if (y < h * .20) {
                nav.removeClass('opaque').fadeIn('fast');
            }
            else {
                nav.addClass('opaque').fadeIn('fast');
            }
        }

    });

    /*----------------------------------------------------*/
    /*	contact form
     ------------------------------------------------------*/

    var $contactForm = $('#contactForm');
    $contactForm.submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '//formspree.io/vipada@srisawat.co',
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function() {
                $('#image-loader').fadeIn();
            },
            success: function(data) {
                $('#image-loader').fadeOut();
                $('#message-warning').hide();
                $('#contactForm').fadeOut();
                $('#message-success').fadeIn();
            },
            error: function(err) {
                $('#image-loader').fadeOut();
                $('#message-warning').html(msg);
                $('#message-warning').fadeIn();
            }
        });
    });
    
});








