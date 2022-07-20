import express from "express";

let router = express.Router();
import hoursModel from "../models/workingHours.js";

router.route("/add_hours").post(async (req, res) => {
    const id = req.body.id;
    const day = req.body.day;
    const from = req.body.from;
    const to = req.body.to;
    const hours = await hoursModel.findOne({ service_id: id, day: day });
    if (hours) {
        await hoursModel.findByIdAndUpdate(hours.id, { from: from, to: to }).exec();
    }
    else {
        const newHours = new hoursModel({
            day: day,
            from: from,
            to: to,
            service_id: id
        })
        await newHours.save();
        res.send(newHours);
    }
});

router.route("/delete").delete(async (req, res) => {
    const id = req.body.id;
    const day = req.body.day;
    const hours = await hoursModel.find({ service_id: id, day: day });
    await hoursModel.findByIdAndDelete(hours.id);
});

router.route("/view").post(async (req, res) => {
    const id = req.body.id;
    const hours = await hoursModel.find({ service_id: id });
    res.send(hours);
});
export default router;
