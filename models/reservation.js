import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: 0,
    },
    total_price: {
        type: Number,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'services'
    },
},
{ timestamps: true }
);
const Reservation = mongoose.model("reservations", reservationSchema);

export default Reservation;