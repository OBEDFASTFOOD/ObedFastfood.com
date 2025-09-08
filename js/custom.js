// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js + filters + search
$(window).on('load', function () {
    var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: { columnWidth: ".all" }
    });

    var textRegex = null;
    var buttonFilter = '*';

    function applyFilters() {
        $grid.isotope({
            filter: function () {
                var $item = $(this);
                var matchesText = textRegex ? $item.text().toLowerCase().match(textRegex) : true;
                var matchesCategory = buttonFilter === '*' ? true : $item.is(buttonFilter);
                return matchesText && matchesCategory;
            }
        });
    }

    // Category filters with smooth scrolling
    $('.filters_menu').on('click', 'li[data-filter]', function () {
        const $this = $(this);
        $('.filters_menu li').removeClass('active');
        $this.addClass('active');
        buttonFilter = $this.attr('data-filter') || '*';
        applyFilters();
        
        // Smooth scroll to center the active category
        const container = $('.category-scroll');
        const scrollLeft = $this.offset().left + container.scrollLeft() - 
            (container.width() / 2) + ($this.width() / 2);
        
        container.animate({
            scrollLeft: scrollLeft
        }, 300);

        // Mark selected in More menu when applicable
        var $mm = $('.filters_menu .more .more-menu li');
        $mm.removeClass('selected');
        $mm.filter('[data-filter="' + buttonFilter + '"]') .addClass('selected');
    });

    // More dropdown toggle
    $('#moreFiltersBtn').on('click', function () {
        var $parent = $(this).closest('.more');
        var open = $parent.hasClass('open');
        $parent.toggleClass('open', !open);
        $(this).attr('aria-expanded', !open);
    });
    // Close More on outside tap (mobile friendly)
    $(document).on('click', function (e) {
        var $more = $('.filters_menu .more');
        if (!$more.is(e.target) && $more.has(e.target).length === 0) {
            $more.removeClass('open');
            $('#moreFiltersBtn').attr('aria-expanded', 'false');
        }
    });
    // Close More when clicking an item
    $('.filters_menu .more .more-menu').on('click', 'li[data-filter]', function () {
        var $more = $(this).closest('.more');
        $more.removeClass('open');
        $('#moreFiltersBtn').attr('aria-expanded', 'false');
    });

    // Navbar expanding search
    var $searchToggle = $('#navSearchToggle');
    var $searchInput = $('#navSearchInput');

    $searchToggle.on('click', function () {
        $searchInput.toggleClass('active');
        if ($searchInput.hasClass('active')) {
            $searchInput.focus();
        } else {
            $searchInput.val('');
            textRegex = null;
            applyFilters();
        }
    });

    var debounceTimer;
    $searchInput.on('keyup', function () {
        var value = $(this).val().toString().toLowerCase().trim();
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function () {
            textRegex = value ? new RegExp(value, 'i') : null;
            applyFilters();
        }, 120);
    });
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});