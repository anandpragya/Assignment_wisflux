const mongoose = require("mongoose")

const pizzaSchema = new mongoose.Schema(
  {
    name:{
        type :String,
        require : true
    },
    varients:[],
    crust:[],
    prices :[],
    category : {
        type :String,
        require : true
    },
    image :{
        type :String,
        require : true
    },
    description : {
        type :String,
        require : true
    },
    extraOptions: {
        type: [
          {
            text: { type: String, required: true },
            price: { type: Number, required: true },
          },
        ],
      },
},{timestamps:true}
  );
  
  const pizzaModel = mongoose.model('pizzas', pizzaSchema);
  module.exports = pizzaModel;