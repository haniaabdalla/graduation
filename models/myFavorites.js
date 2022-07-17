import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'services'
    },
    service_name: {
        type: String,
		ref: 'services'
    },
    service_image: {
        type: String,
		ref: 'services'
    }

});
const Favorite = mongoose.model("favorites", favoriteSchema);

export default Favorite;