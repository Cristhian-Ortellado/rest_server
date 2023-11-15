const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"],
    unique:true
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "state is mandatory"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price:{
    type:Number,
    default:0
  },
  category:{
    type:Schema.Types.ObjectId,
    ref:'Category',
    required:true
  },
  description:{type:String},
  available:{type:Boolean,default:true},
  img: {type:String}
});

ProductSchema.methods.toJSON = function () {
  const { _id, __v,state, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

module.exports = model("Product", ProductSchema);
