(function ($) {

    "use strict";

    var pxl_widget_accordion_handler = function ($scope, $) {
        $scope.find(".pxl-accordion .pxl-accordion--title").on("click", function (e) {
            e.preventDefault();
            var pxl_target = $(this).data("target");
            var pxl_parent = $(this).parents(".pxl-accordion");
            var pxl_active = pxl_parent.find(".pxl-accordion--title");
            var pxl_width = $(window).width();

            $.each(pxl_active, function (index, item) {
                var pxl_item_target = $(item).data("target");
                if (pxl_item_target != pxl_target) {
                    $(item).removeClass("active");
                    $(item).parent().removeClass("active");
                    if ($scope.find(".pxl-accordion.style7").length > 0 && pxl_width > 767) {
                        $(pxl_item_target).animate({ width: 'hide' }, 600, function () {
                            $(this).closest('.pxl--item').removeClass('active');
                        });
                    } else {
                        $(pxl_item_target).slideUp(600, function () {
                            $(this).closest('.pxl--item').removeClass('active');
                        });
                    }
                }
            });

            $(this).parent().toggleClass("active");

            if ($scope.find(".pxl-accordion.style7").length > 0 && pxl_width > 767) {
                $(pxl_target).animate({
                    width: $(pxl_target).is(':visible') ? 'hide' : 'show'
                }, 600, function () {
                    $(this).closest('.pxl--item').toggleClass('active', $(this).is(':visible'));
                });
            } else {
                $(pxl_target).slideToggle(600, function () {
                    $(this).closest('.pxl--item').toggleClass('active', $(this).is(':visible'));
                });
            }
        });
    };

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/pxl_accordion.default', pxl_widget_accordion_handler);
    });
})(jQuery);
