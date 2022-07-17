import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from './routes/auth.js'
import serviceRoute from './routes/service.js'
import categoryRoute from './routes/category.js'
import hoursRoute from './routes/workingHours.js'
import favRoute from './routes/myFavorites.js'
import notifyRoute from './routes/notifications.js'
import ratingRoute from './routes/ratings.js'
import reservationRoute from './routes/reservation.js'
import payRoute from './routes/payment.js'
import sessions from 'express-session'
import bodyParser from 'body-parser'


const app = express();

const oneDay = 1000 * 60 * 60 * 24;
var session = sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
});

app.use(cors());

app.use(bodyParser.json());

app.use(session);
app.use(express.json());

app.use('/user', userRoute)
app.use('/services', serviceRoute)
app.use('/categories', categoryRoute)
app.use('/hours', hoursRoute)
app.use('/fav', favRoute)
app.use('/notify', notifyRoute)
app.use ('/reservation', reservationRoute)
app.use ('/rating' ,ratingRoute)
app.use ('/pay' ,payRoute)

const DbUrl = "mongodb+srv://grad:grad@cluster.24wbf.mongodb.net/Graduation?retryWrites=true&w=majority"

mongoose
    .connect(DbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connected");
    });

app.listen(5000, () => {
    console.log("Server is running on port 5000!");
})