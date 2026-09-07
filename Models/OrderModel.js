const { model } = require("mongoose");

const { OrderSchema } = require("../Schema/OrderSchema.js");

const OrderModel = model("order", OrderSchema);

module.exports = { OrderModel };