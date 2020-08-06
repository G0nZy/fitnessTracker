//moduels
const mongoose = require("mongoose");
const db = require("../models");

//moment
const moment = require("moment");

//api routes
module.exports = function (app) {
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            });
    });

    app.post("/api/workouts", function (req, res) {
        db.Workout.create({}).then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        });
    });

    app.put("/api/workouts/:id", async function (req, res) {
        const thisWorkout = await db.Workout.findById(req.params.id);
        let totalDur = thisWorkout.totalDuration += req.body.duration;

        db.Exercise.create(req.body).then(({ _id }) => {
            
            db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: _id }, $set: { totalDuration: totalDur } }, { new: true })
                .then(dbWorkout => {
                    res.json(dbWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
        });
    });

    app.get("/api/workouts/range", function (req, res) {

        let today = moment().day(); 
        const startDay = new Date(moment().subtract(today, 'd').startOf('day').toISOString());
        
                console.log(startDay);
        console.log(startDay instanceof Date);
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                const data = dbWorkout.filter(document => document.day >= startDay);
                console.log(data);
                res.json(data);
            });
    });
}

