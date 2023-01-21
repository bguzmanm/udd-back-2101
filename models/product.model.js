const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({

  name: {
    type: String,
    require: [true, "Product name is required"],
    minlength: [5, 'Minimum name length 5 character'],
    maxlength: [50, 'Maximum name length 50 character']
  },
  status: {
    type: String,
    enum: ['Available', 'No Stock', 'Descontinuado']
  },
  quantity: {
    type: Number,
    min: [0, 'Minimum quantity is zero'],
    max: [1000, 'Maximum quantity is 1000']
  },
  img: {
    type: String,
    require: false,
    default: "/public/images/productDefault.png"
  },


});