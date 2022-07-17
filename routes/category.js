import express from "express";

let router = express.Router();
import CategoryModel from "../models/category.js";

router.route("/add_category").post(async (req, res) => {
    const name = req.body.name;
    const newCategory = new CategoryModel({
        name: name
    })
    await newCategory.save();
    console.log(req.session)
    res.send(newCategory);
});

router.route("/").get(async (req, res) => {
    const categories = await CategoryModel.find();
    res.send(categories);
});

router.route("/delete").post(async (req, res) => {
    const id = req.body.id;
    await CategoryModel.findByIdAndDelete(id);
});
export default router;