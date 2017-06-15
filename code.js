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
          "height": "300px",
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

        element.style(".statement.two-line", {
          "margin-bottom": "35px",
        }),

        element.style(".statement.is-empty", {
          "background": "#fcf6ff",
        })
      ])

      var code = [
"define watershed",
"  roll two 2x4s into 8x16 tarp",
"  dig pond, build watershed, lay tarp",
"  pavers and mortar, build compost basin",
"  pond pours off into compost pile, which drains into irrigation pit",
"  bucket for bringing water up to irrigation ditch",
]

      var timeline = element(".timeline", [
        element(".statement"),
        element(".statement"),
        element(".statement"),
        element(".statement"),
        element(".statement.two-line"),
        element(".statement.two-line"),
        element(".statement.is-empty"),
        element(".statement.is-empty"),
      ])

      var buyButton = element("button", "Buy $50 Bond")

      var form = element([
        stylesheet,
        element("p", "Unbonded ", buyButton),
        timeline,
        element("textarea", code.join("\n")),
      ])

      bridge.send(form)
    })

    return {}
  }
)

library.using(["code"], function() {
  return {}
})