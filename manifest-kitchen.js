var library = require("module-library")(require)


library.define(
  "manifest-kitchen",
  ["issue-bond", "sell-bond"],
  function(issueBond, sellBond) {

    var bond = issueBond(
      "kitchen",
      {"rateOfReturn": "10%",  "termLength": "60 days"}
    )

    bond.buy([
      "50 lb bag of flour",
      "Toaster oven",
      "Card table",
      "2 chairs",
      "Extension cord",
      "2 fermentation tubs",
      "Sourdough starter",
      "Salt",
      "Wooden box",
      "2 gallons water",
      "Can of chickpeas",
      "Parsley",
      "Garlic",
      "Tahini",
      "Onion",
      "Olive oil",
      "Cornmeal",
      "Electric burner",
      "Pot",
      "Power strip",
      "Tongs, bowl, silicone spatula",
      "Hand washing station",
    ])

    bond.tasks([
      "Go to the nearest homeless encampment",
      "Be nice",
      "Set up somewhere",
      "Make poulish",
      "Make dough",
      "Make falafel sandwich",
    ])

    // begin

    return sellBond(bond)
  }
)


library.define(
  "sell-bond",
  ["web-element"],
  function(element) {
    return function(bond) { 
      return function(bridge) {
        var page = element([
          element("h2", element.style({"text-transform": "capitalize"}), "Buy "+bond.id+ " bond"),
          element("p", bond.rateOfReturn+" return in "+bond.termLength+" (estimated)"),
          element(".button", "Buy")
        ])

        bridge.send(page)
      }
    }

    // 25% goes to hourly pay for people like me and Bobby
    // 10% goes to bond holders
    // Any excess from arbitrage goes to good will bonds:
    //   Housing for new employees
    //   Food budget
    //   Community projects

  }
)




library.using(
  ["web-host", "show-source", library.ref()],
  function collectiveMagic(host, showSource, lib) {

    host.onRequest(function(getBridge) {
      var bridge = getBridge()

      showSource(bridge, "manifest-kitchen", lib)

    })
  }
)



























// EXAMPLE_FUNCTION = function foo() {
//   bless(this,
//     "house"
//   )
//   upTo(1, house)
// }

