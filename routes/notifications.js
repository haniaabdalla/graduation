import express from "express";

let router = express.Router();
import Notificationsmodel from "../models/notifications.js";

router.route("/notify").post(async (req, res) => {
    const user_id = req.body.user_id;
    const usernotification = await Notificationsmodel.find({ user_id: user_id });
    res.send(usernotification);
});
router.route("/notifyall").get(async (req, res) => {
    const usernotification = await Notificationsmodel.find({ user_id: null });
    res.send(usernotification);
});

export default router;