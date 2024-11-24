import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: { type: String, unique: true, required: true},
    password:  {type: String, required: true},
    favorites: {type: Array, default: []}
});

const userModel = new model("User", userSchema);

export default userModel; 