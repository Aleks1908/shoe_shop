import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: { type: String, unique: true},
    password: String, 
    favorites: Array,
});

const userModel = new model("User", userSchema);

export default userModel; 