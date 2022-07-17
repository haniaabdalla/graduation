import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    review: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'services'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
    }
});
const Rating = mongoose.model("ratings", ratingSchema);

export default Rating;