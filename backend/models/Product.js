const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, default: false },
  dateOfSale: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (date) {
        // Check if the provided date is a valid Date object
        return date instanceof Date && !isNaN(date);
      },
      message: "Invalid date format for dateOfSale",
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
