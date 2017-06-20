var library = require("module-library")(require)

library.define(
  "code",
  ["web-host", "web-element", "basic-styles"],
  function(host, element, basicStyles) {
    host.onRequest(function(getBridge) {
      var bridge = getBridge()
      basicStyles.addTo(bridge)
      var stylesheet = element.stylesheet([
        element.style("textarea", {
          "display": "inline-block",
          "font-family": "sans-serif",
          "max-width": "20em",
          "padding": "0",
          "font-size": "23px",
          "line-height": "30px",
          "width": "100%",
          "border": "0",
          "background": "#fcf6ff",
          "color": "#95a7b1",
          "margin": "0",
          "box-shadow": "none",
        }),

        element.style(".timeline", {
          "width": "30px",
          "display": "inline-block",
          "vertical-align": "top",
        }),

        element.style(".statement", {
          "margin-bottom": "5px",
          "width": "25px",
          "height": "25px",
          "background": "#ecf0fb",
        }),

        element.style(".statement.is-function", {
          "background": "#bfd",
        }),

        element.style(".statement.two-line", {
          "margin-bottom": "35px",
        }),

        element.style(".statement.is-empty", {
          "background": "#fcf6ff",
        })
      ])

      var code = [
"only easy things allowed in here",
"",
"function today",
"mow #x10",
"mulch",
"plant",
"",
"function plant",
"bag",
"soil #✓",
"seed",
"issueBond",
"",
"function watershed",
"$50",
"roll two 2x4s into 8x16 tarp",
"dig pond, build watershed, lay tarp",
"pavers and mortar, build compost basin",
"pond pours off into compost pile, which drains into irrigation pit",
"bucket for bringing water up to irrigation ditch",
]

      var timeline = element(".timeline")

      for(var i=0; i<code.length; i++) {
        var statement = code[i]
        var el = element(".statement")
        if (i == 18) {
          el.addSelector(".two-line")
        }
        if (statement.substr(0, 8) == "function") {
          el.addSelector(".is-function")
        }
        timeline.addChild(el)
      }

      var buyButton = element("button", "Buy $50 Bond")

      var form = element([
        stylesheet,
        element("p", "Unbonded ", buyButton),
        timeline,
        element(
          "textarea",
          code.join("\n"),
          element.style({
            "height": ((code.length+1)*30)+"px",
          })
        ),
      ])

      bridge.send(form)
    })

    return {}
  }
)

library.using(["code"], function() {
  return {}
})