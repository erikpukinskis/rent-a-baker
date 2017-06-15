var library = require("module-library")(require)







library.define (
  "build-a-house" , [
  "issue-bond",
  "render-bond" ] ,
  function ( issueBond, renderBond ) {

    var bond = issueBond (
      "floor panel",
      "10% return in 60 days" )

    bond.addTasks ( [
      "cut studs to length" ,
      "cut track to length" ,
      "crimp" ,
      "add sheathing" ,
      "flipsulate" ,
      "add sheathing" ] )

    bond.expense (
      "labor" ,
      "$100" )

    bond.expense (
      "steel studs" ,
      "$20" )

    bond.expense (
      "plywood" ,
      "$10" )

    renderBond (
      bond ) } )






















library.define(
  "render-bond",
  ["web-element", "make-it-checkable", "issue-bond"],
  function(webElement, makeItCheckable, issueBond) {

    function renderHouseBond(bridge, bondId) {

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

    return renderHouseBond
  }
)


library.using(["build-a-house"], function(go) {})
