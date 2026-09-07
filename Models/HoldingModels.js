const { model } = require("mongoose");

const { HoldingSchema } = require("../Schema/HoldingSchema.js");

const HoldingModels = model("holding", HoldingSchema);

module.exports = { HoldingModels };