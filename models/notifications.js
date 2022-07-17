import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    notification: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
    }

});
const Notification = mongoose.model("notifications", notificationSchema);

export default Notification;