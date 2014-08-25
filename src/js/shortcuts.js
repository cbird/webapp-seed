/*globals Element*/
module.exports = (function () {
    'use strict';

    if (!Array.prototype.shuffle) {
        // The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
        Array.prototype.shuffle = function () {
            var currentIndex = this.length,
                temporaryValue,
                randomIndex;
            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = this[currentIndex];
                this[currentIndex] = this[randomIndex];
                this[randomIndex] = temporaryValue;
            }
            return this;
        };
    }
    if (!Array.prototype.contains) {
        Array.prototype.contains = function (obj) {
            return this.indexOf(obj) > -1;
        };
    }
    if (!Array.prototype.remove) {
        Array.prototype.remove = function (obj) {
            var from = this.indexOf(obj), to = from + 1,
                rest;

            if (from === -1) {
                return;
            }

            rest = this.slice((to || from) + 1 || this.length);
            this.length = from < 0 ? this.length + from : from;
            return this.push.apply(this, rest);
        };
    }
    if (!Date.prototype.toISOString) {
        (function () {
            function pad(number) {
                var r = String(number);
                if (r.length === 1) {
                    r = '0' + r;
                }
                return r;
            }
            Date.prototype.toISOString = function () {
                return this.getUTCFullYear() + '-' + pad(this.getUTCMonth() + 1) + '-' + pad(this.getUTCDate()) + 'T' + pad(this.getUTCHours()) + ':' + pad(this.getUTCMinutes()) + ':' + pad(this.getUTCSeconds()) + '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + 'Z';
            };
        }());
    }
    if (!Date.prototype.toDateString) {
        Date.prototype.toDateString = function (d) {
            return d.getDate() < 10 ? d.toString('d:e MMM yyyy') : d.toString('dd:e MMM yyyy');
        };
    }
    if (!Date.prototype.toTimeString) {
        Date.prototype.toTimeString = function (d) {
            var hours = d.getHours().toString(),
                minutes = d.getMinutes().toString();

            if (hours.length === 1) {
                hours = '0' + hours;
            }
            if (minutes.length === 1) {
                minutes = '0' + minutes;
            }

            return hours + ':' + minutes;
        };
    }
    if (!Date.prototype.toDateTimeString) {
        Date.prototype.toDateTimeString = function (d) {
            return d.toDateString() + ' ' + d.toTimeString();
        };
    }
    if (!Date.prototype.toShortDateString) {
        Date.prototype.toShortDateString = function (dt) {
            var m = dt.getMonth() + 1,
                d = dt.getDate();

            m = (m < 10 ? '0' : '') + m;
            d = (d < 10 ? '0' : '') + d;

            return Date.getDayName(dt.getDay()).substring(0, 3) + ' ' + d + '/' + m;
        };
    }
    if (!String.prototype.capitalize) {
        String.prototype.capitalize = function () {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        };
    }
    if (!String.prototype.contains) {
        String.prototype.contains = function (s) {
            return this.indexOf(s) > 0;
        };
    }
    if (!Number.prototype.isInteger) {
        Number.prototype.isInteger = function (n) {
            return typeof n === 'number' && parseFloat(n) === parseInt(n, 10) && !isNaN(n);
        };
    }
    if (!Element.prototype.on) {
        Element.prototype.on = function (ev, cb) {
            this.addEventListener(ev, cb, false);
        };
    }
    if (!Element.prototype.off) {
        Element.prototype.off = function (ev, cb) {
            this.removeEventListener(ev, cb);
        };
    }
    if (!Element.prototype.hasClass) {
        Element.prototype.hasClass = function (cls) {
            if (this.classList) {
                return this.classList.contains(cls);
            }
            return this.className && new RegExp('(\\s|^)' + cls + '(\\s|$)').test(this.className);
        };
    }
    if (!Element.prototype.addClass) {
        Element.prototype.addClass = function (cls) {
            if (this.classList) {
                this.classList.add(cls);
            } else if (!this.hasClass(cls)) {
                this.className += ' ' + cls;
            }
        };
    }
    if (!Element.prototype.removeClass) {
        Element.prototype.removeClass = function (cls) {
            if (this.classList) {
                this.classList.remove(cls);
            } else {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                this.className = this.className.replace(reg, ' ').replace(/(^\s*)|(\s*$)/g, '');
            }
        };
    }
}());