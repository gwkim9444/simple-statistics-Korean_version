
function t(t) {
    if (0 === t.length) return 0;
    for (var r, e = t[0], n = 0, o = 1; o < t.length; o++) r = e + t[o], Math.abs(e) >= Math.abs(t[o]) ? n += e - r + t[o] : n += t[o] - r + e, e = r;
    return e + n
}
//평균
function r(r) {
    if (0 === r.length) throw new Error("mean requires at least one data point");
    return t(r) / r.length
}
//편차 n승의 합
function e(t, e) {
    var n, o, a = r(t),
        i = 0;
    if (2 === e)
        for (o = 0; o < t.length; o++) i += (n = t[o] - a) * n;
    else
        for (o = 0; o < t.length; o++) i += Math.pow(t[o] - a, e);
    return i
}
//분산
function n(t) {
    if (0 === t.length) throw new Error("variance requires at least one data point");
    //  편차 제곱의 합 / 모집단
    return e(t, 2) / t.length
}
//표준편차
function o(t) {
    if (1 === t.length) return 0;
    var r = n(t);
    return Math.sqrt(r)
}
//최빈값
function a(t) {
    if (0 === t.length) throw new Error("mode requires at least one data point");
    if (1 === t.length) return t[0];
    for (var r = t[0], e = NaN, n = 0, o = 1, a = 1; a < t.length + 1; a++) t[a] !== r ? (o > n && (n = o, e = r), o = 1, r = t[a]) : o++;
    return e
}
//정수 또는 소수 정렬
function i(t) {
    return t.slice().sort(function (t, r) {
        return t - r
    })
}
//최소값
function s(t) {
    if (0 === t.length) throw new Error("min requires at least one data point");
    for (var r = t[0], e = 1; e < t.length; e++) t[e] < r && (r = t[e]);
    return r
}
//최대값
function u(t) {
    if (0 === t.length) throw new Error("max requires at least one data point");
    for (var r = t[0], e = 1; e < t.length; e++) t[e] > r && (r = t[e]);
    return r
}

function h(t, r) {
    var e = t.length * r;
    if (0 === t.length) throw new Error("quantile requires at least one data point.");
    if (r < 0 || r > 1) throw new Error("quantiles must be between 0 and 1");
    return 1 === r ? t[t.length - 1] : 0 === r ? t[0] : e % 1 != 0 ? t[Math.ceil(e) - 1] : t.length % 2 == 0 ? (t[e - 1] + t[e]) / 2 : t[e]
}

function f(t, r, e, n) {
    for (e = e || 0, n = n || t.length - 1; n > e;) {
        if (n - e > 600) {
            var o = n - e + 1,
                a = r - e + 1,
                i = Math.log(o),
                s = .5 * Math.exp(2 * i / 3),
                u = .5 * Math.sqrt(i * s * (o - s) / o);
            a - o / 2 < 0 && (u *= -1), f(t, r, Math.max(e, Math.floor(r - a * s / o + u)), Math.min(n, Math.floor(r + (o - a) * s / o + u)))
        }
        var h = t[r],
            p = e,
            c = n;
        for (l(t, e, r), t[n] > h && l(t, e, n); p < c;) {
            for (l(t, p, c), p++, c--; t[p] < h;) p++;
            for (; t[c] > h;) c--
        }
        t[e] === h ? l(t, e, c) : l(t, ++c, n), c <= r && (e = c + 1), r <= c && (n = c - 1)
    }
}

function l(t, r, e) {
    var n = t[r];
    t[r] = t[e], t[e] = n
}

function p(t, r) {
    var e = t.slice();
    if (Array.isArray(r)) {
        !function (t, r) {
            for (var e = [0], n = 0; n < r.length; n++) e.push(v(t.length, r[n]));
            e.push(t.length - 1), e.sort(g);
            for (var o = [0, e.length - 1]; o.length;) {
                var a = Math.ceil(o.pop()),
                    i = Math.floor(o.pop());
                if (!(a - i <= 1)) {
                    var s = Math.floor((i + a) / 2);
                    c(t, e[s], Math.floor(e[i]), Math.ceil(e[a])), o.push(i, s, s, a)
                }
            }
        }(e, r);
        for (var n = [], o = 0; o < r.length; o++) n[o] = h(e, r[o]);
        return n
    }
    return c(e, v(e.length, r), 0, e.length - 1), h(e, r)
}

function c(t, r, e, n) {
    r % 1 == 0 ? f(t, r, e, n) : (f(t, r = Math.floor(r), e, n), f(t, r + 1, r + 1, n))
}

function g(t, r) {
    return t - r
}

function v(t, r) {
    var e = t * r;
    return 1 === r ? t - 1 : 0 === r ? 0 : e % 1 != 0 ? Math.ceil(e) - 1 : t % 2 == 0 ? e - .5 : e
}

function w(t, r) {
    if (r < t[0]) return 0;
    if (r > t[t.length - 1]) return 1;
    var e = function (t, r) {
        for (var e = 0, n = 0, o = t.length; n < o;) r <= t[e = n + o >>> 1] ? o = e : n = -~e;
        return n
    }(t, r);
    if (t[e] !== r) return e / t.length;
    e++;
    var n = function (t, r) {
        for (var e = 0, n = 0, o = t.length; n < o;) r >= t[e = n + o >>> 1] ? n = -~e : o = e;
        return n
    }(t, r);
    if (n === e) return e / t.length;
    var o = n - e + 1;
    return o * (n + e) / 2 / o / t.length
}

function M(t) {
    var r = p(t, .75),
        e = p(t, .25);
    if ("number" == typeof r && "number" == typeof e) return r - e
}

function x(t) {
    return +p(t, .5)
}

function m(t) {
    for (var r = x(t), e = [], n = 0; n < t.length; n++) e.push(Math.abs(t[n] - r));
    return x(e)
}

function d(t, r) {
    r = r || Math.random;
    for (var e, n, o = t.length; o > 0;) n = Math.floor(r() * o--), e = t[o], t[o] = t[n], t[n] = e;
    return t
}

function b(t, r) {
    return d(t.slice().slice(), r)
}

function q(t) {
    for (var r, e = 0, n = 0; n < t.length; n++) 0 !== n && t[n] === r || (r = t[n], e++);
    return e
}

function E(t, r) {
    for (var e = [], n = 0; n < t; n++) {
        for (var o = [], a = 0; a < r; a++) o.push(0);
        e.push(o)
    }
    return e
}

function y(t, r, e, n) {
    var o;
    if (t > 0) {
        var a = (e[r] - e[t - 1]) / (r - t + 1);
        o = n[r] - n[t - 1] - (r - t + 1) * a * a
    } else o = n[r] - e[r] * e[r] / (r + 1);
    return o < 0 ? 0 : o
}

function S(t, r, e, n, o, a, i) {
    if (!(t > r)) {
        var s = Math.floor((t + r) / 2);
        n[e][s] = n[e - 1][s - 1], o[e][s] = s;
        var u = e;
        t > e && (u = Math.max(u, o[e][t - 1] || 0)), u = Math.max(u, o[e - 1][s] || 0);
        var h, f, l, p = s - 1;
        r < n.length - 1 && (p = Math.min(p, o[e][r + 1] || 0));
        for (var c = p; c >= u && !((h = y(c, s, a, i)) + n[e - 1][u - 1] >= n[e][s]); --c) (f = y(u, s, a, i) + n[e - 1][u - 1]) < n[e][s] && (n[e][s] = f, o[e][s] = u), u++, (l = h + n[e - 1][c - 1]) < n[e][s] && (n[e][s] = l, o[e][s] = c);
        S(t, s - 1, e, n, o, a, i), S(s + 1, r, e, n, o, a, i)
    }
}

function k(t, e) {
    if (t.length !== e.length) throw new Error("sampleCovariance requires samples with equal lengths");
    if (t.length < 2) throw new Error("sampleCovariance requires at least two data points in each sample");
    for (var n = r(t), o = r(e), a = 0, i = 0; i < t.length; i++) a += (t[i] - n) * (e[i] - o);
    return a / (t.length - 1)
}

function I(t) {
    if (t.length < 2) throw new Error("sampleVariance requires at least two data points");
    return e(t, 2) / (t.length - 1)
}

function P(t) {
    var r = I(t);
    return Math.sqrt(r)
}

function D(t, r, e, n) {
    return (t * r + e * n) / (r + n)
}

function C(t) {
    if (0 === t.length) throw new Error("rootMeanSquare requires at least one data point");
    for (var r = 0, e = 0; e < t.length; e++) r += Math.pow(t[e], 2);
    return Math.sqrt(r / t.length)
}

var T = function () {
    this.totalCount = 0, this.data = {}
};

T.prototype.train = function (t, r) {
    for (var e in this.data[r] || (this.data[r] = {}), t) {
        var n = t[e];
        void 0 === this.data[r][e] && (this.data[r][e] = {}), void 0 === this.data[r][e][n] && (this.data[r][e][n] = 0), this.data[r][e][n]++
    }
    this.totalCount++
}, T.prototype.score = function (t) {
    var r, e = {};
    for (var n in t) {
        var o = t[n];
        for (r in this.data) e[r] = {}, e[r][n + "_" + o] = this.data[r][n] ? (this.data[r][n][o] || 0) / this.totalCount : 0
    }
    var a = {};
    for (r in e)
        for (var i in a[r] = 0, e[r]) a[r] += e[r][i];
    return a
};

var N = function () {
    this.weights = [], this.bias = 0
};

function R(t) {
    if (t < 0) throw new Error("factorial requires a non-negative value");
    if (Math.floor(t) !== t) throw new Error("factorial requires an integer input");
    for (var r = 1, e = 2; e <= t; e++) r *= e;
    return r
}

N.prototype.predict = function (t) {
    if (t.length !== this.weights.length) return null;
    for (var r = 0, e = 0; e < this.weights.length; e++) r += this.weights[e] * t[e];
    return (r += this.bias) > 0 ? 1 : 0
}, N.prototype.train = function (t, r) {
    if (0 !== r && 1 !== r) return null;
    t.length !== this.weights.length && (this.weights = t, this.bias = 1);
    var e = this.predict(t);
    if ("number" == typeof e && e !== r) {
        for (var n = r - e, o = 0; o < this.weights.length; o++) this.weights[o] += n * t[o];
        this.bias += n
    }
    return this
};

var F = [.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22],
    A = Math.log(Math.sqrt(2 * Math.PI)),
    _ = {
        1: {
            .995: 0,
            .99: 0,
            .975: 0,
            .95: 0,
            .9: .02,
            .5: .45,
            .1: 2.71,
            .05: 3.84,
            .025: 5.02,
            .01: 6.63,
            .005: 7.88
        },
        2: {
            .995: .01,
            .99: .02,
            .975: .05,
            .95: .1,
            .9: .21,
            .5: 1.39,
            .1: 4.61,
            .05: 5.99,
            .025: 7.38,
            .01: 9.21,
            .005: 10.6
        },
        3: {
            .995: .07,
            .99: .11,
            .975: .22,
            .95: .35,
            .9: .58,
            .5: 2.37,
            .1: 6.25,
            .05: 7.81,
            .025: 9.35,
            .01: 11.34,
            .005: 12.84
        },
        4: {
            .995: .21,
            .99: .3,
            .975: .48,
            .95: .71,
            .9: 1.06,
            .5: 3.36,
            .1: 7.78,
            .05: 9.49,
            .025: 11.14,
            .01: 13.28,
            .005: 14.86
        },
        5: {
            .995: .41,
            .99: .55,
            .975: .83,
            .95: 1.15,
            .9: 1.61,
            .5: 4.35,
            .1: 9.24,
            .05: 11.07,
            .025: 12.83,
            .01: 15.09,
            .005: 16.75
        },
        6: {
            .995: .68,
            .99: .87,
            .975: 1.24,
            .95: 1.64,
            .9: 2.2,
            .5: 5.35,
            .1: 10.65,
            .05: 12.59,
            .025: 14.45,
            .01: 16.81,
            .005: 18.55
        },
        7: {
            .995: .99,
            .99: 1.25,
            .975: 1.69,
            .95: 2.17,
            .9: 2.83,
            .5: 6.35,
            .1: 12.02,
            .05: 14.07,
            .025: 16.01,
            .01: 18.48,
            .005: 20.28
        },
        8: {
            .995: 1.34,
            .99: 1.65,
            .975: 2.18,
            .95: 2.73,
            .9: 3.49,
            .5: 7.34,
            .1: 13.36,
            .05: 15.51,
            .025: 17.53,
            .01: 20.09,
            .005: 21.96
        },
        9: {
            .995: 1.73,
            .99: 2.09,
            .975: 2.7,
            .95: 3.33,
            .9: 4.17,
            .5: 8.34,
            .1: 14.68,
            .05: 16.92,
            .025: 19.02,
            .01: 21.67,
            .005: 23.59
        },
        10: {
            .995: 2.16,
            .99: 2.56,
            .975: 3.25,
            .95: 3.94,
            .9: 4.87,
            .5: 9.34,
            .1: 15.99,
            .05: 18.31,
            .025: 20.48,
            .01: 23.21,
            .005: 25.19
        },
        11: {
            .995: 2.6,
            .99: 3.05,
            .975: 3.82,
            .95: 4.57,
            .9: 5.58,
            .5: 10.34,
            .1: 17.28,
            .05: 19.68,
            .025: 21.92,
            .01: 24.72,
            .005: 26.76
        },
        12: {
            .995: 3.07,
            .99: 3.57,
            .975: 4.4,
            .95: 5.23,
            .9: 6.3,
            .5: 11.34,
            .1: 18.55,
            .05: 21.03,
            .025: 23.34,
            .01: 26.22,
            .005: 28.3
        },
        13: {
            .995: 3.57,
            .99: 4.11,
            .975: 5.01,
            .95: 5.89,
            .9: 7.04,
            .5: 12.34,
            .1: 19.81,
            .05: 22.36,
            .025: 24.74,
            .01: 27.69,
            .005: 29.82
        },
        14: {
            .995: 4.07,
            .99: 4.66,
            .975: 5.63,
            .95: 6.57,
            .9: 7.79,
            .5: 13.34,
            .1: 21.06,
            .05: 23.68,
            .025: 26.12,
            .01: 29.14,
            .005: 31.32
        },
        15: {
            .995: 4.6,
            .99: 5.23,
            .975: 6.27,
            .95: 7.26,
            .9: 8.55,
            .5: 14.34,
            .1: 22.31,
            .05: 25,
            .025: 27.49,
            .01: 30.58,
            .005: 32.8
        },
        16: {
            .995: 5.14,
            .99: 5.81,
            .975: 6.91,
            .95: 7.96,
            .9: 9.31,
            .5: 15.34,
            .1: 23.54,
            .05: 26.3,
            .025: 28.85,
            .01: 32,
            .005: 34.27
        },
        17: {
            .995: 5.7,
            .99: 6.41,
            .975: 7.56,
            .95: 8.67,
            .9: 10.09,
            .5: 16.34,
            .1: 24.77,
            .05: 27.59,
            .025: 30.19,
            .01: 33.41,
            .005: 35.72
        },
        18: {
            .995: 6.26,
            .99: 7.01,
            .975: 8.23,
            .95: 9.39,
            .9: 10.87,
            .5: 17.34,
            .1: 25.99,
            .05: 28.87,
            .025: 31.53,
            .01: 34.81,
            .005: 37.16
        },
        19: {
            .995: 6.84,
            .99: 7.63,
            .975: 8.91,
            .95: 10.12,
            .9: 11.65,
            .5: 18.34,
            .1: 27.2,
            .05: 30.14,
            .025: 32.85,
            .01: 36.19,
            .005: 38.58
        },
        20: {
            .995: 7.43,
            .99: 8.26,
            .975: 9.59,
            .95: 10.85,
            .9: 12.44,
            .5: 19.34,
            .1: 28.41,
            .05: 31.41,
            .025: 34.17,
            .01: 37.57,
            .005: 40
        },
        21: {
            .995: 8.03,
            .99: 8.9,
            .975: 10.28,
            .95: 11.59,
            .9: 13.24,
            .5: 20.34,
            .1: 29.62,
            .05: 32.67,
            .025: 35.48,
            .01: 38.93,
            .005: 41.4
        },
        22: {
            .995: 8.64,
            .99: 9.54,
            .975: 10.98,
            .95: 12.34,
            .9: 14.04,
            .5: 21.34,
            .1: 30.81,
            .05: 33.92,
            .025: 36.78,
            .01: 40.29,
            .005: 42.8
        },
        23: {
            .995: 9.26,
            .99: 10.2,
            .975: 11.69,
            .95: 13.09,
            .9: 14.85,
            .5: 22.34,
            .1: 32.01,
            .05: 35.17,
            .025: 38.08,
            .01: 41.64,
            .005: 44.18
        },
        24: {
            .995: 9.89,
            .99: 10.86,
            .975: 12.4,
            .95: 13.85,
            .9: 15.66,
            .5: 23.34,
            .1: 33.2,
            .05: 36.42,
            .025: 39.36,
            .01: 42.98,
            .005: 45.56
        },
        25: {
            .995: 10.52,
            .99: 11.52,
            .975: 13.12,
            .95: 14.61,
            .9: 16.47,
            .5: 24.34,
            .1: 34.28,
            .05: 37.65,
            .025: 40.65,
            .01: 44.31,
            .005: 46.93
        },
        26: {
            .995: 11.16,
            .99: 12.2,
            .975: 13.84,
            .95: 15.38,
            .9: 17.29,
            .5: 25.34,
            .1: 35.56,
            .05: 38.89,
            .025: 41.92,
            .01: 45.64,
            .005: 48.29
        },
        27: {
            .995: 11.81,
            .99: 12.88,
            .975: 14.57,
            .95: 16.15,
            .9: 18.11,
            .5: 26.34,
            .1: 36.74,
            .05: 40.11,
            .025: 43.19,
            .01: 46.96,
            .005: 49.65
        },
        28: {
            .995: 12.46,
            .99: 13.57,
            .975: 15.31,
            .95: 16.93,
            .9: 18.94,
            .5: 27.34,
            .1: 37.92,
            .05: 41.34,
            .025: 44.46,
            .01: 48.28,
            .005: 50.99
        },
        29: {
            .995: 13.12,
            .99: 14.26,
            .975: 16.05,
            .95: 17.71,
            .9: 19.77,
            .5: 28.34,
            .1: 39.09,
            .05: 42.56,
            .025: 45.72,
            .01: 49.59,
            .005: 52.34
        },
        30: {
            .995: 13.79,
            .99: 14.95,
            .975: 16.79,
            .95: 18.49,
            .9: 20.6,
            .5: 29.34,
            .1: 40.26,
            .05: 43.77,
            .025: 46.98,
            .01: 50.89,
            .005: 53.67
        },
        40: {
            .995: 20.71,
            .99: 22.16,
            .975: 24.43,
            .95: 26.51,
            .9: 29.05,
            .5: 39.34,
            .1: 51.81,
            .05: 55.76,
            .025: 59.34,
            .01: 63.69,
            .005: 66.77
        },
        50: {
            .995: 27.99,
            .99: 29.71,
            .975: 32.36,
            .95: 34.76,
            .9: 37.69,
            .5: 49.33,
            .1: 63.17,
            .05: 67.5,
            .025: 71.42,
            .01: 76.15,
            .005: 79.49
        },
        60: {
            .995: 35.53,
            .99: 37.48,
            .975: 40.48,
            .95: 43.19,
            .9: 46.46,
            .5: 59.33,
            .1: 74.4,
            .05: 79.08,
            .025: 83.3,
            .01: 88.38,
            .005: 91.95
        },
        70: {
            .995: 43.28,
            .99: 45.44,
            .975: 48.76,
            .95: 51.74,
            .9: 55.33,
            .5: 69.33,
            .1: 85.53,
            .05: 90.53,
            .025: 95.02,
            .01: 100.42,
            .005: 104.22
        },
        80: {
            .995: 51.17,
            .99: 53.54,
            .975: 57.15,
            .95: 60.39,
            .9: 64.28,
            .5: 79.33,
            .1: 96.58,
            .05: 101.88,
            .025: 106.63,
            .01: 112.33,
            .005: 116.32
        },
        90: {
            .995: 59.2,
            .99: 61.75,
            .975: 65.65,
            .95: 69.13,
            .9: 73.29,
            .5: 89.33,
            .1: 107.57,
            .05: 113.14,
            .025: 118.14,
            .01: 124.12,
            .005: 128.3
        },
        100: {
            .995: 67.33,
            .99: 70.06,
            .975: 74.22,
            .95: 77.93,
            .9: 82.36,
            .5: 99.33,
            .1: 118.5,
            .05: 124.34,
            .025: 129.56,
            .01: 135.81,
            .005: 140.17
        }
    },
    z = Math.sqrt(2 * Math.PI),
    V = {
        //가우시안 오차함수
        gaussian: function (t) {
            return Math.exp(-.5 * t * t) / z
        }
    },
    B = {
        nrd: function (t) {
            var r = P(t),
                e = M(t);
            return "number" == typeof e && (r = Math.min(r, e / 1.34)) , 1.06 * r * Math.pow(t.length, -.2)
        }
    };

function K(t, r, e) {
    var n, o;
    if (void 0 === r) n = V.gaussian;
    else if ("string" == typeof r) {
        if (!V[r]) throw new Error('Unknown kernel "' + r + '"');
        n = V[r]
    } else n = r;
    if (void 0 === e) o = B.nrd(t);
    else if ("string" == typeof e) {
        if (!B[e]) throw new Error('Unknown bandwidth method "' + e + '"');
        o = B[e](t)
    } else o = e;
    return function (r) {
        var e = 0,
            a = 0;
        for (e = 0; e < t.length; e++) a += n((r - t[e]) / o);
        return a / o / t.length
    }
}

var U = Math.sqrt(2 * Math.PI);

function G(t) {
    for (var r = t, e = t, n = 1; n < 15; n++) r += e *= t * t / (2 * n + 1);
    return Math.round(1e4 * (.5 + r / U * Math.exp(-t * t / 2))) / 1e4
}

for (var H = [], L = 0; L <= 3.09; L += .01) H.push(G(L));

function O(t) {
    var r = 1 / (1 + .5 * Math.abs(t)),
        e = r * Math.exp(-t * t + ((((((((.17087277 * r - .82215223) * r + 1.48851587) * r - 1.13520398) * r + .27886807) * r - .18628806) * r + .09678418) * r + .37409196) * r + 1.00002368) * r - 1.26551223);
    return t >= 0 ? 1 - e : e - 1
}

function W(t) {
    var r = 8 * (Math.PI - 3) / (3 * Math.PI * (4 - Math.PI)),
        e = Math.sqrt(Math.sqrt(Math.pow(2 / (Math.PI * r) + Math.log(1 - t * t) / 2, 2) - Math.log(1 - t * t) / r) - (2 / (Math.PI * r) + Math.log(1 - t * t) / 2));
    return t >= 0 ? e : -e
}

function j(t) {
    if ("number" == typeof t) return t < 0 ? -1 : 0 === t ? 0 : 1;
    throw new TypeError("not a number")}
    //선형 회귀분석
    exports.linearRegression = function (t) {
    var r, e, n = t.length;
    if (1 === n) r = 0, e = t[0][1];
    else {
        for (var o, a, i, s = 0, u = 0, h = 0, f = 0, l = 0; l < n; l++) s += a = (o = t[l])[0], u += i = o[1], h += a * a, f += a * i;
        e = u / n - (r = (n * f - s * u) / (n * h - s * s)) * s / n
    }
    return {
        m: r,
        b: e
    }
},
    // Y = ax + b (회귀식 추정)
    exports.linearRegressionLine = function (t) {
        return function (r) {
            return t.b + t.m * r
        }
    },
    //표준편차
    exports.standardDeviation = o,

    exports.rSquared = function (t, r) {
    if (t.length < 2) return 1;
    for (var e = 0, n = 0; n < t.length; n++) e += t[n][1];
    for (var o = e / t.length, a = 0, i = 0; i < t.length; i++) a += Math.pow(o - t[i][1], 2);
    for (var s = 0, u = 0; u < t.length; u++) s += Math.pow(t[u][1] - r(t[u][0]), 2);
    return 1 - s / a
},

    exports.mode = function (t) {
    return a(i(t))
},

    exports.modeFast = function (t) {
    for (var r, e = new Map, n = 0, o = 0; o < t.length; o++) {
        var a = e.get(t[o]);
        void 0 === a ? a = 1 : a++, a > n && (r = t[o], n = a), e.set(t[o], a)
    }
    if (0 === n) throw new Error("mode requires at last one data point");
    return r
},
    //최빈값 정렬
    exports.modeSorted = a,
    //최소값
    exports.min = s,
    //최대값
    exports.max = u,

    exports.extent = function (t) {
    if (0 === t.length) throw new Error("extent requires at least one data point");
    for (var r = t[0], e = t[0], n = 1; n < t.length; n++) t[n] > e && (e = t[n]), t[n] < r && (r = t[n]);
    return [r, e]},

    exports.minSorted = function (t) {
    return t[0]
},

    exports.maxSorted = function (t) {
    return t[t.length - 1]
},

    exports.extentSorted = function (t) {
    return [t[0], t[t.length - 1]]},
    // Array 합
    exports.sum = t,

    exports.sumSimple = function (t) {
    for (var r = 0, e = 0; e < t.length; e++) r += t[e];
    return r
},

    exports.product = function (t) {
    for (var r = 1, e = 0; e < t.length; e++) r *= t[e];
    return r},

    exports.quantile = p,

    exports.quantileSorted = h,

    exports.quantileRank = function (t, r) {
    return w(i(t), r)
},

    exports.quantileRankSorted = w,

    exports.interquartileRange = M,

    exports.iqr = M,

    exports.medianAbsoluteDeviation = m,

    exports.mad = m, exports.chunk = function (t, r) {
    var e = [];
    if (r < 1) throw new Error("chunk size must be a positive number");
    if (Math.floor(r) !== r) throw new Error("chunk size must be an integer");
    for (var n = 0; n < t.length; n += r) e.push(t.slice(n, n + r));
    return e
},

    exports.sampleWithReplacement = function (t, r, e) {
    if (0 === t.length) return [];
    e = e || Math.random;
    for (var n = t.length, o = [], a = 0; a < r; a++) {
        var i = Math.floor(e() * n);
        o.push(t[i])
    }
    return o
},

    exports.shuffle = b,

    exports.shuffleInPlace = d, exports.sample = function (t, r, e) {
    return b(t, e).slice(0, r)
},

    exports.ckmeans = function (t, r) {
    if (r > t.length) throw new Error("cannot generate more classes than there are data values");
    var e = i(t);
    if (1 === q(e)) return [e];
    var n = E(r, e.length),
        o = E(r, e.length);
    !function (t, r, e) {
        for (var n = r[0].length, o = t[Math.floor(n / 2)], a = [], i = [], s = 0, u = void 0; s < n; ++s) u = t[s] - o, 0 === s ? (a.push(u), i.push(u * u)) : (a.push(a[s - 1] + u), i.push(i[s - 1] + u * u)), r[0][s] = y(0, s, a, i), e[0][s] = 0;
        for (var h = 1; h < r.length; ++h) S(h < r.length - 1 ? h : n - 1, n - 1, h, r, e, a, i)
    }(e, n, o);
    for (var a = [], s = o[0].length - 1, u = o.length - 1; u >= 0; u--) {
        var h = o[u][s];
        a[u] = e.slice(h, s + 1), u > 0 && (s = h - 1)
    }
    return a
},

    exports.uniqueCountSorted = q,

    exports.sumNthPowerDeviations = e,

    exports.equalIntervalBreaks = function (t, r) {
    if (t.length < 2) return t;
    for (var e = s(t), n = u(t), o = [e], a = (n - e) / r, i = 1; i < r; i++) o.push(o[0] + a * i);
    return o.push(n), o
},
    //표본평균 공분산
    exports.sampleCovariance = k,
    //상관계수 샘플
    exports.sampleCorrelation = function (t, r) {
    return k(t, r) / P(t) / P(r)
},

    exports.sampleVariance = I,

    exports.sampleStandardDeviation = P,

    exports.sampleSkewness = function (t) {
    if (t.length < 3) throw new Error("sampleSkewness requires at least three data points");
    for (var e, n = r(t), o = 0, a = 0, i = 0; i < t.length; i++) o += (e = t[i] - n) * e, a += e * e * e;
    var s = Math.sqrt(o / (t.length - 1)),
        u = t.length;
    return u * a / ((u - 1) * (u - 2) * Math.pow(s, 3))
},

    exports.sampleKurtosis = function (t) {
    var e = t.length;
    if (e < 4) throw new Error("sampleKurtosis requires at least four data points");
    for (var n, o = r(t), a = 0, i = 0, s = 0; s < e; s++) a += (n = t[s] - o) * n, i += n * n * n * n;
    return (e - 1) / ((e - 2) * (e - 3)) * (e * (e + 1) * i / (a * a) - 3 * (e - 1))
},

    exports.permutationsHeap = function (t) {
    for (var r = new Array(t.length), e = [t.slice()], n = 0; n < t.length; n++) r[n] = 0;
    for (var o = 0; o < t.length;)
        if (r[o] < o) {
            var a = 0;
            o % 2 != 0 && (a = r[o]);
            var i = t[a];
            t[a] = t[o], t[o] = i, e.push(t.slice()), r[o]++, o = 0
        } else r[o] = 0, o++;
    return e
},

    exports.combinations = function t(r, e) {
    var n, o, a, i, s = [];
    for (n = 0; n < r.length; n++)
        if (1 === e) s.push([r[n]]);
        else
            for (a = t(r.slice(n + 1, r.length), e - 1), o = 0; o < a.length; o++) (i = a[o]).unshift(r[n]), s.push(i);
    return s
},

    exports.combinationsReplacement = function t(r, e) {
    for (var n = [], o = 0; o < r.length; o++)
        if (1 === e) n.push([r[o]]);
        else
            for (var a = t(r.slice(o, r.length), e - 1), i = 0; i < a.length; i++) n.push([r[o]].concat(a[i]));
    return n
},

    exports.addToMean = function (t, r, e) {
    return t + (e - t) / (r + 1)
},

    exports.combineMeans = D,

    exports.combineVariances = function (t, r, e, n, o, a) {
    var i = D(r, e, o, a);
    return (e * (t + Math.pow(r - i, 2)) + a * (n + Math.pow(o - i, 2))) / (e + a)
},

    exports.geometricMean = function (t) {
    if (0 === t.length) throw new Error("geometricMean requires at least one data point");
    for (var r = 1, e = 0; e < t.length; e++) {
        if (t[e] <= 0) throw new Error("geometricMean requires only positive numbers as input");
        r *= t[e]
    }
    return Math.pow(r, 1 / t.length)
},

    exports.harmonicMean = function (t) {
    if (0 === t.length) throw new Error("harmonicMean requires at least one data point");
    for (var r = 0, e = 0; e < t.length; e++) {
        if (t[e] <= 0) throw new Error("harmonicMean requires only positive numbers as input");
        r += 1 / t[e]
    }
    return t.length / r
},
    //평균
    exports.average = r,
    //평균
    exports.mean = r,
    //중앙값
    exports.median = x,
    //중앙값 정렬
    exports.medianSorted = function (t) {
    return h(t, .5)
},
    //
    exports.subtractFromMean = function (t, r, e) {
    return (t * r - e) / (r - 1)
},
    //제곱평균제곱근
    exports.rootMeanSquare = C,
    //제곱평균제곱근
    exports.rms = C,
    //분산
    exports.variance = n,

    exports.tTest = function (t, e) {
    return (r(t) - e) / (o(t) / Math.sqrt(t.length))
},

    exports.tTestTwoSample = function (t, e, n) {
    var o = t.length,
        a = e.length;
    if (!o || !a) return null;
    n || (n = 0);
    var i = r(t),
        s = r(e),
        u = I(t),
        h = I(e);
    return "number" == typeof i && "number" == typeof s && "number" == typeof u && "number" == typeof h ? (i - s - n) / Math.sqrt(((o - 1) * u + (a - 1) * h) / (o + a - 2) * (1 / o + 1 / a)) : void 0
},

    exports.BayesianClassifier = T,

    exports.bayesian = T,

    exports.PerceptronModel = N,

    exports.perceptron = N,

    exports.epsilon = 1e-4,

    exports.factorial = R,

    exports.gamma = function t(r) {
    if (Number.isInteger(r)) return r <= 0 ? NaN : R(r - 1);
    if (--r < 0) return Math.PI / (Math.sin(Math.PI * -r) * t(-r));
    var e = r + .25;
    return Math.pow(r / Math.E, r) * Math.sqrt(2 * Math.PI * (r + 1 / 6)) * (1 + 1 / 144 / Math.pow(e, 2) - 1 / 12960 / Math.pow(e, 3) - 257 / 207360 / Math.pow(e, 4) - 52 / 2612736 / Math.pow(e, 5) + 5741173 / 9405849600 / Math.pow(e, 6) + 37529 / 18811699200 / Math.pow(e, 7))
},

    exports.gammaln = function (t) {
    if (t <= 0) return Infinity;
    t--;
    for (var r = F[0], e = 1; e < 15; e++) r += F[e] / (t + e);
    var n = 5.2421875 + t;
    return A + Math.log(r) - n + (t + .5) * Math.log(n)
},
    //베르누이 분포 (1또는 0만 Stacked)
    exports.bernoulliDistribution = function (t) {
    if (t < 0 || t > 1) throw new Error("bernoulliDistribution requires probability to be between 0 and 1 inclusive");
    return [1 - t, t]
},
    //이항분포 ( t : number of trials to simulate(시도횟수) , r : probability (확률 / 요소) )
    exports.binomialDistribution = function (t, r) {
    if (!(r < 0 || r > 1 || t <= 0 || t % 1 != 0)) {
        var e = 0,
            n = 0,
            o = [],
            a = 1;
        do {
            o[e] = a * Math.pow(r, e) * Math.pow(1 - r, t - e), n += o[e], a = a * (t - ++e + 1) / e
        } while (n < .9999);
        return o
    }
},
    //포아송 분포 : 드물게 일어나는 사항에 대한 확률분포 => 생산지표에서 반드시 활용
    exports.poissonDistribution = function (t) {
    if (!(t <= 0)) {
        var r = 0,
            e = 0,
            n = [],
            o = 1;
        do {
            n[r] = Math.exp(-t) * Math.pow(t, r) / o, e += n[r], o *= ++r
        } while (e < .9999);
        return n
    }
},

    exports.chiSquaredDistributionTable = _,

    exports.chiSquaredGoodnessOfFit = function (t, e, n) {
    for (var o = 0, a = e(r(t)), i = [], s = [], u = 0; u < t.length; u++) void 0 === i[t[u]] && (i[t[u]] = 0), i[t[u]]++;
    for (var h = 0; h < i.length; h++) void 0 === i[h] && (i[h] = 0);
    for (var f in a) f in i && (s[+f] = a[f] * t.length);
    for (var l = s.length - 1; l >= 0; l--) s[l] < 3 && (s[l - 1] += s[l], s.pop(), i[l - 1] += i[l], i.pop());
    for (var p = 0; p < i.length; p++) o += Math.pow(i[p] - s[p], 2) / s[p];
    return _[i.length - 1 - 1][n] < o
},

    exports.kernelDensityEstimation = K,

    exports.kde = K,
    //표준화 점수 (z-score)
    exports.zScore = function (t, r, e) {
    return (t - r) / e
},

    exports.cumulativeStdNormalProbability = function (t) {
    var r = Math.abs(t),
        e = Math.min(Math.round(100 * r), H.length - 1);
    return t >= 0 ? H[e] : +(1 - H[e]).toFixed(4)
},
    //정규분포테이블(Z분포표)
    exports.standardNormalTable = H,

    exports.errorFunction = O,

    exports.erf = O,

    exports.inverseErrorFunction = W,

    exports.probit = function (t) {
    return 0 === t ? t = 1e-4 : t >= 1 && (t = .9999), Math.sqrt(2) * W(2 * t - 1)
},

    exports.permutationTest = function (t, e, n, o) {
    if (void 0 === o && (o = 1e4), void 0 === n && (n = "two_side"), "two_side" !== n && "greater" !== n && "less" !== n) throw new Error("`alternative` must be either 'two_side', 'greater', or 'less'");
    for (var a = r(t) - r(e), i = new Array(o), s = t.concat(e), u = Math.floor(s.length / 2), h = 0; h < o; h++) {
        d(s);
        var f = s.slice(0, u),
            l = s.slice(u, s.length),
            p = r(f) - r(l);
        i[h] = p
    }
    var c = 0;
    if ("two_side" === n)
        for (var g = 0; g <= o; g++) Math.abs(i[g]) >= Math.abs(a) && (c += 1);
    else if ("greater" === n)
        for (var v = 0; v <= o; v++) i[v] >= a && (c += 1);
    else
        for (var w = 0; w <= o; w++) i[w] <= a && (c += 1);
    return c / o
},

    exports.bisect = function (t, r, e, n, o) {
    if ("function" != typeof t) throw new TypeError("func must be a function");
    for (var a = 0; a < n; a++) {
        var i = (r + e) / 2;
        if (0 === t(i) || Math.abs((e - r) / 2) < o) return i;
        j(t(i)) === j(t(r)) ? r = i : e = i
    }
    throw new Error("maximum number of iterations exceeded")
},

    exports.quickselect = f,

    exports.sign = j,
    //정수 또는 소수 정렬
    exports.numericSort = i;

//# sourceMappingURL=simple-statistics.js.map
