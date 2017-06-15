var library = require("module-library")(require)

library.define(
  "code",
  ["web-host", "web-element", "basic-styles"],
  function(host, element, basicStyles) {
    host.onVoxel(function(bridge) {
      basicStyles.addTo(bridge)
      var form = element([
        element("textarea"),
        element("p", "type your code!")
      ])
      bridge.send(form)
    })

    return {}
  }
)

library.using(["code"], function() {
  return {}
})