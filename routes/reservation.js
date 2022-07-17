import express from "express";

let router = express.Router();
import ReservationModel from "../models/reservation.js";
import UserModel from "../models/user.js"
import ServiceModel from "../models/service.js"
import hoursModel from "../models/workingHours.js";

router.route("/add_reservation").post(async (req, res) => {
    const start_date = req.body.start_date
    const end_date = req.body.end_date;
    const from = req.body.from;
    const to = req.body.to;
    const user_id = req.body.user_id;
    const service_id = req.body.service_id;
    const service = await ServiceModel.findById(service_id)
    const total_price = service.price - (service.price * service.discount);
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekday[new Date(start_date).getDay()]
    const hours = await hoursModel.findOne({ service_id: service_id, day: day });
    const reservation = await ReservationModel.findOne({ service_id: service_id, start_date: start_date, from: from, to: to });
    if (hours) {
        if (from > hours.from && to < hours.to) {
            if (!reservation) {
                const newReservation = new ReservationModel({
                    start_date: start_date,
                    end_date: end_date,
                    from: from,
                    to: to,
                    total_price: total_price,
                    user_id: user_id,
                    service_id: service_id
                })
                await newReservation.save();
                res.send(newReservation);
            }
        }
    }
});

router.route("/view_reservation").post(async (req, res) => {
    const id = req.body.id;
    const reservation = await ReservationModel.findById(id);
    res.send(reservation);
});

router.route("/view_history").post(async (req, res) => {
    const id = req.body.id;
    const allReservation = await ReservationModel.find({ user_id: id, status: 1 });
    res.send(allReservation);
});

router.route("/view_upcoming_reservation").post(async (req, res) => {
    const id = req.body.id;
    const allReservation = await ReservationModel.find({ user_id: id, status: 0 });
    res.send(allReservation);
});

router.route("/update_reservation").put(async (req, res) => {
    const id = req.body.id;
    const start_date = req.body.start_date
    const end_date = req.body.end_date;
    const from = req.body.from;
    const to = req.body.to;
    await ReservationModel.findByIdAndUpdate(id, { start_date: start_date, end_date: end_date, from: from, to: to }).exec();
});

router.route("/delete_reservation").post(async (req, res) => {
    const id = req.body.id;
    await ReservationModel.findByIdAndDelete(id);
});

router.route("/view_reservations").post(async (req, res) => {
    const id = req.body.id;
    const user = await UserModel.findById(id)
    const serviceid = req.body.serviceid;
    if (user.type == "Service Provider") {
        const reservations = await ReservationModel.find({ service_id: serviceid });
        if (!reservations) {
            res.send("No reservations")
        }
        else {
            res.send(reservations)
        }
    }
    else {
        res.send("You cannot view the reservations.")
    }
});

export default router;