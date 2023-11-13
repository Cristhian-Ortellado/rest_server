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

CategorySchema.methods.toJSON = function () {
  const { _id, __v,state, ...category } = this.toObject();
  category.uid = _id;
  return category;
};

module.exports = model("Category", CategorySchema);
