const { model } = require("mongoose");

const { PositionSchema } = require("../Schema/PositionSchema");

const PositionModels = model("position", PositionSchema);

module.exports = { PositionModels };