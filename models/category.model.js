const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "Name is mandatory"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Category", CategorySchema);
