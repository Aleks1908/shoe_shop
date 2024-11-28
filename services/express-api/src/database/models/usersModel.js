import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: {type: String, required: true},
    password:  {type: String, required: true},
    favorites: {type: Array, default: []}
});

userSchema.index({user_name: 1}, {unique: true});

const userModel = new model("User", userSchema);

export default userModel;


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_name
 *         - password
 *       properties:
 *         user_name:
 *           type: string
 *           description: The unique username of the user.
 *         password:
 *           type: string
 *           description: The user's password.
 *         favorites:
 *           type: array
 *           items:
 *             type: string
 *           description: List of the user's favorite items.
 *       example:
 *         user_name: "testUser"
 *         password: "testPassword"
 *         favorites: ["item1", "item2"]
 * 
 *     UniqueIndexes:
 *       properties:
 *         user_name: 
 *           description: "The `user_name` field is unique for each user."
 *           type: "string"
 */
