const $window = $(window);

module.exports = function(element, options) {
    if (!element.data('Sticky')) {
        element.data('Sticky', new Sticky(element, options));
    }
};

$.fn.sticky = function(options) {
    return $(this).each(function(index, item) {
        module.exports($(item), options);
    });
};

class Sticky {
    constructor(element, options) {
        this.element = element;

        this.id = this.element.attr('data-sticky-target');
        if (!this.id) return;

        this.target = $(`[data-sticky-id="${this.id}"]`);
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

    resize() {
        this.top = this.target.offset().top;
        if (this.options.topHeightOffset) {
            this.top += this.target.outerHeight() * this.options.topHeightOffset;
        }
        this.scroll();
    }

    scroll() {
        if ($window.scrollTop() >= this.top) {
            if (!this.active) {
                this.active = true;
                this.element.addClass(this.options.active);
            }

        } else if (this.active) {
            this.active = false;
            this.element.removeClass(this.options.active);
        }
    }
}