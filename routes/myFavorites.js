import express from "express";

let router = express.Router();
import ServiceModel from "../models/service.js";
import UserModel from "../models/user.js";
import myFavoritesModel from "../models/myFavorites.js"

router.route("/add_favorite").post(async (req, res) => {
    const user_id = req.body.user_id;
    const user = await UserModel.findById(user_id);
    const service_id = req.body.service_id;
    const service = await ServiceModel.findById(service_id);
    const name = service.name;
    const image = service.image;
    const fav = await myFavoritesModel.findOne({ user_id: user_id, service_id: service_id });
    if (user.type == "Customer") {
        if (fav) {
            res.send(fav);
        }
        else {
            const newFavorite = new myFavoritesModel({
                user_id: user_id,
                service_id: service_id,
                service_name: name,
                service_image: image
            })
            await newFavorite.save();
            res.send(newFavorite);
        }
    }
    else {
        res.send("Cannot add favorite.");
    }
});

router.route("/deleteFavorite").post(async (req, res) => {
    const id = req.body.id;
    await myFavoritesModel.findByIdAndDelete(id);
});

router.route("/view_favorites").post(async (req, res) => {
    const id = req.body.id;
    const allFavorites = await myFavoritesModel.find({ user_id: id });
    if (allFavorites) {
        res.send(allFavorites);
    }
});
export default router;