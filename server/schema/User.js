import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: 'Username is required',
        unique: true
    } ,
    password:{
        type: String,
        required: 'Password is required'
    } ,

},{
    timestamps: true
    }
);

const UserModel = mongoose.model("User",UserSchema);

export default UserModel;