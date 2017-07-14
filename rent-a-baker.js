var library = require("module-library")(require)

library.define(
  "bake-shit", // fuck this noise
  ["./issue-bond", "web-host", "show-source", "make-it-checkable", "web-element", library.ref()],
  function(issueBond, webHost, showSource, makeItCheckable, webElement, library) {



    // My name is Inigo Montoya. You killed my father. Prepare to die.

    // A love/hate letter to capitalism


    // The piece I was missing in this is that I start by just fucking baking shit. Bake first, ask sales questions later.


    var rentABaker = issueBond([
      "snap rent-a-baker service on Marie's phone",
      "find card table, toaster oven",
      "cut tile to fit toaster oven",
      "bake demo bread",
      "craigslist ad",
    ])

    issueBond.expense(rentABaker,
      "snap labor",
      "$100"
    )
    issueBond.expense(rentABaker,
      "flour",
      "$5"
    )
    issueBond.expense(rentABaker,
      "set up bakery",
      "$10"
    )

    webHost.onVoxel(function(voxel) {
      showSource.prepareSite(voxel.getSite(), library)

      showSource.fromLibrary(
        voxel.below(),
        library,
        "rent-a-baker"
      )

      renderBakerBond(voxel, rentABaker)
    })

    function renderBakerBond(bridge, bondId) {

      var tasks = issueBond.getTasks(bondId)

      var els = tasks.map(
        function(text) {
          var el = webElement()
          el.addChild(text)
          makeItCheckable(el, bridge)
          return el
        }
      )

      bridge.send(els)
    }

    return renderBakerBond
  }
)




library.using(["rent-a-baker"], function(go) {})
