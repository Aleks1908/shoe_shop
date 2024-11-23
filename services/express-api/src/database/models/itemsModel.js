import { Schema, model } from "mongoose";

const itemSchema = new Schema({
    id: Number, 
    name: String, 
    description: String, 
    price: Number,
    image: String, 
    category: String, 
    color: String,
    stars: Number
});

const itemModel = new model("Item", itemSchema);

export default itemModel; 