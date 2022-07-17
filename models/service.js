import mongoose from "mongoose";
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: { 
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: 0,
    },
    address: {
        type: String,
        required: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    category_name: {
        type: String,
		ref: 'categories'
    }

});
const Service = mongoose.model("services", serviceSchema);

export default Service;