import express from "express";

let router = express.Router();
import PaymentModel from "../models/payment.js"

router.route("/pay").post(async (req, res) => {
    const type = req.body.type;
    const total_price = req.body.total_price;
    const res_id = req.body.res_id;
    const bank_number = req.body.bank_number;
    const newPay = new PaymentModel({
        type: type,
        total_price: total_price,
        res_id: res_id,
        bank_number: bank_number
    })
    await newPay.save();
    res.send(newPay);
});

export default router;