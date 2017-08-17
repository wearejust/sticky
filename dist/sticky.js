/** 
* @wearejust/sticky 
* Add/remove classes to sticky elements 
* 
* @version 1.0.0 
* @author Emre Koc <emre.koc@wearejust.com> 
*/
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $window = $(window);

module.exports = function (element, options) {
    if (!element.data('Sticky')) {
        element.data('Sticky', new Sticky(element, options));
    }
};

$.fn.sticky = function (options) {
    return $(this).each(function (index, item) {
        module.exports($(item), options);
    });
};

var Sticky = function () {
    function Sticky(element, options) {
        _classCallCheck(this, Sticky);

        this.element = element;

        this.id = this.element.attr('data-sticky-target');
        if (!this.id) return;

        this.target = $('[data-sticky-id="' + this.id + '"]');
        if (!this.target.length) return;

        this.options = $.extend({
            active: 'is-active',
            topHeightOffset: 0
        }, options);

        this.active = this.element.hasClass(this.options.active);

        $window.on('resize', this.resize.bind(this));
        $window.on('scroll', this.scroll.bind(this));
        this.resize();
    }

    Sticky.prototype.resize = function resize() {
        this.top = this.target.offset().top;
        if (this.options.topHeightOffset) {
            this.top += this.target.outerHeight() * this.options.topHeightOffset;
        }
        this.scroll();
    };

    Sticky.prototype.scroll = function scroll() {
        if ($window.scrollTop() >= this.top) {
            if (!this.active) {
                this.active = true;
                this.element.addClass(this.options.active);
            }
        } else if (this.active) {
            this.active = false;
            this.element.removeClass(this.options.active);
        }
    };

    return Sticky;
}();