var mySidebar = document.getElementById("mySidebar");

function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
    } else {
        mySidebar.style.display = 'block';
    }
}

// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
}

$(".home-carousel").owlCarousel({
	loop: true,
	margin: 5,
	nav: false,
	items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3700,
    responsive: {
        1650: {
            stagePadding: 450
        },
        1450: {
            stagePadding: 350
        },
        1200: {
            stagePadding: 250
        },
        1024: {
            stagePadding: 150
        },
        768: {
            stagePadding: 100
        },
        400: {
            stagePadding: 25
        },
        0: {
            stagePadding: 0
        }
    }
});

var fixOwl = function(){
    var $stage = $('.owl-stage'),
        stageW = $stage.width(),
        $el = $('.owl-item'),
        elW = 0;
    $el.each(function() {
        elW += $(this).width()+ +($(this).css("margin-right").slice(0, -2))
    });
    if ( elW > stageW ) {
        $stage.width( elW );
    };
}

$(".footer-carousel").owlCarousel({
    margin: 15,
    nav: false,
    dots: false,
    // rtl: true,
    nav: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    freeDrag: false,
    autoplay: true,
    // center: true,
    loop: true,
    autoWidth: true,
    onInitialized: fixOwl,
    onRefreshed: fixOwl
});