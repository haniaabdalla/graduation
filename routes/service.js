import express from "express";

let router = express.Router();
import ServiceModel from "../models/service.js";
import UserModel from "../models/user.js";
import NotificationModel from "../models/notifications.js";
import searchengine from 'search-engine'

router.route("/propose_service").post(async (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const price = req.body.price;
    const address = req.body.address;
    const category_name = req.body.category_name;
    const user_id = req.body.user_id;
    const user = await UserModel.findById(user_id);
    if (user.type == "Service Provider") {
        const newService = new ServiceModel({
            name: name,
            image: image,
            description: description,
            price: price,
            address: address,
            category_name: category_name,
            user_id: user_id
        })
        await newService.save();
        res.send(newService);
    }
    else {
        res.send("Cannot propose service.");
    }
});

router.route("/").get(async (req, res) => {
    const allServices = await ServiceModel.find({ status: 1 });
    res.send(allServices);
});

router.route("/proposed_services").post(async (req, res) => {
    const allServices = await ServiceModel.find({ status: 0 });
    res.send(allServices);
});

router.route("/find_by_category").post(async (req, res) => {
    const name = req.body.name;
    const allServices = await ServiceModel.find({ category_name: name, status: 1 });
    res.send(allServices);
});

router.route("/proposed_services").put(async (req, res) => {
    const id = req.body.id;
    await ServiceModel.findByIdAndUpdate(id, { status: 1 }).exec();
});

router.route("/change_price").put(async (req, res) => {
    const id = req.body.id;
    const price = req.body.price;
    await ServiceModel.findByIdAndUpdate(id, { price: price }).exec();
});

router.route("/add_discount/").put(async (req, res) => {
    const user_id = req.body.user_id;
    const id = req.body.id;
    const service = await ServiceModel.findById(id)
    const discount = req.body.discount;
    const user = await UserModel.findById(user_id);
    if (user.type == "Service Provider" || user.type == "Admin") {
        await ServiceModel.findByIdAndUpdate(id, { discount: discount }).exec();
        const newNot = new NotificationModel({
            notification: "We now have a discount on " + service.name + "."
        })
        await newNot.save();
        res.send("Discount added")
    }
    else {
        res.send("Cannot add discount")
    }
});

router.route("/view_my_services").post(async (req, res) => {
    const id = req.body.id;
    const allServices = await ServiceModel.find({ user_id: id });
    res.send(allServices);
});

router.route("/service").post(async (req, res) => {
    const id = req.body.id;
    const service = await ServiceModel.findById(id);
    res.send(service);
});

router.route("/delete_service").delete(async (req, res) => {
    const id = req.body.id;
    await ServiceModel.findByIdAndDelete(id);
});

router.route("/search").post(async (req, res) => {
    const serviceName = req.body.serviceName;
    const allServices = await ServiceModel.find({ status: 1 });
    res.send(searchengine(allServices, serviceName))
})

export default router;