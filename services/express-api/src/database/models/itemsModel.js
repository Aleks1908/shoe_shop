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



/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - price
 *         - image
 *         - category
 *         - color
 *         - stars
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the item.
 *         name:
 *           type: string
 *           description: Name of the item.
 *         description:
 *           type: string
 *           description: Detailed description of the item.
 *         price:
 *           type: number
 *           description: Price of the item.
 *         image:
 *           type: string
 *           description: Path to the image file for the item.
 *         category:
 *           type: string
 *           description: Category under which the item falls (e.g., shoes, accessories).
 *         color:
 *           type: string
 *           description: Color of the item.
 *         stars:
 *           type: number
 *           description: Rating of the item (out of 5 stars).
 */
