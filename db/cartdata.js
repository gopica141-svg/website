const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      image: String
    }
  ]
});

const cartModel=mongoose.model("cart",cartSchema)
module.exports=cartModel

