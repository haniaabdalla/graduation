import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }

});
const Category = mongoose.model("categories", categorySchema);

export default Category;