$(function () {
    // FullPage.js 초기화
    $('#fullpage').fullpage({
        sectionsColor: ['transparent', 'rgba(247, 243, 233, 0.9)', 'rgba(247, 243, 233, 0.8)', 'rgba(247, 243, 233, 0.95)', 'rgba(247, 243, 233, 0.9)', '#1a0f0a'],
        anchors: ['cover', 'about', 'works', 'interview', 'contact', 'footer'],
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: ['Cover', 'About', 'Works', 'Interview', 'Contact', 'Footer'],
        keyboardScrolling: true,
        responsiveWidth: 1024,
        scrollingSpeed: 1000,
        controlArrows: true,
        paddingTop: 0,

        afterLoad: function(destination){
            let $header = $('.masthead');
            let headerHeight = $header.outerHeight();
        
            if (destination === 'cover') {
                $header.removeClass('show');
                $('.section-inner').css('padding-top', 0);
            } else {
                $header.addClass('show');
                $('.section-inner').css('padding-top', headerHeight);
            }
        },
        

        onLeave: function(origin){
            $(origin.item).find('.animate-fadeInUp').removeClass('animate-fadeInUp');
        }
    });

    $('.burger-menu').click(function () {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        $('.nav-overlay').toggleClass('active');
    });

    $('.nav-overlay').click(function () {
        $('.burger-menu').removeClass('active');
        $('.nav-menu').removeClass('active');
        $('.nav-overlay').removeClass('active');
    });

    $('.nav-link').click(function (e) {
        e.preventDefault();
        let anchor = $(this).data('anchor');

        $.fn.fullpage.moveTo(anchor);

        $('.burger-menu').removeClass('active');
        $('.nav-menu').removeClass('active');
        $('.nav-overlay').removeClass('active');

        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $('.work-card').each(function (index, el) {
        $(el).mouseenter(function () {
            $(this).find('video')[0].play();
        }).mouseleave(function () {
            $(this).find('video')[0].pause();
            $(this).find('video')[0].currentTime = 0;
        }).click(function () {
            const title = $(this).find('h3').text();
            const sub = $(this).find('p').text();

            $('.popup').addClass('on');
            $('.popup').find('h2').text(title);
            $('.popup').find('p').text(sub);
        });
    });

    $('.popup .txt button').click(function () {
        $('.popup').removeClass('on');
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            $('.popup').removeClass('on');
        }
    });


    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .animate-fadeInUp {
                animation: magicalFadeInUp 1s ease-out forwards;
            }
            
            @keyframes magicalFadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .tool-icons .icon:hover {
                box-shadow: 0 0 25px rgba(123, 45, 38, 0.6);
                filter: drop-shadow(0 0 15px rgba(123, 45, 38, 0.4));
                animation: magicalPulse 0.8s ease-in-out;
            }
            
            @keyframes magicalPulse {
                0%, 100% {
                    transform: scale(1.15) rotate(5deg);
                }
                50% {
                    transform: scale(1.25) rotate(-2deg);
                }
            }
            
            .work-card {
                position: relative;
                overflow: hidden;
            }
            
            .work-card::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(247,243,233,0.6), transparent);
                transition: left 0.6s ease;
                z-index: 3;
            }
            
            .work-card:hover::after {
                left: 100%;
            }
            
            /* 반응형에서 장식 요소 숨김 */
            @media (max-width: 768px) {
                .corner-ornament::before,
                .corner-ornament::after {
                    display: none;
                }
            }
        `)
        .appendTo('head');
});