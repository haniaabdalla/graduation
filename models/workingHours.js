import mongoose from "mongoose";
const Schema = mongoose.Schema;

const workingHoursSchema = new Schema({
    day: {
        type: String,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
		ref: 'services'
    }

});
const WorkingHours = mongoose.model("workingHours", workingHoursSchema);

export default WorkingHours;
