jQuery(document).ready(function ($) {
    //set animation timing
    var animationDelay = 2500,
        //clip effect 
        revealDuration = 1000,
        revealAnimationDelay = 2000;

    initHeadline();


    function initHeadline() {
        //insert <i> element for each letter of a changing word
        singleLetters($('.cd-headline.letters').find('b'));
        //initialise headline animation
        animateHeadline($('.cd-headline'));
    }

    function singleLetters($words) {
        $words.each(function () {
            var word = $(this),
                letters = word.text().split(''),
                selected = word.hasClass('is-visible');
            for (i in letters) {
                if (word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
                letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>' : '<i>' + letters[i] + '</i>';
            }
            var newLetters = letters.join('');
            word.html(newLetters).css('opacity', 1);
        });
    }

    function animateHeadline($headlines) {
        var duration = animationDelay;
        $headlines.each(function () {
            var headline = $(this);

            if (headline.hasClass('loading-bar')) {
                duration = barAnimationDelay;
                setTimeout(function () { headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
            } else if (headline.hasClass('clip')) {
                var spanWrapper = headline.find('.cd-words-wrapper'),
                    newWidth = spanWrapper.width() + 10
                spanWrapper.css('width', newWidth);
            } else if (!headline.hasClass('type')) {
                //assign to .cd-words-wrapper the width of its longest word
                var words = headline.find('.cd-words-wrapper b'),
                    width = 0;
                words.each(function () {
                    var wordWidth = $(this).width();
                    if (wordWidth > width) width = wordWidth;
                });
                headline.find('.cd-words-wrapper').css('width', width);
            };

            //trigger animation
            setTimeout(function () { hideWord(headline.find('.is-visible').eq(0)) }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word);

        if ($word.parents('.cd-headline').hasClass('type')) {
            var parentSpan = $word.parent('.cd-words-wrapper');
            parentSpan.addClass('selected').removeClass('waiting');
            setTimeout(function () {
                parentSpan.removeClass('selected');
                $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
            }, selectionDuration);
            setTimeout(function () { showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

        } else if ($word.parents('.cd-headline').hasClass('letters')) {
            var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
            hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
            showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ width: '2px' }, revealDuration, function () {
                switchWord($word, nextWord);
                showWord(nextWord);
            });

        } else if ($word.parents('.cd-headline').hasClass('loading-bar')) {
            $word.parents('.cd-words-wrapper').removeClass('is-loading');
            switchWord($word, nextWord);
            setTimeout(function () { hideWord(nextWord) }, barAnimationDelay);
            setTimeout(function () { $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

        } else {
            switchWord($word, nextWord);
            setTimeout(function () { hideWord(nextWord) }, animationDelay);
        }
    }

    function showWord($word, $duration) {
        if ($word.parents('.cd-headline').hasClass('type')) {
            showLetter($word.find('i').eq(0), $word, false, $duration);
            $word.addClass('is-visible').removeClass('is-hidden');

        } else if ($word.parents('.cd-headline').hasClass('clip')) {
            $word.parents('.cd-words-wrapper').animate({ 'width': $word.width() + 10 }, revealDuration, function () {
                setTimeout(function () { hideWord($word) }, revealAnimationDelay);
            });
        }
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        $oldWord.removeClass('is-visible').addClass('is-hidden');
        $newWord.removeClass('is-hidden').addClass('is-visible');
    }
});


// choose-us

$(document).ready(function () {
    $(".choose-items h3").click(function (e) {
        $(this).parent(".choose-items").find("p").slideToggle("slow");
        $(this).parent(".choose-items").prevAll(".choose-items").find("p").slideUp("slow");
        $(this).parent(".choose-items").nextAll(".choose-items").find("p").slideUp("slow");

        $(this).parent(".choose-items").find("h3 i").toggleClass("icon-rotate");
        $(this).parent(".choose-items").prevAll(".choose-items").find("h3 i").removeClass("icon-rotate");
        $(this).parent(".choose-items").nextAll(".choose-items").find("h3 i").removeClass("icon-rotate");
    });

});

// slider
$(document).ready(function () {
    $('.owl-carousel-1').owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            900: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
});
$(document).ready(function () {
    $('.owl-carousel-2').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
});
// price
$(document).ready(function () {
    $(document).ready(function () {
        $(".switch-container").click(function () {
            $(".btn-price").toggleClass("on-btn");
            $("#price-card-1").fadeOut(function () {
                $("#price-card-1").html(($("#price-card-1").html() == ' <span><sup>$</sup>199</span><span>/yr</span>') ? ' <span><sup>$</sup>19</span><span>/mo</span>' : ' <span><sup>$</sup>199</span><span>/yr</span>').fadeIn();
            })
            $("#price-card-2").fadeOut(function () {
                $("#price-card-2").html(($("#price-card-2").html() == '<span><sup>$</sup>499</span><span>/yr</span>') ? '<span><sup>$</sup>49</span><span>/mo</span>' : '<span><sup>$</sup>499</span><span>/yr</span>').fadeIn();
            })


        })
    });

});

// header

$(document).ready(function () {
    $(".toggle-manu").click(function (e) {
        $("nav").toggleClass("nav-left");
    });
    $(".close-manu").click(function (e) {
        $("nav").removeClass("nav-left");

    });

    $(".top-to-back").click(function (e) {
        $("html").animate({ "scrollTop": "0" })

    });
});

// fix header
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $("header").addClass("header-active");
        $(".top-to-back").fadeIn();
    }
    else {
        $("header").removeClass("header-active");
        $(".top-to-back").fadeOut();
    }
});

// counter

var a = 0;
$(window).scroll(function () {

    var oTop = $('#counter').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
        $('.counter-value').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo
            },

                {

                    duration: 2000,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $this.text(this.countNum);
                        //alert('finished');
                    }

                });
        });
        a = 1;
    }

});

