/*!
 * jQuery.scrollto.js
 *
 * A jQuery plugin that lets the author scroll to any object, from any trigger.
 *
 * Mainly useful for navigational elements, but virtually anything can be used.
 *
 * @author  Reinier Kaper <mail@thedutchcoder.com>
 * @example:

$('.nav--main a').scrollto({
    calculateHeader: false,         // True for sticky header.
    speed: 250,                     // Scroll animation speed.
    toTopClass: '.js-back-to-top'   // Class that triggers a 'back to top'.
});

 */
;(function($, window, document, undefined) {


    /**
     * Add the scrollTo function to the jQuery functions.
     *
     * @param  Object options An object containing options for the plugin.
     * @return Object         Returns the jQuery object.
     */
    $.fn.scrollto = function(options) {


        // The default options for the plugin.
        var defaults = {
            trigger: null,
            target: null,
            nameSpace: (Math.random() + 1).toString(36).substring(7),

            speed: 250,
            linearSpeed: false,

            preventDefault: false,
            stopPropagation: false
        };


        // Extend the options with all the defaults and overwrite any supplied
        // options.
        options = $.extend(defaults, options);


        // Loop through each item that the plugin is attached to.
        this.each(function() {

            var $window,
                $document,
                $trigger,
                $target,

                nameSpace,
                clickEvent;

            $window = $(window);
            $document = $(document);

            nameSpace = '.' + options.namespace;
            clickEvent = 'ontouchstart' in document.documentElement ?
                    'touchstart' + nameSpace :
                    'click' + nameSpace;



            $document.on(clickEvent, options.trigger, function(event) {

                var targetOffset,
                    speed;

                $trigger = $(this).closest(options.trigger);

                // Make sure there's a target to go to. This can either be a
                // selector, of (if no selector is provided) the anchor.
                //
                // If no selector or anchor is provided, the plugin ignores the
                // click event.
                if (options.target || $trigger.attr('href').split('#')[1]) {

                    if (options.preventDefault) {
                        event.preventDefault();
                    }

                    if (options.stopPropagation) {
                        event.stopPropagation();
                    }

                    $target = options.target ?
                              $(options.target) :
                              $('#' + $trigger.attr('href').split('#')[1]);

                    // CONTINUE HERE
                    // Make speed relative.
                    targetOffset = $target.offset().top;
                    speed = options.linearSpeed ?
                            (targetOffset / options.speed) :
                            options.speed;

                    scrollTo(targetOffset, speed);

                    console.log('click');
                    console.log($(this).closest(options.trigger));
                    console.log($target);

                }

            });


            function scrollTo(offset, speed) {

                $('html, body')
                    .stop()
                    .animate({
                        scrollTop: offset
                    }, options.speed);

            }


        });


        // Return the object for chaining.
        return this;

    };

})(jQuery, window, document);
