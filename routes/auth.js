import express from "express";

let router = express.Router();
import UserModel from "../models/user.js";
import NotificationModel from "../models/notifications.js";
import ServiceModel from "../models/service.js"
var session;

router.route("/register").post(async (req, res) => {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: email, });
    if (user) {
        res.send("Email already exists.");
    }
    else {
        const password = req.body.password;
        const name = req.body.name;
        const phone = req.body.phone;
        const type = req.body.type;
        const bank_number = req.body.bank_number;
        const image = req.body.image;
        const newUser = new UserModel({
            email: email,
            password: password,
            name: name,
            phone: phone,
            type: type,
            bank_number: bank_number,
            image: image
        })
        await newUser.save();
        res.send(newUser);
    }
});

router.route('/login').post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({ email: email, password: password });
    if (user) {
        session = req.session;
        session.userid = user.id;
        res.send(session.userid);
    } else {
        res.send("Email or password isn't correct.");
    }
});

router.route("/roles").post(async (req, res) => {
    const id = req.body.id;
    const type = await UserModel.findById(id)
    const role = type.type
    res.send(role)
})
router.route("/info").post(async (req, res) => {
    const id = req.body.id;
    const user = await UserModel.findById(id)
    res.send(user)
})
router.route("/admins").get(async (req, res) => {
    const user = await UserModel.find({ type: 'Admin' })
    res.send(user)
})

router.route("/allCustomers").get(async (req, res) => {
    const user = await UserModel.find({ type: "Customer" })
    res.send(user)
})

router.route("/allProviders").get(async (req, res) => {
    const user = await UserModel.find({ type: "Service Provider" })
    res.send(user)
})

router.route("/update_user").post(async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    await UserModel.findByIdAndUpdate(id, { name: name }).exec();
});

router.route("/update_loyalty").post(async (req, res) => {
    const customer_id = req.body.customer_id;
    await UserModel.findByIdAndUpdate(customer_id, { customer_loyalty: true }).exec();
    const newNot = new NotificationModel({
        notification: "You now have a golden customer badge.",
        user_id: customer_id
    })
    await newNot.save();
    res.send("Badge Earned")
});
router.route("/remove_loyalty").post(async (req, res) => {
    const customer_id = req.body.customer_id;
    await UserModel.findByIdAndUpdate(customer_id, { customer_loyalty: false }).exec();
    res.send("Badge Removed")
});
router.route("/delete_user").post(async (req, res) => {
    const id = req.body.id;
    await UserModel.findByIdAndDelete(id);
    await ServiceModel.deleteMany({ user_id: id })
});

export default router;