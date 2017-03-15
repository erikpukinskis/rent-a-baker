var library = require("module-library")(require)

module.exports = library.export(
  "issue-bond",
  ["identifiable"],
  function(identifiable) {

    var bonds = {}

    // Shares and share orders are indexed together:
    var shares = {}
    var orders = {}

    // Above $1,000,000 total sales we have to file this? https://www.sec.gov/about/forms/forms-1.pdf

    function issueBond(tasks) {

      var bond = {
        shares: [],
        paid: 0,
      }

      if (!bond.id) {
        identifiable.assignId(bonds, bond)
      }

      tasks.forEach(function(text) {
        issueBond.task(bond.id, text)
      })

      bonds[bond.id] = bond

      return bond
    }

    function orderShares(id, name, phoneNumber, bondId, faceValue) {

      var order = {
        id: id,
        purchaserName: name,
        phoneNumber: phoneNumber,
        bondId: bondId,
        faceValue: faceValue,
        isPaid: false,
      }

      if (!id) {
        identifiable.assignId(shares, order)
      }

      orders[order.id] = order

      return order
    }

    function markPaid(orderId, price, signature) {
      var order = getOrder(orderId)
      var bond = getBond(order.bondId)

      if (order.isPaid) {
        throw new Error("Order is already paid")
      }

      order.isPaid = true
      order.paid = price
      bond.shares.push(orderId)
      bond.paid += price
      console.log(bond.paid, "paid on bond")
    }

    var tasksByTag = {}
    var tasksByBondId = {}

    issueBond.task = function addTask(bondId, text, tags) {
      if (!tasksByBondId[bondId]) {
        tasksByBondId[bondId] = []
      }
      tasksByBondId[bondId].push(text)

      if (!tags) { return }

      tags.forEach(function(tag) {
        tag = bondId+"/"+tag
        if (!tasksByTag[tag]) {tasksByTag[tag] = []
        }
        tasksByTag[tag].push(text)
      })
    }

    issueBond.getTasks = function getTasks(bondId) {
      if (bondId.id) {
        bondId = bondId.id
      }
      return tasksByBondId[bondId] || []
    }

    issueBond.eachTaskTagged = function eachTaskTagged(bondId, tag, callback) {
      tasksByTag[bondId+"/"+tag].forEach(callback)
    }

    issueBond.expense = function addExpense(bondId, description, amount) {
      
    }

    var getBond = issueBond.get = identifiable.getFrom(bonds, {description: "bond"})

    issueBond.order = orderShares

    var getOrder = issueBond.getOrder = identifiable.getFrom(orders, {description: "bond share order"})

    issueBond.markPaid = markPaid

    return issueBond
  }
)