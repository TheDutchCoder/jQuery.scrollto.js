/*!
 * jQuery.scrollto.js
 *
 * A jQuery plugin that lets the author scroll to any object, from any trigger.
 *
 * Mainly useful for navigational elements, but virtually anything can be used.
 * All configuration parameters are optional.
 *
 * @author  Reinier Kaper <mail@thedutchcoder.com>
 * @example:

$('.foo').scrollto({
    trigger: 'a',           // The element that triggers the scroll.
    target: '#bar',         // The element to scroll to (default is the anchor).
    namespace: '',          // Custom namespace (default: 'jQuery_scrollto').
    speed: 250,             // The speed (in ms) at which to scroll.
    preventDefault: false,  // Prevent the default event from triggering.
    stopPropagation: false  // Prevent all bubbling (USE WITH CAUTION!).
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
            namespace: 'jQuery_scrollto',

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

            var $this,
                $trigger,
                $target,

                namespace,
                clickEvent;

            $this = $(this);

            clickEvent = 'ontouchstart' in document.documentElement ?
                    'touchstart.' + options.namespace :
                    'click.' + options.namespace;

            
            $this.on(clickEvent, function(event) {

                var $event_target,

                    href,
                    offset,
                    speed;

                $event_target = $(event.target);

                
                // Make sure we're handling just the events in this plugin.
                if (event.handleObj.namespace === options.namespace) {


                    // Check to see if preventDefault or stopPropagation are
                    // required.
                    if (options.preventDefault) {
                        event.preventDefault();
                    }

                    if (options.stopPropagation) {
                        event.stopPropagation();
                    }


                    // This is the element that actually gets clicked.
                    $trigger = $event_target;


                    // If a trigger is specfied, make sure the actual trigger a
                    // jQuery object.
                    if (options.trigger && $trigger.closest(options.trigger).length) {

                        $trigger = $trigger.closest(options.trigger);

                    }


                    // If no target is specified, check to see if the trigger
                    // has an anchor. If not, fail silently, otherwise try to
                    // scroll to the anchor.
                    // 
                    // If a target is specified, try to scroll to the target.
                    if (!options.target) {

                        href = $trigger.attr('href');
                        anchor = href ? href.split('#')[1] : null;

                        if (anchor) {

                            offset = $('#' + anchor).offset().top;

                        } else {

                            return;

                        }

                    } else {

                        $target = $(options.target);
                        offset = $target.offset().top;

                    }

                    // speed = options.linearSpeed ? 

                    scrollTo(offset, options.speed);

                }

            });
            


            /**
             * Scrolls the viewport to the specified target at the supplied
             * speed.
             * 
             * @param  {Number} offset The vertical offset of the target.
             * @param  {Number} speed  The speed (in ms) at which to animate.
             */
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
