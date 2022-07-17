import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        minlength: 11,
        required: true,
    },
    type: {
        type: String,
        default: "Customer",
    },
    image: { 
        type: String,
        default: "http://cdn.onlinewebfonts.com/svg/img_329115.png"
    },
    customer_address: {
        type: String,
        required: false,
    },
    customer_loyalty: {
        type: Boolean,
        default: 0,
    },
    bank_number: {
        type: Number,
        default: 0
    }
});
const User = mongoose.model("users", userSchema);

export default User;