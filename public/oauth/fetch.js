! function (t) {
  
  if (t.__disableNativeFetch || !t.fetch) {
    u.prototype.append = function (t, e) {
      t = i(t), e = a(e);
      var r = this.map[t];
      r || (r = [], this.map[t] = r), r.push(e)
    }, u.prototype.delete = function (t) {
      delete this.map[i(t)]
    }, u.prototype.get = function (t) {
      var e = this.map[i(t)];
      return e ? e[0] : null
    }, u.prototype.getAll = function (t) {
      return this.map[i(t)] || []
    }, u.prototype.has = function (t) {
      return this.map.hasOwnProperty(i(t))
    }, u.prototype.set = function (t, e) {
      this.map[i(t)] = [a(e)]
    }, u.prototype.forEach = function (r, o) {
      Object.getOwnPropertyNames(this.map).forEach(function (e) {
        this.map[e].forEach(function (t) {
          r.call(o, t, e, this)
        }, this)
      }, this)
    };
    var h = "FileReader" in t && "Blob" in t && function () {
        try {
          return new Blob(), !0
        } catch (t) {
          return !1
        }
      }(),
      r = "FormData" in t,
      o = "ArrayBuffer" in t,
      n = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
    l.prototype.clone = function () {
      return new l(this)
    }, f.call(l.prototype), f.call(y.prototype), y.prototype.clone = function () {
      return new y(this._bodyInit, {
        status: this.status,
        statusText: this.statusText,
        headers: new u(this.headers),
        url: this.url
      })
    }, y.error = function () {
      var t = new y(null, {
        status: 0,
        statusText: ""
      });
      return t.type = "error", t
    };
    var s = [301, 302, 303, 307, 308];
    y.redirect = function (t, e) {
      if (-1 === s.indexOf(e)) throw new RangeError("Invalid status code");
      return new y(null, {
        status: e,
        headers: {
          location: t
        }
      })
    }, t.Headers = u, t.Request = l, t.Response = y, t.fetch = function (r, a) {
      return new Promise(function (o, n) {
        var t;
        t = l.prototype.isPrototypeOf(r) && !a ? r : new l(r, a);
        var s = new XMLHttpRequest();
        var i = !1;

        function e() {
          if (4 === s.readyState) {
            var t = 1223 === s.status ? 204 : s.status;
            if (t < 100 || 599 < t) {
              if (i) return;
              return i = !0, void n(new TypeError("Network request failed"))
            }
            var e = {
                status: t,
                statusText: s.statusText,
                headers: function (t) {
                  var n = new u();
                  return t.getAllResponseHeaders().trim().split("\n").forEach(function (t) {
                    var e = t.trim().split(":"),
                      r = e.shift().trim(),
                      o = e.join(":").trim();
                    n.append(r, o)
                  }), n
                }(s),
                url: "responseURL" in s ? s.responseURL : /^X-Request-URL:/m.test(s.getAllResponseHeaders()) ? s.getResponseHeader("X-Request-URL") : void 0
              },
              r = "response" in s ? s.response : s.responseText;
            i || (i = !0, o(new y(r, e)))
          }
        }
        s.onreadystatechange = e, s.onload = e, s.onerror = function () {
          i || (i = !0, n(new TypeError("Network request failed")))
        }, s.open(t.method, t.url, !0);
        try {
          "include" === t.credentials && ("withCredentials" in s ? s.withCredentials = !0 : console && console.warn && console.warn("withCredentials is not supported, you can ignore this warning"))
        } catch (t) {
          console && console.warn && console.warn("set withCredentials error:" + t)
        }
        "responseType" in s && h && (s.responseType = "blob"), t.headers.forEach(function (t, e) {
          s.setRequestHeader(e, t)
        }), s.send(void 0 === t._bodyInit ? null : t._bodyInit)
      })
    }, t.fetch.polyfill = !0, "undefined" != typeof module && module.exports && (module.exports = t.fetch)
  }

  function i(t) {
    if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
    return t.toLowerCase()
  }

  function a(t) {
    return "string" != typeof t && (t = String(t)), t
  }

  function u(e) {
    this.map = {}, e instanceof u ? e.forEach(function (t, e) {
      this.append(e, t)
    }, this) : e && Object.getOwnPropertyNames(e).forEach(function (t) {
      this.append(t, e[t])
    }, this)
  }

  function e(t) {
    if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
    t.bodyUsed = !0
  }

  function d(r) {
    return new Promise(function (t, e) {
      r.onload = function () {
        t(r.result)
      }, r.onerror = function () {
        e(r.error)
      }
    })
  }

  function p(t) {
    var e = new FileReader();
    return e.readAsArrayBuffer(t), d(e)
  }

  function f() {
    return this.bodyUsed = !1, this._initBody = function (t, e) {
      if ("string" == typeof (this._bodyInit = t)) this._bodyText = t;
      else if (h && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t, this._options = e;
      else if (r && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
      else if (t) {
        if (!o || !ArrayBuffer.prototype.isPrototypeOf(t)) throw new Error("unsupported BodyInit type")
      } else this._bodyText = ""
    }, h ? (this.blob = function () {
      var t = e(this);
      if (t) return t;
      if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
      if (this._bodyFormData) throw new Error("could not read FormData body as blob");
      return Promise.resolve(new Blob([this._bodyText]))
    }, this.arrayBuffer = function () {
      return this.blob().then(p)
    }, this.text = function () {
      var t = e(this);
      if (t) return t;
      if (this._bodyBlob) return function (t, e) {
        var r = new FileReader(),
          o = e.headers.map["content-type"] ? e.headers.map["content-type"].toString() : "",
          n = /charset\=[0-9a-zA-Z\-\_]*;?/,
          s = t.type.match(n) || o.match(n),
          i = [t];
        return s && i.push(s[0].replace(/^charset\=/, "").replace(/;$/, "")), r.readAsText.apply(r, i), d(r)
      }(this._bodyBlob, this._options);
      if (this._bodyFormData) throw new Error("could not read FormData body as text");
      return Promise.resolve(this._bodyText)
    }) : this.text = function () {
      var t = e(this);
      return t || Promise.resolve(this._bodyText)
    }, r && (this.formData = function () {
      return this.text().then(c)
    }), this.json = function () {
      return this.text().then(JSON.parse)
    }, this
  }

  function l(t, e) {
    var r = (e = e || {}).body;
    if (l.prototype.isPrototypeOf(t)) {
      if (t.bodyUsed) throw new TypeError("Already read");
      this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new u(t.headers)), this.method = t.method, this.mode = t.mode, r || (r = t._bodyInit, t.bodyUsed = !0)
    } else this.url = t;
    if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new u(e.headers)), this.method = function (t) {
        var e = t.toUpperCase();
        return -1 < n.indexOf(e) ? e : t
      }(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
    this._initBody(r, e)
  }

  function c(t) {
    var n = new FormData();
    return t.trim().split("&").forEach(function (t) {
      if (t) {
        var e = t.split("="),
          r = e.shift().replace(/\+/g, " "),
          o = e.join("=").replace(/\+/g, " ");
        n.append(decodeURIComponent(r), decodeURIComponent(o))
      }
    }), n
  }

  function y(t, e) {
    e || (e = {}), this._initBody(t, e), this.type = "default", this.status = e.status, this.ok = 200 <= this.status && this.status < 300, this.statusText = e.statusText, this.headers = e.headers instanceof u ? e.headers : new u(e.headers), this.url = e.url || ""
  }
}("undefined" != typeof self ? self : this);