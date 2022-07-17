import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    total_price: {
        type: Number,
        required: true,
    },
    res_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'reservations'
    },
    bank_number: {
        type: Number,
        ref: 'user'
    }
});
const Payment = mongoose.model("payment", paymentSchema);

export default Payment;