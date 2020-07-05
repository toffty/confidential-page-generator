import mongoose from "mongoose";



const PageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    password: String,
    content: String,
    openings: Number,
    lifetime: Number
    },
    {
        timestamps: true
    }
);

const PageModel = mongoose.model("Page",PageSchema)

export default PageModel;