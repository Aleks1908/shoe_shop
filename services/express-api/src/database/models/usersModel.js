import { Schema, model } from "mongoose";

const userSchema = new Schema({
    user_name: {type: String, required: true},
    password:  {type: String, required: true},
    favorites: {type: Array, default: []}
});

userSchema.index({user_name: 1}, {unique: true});

const userModel = new model("User", userSchema);

export default userModel;