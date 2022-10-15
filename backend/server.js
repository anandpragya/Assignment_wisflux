//import express from 'express'
const express = require("express");
const mongoose = require("mongoose");
const pizzaModel = require("./models/pizzaModel.js");
const pizzasRoute = require('./routes/pizzaRoute.js');
const userRoute = require('./routes/userRoute.js');
const orderRoute = require('./routes/orderRoute.js');

//Create DB Connection
const MONGODB_URI = 'mongodb+srv://anandpragya752:pragya752!@cluster0.etyowdn.mongodb.net/pizzashop'
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to DB');
}).catch((err) => {
    console.log(err.message);
})


//create port and server
const app = express();
app.use(express.json());
const port = 5000;

app.use('/api/pizzas/', pizzasRoute); ///api/pizzas/getpizzas
app.use('/api/users/', userRoute);
app.use('/api/orders/', orderRoute);

app.get("/", (req, res) => {
    res.send("Server in running!");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});