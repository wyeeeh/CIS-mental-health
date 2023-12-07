/*!
Copyright 2016-2023 Kiln Enterprises Ltd

This file may be freely used, and distributed without modification.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
OF THE POSSIBILITY OF SUCH DAMAGE.
*/
(window.FlourishConfig = {
  app_url: "https://app.flourish.studio",
  public_url: "https://public.flourish.studio/",
  embeds_url: "https://flo.uri.sh/",
}),
  (function () {
    "use strict";
    var t,
      e,
      i = !1;
    function r(t) {
      if (i && window.top !== window.self) {
        var e = window;
        "srcdoc" === e.location.pathname && (e = e.parent);
        var r,
          o =
            ((r = {}),
            window._Flourish_template_id &&
              (r.template_id = window._Flourish_template_id),
            window.Flourish &&
              window.Flourish.app &&
              window.Flourish.app.loaded_template_id &&
              (r.template_id = window.Flourish.app.loaded_template_id),
            window._Flourish_visualisation_id &&
              (r.visualisation_id = window._Flourish_visualisation_id),
            window.Flourish &&
              window.Flourish.app &&
              window.Flourish.app.loaded_visualisation &&
              (r.visualisation_id =
                window.Flourish.app.loaded_visualisation.id),
            window.Flourish &&
              window.Flourish.app &&
              window.Flourish.app.story &&
              ((r.story_id = window.Flourish.app.story.id),
              (r.slide_count = window.Flourish.app.story.slides.length)),
            window.Flourish &&
              window.Flourish.app &&
              window.Flourish.app.current_slide &&
              (r.slide_index = window.Flourish.app.current_slide.index + 1),
            r),
          a = { sender: "Flourish", method: "customerAnalytics" };
        for (var s in o) o.hasOwnProperty(s) && (a[s] = o[s]);
        for (var s in t) t.hasOwnProperty(s) && (a[s] = t[s]);
        e.parent.postMessage(JSON.stringify(a), "*");
      }
    }
    function o(t) {
      if ("function" != typeof t)
        throw new Error("Analytics callback is not a function");
      window.Flourish._analytics_listeners.push(t);
    }
    function a(t) {
      if ("function" != typeof t)
        throw new Error("Analytics callback is not a function");
      window.Flourish._analytics_listeners =
        window.Flourish._analytics_listeners.filter(function (e) {
          return t !== e;
        });
    }
    function s() {
      i = !0;
      [
        { event_name: "click", action_name: "click", use_capture: !0 },
        { event_name: "keydown", action_name: "key_down", use_capture: !0 },
        {
          event_name: "mouseenter",
          action_name: "mouse_enter",
          use_capture: !1,
        },
        {
          event_name: "mouseleave",
          action_name: "mouse_leave",
          use_capture: !1,
        },
      ].forEach(function (t) {
        document.body.addEventListener(
          t.event_name,
          function () {
            r({ action: t.action_name });
          },
          t.use_capture
        );
      });
    }
    function n() {
      if (null == t) {
        var e = (function () {
          var t = window.location;
          "about:srcdoc" == t.href && (t = window.parent.location);
          var e = {};
          return (
            (function (t, i, r) {
              for (; (r = i.exec(t)); )
                e[decodeURIComponent(r[1])] = decodeURIComponent(r[2]);
            })(
              t.search.substring(1).replace(/\+/g, "%20"),
              /([^&=]+)=?([^&]*)/g
            ),
            e
          );
        })();
        t =
          "referrer" in e
            ? /^https:\/\/medium.com\//.test(e.referrer)
            : !("auto" in e);
      }
      return t;
    }
    function l(t) {
      var e = t || window.innerWidth;
      return e > 999 ? 650 : e > 599 ? 575 : 400;
    }
    function u(t) {
      if (t && window.top !== window.self) {
        var e = window;
        "srcdoc" == e.location.pathname && (e = e.parent);
        var i = { sender: "Flourish", method: "scrolly" };
        if (t) for (var r in t) i[r] = t[r];
        e.parent.postMessage(JSON.stringify(i), "*");
      }
    }
    function d(t, i) {
      if (window.top !== window.self) {
        var r = window;
        if (("srcdoc" == r.location.pathname && (r = r.parent), e))
          return (
            (t = parseInt(t, 10)),
            void r.parent.postMessage(
              { sentinel: "amp", type: "embed-size", height: t },
              "*"
            )
          );
        var o = {
          sender: "Flourish",
          context: "iframe.resize",
          method: "resize",
          height: t,
          src: r.location.toString(),
        };
        if (i) for (var a in i) o[a] = i[a];
        r.parent.postMessage(JSON.stringify(o), "*");
      }
    }
    function h() {
      return (
        (-1 !== navigator.userAgent.indexOf("Safari") ||
          -1 !== navigator.userAgent.indexOf("iPhone")) &&
        -1 == navigator.userAgent.indexOf("Chrome")
      );
    }
    function c(t) {
      return "string" == typeof t || t instanceof String;
    }
    function p(t) {
      return "warn" !== t.method
        ? (console.warn(
            "BUG: validateWarnMessage called for method" + t.method
          ),
          !1)
        : !(null != t.message && !c(t.message)) &&
            !(null != t.explanation && !c(t.explanation));
    }
    function f(t) {
      return "resize" !== t.method
        ? (console.warn(
            "BUG: validateResizeMessage called for method" + t.method
          ),
          !1)
        : !!c(t.src) &&
            !!c(t.context) &&
            !!("number" == typeof (e = t.height)
              ? !isNaN(e) && e >= 0
              : c(e) &&
                /\d/.test(e) &&
                /^[0-9]*(\.[0-9]*)?(cm|mm|Q|in|pc|pt|px|em|ex|ch|rem|lh|vw|vh|vmin|vmax|%)?$/i.test(
                  e
                ));
      var e;
    }
    function m(t) {
      throw new Error(
        "Validation for setSetting is not implemented yet; see issue #4328"
      );
    }
    function w(t) {
      return "scrolly" !== t.method
        ? (console.warn("BUG: validateScrolly called for method" + t.method),
          !1)
        : !!Array.isArray(t.slides);
    }
    function g(t) {
      return (
        "customerAnalytics" === t.method ||
        (console.warn(
          "BUG: validateCustomerAnalyticsMessage called for method" + t.method
        ),
        !1)
      );
    }
    function v(t) {
      return "request-upload" !== t.method
        ? (console.warn(
            "BUG: validateResizeMessage called for method" + t.method
          ),
          !1)
        : !!c(t.name) && !(null != t.accept && !c(t.accept));
    }
    function b(t, e, i) {
      var r = (function (t) {
        for (
          var e = {
              warn: p,
              resize: f,
              setSetting: m,
              customerAnalytics: g,
              "request-upload": v,
              scrolly: w,
            },
            i = {},
            r = 0;
          r < t.length;
          r++
        ) {
          var o = t[r];
          if (!e[o]) throw new Error("No validator found for method " + o);
          i[o] = e[o];
        }
        return i;
      })(e);
      window.addEventListener("message", function (e) {
        var o = (function () {
          if (e.origin == document.location.origin) return !0;
          if (i) {
            const t = e.origin.toLowerCase();
            if (((i = i.toLowerCase()), t.endsWith("//" + i))) return !0;
            if (t.endsWith("." + i)) return !0;
          }
          return !!e.origin.match(
            /\/\/localhost:\d+$|\/\/(?:public|app)\.flourish.devlocal$|\/\/flourish-api\.com$|\.flourish\.(?:local(:\d+)?|net|rocks|studio)$|\.uri\.sh$|\/\/flourish-user-templates\.com$/
          );
        })();
        if (null != e.source && o) {
          var a;
          try {
            a = "object" == typeof e.data ? e.data : JSON.parse(e.data);
          } catch (t) {
            return void console.warn(
              "Unexpected non-JSON message: " + JSON.stringify(e.data)
            );
          }
          if ("Flourish" === a.sender)
            if (a.method)
              if (Object.prototype.hasOwnProperty.call(r, a.method))
                if (r[a.method](a)) {
                  for (
                    var s = document.querySelectorAll("iframe"), n = 0;
                    n < s.length;
                    n++
                  )
                    if (
                      s[n].contentWindow == e.source ||
                      s[n].contentWindow == e.source.parent
                    )
                      return void t(a, s[n]);
                  console.warn("could not find frame", a);
                } else console.warn("Validation failed for the message", a);
              else console.warn("No validator implemented for message", a);
            else
              console.warn("The 'method' property was missing from message", a);
        }
      }),
        h() && (window.addEventListener("resize", y), y());
    }
    function y() {
      for (
        var t = document.querySelectorAll(".flourish-embed"), e = 0;
        e < t.length;
        e++
      ) {
        var i = t[e];
        if (!i.getAttribute("data-width")) {
          var r = i.querySelector("iframe");
          if (r) {
            var o = window.getComputedStyle(i),
              a =
                i.offsetWidth -
                parseFloat(o.paddingLeft) -
                parseFloat(o.paddingRight);
            r.style.width = a + "px";
          }
        }
      }
    }
    function F(t, e) {
      var i = t.parentNode;
      if (i.classList.contains("fl-scrolly-wrapper"))
        console.warn(
          "createScrolly is being called more than once per story. This should not happen."
        );
      else {
        i.classList.add("fl-scrolly-wrapper"),
          (i.style.position = "relative"),
          (i.style.paddingBottom = "1px"),
          (i.style.transform = "translate3d(0, 0, 0)"),
          (t.style.position = "sticky");
        var r = i.getAttribute("data-height") || null;
        r || ((r = "80vh"), (t.style.height = r)),
          (t.style.top = "calc(50vh - " + r + "/2)");
        var o = i.querySelector(".flourish-credit");
        o &&
          ((o.style.position = "sticky"),
          (o.style.top = "calc(50vh + " + r + "/2)")),
          e.forEach(function (t, e) {
            var r = "string" == typeof t && "" != t.trim(),
              o = document.createElement("div");
            o.setAttribute("data-slide", e),
              o.classList.add("fl-scrolly-caption"),
              (o.style.position = "relative"),
              (o.style.transform = "translate3d(0,0,0)"),
              (o.style.textAlign = "center"),
              (o.style.maxWidth = "500px"),
              (o.style.height = "auto"),
              (o.style.marginTop = "0"),
              (o.style.marginBottom = r ? "100vh" : "50vh"),
              (o.style.marginLeft = "auto"),
              (o.style.marginRight = "auto");
            var a = document.createElement("div");
            (a.innerHTML = t),
              (a.style.visibility = r ? "" : "hidden"),
              (a.style.display = "inline-block"),
              (a.style.paddingTop = "1.25em"),
              (a.style.paddingRight = "1.25em"),
              (a.style.paddingBottom = "1.25em"),
              (a.style.paddingLeft = "1.25em"),
              (a.style.background = "rgba(255,255,255,0.9)"),
              (a.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)"),
              (a.style.borderRadius = "10px"),
              (a.style.textAlign = "center"),
              (a.style.maxWidth = "100%"),
              (a.style.margin = "0 20px"),
              (a.style.overflowX = "hidden"),
              o.appendChild(a),
              i.appendChild(o);
          }),
          (function (t) {
            for (
              var e = new IntersectionObserver(
                  function (e) {
                    e.forEach(function (e) {
                      if (e.isIntersecting) {
                        var i = t.querySelector("iframe");
                        i &&
                          (i.src =
                            i.src.replace(/#slide-.*/, "") +
                            "#slide-" +
                            e.target.getAttribute("data-slide"));
                      }
                    });
                  },
                  { rootMargin: "0px 0px -0% 0px" }
                ),
                i = t.querySelectorAll(".fl-scrolly-caption"),
                r = 0;
              r < i.length;
              r++
            )
              e.observe(i[r]);
            t.querySelectorAll(".fl-scrolly-caption img").forEach(function (t) {
              t.style.maxWidth = "100%";
            });
          })(i);
      }
    }
    function x(t, e, i, r, o) {
      var a = document.createElement("iframe");
      if (
        (a.setAttribute("scrolling", "no"),
        a.setAttribute("frameborder", "0"),
        a.setAttribute("title", "Interactive or visual content"),
        a.setAttribute(
          "sandbox",
          "allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
        ),
        e.appendChild(a),
        a.offsetParent || "fixed" === getComputedStyle(a).position)
      )
        _(t, e, a, i, r, o);
      else {
        var s = {
          embed_url: t,
          container: e,
          iframe: a,
          width: i,
          height: r,
          play_on_load: o,
        };
        if (
          (window._flourish_poll_items
            ? window._flourish_poll_items.push(s)
            : (window._flourish_poll_items = [s]),
          window._flourish_poll_items.length > 1)
        )
          return a;
        var n = setInterval(function () {
          (window._flourish_poll_items = window._flourish_poll_items.filter(
            function (t) {
              return (
                !t.iframe.offsetParent ||
                (_(
                  t.embed_url,
                  t.container,
                  t.iframe,
                  t.width,
                  t.height,
                  t.play_on_load
                ),
                !1)
              );
            }
          )),
            window._flourish_poll_items.length || clearInterval(n);
        }, 500);
      }
      return a;
    }
    function _(t, e, i, r, o, a) {
      var s;
      return (
        r && "number" == typeof r
          ? ((s = r), (r += "px"))
          : r &&
            r.match(
              /^[ \t\r\n\f]*([+-]?\d+|\d*\.\d+(?:[eE][+-]?\d+)?)(?:\\?[Pp]|\\0{0,4}[57]0(?:\r\n|[ \t\r\n\f])?)(?:\\?[Xx]|\\0{0,4}[57]8(?:\r\n|[ \t\r\n\f])?)[ \t\r\n\f]*$/
            ) &&
            (s = parseFloat(r)),
        o && "number" == typeof o && (o += "px"),
        r
          ? (i.style.width = r)
          : h()
          ? (i.style.width = e.offsetWidth + "px")
          : (i.style.width = "100%"),
        !!o ||
          (t.match(/\?/) ? (t += "&auto=1") : (t += "?auto=1"),
          (o = l(s || i.offsetWidth) + "px")),
        o &&
          ("%" === o.charAt(o.length - 1) &&
            (o = (parseFloat(o) / 100) * e.parentNode.offsetHeight + "px"),
          (i.style.height = o)),
        i.setAttribute("src", t + (a ? "#play-on-load" : "")),
        i
      );
    }
    var A = {
      de: { credits: { default: "Erstellt mit Flourish" } },
      en: {
        credits: {
          default: {
            text: "A Flourish data visualization",
            url: "https://flourish.studio/",
          },
          annotator: {
            text: "Interactive content by Flourish",
            url: "https://app.flourish.studio/@flourish/svg-annotator",
          },
          "bar-chart-race": {
            text: "A Flourish bar chart race",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
          "bubble-chart": {
            text: "A Flourish bubble chart",
            url: "https://flourish.studio/blog/introducing-bubble-chart-template/",
          },
          cards: {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/blog/cards-template/",
          },
          chart: {
            text: "A Flourish chart",
            url: "https://flourish.studio/visualisations/line-bar-pie-charts/",
          },
          chord: {
            text: "A Flourish chord diagram",
            url: "https://flourish.studio/blog/how-to-make-a-chord-diagram/",
          },
          countdown: {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/blog/number-ticker-countdown-templates/",
          },
          "data-explorer": {
            text: "A Flourish data explorer",
            url: "https://flourish.studio/blog/data-explorer-template/",
          },
          draw: {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/blog/draw-the-line-chart/",
          },
          election: {
            text: "A Flourish election chart",
            url: "https://app.flourish.studio/@flourish/election-results-chart",
          },
          gantt: {
            text: "A Flourish gantt chart",
            url: "https://flourish.studio/blog/gantt-chart-template/",
          },
          gauge: {
            text: "A Flourish gauge visualization",
            url: "https://flourish.studio/visualisations/gauge/",
          },
          globe: {
            text: "A Flourish connections globe",
            url: "https://flourish.studio/visualisations/maps/",
          },
          heatmap: {
            text: "A Flourish heatmap",
            url: "https://flourish.studio/visualisations/heatmaps/",
          },
          hierarchy: {
            text: "A Flourish hierarchy chart",
            url: "https://flourish.studio/visualisations/treemaps/",
          },
          map: {
            text: "A Flourish map",
            url: "https://flourish.studio/visualisations/maps/",
          },
          marimekko: {
            text: "A Flourish marimekko chart",
            url: "https://flourish.studio/visualisations/marimekko-charts/",
          },
          model: {
            text: "Interactive content by Flourish",
            url: "https://app.flourish.studio/@flourish/3d-viewer",
          },
          network: {
            text: "A Flourish network chart",
            url: "https://flourish.studio/visualisations/network-charts/",
          },
          "number-ticker": {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/blog/number-ticker-countdown-templates/",
          },
          parliament: {
            text: "A Flourish election chart",
            url: "https://flourish.studio/blog/how-to-make-parliament-chart/",
          },
          "photo-slider": {
            text: "Interactive content by Flourish",
            url: "https://app.flourish.studio/@flourish/photo-slider",
          },
          pictogram: {
            text: "A Flourish pictogram",
            url: "https://flourish.studio/blog/pictogram-isotype/",
          },
          quiz: {
            text: "A Flourish quiz",
            url: "https://app.flourish.studio/@flourish/quiz",
          },
          radar: {
            text: "A Flourish radar chart",
            url: "https://flourish.studio/blog/create-online-radar-spider-charts/",
          },
          ranking: {
            text: "A Flourish line chart race",
            url: "https://flourish.studio/blog/line-chart-race-updates/",
          },
          sankey: {
            text: "A Flourish sankey chart",
            url: "https://flourish.studio/visualisations/sankey-charts/",
          },
          scatter: {
            text: "A Flourish scatter chart",
            url: "https://flourish.studio/visualisations/scatter-charts/",
          },
          slope: {
            text: "A Flourish slope chart",
            url: "https://flourish.studio/visualisations/slope-charts/",
          },
          sports: {
            text: "A Flourish sports visualization",
            url: "https://app.flourish.studio/@flourish/sports-race",
          },
          survey: {
            text: "A Flourish survey visualization",
            url: "https://flourish.studio/visualisations/survey-data/",
          },
          table: {
            text: "A Flourish table",
            url: "https://flourish.studio/visualisations/create-a-table/",
          },
          timeline: {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/blog/responsive-interactive-timeline/",
          },
          "text-annotator": {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/blog/text-annotator-template/",
          },
          tournament: {
            text: "Interactive content by Flourish",
            url: "https://flourish.studio/visualisations/tournament-chart/",
          },
          "word-cloud": {
            text: "A Flourish data visualization",
            url: "https://flourish.studio/blog/online-wordcloud-custom-fonts/",
          },
        },
      },
      es: {
        credits: {
          default: "Creado con Flourish",
          bar_race: {
            text: "Creado con Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
          "bar-chart-race": {
            text: "Creado con Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
        },
      },
      fr: {
        credits: {
          default: "Créé avec Flourish",
          bar_race: {
            text: "Créé avec Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
          "bar-chart-race": {
            text: "Créé avec Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
        },
      },
      it: {
        credits: {
          default: "Creato con Flourish",
          bar_race: {
            text: "Creato con Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
          "bar-chart-race": {
            text: "Creato con Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
        },
      },
      mi: {
        credits: {
          default: "Hangaia ki te Flourish",
          bar_race: {
            text: "Hangaia ki te Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
          "bar-chart-race": {
            text: "Hangaia ki te Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
        },
      },
      nl: {
        credits: {
          default: "Gemaakt met Flourish",
          bar_race: {
            text: "Gemaakt met Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
          "bar-chart-race": {
            text: "Gemaakt met Flourish",
            url: "https://flourish.studio/visualisations/bar-chart-race/",
          },
        },
      },
      pt: {
        default: "Feito com Flourish",
        bar_race: {
          text: "Feito com Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/",
        },
        "bar-chart-race": {
          text: "Feito com Flourish",
          url: "https://flourish.studio/visualisations/bar-chart-race/",
        },
      },
    };
    !(function () {
      var t = [];
      function i() {
        if (!window.FlourishLoaded) {
          window.FlourishLoaded = !0;
          var i = window.Flourish && window.Flourish.external,
            a = "en",
            c = document.querySelector(
              "meta[name='language'],meta[name='LANGUAGE']"
            );
          c &&
            c.hasAttribute("content") &&
            ((a = c.getAttribute("content").substr(0, 2)), A[a] || (a = "en"));
          var p,
            f = Array.prototype.slice.call(
              document.querySelectorAll(".flourish-embed")
            );
          if (!i)
            for (
              var m = document.querySelectorAll("script"), w = 0;
              w < m.length;
              w++
            ) {
              var g = m[w];
              if (
                g.src &&
                g.src.match(
                  /(?:\.flourish\.(?:net|rocks|studio)|(?:localhost|flourish\.local)(?::\d+)?)\//g
                ) &&
                g.src.match(/\/embed\.js$/)
              ) {
                if (!p) {
                  var v = g.getAttribute("src");
                  p = v.substr(0, v.lastIndexOf("/resources")) + "/";
                }
                if (g.getAttribute("data-src")) {
                  var y = document.createElement("div");
                  y.setAttribute("class", "flourish-embed"),
                    y.setAttribute("data-src", g.getAttribute("data-src")),
                    g.getAttribute("data-height") &&
                      y.setAttribute(
                        "data-height",
                        g.getAttribute("data-height")
                      ),
                    g.getAttribute("data-width") &&
                      y.setAttribute(
                        "data-width",
                        g.getAttribute("data-width")
                      ),
                    g.parentNode.insertBefore(y, g),
                    f.push(y);
                }
              }
            }
          var _ =
              ((e = "#amp=1" == window.location.hash),
              {
                createEmbedIframe: x,
                isFixedHeight: n,
                getHeightForBreakpoint: l,
                startEventListeners: b,
                notifyParentWindow: d,
                initScrolly: u,
                createScrolly: F,
                isSafari: h,
                initCustomerAnalytics: s,
                addAnalyticsListener: o,
                sendCustomerAnalyticsMessage: r,
              }),
            k = function (t) {
              var e,
                r,
                o,
                s = t.getAttribute("data-src");
              if (s) {
                var n,
                  l = s.split("?"),
                  u = l.length > 1 || (window.Flourish && window.Flourish.hide);
                if (
                  ((s = l[0]),
                  i
                    ? ((n = s),
                      (e = window.FlourishConfig.public_url),
                      (r = "?utm_source=embed&utm_campaign=" + s))
                    : ((n = (o = 0 === s.indexOf("template/"))
                        ? window.FlourishConfig.app_url + "/" + s + "/preview"
                        : window.FlourishConfig.embeds_url + s + "/embed"),
                      (e = p + s + "/"),
                      (r = "?utm_source=showcase&utm_campaign=" + s)),
                  _.createEmbedIframe(
                    n,
                    t,
                    t.getAttribute("data-width"),
                    t.getAttribute("data-height"),
                    t.hasAttribute("data-play-on-load")
                  ),
                  !o && !u)
                ) {
                  for (
                    var d = "", h = t.className.split(" "), c = 0;
                    c < h.length;
                    c++
                  )
                    if (
                      "flourish-embed" != h[c] &&
                      0 == h[c].indexOf("flourish-")
                    ) {
                      d = h[c].substr(9);
                      break;
                    }
                  d || (d = 0 == s.indexOf("story") ? "story" : "default");
                  var f = (function (t, e) {
                      var i, r;
                      return (
                        (e = e || ""),
                        "object" ==
                          typeof (i =
                            A[(t = t || "en")].credits[e] ||
                            A.en.credits[e] ||
                            A.en.credits.default) &&
                          (i.url && (r = i.url), (i = i.text)),
                        { credit_text: i, credit_url: r }
                      );
                    })(a, d),
                    m = (function (t, e, i, r) {
                      (t = t || "https://flourish.studio"),
                        (e =
                          e ||
                          "?utm_source=api&utm_campaign=" +
                            window.location.href),
                        (i = i || "https://public.flourish.studio/"),
                        (r = r || "A Flourish data visualization");
                      var o = document.createElement("div");
                      o.setAttribute("class", "flourish-credit"),
                        o.setAttribute(
                          "style",
                          "width:100%!important;margin:0 0 4px!important;text-align:right!important;font-family:Helvetica,sans-serif!important;color:#888!important;font-size:11px!important;font-weight:bold!important;font-style:normal!important;-webkit-font-smoothing:antialiased!important;box-shadow:none!important;"
                        );
                      // var a = document.createElement("a");
                      // a.setAttribute("href", t + e),
                      //   a.setAttribute("target", "_top"),
                      //   a.setAttribute(
                      //     "style",
                      //     "display:inline-block!important;text-decoration:none!important;font:inherit!important;color:inherit!important;border:none!important;margin:0 5px!important;box-shadow:none!important;"
                      //   )
                      //   ,
                      //   o.appendChild(a)
                      //   ;
                      // var s = document.createElement("img");
                      // s.setAttribute("alt", "Flourish logo"),
                      //   s.setAttribute("src", i + "resources/bosh.svg"),
                      //   s.setAttribute(
                      //     "style",
                      //     "font:inherit!important;width:auto!important;height:12px!important;border:none!important;margin:0 2px 0!important;vertical-align:middle!important;display:inline-block!important;box-shadow:none!important;"
                      //   ),
                      //   a.appendChild(s);
                      // var n = document.createElement("span");
                      return (
                        // n.setAttribute(
                        //   "style",
                        //   "font:inherit!important;color:#888!important;vertical-align:middle!important;display:inline-block!important;box-shadow:none!important;"
                        // ),
                        // n.appendChild(document.createTextNode(r)),
                        // a.appendChild(n),
                        o
                      );
                    })(
                      f.credit_url || e,
                      r,
                      window.FlourishConfig.public_url,
                      f.credit_text
                    );
                  t.appendChild(m);
                }
              }
            };
          if (!window.Flourish || !window.Flourish.disable_autoload)
            for (w = 0; w < f.length; w++) k(f[w]);
          _.startEventListeners(
            function (t, e) {
              if ("resize" == t.method) {
                var i = t.height,
                  r = typeof i;
                ("number" === r || ("string" === r && !isNaN(i))) &&
                  (t.height += "px"),
                  (e.style.height = t.height);
              } else
                "customerAnalytics" === t.method
                  ? (delete t.method,
                    delete t.sender,
                    (function (t) {
                      window.Flourish &&
                        window.Flourish._analytics_listeners.forEach(function (
                          e
                        ) {
                          e(t);
                        });
                    })(t))
                  : "scrolly" === t.method && _.createScrolly(e, t.slides);
            },
            ["resize", "customerAnalytics", "scrolly"],
            window.Flourish && window.Flourish.embed_domain
          );
          for (w = 0; w < t.length; w++) k(t[w]);
          window.Flourish && (window.Flourish.loadEmbed = k);
        }
      }
      window.Flourish &&
        ((window.Flourish.loadEmbed = function (e) {
          t.push(e);
        }),
        (window.Flourish.addAnalyticsListener = o),
        (window.Flourish.removeAnalyticsListener = a),
        window.Flourish._analytics_listeners ||
          (window.Flourish._analytics_listeners = [])),
        "loading" === document.readyState
          ? document.addEventListener("DOMContentLoaded", i)
          : i();
    })();
  })();
//# sourceMappingURL=embed.js.map
