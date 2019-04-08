/*
 Highmaps JS v6.1.2 (2018-08-31)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (T, J) {
    "object" === typeof module && module.exports ? module.exports = T.document ? J(T) : J : "function" === typeof define && define.amd ? define(function () {
        return J(T)
    }) : T.Highcharts = J(T)
})("undefined" !== typeof window ? window : this, function (T) {
    var J = function () {
        var a = "undefined" === typeof T ? window : T,
            B = a.document,
            y = a.navigator && a.navigator.userAgent || "",
            D = B && B.createElementNS && !!B.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            p = /(edge|msie|trident)/i.test(y) && !a.opera,
            d = -1 !== y.indexOf("Firefox"),
            m = -1 !== y.indexOf("Chrome"),
            v = d && 4 > parseInt(y.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highmaps",
            version: "6.1.2",
            deg2rad: 2 * Math.PI / 360,
            doc: B,
            hasBidiBug: v,
            hasTouch: B && void 0 !== B.documentElement.ontouchstart,
            isMS: p,
            isWebKit: -1 !== y.indexOf("AppleWebKit"),
            isFirefox: d,
            isChrome: m,
            isSafari: !m && -1 !== y.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(y),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: a,
            marginNames: ["plotTop",
                "marginRight", "marginBottom", "plotLeft"
            ],
            noop: function () {},
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var B = a.charts,
            y = a.doc,
            D = a.win;
        a.error = function (p, d) {
            p = a.isNumber(p) ? "Highcharts error #" + p + ": www.highcharts.com/errors/" + p : p;
            if (d) throw Error(p);
            D.console && console.log(p)
        };
        a.Fx = function (a, d, m) {
            this.options = d;
            this.elem = a;
            this.prop = m
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0],
                    d = this.paths[1],
                    m = [],
                    v = this.now,
                    t = a.length,
                    q;
                if (1 === v) m = this.toD;
                else if (t === d.length && 1 > v)
                    for (; t--;) q = parseFloat(a[t]),
                        m[t] = isNaN(q) ? d[t] : v * parseFloat(d[t] - q) + q;
                else m = d;
                this.elem.attr("d", m, null, !0)
            },
            update: function () {
                var a = this.elem,
                    d = this.prop,
                    m = this.now,
                    v = this.options.step;
                if (this[d + "Setter"]) this[d + "Setter"]();
                else a.attr ? a.element && a.attr(d, m, null, !0) : a.style[d] = m + this.unit;
                v && v.call(a, m, this)
            },
            run: function (p, d, m) {
                var v = this,
                    t = v.options,
                    q = function (a) {
                        return q.stopped ? !1 : v.step(a)
                    },
                    l = D.requestAnimationFrame || function (a) {
                        setTimeout(a, 13)
                    },
                    g = function () {
                        for (var f = 0; f < a.timers.length; f++) a.timers[f]() || a.timers.splice(f--,
                            1);
                        a.timers.length && l(g)
                    };
                p !== d || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = p, this.end = d, this.unit = m, this.now = this.start, this.pos = 0, q.elem = this.elem, q.prop = this.prop, q() && 1 === a.timers.push(q) && l(g)) : (delete t.curAnim[this.prop], t.complete && 0 === a.keys(t.curAnim).length && t.complete.call(this.elem))
            },
            step: function (p) {
                var d = +new Date,
                    m, v = this.options,
                    t = this.elem,
                    q = v.complete,
                    l = v.duration,
                    g = v.curAnim;
                t.attr && !t.element ? p = !1 : p || d >= l + this.startTime ? (this.now = this.end, this.pos =
                    1, this.update(), m = g[this.prop] = !0, a.objectEach(g, function (a) {
                        !0 !== a && (m = !1)
                    }), m && q && q.call(t), p = !1) : (this.pos = v.easing((d - this.startTime) / l), this.now = this.start + (this.end - this.start) * this.pos, this.update(), p = !0);
                return p
            },
            initPath: function (p, d, m) {
                function v(a) {
                    var b, c;
                    for (e = a.length; e--;) b = "M" === a[e] || "L" === a[e], c = /[a-zA-Z]/.test(a[e + 3]), b && c && a.splice(e + 1, 0, a[e + 1], a[e + 2], a[e + 1], a[e + 2])
                }

                function t(a, b) {
                    for (; a.length < c;) {
                        a[0] = b[c - a.length];
                        var f = a.slice(0, w);
                        [].splice.apply(a, [0, 0].concat(f));
                        n && (f =
                            a.slice(a.length - w), [].splice.apply(a, [a.length, 0].concat(f)), e--)
                    }
                    a[0] = "M"
                }

                function q(a, e) {
                    for (var f = (c - a.length) / w; 0 < f && f--;) b = a.slice().splice(a.length / A - w, w * A), b[0] = e[c - w - f * w], h && (b[w - 6] = b[w - 2], b[w - 5] = b[w - 1]), [].splice.apply(a, [a.length / A, 0].concat(b)), n && f--
                }
                d = d || "";
                var l, g = p.startX,
                    f = p.endX,
                    h = -1 < d.indexOf("C"),
                    w = h ? 7 : 3,
                    c, b, e;
                d = d.split(" ");
                m = m.slice();
                var n = p.isArea,
                    A = n ? 2 : 1,
                    G;
                h && (v(d), v(m));
                if (g && f) {
                    for (e = 0; e < g.length; e++)
                        if (g[e] === f[0]) {
                            l = e;
                            break
                        } else if (g[0] === f[f.length - g.length + e]) {
                        l = e;
                        G = !0;
                        break
                    }
                    void 0 === l && (d = [])
                }
                d.length && a.isNumber(l) && (c = m.length + l * A * w, G ? (t(d, m), q(m, d)) : (t(m, d), q(d, m)));
                return [d, m]
            },
            fillSetter: function () {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            },
            strokeSetter: function () {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function () {
            var p, d = arguments,
                m, v = {},
                t = function (q, l) {
                    "object" !== typeof q && (q = {});
                    a.objectEach(l, function (g, f) {
                        !a.isObject(g, !0) || a.isClass(g) || a.isDOMElement(g) ? q[f] = l[f] : q[f] = t(q[f] || {},
                            g)
                    });
                    return q
                };
            !0 === d[0] && (v = d[1], d = Array.prototype.slice.call(d, 2));
            m = d.length;
            for (p = 0; p < m; p++) v = t(v, d[p]);
            return v
        };
        a.pInt = function (a, d) {
            return parseInt(a, d || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (p, d) {
            return !!p && "object" === typeof p && (!d || !a.isArray(p))
        };
        a.isDOMElement = function (p) {
            return a.isObject(p) && "number" === typeof p.nodeType
        };
        a.isClass = function (p) {
            var d =
                p && p.constructor;
            return !(!a.isObject(p, !0) || a.isDOMElement(p) || !d || !d.name || "Object" === d.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, d) {
            for (var m = a.length; m--;)
                if (a[m] === d) {
                    a.splice(m, 1);
                    break
                }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (p, d, m) {
            var v;
            a.isString(d) ? a.defined(m) ? p.setAttribute(d, m) : p && p.getAttribute && ((v = p.getAttribute(d)) || "class" !== d || (v = p.getAttribute(d + "Name"))) : a.defined(d) && a.isObject(d) &&
                a.objectEach(d, function (a, q) {
                    p.setAttribute(q, a)
                });
            return v
        };
        a.splat = function (p) {
            return a.isArray(p) ? p : [p]
        };
        a.syncTimeout = function (a, d, m) {
            if (d) return setTimeout(a, d, m);
            a.call(0, m)
        };
        a.clearTimeout = function (p) {
            a.defined(p) && clearTimeout(p)
        };
        a.extend = function (a, d) {
            var m;
            a || (a = {});
            for (m in d) a[m] = d[m];
            return a
        };
        a.pick = function () {
            var a = arguments,
                d, m, v = a.length;
            for (d = 0; d < v; d++)
                if (m = a[d], void 0 !== m && null !== m) return m
        };
        a.css = function (p, d) {
            a.isMS && !a.svg && d && void 0 !== d.opacity && (d.filter = "alpha(opacity\x3d" +
                100 * d.opacity + ")");
            a.extend(p.style, d)
        };
        a.createElement = function (p, d, m, v, t) {
            p = y.createElement(p);
            var q = a.css;
            d && a.extend(p, d);
            t && q(p, {
                padding: 0,
                border: "none",
                margin: 0
            });
            m && q(p, m);
            v && v.appendChild(p);
            return p
        };
        a.extendClass = function (p, d) {
            var m = function () {};
            m.prototype = new p;
            a.extend(m.prototype, d);
            return m
        };
        a.pad = function (a, d, m) {
            return Array((d || 2) + 1 - String(a).replace("-", "").length).join(m || 0) + a
        };
        a.relativeLength = function (a, d, m) {
            return /%$/.test(a) ? d * parseFloat(a) / 100 + (m || 0) : parseFloat(a)
        };
        a.wrap =
            function (a, d, m) {
                var p = a[d];
                a[d] = function () {
                    var a = Array.prototype.slice.call(arguments),
                        q = arguments,
                        l = this;
                    l.proceed = function () {
                        p.apply(l, arguments.length ? arguments : q)
                    };
                    a.unshift(p);
                    a = m.apply(this, a);
                    l.proceed = null;
                    return a
                }
            };
        a.formatSingle = function (p, d, m) {
            var v = /\.([0-9])/,
                t = a.defaultOptions.lang;
            /f$/.test(p) ? (m = (m = p.match(v)) ? m[1] : -1, null !== d && (d = a.numberFormat(d, m, t.decimalPoint, -1 < p.indexOf(",") ? t.thousandsSep : ""))) : d = (m || a.time).dateFormat(p, d);
            return d
        };
        a.format = function (p, d, m) {
            for (var v = "{",
                    t = !1, q, l, g, f, h = [], w; p;) {
                v = p.indexOf(v);
                if (-1 === v) break;
                q = p.slice(0, v);
                if (t) {
                    q = q.split(":");
                    l = q.shift().split(".");
                    f = l.length;
                    w = d;
                    for (g = 0; g < f; g++) w && (w = w[l[g]]);
                    q.length && (w = a.formatSingle(q.join(":"), w, m));
                    h.push(w)
                } else h.push(q);
                p = p.slice(v + 1);
                v = (t = !t) ? "}" : "{"
            }
            h.push(p);
            return h.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (p, d, m, v, t) {
            var q, l = p;
            m = a.pick(m, 1);
            q = p / m;
            d || (d = t ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10],
                !1 === v && (1 === m ? d = a.grep(d, function (a) {
                    return 0 === a % 1
                }) : .1 >= m && (d = [1 / m])));
            for (v = 0; v < d.length && !(l = d[v], t && l * m >= p || !t && q <= (d[v] + (d[v + 1] || d[v])) / 2); v++);
            return l = a.correctFloat(l * m, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, d) {
            var m = a.length,
                p, t;
            for (t = 0; t < m; t++) a[t].safeI = t;
            a.sort(function (a, l) {
                p = d(a, l);
                return 0 === p ? a.safeI - l.safeI : p
            });
            for (t = 0; t < m; t++) delete a[t].safeI
        };
        a.arrayMin = function (a) {
            for (var d = a.length, m = a[0]; d--;) a[d] < m && (m = a[d]);
            return m
        };
        a.arrayMax = function (a) {
            for (var d =
                    a.length, m = a[0]; d--;) a[d] > m && (m = a[d]);
            return m
        };
        a.destroyObjectProperties = function (p, d) {
            a.objectEach(p, function (a, v) {
                a && a !== d && a.destroy && a.destroy();
                delete p[v]
            })
        };
        a.discardElement = function (p) {
            var d = a.garbageBin;
            d || (d = a.createElement("div"));
            p && d.appendChild(p);
            d.innerHTML = ""
        };
        a.correctFloat = function (a, d) {
            return parseFloat(a.toPrecision(d || 14))
        };
        a.setAnimation = function (p, d) {
            d.renderer.globalAnimation = a.pick(p, d.options.chart.animation, !0)
        };
        a.animObject = function (p) {
            return a.isObject(p) ? a.merge(p) : {
                duration: p ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (p, d, m, v) {
            p = +p || 0;
            d = +d;
            var t = a.defaultOptions.lang,
                q = (p.toString().split(".")[1] || "").split("e")[0].length,
                l, g, f = p.toString().split("e"); - 1 === d ? d = Math.min(q, 20) : a.isNumber(d) ? d && f[1] && 0 > f[1] && (l = d + +f[1], 0 <= l ? (f[0] = (+f[0]).toExponential(l).split("e")[0], d = l) : (f[0] = f[0].split(".")[0] || 0, p = 20 > d ? (f[0] * Math.pow(10, f[1])).toFixed(d) : 0, f[1] = 0)) : d = 2;
            g = (Math.abs(f[1] ?
                f[0] : p) + Math.pow(10, -Math.max(d, q) - 1)).toFixed(d);
            q = String(a.pInt(g));
            l = 3 < q.length ? q.length % 3 : 0;
            m = a.pick(m, t.decimalPoint);
            v = a.pick(v, t.thousandsSep);
            p = (0 > p ? "-" : "") + (l ? q.substr(0, l) + v : "");
            p += q.substr(l).replace(/(\d{3})(?=\d)/g, "$1" + v);
            d && (p += m + g.slice(-d));
            f[1] && 0 !== +p && (p += "e" + f[1]);
            return p
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (p, d, m) {
            if ("width" === d) return Math.max(0, Math.min(p.offsetWidth, p.scrollWidth) - a.getStyle(p, "padding-left") - a.getStyle(p,
                "padding-right"));
            if ("height" === d) return Math.max(0, Math.min(p.offsetHeight, p.scrollHeight) - a.getStyle(p, "padding-top") - a.getStyle(p, "padding-bottom"));
            D.getComputedStyle || a.error(27, !0);
            if (p = D.getComputedStyle(p, void 0)) p = p.getPropertyValue(d), a.pick(m, "opacity" !== d) && (p = a.pInt(p));
            return p
        };
        a.inArray = function (p, d, m) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(d, p, m)
        };
        a.grep = function (p, d) {
            return (a.filterPolyfill || Array.prototype.filter).call(p, d)
        };
        a.find = Array.prototype.find ? function (a,
            d) {
            return a.find(d)
        } : function (a, d) {
            var m, p = a.length;
            for (m = 0; m < p; m++)
                if (d(a[m], m)) return a[m]
        };
        a.some = function (p, d, m) {
            return (a.somePolyfill || Array.prototype.some).call(p, d, m)
        };
        a.map = function (a, d) {
            for (var m = [], p = 0, t = a.length; p < t; p++) m[p] = d.call(a[p], a[p], p, a);
            return m
        };
        a.keys = function (p) {
            return (a.keysPolyfill || Object.keys).call(void 0, p)
        };
        a.reduce = function (p, d, m) {
            return (a.reducePolyfill || Array.prototype.reduce).apply(p, 2 < arguments.length ? [d, m] : [d])
        };
        a.offset = function (a) {
            var d = y.documentElement;
            a = a.parentElement ||
                a.parentNode ? a.getBoundingClientRect() : {
                    top: 0,
                    left: 0
                };
            return {
                top: a.top + (D.pageYOffset || d.scrollTop) - (d.clientTop || 0),
                left: a.left + (D.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
            }
        };
        a.stop = function (p, d) {
            for (var m = a.timers.length; m--;) a.timers[m].elem !== p || d && d !== a.timers[m].prop || (a.timers[m].stopped = !0)
        };
        a.each = function (p, d, m) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(p, d, m)
        };
        a.objectEach = function (a, d, m) {
            for (var p in a) a.hasOwnProperty(p) && d.call(m || a[p], a[p], p, a)
        };
        a.addEvent = function (p,
            d, m, v) {
            var t, q = p.addEventListener || a.addEventListenerPolyfill;
            t = "function" === typeof p && p.prototype ? p.prototype.protoEvents = p.prototype.protoEvents || {} : p.hcEvents = p.hcEvents || {};
            a.Point && p instanceof a.Point && p.series && p.series.chart && (p.series.chart.runTrackerClick = !0);
            q && q.call(p, d, m, !1);
            t[d] || (t[d] = []);
            t[d].push(m);
            v && a.isNumber(v.order) && (m.order = v.order, t[d].sort(function (a, g) {
                return a.order - g.order
            }));
            return function () {
                a.removeEvent(p, d, m)
            }
        };
        a.removeEvent = function (p, d, m) {
            function v(g, f) {
                var l =
                    p.removeEventListener || a.removeEventListenerPolyfill;
                l && l.call(p, g, f, !1)
            }

            function t(g) {
                var f, l;
                p.nodeName && (d ? (f = {}, f[d] = !0) : f = g, a.objectEach(f, function (a, c) {
                    if (g[c])
                        for (l = g[c].length; l--;) v(c, g[c][l])
                }))
            }
            var q, l;
            a.each(["protoEvents", "hcEvents"], function (g) {
                var f = p[g];
                f && (d ? (q = f[d] || [], m ? (l = a.inArray(m, q), -1 < l && (q.splice(l, 1), f[d] = q), v(d, m)) : (t(f), f[d] = [])) : (t(f), p[g] = {}))
            })
        };
        a.fireEvent = function (p, d, m, v) {
            var t, q, l, g, f;
            m = m || {};
            y.createEvent && (p.dispatchEvent || p.fireEvent) ? (t = y.createEvent("Events"),
                t.initEvent(d, !0, !0), a.extend(t, m), p.dispatchEvent ? p.dispatchEvent(t) : p.fireEvent(d, t)) : a.each(["protoEvents", "hcEvents"], function (h) {
                if (p[h])
                    for (q = p[h][d] || [], l = q.length, m.target || a.extend(m, {
                            preventDefault: function () {
                                m.defaultPrevented = !0
                            },
                            target: p,
                            type: d
                        }), g = 0; g < l; g++)(f = q[g]) && !1 === f.call(p, m) && m.preventDefault()
            });
            v && !m.defaultPrevented && v.call(p, m)
        };
        a.animate = function (p, d, m) {
            var v, t = "",
                q, l, g;
            a.isObject(m) || (g = arguments, m = {
                duration: g[2],
                easing: g[3],
                complete: g[4]
            });
            a.isNumber(m.duration) || (m.duration =
                400);
            m.easing = "function" === typeof m.easing ? m.easing : Math[m.easing] || Math.easeInOutSine;
            m.curAnim = a.merge(d);
            a.objectEach(d, function (f, g) {
                a.stop(p, g);
                l = new a.Fx(p, m, g);
                q = null;
                "d" === g ? (l.paths = l.initPath(p, p.d, d.d), l.toD = d.d, v = 0, q = 1) : p.attr ? v = p.attr(g) : (v = parseFloat(a.getStyle(p, g)) || 0, "opacity" !== g && (t = "px"));
                q || (q = f);
                q && q.match && q.match("px") && (q = q.replace(/px/g, ""));
                l.run(v, q, t)
            })
        };
        a.seriesType = function (p, d, m, v, t) {
            var q = a.getOptions(),
                l = a.seriesTypes;
            q.plotOptions[p] = a.merge(q.plotOptions[d], m);
            l[p] = a.extendClass(l[d] || function () {}, v);
            l[p].prototype.type = p;
            t && (l[p].prototype.pointClass = a.extendClass(a.Point, t));
            return l[p]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9),
                d = 0;
            return function () {
                return "highcharts-" + a + "-" + d++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function () {
            var p = [].slice.call(arguments);
            if (this[0]) return p[0] ? (new(a[a.isString(p[0]) ? p.shift() : "Chart"])(this[0], p[0], p[1]), this) : B[a.attr(this[0], "data-highcharts-chart")]
        })
    })(J);
    (function (a) {
        var B = a.each,
            y = a.isNumber,
            D = a.map,
            p = a.merge,
            d = a.pInt;
        a.Color = function (d) {
            if (!(this instanceof a.Color)) return new a.Color(d);
            this.init(d)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [d(a[1]), d(a[2]), d(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [d(a[1]), d(a[2]), d(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function (d) {
                var m,
                    p, q, l;
                if ((this.input = d = this.names[d && d.toLowerCase ? d.toLowerCase() : ""] || d) && d.stops) this.stops = D(d.stops, function (g) {
                    return new a.Color(g[1])
                });
                else if (d && d.charAt && "#" === d.charAt() && (m = d.length, d = parseInt(d.substr(1), 16), 7 === m ? p = [(d & 16711680) >> 16, (d & 65280) >> 8, d & 255, 1] : 4 === m && (p = [(d & 3840) >> 4 | (d & 3840) >> 8, (d & 240) >> 4 | d & 240, (d & 15) << 4 | d & 15, 1])), !p)
                    for (q = this.parsers.length; q-- && !p;) l = this.parsers[q], (m = l.regex.exec(d)) && (p = l.parse(m));
                this.rgba = p || []
            },
            get: function (a) {
                var d = this.input,
                    m = this.rgba,
                    q;
                this.stops ?
                    (q = p(d), q.stops = [].concat(q.stops), B(this.stops, function (l, g) {
                        q.stops[g] = [q.stops[g][0], l.get(a)]
                    })) : q = m && y(m[0]) ? "rgb" === a || !a && 1 === m[3] ? "rgb(" + m[0] + "," + m[1] + "," + m[2] + ")" : "a" === a ? m[3] : "rgba(" + m.join(",") + ")" : d;
                return q
            },
            brighten: function (a) {
                var m, p = this.rgba;
                if (this.stops) B(this.stops, function (d) {
                    d.brighten(a)
                });
                else if (y(a) && 0 !== a)
                    for (m = 0; 3 > m; m++) p[m] += d(255 * a), 0 > p[m] && (p[m] = 0), 255 < p[m] && (p[m] = 255);
                return this
            },
            setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function (a, d) {
                var m = this.rgba,
                    q = a.rgba;
                q.length && m && m.length ? (a = 1 !== q[3] || 1 !== m[3], d = (a ? "rgba(" : "rgb(") + Math.round(q[0] + (m[0] - q[0]) * (1 - d)) + "," + Math.round(q[1] + (m[1] - q[1]) * (1 - d)) + "," + Math.round(q[2] + (m[2] - q[2]) * (1 - d)) + (a ? "," + (q[3] + (m[3] - q[3]) * (1 - d)) : "") + ")") : d = a.input || "none";
                return d
            }
        };
        a.color = function (d) {
            return new a.Color(d)
        }
    })(J);
    (function (a) {
        var B = a.defined,
            y = a.each,
            D = a.extend,
            p = a.merge,
            d = a.pick,
            m = a.timeUnits,
            v = a.win;
        a.Time = function (a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {},
            update: function (a) {
                var q = d(a && a.useUTC,
                        !0),
                    l = this;
                this.options = a = p(!0, this.options || {}, a);
                this.Date = a.Date || v.Date;
                this.timezoneOffset = (this.useUTC = q) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(q && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, f) {
                    var g = f.getTime(),
                        w = g - l.getTimezoneOffset(f);
                    f.setTime(w);
                    a = f["getUTC" + a]();
                    f.setTime(g);
                    return a
                }, this.set = function (a, f, h) {
                    var g;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === f.getTimezoneOffset() %
                        60) f["set" + a](h);
                    else g = l.getTimezoneOffset(f), g = f.getTime() - g, f.setTime(g), f["setUTC" + a](h), a = l.getTimezoneOffset(f), g = f.getTime() + a, f.setTime(g)
                }) : q ? (this.get = function (a, f) {
                    return f["getUTC" + a]()
                }, this.set = function (a, f, l) {
                    return f["setUTC" + a](l)
                }) : (this.get = function (a, f) {
                    return f["get" + a]()
                }, this.set = function (a, f, l) {
                    return f["set" + a](l)
                })
            },
            makeTime: function (m, q, l, g, f, h) {
                var w, c, b;
                this.useUTC ? (w = this.Date.UTC.apply(0, arguments), c = this.getTimezoneOffset(w), w += c, b = this.getTimezoneOffset(w), c !== b ? w +=
                    b - c : c - 36E5 !== this.getTimezoneOffset(w - 36E5) || a.isSafari || (w -= 36E5)) : w = (new this.Date(m, q, d(l, 1), d(g, 0), d(f, 0), d(h, 0))).getTime();
                return w
            },
            timezoneOffsetFunction: function () {
                var d = this,
                    q = this.options,
                    l = v.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (q.timezone) {
                    if (l) return function (a) {
                        return 6E4 * -l.tz(a, q.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && q.getTimezoneOffset ? function (a) {
                    return 6E4 * q.getTimezoneOffset(a)
                } : function () {
                    return 6E4 * (d.timezoneOffset ||
                        0)
                }
            },
            dateFormat: function (d, q, l) {
                if (!a.defined(q) || isNaN(q)) return a.defaultOptions.lang.invalidDate || "";
                d = a.pick(d, "%Y-%m-%d %H:%M:%S");
                var g = this,
                    f = new this.Date(q),
                    h = this.get("Hours", f),
                    w = this.get("Day", f),
                    c = this.get("Date", f),
                    b = this.get("Month", f),
                    e = this.get("FullYear", f),
                    n = a.defaultOptions.lang,
                    A = n.weekdays,
                    G = n.shortWeekdays,
                    C = a.pad,
                    f = a.extend({
                        a: G ? G[w] : A[w].substr(0, 3),
                        A: A[w],
                        d: C(c),
                        e: C(c, 2, " "),
                        w: w,
                        b: n.shortMonths[b],
                        B: n.months[b],
                        m: C(b + 1),
                        o: b + 1,
                        y: e.toString().substr(2, 2),
                        Y: e,
                        H: C(h),
                        k: h,
                        I: C(h %
                            12 || 12),
                        l: h % 12 || 12,
                        M: C(g.get("Minutes", f)),
                        p: 12 > h ? "AM" : "PM",
                        P: 12 > h ? "am" : "pm",
                        S: C(f.getSeconds()),
                        L: C(Math.round(q % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(f, function (a, b) {
                    for (; - 1 !== d.indexOf("%" + b);) d = d.replace("%" + b, "function" === typeof a ? a.call(g, q) : a)
                });
                return l ? d.substr(0, 1).toUpperCase() + d.substr(1) : d
            },
            getTimeTicks: function (a, q, l, g) {
                var f = this,
                    h = [],
                    w = {},
                    c, b = new f.Date(q),
                    e = a.unitRange,
                    n = a.count || 1,
                    A;
                if (B(q)) {
                    f.set("Milliseconds", b, e >= m.second ? 0 : n * Math.floor(f.get("Milliseconds", b) / n));
                    e >= m.second &&
                        f.set("Seconds", b, e >= m.minute ? 0 : n * Math.floor(f.get("Seconds", b) / n));
                    e >= m.minute && f.set("Minutes", b, e >= m.hour ? 0 : n * Math.floor(f.get("Minutes", b) / n));
                    e >= m.hour && f.set("Hours", b, e >= m.day ? 0 : n * Math.floor(f.get("Hours", b) / n));
                    e >= m.day && f.set("Date", b, e >= m.month ? 1 : n * Math.floor(f.get("Date", b) / n));
                    e >= m.month && (f.set("Month", b, e >= m.year ? 0 : n * Math.floor(f.get("Month", b) / n)), c = f.get("FullYear", b));
                    e >= m.year && f.set("FullYear", b, c - c % n);
                    e === m.week && f.set("Date", b, f.get("Date", b) - f.get("Day", b) + d(g, 1));
                    c = f.get("FullYear",
                        b);
                    g = f.get("Month", b);
                    var G = f.get("Date", b),
                        C = f.get("Hours", b);
                    q = b.getTime();
                    f.variableTimezone && (A = l - q > 4 * m.month || f.getTimezoneOffset(q) !== f.getTimezoneOffset(l));
                    b = b.getTime();
                    for (q = 1; b < l;) h.push(b), b = e === m.year ? f.makeTime(c + q * n, 0) : e === m.month ? f.makeTime(c, g + q * n) : !A || e !== m.day && e !== m.week ? A && e === m.hour && 1 < n ? f.makeTime(c, g, G, C + q * n) : b + e * n : f.makeTime(c, g, G + q * n * (e === m.day ? 1 : 7)), q++;
                    h.push(b);
                    e <= m.hour && 1E4 > h.length && y(h, function (a) {
                        0 === a % 18E5 && "000000000" === f.dateFormat("%H%M%S%L", a) && (w[a] = "day")
                    })
                }
                h.info =
                    D(a, {
                        higherRanks: w,
                        totalRange: e * n
                    });
                return h
            }
        }
    })(J);
    (function (a) {
        var B = a.color,
            y = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: B("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (D) {
            a.defaultOptions = y(!0, a.defaultOptions, D);
            a.time.update(y(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(y(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function (y, p, d) {
            return a.time.dateFormat(y,
                p, d)
        }
    })(J);
    (function (a) {
        var B, y, D = a.addEvent,
            p = a.animate,
            d = a.attr,
            m = a.charts,
            v = a.color,
            t = a.css,
            q = a.createElement,
            l = a.defined,
            g = a.deg2rad,
            f = a.destroyObjectProperties,
            h = a.doc,
            w = a.each,
            c = a.extend,
            b = a.erase,
            e = a.grep,
            n = a.hasTouch,
            A = a.inArray,
            G = a.isArray,
            C = a.isFirefox,
            M = a.isMS,
            u = a.isObject,
            F = a.isString,
            k = a.isWebKit,
            E = a.merge,
            x = a.noop,
            L = a.objectEach,
            H = a.pick,
            r = a.pInt,
            z = a.removeEvent,
            N = a.stop,
            S = a.svg,
            K = a.SVG_NS,
            P = a.symbolSizes,
            O = a.win;
        B = a.SVGElement = function () {
            return this
        };
        c(B.prototype, {
            opacity: 1,
            SVG_NS: K,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function (a, b) {
                this.element = "span" === b ? q(b) : h.createElementNS(this.SVG_NS, b);
                this.renderer = a
            },
            animate: function (b, c, e) {
                c = a.animObject(H(c, this.renderer.globalAnimation, !0));
                0 !== c.duration ? (e && (c.complete = e), p(this, b, c)) : (this.attr(b, null, e), c.step && c.step.call(this));
                return this
            },
            complexColor: function (b, c, e) {
                var I = this.renderer,
                    r, z, k, n, f, K, g,
                    h, A, Q, d, x = [],
                    u;
                a.fireEvent(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    b.radialGradient ? z = "radialGradient" : b.linearGradient && (z = "linearGradient");
                    z && (k = b[z], f = I.gradients, g = b.stops, Q = e.radialReference, G(k) && (b[z] = k = {
                            x1: k[0],
                            y1: k[1],
                            x2: k[2],
                            y2: k[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === z && Q && !l(k.gradientUnits) && (n = k, k = E(k, I.getRadialAttr(Q, n), {
                            gradientUnits: "userSpaceOnUse"
                        })), L(k, function (a, b) {
                            "id" !== b && x.push(b, a)
                        }), L(g, function (a) {
                            x.push(a)
                        }), x = x.join(","), f[x] ? d = f[x].attr("id") :
                        (k.id = d = a.uniqueKey(), f[x] = K = I.createElement(z).attr(k).add(I.defs), K.radAttr = n, K.stops = [], w(g, function (b) {
                            0 === b[1].indexOf("rgba") ? (r = a.color(b[1]), h = r.get("rgb"), A = r.get("a")) : (h = b[1], A = 1);
                            b = I.createElement("stop").attr({
                                offset: b[0],
                                "stop-color": h,
                                "stop-opacity": A
                            }).add(K);
                            K.stops.push(b)
                        })), u = "url(" + I.url + "#" + d + ")", e.setAttribute(c, u), e.gradient = x, b.toString = function () {
                            return u
                        })
                })
            },
            applyTextOutline: function (c) {
                var e = this.element,
                    I, r, z, k, n; - 1 !== c.indexOf("contrast") && (c = c.replace(/contrast/g, this.renderer.getContrast(e.style.fill)));
                c = c.split(" ");
                r = c[c.length - 1];
                if ((z = c[0]) && "none" !== z && a.svg) {
                    this.fakeTS = !0;
                    c = [].slice.call(e.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    z = z.replace(/(^[\d\.]+)(.*?)$/g, function (a, b, c) {
                        return 2 * b + c
                    });
                    for (n = c.length; n--;) I = c[n], "highcharts-text-outline" === I.getAttribute("class") && b(c, e.removeChild(I));
                    k = e.firstChild;
                    w(c, function (a, b) {
                        0 === b && (a.setAttribute("x", e.getAttribute("x")), b = e.getAttribute("y"), a.setAttribute("y", b || 0), null === b && e.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        d(a, {
                            "class": "highcharts-text-outline",
                            fill: r,
                            stroke: r,
                            "stroke-width": z,
                            "stroke-linejoin": "round"
                        });
                        e.insertBefore(a, k)
                    })
                }
            },
            attr: function (a, b, c, e) {
                var I, r = this.element,
                    z, k = this,
                    n, f;
                "string" === typeof a && void 0 !== b && (I = a, a = {}, a[I] = b);
                "string" === typeof a ? k = (this[a + "Getter"] || this._defaultGetter).call(this, a, r) : (L(a, function (b, c) {
                    n = !1;
                    e || N(this, c);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(c) && (z || (this.symbolAttr(a), z = !0), n = !0);
                    !this.rotation || "x" !== c && "y" !== c || (this.doTransform = !0);
                    n || (f = this[c + "Setter"] ||
                        this._defaultSetter, f.call(this, b, c, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c) && this.updateShadows(c, b, f))
                }, this), this.afterSetters());
                c && c.call(this);
                return k
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, b, c) {
                for (var e = this.shadows, I = e.length; I--;) c.call(e[I], "height" === a ? Math.max(b - (e[I].cutHeight || 0), 0) : "d" === a ? this.d : b, a, e[I])
            },
            addClass: function (a, b) {
                var c = this.attr("class") || ""; - 1 === c.indexOf(a) &&
                    (b || (a = (c + (c ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== A(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var b = this;
                w("x y r start end width height innerR anchorX anchorY".split(" "), function (c) {
                    b[c] = H(a[c], b[c])
                });
                b.attr({
                    d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" +
                    this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, b) {
                var c;
                b = b || a.strokeWidth || 0;
                c = Math.round(b) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + c;
                a.y = Math.floor(a.y || this.y || 0) + c;
                a.width = Math.floor((a.width || this.width || 0) - 2 * c);
                a.height = Math.floor((a.height || this.height || 0) - 2 * c);
                l(a.strokeWidth) && (a.strokeWidth = b);
                return a
            },
            css: function (a) {
                var b = this.styles,
                    e = {},
                    I = this.element,
                    z, k = "",
                    n, f = !b,
                    K = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                b && L(a, function (a, c) {
                    a !== b[c] && (e[c] = a, f = !0)
                });
                f && (b && (a = c(b, e)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === I.nodeName.toLowerCase() && a.width && (z = this.textWidth = r(a.width))), this.styles = a, z && !S && this.renderer.forExport && delete a.width, I.namespaceURI === this.SVG_NS ? (n = function (a, b) {
                    return "-" + b.toLowerCase()
                }, L(a, function (a, b) {
                    -1 === A(b, K) && (k += b.replace(/([A-Z])/g, n) + ":" + a + ";")
                }), k && d(I, "style", k)) : t(I, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, b) {
                var c = this,
                    e = c.element;
                n && "click" === a ? (e.ontouchstart = function (a) {
                    c.touchEventFired = Date.now();
                    a.preventDefault();
                    b.call(e, a)
                }, e.onclick = function (a) {
                    (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (c.touchEventFired || 0)) && b.call(e, a)
                }) : e["on" + a] = b;
                return this
            },
            setRadialReference: function (a) {
                var b = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                b && b.radAttr && b.animate(this.renderer.getRadialAttr(a,
                    b.radAttr));
                return this
            },
            translate: function (a, b) {
                return this.attr({
                    translateX: a,
                    translateY: b
                })
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0,
                    b = this.translateY || 0,
                    c = this.scaleX,
                    e = this.scaleY,
                    r = this.inverted,
                    z = this.rotation,
                    k = this.matrix,
                    n = this.element;
                r && (a += this.width, b += this.height);
                a = ["translate(" + a + "," + b + ")"];
                l(k) && a.push("matrix(" + k.join(",") + ")");
                r ? a.push("rotate(90) scale(-1,1)") : z && a.push("rotate(" + z + " " + H(this.rotationOriginX,
                    n.getAttribute("x"), 0) + " " + H(this.rotationOriginY, n.getAttribute("y") || 0) + ")");
                (l(c) || l(e)) && a.push("scale(" + H(c, 1) + " " + H(e, 1) + ")");
                a.length && n.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, c, e) {
                var r, z, I, k, n = {};
                z = this.renderer;
                I = z.alignedObjects;
                var f, K;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = c, !e || F(e)) this.alignTo = r = e || "renderer", b(I, this), I.push(this), e = null
                } else a = this.alignOptions, c = this.alignByTranslate,
                    r = this.alignTo;
                e = H(e, z[r], z);
                r = a.align;
                z = a.verticalAlign;
                I = (e.x || 0) + (a.x || 0);
                k = (e.y || 0) + (a.y || 0);
                "right" === r ? f = 1 : "center" === r && (f = 2);
                f && (I += (e.width - (a.width || 0)) / f);
                n[c ? "translateX" : "x"] = Math.round(I);
                "bottom" === z ? K = 1 : "middle" === z && (K = 2);
                K && (k += (e.height - (a.height || 0)) / K);
                n[c ? "translateY" : "y"] = Math.round(k);
                this[this.placed ? "animate" : "attr"](n);
                this.placed = !0;
                this.alignAttr = n;
                return this
            },
            getBBox: function (a, b) {
                var e, r = this.renderer,
                    z, I = this.element,
                    k = this.styles,
                    n, f = this.textStr,
                    K, h = r.cache,
                    A = r.cacheKeys,
                    x;
                b = H(b, this.rotation);
                z = b * g;
                n = k && k.fontSize;
                l(f) && (x = f.toString(), -1 === x.indexOf("\x3c") && (x = x.replace(/[0-9]/g, "0")), x += ["", b || 0, n, this.textWidth, k && k.textOverflow].join());
                x && !a && (e = h[x]);
                if (!e) {
                    if (I.namespaceURI === this.SVG_NS || r.forExport) {
                        try {
                            (K = this.fakeTS && function (a) {
                                w(I.querySelectorAll(".highcharts-text-outline"), function (b) {
                                    b.style.display = a
                                })
                            }) && K("none"), e = I.getBBox ? c({}, I.getBBox()) : {
                                width: I.offsetWidth,
                                height: I.offsetHeight
                            }, K && K("")
                        } catch (X) {}
                        if (!e || 0 > e.width) e = {
                            width: 0,
                            height: 0
                        }
                    } else e =
                        this.htmlGetBBox();
                    r.isSVG && (a = e.width, r = e.height, k && "11px" === k.fontSize && 17 === Math.round(r) && (e.height = r = 14), b && (e.width = Math.abs(r * Math.sin(z)) + Math.abs(a * Math.cos(z)), e.height = Math.abs(r * Math.cos(z)) + Math.abs(a * Math.sin(z))));
                    if (x && 0 < e.height) {
                        for (; 250 < A.length;) delete h[A.shift()];
                        h[x] || A.push(x);
                        h[x] = e
                    }
                }
                return e
            },
            show: function (a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function (a) {
                var b = this;
                b.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function () {
                        b.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function (a) {
                var b = this.renderer,
                    c = this.element,
                    e;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && b.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) e = this.zIndexSetter();
                e || (a ? a.element : b.box).appendChild(c);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var b = a.parentNode;
                b && b.removeChild(a)
            },
            destroy: function () {
                var a = this,
                    c = a.element || {},
                    e = a.renderer.isSVG && "SPAN" === c.nodeName &&
                    a.parentGroup,
                    r = c.ownerSVGElement,
                    z = a.clipPath;
                c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
                N(a);
                z && r && (w(r.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                    var b = a.getAttribute("clip-path"),
                        c = z.element.id;
                    (-1 < b.indexOf("(#" + c + ")") || -1 < b.indexOf('("#' + c + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = z.destroy());
                if (a.stops) {
                    for (r = 0; r < a.stops.length; r++) a.stops[r] = a.stops[r].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(c);
                for (a.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;) c =
                    e.parentGroup, a.safeRemoveChild(e.div), delete e.div, e = c;
                a.alignTo && b(a.renderer.alignedObjects, a);
                L(a, function (b, c) {
                    delete a[c]
                });
                return null
            },
            shadow: function (a, b, c) {
                var e = [],
                    r, z, I = this.element,
                    k, n, f, K;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    n = H(a.width, 3);
                    f = (a.opacity || .15) / n;
                    K = this.parentInverted ? "(-1,-1)" : "(" + H(a.offsetX, 1) + ", " + H(a.offsetY, 1) + ")";
                    for (r = 1; r <= n; r++) z = I.cloneNode(0), k = 2 * n + 1 - 2 * r, d(z, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": f * r,
                        "stroke-width": k,
                        transform: "translate" +
                            K,
                        fill: "none"
                    }), c && (d(z, "height", Math.max(d(z, "height") - k, 0)), z.cutHeight = k), b ? b.element.appendChild(z) : I.parentNode && I.parentNode.insertBefore(z, I), e.push(z);
                    this.shadows = e
                }
                return this
            },
            destroyShadows: function () {
                w(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = H(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) :
                    null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, b, c) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[b] !== a && (c.setAttribute(b, a), this[b] = a)
            },
            dashstyleSetter: function (a) {
                var b, c = this["stroke-width"];
                "inherit" === c && (c = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/,
                        "").split(",");
                    for (b = a.length; b--;) a[b] = r(a[b]) * c;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                } [a])
            },
            opacitySetter: function (a, b, c) {
                this[b] = a;
                c.setAttribute(b, a)
            },
            titleSetter: function (a) {
                var b = this.element.getElementsByTagName("title")[0];
                b || (b = h.createElementNS(this.SVG_NS, "title"), this.element.appendChild(b));
                b.firstChild && b.removeChild(b.firstChild);
                b.appendChild(h.createTextNode(String(H(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, b, c) {
                "string" === typeof a ? c.setAttribute(b, a) : a && this.complexColor(a, b, c)
            },
            visibilitySetter: function (a, b, c) {
                "inherit" === a ? c.removeAttribute(b) : this[b] !== a && c.setAttribute(b, a);
                this[b] = a
            },
            zIndexSetter: function (a, b) {
                var c = this.renderer,
                    e = this.parentGroup,
                    z = (e || c).element || c.box,
                    k, n = this.element,
                    f, K, c = z === c.box;
                k = this.added;
                var I;
                l(a) ? (n.setAttribute("data-z-index", a), a = +a, this[b] === a && (k = !1)) : l(this[b]) && n.removeAttribute("data-z-index");
                this[b] = a;
                if (k) {
                    (a = this.zIndex) && e && (e.handleZ = !0);
                    b = z.childNodes;
                    for (I = b.length - 1; 0 <= I && !f; I--)
                        if (e = b[I], k = e.getAttribute("data-z-index"), K = !l(k), e !== n)
                            if (0 > a && K && !c && !I) z.insertBefore(n, b[I]), f = !0;
                            else if (r(k) <= a || K && (!l(a) || 0 <= a)) z.insertBefore(n, b[I + 1] || null), f = !0;
                    f || (z.insertBefore(n, b[c ? 3 : 0] || null), f = !0)
                }
                return f
            },
            _defaultSetter: function (a, b, c) {
                c.setAttribute(b, a)
            }
        });
        B.prototype.yGetter = B.prototype.xGetter;
        B.prototype.translateXSetter = B.prototype.translateYSetter = B.prototype.rotationSetter = B.prototype.verticalAlignSetter = B.prototype.rotationOriginXSetter = B.prototype.rotationOriginYSetter = B.prototype.scaleXSetter = B.prototype.scaleYSetter = B.prototype.matrixSetter = function (a, b) {
            this[b] = a;
            this.doTransform = !0
        };
        B.prototype["stroke-widthSetter"] = B.prototype.strokeSetter = function (a, b, c) {
            this[b] = a;
            this.stroke && this["stroke-width"] ?
                (B.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
        };
        y = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        c(y.prototype, {
            Element: B,
            SVG_NS: K,
            init: function (a, b, c, e, r, z) {
                var n;
                e = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(e));
                n = e.element;
                a.appendChild(n);
                d(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") &&
                    d(n, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = n;
                this.boxWrapper = e;
                this.alignedObjects = [];
                this.url = (C || k) && h.getElementsByTagName("base").length ? O.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(h.createTextNode("Created with Highmaps 6.1.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = z;
                this.forExport = r;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b,
                    c, !1);
                var f;
                C && a.getBoundingClientRect && (b = function () {
                    t(a, {
                        left: 0,
                        top: 0
                    });
                    f = a.getBoundingClientRect();
                    t(a, {
                        left: Math.ceil(f.left) - f.left + "px",
                        top: Math.ceil(f.top) - f.top + "px"
                    })
                }, b(), this.unSubPixelFix = D(O, "resize", b))
            },
            getStyle: function (a) {
                return this.style = c({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a =
                    this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                f(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var b = new this.Element;
                b.init(this, a);
                return b
            },
            draw: x,
            getRadialAttr: function (a, b) {
                return {
                    cx: a[0] - a[2] / 2 + b.cx * a[2],
                    cy: a[1] - a[2] / 2 + b.cy * a[2],
                    r: b.r * a[2]
                }
            },
            getSpanWidth: function (a) {
                return a.getBBox(!0).width
            },
            applyEllipsis: function (a, b, c, e) {
                var r = a.rotation,
                    z = c,
                    k, n = 0,
                    f =
                    c.length,
                    K = function (a) {
                        b.removeChild(b.firstChild);
                        a && b.appendChild(h.createTextNode(a))
                    },
                    g;
                a.rotation = 0;
                z = this.getSpanWidth(a, b);
                if (g = z > e) {
                    for (; n <= f;) k = Math.ceil((n + f) / 2), z = c.substring(0, k) + "\u2026", K(z), z = this.getSpanWidth(a, b), n === f ? n = f + 1 : z > e ? f = k - 1 : n = k;
                    0 === f && K("")
                }
                a.rotation = r;
                return g
            },
            escapes: {
                "\x26": "\x26amp;",
                "\x3c": "\x26lt;",
                "\x3e": "\x26gt;",
                "'": "\x26#39;",
                '"': "\x26quot;"
            },
            buildText: function (a) {
                var b = a.element,
                    c = this,
                    z = c.forExport,
                    k = H(a.textStr, "").toString(),
                    n = -1 !== k.indexOf("\x3c"),
                    f = b.childNodes,
                    g, l = d(b, "x"),
                    x = a.styles,
                    I = a.textWidth,
                    u = x && x.lineHeight,
                    E = x && x.textOutline,
                    C = x && "ellipsis" === x.textOverflow,
                    N = x && "nowrap" === x.whiteSpace,
                    q = x && x.fontSize,
                    G, m, P = f.length,
                    x = I && !a.added && this.box,
                    F = function (a) {
                        var e;
                        e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : q || c.style.fontSize || 12;
                        return u ? r(u) : c.fontMetrics(e, a.getAttribute("style") ? a : b).h
                    },
                    p = function (a, b) {
                        L(c.escapes, function (c, e) {
                            b && -1 !== A(c, b) || (a = a.toString().replace(new RegExp(c, "g"), e))
                        });
                        return a
                    },
                    O = function (a, b) {
                        var c;
                        c = a.indexOf("\x3c");
                        a = a.substring(c, a.indexOf("\x3e") - c);
                        c = a.indexOf(b + "\x3d");
                        if (-1 !== c && (c = c + b.length + 1, b = a.charAt(c), '"' === b || "'" === b)) return a = a.substring(c + 1), a.substring(0, a.indexOf(b))
                    };
                G = [k, C, N, u, E, q, I].join();
                if (G !== a.textCache) {
                    for (a.textCache = G; P--;) b.removeChild(f[P]);
                    n || E || C || I || -1 !== k.indexOf(" ") ? (x && x.appendChild(b), k = n ? k.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
                        "\x3c/span\x3e").split(/<br.*?>/g) : [k], k = e(k, function (a) {
                        return "" !== a
                    }), w(k, function (e, r) {
                        var k, n = 0;
                        e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        k = e.split("|||");
                        w(k, function (e) {
                            if ("" !== e || 1 === k.length) {
                                var f = {},
                                    x = h.createElementNS(c.SVG_NS, "tspan"),
                                    A, u;
                                (A = O(e, "class")) && d(x, "class", A);
                                if (A = O(e, "style")) A = A.replace(/(;| |^)color([ :])/, "$1fill$2"), d(x, "style", A);
                                (u = O(e, "href")) && !z && (d(x, "onclick", 'location.href\x3d"' + u + '"'), d(x, "class", "highcharts-anchor"),
                                    t(x, {
                                        cursor: "pointer"
                                    }));
                                e = p(e.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== e) {
                                    x.appendChild(h.createTextNode(e));
                                    n ? f.dx = 0 : r && null !== l && (f.x = l);
                                    d(x, f);
                                    b.appendChild(x);
                                    !n && m && (!S && z && t(x, {
                                        display: "block"
                                    }), d(x, "dy", F(x)));
                                    if (I) {
                                        f = e.replace(/([^\^])-/g, "$1- ").split(" ");
                                        u = 1 < k.length || r || 1 < f.length && !N;
                                        var w = [],
                                            E, q = F(x),
                                            G = a.rotation;
                                        for (C && (g = c.applyEllipsis(a, x, e, I)); !C && u && (f.length || w.length);) a.rotation = 0, E = c.getSpanWidth(a, x), e = E > I, void 0 === g && (g = e), e && 1 !== f.length ? (x.removeChild(x.firstChild),
                                            w.unshift(f.pop())) : (f = w, w = [], f.length && !N && (x = h.createElementNS(K, "tspan"), d(x, {
                                            dy: q,
                                            x: l
                                        }), A && d(x, "style", A), b.appendChild(x)), E > I && (I = E + 1)), f.length && x.appendChild(h.createTextNode(f.join(" ").replace(/- /g, "-")));
                                        a.rotation = G
                                    }
                                    n++
                                }
                            }
                        });
                        m = m || b.childNodes.length
                    }), C && g && a.attr("title", p(a.textStr, ["\x26lt;", "\x26gt;"])), x && x.removeChild(b), E && a.applyTextOutline && a.applyTextOutline(E)) : b.appendChild(h.createTextNode(p(k)))
                }
            },
            getContrast: function (a) {
                a = v(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 <
                    a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, b, e, r, z, k, n, f, K) {
                var x = this.label(a, b, e, K, null, null, null, null, "button"),
                    g = 0;
                x.attr(E({
                    padding: 8,
                    r: 2
                }, z));
                var l, A, h, I;
                z = E({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, z);
                l = z.style;
                delete z.style;
                k = E(z, {
                    fill: "#e6e6e6"
                }, k);
                A = k.style;
                delete k.style;
                n = E(z, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, n);
                h = n.style;
                delete n.style;
                f = E(z, {
                    style: {
                        color: "#cccccc"
                    }
                }, f);
                I = f.style;
                delete f.style;
                D(x.element, M ? "mouseover" : "mouseenter", function () {
                    3 !== g && x.setState(1)
                });
                D(x.element, M ? "mouseout" : "mouseleave", function () {
                    3 !== g && x.setState(g)
                });
                x.setState = function (a) {
                    1 !== a && (x.state = g = a);
                    x.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    x.attr([z, k, n, f][a || 0]).css([l, A, h, I][a || 0])
                };
                x.attr(z).css(c({
                    cursor: "default"
                }, l));
                return x.on("click", function (a) {
                    3 !== g && r.call(x, a)
                })
            },
            crispLine: function (a,
                b) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + b % 2 / 2);
                return a
            },
            path: function (a) {
                var b = {
                    fill: "none"
                };
                G(a) ? b.d = a : u(a) && c(b, a);
                return this.createElement("path").attr(b)
            },
            circle: function (a, b, c) {
                a = u(a) ? a : {
                    x: a,
                    y: b,
                    r: c
                };
                b = this.createElement("circle");
                b.xSetter = b.ySetter = function (a, b, c) {
                    c.setAttribute("c" + b, a)
                };
                return b.attr(a)
            },
            arc: function (a, b, c, e, r, z) {
                u(a) ? (e = a, b = e.y, c = e.r, a = e.x) : e = {
                    innerR: e,
                    start: r,
                    end: z
                };
                a = this.symbol("arc", a, b, c, c, e);
                a.r = c;
                return a
            },
            rect: function (a,
                b, c, e, r, z) {
                r = u(a) ? a.r : r;
                var k = this.createElement("rect");
                a = u(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: b,
                    width: Math.max(c, 0),
                    height: Math.max(e, 0)
                };
                void 0 !== z && (a.strokeWidth = z, a = k.crisp(a));
                a.fill = "none";
                r && (a.r = r);
                k.rSetter = function (a, b, c) {
                    d(c, {
                        rx: a,
                        ry: a
                    })
                };
                return k.attr(a)
            },
            setSize: function (a, b, c) {
                var e = this.alignedObjects,
                    r = e.length;
                this.width = a;
                this.height = b;
                for (this.boxWrapper.animate({
                        width: a,
                        height: b
                    }, {
                        step: function () {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: H(c, !0) ?
                            void 0 : 0
                    }); r--;) e[r].align()
            },
            g: function (a) {
                var b = this.createElement("g");
                return a ? b.attr({
                    "class": "highcharts-" + a
                }) : b
            },
            image: function (a, b, e, r, z, k) {
                var n = {
                        preserveAspectRatio: "none"
                    },
                    f, K = function (a, b) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b)
                    },
                    x = function (b) {
                        K(f.element, a);
                        k.call(f, b)
                    };
                1 < arguments.length && c(n, {
                    x: b,
                    y: e,
                    width: r,
                    height: z
                });
                f = this.createElement("image").attr(n);
                k ? (K(f.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),
                    n = new O.Image, D(n, "load", x), n.src = a, n.complete && x({})) : K(f.element, a);
                return f
            },
            symbol: function (a, b, e, r, z, k) {
                var n = this,
                    f, K = /^url\((.*?)\)$/,
                    x = K.test(a),
                    g = !x && (this.symbols[a] ? a : "circle"),
                    A = g && this.symbols[g],
                    d = l(b) && A && A.call(this.symbols, Math.round(b), Math.round(e), r, z, k),
                    u, E;
                A ? (f = this.path(d), f.attr("fill", "none"), c(f, {
                    symbolName: g,
                    x: b,
                    y: e,
                    width: r,
                    height: z
                }), k && c(f, k)) : x && (u = a.match(K)[1], f = this.image(u), f.imgwidth = H(P[u] && P[u].width, k && k.width), f.imgheight = H(P[u] && P[u].height, k && k.height), E = function () {
                    f.attr({
                        width: f.width,
                        height: f.height
                    })
                }, w(["width", "height"], function (a) {
                    f[a + "Setter"] = function (a, b) {
                        var c = {},
                            e = this["img" + b],
                            r = "width" === b ? "translateX" : "translateY";
                        this[b] = a;
                        l(e) && (this.element && this.element.setAttribute(b, e), this.alignByTranslate || (c[r] = ((this[b] || 0) - e) / 2, this.attr(c)))
                    }
                }), l(b) && f.attr({
                    x: b,
                    y: e
                }), f.isImg = !0, l(f.imgwidth) && l(f.imgheight) ? E() : (f.attr({
                    width: 0,
                    height: 0
                }), q("img", {
                    onload: function () {
                        var a = m[n.chartIndex];
                        0 === this.width && (t(this, {
                            position: "absolute",
                            top: "-999em"
                        }), h.body.appendChild(this));
                        P[u] = {
                            width: this.width,
                            height: this.height
                        };
                        f.imgwidth = this.width;
                        f.imgheight = this.height;
                        f.element && E();
                        this.parentNode && this.parentNode.removeChild(this);
                        n.imgCount--;
                        if (!n.imgCount && a && a.onload) a.onload()
                    },
                    src: u
                }), this.imgCount++));
                return f
            },
            symbols: {
                circle: function (a, b, c, e) {
                    return this.arc(a + c / 2, b + e / 2, c / 2, e / 2, {
                        start: 0,
                        end: 2 * Math.PI,
                        open: !1
                    })
                },
                square: function (a, b, c, e) {
                    return ["M", a, b, "L", a + c, b, a + c, b + e, a, b + e, "Z"]
                },
                triangle: function (a, b, c, e) {
                    return ["M", a + c / 2, b, "L", a + c, b + e, a, b + e, "Z"]
                },
                "triangle-down": function (a,
                    b, c, e) {
                    return ["M", a, b, "L", a + c, b, a + c / 2, b + e, "Z"]
                },
                diamond: function (a, b, c, e) {
                    return ["M", a + c / 2, b, "L", a + c, b + e / 2, a + c / 2, b + e, a, b + e / 2, "Z"]
                },
                arc: function (a, b, c, e, r) {
                    var z = r.start,
                        k = r.r || c,
                        f = r.r || e || c,
                        n = r.end - .001;
                    c = r.innerR;
                    e = H(r.open, .001 > Math.abs(r.end - r.start - 2 * Math.PI));
                    var K = Math.cos(z),
                        x = Math.sin(z),
                        g = Math.cos(n),
                        n = Math.sin(n);
                    r = .001 > r.end - z - Math.PI ? 0 : 1;
                    k = ["M", a + k * K, b + f * x, "A", k, f, 0, r, 1, a + k * g, b + f * n];
                    l(c) && k.push(e ? "M" : "L", a + c * g, b + c * n, "A", c, c, 0, r, 0, a + c * K, b + c * x);
                    k.push(e ? "" : "Z");
                    return k
                },
                callout: function (a,
                    b, c, e, r) {
                    var z = Math.min(r && r.r || 0, c, e),
                        k = z + 6,
                        f = r && r.anchorX;
                    r = r && r.anchorY;
                    var n;
                    n = ["M", a + z, b, "L", a + c - z, b, "C", a + c, b, a + c, b, a + c, b + z, "L", a + c, b + e - z, "C", a + c, b + e, a + c, b + e, a + c - z, b + e, "L", a + z, b + e, "C", a, b + e, a, b + e, a, b + e - z, "L", a, b + z, "C", a, b, a, b, a + z, b];
                    f && f > c ? r > b + k && r < b + e - k ? n.splice(13, 3, "L", a + c, r - 6, a + c + 6, r, a + c, r + 6, a + c, b + e - z) : n.splice(13, 3, "L", a + c, e / 2, f, r, a + c, e / 2, a + c, b + e - z) : f && 0 > f ? r > b + k && r < b + e - k ? n.splice(33, 3, "L", a, r + 6, a - 6, r, a, r - 6, a, b + z) : n.splice(33, 3, "L", a, e / 2, f, r, a, e / 2, a, b + z) : r && r > e && f > a + k && f < a + c - k ? n.splice(23,
                        3, "L", f + 6, b + e, f, b + e + 6, f - 6, b + e, a + z, b + e) : r && 0 > r && f > a + k && f < a + c - k && n.splice(3, 3, "L", f - 6, b, f, b - 6, f + 6, b, c - z, b);
                    return n
                }
            },
            clipRect: function (b, c, e, r) {
                var z = a.uniqueKey(),
                    k = this.createElement("clipPath").attr({
                        id: z
                    }).add(this.defs);
                b = this.rect(b, c, e, r, 0).add(k);
                b.id = z;
                b.clipPath = k;
                b.count = 0;
                return b
            },
            text: function (a, b, c, e) {
                var r = {};
                if (e && (this.allowHTML || !this.forExport)) return this.html(a, b, c);
                r.x = Math.round(b || 0);
                c && (r.y = Math.round(c));
                if (a || 0 === a) r.text = a;
                a = this.createElement("text").attr(r);
                e || (a.xSetter =
                    function (a, b, c) {
                        var e = c.getElementsByTagName("tspan"),
                            r, z = c.getAttribute(b),
                            k;
                        for (k = 0; k < e.length; k++) r = e[k], r.getAttribute(b) === z && r.setAttribute(b, a);
                        c.setAttribute(b, a)
                    });
                return a
            },
            fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? r(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                }
            },
            rotCorr: function (a, b, c) {
                var e = a;
                b && c && (e = Math.max(e * Math.cos(b * g),
                    4));
                return {
                    x: -a / 3 * Math.sin(b * g),
                    y: e
                }
            },
            label: function (b, e, r, k, f, n, K, x, g) {
                var A = this,
                    h = A.g("button" !== g && "label"),
                    u = h.text = A.text("", 0, 0, K).attr({
                        zIndex: 1
                    }),
                    d, C, S = 0,
                    N = 3,
                    q = 0,
                    G, H, m, P, F, p = {},
                    O, L, I = /^url\((.*?)\)$/.test(k),
                    M = I,
                    t, v, Q, U;
                g && h.addClass("highcharts-" + g);
                M = I;
                t = function () {
                    return (O || 0) % 2 / 2
                };
                v = function () {
                    var a = u.element.style,
                        b = {};
                    C = (void 0 === G || void 0 === H || F) && l(u.textStr) && u.getBBox();
                    h.width = (G || C.width || 0) + 2 * N + q;
                    h.height = (H || C.height || 0) + 2 * N;
                    L = N + A.fontMetrics(a && a.fontSize, u).b;
                    M && (d || (h.box =
                        d = A.symbols[k] || I ? A.symbol(k) : A.rect(), d.addClass(("button" === g ? "" : "highcharts-label-box") + (g ? " highcharts-" + g + "-box" : "")), d.add(h), a = t(), b.x = a, b.y = (x ? -L : 0) + a), b.width = Math.round(h.width), b.height = Math.round(h.height), d.attr(c(b, p)), p = {})
                };
                Q = function () {
                    var a = q + N,
                        b;
                    b = x ? 0 : L;
                    l(G) && C && ("center" === F || "right" === F) && (a += {
                        center: .5,
                        right: 1
                    } [F] * (G - C.width));
                    if (a !== u.x || b !== u.y) u.attr("x", a), u.hasBoxWidthChanged && (C = u.getBBox(!0), v()), void 0 !== b && u.attr("y", b);
                    u.x = a;
                    u.y = b
                };
                U = function (a, b) {
                    d ? d.attr(a, b) : p[a] =
                        b
                };
                h.onAdd = function () {
                    u.add(h);
                    h.attr({
                        text: b || 0 === b ? b : "",
                        x: e,
                        y: r
                    });
                    d && l(f) && h.attr({
                        anchorX: f,
                        anchorY: n
                    })
                };
                h.widthSetter = function (b) {
                    G = a.isNumber(b) ? b : null
                };
                h.heightSetter = function (a) {
                    H = a
                };
                h["text-alignSetter"] = function (a) {
                    F = a
                };
                h.paddingSetter = function (a) {
                    l(a) && a !== N && (N = h.padding = a, Q())
                };
                h.paddingLeftSetter = function (a) {
                    l(a) && a !== q && (q = a, Q())
                };
                h.alignSetter = function (a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [a];
                    a !== S && (S = a, C && h.attr({
                        x: m
                    }))
                };
                h.textSetter = function (a) {
                    void 0 !== a && u.textSetter(a);
                    v();
                    Q()
                };
                h["stroke-widthSetter"] =
                    function (a, b) {
                        a && (M = !0);
                        O = this["stroke-width"] = a;
                        U(b, a)
                    };
                h.strokeSetter = h.fillSetter = h.rSetter = function (a, b) {
                    "r" !== b && ("fill" === b && a && (M = !0), h[b] = a);
                    U(b, a)
                };
                h.anchorXSetter = function (a, b) {
                    f = h.anchorX = a;
                    U(b, Math.round(a) - t() - m)
                };
                h.anchorYSetter = function (a, b) {
                    n = h.anchorY = a;
                    U(b, a - P)
                };
                h.xSetter = function (a) {
                    h.x = a;
                    S && (a -= S * ((G || C.width) + 2 * N), h["forceAnimate:x"] = !0);
                    m = Math.round(a);
                    h.attr("translateX", m)
                };
                h.ySetter = function (a) {
                    P = h.y = Math.round(a);
                    h.attr("translateY", P)
                };
                var R = h.css;
                return c(h, {
                    css: function (a) {
                        if (a) {
                            var b = {};
                            a = E(a);
                            w(h.textProps, function (c) {
                                void 0 !== a[c] && (b[c] = a[c], delete a[c])
                            });
                            u.css(b);
                            "width" in b && v()
                        }
                        return R.call(h, a)
                    },
                    getBBox: function () {
                        return {
                            width: C.width + 2 * N,
                            height: C.height + 2 * N,
                            x: C.x - N,
                            y: C.y - N
                        }
                    },
                    shadow: function (a) {
                        a && (v(), d && d.shadow(a));
                        return h
                    },
                    destroy: function () {
                        z(h.element, "mouseenter");
                        z(h.element, "mouseleave");
                        u && (u = u.destroy());
                        d && (d = d.destroy());
                        B.prototype.destroy.call(h);
                        h = A = v = Q = U = null
                    }
                })
            }
        });
        a.Renderer = y
    })(J);
    (function (a) {
        var B = a.attr,
            y = a.createElement,
            D = a.css,
            p = a.defined,
            d = a.each,
            m = a.extend,
            v = a.isFirefox,
            t = a.isMS,
            q = a.isWebKit,
            l = a.pick,
            g = a.pInt,
            f = a.SVGRenderer,
            h = a.win,
            w = a.wrap;
        m(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var b = this.element;
                if ((b = a && "SPAN" === b.tagName && a.width) || this.textWidth && !b) delete a.width, this.textWidth = b, this.htmlUpdateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = m(this.styles, a);
                D(this.element, a);
                return this
            },
            htmlGetBBox: function () {
                var a = this.element;
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        e = this.translateX || 0,
                        f = this.translateY || 0,
                        h = this.x || 0,
                        l = this.y || 0,
                        C = this.textAlign || "left",
                        w = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [C],
                        u = this.styles,
                        q = u && u.whiteSpace;
                    D(b, {
                        marginLeft: e,
                        marginTop: f
                    });
                    this.shadows && d(this.shadows, function (a) {
                        D(a, {
                            marginLeft: e + 1,
                            marginTop: f + 1
                        })
                    });
                    this.inverted && d(b.childNodes, function (c) {
                        a.invertChild(c, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var u = this.rotation,
                            k = this.textWidth && g(this.textWidth),
                            E = [u, C, b.innerHTML, this.textWidth, this.textAlign].join(),
                            x;
                        (x = k !== this.oldTextWidth) && !(x = k > this.oldTextWidth) && ((x = this.textPxLength) || (D(b, {
                            width: "",
                            whiteSpace: q || "nowrap"
                        }), x = b.offsetWidth), x = x > k);
                        x && /[ \-]/.test(b.textContent || b.innerText) ? (D(b, {
                            width: k + "px",
                            display: "block",
                            whiteSpace: q || "normal"
                        }), this.oldTextWidth = k, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        E !== this.cTT && (q = a.fontMetrics(b.style.fontSize).b, !p(u) || u === (this.oldRotation || 0) && C === this.oldAlign || this.setSpanRotation(u,
                            w, q), this.getSpanCorrection(!p(u) && this.textPxLength || b.offsetWidth, q, w, u, C));
                        D(b, {
                            left: h + (this.xCorr || 0) + "px",
                            top: l + (this.yCorr || 0) + "px"
                        });
                        this.cTT = E;
                        this.oldRotation = u;
                        this.oldAlign = C
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function (a, b, e) {
                var c = {},
                    f = this.renderer.getTransformKey();
                c[f] = c.transform = "rotate(" + a + "deg)";
                c[f + (v ? "Origin" : "-origin")] = c.transformOrigin = 100 * b + "% " + e + "px";
                D(this.element, c)
            },
            getSpanCorrection: function (a, b, e) {
                this.xCorr = -a * e;
                this.yCorr = -b
            }
        });
        m(f.prototype, {
            getTransformKey: function () {
                return t &&
                    !/Edge/.test(h.navigator.userAgent) ? "-ms-transform" : q ? "-webkit-transform" : v ? "MozTransform" : h.opera ? "-o-transform" : ""
            },
            html: function (a, b, e) {
                var c = this.createElement("span"),
                    f = c.element,
                    g = c.renderer,
                    h = g.isSVG,
                    q = function (a, b) {
                        d(["opacity", "visibility"], function (c) {
                            w(a, c + "Setter", function (a, c, e, k) {
                                a.call(this, c, e, k);
                                b[e] = c
                            })
                        });
                        a.addedSetters = !0
                    };
                c.textSetter = function (a) {
                    a !== f.innerHTML && delete this.bBox;
                    this.textStr = a;
                    f.innerHTML = l(a, "");
                    c.doTransform = !0
                };
                h && q(c, c.element.style);
                c.xSetter = c.ySetter = c.alignSetter =
                    c.rotationSetter = function (a, b) {
                        "align" === b && (b = "textAlign");
                        c[b] = a;
                        c.doTransform = !0
                    };
                c.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                c.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(e)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                f.style.whiteSpace = "nowrap";
                c.css = c.htmlCss;
                h && (c.add = function (a) {
                    var b, e = g.box.parentNode,
                        n = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) n.push(a), a = a.parentGroup;
                            d(n.reverse(), function (a) {
                                function k(b,
                                    c) {
                                    a[c] = b;
                                    "translateX" === c ? f.left = b + "px" : f.top = b + "px";
                                    a.doTransform = !0
                                }
                                var f, r = B(a.element, "class");
                                r && (r = {
                                    className: r
                                });
                                b = a.div = a.div || y("div", r, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || e);
                                f = b.style;
                                m(a, {
                                    classSetter: function (a) {
                                        return function (b) {
                                            this.element.setAttribute("class", b);
                                            a.className = b
                                        }
                                    }(b),
                                    on: function () {
                                        n[0].div && c.on.apply({
                                            element: n[0].div
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: k,
                                    translateYSetter: k
                                });
                                a.addedSetters || q(a, f)
                            })
                        }
                    } else b = e;
                    b.appendChild(f);
                    c.added = !0;
                    c.alignOnAdd && c.htmlUpdateTransform();
                    return c
                });
                return c
            }
        })
    })(J);
    (function (a) {
        var B = a.correctFloat,
            y = a.defined,
            D = a.destroyObjectProperties,
            p = a.fireEvent,
            d = a.isNumber,
            m = a.merge,
            v = a.pick,
            t = a.deg2rad;
        a.Tick = function (a, l, g, f) {
            this.axis = a;
            this.pos = l;
            this.type = g || "";
            this.isNewLabel = this.isNew = !0;
            g || f || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis,
                    l = a.options,
                    g = a.chart,
                    f = a.categories,
                    h = a.names,
                    d = this.pos,
                    c = l.labels,
                    b = a.tickPositions,
                    e = d === b[0],
                    n = d === b[b.length - 1],
                    h = f ? v(f[d], h[d], d) : d,
                    f = this.label,
                    b = b.info,
                    A;
                a.isDatetimeAxis && b && (A = l.dateTimeLabelFormats[b.higherRanks[d] || b.unitName]);
                this.isFirst = e;
                this.isLast = n;
                l = {
                    axis: a,
                    chart: g,
                    isFirst: e,
                    isLast: n,
                    dateTimeLabelFormat: A,
                    value: a.isLog ? B(a.lin2log(h)) : h,
                    pos: d
                };
                l = a.labelFormatter.call(l, l);
                if (y(f)) f && f.attr({
                    text: l
                });
                else {
                    if (this.label = f = y(l) && c.enabled ? g.renderer.text(l, 0, 0, c.useHTML).css(m(c.style)).add(a.labelGroup) : null) f.textPxLength =
                        f.getBBox().width;
                    this.rotation = 0
                }
            },
            getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function (a) {
                var l = this.axis,
                    g = l.options.labels,
                    f = a.x,
                    h = l.chart.chartWidth,
                    d = l.chart.spacing,
                    c = v(l.labelLeft, Math.min(l.pos, d[3])),
                    d = v(l.labelRight, Math.max(l.isRadial ? 0 : l.pos + l.len, h - d[1])),
                    b = this.label,
                    e = this.rotation,
                    n = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [l.labelAlign || b.attr("align")],
                    A = b.getBBox().width,
                    G = l.getSlotWidth(this),
                    C = G,
                    q = 1,
                    u, m = {};
                if (e || !1 === g.overflow) 0 >
                    e && f - n * A < c ? u = Math.round(f / Math.cos(e * t) - c) : 0 < e && f + n * A > d && (u = Math.round((h - f) / Math.cos(e * t)));
                else if (h = f + (1 - n) * A, f - n * A < c ? C = a.x + C * (1 - n) - c : h > d && (C = d - a.x + C * n, q = -1), C = Math.min(G, C), C < G && "center" === l.labelAlign && (a.x += q * (G - C - n * (G - Math.min(A, C)))), A > C || l.autoRotation && (b.styles || {}).width) u = C;
                u && (m.width = u, (g.style || {}).textOverflow || (m.textOverflow = "ellipsis"), b.css(m))
            },
            getPosition: function (d, l, g, f) {
                var h = this.axis,
                    w = h.chart,
                    c = f && w.oldChartHeight || w.chartHeight;
                d = {
                    x: d ? a.correctFloat(h.translate(l + g, null,
                        null, f) + h.transB) : h.left + h.offset + (h.opposite ? (f && w.oldChartWidth || w.chartWidth) - h.right - h.left : 0),
                    y: d ? c - h.bottom + h.offset - (h.opposite ? h.height : 0) : a.correctFloat(c - h.translate(l + g, null, null, f) - h.transB)
                };
                p(this, "afterGetPosition", {
                    pos: d
                });
                return d
            },
            getLabelPosition: function (a, l, g, f, h, d, c, b) {
                var e = this.axis,
                    n = e.transA,
                    A = e.reversed,
                    w = e.staggerLines,
                    C = e.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    q = h.y,
                    u = f || e.reserveSpaceDefault ? 0 : -e.labelOffset * ("center" === e.labelAlign ? .5 : 1),
                    m = {};
                y(q) || (q = 0 === e.side ? g.rotation ? -8 : -g.getBBox().height :
                    2 === e.side ? C.y + 8 : Math.cos(g.rotation * t) * (C.y - g.getBBox(!1, 0).height / 2));
                a = a + h.x + u + C.x - (d && f ? d * n * (A ? -1 : 1) : 0);
                l = l + q - (d && !f ? d * n * (A ? 1 : -1) : 0);
                w && (g = c / (b || 1) % w, e.opposite && (g = w - g - 1), l += e.labelOffset / w * g);
                m.x = a;
                m.y = Math.round(l);
                p(this, "afterGetLabelPosition", {
                    pos: m
                });
                return m
            },
            getMarkPath: function (a, l, g, f, h, d) {
                return d.crispLine(["M", a, l, "L", a + (h ? 0 : -g), l + (h ? g : 0)], f)
            },
            renderGridLine: function (a, l, g) {
                var f = this.axis,
                    h = f.options,
                    d = this.gridLine,
                    c = {},
                    b = this.pos,
                    e = this.type,
                    n = f.tickmarkOffset,
                    A = f.chart.renderer,
                    m = e ? e + "Grid" : "grid",
                    C = h[m + "LineWidth"],
                    q = h[m + "LineColor"],
                    h = h[m + "LineDashStyle"];
                d || (c.stroke = q, c["stroke-width"] = C, h && (c.dashstyle = h), e || (c.zIndex = 1), a && (c.opacity = 0), this.gridLine = d = A.path().attr(c).addClass("highcharts-" + (e ? e + "-" : "") + "grid-line").add(f.gridGroup));
                if (!a && d && (a = f.getPlotLinePath(b + n, d.strokeWidth() * g, a, !0))) d[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: l
                })
            },
            renderMark: function (a, d, g) {
                var f = this.axis,
                    h = f.options,
                    l = f.chart.renderer,
                    c = this.type,
                    b = c ? c + "Tick" : "tick",
                    e = f.tickSize(b),
                    n =
                    this.mark,
                    A = !n,
                    m = a.x;
                a = a.y;
                var C = v(h[b + "Width"], !c && f.isXAxis ? 1 : 0),
                    h = h[b + "Color"];
                e && (f.opposite && (e[0] = -e[0]), A && (this.mark = n = l.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(f.axisGroup), n.attr({
                    stroke: h,
                    "stroke-width": C
                })), n[A ? "attr" : "animate"]({
                    d: this.getMarkPath(m, a, e[0], n.strokeWidth() * g, f.horiz, l),
                    opacity: d
                }))
            },
            renderLabel: function (a, l, g, f) {
                var h = this.axis,
                    w = h.horiz,
                    c = h.options,
                    b = this.label,
                    e = c.labels,
                    n = e.step,
                    h = h.tickmarkOffset,
                    A = !0,
                    m = a.x;
                a = a.y;
                b && d(m) && (b.xy = a = this.getLabelPosition(m,
                    a, b, w, e, h, f, n), this.isFirst && !this.isLast && !v(c.showFirstLabel, 1) || this.isLast && !this.isFirst && !v(c.showLastLabel, 1) ? A = !1 : !w || e.step || e.rotation || l || 0 === g || this.handleOverflow(a), n && f % n && (A = !1), A && d(a.y) ? (a.opacity = g, b[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (b.attr("y", -9999), this.isNewLabel = !0))
            },
            render: function (d, l, g) {
                var f = this.axis,
                    h = f.horiz,
                    w = this.getPosition(h, this.pos, f.tickmarkOffset, l),
                    c = w.x,
                    b = w.y,
                    f = h && c === f.pos + f.len || !h && b === f.pos ? -1 : 1;
                g = v(g, 1);
                this.isActive = !0;
                this.renderGridLine(l,
                    g, f);
                this.renderMark(w, g, f);
                this.renderLabel(w, l, g, d);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            },
            destroy: function () {
                D(this, this.axis)
            }
        }
    })(J);
    var W = function (a) {
        var B = a.addEvent,
            y = a.animObject,
            D = a.arrayMax,
            p = a.arrayMin,
            d = a.color,
            m = a.correctFloat,
            v = a.defaultOptions,
            t = a.defined,
            q = a.deg2rad,
            l = a.destroyObjectProperties,
            g = a.each,
            f = a.extend,
            h = a.fireEvent,
            w = a.format,
            c = a.getMagnitude,
            b = a.grep,
            e = a.inArray,
            n = a.isArray,
            A = a.isNumber,
            G = a.isString,
            C = a.merge,
            M = a.normalizeTickInterval,
            u = a.objectEach,
            F = a.pick,
            k =
            a.removeEvent,
            E = a.splat,
            x = a.syncTimeout,
            L = a.Tick,
            H = function () {
                this.init.apply(this, arguments)
            };
        a.extend(H.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total,
                            -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function (a, b) {
                var c = b.isX,
                    r = this;
                r.chart = a;
                r.horiz = a.inverted && !r.isZAxis ? !c : c;
                r.isXAxis = c;
                r.coll = r.coll ||
                    (c ? "xAxis" : "yAxis");
                h(this, "init", {
                    userOptions: b
                });
                r.opposite = b.opposite;
                r.side = b.side || (r.horiz ? r.opposite ? 0 : 2 : r.opposite ? 1 : 3);
                r.setOptions(b);
                var z = this.options,
                    k = z.type;
                r.labelFormatter = z.labels.formatter || r.defaultLabelFormatter;
                r.userOptions = b;
                r.minPixelPadding = 0;
                r.reversed = z.reversed;
                r.visible = !1 !== z.visible;
                r.zoomEnabled = !1 !== z.zoomEnabled;
                r.hasNames = "category" === k || !0 === z.categories;
                r.categories = z.categories || r.hasNames;
                r.names || (r.names = [], r.names.keys = {});
                r.plotLinesAndBandsGroups = {};
                r.isLog =
                    "logarithmic" === k;
                r.isDatetimeAxis = "datetime" === k;
                r.positiveValuesOnly = r.isLog && !r.allowNegativeLog;
                r.isLinked = t(z.linkedTo);
                r.ticks = {};
                r.labelEdge = [];
                r.minorTicks = {};
                r.plotLinesAndBands = [];
                r.alternateBands = {};
                r.len = 0;
                r.minRange = r.userMinRange = z.minRange || z.maxZoom;
                r.range = z.range;
                r.offset = z.offset || 0;
                r.stacks = {};
                r.oldStacks = {};
                r.stacksTouched = 0;
                r.max = null;
                r.min = null;
                r.crosshair = F(z.crosshair, E(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
                b = r.options.events; - 1 === e(r, a.axes) && (c ? a.axes.splice(a.xAxis.length,
                    0, r) : a.axes.push(r), a[r.coll].push(r));
                r.series = r.series || [];
                a.inverted && !r.isZAxis && c && void 0 === r.reversed && (r.reversed = !0);
                u(b, function (a, b) {
                    B(r, b, a)
                });
                r.lin2log = z.linearToLogConverter || r.lin2log;
                r.isLog && (r.val2lin = r.log2lin, r.lin2val = r.lin2log);
                h(this, "afterInit")
            },
            setOptions: function (a) {
                this.options = C(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
                    C(v[this.coll], a));
                h(this, "afterSetOptions", {
                    userOptions: a
                })
            },
            defaultLabelFormatter: function () {
                var b = this.axis,
                    c = this.value,
                    e = b.chart.time,
                    k = b.categories,
                    f = this.dateTimeLabelFormat,
                    n = v.lang,
                    g = n.numericSymbols,
                    n = n.numericSymbolMagnitude || 1E3,
                    h = g && g.length,
                    x, d = b.options.labels.format,
                    b = b.isLog ? Math.abs(c) : b.tickInterval;
                if (d) x = w(d, this, e);
                else if (k) x = c;
                else if (f) x = e.dateFormat(f, c);
                else if (h && 1E3 <= b)
                    for (; h-- && void 0 === x;) e = Math.pow(n, h + 1), b >= e && 0 === 10 * c % e && null !== g[h] && 0 !== c && (x = a.numberFormat(c / e,
                        -1) + g[h]);
                void 0 === x && (x = 1E4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return x
            },
            getSeriesExtremes: function () {
                var a = this,
                    c = a.chart;
                h(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    g(a.series, function (e) {
                        if (e.visible || !c.options.chart.ignoreHiddenSeries) {
                            var r = e.options,
                                z = r.threshold,
                                k;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= z && (z = null);
                            if (a.isXAxis) r = e.xData,
                                r.length && (e = p(r), k = D(r), A(e) || e instanceof Date || (r = b(r, A), e = p(r), k = D(r)), r.length && (a.dataMin = Math.min(F(a.dataMin, r[0], e), e), a.dataMax = Math.max(F(a.dataMax, r[0], k), k)));
                            else if (e.getExtremes(), k = e.dataMax, e = e.dataMin, t(e) && t(k) && (a.dataMin = Math.min(F(a.dataMin, e), e), a.dataMax = Math.max(F(a.dataMax, k), k)), t(z) && (a.threshold = z), !r.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                h(this, "afterGetSeriesExtremes")
            },
            translate: function (a, b, c, e, k, f) {
                var r = this.linkedParent || this,
                    z = 1,
                    n = 0,
                    g = e ?
                    r.oldTransA : r.transA;
                e = e ? r.oldMin : r.min;
                var h = r.minPixelPadding;
                k = (r.isOrdinal || r.isBroken || r.isLog && k) && r.lin2val;
                g || (g = r.transA);
                c && (z *= -1, n = r.len);
                r.reversed && (z *= -1, n -= z * (r.sector || r.len));
                b ? (a = (a * z + n - h) / g + e, k && (a = r.lin2val(a))) : (k && (a = r.val2lin(a)), a = A(e) ? z * (a - e) * g + n + z * h + (A(f) ? g * f : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a,
                b, c, e, k) {
                var r = this.chart,
                    z = this.left,
                    f = this.top,
                    n, g, h = c && r.oldChartHeight || r.chartHeight,
                    x = c && r.oldChartWidth || r.chartWidth,
                    d;
                n = this.transB;
                var K = function (a, b, c) {
                    if (a < b || a > c) e ? a = Math.min(Math.max(b, a), c) : d = !0;
                    return a
                };
                k = F(k, this.translate(a, null, null, c));
                k = Math.min(Math.max(-1E5, k), 1E5);
                a = c = Math.round(k + n);
                n = g = Math.round(h - k - n);
                A(k) ? this.horiz ? (n = f, g = h - this.bottom, a = c = K(a, z, z + this.width)) : (a = z, c = x - this.right, n = g = K(n, f, f + this.height)) : (d = !0, e = !1);
                return d && !e ? null : r.renderer.crispLine(["M", a, n, "L",
                    c, g
                ], b || 1)
            },
            getLinearTickPositions: function (a, b, c) {
                var e, r = m(Math.floor(b / a) * a);
                c = m(Math.ceil(c / a) * a);
                var z = [],
                    k;
                m(r + a) === r && (k = 20);
                if (this.single) return [b];
                for (b = r; b <= c;) {
                    z.push(b);
                    b = m(b + a, k);
                    if (b === e) break;
                    e = b
                }
                return z
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? F(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this,
                    b = a.options,
                    c = a.tickPositions,
                    e = a.minorTickInterval,
                    k = [],
                    f = a.pointRangePadding || 0,
                    n = a.min -
                    f,
                    f = a.max + f,
                    h = f - n;
                if (h && h / e < a.len / 3)
                    if (a.isLog) g(this.paddedTicks, function (b, c, r) {
                        c && k.push.apply(k, a.getLogTickPositions(e, r[c - 1], r[c], !0))
                    });
                    else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) k = k.concat(a.getTimeTicks(a.normalizeTimeTickInterval(e), n, f, b.startOfWeek));
                else
                    for (b = n + (c[0] - n) % e; b <= f && b !== k[0]; b += e) k.push(b);
                0 !== k.length && a.trimTicks(k);
                return k
            },
            adjustForMinRange: function () {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    e, k, f, n, h, x, d, l;
                this.isXAxis && void 0 === this.minRange && !this.isLog &&
                    (t(a.min) || t(a.max) ? this.minRange = null : (g(this.series, function (a) {
                        x = a.xData;
                        for (n = d = a.xIncrement ? 1 : x.length - 1; 0 < n; n--)
                            if (h = x[n] - x[n - 1], void 0 === f || h < f) f = h
                    }), this.minRange = Math.min(5 * f, this.dataMax - this.dataMin)));
                c - b < this.minRange && (k = this.dataMax - this.dataMin >= this.minRange, l = this.minRange, e = (l - c + b) / 2, e = [b - e, F(a.min, b - e)], k && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(e), c = [b + l, F(a.max, b + l)], k && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = p(c), c - b < l && (e[0] = c - l, e[1] =
                    F(a.min, c - l), b = D(e)));
                this.min = b;
                this.max = c
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : g(this.series, function (b) {
                    var c = b.closestPointRange,
                        e = b.visible || !b.chart.options.chart.ignoreHiddenSeries;
                    !b.noSharedTooltip && t(c) && e && (a = t(a) ? Math.min(a, c) : c)
                });
                return a
            },
            nameToX: function (a) {
                var b = n(this.categories),
                    c = b ? this.categories : this.names,
                    r = a.options.x,
                    k;
                a.series.requireSorting = !1;
                t(r) || (r = !1 === this.options.uniqueNames ? a.series.autoIncrement() : b ? e(a.name, c) : F(c.keys[a.name], -1)); - 1 === r ? b || (k = c.length) :
                    k = r;
                void 0 !== k && (this.names[k] = a.name, this.names.keys[a.name] = k);
                return k
            },
            updateNames: function () {
                var b = this,
                    c = this.names;
                0 < c.length && (g(a.keys(c.keys), function (a) {
                    delete c.keys[a]
                }), c.length = 0, this.minRange = this.userMinRange, g(this.series || [], function (a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    g(a.points, function (c, e) {
                        var r;
                        c.options && (r = b.nameToX(c), void 0 !== r && r !== c.x && (c.x = r, a.xData[e] = r))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var b = this,
                    c = b.max - b.min,
                    e =
                    b.axisPointRange || 0,
                    r, k = 0,
                    f = 0,
                    n = b.linkedParent,
                    x = !!b.categories,
                    d = b.transA,
                    l = b.isXAxis;
                if (l || x || e) r = b.getClosest(), n ? (k = n.minPointOffset, f = n.pointRangePadding) : g(b.series, function (a) {
                    var c = x ? 1 : l ? F(a.options.pointRange, r, 0) : b.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, c);
                    b.single || (k = Math.max(k, G(a) ? 0 : c / 2), f = Math.max(f, "on" === a ? 0 : c))
                }), n = b.ordinalSlope && r ? b.ordinalSlope / r : 1, b.minPointOffset = k *= n, b.pointRangePadding = f *= n, b.pointRange = Math.min(e, c), l && (b.closestPointRange = r);
                a && (b.oldTransA =
                    d);
                b.translationSlope = b.transA = d = b.options.staticScale || b.len / (c + f || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = d * k;
                h(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (b) {
                var e = this,
                    r = e.chart,
                    k = e.options,
                    f = e.isLog,
                    n = e.isDatetimeAxis,
                    x = e.isXAxis,
                    d = e.isLinked,
                    l = k.maxPadding,
                    u = k.minPadding,
                    C = k.tickInterval,
                    E = k.tickPixelInterval,
                    w = e.categories,
                    G = A(e.threshold) ? e.threshold : null,
                    H = e.softThreshold,
                    q, p, L, v;
                n || w || d || this.getTickAmount();
                L = F(e.userMin, k.min);
                v = F(e.userMax, k.max);
                d ? (e.linkedParent = r[e.coll][k.linkedTo], r = e.linkedParent.getExtremes(), e.min = F(r.min, r.dataMin), e.max = F(r.max, r.dataMax), k.type !== e.linkedParent.options.type && a.error(11, 1)) : (!H && t(G) && (e.dataMin >= G ? (q = G, u = 0) : e.dataMax <= G && (p = G, l = 0)), e.min = F(L, q, e.dataMin), e.max = F(v, p, e.dataMax));
                f && (e.positiveValuesOnly && !b && 0 >= Math.min(e.min, F(e.dataMin, e.min)) && a.error(10, 1), e.min = m(e.log2lin(e.min), 15), e.max = m(e.log2lin(e.max), 15));
                e.range && t(e.max) && (e.userMin = e.min =
                    L = Math.max(e.dataMin, e.minFromRange()), e.userMax = v = e.max, e.range = null);
                h(e, "foundExtremes");
                e.beforePadding && e.beforePadding();
                e.adjustForMinRange();
                !(w || e.axisPointRange || e.usePercentage || d) && t(e.min) && t(e.max) && (r = e.max - e.min) && (!t(L) && u && (e.min -= r * u), !t(v) && l && (e.max += r * l));
                A(k.softMin) && !A(e.userMin) && (e.min = Math.min(e.min, k.softMin));
                A(k.softMax) && !A(e.userMax) && (e.max = Math.max(e.max, k.softMax));
                A(k.floor) && (e.min = Math.max(e.min, k.floor));
                A(k.ceiling) && (e.max = Math.min(e.max, k.ceiling));
                H && t(e.dataMin) &&
                    (G = G || 0, !t(L) && e.min < G && e.dataMin >= G ? e.min = G : !t(v) && e.max > G && e.dataMax <= G && (e.max = G));
                e.tickInterval = e.min === e.max || void 0 === e.min || void 0 === e.max ? 1 : d && !C && E === e.linkedParent.options.tickPixelInterval ? C = e.linkedParent.tickInterval : F(C, this.tickAmount ? (e.max - e.min) / Math.max(this.tickAmount - 1, 1) : void 0, w ? 1 : (e.max - e.min) * E / Math.max(e.len, E));
                x && !b && g(e.series, function (a) {
                    a.processData(e.min !== e.oldMin || e.max !== e.oldMax)
                });
                e.setAxisTranslation(!0);
                e.beforeSetTickPositions && e.beforeSetTickPositions();
                e.postProcessTickInterval && (e.tickInterval = e.postProcessTickInterval(e.tickInterval));
                e.pointRange && !C && (e.tickInterval = Math.max(e.pointRange, e.tickInterval));
                b = F(k.minTickInterval, e.isDatetimeAxis && e.closestPointRange);
                !C && e.tickInterval < b && (e.tickInterval = b);
                n || f || C || (e.tickInterval = M(e.tickInterval, null, c(e.tickInterval), F(k.allowDecimals, !(.5 < e.tickInterval && 5 > e.tickInterval && 1E3 < e.max && 9999 > e.max)), !!this.tickAmount));
                this.tickAmount || (e.tickInterval = e.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a =
                    this.options,
                    b, e = a.tickPositions;
                b = this.getMinorTickInterval();
                var c = a.tickPositioner,
                    k = a.startOnTick,
                    f = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && t(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = e && e.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
                    a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, c && (c = c.apply(this, [this.min, this.max]))) && (this.tickPositions = b = c);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, k, f);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), e ||
                    c || this.adjustTickAmount());
                h(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, e) {
                var c = a[0],
                    k = a[a.length - 1],
                    r = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== c) this.min = c;
                    else
                        for (; this.min - r > a[0];) a.shift();
                    if (e) this.max = k;
                    else
                        for (; this.max + r < a[a.length - 1];) a.pop();
                    0 === a.length && t(c) && !this.options.tickPositions && a.push((k + c) / 2)
                }
            },
            alignToOthers: function () {
                var a = {},
                    b, e = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || !1 === e.startOnTick || !1 === e.endOnTick ||
                    this.isLog || g(this.chart[this.coll], function (e) {
                        var c = e.options,
                            c = [e.horiz ? c.left : c.top, c.width, c.height, c.pane].join();
                        e.series.length && (a[c] ? b = !0 : a[c] = 1)
                    });
                return b
            },
            getTickAmount: function () {
                var a = this.options,
                    b = a.tickAmount,
                    e = a.tickPixelInterval;
                !t(a.tickInterval) && this.len < e && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / e) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval,
                    b =
                    this.tickPositions,
                    e = this.tickAmount,
                    c = this.finalTickAmt,
                    k = b && b.length,
                    f = F(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (k < e) {
                        for (; b.length < e;) b.length % 2 || this.min === f ? b.push(m(b[b.length - 1] + a)) : b.unshift(m(b[0] - a));
                        this.transA *= (k - 1) / (e - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else k > e && (this.tickInterval *= 2, this.setTickPositions());
                    if (t(c)) {
                        for (a = e = b.length; a--;)(3 === c && 1 === a % 2 || 2 >= c && 0 < a && a < e - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin =
                    this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                g(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty =
                    b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                h(this, "afterSetScale")
            },
            setExtremes: function (a, b, e, c, k) {
                var r = this,
                    n = r.chart;
                e = F(e, !0);
                g(r.series, function (a) {
                    delete a.kdTree
                });
                k = f(k, {
                    min: a,
                    max: b
                });
                h(r, "setExtremes", k, function () {
                    r.userMin = a;
                    r.userMax = b;
                    r.eventArgs = k;
                    e && n.redraw(c)
                })
            },
            zoom: function (a, b) {
                var e = this.dataMin,
                    c = this.dataMax,
                    k = this.options,
                    r = Math.min(e, F(k.min, e)),
                    k = Math.max(c, F(k.max, c));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (t(e) &&
                    (a < r && (a = r), a > k && (a = k)), t(c) && (b < r && (b = r), b > k && (b = k))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function () {
                var b = this.chart,
                    e = this.options,
                    c = e.offsets || [0, 0, 0, 0],
                    k = this.horiz,
                    f = this.width = Math.round(a.relativeLength(F(e.width, b.plotWidth - c[3] + c[1]), b.plotWidth)),
                    n = this.height = Math.round(a.relativeLength(F(e.height, b.plotHeight - c[0] + c[2]), b.plotHeight)),
                    g = this.top = Math.round(a.relativeLength(F(e.top, b.plotTop + c[0]), b.plotHeight, b.plotTop)),
                    e = this.left = Math.round(a.relativeLength(F(e.left, b.plotLeft + c[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - n - g;
                this.right = b.chartWidth - f - e;
                this.len = Math.max(k ? f : n, 0);
                this.pos = k ? e : g
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? m(this.lin2log(this.min)) : this.min,
                    max: a ? m(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog,
                    e = b ? this.lin2log(this.min) : this.min,
                    b = b ? this.lin2log(this.max) :
                    this.max;
                null === a || -Infinity === a ? a = e : Infinity === a ? a = b : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (F(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options,
                    e = b[a + "Length"],
                    c = F(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (c && e) return "inside" === b[a + "Position"] && (e = -e), [e, c]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels,
                    b = this.horiz,
                    e = this.tickInterval,
                    c = e,
                    k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e),
                    f, n = a.rotation,
                    h = this.labelMetrics(),
                    x, d = Number.MAX_VALUE,
                    l, A = function (a) {
                        a /= k || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return m(a * e)
                    };
                b ? (l = !a.staggerLines && !a.step && (t(n) ? [n] : k < F(a.autoRotationLimit, 80) && a.autoRotation)) && g(l, function (a) {
                    var b;
                    if (a === n || a && -90 <= a && 90 >= a) x = A(Math.abs(h.h / Math.sin(q * a))), b =
                        x + Math.abs(a / 360), b < d && (d = b, f = a, c = x)
                }) : a.step || (c = A(h.h));
                this.autoRotation = l;
                this.labelRotation = F(f, n);
                return c
            },
            getSlotWidth: function () {
                var a = this.chart,
                    b = this.horiz,
                    e = this.options.labels,
                    c = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    k = a.margin[3];
                return b && 2 > (e.step || 0) && !e.rotation && (this.staggerLines || 1) * this.len / c || !b && (e.style && parseInt(e.style.width, 10) || k && k - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart,
                    b = a.renderer,
                    e = this.tickPositions,
                    c = this.ticks,
                    k = this.options.labels,
                    f = k && k.style || {},
                    n = this.horiz,
                    h = this.getSlotWidth(),
                    x = Math.max(1, Math.round(h - 2 * (k.padding || 5))),
                    d = {},
                    l = this.labelMetrics(),
                    A = k.style && k.style.textOverflow,
                    u, C, E = 0,
                    w;
                G(k.rotation) || (d.rotation = k.rotation || 0);
                g(e, function (a) {
                    (a = c[a]) && a.label && a.label.textPxLength > E && (E = a.label.textPxLength)
                });
                this.maxLabelLength = E;
                if (this.autoRotation) E > x && E > l.h ? d.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h && (u = x, !A))
                    for (C = "clip", x = e.length; !n && x--;)
                        if (w = e[x], w = c[w].label) w.styles &&
                            "ellipsis" === w.styles.textOverflow ? w.css({
                                textOverflow: "clip"
                            }) : w.textPxLength > h && w.css({
                                width: h + "px"
                            }), w.getBBox().height > this.len / e.length - (l.h - l.f) && (w.specificTextOverflow = "ellipsis");
                d.rotation && (u = E > .5 * a.chartHeight ? .33 * a.chartHeight : E, A || (C = "ellipsis"));
                if (this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation)) d.align = this.labelAlign;
                g(e, function (a) {
                    var b = (a = c[a]) && a.label,
                        e = f.width,
                        k = {};
                    b && (b.attr(d), u && !e && "nowrap" !== f.whiteSpace && (u < b.textPxLength || "SPAN" === b.element.tagName) ?
                        (k.width = u, A || (k.textOverflow = b.specificTextOverflow || C), b.css(k)) : b.styles && b.styles.width && !k.width && !e && b.css({
                            width: null
                        }), delete b.specificTextOverflow, a.rotation = d.rotation)
                });
                this.tickRotCorr = b.rotCorr(l.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || t(this.min) && t(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var b = this.chart.renderer,
                    e = this.horiz,
                    c = this.opposite,
                    k = this.options.title,
                    f;
                this.axisTitle || ((f = k.textAlign) ||
                    (f = (e ? {
                        low: "left",
                        middle: "center",
                        high: "right"
                    } : {
                        low: c ? "right" : "left",
                        middle: "center",
                        high: c ? "left" : "right"
                    })[k.align]), this.axisTitle = b.text(k.text, 0, 0, k.useHTML).attr({
                        zIndex: 7,
                        rotation: k.rotation || 0,
                        align: f
                    }).addClass("highcharts-axis-title").css(C(k.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
                k.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len
                });
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new L(this, a)
            },
            getOffset: function () {
                var a =
                    this,
                    b = a.chart,
                    e = b.renderer,
                    c = a.options,
                    k = a.tickPositions,
                    f = a.ticks,
                    n = a.horiz,
                    x = a.side,
                    d = b.inverted && !a.isZAxis ? [1, 0, 3, 2][x] : x,
                    l, A, C = 0,
                    E, w = 0,
                    m = c.title,
                    G = c.labels,
                    H = 0,
                    q = b.axisOffset,
                    b = b.clipOffset,
                    p = [-1, 1, 1, -1][x],
                    L = c.className,
                    M = a.axisParent,
                    v = this.tickSize("tick");
                l = a.hasData();
                a.showAxis = A = l || F(c.showEmpty, !0);
                a.staggerLines = a.horiz && G.staggerLines;
                a.axisGroup || (a.gridGroup = e.g("grid").attr({
                        zIndex: c.gridZIndex || 1
                    }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (L || "")).add(M), a.axisGroup =
                    e.g("axis").attr({
                        zIndex: c.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (L || "")).add(M), a.labelGroup = e.g("axis-labels").attr({
                        zIndex: G.zIndex || 7
                    }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (L || "")).add(M));
                l || a.isLinked ? (g(k, function (b, e) {
                    a.generateTick(b, e)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === x || 2 === x || {
                    1: "left",
                    3: "right"
                } [x] === a.labelAlign, F(G.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && g(k, function (a) {
                    H = Math.max(f[a].getLabelSize(),
                        H)
                }), a.staggerLines && (H *= a.staggerLines), a.labelOffset = H * (a.opposite ? -1 : 1)) : u(f, function (a, b) {
                    a.destroy();
                    delete f[b]
                });
                m && m.text && !1 !== m.enabled && (a.addTitle(A), A && !1 !== m.reserveSpace && (a.titleOffset = C = a.axisTitle.getBBox()[n ? "height" : "width"], E = m.offset, w = t(E) ? 0 : F(m.margin, n ? 5 : 10)));
                a.renderLine();
                a.offset = p * F(c.offset, q[x]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                e = 0 === x ? -a.labelMetrics().h : 2 === x ? a.tickRotCorr.y : 0;
                w = Math.abs(H) + w;
                H && (w = w - e + p * (n ? F(G.y, a.tickRotCorr.y + 8 * p) : G.x));
                a.axisTitleMargin =
                    F(E, w);
                q[x] = Math.max(q[x], a.axisTitleMargin + C + p * a.offset, w, l && k.length && v ? v[0] + p * a.offset : 0);
                c = c.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[d] = Math.max(b[d], c);
                h(this, "afterGetOffset")
            },
            getLinePath: function (a) {
                var b = this.chart,
                    e = this.opposite,
                    c = this.offset,
                    k = this.horiz,
                    f = this.left + (e ? this.width : 0) + c,
                    c = b.chartHeight - this.bottom - (e ? this.height : 0) + c;
                e && (a *= -1);
                return b.renderer.crispLine(["M", k ? this.left : f, k ? c : this.top, "L", k ? b.chartWidth - this.right : f, k ? c : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine ||
                    (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            },
            getTitlePosition: function () {
                var a = this.horiz,
                    b = this.left,
                    e = this.top,
                    c = this.len,
                    k = this.options.title,
                    f = a ? b : e,
                    n = this.opposite,
                    x = this.offset,
                    h = k.x || 0,
                    g = k.y || 0,
                    d = this.axisTitle,
                    l = this.chart.renderer.fontMetrics(k.style && k.style.fontSize, d),
                    d = Math.max(d.getBBox(null, 0).height - l.h - 1, 0),
                    c = {
                        low: f + (a ? 0 : c),
                        middle: f +
                            c / 2,
                        high: f + (a ? c : 0)
                    } [k.align],
                    b = (a ? e + this.height : b) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + [-d, d, l.f, -d][this.side];
                return {
                    x: a ? c + h : b + (n ? this.width : 0) + x + h,
                    y: a ? b + g - (n ? this.height : 0) + x : c + g
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && A(this.oldMin),
                    e = this.minorTicks;
                e[a] || (e[a] = new L(this, a, "minor"));
                b && e[a].isNew && e[a].render(null, !0);
                e[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var e = this.isLinked,
                    c = this.ticks,
                    k = this.chart.hasRendered && A(this.oldMin);
                if (!e || a >= this.min && a <= this.max) c[a] ||
                    (c[a] = new L(this, a)), k && c[a].isNew && c[a].render(b, !0, .1), c[a].render(b)
            },
            render: function () {
                var b = this,
                    e = b.chart,
                    c = b.options,
                    k = b.isLog,
                    f = b.isLinked,
                    n = b.tickPositions,
                    d = b.axisTitle,
                    l = b.ticks,
                    C = b.minorTicks,
                    E = b.alternateBands,
                    w = c.stackLabels,
                    m = c.alternateGridColor,
                    G = b.tickmarkOffset,
                    H = b.axisLine,
                    q = b.showAxis,
                    p = y(e.renderer.globalAnimation),
                    F, M;
                b.labelEdge.length = 0;
                b.overlap = !1;
                g([l, C, E], function (a) {
                    u(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || f) b.minorTickInterval && !b.categories && g(b.getMinorTickPositions(),
                    function (a) {
                        b.renderMinorTick(a)
                    }), n.length && (g(n, function (a, e) {
                    b.renderTick(a, e)
                }), G && (0 === b.min || b.single) && (l[-1] || (l[-1] = new L(b, -1, null, !0)), l[-1].render(-1))), m && g(n, function (c, f) {
                    M = void 0 !== n[f + 1] ? n[f + 1] + G : b.max - G;
                    0 === f % 2 && c < b.max && M <= b.max + (e.polar ? -G : G) && (E[c] || (E[c] = new a.PlotLineOrBand(b)), F = c + G, E[c].options = {
                        from: k ? b.lin2log(F) : F,
                        to: k ? b.lin2log(M) : M,
                        color: m
                    }, E[c].render(), E[c].isActive = !0)
                }), b._addedPlotLB || (g((c.plotLines || []).concat(c.plotBands || []), function (a) {
                        b.addPlotBandOrLine(a)
                    }),
                    b._addedPlotLB = !0);
                g([l, C, E], function (a) {
                    var b, c = [],
                        k = p.duration;
                    u(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, c.push(b))
                    });
                    x(function () {
                        for (b = c.length; b--;) a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(), delete a[c[b]])
                    }, a !== E && e.hasRendered && k ? k : 0)
                });
                H && (H[H.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(H.strokeWidth())
                }), H.isPlaced = !0, H[q ? "show" : "hide"](!0));
                d && q && (c = b.getTitlePosition(), A(c.y) ? (d[d.isNew ? "attr" : "animate"](c), d.isNew = !1) : (d.attr("y", -9999), d.isNew = !0));
                w && w.enabled &&
                    b.renderStackTotals();
                b.isDirty = !1;
                h(this, "afterRender")
            },
            redraw: function () {
                this.visible && (this.render(), g(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                g(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this,
                    c = b.stacks,
                    f = b.plotLinesAndBands,
                    n;
                h(this, "destroy", {
                    keepEvents: a
                });
                a || k(b);
                u(c, function (a, b) {
                    l(a);
                    c[b] = null
                });
                g([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    l(a)
                });
                if (f)
                    for (a = f.length; a--;) f[a].destroy();
                g("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" "), function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (n in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[n] = b.plotLinesAndBandsGroups[n].destroy();
                u(b, function (a, c) {
                    -1 === e(c, b.keepProps) && delete b[c]
                })
            },
            drawCrosshair: function (a, b) {
                var e, c = this.crosshair,
                    k = F(c.snap, !0),
                    f, n = this.cross;
                h(this, "drawCrosshair", {
                    e: a,
                    point: b
                });
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (t(b) || !k)) {
                    k ? t(b) && (f = F(b.crosshairPos,
                        this.isXAxis ? b.plotX : this.len - b.plotY)) : f = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    t(f) && (e = this.getPlotLinePath(b && (this.isXAxis ? b.x : F(b.stackY, b.y)), null, null, null, f) || null);
                    if (!t(e)) {
                        this.hideCrosshair();
                        return
                    }
                    k = this.categories && !this.isRadial;
                    n || (this.cross = n = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (k ? "category " : "thin ") + c.className).attr({
                        zIndex: F(c.zIndex, 2)
                    }).add(), n.attr({
                        stroke: c.color || (k ? d("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": F(c.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), c.dashStyle && n.attr({
                        dashstyle: c.dashStyle
                    }));
                    n.show().attr({
                        d: e
                    });
                    k && !c.width && n.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                h(this, "afterDrawCrosshair", {
                    e: a,
                    point: b
                })
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = H
    }(J);
    (function (a) {
        var B = a.Axis,
            y = a.getMagnitude,
            D = a.map,
            p = a.normalizeTickInterval,
            d = a.pick;
        B.prototype.getLogTickPositions = function (a, v, t, q) {
            var l = this.options,
                g = this.len,
                f = [];
            q || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), f = this.getLinearTickPositions(a, v, t);
            else if (.08 <= a)
                for (var g = Math.floor(v), h, w, c, b, e, l = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; g < t + 1 && !e; g++)
                    for (w = l.length, h = 0; h < w && !e; h++) c = this.log2lin(this.lin2log(g) * l[h]), c > v && (!q || b <= t) && void 0 !== b && f.push(b), b > t && (e = !0), b = c;
            else v = this.lin2log(v), t = this.lin2log(t), a = q ? this.getMinorTickInterval() : l.tickInterval, a = d("auto" === a ? null : a, this._minorAutoInterval, l.tickPixelInterval / (q ? 5 : 1) *
                (t - v) / ((q ? g / this.tickPositions.length : g) || 1)), a = p(a, null, y(a)), f = D(this.getLinearTickPositions(a, v, t), this.log2lin), q || (this._minorAutoInterval = a / 5);
            q || (this.tickInterval = a);
            return f
        };
        B.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        B.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(J);
    (function (a, B) {
        var y = a.arrayMax,
            D = a.arrayMin,
            p = a.defined,
            d = a.destroyObjectProperties,
            m = a.each,
            v = a.erase,
            t = a.merge,
            q = a.pick;
        a.PlotLineOrBand = function (a, d) {
            this.axis = a;
            d && (this.options = d, this.id = d.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var d = this,
                    g = d.axis,
                    f = g.horiz,
                    h = d.options,
                    w = h.label,
                    c = d.label,
                    b = h.to,
                    e = h.from,
                    n = h.value,
                    A = p(e) && p(b),
                    G = p(n),
                    C = d.svgElem,
                    m = !C,
                    u = [],
                    F = h.color,
                    k = q(h.zIndex, 0),
                    E = h.events,
                    u = {
                        "class": "highcharts-plot-" + (A ? "band " : "line ") + (h.className || "")
                    },
                    x = {},
                    L = g.chart.renderer,
                    H = A ? "bands" : "lines";
                g.isLog && (e = g.log2lin(e), b = g.log2lin(b), n = g.log2lin(n));
                G ? (u.stroke = F, u["stroke-width"] = h.width, h.dashStyle && (u.dashstyle = h.dashStyle)) : A && (F && (u.fill = F), h.borderWidth && (u.stroke =
                    h.borderColor, u["stroke-width"] = h.borderWidth));
                x.zIndex = k;
                H += "-" + k;
                (F = g.plotLinesAndBandsGroups[H]) || (g.plotLinesAndBandsGroups[H] = F = L.g("plot-" + H).attr(x).add());
                m && (d.svgElem = C = L.path().attr(u).add(F));
                if (G) u = g.getPlotLinePath(n, C.strokeWidth());
                else if (A) u = g.getPlotBandPath(e, b, h);
                else return;
                m && u && u.length ? (C.attr({
                    d: u
                }), E && a.objectEach(E, function (a, b) {
                    C.on(b, function (a) {
                        E[b].apply(d, [a])
                    })
                })) : C && (u ? (C.show(), C.animate({
                    d: u
                })) : (C.hide(), c && (d.label = c = c.destroy())));
                w && p(w.text) && u && u.length &&
                    0 < g.width && 0 < g.height && !u.isFlat ? (w = t({
                        align: f && A && "center",
                        x: f ? !A && 4 : 10,
                        verticalAlign: !f && A && "middle",
                        y: f ? A ? 16 : 10 : A ? 6 : -4,
                        rotation: f && !A && 90
                    }, w), this.renderLabel(w, u, A, k)) : c && c.hide();
                return d
            },
            renderLabel: function (a, d, f, h) {
                var g = this.label,
                    c = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (f ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = h, this.label = g = c.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                h = d.xBounds || [d[1], d[4],
                    f ? d[6] : d[1]
                ];
                d = d.yBounds || [d[2], d[5], f ? d[7] : d[2]];
                f = D(h);
                c = D(d);
                g.align(a, !1, {
                    x: f,
                    y: c,
                    width: y(h) - f,
                    height: y(d) - c
                });
                g.show()
            },
            destroy: function () {
                v(this.axis.plotLinesAndBands, this);
                delete this.axis;
                d(this)
            }
        };
        a.extend(B.prototype, {
            getPlotBandPath: function (a, d) {
                var f = this.getPlotLinePath(d, null, null, !0),
                    h = this.getPlotLinePath(a, null, null, !0),
                    g = [],
                    c = this.horiz,
                    b = 1,
                    e;
                a = a < this.min && d < this.min || a > this.max && d > this.max;
                if (h && f)
                    for (a && (e = h.toString() === f.toString(), b = 0), a = 0; a < h.length; a += 6) c && f[a + 1] === h[a +
                        1] ? (f[a + 1] += b, f[a + 4] += b) : c || f[a + 2] !== h[a + 2] || (f[a + 2] += b, f[a + 5] += b), g.push("M", h[a + 1], h[a + 2], "L", h[a + 4], h[a + 5], f[a + 4], f[a + 5], f[a + 1], f[a + 2], "z"), g.isFlat = e;
                return g
            },
            addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function (d, g) {
                var f = (new a.PlotLineOrBand(this, d)).render(),
                    h = this.userOptions;
                f && (g && (h[g] = h[g] || [], h[g].push(d)), this.plotLinesAndBands.push(f));
                return f
            },
            removePlotBandOrLine: function (a) {
                for (var d =
                        this.plotLinesAndBands, f = this.options, h = this.userOptions, l = d.length; l--;) d[l].id === a && d[l].destroy();
                m([f.plotLines || [], h.plotLines || [], f.plotBands || [], h.plotBands || []], function (c) {
                    for (l = c.length; l--;) c[l].id === a && v(c, c[l])
                })
            },
            removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(J, W);
    (function (a) {
        var B = a.doc,
            y = a.each,
            D = a.extend,
            p = a.format,
            d = a.isNumber,
            m = a.map,
            v = a.merge,
            t = a.pick,
            q = a.splat,
            l = a.syncTimeout,
            g = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this,
                arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split;
                this.outside = d.outside && !this.split
            },
            cleanSplit: function (a) {
                y(this.chart.series, function (f) {
                    var d = f && f.tt;
                    d && (!d.isActive || a ? f.tt = d.destroy() : d.isActive = !1)
                })
            },
            getLabel: function () {
                var f = this.chart.renderer,
                    d = this.options,
                    g;
                this.label || (this.outside && (this.container = g = a.doc.createElement("div"), g.className =
                    "highcharts-tooltip-container", a.css(g, {
                        position: "absolute",
                        top: "1px",
                        pointerEvents: d.style && d.style.pointerEvents
                    }), a.doc.body.appendChild(g), this.renderer = f = new a.Renderer(g, 0, 0)), this.split ? this.label = f.g("tooltip") : (this.label = f.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow)), this.outside && (this.label.attr({
                        x: this.distance,
                        y: this.distance
                    }),
                    this.label.xSetter = function (a) {
                        g.style.left = a + "px"
                    }, this.label.ySetter = function (a) {
                        g.style.top = a + "px"
                    }), this.label.attr({
                    zIndex: 8
                }).add());
                return this.label
            },
            update: function (a) {
                this.destroy();
                v(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, v(!0, this.options, a))
            },
            destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            },
            move: function (f, d, g, c) {
                var b = this,
                    e = b.now,
                    n = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(f - e.x) || 1 < Math.abs(d - e.y)),
                    h = b.followPointer || 1 < b.len;
                D(e, {
                    x: n ? (2 * e.x + f) / 3 : f,
                    y: n ? (e.y + d) / 2 : d,
                    anchorX: h ? void 0 : n ? (2 * e.anchorX + g) / 3 : g,
                    anchorY: h ? void 0 : n ? (e.anchorY + c) / 2 : c
                });
                b.getLabel().attr(e);
                n && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    b && b.move(f, d, g, c)
                }, 32))
            },
            hide: function (f) {
                var d = this;
                a.clearTimeout(this.hideTimer);
                f = t(f, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = l(function () {
                    d.getLabel()[f ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, f))
            },
            getAnchor: function (a, d) {
                var f = this.chart,
                    c = f.pointer,
                    b = f.inverted,
                    e = f.plotTop,
                    n = f.plotLeft,
                    g = 0,
                    h = 0,
                    l, p;
                a = q(a);
                this.followPointer && d || c.followTouchMove && d && "touchmove" === d.type ? (void 0 === d.chartX && (d = c.normalize(d)), a = [d.chartX - f.plotLeft, d.chartY - e]) : a[0].tooltipPos ? a = a[0].tooltipPos : (y(a, function (a) {
                    l = a.series.yAxis;
                    p = a.series.xAxis;
                    g += a.plotX + (!b && p ? p.left - n : 0);
                    h +=
                        (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && l ? l.top - e : 0)
                }), g /= a.length, h /= a.length, a = [b ? f.plotWidth - h : g, this.shared && !b && 1 < a.length && d ? d.chartY - e : b ? f.plotHeight - g : h]);
                return m(a, Math.round)
            },
            getPosition: function (a, d, g) {
                var c = this.chart,
                    b = this.distance,
                    e = {},
                    f = c.inverted && g.h || 0,
                    h, l = this.outside,
                    C = l ? B.documentElement.clientWidth - 2 * b : c.chartWidth,
                    w = l ? Math.max(B.body.scrollHeight, B.documentElement.scrollHeight, B.body.offsetHeight, B.documentElement.offsetHeight, B.documentElement.clientHeight) : c.chartHeight,
                    u = c.pointer.chartPosition,
                    m = ["y", w, d, (l ? u.top - b : 0) + g.plotY + c.plotTop, l ? 0 : c.plotTop, l ? w : c.plotTop + c.plotHeight],
                    k = ["x", C, a, (l ? u.left - b : 0) + g.plotX + c.plotLeft, l ? 0 : c.plotLeft, l ? C : c.plotLeft + c.plotWidth],
                    E = !this.followPointer && t(g.ttBelow, !c.inverted === !!g.negative),
                    x = function (a, c, k, n, d, g) {
                        var x = k < n - b,
                            r = n + b + k < c,
                            h = n - b - k;
                        n += b;
                        if (E && r) e[a] = n;
                        else if (!E && x) e[a] = h;
                        else if (x) e[a] = Math.min(g - k, 0 > h - f ? h : h - f);
                        else if (r) e[a] = Math.max(d, n + f + k > c ? n : n + f);
                        else return !1
                    },
                    q = function (a, c, k, f) {
                        var n;
                        f < b || f > c - b ? n = !1 : e[a] =
                            f < k / 2 ? 1 : f > c - k / 2 ? c - k - 2 : f - k / 2;
                        return n
                    },
                    H = function (a) {
                        var b = m;
                        m = k;
                        k = b;
                        h = a
                    },
                    r = function () {
                        !1 !== x.apply(0, m) ? !1 !== q.apply(0, k) || h || (H(!0), r()) : h ? e.x = e.y = 0 : (H(!0), r())
                    };
                (c.inverted || 1 < this.len) && H();
                r();
                return e
            },
            defaultFormatter: function (a) {
                var f = this.points || q(this),
                    d;
                d = [a.tooltipFooterHeaderFormatter(f[0])];
                d = d.concat(a.bodyFormatter(f));
                d.push(a.tooltipFooterHeaderFormatter(f[0], !0));
                return d
            },
            refresh: function (f, d) {
                var g, c = this.options,
                    b, e = f,
                    n, h = {},
                    l = [];
                g = c.formatter || this.defaultFormatter;
                var h = this.shared,
                    C;
                c.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = q(e)[0].series.tooltipOptions.followPointer, n = this.getAnchor(e, d), d = n[0], b = n[1], !h || e.series && e.series.noSharedTooltip ? h = e.getLabelConfig() : (y(e, function (a) {
                    a.setState("hover");
                    l.push(a.getLabelConfig())
                }), h = {
                    x: e[0].category,
                    y: e[0].y
                }, h.points = l, e = e[0]), this.len = l.length, h = g.call(h, this), C = e.series, this.distance = t(C.tooltipOptions.distance, 16), !1 === h ? this.hide() : (g = this.getLabel(), this.isHidden && g.attr({
                        opacity: 1
                    }).show(), this.split ?
                    this.renderSplit(h, q(f)) : (c.style.width || g.css({
                        width: this.chart.spacingBox.width
                    }), g.attr({
                        text: h && h.join ? h.join("") : h
                    }), g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(e.colorIndex, C.colorIndex)), g.attr({
                        stroke: c.borderColor || e.color || C.color || "#666666"
                    }), this.updatePosition({
                        plotX: d,
                        plotY: b,
                        negative: e.negative,
                        ttBelow: e.ttBelow,
                        h: n[2] || 0
                    })), this.isHidden = !1))
            },
            renderSplit: function (f, d) {
                var g = this,
                    c = [],
                    b = this.chart,
                    e = b.renderer,
                    n = !0,
                    h = this.options,
                    l = 0,
                    C = this.getLabel();
                a.isString(f) &&
                    (f = [!1, f]);
                y(f.slice(0, d.length + 1), function (a, f) {
                    if (!1 !== a) {
                        f = d[f - 1] || {
                            isHeader: !0,
                            plotX: d[0].plotX
                        };
                        var A = f.series || g,
                            k = A.tt,
                            E = f.series || {},
                            x = "highcharts-color-" + t(f.colorIndex, E.colorIndex, "none");
                        k || (A.tt = k = e.label(null, null, null, "callout", null, null, h.useHTML).addClass("highcharts-tooltip-box " + x).attr({
                            padding: h.padding,
                            r: h.borderRadius,
                            fill: h.backgroundColor,
                            stroke: h.borderColor || f.color || E.color || "#333333",
                            "stroke-width": h.borderWidth
                        }).add(C));
                        k.isActive = !0;
                        k.attr({
                            text: a
                        });
                        k.css(h.style).shadow(h.shadow);
                        a = k.getBBox();
                        E = a.width + k.strokeWidth();
                        f.isHeader ? (l = a.height, E = Math.max(0, Math.min(f.plotX + b.plotLeft - E / 2, b.chartWidth - E))) : E = f.plotX + b.plotLeft - t(h.distance, 16) - E;
                        0 > E && (n = !1);
                        a = (f.series && f.series.yAxis && f.series.yAxis.pos) + (f.plotY || 0);
                        a -= b.plotTop;
                        c.push({
                            target: f.isHeader ? b.plotHeight + l : a,
                            rank: f.isHeader ? 1 : 0,
                            size: A.tt.getBBox().height + 1,
                            point: f,
                            x: E,
                            tt: k
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(c, b.plotHeight + l);
                y(c, function (a) {
                    var e = a.point,
                        c = e.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: n || e.isHeader ? a.x : e.plotX + b.plotLeft + t(h.distance, 16),
                        y: a.pos + b.plotTop,
                        anchorX: e.isHeader ? e.plotX + b.plotLeft : e.plotX + c.xAxis.pos,
                        anchorY: e.isHeader ? a.pos + b.plotTop - 15 : e.plotY + c.yAxis.pos
                    })
                })
            },
            updatePosition: function (a) {
                var f = this.chart,
                    d = this.getLabel(),
                    c = (this.options.positioner || this.getPosition).call(this, d.width, d.height, a),
                    b = a.plotX + f.plotLeft;
                a = a.plotY + f.plotTop;
                var e;
                this.outside && (e = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(d.width + e, d.height + e, !1), b +=
                    f.pointer.chartPosition.left - c.x, a += f.pointer.chartPosition.top - c.y);
                this.move(Math.round(c.x), Math.round(c.y || 0), b, a)
            },
            getDateFormat: function (a, d, l, c) {
                var b = this.chart.time,
                    e = b.dateFormat("%m-%d %H:%M:%S.%L", d),
                    f, h, m = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    C = "millisecond";
                for (h in g) {
                    if (a === g.week && +b.dateFormat("%w", d) === l && "00:00:00.000" === e.substr(6)) {
                        h = "week";
                        break
                    }
                    if (g[h] > a) {
                        h = C;
                        break
                    }
                    if (m[h] && e.substr(m[h]) !== "01-01 00:00:00.000".substr(m[h])) break;
                    "week" !== h && (C = h)
                }
                h && (f = c[h]);
                return f
            },
            getXDateFormat: function (a, d, g) {
                d = d.dateTimeLabelFormats;
                var c = g && g.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, g.options.startOfWeek, d) : d.day) || d.year
            },
            tooltipFooterHeaderFormatter: function (a, g) {
                g = g ? "footer" : "header";
                var f = a.series,
                    c = f.tooltipOptions,
                    b = c.xDateFormat,
                    e = f.xAxis,
                    n = e && "datetime" === e.options.type && d(a.key),
                    h = c[g + "Format"];
                n && !b && (b = this.getXDateFormat(a, c, e));
                n && b && y(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    h = h.replace("{point." + a + "}", "{point." + a + ":" + b + "}")
                });
                return p(h, {
                    point: a,
                    series: f
                }, this.chart.time)
            },
            bodyFormatter: function (a) {
                return m(a, function (a) {
                    var f = a.series.tooltipOptions;
                    return (f[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, f[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.attr,
            D = a.charts,
            p = a.color,
            d = a.css,
            m = a.defined,
            v = a.each,
            t = a.extend,
            q = a.find,
            l = a.fireEvent,
            g = a.isNumber,
            f = a.isObject,
            h = a.offset,
            w = a.pick,
            c = a.splat,
            b = a.Tooltip;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                b && (a.tooltip = new b(a, c.tooltip), this.followTouchMove = w(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function (a) {
                var b = this.chart,
                    e = b.options.chart,
                    c = e.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (c = w(e.pinchType, c));
                this.zoomX = a = /x/.test(c);
                this.zoomY = c = /y/.test(c);
                this.zoomHor = a && !b || c && b;
                this.zoomVert = c && !b || a && b;
                this.hasZoom = a ||
                    c
            },
            normalize: function (a, b) {
                var e;
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = h(this.chart.container));
                return t(a, {
                    chartX: Math.round(e.pageX - b.left),
                    chartY: Math.round(e.pageY - b.top)
                })
            },
            getCoordinates: function (a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                v(this.chart.axes, function (e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: e,
                        value: e.toValue(a[e.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            findNearestKDPoint: function (a, b, c) {
                var e;
                v(a, function (a) {
                    var d = !(a.noSharedTooltip &&
                        b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(c, d);
                    if ((d = f(a, !0)) && !(d = !f(e, !0))) var d = e.distX - a.distX,
                        n = e.dist - a.dist,
                        g = (a.series.group && a.series.group.zIndex) - (e.series.group && e.series.group.zIndex),
                        d = 0 < (0 !== d && b ? d : 0 !== n ? n : 0 !== g ? g : e.series.index > a.series.index ? -1 : 1);
                    d && (e = a)
                });
                return e
            },
            getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getChartCoordinatesFromPoint: function (a, b) {
                var e = a.series,
                    c = e.xAxis,
                    e = e.yAxis,
                    f = w(a.clientX, a.plotX),
                    d = a.shapeArgs;
                if (c && e) return b ? {
                    chartX: c.len + c.pos - f,
                    chartY: e.len + e.pos - a.plotY
                } : {
                    chartX: f + c.pos,
                    chartY: a.plotY + e.pos
                };
                if (d && d.x && d.y) return {
                    chartX: d.x,
                    chartY: d.y
                }
            },
            getHoverData: function (b, c, d, g, h, l, u) {
                var e, k = [],
                    n = u && u.isBoosting;
                g = !(!g || !b);
                u = c && !c.stickyTracking ? [c] : a.grep(d, function (a) {
                    return a.visible && !(!h && a.directTouch) && w(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                c = (e = g ? b : this.findNearestKDPoint(u, h, l)) && e.series;
                e && (h && !c.noSharedTooltip ? (u = a.grep(d, function (a) {
                    return a.visible &&
                        !(!h && a.directTouch) && w(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), v(u, function (a) {
                    var b = q(a.points, function (a) {
                        return a.x === e.x && !a.isNull
                    });
                    f(b) && (n && (b = a.getPoint(b)), k.push(b))
                })) : k.push(e));
                return {
                    hoverPoint: e,
                    hoverSeries: c,
                    hoverPoints: k
                }
            },
            runPointActions: function (b, c) {
                var e = this.chart,
                    f = e.tooltip && e.tooltip.options.enabled ? e.tooltip : void 0,
                    d = f ? f.shared : !1,
                    n = c || e.hoverPoint,
                    g = n && n.series || e.hoverSeries,
                    g = this.getHoverData(n, g, e.series, !!c || g && g.directTouch && this.isDirectTouch, d,
                        b, {
                            isBoosting: e.isBoosting
                        }),
                    h, n = g.hoverPoint;
                h = g.hoverPoints;
                g = g.hoverSeries;
                c = b && "touchmove" === b.type ? !0 === this.followTouchMove : g && g.tooltipOptions.followPointer;
                d = d && g && !g.noSharedTooltip;
                if (n && (n !== e.hoverPoint || f && f.isHidden)) {
                    v(e.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, h) && b.setState()
                    });
                    v(h || [], function (a) {
                        a.setState("hover")
                    });
                    if (e.hoverSeries !== g) g.onMouseOver();
                    e.hoverPoint && e.hoverPoint.firePointEvent("mouseOut");
                    if (!n.series) return;
                    n.firePointEvent("mouseOver");
                    e.hoverPoints = h;
                    e.hoverPoint =
                        n;
                    f && f.refresh(d ? h : n, b)
                } else c && f && !f.isHidden && (n = f.getAnchor([{}], b), f.updatePosition({
                    plotX: n[0],
                    plotY: n[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = B(e.container.ownerDocument, "mousemove", function (b) {
                    var e = D[a.hoverChartIndex];
                    if (e) e.pointer.onDocumentMouseMove(b)
                }));
                v(e.axes, function (e) {
                    var c = w(e.crosshair.snap, !0),
                        k = c ? a.find(h, function (a) {
                            return a.series[e.coll] === e
                        }) : void 0;
                    k || !c ? e.drawCrosshair(b, k) : e.hideCrosshair()
                })
            },
            reset: function (a, b) {
                var e = this.chart,
                    f = e.hoverSeries,
                    d = e.hoverPoint,
                    n = e.hoverPoints,
                    g = e.tooltip,
                    h = g && g.shared ? n : d;
                a && h && v(c(h), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) g && h && (g.refresh(h), g.shared && n ? v(n, function (a) {
                    a.setState(a.state, !0);
                    a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a);
                    a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a)
                }) : d && (d.setState(d.state, !0), v(e.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, d)
                })));
                else {
                    if (d) d.onMouseOut();
                    n && v(n, function (a) {
                        a.setState()
                    });
                    if (f) f.onMouseOut();
                    g && g.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    v(e.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = e.hoverPoints = e.hoverPoint = null
                }
            },
            scaleGroups: function (a, b) {
                var e = this.chart,
                    c;
                v(e.series, function (f) {
                    c = a || f.getPlotBox();
                    f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(c), f.markerGroup && (f.markerGroup.attr(c), f.markerGroup.clip(b ? e.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(c))
                });
                e.clipRect.attr(b || e.clipBox)
            },
            dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown =
                    a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function (a) {
                var b = this.chart,
                    e = b.options.chart,
                    c = a.chartX,
                    f = a.chartY,
                    d = this.zoomHor,
                    g = this.zoomVert,
                    h = b.plotLeft,
                    k = b.plotTop,
                    l = b.plotWidth,
                    x = b.plotHeight,
                    m, H = this.selectionMarker,
                    r = this.mouseDownX,
                    q = this.mouseDownY,
                    w = e.panKey && a[e.panKey + "Key"];
                H && H.touch || (c < h ? c = h : c > h + l && (c = h + l), f < k ? f = k : f > k + x && (f = k + x), this.hasDragged = Math.sqrt(Math.pow(r - c, 2) + Math.pow(q - f, 2)), 10 < this.hasDragged && (m = b.isInsidePlot(r -
                    h, q - k), b.hasCartesianSeries && (this.zoomX || this.zoomY) && m && !w && !H && (this.selectionMarker = H = b.renderer.rect(h, k, d ? 1 : l, g ? 1 : x, 0).attr({
                    fill: e.selectionMarkerFill || p("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), H && d && (c -= r, H.attr({
                    width: Math.abs(c),
                    x: (0 < c ? 0 : c) + r
                })), H && g && (c = f - q, H.attr({
                    height: Math.abs(c),
                    y: (0 < c ? 0 : c) + q
                })), m && !H && e.panning && b.pan(a, e.panning)))
            },
            drop: function (a) {
                var b = this,
                    c = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var f = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        h = this.selectionMarker,
                        u = h.attr ? h.attr("x") : h.x,
                        q = h.attr ? h.attr("y") : h.y,
                        k = h.attr ? h.attr("width") : h.width,
                        E = h.attr ? h.attr("height") : h.height,
                        x;
                    if (this.hasDragged || e) v(c.axes, function (c) {
                        if (c.zoomEnabled && m(c.min) && (e || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [c.coll]])) {
                            var d = c.horiz,
                                n = "touchend" === a.type ? c.minPixelPadding : 0,
                                g = c.toValue((d ? u : q) + n),
                                d = c.toValue((d ? u + k : q + E) - n);
                            f[c.coll].push({
                                axis: c,
                                min: Math.min(g, d),
                                max: Math.max(g, d)
                            });
                            x = !0
                        }
                    }), x && l(c, "selection", f, function (a) {
                        c.zoom(t(a, e ? {
                            animation: !1
                        } : null))
                    });
                    g(c.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    e && this.scaleGroups()
                }
                c && g(c.index) && (d(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function (a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            },
            onDocumentMouseUp: function (b) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function (a) {
                var b =
                    this.chart,
                    c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (b) {
                var c = D[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            },
            onContainerMouseMove: function (b) {
                var c = this.chart;
                m(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            },
            inClass: function (a, b) {
                for (var c; a;) {
                    if (c = y(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            },
            onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") ||
                        this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function (a) {
                var b = this.chart,
                    c = b.hoverPoint,
                    e = b.plotLeft,
                    f = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (l(c.series, "click", t(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - f) && l(b, "click", a)))
            },
            setDOMEvents: function () {
                var b = this,
                    c = b.chart.container,
                    f = c.ownerDocument;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = B(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = B(f, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = B(f, "touchend", b.onDocumentTouchEnd)))
            },
            destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd && (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) {
                    b[c] = null
                })
            }
        }
    })(J);
    (function (a) {
        var B = a.charts,
            y = a.each,
            D = a.extend,
            p = a.map,
            d = a.noop,
            m = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function (a, d, m, l, g, f) {
                this.zoomHor &&
                    this.pinchTranslateDirection(!0, a, d, m, l, g, f);
                this.zoomVert && this.pinchTranslateDirection(!1, a, d, m, l, g, f)
            },
            pinchTranslateDirection: function (a, d, m, l, g, f, h, w) {
                var c = this.chart,
                    b = a ? "x" : "y",
                    e = a ? "X" : "Y",
                    n = "chart" + e,
                    q = a ? "width" : "height",
                    p = c["plot" + (a ? "Left" : "Top")],
                    C, t, u = w || 1,
                    F = c.inverted,
                    k = c.bounds[a ? "h" : "v"],
                    E = 1 === d.length,
                    x = d[0][n],
                    L = m[0][n],
                    H = !E && d[1][n],
                    r = !E && m[1][n],
                    z;
                m = function () {
                    !E && 20 < Math.abs(x - H) && (u = w || Math.abs(L - r) / Math.abs(x - H));
                    t = (p - L) / u + x;
                    C = c["plot" + (a ? "Width" : "Height")] / u
                };
                m();
                d = t;
                d < k.min ?
                    (d = k.min, z = !0) : d + C > k.max && (d = k.max - C, z = !0);
                z ? (L -= .8 * (L - h[b][0]), E || (r -= .8 * (r - h[b][1])), m()) : h[b] = [L, r];
                F || (f[b] = t - p, f[q] = C);
                f = F ? 1 / u : u;
                g[q] = C;
                g[b] = d;
                l[F ? a ? "scaleY" : "scaleX" : "scale" + e] = u;
                l["translate" + e] = f * p + (L - f * x)
            },
            pinch: function (a) {
                var t = this,
                    q = t.chart,
                    l = t.pinchDown,
                    g = a.touches,
                    f = g.length,
                    h = t.lastValidTouch,
                    w = t.hasZoom,
                    c = t.selectionMarker,
                    b = {},
                    e = 1 === f && (t.inClass(a.target, "highcharts-tracker") && q.runTrackerClick || t.runChartClick),
                    n = {};
                1 < f && (t.initiated = !0);
                w && t.initiated && !e && a.preventDefault();
                p(g, function (a) {
                    return t.normalize(a)
                });
                "touchstart" === a.type ? (y(g, function (a, b) {
                        l[b] = {
                            chartX: a.chartX,
                            chartY: a.chartY
                        }
                    }), h.x = [l[0].chartX, l[1] && l[1].chartX], h.y = [l[0].chartY, l[1] && l[1].chartY], y(q.axes, function (a) {
                        if (a.zoomEnabled) {
                            var b = q.bounds[a.horiz ? "h" : "v"],
                                c = a.minPixelPadding,
                                e = a.toPixels(m(a.options.min, a.dataMin)),
                                f = a.toPixels(m(a.options.max, a.dataMax)),
                                d = Math.max(e, f);
                            b.min = Math.min(a.pos, Math.min(e, f) - c);
                            b.max = Math.max(a.pos + a.len, d + c)
                        }
                    }), t.res = !0) : t.followTouchMove && 1 === f ? this.runPointActions(t.normalize(a)) :
                    l.length && (c || (t.selectionMarker = c = D({
                        destroy: d,
                        touch: !0
                    }, q.plotBox)), t.pinchTranslate(l, g, b, c, n, h), t.hasPinched = w, t.scaleGroups(b, n), t.res && (t.res = !1, this.reset(!1, 0)))
            },
            touch: function (d, p) {
                var q = this.chart,
                    l, g;
                if (q.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = q.index;
                1 === d.touches.length ? (d = this.normalize(d), (g = q.isInsidePlot(d.chartX - q.plotLeft, d.chartY - q.plotTop)) && !q.openMenu ? (p && this.runPointActions(d), "touchmove" === d.type && (p = this.pinchDown, l = p[0] ?
                    4 <= Math.sqrt(Math.pow(p[0].chartX - d.chartX, 2) + Math.pow(p[0].chartY - d.chartY, 2)) : !1), m(l, !0) && this.pinch(d)) : p && this.reset()) : 2 === d.touches.length && this.pinch(d)
            },
            onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function (a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function (d) {
                B[a.hoverChartIndex] && B[a.hoverChartIndex].pointer.drop(d)
            }
        })
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.charts,
            D = a.css,
            p = a.doc,
            d = a.extend,
            m = a.noop,
            v = a.Pointer,
            t = a.removeEvent,
            q = a.win,
            l = a.wrap;
        if (!a.hasTouch && (q.PointerEvent || q.MSPointerEvent)) {
            var g = {},
                f = !!q.PointerEvent,
                h = function () {
                    var c = [];
                    c.item = function (a) {
                        return this[a]
                    };
                    a.objectEach(g, function (a) {
                        c.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return c
                },
                w = function (c, b, e, f) {
                    "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !y[a.hoverChartIndex] || (f(c), f = y[a.hoverChartIndex].pointer, f[b]({
                        type: e,
                        target: c.currentTarget,
                        preventDefault: m,
                        touches: h()
                    }))
                };
            d(v.prototype, {
                onContainerPointerDown: function (a) {
                    w(a, "onContainerTouchStart",
                        "touchstart",
                        function (a) {
                            g[a.pointerId] = {
                                pageX: a.pageX,
                                pageY: a.pageY,
                                target: a.currentTarget
                            }
                        })
                },
                onContainerPointerMove: function (a) {
                    w(a, "onContainerTouchMove", "touchmove", function (a) {
                        g[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        g[a.pointerId].target || (g[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function (a) {
                    w(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete g[a.pointerId]
                    })
                },
                batchMSEvents: function (a) {
                    a(this.chart.container, f ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, f ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(p, f ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            l(v.prototype, "init", function (a, b, e) {
                a.call(this, b, e);
                this.hasZoom && D(b.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            l(v.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(B)
            });
            l(v.prototype, "destroy", function (a) {
                this.batchMSEvents(t);
                a.call(this)
            })
        }
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.css,
            D = a.discardElement,
            p = a.defined,
            d = a.each,
            m = a.fireEvent,
            v = a.isFirefox,
            t = a.marginNames,
            q = a.merge,
            l = a.pick,
            g = a.setAnimation,
            f = a.stableSort,
            h = a.win,
            w = a.wrap;
        a.Legend = function (a, b) {
            this.init(a, b)
        };
        a.Legend.prototype = {
            init: function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), B(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = B(this.chart, "render", function () {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender &&
                    this.unchartrender())
            },
            setOptions: function (a) {
                var b = l(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = q(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding = b;
                this.initialItemY = b - 5;
                this.symbolWidth = l(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            },
            update: function (a, b) {
                var c = this.chart;
                this.setOptions(q(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                l(b, !0) && c.redraw();
                m(this,
                    "afterUpdate")
            },
            colorizeItem: function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var c = this.options,
                    f = a.legendItem,
                    d = a.legendLine,
                    g = a.legendSymbol,
                    h = this.itemHiddenStyle.color,
                    c = b ? c.itemStyle.color : h,
                    l = b ? a.color || h : h,
                    u = a.options && a.options.marker,
                    q = {
                        fill: l
                    };
                f && f.css({
                    fill: c,
                    color: c
                });
                d && d.attr({
                    stroke: l
                });
                g && (u && g.isMarker && (q = a.pointAttribs(), b || (q.stroke = q.fill = h)), g.attr(q));
                m(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            },
            positionItems: function () {
                d(this.allItems,
                    this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            },
            positionItem: function (a) {
                var b = this.options,
                    c = b.symbolPadding,
                    b = !b.rtl,
                    f = a._legendItemPos,
                    d = f[0],
                    f = f[1],
                    g = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[p(a.translateY) ? "animate" : "attr"]({
                    translateX: b ? d : this.legendWidth - d - 2 * c - 4,
                    translateY: f
                });
                g && (g.x = d, g.y = f)
            },
            destroyItem: function (a) {
                var b = a.checkbox;
                d(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                b && D(a.checkbox)
            },
            destroy: function () {
                function a(a) {
                    this[a] &&
                        (this[a] = this[a].destroy())
                }
                d(this.getAllItems(), function (b) {
                    d(["legendItem", "legendGroup"], a, b)
                });
                d("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr,
                    b, e = this.clipHeight || this.legendHeight,
                    f = this.titleHeight;
                a && (b = a.translateY, d(this.allItems, function (c) {
                    var d = c.checkbox,
                        g;
                    d && (g = b + f + d.y + (this.scrollOffset || 0) + 3, y(d, {
                        left: a.translateX + c.checkboxOffset + d.x - 20 + "px",
                        top: g + "px",
                        display: g > b - 6 && g < b + e - 6 ?
                            "" : "none"
                    }))
                }, this))
            },
            renderTitle: function () {
                var a = this.options,
                    b = this.padding,
                    e = a.title,
                    f = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, b - 3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(e.style).add(this.group)), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: f
                }));
                this.titleHeight = f
            },
            setText: function (c) {
                var b = this.options;
                c.legendItem.attr({
                    text: b.labelFormat ? a.format(b.labelFormat, c, this.chart.time) : b.labelFormatter.call(c)
                })
            },
            renderItem: function (a) {
                var b = this.chart,
                    c = b.renderer,
                    f = this.options,
                    d = this.symbolWidth,
                    g = f.symbolPadding,
                    h = this.itemStyle,
                    m = this.itemHiddenStyle,
                    u = "horizontal" === f.layout ? l(f.itemDistance, 20) : 0,
                    p = !f.rtl,
                    k = a.legendItem,
                    E = !a.series,
                    x = !E && a.series.drawLegendSymbol ? a.series : a,
                    w = x.options,
                    w = this.createCheckboxForItem && w && w.showCheckbox,
                    u = d + g + u + (w ? 20 : 0),
                    H = f.useHTML,
                    r = a.options.className;
                k || (a.legendGroup = c.g("legend-item").addClass("highcharts-" + x.type + "-series highcharts-color-" + a.colorIndex + (r ? " " + r :
                    "") + (E ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = k = c.text("", p ? d + g : -g, this.baseline || 0, H).css(q(a.visible ? h : m)).attr({
                    align: p ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (d = h.fontSize, this.fontMetrics = c.fontMetrics(d, k), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, k.attr("y", this.baseline)), this.symbolHeight = f.symbolHeight || this.fontMetrics.f, x.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, k, H), w && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                h.width || k.css({
                    width: (f.itemWidth || f.width || b.spacingBox.width) - u
                });
                this.setText(a);
                b = k.getBBox();
                a.itemWidth = a.checkboxOffset = f.itemWidth || a.legendItemWidth || b.width + u;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
            },
            layoutItem: function (a) {
                var b = this.options,
                    c = this.padding,
                    f = "horizontal" === b.layout,
                    d = a.itemHeight,
                    g = b.itemMarginBottom ||
                    0,
                    h = this.itemMarginTop,
                    m = f ? l(b.itemDistance, 20) : 0,
                    u = b.width,
                    q = u || this.chart.spacingBox.width - 2 * c - b.x,
                    b = b.alignColumns && this.totalItemWidth > q ? this.maxItemWidth : a.itemWidth;
                f && this.itemX - c + b > q && (this.itemX = c, this.itemY += h + this.lastLineHeight + g, this.lastLineHeight = 0);
                this.lastItemY = h + this.itemY + g;
                this.lastLineHeight = Math.max(d, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                f ? this.itemX += b : (this.itemY += h + d + g, this.lastLineHeight = d);
                this.offsetWidth = u || Math.max((f ? this.itemX - c - (a.checkbox ?
                    0 : m) : b) + c, this.offsetWidth)
            },
            getAllItems: function () {
                var a = [];
                d(this.chart.series, function (b) {
                    var c = b && b.options;
                    b && l(c.showInLegend, p(c.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === c.legendType ? b.data : b)))
                });
                m(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            },
            getAlignment: function () {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            },
            adjustMargins: function (a, b) {
                var c = this.chart,
                    f = this.options,
                    g = this.getAlignment();
                g && d([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, d) {
                    e.test(g) && !p(a[d]) && (c[t[d]] = Math.max(c[t[d]], c.legend[(d + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][d] * f[d % 2 ? "x" : "y"] + l(f.margin, 12) + b[d] + (0 === d && void 0 !== c.options.title.margin ? c.titleOffset + c.options.title.margin : 0)))
                })
            },
            proximatePositions: function () {
                var c = this.chart,
                    b = [],
                    e = "left" === this.options.align;
                d(this.allItems, function (f) {
                    var d, g;
                    d = e;
                    f.xAxis && f.points && (f.xAxis.options.reversed && (d = !d), d = a.find(d ? f.points : f.points.slice(0).reverse(), function (b) {
                        return a.isNumber(b.plotY)
                    }), g = f.legendGroup.getBBox().height, b.push({
                        target: f.visible ? (d ? d.plotY : f.xAxis.height) - .3 * g : c.plotHeight,
                        size: g,
                        item: f
                    }))
                }, this);
                a.distribute(b, c.plotHeight);
                d(b, function (a) {
                    a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos
                })
            },
            render: function () {
                var a = this.chart,
                    b = a.renderer,
                    e = this.group,
                    g, h, l, m = this.box,
                    p = this.options,
                    u = this.padding;
                this.itemX = u;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth =
                    0;
                e || (this.group = e = b.g("legend").attr({
                    zIndex: 7
                }).add(), this.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(e), this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                g = this.getAllItems();
                f(g, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                p.reversed && g.reverse();
                this.allItems = g;
                this.display = h = !!g.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                d(g, this.renderItem, this);
                d(g, this.layoutItem, this);
                g = (p.width || this.offsetWidth) +
                    u;
                l = this.lastItemY + this.lastLineHeight + this.titleHeight;
                l = this.handleOverflow(l);
                l += u;
                m || (this.box = m = b.rect().addClass("highcharts-legend-box").attr({
                    r: p.borderRadius
                }).add(e), m.isNew = !0);
                m.attr({
                    stroke: p.borderColor,
                    "stroke-width": p.borderWidth || 0,
                    fill: p.backgroundColor || "none"
                }).shadow(p.shadow);
                0 < g && 0 < l && (m[m.isNew ? "attr" : "animate"](m.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: g,
                    height: l
                }, m.strokeWidth())), m.isNew = !1);
                m[h ? "show" : "hide"]();
                this.legendWidth = g;
                this.legendHeight = l;
                h && (b = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) &&
                    (b = q(b, {
                        y: b.y + a.titleOffset + a.options.title.margin
                    })), e.align(q(p, {
                        width: g,
                        height: l,
                        verticalAlign: this.proximate ? "top" : p.verticalAlign
                    }), !0, b));
                this.proximate || this.positionItems()
            },
            handleOverflow: function (a) {
                var b = this,
                    c = this.chart,
                    f = c.renderer,
                    g = this.options,
                    h = g.y,
                    m = this.padding,
                    c = c.spacingBox.height + ("top" === g.verticalAlign ? -h : h) - m,
                    h = g.maxHeight,
                    q, u = this.clipRect,
                    p = g.navigation,
                    k = l(p.animation, !0),
                    E = p.arrowSize || 12,
                    x = this.nav,
                    w = this.pages,
                    H, r = this.allItems,
                    z = function (a) {
                        "number" === typeof a ? u.attr({
                                height: a
                            }) :
                            u && (b.clipRect = u.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + m + "px,9999px," + (m + a) + "px,0)" : "auto")
                    };
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (c /= 2);
                h && (c = Math.min(c, h));
                w.length = 0;
                a > c && !1 !== p.enabled ? (this.clipHeight = q = Math.max(c - 20 - this.titleHeight - m, 0), this.currentPage = l(this.currentPage, 1), this.fullHeight = a, d(r, function (a, b) {
                    var c = a._legendItemPos[1],
                        e = Math.round(a.legendItem.getBBox().height),
                        f = w.length;
                    if (!f || c - w[f - 1] > q &&
                        (H || c) !== w[f - 1]) w.push(H || c), f++;
                    a.pageIx = f - 1;
                    H && (r[b - 1].pageIx = f - 1);
                    b === r.length - 1 && c + e - w[f - 1] > q && (w.push(c), a.pageIx = f);
                    c !== H && (H = c)
                }), u || (u = b.clipRect = f.clipRect(0, m, 9999, 0), b.contentGroup.clip(u)), z(q), x || (this.nav = x = f.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = f.symbol("triangle", 0, 0, E, E).on("click", function () {
                    b.scroll(-1, k)
                }).add(x), this.pager = f.text("", 15, 10).addClass("highcharts-legend-navigation").css(p.style).add(x), this.down = f.symbol("triangle-down", 0, 0, E, E).on("click", function () {
                    b.scroll(1,
                        k)
                }).add(x)), b.scroll(0), a = c) : x && (z(), this.nav = x.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function (a, b) {
                var c = this.pages,
                    f = c.length;
                a = this.currentPage + a;
                var d = this.clipHeight,
                    h = this.options.navigation,
                    l = this.pager,
                    m = this.padding;
                a > f && (a = f);
                0 < a && (void 0 !== b && g(b, this.chart), this.nav.attr({
                        translateX: m,
                        translateY: d + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    l.attr({
                        text: a + "/" + f
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? h.inactiveColor : h.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === f ? h.inactiveColor : h.activeColor
                    }).css({
                        cursor: a === f ? "default" : "pointer"
                    }), this.scrollOffset = -c[a - 1] + this.initialItemY, this.scrollGroup.animate({
                        translateY: this.scrollOffset
                    }), this.currentPage = a, this.positionCheckboxes())
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, b) {
                var c = a.symbolHeight,
                    f = a.options.squareSymbol;
                b.legendSymbol = this.chart.renderer.rect(f ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, f ? c : a.symbolWidth, c, l(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(b.legendGroup)
            },
            drawLineMarker: function (a) {
                var b = this.options,
                    c = b.marker,
                    f = a.symbolWidth,
                    d = a.symbolHeight,
                    g = d / 2,
                    h = this.chart.renderer,
                    m = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var u;
                u = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle &&
                    (u.dashstyle = b.dashStyle);
                this.legendLine = h.path(["M", 0, a, "L", f, a]).addClass("highcharts-graph").attr(u).add(m);
                c && !1 !== c.enabled && f && (b = Math.min(l(c.radius, g), g), 0 === this.symbol.indexOf("url") && (c = q(c, {
                    width: d,
                    height: d
                }), b = 0), this.legendSymbol = c = h.symbol(this.symbol, f / 2 - b, a - b, 2 * b, 2 * b, c).addClass("highcharts-point").add(m), c.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(h.navigator.userAgent) || v) && w(a.Legend.prototype, "positionItem", function (a, b) {
            var c = this,
                f = function () {
                    b._legendItemPos && a.call(c, b)
                };
            f();
            setTimeout(f)
        })
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.animate,
            D = a.animObject,
            p = a.attr,
            d = a.doc,
            m = a.Axis,
            v = a.createElement,
            t = a.defaultOptions,
            q = a.discardElement,
            l = a.charts,
            g = a.css,
            f = a.defined,
            h = a.each,
            w = a.extend,
            c = a.find,
            b = a.fireEvent,
            e = a.grep,
            n = a.isNumber,
            A = a.isObject,
            G = a.isString,
            C = a.Legend,
            M = a.marginNames,
            u = a.merge,
            F = a.objectEach,
            k = a.Pointer,
            E = a.pick,
            x = a.pInt,
            L = a.removeEvent,
            H = a.seriesTypes,
            r = a.splat,
            z = a.syncTimeout,
            N = a.win,
            S = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a,
            b, c) {
            return new S(a, b, c)
        };
        w(S.prototype, {
            callbacks: [],
            getArgs: function () {
                var a = [].slice.call(arguments);
                if (G(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function (c, e) {
                var f, k, d = c.series,
                    g = c.plotOptions || {};
                b(this, "init", {
                    args: arguments
                }, function () {
                    c.series = null;
                    f = u(t, c);
                    for (k in f.plotOptions) f.plotOptions[k].tooltip = g[k] && u(g[k].tooltip) || void 0;
                    f.tooltip.userOptions = c.chart && c.chart.forExport && c.tooltip.userOptions || c.tooltip;
                    f.series = c.series = d;
                    this.userOptions = c;
                    var h =
                        f.chart,
                        x = h.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = e;
                    this.isResizing = 0;
                    this.options = f;
                    this.axes = [];
                    this.series = [];
                    this.time = c.time && a.keys(c.time).length ? new a.Time(c.time) : a.time;
                    this.hasCartesianSeries = h.showAxes;
                    var r = this;
                    r.index = l.length;
                    l.push(r);
                    a.chartCount++;
                    x && F(x, function (a, b) {
                        B(r, b, a)
                    });
                    r.xAxis = [];
                    r.yAxis = [];
                    r.pointCount = r.colorCounter = r.symbolCounter = 0;
                    b(r, "afterInit");
                    r.firstRender()
                })
            },
            initSeries: function (b) {
                var c = this.options.chart;
                (c = H[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function (a, b, c) {
                var e = c ? b : a;
                a = c ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function (c) {
                b(this, "beforeRedraw");
                var e = this.axes,
                    f = this.series,
                    k = this.pointer,
                    d = this.legend,
                    g = this.isDirtyLegend,
                    x, r, l = this.hasCartesianSeries,
                    n = this.isDirtyBox,
                    E, m = this.renderer,
                    u = m.isHidden(),
                    q = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(c, this);
                u && this.temporaryDisplay();
                this.layOutTitles();
                for (c = f.length; c--;)
                    if (E = f[c], E.options.stacking && (x = !0, E.isDirty)) {
                        r = !0;
                        break
                    }
                if (r)
                    for (c = f.length; c--;) E = f[c], E.options.stacking && (E.isDirty = !0);
                h(f, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), g = !0);
                    a.isDirtyData && b(a, "updatedData")
                });
                g && d.options.enabled && (d.render(), this.isDirtyLegend = !1);
                x && this.getStacks();
                l && h(e, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                l && (h(e, function (a) {
                    a.isDirty && (n = !0)
                }), h(e, function (a) {
                    var c = a.min + "," + a.max;
                    a.extKey !== c && (a.extKey = c, q.push(function () {
                        b(a, "afterSetExtremes", w(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (n || x) && a.redraw()
                }));
                n && this.drawChartBox();
                b(this, "predraw");
                h(f, function (a) {
                    (n || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                k && k.reset(!0);
                m.draw();
                b(this, "redraw");
                b(this, "render");
                u && this.temporaryDisplay(!0);
                h(q, function (a) {
                    a.call()
                })
            },
            get: function (a) {
                function b(b) {
                    return b.id ===
                        a || b.options && b.options.id === a
                }
                var e, f = this.series,
                    k;
                e = c(this.axes, b) || c(this.series, b);
                for (k = 0; !e && k < f.length; k++) e = c(f[k].points || [], b);
                return e
            },
            getAxes: function () {
                var a = this,
                    c = this.options,
                    e = c.xAxis = r(c.xAxis || {}),
                    c = c.yAxis = r(c.yAxis || {});
                b(this, "getAxes");
                h(e, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                h(c, function (a, b) {
                    a.index = b
                });
                e = e.concat(c);
                h(e, function (b) {
                    new m(a, b)
                });
                b(this, "afterGetAxes")
            },
            getSelectedPoints: function () {
                var a = [];
                h(this.series, function (b) {
                    a = a.concat(e(b.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function () {
                return e(this.series, function (a) {
                    return a.selected
                })
            },
            setTitle: function (a, b, c) {
                var e = this,
                    f = e.options,
                    k;
                k = f.title = u({
                    style: {
                        color: "#333333",
                        fontSize: f.isStock ? "16px" : "18px"
                    }
                }, f.title, a);
                f = f.subtitle = u({
                    style: {
                        color: "#666666"
                    }
                }, f.subtitle, b);
                h([
                    ["title", a, k],
                    ["subtitle", b, f]
                ], function (a, b) {
                    var c = a[0],
                        f = e[c],
                        k = a[1];
                    a = a[2];
                    f && k && (e[c] = f = f.destroy());
                    a && !f && (e[c] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                            align: a.align,
                            "class": "highcharts-" + c,
                            zIndex: a.zIndex || 4
                        }).add(),
                        e[c].update = function (a) {
                            e.setTitle(!b && a, b && a)
                        }, e[c].css(a.style))
                });
                e.layOutTitles(c)
            },
            layOutTitles: function (a) {
                var b = 0,
                    c, e = this.renderer,
                    f = this.spacingBox;
                h(["title", "subtitle"], function (a) {
                    var c = this[a],
                        k = this.options[a];
                    a = "title" === a ? -3 : k.verticalAlign ? 0 : b + 2;
                    var d;
                    c && (d = k.style.fontSize, d = e.fontMetrics(d, c).b, c.css({
                        width: (k.width || f.width + k.widthAdjust) + "px"
                    }).align(w({
                        y: a + d
                    }, k), !1, "spacingBox"), k.floating || k.verticalAlign || (b = Math.ceil(b + c.getBBox(k.useHTML).height)))
                }, this);
                c = this.titleOffset !==
                    b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && E(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function () {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    e = this.renderTo;
                f(c) || (this.containerWidth = a.getStyle(e, "width"));
                f(b) || (this.containerHeight = a.getStyle(e, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            },
            temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (d.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        d.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, d.body.appendChild(c));
                        if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                                display: c.style.display,
                                height: c.style.height,
                                overflow: c.style.overflow
                            }, b = {
                                display: "block",
                                overflow: "hidden"
                            }, c !== this.renderTo &&
                            (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === d.body) break
                    }
            },
            setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function () {
                var c, e = this.options,
                    f = e.chart,
                    k, g;
                c = this.renderTo;
                var h = a.uniqueKey(),
                    r;
                c || (this.renderTo = c = f.renderTo);
                G(c) && (this.renderTo = c = d.getElementById(c));
                c || a.error(13, !0);
                k = x(p(c, "data-highcharts-chart"));
                n(k) && l[k] && l[k].hasRendered && l[k].destroy();
                p(c, "data-highcharts-chart",
                    this.index);
                c.innerHTML = "";
                f.skipClone || c.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                k = this.chartWidth;
                g = this.chartHeight;
                r = w({
                    position: "relative",
                    overflow: "hidden",
                    width: k + "px",
                    height: g + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, f.style);
                this.container = c = v("div", {
                    id: h
                }, r, c);
                this._cursor = c.style.cursor;
                this.renderer = new(a[f.renderer] || a.Renderer)(c, k, g, null, f.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(f.className);
                this.renderer.setStyle(f.style);
                this.renderer.chartIndex = this.index;
                b(this, "afterGetContainer")
            },
            getMargins: function (a) {
                var c = this.spacing,
                    e = this.margin,
                    k = this.titleOffset;
                this.resetMargins();
                k && !f(e[0]) && (this.plotTop = Math.max(this.plotTop, k + this.options.title.margin + c[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(e, c);
                b(this, "getMargins");
                a || this.getAxisMargins()
            },
            getAxisMargins: function () {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    c = a.margin;
                a.hasCartesianSeries && h(a.axes, function (a) {
                    a.visible &&
                        a.getOffset()
                });
                h(M, function (e, k) {
                    f(c[k]) || (a[e] += b[k])
                });
                a.setChartSize()
            },
            reflow: function (b) {
                var c = this,
                    e = c.options.chart,
                    k = c.renderTo,
                    g = f(e.width) && f(e.height),
                    h = e.width || a.getStyle(k, "width"),
                    e = e.height || a.getStyle(k, "height"),
                    k = b ? b.target : N;
                if (!g && !c.isPrinting && h && e && (k === N || k === d)) {
                    if (h !== c.containerWidth || e !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = z(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = h;
                    c.containerHeight = e
                }
            },
            setReflow: function (a) {
                var b =
                    this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = B(N, "resize", function (a) {
                    b.reflow(a)
                }), B(this, "destroy", this.unbindReflow))
            },
            setSize: function (c, e, f) {
                var k = this,
                    d = k.renderer;
                k.isResizing += 1;
                a.setAnimation(f, k);
                k.oldChartHeight = k.chartHeight;
                k.oldChartWidth = k.chartWidth;
                void 0 !== c && (k.options.chart.width = c);
                void 0 !== e && (k.options.chart.height = e);
                k.getChartSize();
                c = d.globalAnimation;
                (c ? y : g)(k.container, {
                    width: k.chartWidth + "px",
                    height: k.chartHeight +
                        "px"
                }, c);
                k.setChartSize(!0);
                d.setSize(k.chartWidth, k.chartHeight, f);
                h(k.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                k.isDirtyLegend = !0;
                k.isDirtyBox = !0;
                k.layOutTitles();
                k.getMargins();
                k.redraw(f);
                k.oldChartHeight = null;
                b(k, "resize");
                z(function () {
                    k && b(k, "endResize", null, function () {
                        --k.isResizing
                    })
                }, D(c).duration)
            },
            setChartSize: function (a) {
                var c = this.inverted,
                    e = this.renderer,
                    f = this.chartWidth,
                    k = this.chartHeight,
                    d = this.options.chart,
                    g = this.spacing,
                    x = this.clipOffset,
                    r, l, n, E;
                this.plotLeft = r = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = n = Math.max(0, Math.round(f - r - this.marginRight));
                this.plotHeight = E = Math.max(0, Math.round(k - l - this.marginBottom));
                this.plotSizeX = c ? E : n;
                this.plotSizeY = c ? n : E;
                this.plotBorderWidth = d.plotBorderWidth || 0;
                this.spacingBox = e.spacingBox = {
                    x: g[3],
                    y: g[0],
                    width: f - g[3] - g[1],
                    height: k - g[0] - g[2]
                };
                this.plotBox = e.plotBox = {
                    x: r,
                    y: l,
                    width: n,
                    height: E
                };
                f = 2 * Math.floor(this.plotBorderWidth / 2);
                c = Math.ceil(Math.max(f, x[3]) / 2);
                e = Math.ceil(Math.max(f, x[0]) / 2);
                this.clipBox = {
                    x: c,
                    y: e,
                    width: Math.floor(this.plotSizeX - Math.max(f, x[1]) / 2 - c),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(f, x[2]) / 2 - e))
                };
                a || h(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                b(this, "afterSetChartSize", {
                    skipAxes: a
                })
            },
            resetMargins: function () {
                var a = this,
                    b = a.options.chart;
                h(["margin", "spacing"], function (c) {
                    var e = b[c],
                        f = A(e) ? e : [e, e, e, e];
                    h(["Top", "Right", "Bottom", "Left"], function (e, k) {
                        a[c][k] = E(b[c + e], f[k])
                    })
                });
                h(M, function (b, c) {
                    a[b] = E(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0,
                    0
                ];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function () {
                var a = this.options.chart,
                    c = this.renderer,
                    e = this.chartWidth,
                    f = this.chartHeight,
                    k = this.chartBackground,
                    d = this.plotBackground,
                    g = this.plotBorder,
                    h, x = this.plotBGImage,
                    r = a.backgroundColor,
                    l = a.plotBackgroundColor,
                    n = a.plotBackgroundImage,
                    E, m = this.plotLeft,
                    u = this.plotTop,
                    q = this.plotWidth,
                    p = this.plotHeight,
                    H = this.plotBox,
                    w = this.clipRect,
                    z = this.clipBox,
                    C = "animate";
                k || (this.chartBackground = k = c.rect().addClass("highcharts-background").add(), C = "attr");
                h = a.borderWidth ||
                    0;
                E = h + (a.shadow ? 8 : 0);
                r = {
                    fill: r || "none"
                };
                if (h || k["stroke-width"]) r.stroke = a.borderColor, r["stroke-width"] = h;
                k.attr(r).shadow(a.shadow);
                k[C]({
                    x: E / 2,
                    y: E / 2,
                    width: e - E - h % 2,
                    height: f - E - h % 2,
                    r: a.borderRadius
                });
                C = "animate";
                d || (C = "attr", this.plotBackground = d = c.rect().addClass("highcharts-plot-background").add());
                d[C](H);
                d.attr({
                    fill: l || "none"
                }).shadow(a.plotShadow);
                n && (x ? x.animate(H) : this.plotBGImage = c.image(n, m, u, q, p).add());
                w ? w.animate({
                    width: z.width,
                    height: z.height
                }) : this.clipRect = c.clipRect(z);
                C = "animate";
                g || (C = "attr", this.plotBorder = g = c.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                g.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                g[C](g.crisp({
                    x: m,
                    y: u,
                    width: q,
                    height: p
                }, -g.strokeWidth()));
                this.isDirtyBox = !1;
                b(this, "afterDrawChartBox")
            },
            propFromSeries: function () {
                var a = this,
                    b = a.options.chart,
                    c, e = a.options.series,
                    f, k;
                h(["inverted", "angular", "polar"], function (d) {
                    c = H[b.type || b.defaultSeriesType];
                    k = b[d] || c && c.prototype[d];
                    for (f = e && e.length; !k && f--;)(c =
                        H[e[f].type]) && c.prototype[d] && (k = !0);
                    a[d] = k
                })
            },
            linkSeries: function () {
                var a = this,
                    c = a.series;
                h(c, function (a) {
                    a.linkedSeries.length = 0
                });
                h(c, function (b) {
                    var c = b.options.linkedTo;
                    G(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = E(b.options.visible, c.options.visible, b.visible))
                });
                b(this, "afterLinkSeries")
            },
            renderSeries: function () {
                h(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function () {
                var a = this,
                    b = a.options.labels;
                b.items && h(b.items, function (c) {
                    var e = w(b.style, c.style),
                        f = x(e.left) + a.plotLeft,
                        k = x(e.top) + a.plotTop + 12;
                    delete e.left;
                    delete e.top;
                    a.renderer.text(c.html, f, k).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function () {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    e, f, k;
                this.setTitle();
                this.legend = new C(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                e = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                h(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                k = 1.05 < e / this.plotHeight;
                if (f || k) h(a, function (a) {
                    (a.horiz && f || !a.horiz && k) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && h(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function (a) {
                var b = this;
                a = u(!0, this.options.credits, a);
                a.enabled &&
                    !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        a.href && (N.location.href = a.href)
                    }).attr({
                        align: a.position.align,
                        zIndex: 8
                    }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                        b.credits = b.credits.destroy();
                        b.addCredits(a)
                    })
            },
            destroy: function () {
                var c = this,
                    e = c.axes,
                    f = c.series,
                    k = c.container,
                    d, g = k && k.parentNode;
                b(c, "destroy");
                c.renderer.forExport ? a.erase(l, c) : l[c.index] = void 0;
                a.chartCount--;
                c.renderTo.removeAttribute("data-highcharts-chart");
                L(c);
                for (d = e.length; d--;) e[d] = e[d].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (d = f.length; d--;) f[d] = f[d].destroy();
                h("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var b = c[a];
                    b && b.destroy && (c[a] = b.destroy())
                });
                k && (k.innerHTML = "", L(k), g && q(k));
                F(c, function (a, b) {
                    delete c[b]
                })
            },
            firstRender: function () {
                var a = this,
                    c = a.options;
                if (!a.isReadyToRender ||
                    a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    h(c.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    b(a, "beforeRender");
                    k && (a.pointer = new k(a, c));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function () {
                h([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                b(this, "load");
                b(this, "render");
                f(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(J);
    (function (a) {
        var B, y = a.each,
            D = a.extend,
            p = a.erase,
            d = a.fireEvent,
            m = a.format,
            v = a.isArray,
            t = a.isNumber,
            q = a.pick,
            l = a.removeEvent;
        a.Point = B = function () {};
        a.Point.prototype = {
            init: function (a, f, h) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(f, h);
                a.options.colorByPoint ? (f = a.options.colors || a.chart.options.colors, this.color = this.color || f[a.colorCounter], f = f.length, h = a.colorCounter, a.colorCounter++, a.colorCounter === f && (a.colorCounter = 0)) : h = a.colorIndex;
                this.colorIndex = q(this.colorIndex,
                    h);
                a.chart.pointCount++;
                d(this, "afterInit");
                return this
            },
            applyOptions: function (a, f) {
                var d = this.series,
                    g = d.options.pointValKey || d.pointValKey;
                a = B.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ? D(this.options, a) : a;
                a.group && delete this.group;
                g && (this.y = this[g]);
                this.isNull = q(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === f && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this));
                void 0 === this.x && d &&
                    (this.x = void 0 === f ? d.autoIncrement(this) : f);
                return this
            },
            setNestedProperty: function (d, f, h) {
                h = h.split(".");
                a.reduce(h, function (d, c, b, e) {
                    d[c] = e.length - 1 === b ? f : a.isObject(d[c], !0) ? d[c] : {};
                    return d[c]
                }, d);
                return d
            },
            optionsToObject: function (d) {
                var f = {},
                    g = this.series,
                    l = g.options.keys,
                    c = l || g.pointArrayMap || ["y"],
                    b = c.length,
                    e = 0,
                    n = 0;
                if (t(d) || null === d) f[c[0]] = d;
                else if (v(d))
                    for (!l && d.length > b && (g = typeof d[0], "string" === g ? f.name = d[0] : "number" === g && (f.x = d[0]), e++); n < b;) l && void 0 === d[e] || (0 < c[n].indexOf(".") ?
                        a.Point.prototype.setNestedProperty(f, d[e], c[n]) : f[c[n]] = d[e]), e++, n++;
                else "object" === typeof d && (f = d, d.dataLabels && (g._hasPointLabels = !0), d.marker && (g._hasPointMarkers = !0));
                return f
            },
            getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ?
                    " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function () {
                var a = this.series,
                    f = a.zones,
                    a = a.zoneAxis || "y",
                    d = 0,
                    l;
                for (l = f[d]; this[a] >= l.value;) l = f[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = l && l.color && !this.options.color ? l.color : this.nonZonedColor;
                return l
            },
            destroy: function () {
                var a = this.series.chart,
                    f = a.hoverPoints,
                    d;
                a.pointCount--;
                f && (this.setState(), p(f, this), f.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) l(this),
                    this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (d in this) this[d] = null
            },
            destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], f, d = 6; d--;) f = a[d], this[f] && (this[f] = this[f].destroy())
            },
            getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function (a) {
                var f =
                    this.series,
                    d = f.tooltipOptions,
                    g = q(d.valueDecimals, ""),
                    c = d.valuePrefix || "",
                    b = d.valueSuffix || "";
                y(f.pointArrayMap || ["y"], function (e) {
                    e = "{point." + e;
                    if (c || b) a = a.replace(RegExp(e + "}", "g"), c + e + "}" + b);
                    a = a.replace(RegExp(e + "}", "g"), e + ":,." + g + "f}")
                });
                return m(a, {
                    point: this,
                    series: this.series
                }, f.chart.time)
            },
            firePointEvent: function (a, f, h) {
                var g = this,
                    c = this.series.options;
                (c.point.events[a] || g.options && g.options.events && g.options.events[a]) && this.importEvents();
                "click" === a && c.allowPointSelect && (h = function (a) {
                    g.select &&
                        g.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                d(this, a, f, h)
            },
            visible: !0
        }
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.animObject,
            D = a.arrayMax,
            p = a.arrayMin,
            d = a.correctFloat,
            m = a.defaultOptions,
            v = a.defaultPlotOptions,
            t = a.defined,
            q = a.each,
            l = a.erase,
            g = a.extend,
            f = a.fireEvent,
            h = a.grep,
            w = a.isArray,
            c = a.isNumber,
            b = a.isString,
            e = a.merge,
            n = a.objectEach,
            A = a.pick,
            G = a.removeEvent,
            C = a.splat,
            M = a.SVGElement,
            u = a.syncTimeout,
            F = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {}
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var c = this,
                    e, k = a.series,
                    d;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                g(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                n(e, function (a, b) {
                    B(c, b, a)
                });
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                q(c.parallelArrays, function (a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                k.length && (d = k[k.length - 1]);
                c._i = A(d && d._i, -1) + 1;
                a.orderSeries(this.insert(k));
                f(this, "afterInit")
            },
            insert: function (a) {
                var b = this.options.index,
                    e;
                if (c(b)) {
                    for (e = a.length; e--;)
                        if (b >=
                            A(a[e].options.index, a[e]._i)) {
                            a.splice(e + 1, 0, this);
                            break
                        } - 1 === e && a.unshift(this);
                    e += 1
                } else a.push(this);
                return A(e, a.length - 1)
            },
            bindAxes: function () {
                var b = this,
                    c = b.options,
                    e = b.chart,
                    f;
                q(b.axisTypes || [], function (k) {
                    q(e[k], function (a) {
                        f = a.options;
                        if (c[k] === f.index || void 0 !== c[k] && c[k] === f.id || void 0 === c[k] && 0 === f.index) b.insert(a.series), b[k] = a, a.isDirty = !0
                    });
                    b[k] || b.optionalAxis === k || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var e = a.series,
                    f = arguments,
                    k = c(b) ? function (c) {
                        var f = "y" === c && e.toYData ?
                            e.toYData(a) : a[c];
                        e[c + "Data"][b] = f
                    } : function (a) {
                        Array.prototype[b].apply(e[a + "Data"], Array.prototype.slice.call(f, 2))
                    };
                q(e.parallelArrays, k)
            },
            autoIncrement: function () {
                var a = this.options,
                    b = this.xIncrement,
                    c, e = a.pointIntervalUnit,
                    f = this.chart.time,
                    b = A(b, a.pointStart, 0);
                this.pointInterval = c = A(this.pointInterval, a.pointInterval, 1);
                e && (a = new f.Date(b), "day" === e ? f.set("Date", a, f.get("Date", a) + c) : "month" === e ? f.set("Month", a, f.get("Month", a) + c) : "year" === e && f.set("FullYear", a, f.get("FullYear", a) + c), c = a.getTime() -
                    b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var b = this.chart,
                    c = b.options,
                    k = c.plotOptions,
                    d = (b.userOptions || {}).plotOptions || {},
                    g = k[this.type];
                this.userOptions = a;
                b = e(g, k.series, a);
                this.tooltipOptions = e(m.tooltip, m.plotOptions.series && m.plotOptions.series.tooltip, m.plotOptions[this.type].tooltip, c.tooltip.userOptions, k.series && k.series.tooltip, k[this.type].tooltip, a.tooltip);
                this.stickyTracking = A(a.stickyTracking, d[this.type] && d[this.type].stickyTracking, d.series && d.series.stickyTracking,
                    this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === g.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones = (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && t(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                f(this, "afterSetOptions", {
                    options: b
                });
                return b
            },
            getName: function () {
                return this.name ||
                    "Series " + (this.index + 1)
            },
            getCyclic: function (a, b, c) {
                var e, f = this.chart,
                    k = this.userOptions,
                    d = a + "Index",
                    g = a + "Counter",
                    h = c ? c.length : A(f.options.chart[a + "Count"], f[a + "Count"]);
                b || (e = A(k[d], k["_" + d]), t(e) || (f.series.length || (f[g] = 0), k["_" + d] = e = f[g] % h, f[g] += 1), c && (b = c[e]));
                void 0 !== e && (this[d] = e);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || v[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol",
                    this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function (b) {
                var e = this.options,
                    f = this.points,
                    d = [],
                    k, g, h, l = this.requireSorting;
                q(b, function (b) {
                    var g;
                    g = a.defined(b) && this.pointClass.prototype.optionsToObject.call({
                        series: this
                    }, b).x;
                    c(g) && (g = a.inArray(g, this.xData, h), -1 === g ? d.push(b) : b !== e.data[g] ? (f[g].update(b, !1, null, !1), f[g].touched = !0, l && (h = g)) : f[g] && (f[g].touched = !0), k = !0)
                }, this);
                if (k)
                    for (b = f.length; b--;) g = f[b], g.touched || g.remove(!1),
                        g.touched = !1;
                else if (b.length === f.length) q(b, function (a, b) {
                    f[b].update && a !== e.data[b] && f[b].update(a, !1, null, !1)
                });
                else return !1;
                q(d, function (a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function (e, f, d, g) {
                var k = this,
                    h = k.points,
                    l = h && h.length || 0,
                    n, x = k.options,
                    m = k.chart,
                    u = null,
                    E = k.xAxis,
                    p = x.turboThreshold,
                    C = this.xData,
                    F = this.yData,
                    t = (n = k.pointArrayMap) && n.length,
                    G;
                e = e || [];
                n = e.length;
                f = A(f, !0);
                !1 !== g && n && l && !k.cropped && !k.hasGroupedData && k.visible && !k.isSeriesBoosting && (G = this.updateData(e));
                if (!G) {
                    k.xIncrement =
                        null;
                    k.colorCounter = 0;
                    q(this.parallelArrays, function (a) {
                        k[a + "Data"].length = 0
                    });
                    if (p && n > p) {
                        for (d = 0; null === u && d < n;) u = e[d], d++;
                        if (c(u))
                            for (d = 0; d < n; d++) C[d] = this.autoIncrement(), F[d] = e[d];
                        else if (w(u))
                            if (t)
                                for (d = 0; d < n; d++) u = e[d], C[d] = u[0], F[d] = u.slice(1, t + 1);
                            else
                                for (d = 0; d < n; d++) u = e[d], C[d] = u[0], F[d] = u[1];
                        else a.error(12)
                    } else
                        for (d = 0; d < n; d++) void 0 !== e[d] && (u = {
                            series: k
                        }, k.pointClass.prototype.applyOptions.apply(u, [e[d]]), k.updateParallelArrays(u, d));
                    F && b(F[0]) && a.error(14, !0);
                    k.data = [];
                    k.options.data =
                        k.userOptions.data = e;
                    for (d = l; d--;) h[d] && h[d].destroy && h[d].destroy();
                    E && (E.minRange = E.userMinRange);
                    k.isDirty = m.isDirtyBox = !0;
                    k.isDirtyData = !!h;
                    d = !1
                }
                "point" === x.legendType && (this.processData(), this.generatePoints());
                f && m.redraw(d)
            },
            processData: function (b) {
                var c = this.xData,
                    e = this.yData,
                    f = c.length,
                    d;
                d = 0;
                var k, g, h = this.xAxis,
                    l, n = this.options;
                l = n.cropThreshold;
                var m = this.getExtremesFromAll || n.getExtremesFromAll,
                    u = this.isCartesian,
                    n = h && h.val2lin,
                    q = h && h.isLog,
                    p = this.requireSorting,
                    C, w;
                if (u && !this.isDirty &&
                    !h.isDirty && !this.yAxis.isDirty && !b) return !1;
                h && (b = h.getExtremes(), C = b.min, w = b.max);
                u && this.sorted && !m && (!l || f > l || this.forceCrop) && (c[f - 1] < C || c[0] > w ? (c = [], e = []) : this.yData && (c[0] < C || c[f - 1] > w) && (d = this.cropData(this.xData, this.yData, C, w), c = d.xData, e = d.yData, d = d.start, k = !0));
                for (l = c.length || 1; --l;) f = q ? n(c[l]) - n(c[l - 1]) : c[l] - c[l - 1], 0 < f && (void 0 === g || f < g) ? g = f : 0 > f && p && (a.error(15), p = !1);
                this.cropped = k;
                this.cropStart = d;
                this.processedXData = c;
                this.processedYData = e;
                this.closestPointRange = g
            },
            cropData: function (a,
                b, c, e, f) {
                var d = a.length,
                    k = 0,
                    g = d,
                    h;
                f = A(f, this.cropShoulder, 1);
                for (h = 0; h < d; h++)
                    if (a[h] >= c) {
                        k = Math.max(0, h - f);
                        break
                    }
                for (c = h; c < d; c++)
                    if (a[c] > e) {
                        g = c + f;
                        break
                    }
                return {
                    xData: a.slice(k, g),
                    yData: b.slice(k, g),
                    start: k,
                    end: g
                }
            },
            generatePoints: function () {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    e, f = this.processedXData,
                    d = this.processedYData,
                    g = this.pointClass,
                    h = f.length,
                    l = this.cropStart || 0,
                    n, m = this.hasGroupedData,
                    a = a.keys,
                    u, q = [],
                    p;
                c || m || (c = [], c.length = b.length, c = this.data = c);
                a && m && (this.options.keys = !1);
                for (p = 0; p < h; p++) n =
                    l + p, m ? (u = (new g).init(this, [f[p]].concat(C(d[p]))), u.dataGroup = this.groupMap[p]) : (u = c[n]) || void 0 === b[n] || (c[n] = u = (new g).init(this, b[n], f[p])), u && (u.index = n, q[p] = u);
                this.options.keys = a;
                if (c && (h !== (e = c.length) || m))
                    for (p = 0; p < e; p++) p !== l || m || (p += h), c[p] && (c[p].destroyElements(), c[p].plotX = void 0);
                this.data = c;
                this.points = q
            },
            getExtremes: function (a) {
                var b = this.yAxis,
                    e = this.processedXData,
                    f, d = [],
                    k = 0;
                f = this.xAxis.getExtremes();
                var g = f.min,
                    h = f.max,
                    l, n, m = this.requireSorting ? 1 : 0,
                    u, q;
                a = a || this.stackedYData ||
                    this.processedYData || [];
                f = a.length;
                for (q = 0; q < f; q++)
                    if (n = e[q], u = a[q], l = (c(u, !0) || w(u)) && (!b.positiveValuesOnly || u.length || 0 < u), n = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (e[q + m] || n) >= g && (e[q - m] || n) <= h, l && n)
                        if (l = u.length)
                            for (; l--;) "number" === typeof u[l] && (d[k++] = u[l]);
                        else d[k++] = u;
                this.dataMin = p(d);
                this.dataMax = D(d)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    e = this.xAxis,
                    g = e.categories,
                    h = this.yAxis,
                    l = this.points,
                    n = l.length,
                    m = !!this.modifyValue,
                    u = a.pointPlacement,
                    p = "between" === u || c(u),
                    q = a.threshold,
                    C = a.startFromThreshold ? q : 0,
                    w, F, G, v, M = Number.MAX_VALUE;
                "between" === u && (u = .5);
                c(u) && (u *= A(a.pointRange || e.pointRange));
                for (a = 0; a < n; a++) {
                    var y = l[a],
                        D = y.x,
                        B = y.y;
                    F = y.low;
                    var J = b && h.stacks[(this.negStacks && B < (C ? 0 : q) ? "-" : "") + this.stackKey],
                        V;
                    h.positiveValuesOnly && null !== B && 0 >= B && (y.isNull = !0);
                    y.plotX = w = d(Math.min(Math.max(-1E5, e.translate(D, 0, 0, 0, 1, u, "flags" === this.type)), 1E5));
                    b && this.visible && !y.isNull &&
                        J && J[D] && (v = this.getStackIndicator(v, D, this.index), V = J[D], B = V.points[v.key], F = B[0], B = B[1], F === C && v.key === J[D].base && (F = A(c(q) && q, h.min)), h.positiveValuesOnly && 0 >= F && (F = null), y.total = y.stackTotal = V.total, y.percentage = V.total && y.y / V.total * 100, y.stackY = B, V.setOffset(this.pointXOffset || 0, this.barW || 0));
                    y.yBottom = t(F) ? Math.min(Math.max(-1E5, h.translate(F, 0, 1, 0, 1)), 1E5) : null;
                    m && (B = this.modifyValue(B, y));
                    y.plotY = F = "number" === typeof B && Infinity !== B ? Math.min(Math.max(-1E5, h.translate(B, 0, 1, 0, 1)), 1E5) : void 0;
                    y.isInside = void 0 !== F && 0 <= F && F <= h.len && 0 <= w && w <= e.len;
                    y.clientX = p ? d(e.translate(D, 0, 0, 0, 1, u)) : w;
                    y.negative = y.y < (q || 0);
                    y.category = g && void 0 !== g[y.x] ? g[y.x] : y.x;
                    y.isNull || (void 0 !== G && (M = Math.min(M, Math.abs(w - G))), G = w);
                    y.zone = this.zones.length && y.getZone()
                }
                this.closestPointRangePx = M;
                f(this, "afterTranslate")
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return h(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart,
                    c = this.options,
                    e = b.renderer,
                    f = b.inverted,
                    d = this.clipBox,
                    k = d || b.clipBox,
                    g = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, k.height, c.xAxis, c.yAxis].join(),
                    h = b[g],
                    l = b[g + "m"];
                h || (a && (k.width = 0, f && (k.x = b.plotSizeX), b[g + "m"] = l = e.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[g] = h = e.clipRect(k), h.count = {
                    length: 0
                });
                a && !h.count[this.index] && (h.count[this.index] = !0, h.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || d ? h : b.clipRect), this.markerGroup.clip(l),
                    this.sharedClipKey = g);
                a || (h.count[this.index] && (delete h.count[this.index], --h.count.length), 0 === h.count.length && g && b[g] && (d || (b[g] = b[g].destroy()), b[g + "m"] && (b[g + "m"] = b[g + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart,
                    c = y(this.options.animation),
                    e;
                a ? this.setClip(c) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, c), b[e + "m"] && b[e + "m"].animate({
                    width: b.plotSizeX + 99,
                    x: 0
                }, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                f(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points,
                    b = this.chart,
                    c, e, f, d, g = this.options.marker,
                    h, l, n, m = this[this.specialGroup] || this.markerGroup,
                    u, p = A(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= g.enabledThreshold * g.radius);
                if (!1 !== g.enabled || this._hasPointMarkers)
                    for (c = 0; c < a.length; c++) e = a[c], d = e.graphic, h = e.marker || {}, l = !!e.marker, f = p && void 0 === h.enabled || h.enabled, n = e.isInside, f && !e.isNull ? (f = A(h.symbol, this.symbol), u = this.markerAttribs(e, e.selected && "select"), d ? d[n ? "show" : "hide"](!0).animate(u) :
                        n && (0 < u.width || e.hasImage) && (e.graphic = d = b.renderer.symbol(f, u.x, u.y, u.width, u.height, l ? h : g).add(m)), d && d.attr(this.pointAttribs(e, e.selected && "select")), d && d.addClass(e.getClassName(), !0)) : d && (e.graphic = d.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker,
                    e = a.marker || {},
                    f = e.symbol || c.symbol,
                    d = A(e.radius, c.radius);
                b && (c = c.states[b], b = e.states && e.states[b], d = A(b && b.radius, c && c.radius, d + (c && c.radiusPlus || 0)));
                a.hasImage = f && 0 === f.indexOf("url");
                a.hasImage && (d = 0);
                a = {
                    x: Math.floor(a.plotX) -
                        d,
                    y: a.plotY - d
                };
                d && (a.width = a.height = 2 * d);
                return a
            },
            pointAttribs: function (a, b) {
                var c = this.options.marker,
                    e = a && a.options,
                    f = e && e.marker || {},
                    d = this.color,
                    k = e && e.color,
                    g = a && a.color,
                    e = A(f.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                d = k || a || g || d;
                a = f.fillColor || c.fillColor || d;
                d = f.lineColor || c.lineColor || d;
                b && (c = c.states[b], b = f.states && f.states[b] || {}, e = A(b.lineWidth, c.lineWidth, e + A(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, d = b.lineColor || c.lineColor || d);
                return {
                    stroke: d,
                    "stroke-width": e,
                    fill: a
                }
            },
            destroy: function () {
                var b = this,
                    c = b.chart,
                    e = /AppleWebKit\/533/.test(F.navigator.userAgent),
                    d, g, h = b.data || [],
                    u, m;
                f(b, "destroy");
                G(b);
                q(b.axisTypes || [], function (a) {
                    (m = b[a]) && m.series && (l(m.series, b), m.isDirty = m.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (g = h.length; g--;)(u = h[g]) && u.destroy && u.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                n(b, function (a, b) {
                    a instanceof M && !a.survive && (d = e && "group" === b ? "hide" : "destroy", a[d]())
                });
                c.hoverSeries === b && (c.hoverSeries =
                    null);
                l(c.series, b);
                c.orderSeries();
                n(b, function (a, c) {
                    delete b[c]
                })
            },
            getGraphPath: function (a, b, c) {
                var e = this,
                    f = e.options,
                    d = f.step,
                    k, g = [],
                    h = [],
                    l;
                a = a || e.points;
                (k = a.reversed) && a.reverse();
                (d = {
                    right: 1,
                    center: 2
                } [d] || d && 3) && k && (d = 4 - d);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                q(a, function (k, n) {
                    var u = k.plotX,
                        m = k.plotY,
                        r = a[n - 1];
                    (k.leftCliff || r && r.rightCliff) && !c && (l = !0);
                    k.isNull && !t(b) && 0 < n ? l = !f.connectNulls : k.isNull && !b ? l = !0 : (0 === n || l ? n = ["M", k.plotX, k.plotY] : e.getPointSpline ? n = e.getPointSpline(a,
                        k, n) : d ? (n = 1 === d ? ["L", r.plotX, m] : 2 === d ? ["L", (r.plotX + u) / 2, r.plotY, "L", (r.plotX + u) / 2, m] : ["L", u, r.plotY], n.push("L", u, m)) : n = ["L", u, m], h.push(k.x), d && (h.push(k.x), 2 === d && h.push(k.x)), g.push.apply(g, n), l = !1)
                });
                g.xMap = h;
                return e.graphPath = g
            },
            drawGraph: function () {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    e = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ],
                    e = a.getZonesGraphs(e);
                q(e, function (e, f) {
                    var d = e[0],
                        k = a[d];
                    k ? (k.endX = a.preventGraphAnimation ? null : c.xMap,
                        k.animate({
                            d: c
                        })) : c.length && (a[d] = a.chart.renderer.path(c).addClass(e[1]).attr({
                        zIndex: 1
                    }).add(a.group), k = {
                        stroke: e[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, e[3] ? k.dashstyle = e[3] : "square" !== b.linecap && (k["stroke-linecap"] = k["stroke-linejoin"] = "round"), k = a[d].attr(k).shadow(2 > f && b.shadow));
                    k && (k.startX = c.xMap, k.isArea = c.isArea)
                })
            },
            getZonesGraphs: function (a) {
                q(this.zones, function (b, c) {
                    a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color ||
                        this.color, b.dashStyle || this.options.dashStyle
                    ])
                }, this);
                return a
            },
            applyZones: function () {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    e = this.zones,
                    f, d, g = this.clips || [],
                    h, l = this.graph,
                    n = this.area,
                    u = Math.max(b.chartWidth, b.chartHeight),
                    m = this[(this.zoneAxis || "y") + "Axis"],
                    p, C, w = b.inverted,
                    F, t, G, v, M = !1;
                e.length && (l || n) && m && void 0 !== m.min && (C = m.reversed, F = m.horiz, l && !this.showLine && l.hide(), n && n.hide(), p = m.getExtremes(), q(e, function (e, k) {
                    f = C ? F ? b.plotWidth : 0 : F ? 0 : m.toPixels(p.min);
                    f = Math.min(Math.max(A(d, f), 0), u);
                    d = Math.min(Math.max(Math.round(m.toPixels(A(e.value, p.max), !0)), 0), u);
                    M && (f = d = m.toPixels(p.max));
                    t = Math.abs(f - d);
                    G = Math.min(f, d);
                    v = Math.max(f, d);
                    m.isXAxis ? (h = {
                        x: w ? v : G,
                        y: 0,
                        width: t,
                        height: u
                    }, F || (h.x = b.plotHeight - h.x)) : (h = {
                        x: 0,
                        y: w ? v : G,
                        width: u,
                        height: t
                    }, F && (h.y = b.plotWidth - h.y));
                    w && c.isVML && (h = m.isXAxis ? {
                        x: 0,
                        y: C ? G : v,
                        height: h.width,
                        width: b.chartWidth
                    } : {
                        x: h.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: h.height,
                        height: b.chartHeight
                    });
                    g[k] ? g[k].animate(h) : (g[k] = c.clipRect(h), l && a["zone-graph-" + k].clip(g[k]), n &&
                        a["zone-area-" + k].clip(g[k]));
                    M = e.value > p.max;
                    a.resetZones && 0 === d && (d = void 0)
                }), this.clips = g)
            },
            invertGroups: function (a) {
                function b() {
                    q(["group", "markerGroup"], function (b) {
                        c[b] && (e.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    e = c.chart,
                    f;
                c.xAxis && (f = B(e, "resize", b), B(c, "destroy", f), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, e, f) {
                var d = this[a],
                    k = !d;
                k && (this[a] = d = this.chart.renderer.g().attr({
                    zIndex: e ||
                        .1
                }).add(f));
                d.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (t(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (d.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                d.attr({
                    visibility: c
                })[k ? "attr" : "animate"](this.getPlotBox());
                return d
            },
            getPlotBox: function () {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function () {
                var a = this,
                    b = a.chart,
                    c, e = a.options,
                    d = !!a.animate && b.renderer.isSVG && y(e.animation).duration,
                    g = a.visible ? "inherit" : "hidden",
                    h = e.zIndex,
                    l = a.hasRendered,
                    n = b.seriesGroup,
                    m = b.inverted;
                c = a.plotGroup("group", "series", g, h, n);
                a.markerGroup = a.plotGroup("markerGroup", "markers", g, h, n);
                d && a.animate(!0);
                c.inverted = a.isCartesian ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking &&
                    a.drawTracker();
                a.invertGroups(m);
                !1 === e.clip || a.sharedClipKey || l || c.clip(b.clipRect);
                d && a.animate();
                l || (a.animationTimeout = u(function () {
                    a.afterAnimate()
                }, d));
                a.isDirty = !1;
                a.hasRendered = !0;
                f(a, "afterRender")
            },
            redraw: function () {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    e = this.xAxis,
                    f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: A(e && e.left, a.plotLeft),
                    translateY: A(f && f.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis,
                    e = this.yAxis,
                    f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, e, f) {
                    var d, k;
                    if (k = c && c.length) return d = b.kdAxisArray[e % f], c.sort(function (a, b) {
                        return a[d] - b[d]
                    }), k = Math.floor(k / 2), {
                        point: c[k],
                        left: a(c.slice(0, k), e + 1, f),
                        right: a(c.slice(k + 1), e + 1, f)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ?
                    2 : 1;
                delete b.kdTree;
                u(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, g, h) {
                    var l = b.point,
                        n = e.kdAxisArray[g % h],
                        m, u, r = l;
                    u = t(a[f]) && t(l[f]) ? Math.pow(a[f] - l[f], 2) : null;
                    m = t(a[d]) && t(l[d]) ? Math.pow(a[d] - l[d], 2) : null;
                    m = (u || 0) + (m || 0);
                    l.dist = t(m) ? Math.sqrt(m) : Number.MAX_VALUE;
                    l.distX = t(u) ? Math.sqrt(u) : Number.MAX_VALUE;
                    n = a[n] - l[n];
                    m = 0 > n ? "left" : "right";
                    u = 0 > n ? "right" : "left";
                    b[m] && (m = c(a, b[m], g + 1, h), r = m[k] < r[k] ?
                        m : l);
                    b[u] && Math.sqrt(n * n) < r[k] && (a = c(a, b[u], g + 1, h), r = a[k] < r[k] ? a : r);
                    return r
                }
                var e = this,
                    f = this.kdAxisArray[0],
                    d = this.kdAxisArray[1],
                    k = b ? "distX" : "dist";
                b = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.animate,
            D = a.Axis,
            p = a.createElement,
            d = a.css,
            m = a.defined,
            v = a.each,
            t = a.erase,
            q = a.extend,
            l = a.fireEvent,
            g = a.inArray,
            f = a.isNumber,
            h = a.isObject,
            w = a.isArray,
            c = a.merge,
            b =
            a.objectEach,
            e = a.pick,
            n = a.Point,
            A = a.Series,
            G = a.seriesTypes,
            C = a.setAnimation,
            M = a.splat;
        q(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var f, d = this;
                a && (b = e(b, !0), l(d, "addSeries", {
                    options: a
                }, function () {
                    f = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    l(d, "afterAddSeries");
                    b && d.redraw(c)
                }));
                return f
            },
            addAxis: function (a, b, f, d) {
                var k = b ? "xAxis" : "yAxis",
                    g = this.options;
                a = c(a, {
                    index: this[k].length,
                    isX: b
                });
                b = new D(this, a);
                g[k] = M(g[k] || {});
                g[k].push(a);
                e(f, !0) && this.redraw(d);
                return b
            },
            showLoading: function (a) {
                var b =
                    this,
                    c = b.options,
                    e = b.loadingDiv,
                    f = c.loading,
                    g = function () {
                        e && d(e, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                e || (b.loadingDiv = e = p("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = p("span", {
                    className: "highcharts-loading-inner"
                }, null, e), B(b, "redraw", g));
                e.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                d(e, q(f.style, {
                    zIndex: 10
                }));
                d(b.loadingSpan, f.labelStyle);
                b.loadingShown || (d(e, {
                    opacity: 0,
                    display: ""
                }), y(e, {
                    opacity: f.style.opacity || .5
                }, {
                    duration: f.showDuration || 0
                }));
                b.loadingShown = !0;
                g()
            },
            hideLoading: function () {
                var a = this.options,
                    b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", y(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        d(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function (a, d, k, h) {
                var n = this,
                    u = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    p = a.chart,
                    r, q, C = [];
                l(n, "update", {
                    options: a
                });
                if (p) {
                    c(!0, n.options.chart, p);
                    "className" in p && n.setClassName(p.className);
                    "reflow" in p && n.setReflow(p.reflow);
                    if ("inverted" in p || "polar" in p || "type" in p) n.propFromSeries(), r = !0;
                    "alignTicks" in p && (r = !0);
                    b(p, function (a, b) {
                        -1 !==
                            g("chart." + b, n.propsRequireUpdateSeries) && (q = !0); - 1 !== g(b, n.propsRequireDirtyBox) && (n.isDirtyBox = !0)
                    });
                    "style" in p && n.renderer.setStyle(p.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && c(!0, this.options.plotOptions, a.plotOptions);
                b(a, function (a, b) {
                    if (n[b] && "function" === typeof n[b].update) n[b].update(a, !1);
                    else if ("function" === typeof n[u[b]]) n[u[b]](a);
                    "chart" !== b && -1 !== g(b, n.propsRequireUpdateSeries) && (q = !0)
                });
                v("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    var c;
                    a[b] && ("series" === b && (c = [], v(n[b], function (a, b) {
                        a.options.isInternal || c.push(b)
                    })), v(M(a[b]), function (a, e) {
                        (e = m(a.id) && n.get(a.id) || n[b][c ? c[e] : e]) && e.coll === b && (e.update(a, !1), k && (e.touched = !0));
                        if (!e && k)
                            if ("series" === b) n.addSeries(a, !1).touched = !0;
                            else if ("xAxis" === b || "yAxis" === b) n.addAxis(a, "xAxis" === b, !1).touched = !0
                    }), k && v(n[b], function (a) {
                        a.touched || a.options.isInternal ? delete a.touched : C.push(a)
                    }))
                });
                v(C, function (a) {
                    a.remove(!1)
                });
                r && v(n.axes, function (a) {
                    a.update({}, !1)
                });
                q && v(n.series, function (a) {
                    a.update({},
                        !1)
                });
                a.loading && c(!0, n.options.loading, a.loading);
                r = p && p.width;
                p = p && p.height;
                f(r) && r !== n.chartWidth || f(p) && p !== n.chartHeight ? n.setSize(r, p, h) : e(d, !0) && n.redraw(h);
                l(n, "afterUpdate", {
                    options: a
                })
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        q(n.prototype, {
            update: function (a, b, c, f) {
                function d() {
                    k.applyOptions(a);
                    null === k.y && n && (k.graphic = n.destroy());
                    h(a, !0) && (n && n.element && a && a.marker && void 0 !== a.marker.symbol && (k.graphic = n.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()),
                        k.connector && (k.connector = k.connector.destroy()));
                    l = k.index;
                    g.updateParallelArrays(k, l);
                    u.data[l] = h(u.data[l], !0) || h(a, !0) ? k.options : e(a, u.data[l]);
                    g.isDirty = g.isDirtyData = !0;
                    !g.fixedBox && g.hasCartesianSeries && (m.isDirtyBox = !0);
                    "point" === u.legendType && (m.isDirtyLegend = !0);
                    b && m.redraw(c)
                }
                var k = this,
                    g = k.series,
                    n = k.graphic,
                    l, m = g.chart,
                    u = g.options;
                b = e(b, !0);
                !1 === f ? d() : k.firePointEvent("update", {
                    options: a
                }, d)
            },
            remove: function (a, b) {
                this.series.removePoint(g(this, this.series.data), a, b)
            }
        });
        q(A.prototype, {
            addPoint: function (a, b, c, f) {
                var d = this.options,
                    k = this.data,
                    g = this.chart,
                    h = this.xAxis,
                    h = h && h.hasNames && h.names,
                    n = d.data,
                    l, m, u = this.xData,
                    p, q;
                b = e(b, !0);
                l = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                q = l.x;
                p = u.length;
                if (this.requireSorting && q < u[p - 1])
                    for (m = !0; p && u[p - 1] > q;) p--;
                this.updateParallelArrays(l, "splice", p, 0, 0);
                this.updateParallelArrays(l, p);
                h && l.name && (h[q] = l.name);
                n.splice(p, 0, a);
                m && (this.data.splice(p, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (k[0] && k[0].remove ? k[0].remove(!1) : (k.shift(), this.updateParallelArrays(l, "shift"), n.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(f)
            },
            removePoint: function (a, b, c) {
                var f = this,
                    d = f.data,
                    k = d[a],
                    g = f.points,
                    h = f.chart,
                    l = function () {
                        g && g.length === d.length && g.splice(a, 1);
                        d.splice(a, 1);
                        f.options.data.splice(a, 1);
                        f.updateParallelArrays(k || {
                            series: f
                        }, "splice", a, 1);
                        k && k.destroy();
                        f.isDirty = !0;
                        f.isDirtyData = !0;
                        b && h.redraw()
                    };
                C(c, h);
                b = e(b, !0);
                k ? k.firePointEvent("remove", null, l) : l()
            },
            remove: function (a,
                b, c) {
                function f() {
                    d.destroy();
                    k.isDirtyLegend = k.isDirtyBox = !0;
                    k.linkSeries();
                    e(a, !0) && k.redraw(b)
                }
                var d = this,
                    k = d.chart;
                !1 !== c ? l(d, "remove", null, f) : f()
            },
            update: function (b, f) {
                var d = this,
                    h = d.chart,
                    n = d.userOptions,
                    m = d.oldType || d.type,
                    p = b.type || n.type || h.options.chart.type,
                    u = G[m].prototype,
                    C, w = ["group", "markerGroup", "dataLabelsGroup"],
                    A = ["navigatorSeries", "baseSeries"],
                    t = d.finishedAnimating && {
                        animation: !1
                    },
                    F = ["data", "name", "turboThreshold"],
                    M = a.keys(b),
                    y = 0 < M.length;
                v(M, function (a) {
                    -1 === g(a, F) && (y = !1)
                });
                if (y) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1);
                else {
                    A = w.concat(A);
                    v(A, function (a) {
                        A[a] = d[a];
                        delete d[a]
                    });
                    b = c(n, t, {
                        index: d.index,
                        pointStart: e(n.pointStart, d.xData[0])
                    }, {
                        data: d.options.data
                    }, b);
                    d.remove(!1, null, !1);
                    for (C in u) d[C] = void 0;
                    G[p || m] ? q(d, G[p || m].prototype) : a.error(17, !0);
                    v(A, function (a) {
                        d[a] = A[a]
                    });
                    d.init(h, b);
                    b.zIndex !== n.zIndex && v(w, function (a) {
                        d[a] && d[a].attr({
                            zIndex: b.zIndex
                        })
                    });
                    d.oldType = m;
                    h.linkSeries()
                }
                l(this, "afterUpdate");
                e(f, !0) && h.redraw(!1)
            },
            setName: function (a) {
                this.name =
                    this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        q(D.prototype, {
            update: function (a, f) {
                var d = this.chart,
                    g = a && a.events || {};
                a = c(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
                b(d.options[this.coll].events, function (a, b) {
                    "undefined" === typeof g[b] && (g[b] = void 0)
                });
                this.destroy(!0);
                this.init(d, q(a, {
                    events: g
                }));
                d.isDirtyBox = !0;
                e(f, !0) && d.redraw()
            },
            remove: function (a) {
                for (var b = this.chart, c = this.coll, f = this.series,
                        d = f.length; d--;) f[d] && f[d].remove(!1);
                t(b.axes, this);
                t(b[c], this);
                w(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                v(b[c], function (a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                e(a, !0) && b.redraw()
            },
            setTitle: function (a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function (a, b) {
                this.update({
                    categories: a
                }, b)
            }
        })
    })(J);
    (function (a) {
        var B = a.animObject,
            y = a.color,
            D = a.each,
            p = a.extend,
            d = a.isNumber,
            m = a.merge,
            v = a.pick,
            t = a.Series,
            q = a.seriesType,
            l = a.svg;
        q("column",
            "line", {
                borderRadius: 0,
                crisp: !0,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000"
                    }
                },
                dataLabels: {
                    align: null,
                    verticalAlign: null,
                    y: null
                },
                softThreshold: !1,
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            }, {
                cropShoulder: 0,
                directTouch: !0,
                trackerGroups: ["group", "dataLabelsGroup"],
                negStacks: !0,
                init: function () {
                    t.prototype.init.apply(this,
                        arguments);
                    var a = this,
                        f = a.chart;
                    f.hasRendered && D(f.series, function (f) {
                        f.type === a.type && (f.isDirty = !0)
                    })
                },
                getColumnMetrics: function () {
                    var a = this,
                        f = a.options,
                        d = a.xAxis,
                        l = a.yAxis,
                        c = d.options.reversedStacks,
                        c = d.reversed && !c || !d.reversed && c,
                        b, e = {},
                        n = 0;
                    !1 === f.grouping ? n = 1 : D(a.chart.series, function (c) {
                        var f = c.options,
                            d = c.yAxis,
                            k;
                        c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || l.len !== d.len || l.pos !== d.pos || (f.stacking ? (b = c.stackKey, void 0 === e[b] && (e[b] = n++), k = e[b]) : !1 !== f.grouping &&
                            (k = n++), c.columnIndex = k)
                    });
                    var m = Math.min(Math.abs(d.transA) * (d.ordinalSlope || f.pointRange || d.closestPointRange || d.tickInterval || 1), d.len),
                        p = m * f.groupPadding,
                        q = (m - 2 * p) / (n || 1),
                        f = Math.min(f.maxPointWidth || d.len, v(f.pointWidth, q * (1 - 2 * f.pointPadding)));
                    a.columnMetrics = {
                        width: f,
                        offset: (q - f) / 2 + (p + ((a.columnIndex || 0) + (c ? 1 : 0)) * q - m / 2) * (c ? -1 : 1)
                    };
                    return a.columnMetrics
                },
                crispCol: function (a, f, d, l) {
                    var c = this.chart,
                        b = this.borderWidth,
                        e = -(b % 2 ? .5 : 0),
                        b = b % 2 ? .5 : 1;
                    c.inverted && c.renderer.isVML && (b += 1);
                    this.options.crisp &&
                        (d = Math.round(a + d) + e, a = Math.round(a) + e, d -= a);
                    l = Math.round(f + l) + b;
                    e = .5 >= Math.abs(f) && .5 < l;
                    f = Math.round(f) + b;
                    l -= f;
                    e && l && (--f, l += 1);
                    return {
                        x: a,
                        y: f,
                        width: d,
                        height: l
                    }
                },
                translate: function () {
                    var a = this,
                        f = a.chart,
                        d = a.options,
                        l = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                        l = a.borderWidth = v(d.borderWidth, l ? 0 : 1),
                        c = a.yAxis,
                        b = d.threshold,
                        e = a.translatedThreshold = c.getThreshold(b),
                        n = v(d.minPointLength, 5),
                        m = a.getColumnMetrics(),
                        p = m.width,
                        q = a.barW = Math.max(p, 1 + 2 * l),
                        M = a.pointXOffset = m.offset;
                    f.inverted && (e -= .5);
                    d.pointPadding &&
                        (q = Math.ceil(q));
                    t.prototype.translate.apply(a);
                    D(a.points, function (d) {
                        var g = v(d.yBottom, e),
                            k = 999 + Math.abs(g),
                            k = Math.min(Math.max(-k, d.plotY), c.len + k),
                            h = d.plotX + M,
                            l = q,
                            m = Math.min(k, g),
                            u, r = Math.max(k, g) - m;
                        n && Math.abs(r) < n && (r = n, u = !c.reversed && !d.negative || c.reversed && d.negative, d.y === b && a.dataMax <= b && c.min < b && (u = !u), m = Math.abs(m - e) > n ? g - n : e - (u ? n : 0));
                        d.barX = h;
                        d.pointWidth = p;
                        d.tooltipPos = f.inverted ? [c.len + c.pos - f.plotLeft - k, a.xAxis.len - h - l / 2, r] : [h + l / 2, k + c.pos - f.plotTop, r];
                        d.shapeType = "rect";
                        d.shapeArgs =
                            a.crispCol.apply(a, d.isNull ? [h, e, l, 0] : [h, m, l, r])
                    })
                },
                getSymbol: a.noop,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
                drawGraph: function () {
                    this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
                },
                pointAttribs: function (a, d) {
                    var f = this.options,
                        g, c = this.pointAttrToOptions || {};
                    g = c.stroke || "borderColor";
                    var b = c["stroke-width"] || "borderWidth",
                        e = a && a.color || this.color,
                        l = a && a[g] || f[g] || this.color || e,
                        p = a && a[b] || f[b] || this[b] || 0,
                        c = f.dashStyle;
                    a && this.zones.length && (e = a.getZone(), e = a.options.color ||
                        e && e.color || this.color);
                    d && (a = m(f.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, e = a.color || void 0 !== d && y(e).brighten(a.brightness).get() || e, l = a[g] || l, p = a[b] || p, c = a.dashStyle || c);
                    g = {
                        fill: e,
                        stroke: l,
                        "stroke-width": p
                    };
                    c && (g.dashstyle = c);
                    return g
                },
                drawPoints: function () {
                    var a = this,
                        f = this.chart,
                        h = a.options,
                        l = f.renderer,
                        c = h.animationLimit || 250,
                        b;
                    D(a.points, function (e) {
                        var g = e.graphic,
                            p = g && f.pointCount < c ? "animate" : "attr";
                        if (d(e.plotY) && null !== e.y) {
                            b = e.shapeArgs;
                            if (g) g[p](m(b));
                            else e.graphic =
                                g = l[e.shapeType](b).add(e.group || a.group);
                            h.borderRadius && g.attr({
                                r: h.borderRadius
                            });
                            g[p](a.pointAttribs(e, e.selected && "select")).shadow(h.shadow, null, h.stacking && !h.borderRadius);
                            g.addClass(e.getClassName(), !0)
                        } else g && (e.graphic = g.destroy())
                    })
                },
                animate: function (a) {
                    var d = this,
                        g = this.yAxis,
                        m = d.options,
                        c = this.chart.inverted,
                        b = {},
                        e = c ? "translateX" : "translateY",
                        n;
                    l && (a ? (b.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(m.threshold))), c ? b.translateX = a - g.len : b.translateY = a, d.group.attr(b)) :
                        (n = d.group.attr(e), d.group.animate({
                            scaleY: 1
                        }, p(B(d.options.animation), {
                            step: function (a, c) {
                                b[e] = n + c.pos * (g.pos - n);
                                d.group.attr(b)
                            }
                        })), d.animate = null))
                },
                remove: function () {
                    var a = this,
                        d = a.chart;
                    d.hasRendered && D(d.series, function (d) {
                        d.type === a.type && (d.isDirty = !0)
                    });
                    t.prototype.remove.apply(a, arguments)
                }
            })
    })(J);
    (function (a) {
        var B = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && B.prototype.drawGraph.call(this)
            }
        })
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.arrayMax,
            D = a.defined,
            p = a.each,
            d = a.extend,
            m = a.format,
            v = a.map,
            t = a.merge,
            q = a.noop,
            l = a.pick,
            g = a.relativeLength,
            f = a.Series,
            h = a.seriesTypes,
            w = a.some,
            c = a.stableSort;
        a.distribute = function (b, e, d) {
            function f(a, b) {
                return a.target - b.target
            }
            var g, h = !0,
                n = b,
                m = [],
                q;
            q = 0;
            var k = n.reducedLen || e;
            for (g = b.length; g--;) q += b[g].size;
            if (q > k) {
                c(b, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (q = g = 0; q <= k;) q += b[g].size, g++;
                m = b.splice(g - 1, b.length)
            }
            c(b, f);
            for (b = v(b, function (a) {
                    return {
                        size: a.size,
                        targets: [a.target],
                        align: l(a.align, .5)
                    }
                }); h;) {
                for (g = b.length; g--;) h = b[g], q = (Math.min.apply(0, h.targets) + Math.max.apply(0, h.targets)) / 2, h.pos = Math.min(Math.max(0, q - h.size * h.align), e - h.size);
                g = b.length;
                for (h = !1; g--;) 0 < g && b[g - 1].pos + b[g - 1].size > b[g].pos && (b[g - 1].size += b[g].size, b[g - 1].targets = b[g - 1].targets.concat(b[g].targets), b[g - 1].align = .5, b[g - 1].pos + b[g - 1].size > e && (b[g - 1].pos = e - b[g - 1].size), b.splice(g, 1), h = !0)
            }
            n.push.apply(n, m);
            g = 0;
            w(b, function (b) {
                var c = 0;
                if (w(b.targets, function () {
                        n[g].pos = b.pos + c;
                        if (Math.abs(n[g].pos - n[g].target) > d) return p(n.slice(0, g + 1), function (a) {
                            delete a.pos
                        }), n.reducedLen = (n.reducedLen || e) - .1 * e, n.reducedLen > .1 * e && a.distribute(n, e, d), !0;
                        c += n[g].size;
                        g++
                    })) return !0
            });
            c(n, f)
        };
        f.prototype.drawDataLabels = function () {
            function b(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }
            var c = this,
                d = c.chart,
                f = c.options,
                g = f.dataLabels,
                h = c.points,
                q, u, w = c.hasRendered || 0,
                k, v, x = l(g.defer, !!f.animation),
                y = d.renderer;
            if (g.enabled || c._hasPointLabels) c.dlProcessOptions && c.dlProcessOptions(g), v = c.plotGroup("dataLabelsGroup", "data-labels",
                x && !w ? "hidden" : "visible", g.zIndex || 6), x && (v.attr({
                opacity: +w
            }), w || B(c, "afterAnimate", function () {
                c.visible && v.show(!0);
                v[f.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), u = g, p(h, function (e) {
                var h, n = e.dataLabel,
                    p, C, w = e.connector,
                    A = !n,
                    x;
                q = e.dlOptions || e.options && e.options.dataLabels;
                (h = l(q && q.enabled, u.enabled) && !e.isNull) && (h = !0 === b(e, q || g));
                h && (g = t(u, q), p = e.getLabelConfig(), x = g[e.formatPrefix + "Format"] || g.format, k = D(x) ? m(x, p, d.time) : (g[e.formatPrefix + "Formatter"] || g.formatter).call(p, g),
                    x = g.style, p = g.rotation, x.color = l(g.color, x.color, c.color, "#000000"), "contrast" === x.color && (e.contrastColor = y.getContrast(e.color || c.color), x.color = g.inside || 0 > l(e.labelDistance, g.distance) || f.stacking ? e.contrastColor : "#000000"), f.cursor && (x.cursor = f.cursor), C = {
                        fill: g.backgroundColor,
                        stroke: g.borderColor,
                        "stroke-width": g.borderWidth,
                        r: g.borderRadius || 0,
                        rotation: p,
                        padding: g.padding,
                        zIndex: 1
                    }, a.objectEach(C, function (a, b) {
                        void 0 === a && delete C[b]
                    }));
                !n || h && D(k) ? h && D(k) && (n ? C.text = k : (n = e.dataLabel = p ? y.text(k,
                    0, -9999, g.useHTML).addClass("highcharts-data-label") : y.label(k, 0, -9999, g.shape, null, null, g.useHTML, null, "data-label"), n.addClass(" highcharts-data-label-color-" + e.colorIndex + " " + (g.className || "") + (g.useHTML ? " highcharts-tracker" : ""))), n.attr(C), n.css(x).shadow(g.shadow), n.added || n.add(v), c.alignDataLabel(e, n, g, null, A)) : (e.dataLabel = n = n.destroy(), w && (e.connector = w.destroy()))
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        f.prototype.alignDataLabel = function (a, c, f, g, h) {
            var b = this.chart,
                e = b.inverted,
                n = l(a.dlBox &&
                    a.dlBox.centerX, a.plotX, -9999),
                m = l(a.plotY, -9999),
                k = c.getBBox(),
                p, q = f.rotation,
                w = f.align,
                t = this.visible && (a.series.forceDL || b.isInsidePlot(n, Math.round(m), e) || g && b.isInsidePlot(n, e ? g.x + 1 : g.y + g.height - 1, e)),
                r = "justify" === l(f.overflow, "justify");
            if (t && (p = f.style.fontSize, p = b.renderer.fontMetrics(p, c).b, g = d({
                    x: e ? this.yAxis.len - m : n,
                    y: Math.round(e ? this.xAxis.len - n : m),
                    width: 0,
                    height: 0
                }, g), d(f, {
                    width: k.width,
                    height: k.height
                }), q ? (r = !1, n = b.renderer.rotCorr(p, q), n = {
                    x: g.x + f.x + g.width / 2 + n.x,
                    y: g.y + f.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    } [f.verticalAlign] * g.height
                }, c[h ? "attr" : "animate"](n).attr({
                    align: w
                }), m = (q + 720) % 360, m = 180 < m && 360 > m, "left" === w ? n.y -= m ? k.height : 0 : "center" === w ? (n.x -= k.width / 2, n.y -= k.height / 2) : "right" === w && (n.x -= k.width, n.y -= m ? 0 : k.height), c.placed = !0, c.alignAttr = n) : (c.align(f, null, g), n = c.alignAttr), r && 0 <= g.height ? a.isLabelJustified = this.justifyDataLabel(c, f, n, k, g, h) : l(f.crop, !0) && (t = b.isInsidePlot(n.x, n.y) && b.isInsidePlot(n.x + k.width, n.y + k.height)), f.shape && !q)) c[h ? "attr" : "animate"]({
                anchorX: e ? b.plotWidth -
                    a.plotY : a.plotX,
                anchorY: e ? b.plotHeight - a.plotX : a.plotY
            });
            t || (c.attr({
                y: -9999
            }), c.placed = !1)
        };
        f.prototype.justifyDataLabel = function (a, c, d, f, g, h) {
            var b = this.chart,
                e = c.align,
                l = c.verticalAlign,
                k, n, m = a.box ? 0 : a.padding || 0;
            k = d.x + m;
            0 > k && ("right" === e ? c.align = "left" : c.x = -k, n = !0);
            k = d.x + f.width - m;
            k > b.plotWidth && ("left" === e ? c.align = "right" : c.x = b.plotWidth - k, n = !0);
            k = d.y + m;
            0 > k && ("bottom" === l ? c.verticalAlign = "top" : c.y = -k, n = !0);
            k = d.y + f.height - m;
            k > b.plotHeight && ("top" === l ? c.verticalAlign = "bottom" : c.y = b.plotHeight -
                k, n = !0);
            n && (a.placed = !h, a.align(c, null, g));
            return n
        };
        h.pie && (h.pie.prototype.drawDataLabels = function () {
            var b = this,
                c = b.data,
                d, g = b.chart,
                h = b.options.dataLabels,
                m = l(h.connectorPadding, 10),
                q = l(h.connectorWidth, 1),
                u = g.plotWidth,
                w = g.plotHeight,
                k = Math.round(g.chartWidth / 3),
                t, x = b.center,
                v = x[2] / 2,
                H = x[1],
                r, z, B, J, K = [
                    [],
                    []
                ],
                P, O, I, Q, R = [0, 0, 0, 0];
            b.visible && (h.enabled || b._hasPointLabels) && (p(c, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }),
                    a.dataLabel.shortened = !1)
            }), f.prototype.drawDataLabels.apply(b), p(c, function (a) {
                a.dataLabel && (a.visible ? (K[a.half].push(a), a.dataLabel._pos = null, !D(h.style.width) && !D(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > k && (a.dataLabel.css({
                    width: .7 * k
                }), a.dataLabel.shortened = !0)) : a.dataLabel = a.dataLabel.destroy())
            }), p(K, function (c, e) {
                var f, k, n = c.length,
                    q = [],
                    C;
                if (n)
                    for (b.sortByAngle(c, e - .5), 0 < b.maxLabelDistance && (f = Math.max(0, H - v - b.maxLabelDistance),
                            k = Math.min(H + v + b.maxLabelDistance, g.plotHeight), p(c, function (a) {
                                0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, H - v - a.labelDistance), a.bottom = Math.min(H + v + a.labelDistance, g.plotHeight), C = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                                    target: a.labelPos[1] - a.top + C / 2,
                                    size: C,
                                    rank: a.y
                                }, q.push(a.distributeBox))
                            }), f = k + C - f, a.distribute(q, f, f / 5)), Q = 0; Q < n; Q++) d = c[Q], B = d.labelPos, r = d.dataLabel, I = !1 === d.visible ? "hidden" : "inherit", O = f = B[1], q && D(d.distributeBox) && (void 0 === d.distributeBox.pos ? I = "hidden" : (J =
                        d.distributeBox.size, O = d.top + d.distributeBox.pos)), delete d.positionIndex, P = h.justify ? x[0] + (e ? -1 : 1) * (v + d.labelDistance) : b.getX(O < d.top + 2 || O > d.bottom - 2 ? f : O, e, d), r._attr = {
                        visibility: I,
                        align: B[6]
                    }, r._pos = {
                        x: P + h.x + ({
                            left: m,
                            right: -m
                        } [B[6]] || 0),
                        y: O + h.y - 10
                    }, B.x = P, B.y = O, l(h.crop, !0) && (z = r.getBBox().width, f = null, P - z < m && 1 === e ? (f = Math.round(z - P + m), R[3] = Math.max(f, R[3])) : P + z > u - m && 0 === e && (f = Math.round(P + z - u + m), R[1] = Math.max(f, R[1])), 0 > O - J / 2 ? R[0] = Math.max(Math.round(-O + J / 2), R[0]) : O + J / 2 > w && (R[2] = Math.max(Math.round(O +
                        J / 2 - w), R[2])), r.sideOverflow = f)
            }), 0 === y(R) || this.verifyDataLabelOverflow(R)) && (this.placeDataLabels(), q && p(this.points, function (a) {
                var c;
                t = a.connector;
                if ((r = a.dataLabel) && r._pos && a.visible && 0 < a.labelDistance) {
                    I = r._attr.visibility;
                    if (c = !t) a.connector = t = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(b.dataLabelsGroup), t.attr({
                        "stroke-width": q,
                        stroke: h.connectorColor || a.color || "#666666"
                    });
                    t[c ? "attr" : "animate"]({
                        d: b.connectorPath(a.labelPos)
                    });
                    t.attr("visibility", I)
                } else t && (a.connector = t.destroy())
            }))
        }, h.pie.prototype.connectorPath = function (a) {
            var b = a.x,
                c = a.y;
            return l(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, h.pie.prototype.placeDataLabels = function () {
            p(this.points, function (a) {
                var b = a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width +
                        "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                    y: -9999
                }))
            }, this)
        }, h.pie.prototype.alignDataLabel = q, h.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center,
                c = this.options,
                d = c.center,
                f = c.minSize || 80,
                h, l = null !== c.size;
            l || (null !== d[0] ? h = Math.max(b[2] - Math.max(a[1], a[3]), f) : (h = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== d[1] ? h = Math.max(Math.min(h, b[2] - Math.max(a[0],
                a[2])), f) : (h = Math.max(Math.min(h, b[2] - a[0] - a[2]), f), b[1] += (a[0] - a[2]) / 2), h < b[2] ? (b[2] = h, b[3] = Math.min(g(c.innerSize || 0, h), h), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : l = !0);
            return l
        });
        h.column && (h.column.prototype.alignDataLabel = function (a, c, d, g, h) {
            var b = this.chart.inverted,
                e = a.series,
                n = a.dlBox || a.shapeArgs,
                m = l(a.below, a.plotY > l(this.translatedThreshold, e.yAxis.len)),
                k = l(d.inside, !!this.options.stacking);
            n && (g = t(n), 0 > g.y && (g.height += g.y, g.y = 0), n = g.y + g.height - e.yAxis.len, 0 < n && (g.height -=
                n), b && (g = {
                x: e.yAxis.len - g.y - g.height,
                y: e.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), k || (b ? (g.x += m ? 0 : g.width, g.width = 0) : (g.y += m ? g.height : 0, g.height = 0)));
            d.align = l(d.align, !b || k ? "center" : m ? "right" : "left");
            d.verticalAlign = l(d.verticalAlign, b || k ? "middle" : m ? "top" : "bottom");
            f.prototype.alignDataLabel.call(this, a, c, d, g, h);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(J);
    (function (a) {
        var B = a.Chart,
            y = a.each,
            D = a.objectEach,
            p = a.pick;
        a = a.addEvent;
        a(B, "render", function () {
            var a = [];
            y(this.labelCollectors || [], function (d) {
                a = a.concat(d())
            });
            y(this.yAxis || [], function (d) {
                d.options.stackLabels && !d.options.stackLabels.allowOverlap && D(d.stacks, function (d) {
                    D(d, function (d) {
                        a.push(d.label)
                    })
                })
            });
            y(this.series || [], function (d) {
                var m = d.options.dataLabels,
                    t = d.dataLabelCollections || ["dataLabel"];
                (m.enabled || d._hasPointLabels) && !m.allowOverlap && d.visible && y(t, function (m) {
                    y(d.points, function (d) {
                        d[m] && (d[m].labelrank = p(d.labelrank, d.shapeArgs && d.shapeArgs.height), a.push(d[m]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        B.prototype.hideOverlappingLabels = function (a) {
            var d = a.length,
                p = this.renderer,
                t, q, l, g, f, h, w = function (a, b, e, d, f, g, h, l) {
                    return !(f > a + e || f + h < a || g > b + d || g + l < b)
                };
            l = function (a) {
                var b, c, d, f = 2 * (a.box ? 0 : a.padding || 0);
                d = 0;
                if (a && (!a.alignAttr || a.placed)) return b = a.alignAttr || {
                    x: a.attr("x"),
                    y: a.attr("y")
                }, c = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height, d = p.fontMetrics(null, a.element).h), {
                    x: b.x + (c.translateX || 0),
                    y: b.y + (c.translateY || 0) - d,
                    width: a.width - f,
                    height: a.height - f
                }
            };
            for (q = 0; q < d; q++)
                if (t =
                    a[q]) t.oldOpacity = t.opacity, t.newOpacity = 1, t.absoluteBox = l(t);
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (q = 0; q < d; q++)
                for (h = (l = a[q]) && l.absoluteBox, t = q + 1; t < d; ++t)
                    if (f = (g = a[t]) && g.absoluteBox, h && f && l !== g && 0 !== l.newOpacity && 0 !== g.newOpacity && (f = w(h.x, h.y, h.width, h.height, f.x, f.y, f.width, f.height)))(l.labelrank < g.labelrank ? l : g).newOpacity = 0;
            y(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && (a.alignAttr && a.placed ? (c ? a.show(!0) : b = function () {
                        a.hide()
                    }, a.alignAttr.opacity =
                    c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)) : a.attr({
                    opacity: c
                })), a.isOld = !0)
            })
        }
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.Chart,
            D = a.createElement,
            p = a.css,
            d = a.defaultOptions,
            m = a.defaultPlotOptions,
            v = a.each,
            t = a.extend,
            q = a.fireEvent,
            l = a.hasTouch,
            g = a.inArray,
            f = a.isObject,
            h = a.Legend,
            w = a.merge,
            c = a.pick,
            b = a.Point,
            e = a.Series,
            n = a.seriesTypes,
            A = a.svg,
            G;
        G = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this,
                    b = a.chart.pointer,
                    c = function (a) {
                        var c = b.getPointFromEvent(a);
                        void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                    };
                v(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (v(a.trackerGroups, function (e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (l) a[e].on("touchstart", c);
                        a.options.cursor && a[e].css(p).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                q(this, "afterDrawTracker")
            },
            drawTrackerGraph: function () {
                var a = this,
                    b = a.options,
                    c =
                    b.trackByArea,
                    e = [].concat(c ? a.areaPath : a.graphPath),
                    d = e.length,
                    f = a.chart,
                    g = f.pointer,
                    h = f.renderer,
                    n = f.options.tooltip.snap,
                    m = a.tracker,
                    p, w = function () {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    },
                    t = "rgba(192,192,192," + (A ? .0001 : .002) + ")";
                if (d && !c)
                    for (p = d + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - n, e[p + 2], "L"), (p && "M" === e[p] || p === d) && e.splice(p, 0, "L", e[p - 2] + n, e[p - 1]);
                m ? m.attr({
                    d: e
                }) : a.graph && (a.tracker = h.path(e).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: t,
                    fill: c ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n),
                    zIndex: 2
                }).add(a.group), v([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", w).on("mouseout", function (a) {
                        g.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (l) a.on("touchstart", w)
                }));
                q(this, "afterDrawTracker")
            }
        };
        n.column && (n.column.prototype.drawTracker = G.drawTrackerPoint);
        n.pie && (n.pie.prototype.drawTracker = G.drawTrackerPoint);
        n.scatter && (n.scatter.prototype.drawTracker = G.drawTrackerPoint);
        t(h.prototype, {
            setItemEvents: function (a, c, e) {
                var d = this,
                    f = d.chart.renderer.boxWrapper,
                    g = "highcharts-legend-" + (a instanceof b ? "point" : "series") + "-active";
                (e ? c : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    f.addClass(g);
                    c.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    c.css(w(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    f.removeClass(g);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    f.removeClass(g);
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick",
                        b, c) : q(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = D("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                B(a.checkbox, "click", function (b) {
                    q(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            }
        });
        d.legend.itemStyle.cursor = "pointer";
        t(y.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    c = d.lang,
                    e = b.options.chart.resetZoomButton,
                    f = e.theme,
                    g = f.states,
                    h = "chart" === e.relativeTo ? null : "plotBox";
                q(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, f, g && g.hover).attr({
                        align: e.position.align,
                        title: c.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(e.position, !1, h)
                })
            },
            zoomOut: function () {
                q(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function (a) {
                var b, e = this.pointer,
                    d = !1,
                    g;
                !a || a.resetSelection ? (v(this.axes, function (a) {
                    b = a.zoom()
                }), e.initiated = !1) : v(a.xAxis.concat(a.yAxis),
                    function (a) {
                        var c = a.axis;
                        e[c.isXAxis ? "zoomX" : "zoomY"] && (b = c.zoom(a.min, a.max), c.displayBtn && (d = !0))
                    });
                g = this.resetZoomButton;
                d && !g ? this.showResetZoom() : !d && f(g) && (this.resetZoomButton = g.destroy());
                b && this.redraw(c(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this,
                    e = c.hoverPoints,
                    d;
                e && v(e, function (a) {
                    a.setState()
                });
                v("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var e = b.horiz,
                        f = a[e ? "chartX" : "chartY"],
                        e = e ? "mouseDownX" : "mouseDownY",
                        g = c[e],
                        k = (b.pointRange ||
                            0) / 2,
                        h = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1,
                        l = b.getExtremes(),
                        n = b.toValue(g - f, !0) + k * h,
                        h = b.toValue(g + b.len - f, !0) - k * h,
                        m = h < n,
                        g = m ? h : n,
                        n = m ? n : h,
                        h = Math.min(l.dataMin, k ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                        k = Math.max(l.dataMax, k ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                        m = h - g;
                    0 < m && (n += m, g = h);
                    m = n - k;
                    0 < m && (n = k, g -= m);
                    b.series.length && g !== l.min && n !== l.max && (b.setExtremes(g, n, !1, !1, {
                        trigger: "pan"
                    }), d = !0);
                    c[e] = f
                });
                d && c.redraw(!1);
                p(c.container, {
                    cursor: "move"
                })
            }
        });
        t(b.prototype, {
            select: function (a, b) {
                var e = this,
                    d = e.series,
                    f = d.chart;
                a = c(a, !e.selected);
                e.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function () {
                    e.selected = e.options.selected = a;
                    d.options.data[g(e, d.data)] = e.options;
                    e.setState(a && "select");
                    b || v(f.getSelectedPoints(), function (a) {
                        a.selected && a !== e && (a.selected = a.options.selected = !1, d.options.data[g(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function (a) {
                var b = this.series.chart,
                    c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this,
                    b.inverted);
                c.runPointActions(a, this)
            },
            onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                v(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this,
                        c = w(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        B(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function (a, b) {
                var e = Math.floor(this.plotX),
                    d = this.plotY,
                    f = this.series,
                    g = f.options.states[a || "normal"] || {},
                    h =
                    m[f.type].marker && f.options.marker,
                    l = h && !1 === h.enabled,
                    n = h && h.states && h.states[a || "normal"] || {},
                    p = !1 === n.enabled,
                    w = f.stateMarkerGraphic,
                    v = this.marker || {},
                    C = f.chart,
                    A = f.halo,
                    y, G = h && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (p || l && !1 === n.enabled) || a && v.states && v.states[a] && !1 === v.states[a].enabled)) {
                    G && (y = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" +
                        a), this.graphic.animate(f.pointAttribs(this, a), c(C.options.chart.animation, g.animation)), y && this.graphic.animate(y, c(C.options.chart.animation, n.animation, h.animation)), w && w.hide();
                    else {
                        if (a && n) {
                            h = v.symbol || f.symbol;
                            w && w.currentSymbol !== h && (w = w.destroy());
                            if (w) w[b ? "animate" : "attr"]({
                                x: y.x,
                                y: y.y
                            });
                            else h && (f.stateMarkerGraphic = w = C.renderer.symbol(h, y.x, y.y, y.width, y.height).add(f.markerGroup), w.currentSymbol = h);
                            w && w.attr(f.pointAttribs(this, a))
                        }
                        w && (w[a && C.isInsidePlot(e, d, C.inverted) ? "show" : "hide"](),
                            w.element.point = this)
                    }(e = g.halo) && e.size ? (A || (f.halo = A = C.renderer.path().add((this.graphic || w).parentGroup)), A.show()[b ? "animate" : "attr"]({
                        d: this.haloPath(e.size)
                    }), A.attr({
                        "class": "highcharts-halo highcharts-color-" + c(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), A.point = this, A.attr(t({
                        fill: this.color || f.color,
                        "fill-opacity": e.opacity
                    }, e.attributes))) : A && A.point && A.point.haloPath && A.animate({
                        d: A.point.haloPath(0)
                    }, null, A.hide);
                    this.state = a;
                    q(this, "afterSetState")
                }
            },
            haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        t(e.prototype, {
            onMouseOver: function () {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && q(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function () {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    e = b.hoverPoint;
                b.hoverSeries = null;
                if (e) e.onMouseOut();
                this && a.events.mouseOut && q(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function (a) {
                var b = this,
                    e = b.options,
                    d = b.graph,
                    f = e.states,
                    g = e.lineWidth,
                    e = 0;
                a = a || "";
                if (b.state !== a && (v([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)), d && !d.dashstyle))
                    for (g = {
                            "stroke-width": g
                        }, d.animate(g, c(f[a || "normal"] && f[a || "normal"].animation,
                            b.chart.options.chart.animation)); b["zone-graph-" + e];) b["zone-graph-" + e].attr(g), e += 1
            },
            setVisible: function (a, b) {
                var c = this,
                    e = c.chart,
                    d = c.legendItem,
                    f, g = e.options.chart.ignoreHiddenSeries,
                    h = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
                v(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][f]()
                });
                if (e.hoverSeries === c || (e.hoverPoint && e.hoverPoint.series) === c) c.onMouseOut();
                d && e.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking &&
                    v(e.series, function (a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                v(c.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (e.isDirtyBox = !0);
                q(c, f);
                !1 !== b && e.redraw()
            },
            show: function () {
                this.setVisible(!0)
            },
            hide: function () {
                this.setVisible(!1)
            },
            select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                q(this, a ? "select" : "unselect")
            },
            drawTracker: G.drawTrackerGraph
        })
    })(J);
    (function (a) {
        var B = a.Chart,
            y = a.each,
            D = a.inArray,
            p = a.isArray,
            d = a.isObject,
            m = a.pick,
            v = a.splat;
        B.prototype.setResponsive = function (d) {
            var m = this.options.responsive,
                l = [],
                g = this.currentResponsive;
            m && m.rules && y(m.rules, function (f) {
                void 0 === f._id && (f._id = a.uniqueKey());
                this.matchResponsiveRule(f, l, d)
            }, this);
            var f = a.merge.apply(0, a.map(l, function (d) {
                    return a.find(m.rules, function (a) {
                        return a._id === d
                    }).chartOptions
                })),
                l = l.toString() || void 0;
            l !== (g && g.ruleIds) && (g && this.update(g.undoOptions, d), l ? (this.currentResponsive = {
                    ruleIds: l,
                    mergedOptions: f,
                    undoOptions: this.currentOptions(f)
                }, this.update(f, d)) :
                this.currentResponsive = void 0)
        };
        B.prototype.matchResponsiveRule = function (a, d) {
            var l = a.condition;
            (l.callback || function () {
                return this.chartWidth <= m(l.maxWidth, Number.MAX_VALUE) && this.chartHeight <= m(l.maxHeight, Number.MAX_VALUE) && this.chartWidth >= m(l.minWidth, 0) && this.chartHeight >= m(l.minHeight, 0)
            }).call(this) && d.push(a._id)
        };
        B.prototype.currentOptions = function (m) {
            function q(g, f, h, l) {
                var c;
                a.objectEach(g, function (a, e) {
                    if (!l && -1 < D(e, ["series", "xAxis", "yAxis"]))
                        for (a = v(a), h[e] = [], c = 0; c < a.length; c++) f[e][c] &&
                            (h[e][c] = {}, q(a[c], f[e][c], h[e][c], l + 1));
                    else d(a) ? (h[e] = p(a) ? [] : {}, q(a, f[e] || {}, h[e], l + 1)) : h[e] = f[e] || null
                })
            }
            var l = {};
            q(m, this.options, l, 0);
            return l
        }
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.Axis,
            D = a.each,
            p = a.pick;
        B(y, "getSeriesExtremes", function () {
            var a = [];
            this.isXAxis && (D(this.series, function (d, p) {
                d.useMapGeometry && (a[p] = d.xData, d.xData = [])
            }), this.seriesXData = a)
        });
        B(y, "afterGetSeriesExtremes", function () {
            var a = this.seriesXData,
                m, v, t;
            this.isXAxis && (m = p(this.dataMin, Number.MAX_VALUE), v = p(this.dataMax,
                -Number.MAX_VALUE), D(this.series, function (d, l) {
                d.useMapGeometry && (m = Math.min(m, p(d.minX, m)), v = Math.max(v, p(d.maxX, v)), d.xData = a[l], t = !0)
            }), t && (this.dataMin = m, this.dataMax = v), delete this.seriesXData)
        });
        B(y, "afterSetAxisTranslation", function () {
            var a = this.chart,
                m;
            m = a.plotWidth / a.plotHeight;
            var a = a.xAxis[0],
                p;
            "yAxis" === this.coll && void 0 !== a.transA && D(this.series, function (a) {
                a.preserveAspectRatio && (p = !0)
            });
            if (p && (this.transA = a.transA = Math.min(this.transA, a.transA), m /= (a.max - a.min) / (this.max - this.min),
                    m = 1 > m ? this : a, a = (m.max - m.min) * m.transA, m.pixelPadding = m.len - a, m.minPixelPadding = m.pixelPadding / 2, a = m.fixTo)) {
                a = a[1] - m.toValue(a[0], !0);
                a *= m.transA;
                if (Math.abs(a) > m.minPixelPadding || m.min === m.dataMin && m.max === m.dataMax) a = 0;
                m.minPixelPadding -= a
            }
        });
        B(y, "render", function () {
            this.fixTo = null
        })
    })(J);
    (function (a) {
        var B = a.addEvent,
            y = a.Axis,
            D = a.Chart,
            p = a.color,
            d, m = a.each,
            v = a.extend,
            t = a.isNumber,
            q = a.Legend,
            l = a.LegendSymbolMixin,
            g = a.noop,
            f = a.merge,
            h = a.pick;
        a.ColorAxis || (d = a.ColorAxis = function () {
            this.init.apply(this,
                arguments)
        }, v(d.prototype, y.prototype), v(d.prototype, {
            defaultColorAxisOptions: {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            },
            keepProps: ["legendGroup", "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(y.prototype.keepProps),
            init: function (a, c) {
                var b =
                    "vertical" !== a.options.legend.layout,
                    e;
                this.coll = "colorAxis";
                e = f(this.defaultColorAxisOptions, {
                    side: b ? 2 : 1,
                    reversed: !b
                }, c, {
                    opposite: !b,
                    showEmpty: !1,
                    title: null,
                    visible: a.options.legend.enabled
                });
                y.prototype.init.call(this, a, e);
                c.dataClasses && this.initDataClasses(c);
                this.initStops();
                this.horiz = b;
                this.zoomEnabled = !1;
                this.defaultLegendLength = 200
            },
            initDataClasses: function (a) {
                var c = this.chart,
                    b, e = 0,
                    d = c.options.chart.colorCount,
                    g = this.options,
                    h = a.dataClasses.length;
                this.dataClasses = b = [];
                this.legendItems = [];
                m(a.dataClasses, function (a, l) {
                    a = f(a);
                    b.push(a);
                    a.color || ("category" === g.dataClassColor ? (l = c.options.colors, d = l.length, a.color = l[e], a.colorIndex = e, e++, e === d && (e = 0)) : a.color = p(g.minColor).tweenTo(p(g.maxColor), 2 > h ? .5 : l / (h - 1)))
                })
            },
            setTickPositions: function () {
                if (!this.dataClasses) return y.prototype.setTickPositions.call(this)
            },
            initStops: function () {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                m(this.stops, function (a) {
                    a.color = p(a[1])
                })
            },
            setOptions: function (a) {
                y.prototype.setOptions.call(this,
                    a);
                this.options.crosshair = this.options.marker
            },
            setAxisSize: function () {
                var a = this.legendSymbol,
                    c = this.chart,
                    b = c.options.legend || {},
                    e, d;
                a ? (this.left = b = a.attr("x"), this.top = e = a.attr("y"), this.width = d = a.attr("width"), this.height = a = a.attr("height"), this.right = c.chartWidth - b - d, this.bottom = c.chartHeight - e - a, this.len = this.horiz ? d : a, this.pos = this.horiz ? b : e) : this.len = (this.horiz ? b.symbolWidth : b.symbolHeight) || this.defaultLegendLength
            },
            normalizedValue: function (a) {
                this.isLog && (a = this.val2lin(a));
                return 1 - (this.max -
                    a) / (this.max - this.min || 1)
            },
            toColor: function (a, c) {
                var b = this.stops,
                    e, d, f = this.dataClasses,
                    g, h;
                if (f)
                    for (h = f.length; h--;) {
                        if (g = f[h], e = g.from, b = g.to, (void 0 === e || a >= e) && (void 0 === b || a <= b)) {
                            d = g.color;
                            c && (c.dataClass = h, c.colorIndex = g.colorIndex);
                            break
                        }
                    } else {
                        a = this.normalizedValue(a);
                        for (h = b.length; h-- && !(a > b[h][0]););
                        e = b[h] || b[h + 1];
                        b = b[h + 1] || e;
                        a = 1 - (b[0] - a) / (b[0] - e[0] || 1);
                        d = e.color.tweenTo(b.color, a)
                    }
                return d
            },
            getOffset: function () {
                var a = this.legendGroup,
                    c = this.chart.axisOffset[this.side];
                a && (this.axisParent =
                    a, y.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = c)
            },
            setLegendColor: function () {
                var a, c = this.reversed;
                a = c ? 1 : 0;
                c = c ? 0 : 1;
                a = this.horiz ? [a, 0, c, 0] : [0, c, 0, a];
                this.legendColor = {
                    linearGradient: {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3]
                    },
                    stops: this.stops
                }
            },
            drawLegendSymbol: function (a, c) {
                var b = a.padding,
                    e = a.options,
                    d = this.horiz,
                    f = h(e.symbolWidth, d ? this.defaultLegendLength : 12),
                    g = h(e.symbolHeight, d ? 12 : this.defaultLegendLength),
                    l = h(e.labelPadding,
                        d ? 16 : 30),
                    e = h(e.itemDistance, 10);
                this.setLegendColor();
                c.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({
                    zIndex: 1
                }).add(c.legendGroup);
                this.legendItemWidth = f + b + (d ? e : l);
                this.legendItemHeight = g + b + (d ? l : 0)
            },
            setState: function (a) {
                m(this.series, function (c) {
                    c.setState(a)
                })
            },
            visible: !0,
            setVisible: g,
            getSeriesExtremes: function () {
                var a = this.series,
                    c = a.length;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; c--;) a[c].getExtremes(), void 0 !== a[c].valueMin && (this.dataMin = Math.min(this.dataMin, a[c].valueMin),
                    this.dataMax = Math.max(this.dataMax, a[c].valueMax))
            },
            drawCrosshair: function (a, c) {
                var b = c && c.plotX,
                    e = c && c.plotY,
                    d, f = this.pos,
                    g = this.len;
                c && (d = this.toPixels(c[c.series.colorKey]), d < f ? d = f - 2 : d > f + g && (d = f + g + 2), c.plotX = d, c.plotY = this.len - d, y.prototype.drawCrosshair.call(this, a, c), c.plotX = b, c.plotY = e, this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.cross.attr({
                    fill: this.crosshair.color
                })))
            },
            getPlotLinePath: function (a, c, b, e, d) {
                return t(d) ? this.horiz ? ["M", d - 4, this.top - 6, "L", d + 4, this.top - 6, d, this.top, "Z"] : ["M", this.left, d, "L", this.left - 6, d + 6, this.left - 6, d - 6, "Z"] : y.prototype.getPlotLinePath.call(this, a, c, b, e)
            },
            update: function (a, c) {
                var b = this.chart,
                    e = b.legend;
                m(this.series, function (a) {
                    a.isDirtyData = !0
                });
                a.dataClasses && e.allItems && (m(e.allItems, function (a) {
                    a.isDataClass && a.legendGroup && a.legendGroup.destroy()
                }), b.isDirtyLegend = !0);
                b.options[this.coll] = f(this.userOptions, a);
                y.prototype.update.call(this,
                    a, c);
                this.legendItem && (this.setLegendColor(), e.colorizeItem(this, !0))
            },
            remove: function () {
                this.legendItem && this.chart.legend.destroyItem(this);
                y.prototype.remove.call(this)
            },
            getDataClassLegendSymbols: function () {
                var d = this,
                    c = this.chart,
                    b = this.legendItems,
                    e = c.options.legend,
                    f = e.valueDecimals,
                    h = e.valueSuffix || "",
                    p;
                b.length || m(this.dataClasses, function (e, n) {
                    var q = !0,
                        w = e.from,
                        k = e.to;
                    p = "";
                    void 0 === w ? p = "\x3c " : void 0 === k && (p = "\x3e ");
                    void 0 !== w && (p += a.numberFormat(w, f) + h);
                    void 0 !== w && void 0 !== k && (p += " - ");
                    void 0 !== k && (p += a.numberFormat(k, f) + h);
                    b.push(v({
                        chart: c,
                        name: p,
                        options: {},
                        drawLegendSymbol: l.drawRectangle,
                        visible: !0,
                        setState: g,
                        isDataClass: !0,
                        setVisible: function () {
                            q = this.visible = !q;
                            m(d.series, function (a) {
                                m(a.points, function (a) {
                                    a.dataClass === n && a.setVisible(q)
                                })
                            });
                            c.legend.colorizeItem(this, q)
                        }
                    }, e))
                });
                return b
            },
            name: ""
        }), m(["fill", "stroke"], function (d) {
            a.Fx.prototype[d + "Setter"] = function () {
                this.elem.attr(d, p(this.start).tweenTo(p(this.end), this.pos), null, !0)
            }
        }), B(D, "afterGetAxes", function () {
            var a =
                this.options.colorAxis;
            this.colorAxis = [];
            a && new d(this, a)
        }), B(q, "afterGetAllItems", function (d) {
            var c = [],
                b = this.chart.colorAxis[0];
            b && b.options && b.options.showInLegend && (b.options.dataClasses ? c = b.getDataClassLegendSymbols() : c.push(b), m(b.series, function (b) {
                a.erase(d.allItems, b)
            }));
            for (b = c.length; b--;) d.allItems.unshift(c[b])
        }), B(q, "afterColorizeItem", function (a) {
            a.visible && a.item.legendColor && a.item.legendSymbol.attr({
                fill: a.item.legendColor
            })
        }), B(q, "afterUpdate", function (a, c, b) {
            this.chart.colorAxis[0] &&
                this.chart.colorAxis[0].update({}, b)
        }))
    })(J);
    (function (a) {
        var B = a.defined,
            y = a.each,
            D = a.noop,
            p = a.seriesTypes;
        a.colorPointMixin = {
            isValid: function () {
                return null !== this.value && Infinity !== this.value && -Infinity !== this.value
            },
            setVisible: function (a) {
                var d = this,
                    p = a ? "show" : "hide";
                y(["graphic", "dataLabel"], function (a) {
                    if (d[a]) d[a][p]()
                })
            },
            setState: function (d) {
                a.Point.prototype.setState.call(this, d);
                this.graphic && this.graphic.attr({
                    zIndex: "hover" === d ? 1 : 0
                })
            }
        };
        a.colorSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis",
                "yAxis", "colorAxis"
            ],
            optionalAxis: "colorAxis",
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: D,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: p.column.prototype.pointAttribs,
            translateColors: function () {
                var a = this,
                    m = this.options.nullColor,
                    p = this.colorAxis,
                    t = this.colorKey;
                y(this.data, function (d) {
                    var l = d[t];
                    if (l = d.options.color || (d.isNull ? m : p && void 0 !== l ? p.toColor(l, d) : d.color || a.color)) d.color = l
                })
            },
            colorAttribs: function (a) {
                var d = {};
                B(a.color) && (d[this.colorProp || "fill"] =
                    a.color);
                return d
            }
        }
    })(J);
    (function (a) {
        function B(a) {
            a && (a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        }

        function y(a) {
            this.init(a)
        }
        var D = a.addEvent,
            p = a.Chart,
            d = a.doc,
            m = a.each,
            v = a.extend,
            t = a.merge,
            q = a.pick;
        y.prototype.init = function (a) {
            this.chart = a;
            a.mapNavButtons = []
        };
        y.prototype.update = function (d) {
            var g = this.chart,
                f = g.options.mapNavigation,
                h, l, c, b, e, n = function (a) {
                    this.handler.call(g, a);
                    B(a)
                },
                m = g.mapNavButtons;
            d && (f = g.options.mapNavigation = t(g.options.mapNavigation,
                d));
            for (; m.length;) m.pop().destroy();
            q(f.enableButtons, f.enabled) && !g.renderer.forExport && a.objectEach(f.buttons, function (a, d) {
                h = t(f.buttonOptions, a);
                l = h.theme;
                l.style = t(h.theme.style, h.style);
                b = (c = l.states) && c.hover;
                e = c && c.select;
                a = g.renderer.button(h.text, 0, 0, n, l, b, e, 0, "zoomIn" === d ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation").attr({
                    width: h.width,
                    height: h.height,
                    title: g.options.lang[d],
                    padding: h.padding,
                    zIndex: 5
                }).add();
                a.handler = h.onclick;
                a.align(v(h, {
                    width: a.width,
                    height: 2 *
                        a.height
                }), null, h.alignTo);
                D(a.element, "dblclick", B);
                m.push(a)
            });
            this.updateEvents(f)
        };
        y.prototype.updateEvents = function (a) {
            var g = this.chart;
            q(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || D(g.container, "dblclick", function (a) {
                g.pointer.onContainerDblClick(a)
            }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick());
            q(a.enableMouseWheelZoom, a.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || D(g.container, void 0 === d.onmousewheel ?
                "DOMMouseScroll" : "mousewheel",
                function (a) {
                    g.pointer.onContainerMouseWheel(a);
                    B(a);
                    return !1
                }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
        };
        v(p.prototype, {
            fitToBox: function (a, d) {
                m([
                    ["x", "width"],
                    ["y", "height"]
                ], function (f) {
                    var g = f[0];
                    f = f[1];
                    a[g] + a[f] > d[g] + d[f] && (a[f] > d[f] ? (a[f] = d[f], a[g] = d[g]) : a[g] = d[g] + d[f] - a[f]);
                    a[f] > d[f] && (a[f] = d[f]);
                    a[g] < d[g] && (a[g] = d[g])
                });
                return a
            },
            mapZoom: function (a, d, f, h, m) {
                var c = this.xAxis[0],
                    b = c.max - c.min,
                    e = q(d, c.min + b / 2),
                    g = b * a,
                    b = this.yAxis[0],
                    l =
                    b.max - b.min,
                    p = q(f, b.min + l / 2),
                    l = l * a,
                    e = this.fitToBox({
                        x: e - g * (h ? (h - c.pos) / c.len : .5),
                        y: p - l * (m ? (m - b.pos) / b.len : .5),
                        width: g,
                        height: l
                    }, {
                        x: c.dataMin,
                        y: b.dataMin,
                        width: c.dataMax - c.dataMin,
                        height: b.dataMax - b.dataMin
                    }),
                    g = e.x <= c.dataMin && e.width >= c.dataMax - c.dataMin && e.y <= b.dataMin && e.height >= b.dataMax - b.dataMin;
                h && (c.fixTo = [h - c.pos, d]);
                m && (b.fixTo = [m - b.pos, f]);
                void 0 === a || g ? (c.setExtremes(void 0, void 0, !1), b.setExtremes(void 0, void 0, !1)) : (c.setExtremes(e.x, e.x + e.width, !1), b.setExtremes(e.y, e.y + e.height, !1));
                this.redraw()
            }
        });
        D(p, "beforeRender", function () {
            this.mapNavigation = new y(this);
            this.mapNavigation.update()
        })
    })(J);
    (function (a) {
        var B = a.extend,
            y = a.pick,
            D = a.Pointer;
        a = a.wrap;
        B(D.prototype, {
            onContainerDblClick: function (a) {
                var d = this.chart;
                a = this.normalize(a);
                d.options.mapNavigation.enableDoubleClickZoomTo ? d.pointer.inClass(a.target, "highcharts-tracker") && d.hoverPoint && d.hoverPoint.zoomTo() : d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(.5, d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY),
                    a.chartX, a.chartY)
            },
            onContainerMouseWheel: function (a) {
                var d = this.chart,
                    m;
                a = this.normalize(a);
                m = a.detail || -(a.wheelDelta / 120);
                d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop) && d.mapZoom(Math.pow(d.options.mapNavigation.mouseWheelSensitivity, m), d.xAxis[0].toValue(a.chartX), d.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
            }
        });
        a(D.prototype, "zoomOption", function (a) {
            var d = this.chart.options.mapNavigation;
            y(d.enableTouchZoom, d.enabled) && (this.chart.options.chart.pinchType = "xy");
            a.apply(this, [].slice.call(arguments,
                1))
        });
        a(D.prototype, "pinchTranslate", function (a, d, m, v, t, q, l) {
            a.call(this, d, m, v, t, q, l);
            "map" === this.chart.options.chart.type && this.hasZoom && (a = v.scaleX > v.scaleY, this.pinchTranslateDirection(!a, d, m, v, t, q, l, a ? v.scaleX : v.scaleY))
        })
    })(J);
    (function (a) {
        var B = a.colorPointMixin,
            y = a.each,
            D = a.extend,
            p = a.isNumber,
            d = a.map,
            m = a.merge,
            v = a.noop,
            t = a.pick,
            q = a.isArray,
            l = a.Point,
            g = a.Series,
            f = a.seriesType,
            h = a.seriesTypes,
            w = a.splat;
        f("map", "scatter", {
            allAreas: !0,
            animation: !1,
            nullColor: "#f7f7f7",
            borderColor: "#cccccc",
            borderWidth: 1,
            marker: null,
            stickyTracking: !1,
            joinBy: "hc-key",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            turboThreshold: 0,
            tooltip: {
                followPointer: !0,
                pointFormat: "{point.name}: {point.value}\x3cbr/\x3e"
            },
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    halo: null,
                    brightness: .2
                },
                select: {
                    color: "#cccccc"
                }
            }
        }, m(a.colorSeriesMixin, {
            type: "map",
            getExtremesFromAll: !0,
            useMapGeometry: !0,
            forceDL: !0,
            searchPoint: v,
            directTouch: !0,
            preserveAspectRatio: !0,
            pointArrayMap: ["value"],
            getBox: function (c) {
                var b = Number.MAX_VALUE,
                    e = -b,
                    d = b,
                    f = -b,
                    g = b,
                    h = b,
                    l = this.xAxis,
                    m = this.yAxis,
                    q;
                y(c || [], function (c) {
                    if (c.path) {
                        "string" === typeof c.path && (c.path = a.splitPath(c.path));
                        var k = c.path || [],
                            l = k.length,
                            n = !1,
                            m = -b,
                            r = b,
                            u = -b,
                            w = b,
                            v = c.properties;
                        if (!c._foundBox) {
                            for (; l--;) p(k[l]) && (n ? (m = Math.max(m, k[l]), r = Math.min(r, k[l])) : (u = Math.max(u, k[l]), w = Math.min(w, k[l])), n = !n);
                            c._midX = r + (m - r) * t(c.middleX, v && v["hc-middle-x"], .5);
                            c._midY = w + (u - w) * t(c.middleY, v && v["hc-middle-y"], .5);
                            c._maxX = m;
                            c._minX = r;
                            c._maxY =
                                u;
                            c._minY = w;
                            c.labelrank = t(c.labelrank, (m - r) * (u - w));
                            c._foundBox = !0
                        }
                        e = Math.max(e, c._maxX);
                        d = Math.min(d, c._minX);
                        f = Math.max(f, c._maxY);
                        g = Math.min(g, c._minY);
                        h = Math.min(c._maxX - c._minX, c._maxY - c._minY, h);
                        q = !0
                    }
                });
                q && (this.minY = Math.min(g, t(this.minY, b)), this.maxY = Math.max(f, t(this.maxY, -b)), this.minX = Math.min(d, t(this.minX, b)), this.maxX = Math.max(e, t(this.maxX, -b)), l && void 0 === l.options.minRange && (l.minRange = Math.min(5 * h, (this.maxX - this.minX) / 5, l.minRange || b)), m && void 0 === m.options.minRange && (m.minRange =
                    Math.min(5 * h, (this.maxY - this.minY) / 5, m.minRange || b)))
            },
            getExtremes: function () {
                g.prototype.getExtremes.call(this, this.valueData);
                this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                this.dataMin = this.minY;
                this.dataMax = this.maxY
            },
            translatePath: function (a) {
                var b = !1,
                    c = this.xAxis,
                    d = this.yAxis,
                    f = c.min,
                    g = c.transA,
                    c = c.minPixelPadding,
                    h = d.min,
                    l = d.transA,
                    d = d.minPixelPadding,
                    m, q = [];
                if (a)
                    for (m = a.length; m--;) p(a[m]) ? (q[m] = b ? (a[m] - f) * g + c :
                        (a[m] - h) * l + d, b = !b) : q[m] = a[m];
                return q
            },
            setData: function (c, b, e, f) {
                var h = this.options,
                    l = this.chart.options.chart,
                    n = l && l.map,
                    t = h.mapData,
                    u = h.joinBy,
                    v = null === u,
                    k = h.keys || this.pointArrayMap,
                    B = [],
                    x = {},
                    D = this.chart.mapTransforms;
                !t && n && (t = "string" === typeof n ? a.maps[n] : n);
                v && (u = "_i");
                u = this.joinBy = w(u);
                u[1] || (u[1] = u[0]);
                c && y(c, function (b, e) {
                    var d = 0;
                    if (p(b)) c[e] = {
                        value: b
                    };
                    else if (q(b)) {
                        c[e] = {};
                        !h.keys && b.length > k.length && "string" === typeof b[0] && (c[e]["hc-key"] = b[0], ++d);
                        for (var f = 0; f < k.length; ++f, ++d) k[f] &&
                            void 0 !== b[d] && (0 < k[f].indexOf(".") ? a.Point.prototype.setNestedProperty(c[e], b[d], k[f]) : c[e][k[f]] = b[d])
                    }
                    v && (c[e]._i = e)
                });
                this.getBox(c);
                (this.chart.mapTransforms = D = l && l.mapTransforms || t && t["hc-transform"] || D) && a.objectEach(D, function (a) {
                    a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation))
                });
                if (t) {
                    "FeatureCollection" === t.type && (this.mapTitle = t.title, t = a.geojson(t, this.type, this));
                    this.mapData = t;
                    this.mapMap = {};
                    for (D = 0; D < t.length; D++) l = t[D], n = l.properties, l._i = D, u[0] && n && n[u[0]] &&
                        (l[u[0]] = n[u[0]]), x[l[u[0]]] = l;
                    this.mapMap = x;
                    c && u[1] && y(c, function (a) {
                        x[a[u[1]]] && B.push(x[a[u[1]]])
                    });
                    h.allAreas ? (this.getBox(t), c = c || [], u[1] && y(c, function (a) {
                        B.push(a[u[1]])
                    }), B = "|" + d(B, function (a) {
                        return a && a[u[0]]
                    }).join("|") + "|", y(t, function (a) {
                        u[0] && -1 !== B.indexOf("|" + a[u[0]] + "|") || (c.push(m(a, {
                            value: null
                        })), f = !1)
                    })) : this.getBox(B)
                }
                g.prototype.setData.call(this, c, b, e, f)
            },
            drawGraph: v,
            drawDataLabels: v,
            doFullTranslate: function () {
                return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML ||
                    !this.baseTrans
            },
            translate: function () {
                var a = this,
                    b = a.xAxis,
                    e = a.yAxis,
                    d = a.doFullTranslate();
                a.generatePoints();
                y(a.data, function (c) {
                    c.plotX = b.toPixels(c._midX, !0);
                    c.plotY = e.toPixels(c._midY, !0);
                    d && (c.shapeType = "path", c.shapeArgs = {
                        d: a.translatePath(c.path)
                    })
                });
                a.translateColors()
            },
            pointAttribs: function (a, b) {
                b = h.column.prototype.pointAttribs.call(this, a, b);
                b["stroke-width"] = t(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit");
                return b
            },
            drawPoints: function () {
                var a =
                    this,
                    b = a.xAxis,
                    e = a.yAxis,
                    d = a.group,
                    f = a.chart,
                    g = f.renderer,
                    l, m, p, q, k = this.baseTrans,
                    w, t, v, B, r;
                a.transformGroup || (a.transformGroup = g.g().attr({
                    scaleX: 1,
                    scaleY: 1
                }).add(d), a.transformGroup.survive = !0);
                a.doFullTranslate() ? (f.hasRendered && y(a.points, function (b) {
                    b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill)
                }), a.group = a.transformGroup, h.column.prototype.drawPoints.apply(a), a.group = d, y(a.points, function (a) {
                    a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(/ /g, "-").toLowerCase()),
                        a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()))
                }), this.baseTrans = {
                    originX: b.min - b.minPixelPadding / b.transA,
                    originY: e.min - e.minPixelPadding / e.transA + (e.reversed ? 0 : e.len / e.transA),
                    transAX: b.transA,
                    transAY: e.transA
                }, this.transformGroup.animate({
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                })) : (l = b.transA / k.transAX, m = e.transA / k.transAY, p = b.toPixels(k.originX, !0), q = e.toPixels(k.originY, !0), .99 < l && 1.01 > l && .99 < m && 1.01 > m && (m = l = 1, p = Math.round(p),
                    q = Math.round(q)), w = this.transformGroup, f.renderer.globalAnimation ? (t = w.attr("translateX"), v = w.attr("translateY"), B = w.attr("scaleX"), r = w.attr("scaleY"), w.attr({
                    animator: 0
                }).animate({
                    animator: 1
                }, {
                    step: function (a, b) {
                        w.attr({
                            translateX: t + (p - t) * b.pos,
                            translateY: v + (q - v) * b.pos,
                            scaleX: B + (l - B) * b.pos,
                            scaleY: r + (m - r) * b.pos
                        })
                    }
                })) : w.attr({
                    translateX: p,
                    translateY: q,
                    scaleX: l,
                    scaleY: m
                }));
                d.element.setAttribute("stroke-width", (a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"] || 1) /
                    (l || 1));
                this.drawMapDataLabels()
            },
            drawMapDataLabels: function () {
                g.prototype.drawDataLabels.call(this);
                this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect)
            },
            render: function () {
                var a = this,
                    b = g.prototype.render;
                a.chart.renderer.isVML && 3E3 < a.data.length ? setTimeout(function () {
                    b.call(a)
                }) : b.call(a)
            },
            animate: function (a) {
                var b = this.options.animation,
                    c = this.group,
                    d = this.xAxis,
                    f = this.yAxis,
                    g = d.pos,
                    h = f.pos;
                this.chart.renderer.isSVG && (!0 === b && (b = {
                    duration: 1E3
                }), a ? c.attr({
                    translateX: g + d.len / 2,
                    translateY: h +
                        f.len / 2,
                    scaleX: .001,
                    scaleY: .001
                }) : (c.animate({
                    translateX: g,
                    translateY: h,
                    scaleX: 1,
                    scaleY: 1
                }, b), this.animate = null))
            },
            animateDrilldown: function (a) {
                var b = this.chart.plotBox,
                    c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    d = c.bBox,
                    f = this.chart.options.drilldown.animation;
                a || (a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = {
                    scaleX: a,
                    scaleY: a,
                    translateX: d.x,
                    translateY: d.y
                }, y(this.points, function (a) {
                    a.graphic && a.graphic.attr(c.shapeArgs).animate({
                        scaleX: 1,
                        scaleY: 1,
                        translateX: 0,
                        translateY: 0
                    }, f)
                }), this.animate = null)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            animateDrillupFrom: function (a) {
                h.column.prototype.animateDrillupFrom.call(this, a)
            },
            animateDrillupTo: function (a) {
                h.column.prototype.animateDrillupTo.call(this, a)
            }
        }), D({
            applyOptions: function (a, b) {
                a = l.prototype.applyOptions.call(this, a, b);
                b = this.series;
                var c = b.joinBy;
                b.mapData && ((c = void 0 !== a[c[1]] && b.mapMap[a[c[1]]]) ? (b.xyFromShape && (a.x = c._midX, a.y = c._midY), D(a, c)) : a.value = a.value || null);
                return a
            },
            onMouseOver: function (c) {
                a.clearTimeout(this.colorInterval);
                if (null !== this.value || this.series.options.nullInteraction) l.prototype.onMouseOver.call(this, c);
                else this.series.onMouseOut(c)
            },
            zoomTo: function () {
                var a = this.series;
                a.xAxis.setExtremes(this._minX, this._maxX, !1);
                a.yAxis.setExtremes(this._minY, this._maxY, !1);
                a.chart.redraw()
            }
        }, B))
    })(J);
    (function (a) {
        var B = a.seriesType,
            y = a.seriesTypes;
        B("mapline", "map", {
            lineWidth: 1,
            fillColor: "none"
        }, {
            type: "mapline",
            colorProp: "stroke",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function (a,
                p) {
                a = y.map.prototype.pointAttribs.call(this, a, p);
                a.fill = this.options.fillColor;
                return a
            },
            drawLegendSymbol: y.line.prototype.drawLegendSymbol
        })
    })(J);
    (function (a) {
        var B = a.merge,
            y = a.Point;
        a = a.seriesType;
        a("mappoint", "scatter", {
            dataLabels: {
                enabled: !0,
                formatter: function () {
                    return this.point.name
                },
                crop: !1,
                defer: !1,
                overflow: !1,
                style: {
                    color: "#000000"
                }
            }
        }, {
            type: "mappoint",
            forceDL: !0
        }, {
            applyOptions: function (a, p) {
                a = void 0 !== a.lat && void 0 !== a.lon ? B(a, this.series.chart.fromLatLonToPoint(a)) : a;
                return y.prototype.applyOptions.call(this,
                    a, p)
            }
        })
    })(J);
    (function (a) {
        var B = a.arrayMax,
            y = a.arrayMin,
            D = a.Axis,
            p = a.color,
            d = a.each,
            m = a.isNumber,
            v = a.noop,
            t = a.pick,
            q = a.pInt,
            l = a.Point,
            g = a.Series,
            f = a.seriesType,
            h = a.seriesTypes;
        f("bubble", "scatter", {
            dataLabels: {
                formatter: function () {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            animationLimit: 250,
            marker: {
                lineColor: null,
                lineWidth: 1,
                fillOpacity: .5,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            pointAttribs: function (a, c) {
                var b = this.options.marker.fillOpacity;
                a = g.prototype.pointAttribs.call(this, a, c);
                1 !== b && (a.fill = p(a.fill).setOpacity(b).get("rgba"));
                return a
            },
            getRadii: function (a, c, b, e) {
                var d, f, g, h = this.zData,
                    l = [],
                    p = this.options,
                    q = "width" !== p.sizeBy,
                    k = p.zThreshold,
                    w = c - a;
                f = 0;
                for (d = h.length; f <
                    d; f++) g = h[f], p.sizeByAbsoluteValue && null !== g && (g = Math.abs(g - k), c = w = Math.max(c - k, Math.abs(a - k)), a = 0), m(g) ? g < a ? g = b / 2 - 1 : (g = 0 < w ? (g - a) / w : .5, q && 0 <= g && (g = Math.sqrt(g)), g = Math.ceil(b + g * (e - b)) / 2) : g = null, l.push(g);
                this.radii = l
            },
            animate: function (a) {
                !a && this.points.length < this.options.animationLimit && (d(this.points, function (a) {
                    var b = a.graphic,
                        c;
                    b && b.width && (c = {
                        x: b.x,
                        y: b.y,
                        width: b.width,
                        height: b.height
                    }, b.attr({
                        x: a.plotX,
                        y: a.plotY,
                        width: 1,
                        height: 1
                    }), b.animate(c, this.options.animation))
                }, this), this.animate = null)
            },
            translate: function () {
                var d, c = this.data,
                    b, e, f = this.radii;
                h.scatter.prototype.translate.call(this);
                for (d = c.length; d--;) b = c[d], e = f ? f[d] : 0, m(e) && e >= this.minPxSize / 2 ? (b.marker = a.extend(b.marker, {
                    radius: e,
                    width: 2 * e,
                    height: 2 * e
                }), b.dlBox = {
                    x: b.plotX - e,
                    y: b.plotY - e,
                    width: 2 * e,
                    height: 2 * e
                }) : b.shapeArgs = b.plotY = b.dlBox = void 0
            },
            alignDataLabel: h.column.prototype.alignDataLabel,
            buildKDTree: v,
            applyZones: v
        }, {
            haloPath: function (a) {
                return l.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            },
            ttBelow: !1
        });
        D.prototype.beforePadding = function () {
            var f = this,
                c = this.len,
                b = this.chart,
                e = 0,
                g = c,
                h = this.isXAxis,
                l = h ? "xData" : "yData",
                p = this.min,
                v = {},
                u = Math.min(b.plotWidth, b.plotHeight),
                D = Number.MAX_VALUE,
                k = -Number.MAX_VALUE,
                E = this.max - p,
                x = c / E,
                J = [];
            d(this.series, function (c) {
                var e = c.options;
                !c.bubblePadding || !c.visible && b.options.chart.ignoreHiddenSeries || (f.allowZoomOutside = !0, J.push(c), h && (d(["minSize", "maxSize"], function (a) {
                        var b = e[a],
                            c = /%$/.test(b),
                            b = q(b);
                        v[a] = c ? u * b / 100 : b
                    }), c.minPxSize = v.minSize, c.maxPxSize =
                    Math.max(v.maxSize, v.minSize), c = a.grep(c.zData, a.isNumber), c.length && (D = t(e.zMin, Math.min(D, Math.max(y(c), !1 === e.displayNegative ? e.zThreshold : -Number.MAX_VALUE))), k = t(e.zMax, Math.max(k, B(c))))))
            });
            d(J, function (a) {
                var b = a[l],
                    c = b.length,
                    d;
                h && a.getRadii(D, k, a.minPxSize, a.maxPxSize);
                if (0 < E)
                    for (; c--;) m(b[c]) && f.dataMin <= b[c] && b[c] <= f.dataMax && (d = a.radii[c], e = Math.min((b[c] - p) * x - d, e), g = Math.max((b[c] - p) * x + d, g))
            });
            J.length && 0 < E && !this.isLog && (g -= c, x *= (c + e - g) / c, d([
                    ["min", "userMin", e],
                    ["max", "userMax", g]
                ],
                function (a) {
                    void 0 === t(f.options[a[0]], f[a[1]]) && (f[a[0]] += a[2] / x)
                }))
        }
    })(J);
    (function (a) {
        var B = a.merge,
            y = a.Point,
            D = a.seriesType,
            p = a.seriesTypes;
        p.bubble && D("mapbubble", "bubble", {
            animationLimit: 500,
            tooltip: {
                pointFormat: "{point.name}: {point.z}"
            }
        }, {
            xyFromShape: !0,
            type: "mapbubble",
            pointArrayMap: ["z"],
            getMapData: p.map.prototype.getMapData,
            getBox: p.map.prototype.getBox,
            setData: p.map.prototype.setData
        }, {
            applyOptions: function (a, m) {
                return a && void 0 !== a.lat && void 0 !== a.lon ? y.prototype.applyOptions.call(this,
                    B(a, this.series.chart.fromLatLonToPoint(a)), m) : p.map.prototype.pointClass.prototype.applyOptions.call(this, a, m)
            },
            isValid: function () {
                return "number" === typeof this.z
            },
            ttBelow: !1
        })
    })(J);
    (function (a) {
        var B = a.colorPointMixin,
            y = a.each,
            D = a.merge,
            p = a.noop,
            d = a.pick,
            m = a.Series,
            v = a.seriesType,
            t = a.seriesTypes;
        v("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function () {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: null,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}\x3cbr/\x3e"
            },
            states: {
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, D(a.colorSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function () {
                var a;
                t.scatter.prototype.init.apply(this, arguments);
                a = this.options;
                a.pointRange = d(a.pointRange, a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1
            },
            translate: function () {
                var a = this.options,
                    l = this.xAxis,
                    g = this.yAxis,
                    f = a.pointPadding || 0,
                    h = function (a,
                        c, b) {
                        return Math.min(Math.max(c, a), b)
                    };
                this.generatePoints();
                y(this.points, function (m) {
                    var c = (a.colsize || 1) / 2,
                        b = (a.rowsize || 1) / 2,
                        e = h(Math.round(l.len - l.translate(m.x - c, 0, 1, 0, 1)), -l.len, 2 * l.len),
                        c = h(Math.round(l.len - l.translate(m.x + c, 0, 1, 0, 1)), -l.len, 2 * l.len),
                        n = h(Math.round(g.translate(m.y - b, 0, 1, 0, 1)), -g.len, 2 * g.len),
                        b = h(Math.round(g.translate(m.y + b, 0, 1, 0, 1)), -g.len, 2 * g.len),
                        p = d(m.pointPadding, f);
                    m.plotX = m.clientX = (e + c) / 2;
                    m.plotY = (n + b) / 2;
                    m.shapeType = "rect";
                    m.shapeArgs = {
                        x: Math.min(e, c) + p,
                        y: Math.min(n,
                            b) + p,
                        width: Math.abs(c - e) - 2 * p,
                        height: Math.abs(b - n) - 2 * p
                    }
                });
                this.translateColors()
            },
            drawPoints: function () {
                t.column.prototype.drawPoints.call(this);
                y(this.points, function (a) {
                    a.graphic.attr(this.colorAttribs(a))
                }, this)
            },
            animate: p,
            getBox: p,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            alignDataLabel: t.column.prototype.alignDataLabel,
            getExtremes: function () {
                m.prototype.getExtremes.call(this, this.valueData);
                this.valueMin = this.dataMin;
                this.valueMax = this.dataMax;
                m.prototype.getExtremes.call(this)
            }
        }), a.extend({
            haloPath: function (a) {
                if (!a) return [];
                var d = this.shapeArgs;
                return ["M", d.x - a, d.y - a, "L", d.x - a, d.y + d.height + a, d.x + d.width + a, d.y + d.height + a, d.x + d.width + a, d.y - a, "Z"]
            }
        }, B))
    })(J);
    (function (a) {
        function B(a, d) {
            var g, f, h, l = !1,
                c = a.x,
                b = a.y;
            a = 0;
            for (g = d.length - 1; a < d.length; g = a++) f = d[a][1] > b, h = d[g][1] > b, f !== h && c < (d[g][0] - d[a][0]) * (b - d[a][1]) / (d[g][1] - d[a][1]) + d[a][0] && (l = !l);
            return l
        }
        var y = a.Chart,
            D = a.each,
            p = a.extend,
            d = a.format,
            m = a.merge,
            v = a.win,
            t = a.wrap;
        y.prototype.transformFromLatLon = function (d, l) {
            if (void 0 === v.proj4) return a.error(21), {
                x: 0,
                y: null
            };
            d = v.proj4(l.crs, [d.lon, d.lat]);
            var g = l.cosAngle || l.rotation && Math.cos(l.rotation),
                f = l.sinAngle || l.rotation && Math.sin(l.rotation);
            d = l.rotation ? [d[0] * g + d[1] * f, -d[0] * f + d[1] * g] : d;
            return {
                x: ((d[0] - (l.xoffset || 0)) * (l.scale || 1) + (l.xpan || 0)) * (l.jsonres || 1) + (l.jsonmarginX || 0),
                y: (((l.yoffset || 0) - d[1]) * (l.scale || 1) + (l.ypan || 0)) * (l.jsonres || 1) - (l.jsonmarginY || 0)
            }
        };
        y.prototype.transformToLatLon = function (d, l) {
            if (void 0 === v.proj4) a.error(21);
            else {
                d = {
                    x: ((d.x - (l.jsonmarginX || 0)) / (l.jsonres || 1) - (l.xpan || 0)) / (l.scale ||
                        1) + (l.xoffset || 0),
                    y: ((-d.y - (l.jsonmarginY || 0)) / (l.jsonres || 1) + (l.ypan || 0)) / (l.scale || 1) + (l.yoffset || 0)
                };
                var g = l.cosAngle || l.rotation && Math.cos(l.rotation),
                    f = l.sinAngle || l.rotation && Math.sin(l.rotation);
                l = v.proj4(l.crs, "WGS84", l.rotation ? {
                    x: d.x * g + d.y * -f,
                    y: d.x * f + d.y * g
                } : d);
                return {
                    lat: l.y,
                    lon: l.x
                }
            }
        };
        y.prototype.fromPointToLatLon = function (d) {
            var l = this.mapTransforms,
                g;
            if (l) {
                for (g in l)
                    if (l.hasOwnProperty(g) && l[g].hitZone && B({
                            x: d.x,
                            y: -d.y
                        }, l[g].hitZone.coordinates[0])) return this.transformToLatLon(d, l[g]);
                return this.transformToLatLon(d, l["default"])
            }
            a.error(22)
        };
        y.prototype.fromLatLonToPoint = function (d) {
            var l = this.mapTransforms,
                g, f;
            if (!l) return a.error(22), {
                x: 0,
                y: null
            };
            for (g in l)
                if (l.hasOwnProperty(g) && l[g].hitZone && (f = this.transformFromLatLon(d, l[g]), B({
                        x: f.x,
                        y: -f.y
                    }, l[g].hitZone.coordinates[0]))) return f;
            return this.transformFromLatLon(d, l["default"])
        };
        a.geojson = function (a, l, g) {
            var f = [],
                h = [],
                m = function (a) {
                    var b, c = a.length;
                    h.push("M");
                    for (b = 0; b < c; b++) 1 === b && h.push("L"), h.push(a[b][0], -a[b][1])
                };
            l = l || "map";
            D(a.features, function (a) {
                var b = a.geometry,
                    c = b.type,
                    b = b.coordinates;
                a = a.properties;
                var d;
                h = [];
                "map" === l || "mapbubble" === l ? ("Polygon" === c ? (D(b, m), h.push("Z")) : "MultiPolygon" === c && (D(b, function (a) {
                    D(a, m)
                }), h.push("Z")), h.length && (d = {
                    path: h
                })) : "mapline" === l ? ("LineString" === c ? m(b) : "MultiLineString" === c && D(b, m), h.length && (d = {
                    path: h
                })) : "mappoint" === l && "Point" === c && (d = {
                    x: b[0],
                    y: -b[1]
                });
                d && f.push(p(d, {
                    name: a.name || a.NAME,
                    properties: a
                }))
            });
            g && a.copyrightShort && (g.chart.mapCredits = d(g.chart.options.credits.mapText, {
                geojson: a
            }), g.chart.mapCreditsFull = d(g.chart.options.credits.mapTextFull, {
                geojson: a
            }));
            return f
        };
        t(y.prototype, "addCredits", function (a, d) {
            d = m(!0, this.options.credits, d);
            this.mapCredits && (d.href = null);
            a.call(this, d);
            this.credits && this.mapCreditsFull && this.credits.attr({
                title: this.mapCreditsFull
            })
        })
    })(J);
    (function (a) {
        function B(a, d, h, l, c, b, e, m) {
            return ["M", a + c, d, "L", a + h - b, d, "C", a + h - b / 2, d, a + h, d + b / 2, a + h, d + b, "L", a + h, d + l - e, "C", a + h, d + l - e / 2, a + h - e / 2, d + l, a + h - e, d + l, "L", a + m, d + l, "C", a + m / 2, d + l, a, d + l - m / 2, a, d + l -
                m, "L", a, d + c, "C", a, d + c / 2, a + c / 2, d, a + c, d, "Z"
            ]
        }
        var y = a.Chart,
            D = a.defaultOptions,
            p = a.each,
            d = a.extend,
            m = a.merge,
            v = a.pick,
            t = a.Renderer,
            q = a.SVGRenderer,
            l = a.VMLRenderer;
        d(D.lang, {
            zoomIn: "Zoom in",
            zoomOut: "Zoom out"
        });
        D.mapNavigation = {
            buttonOptions: {
                alignTo: "plotBox",
                align: "left",
                verticalAlign: "top",
                x: 0,
                width: 18,
                height: 18,
                padding: 5,
                style: {
                    fontSize: "15px",
                    fontWeight: "bold"
                },
                theme: {
                    "stroke-width": 1,
                    "text-align": "center"
                }
            },
            buttons: {
                zoomIn: {
                    onclick: function () {
                        this.mapZoom(.5)
                    },
                    text: "+",
                    y: 0
                },
                zoomOut: {
                    onclick: function () {
                        this.mapZoom(2)
                    },
                    text: "-",
                    y: 28
                }
            },
            mouseWheelSensitivity: 1.1
        };
        a.splitPath = function (a) {
            var d;
            a = a.replace(/([A-Za-z])/g, " $1 ");
            a = a.replace(/^\s*/, "").replace(/\s*$/, "");
            a = a.split(/[ ,]+/);
            for (d = 0; d < a.length; d++) /[a-zA-Z]/.test(a[d]) || (a[d] = parseFloat(a[d]));
            return a
        };
        a.maps = {};
        q.prototype.symbols.topbutton = function (a, d, h, l, c) {
            return B(a - 1, d - 1, h, l, c.r, c.r, 0, 0)
        };
        q.prototype.symbols.bottombutton = function (a, d, h, l, c) {
            return B(a - 1, d - 1, h, l, 0, 0, c.r, c.r)
        };
        t === l && p(["topbutton", "bottombutton"], function (a) {
            l.prototype.symbols[a] =
                q.prototype.symbols[a]
        });
        a.Map = a.mapChart = function (d, f, h) {
            var g = "string" === typeof d || d.nodeName,
                c = arguments[g ? 1 : 0],
                b = {
                    endOnTick: !1,
                    visible: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    startOnTick: !1
                },
                e, l = a.getOptions().credits;
            e = c.series;
            c.series = null;
            c = m({
                    chart: {
                        panning: "xy",
                        type: "map"
                    },
                    credits: {
                        mapText: v(l.mapText, ' \u00a9 \x3ca href\x3d"{geojson.copyrightUrl}"\x3e{geojson.copyrightShort}\x3c/a\x3e'),
                        mapTextFull: v(l.mapTextFull, "{geojson.copyright}")
                    },
                    tooltip: {
                        followTouchMove: !1
                    },
                    xAxis: b,
                    yAxis: m(b, {
                        reversed: !0
                    })
                },
                c, {
                    chart: {
                        inverted: !1,
                        alignTicks: !1
                    }
                });
            c.series = e;
            return g ? new y(d, c, h) : new y(c, f)
        }
    })(J);
    return J
});