import express from "express";

let router = express.Router();
import Ratingsmodel from "../models/ratings.js";

router.route("/AddRatingAndReview").post(async (req, res) => {
    const rating = req.body.rating;
    const review = req.body.review;
    const ServiceID = req.body.ServiceID;
    const user_id = req.body.user_id;
    const newRate = new Ratingsmodel({
        rating: rating,
        review: review,
        service_id: ServiceID,
        user_id: user_id
    })
    await newRate.save();
    res.send(newRate);
});

router.route("/ViewRatingsAndReview").post(async (req, res) => {
    const ServiceID = req.body.ServiceID;
    const ratings = await Ratingsmodel.find({ service_id: ServiceID });
    res.send(ratings);
});

router.route("/ViewUserRating").post(async (req, res) => {
    const user_id = req.body.user_id
    const service_id = req.body.service_id
    const ratings = await Ratingsmodel.findOne({ user_id: user_id, service_id: service_id });
    if (ratings) {
        res.send(true)
    } else {
        res.send(false)
    }
})

export default router;