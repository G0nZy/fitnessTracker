
const express = require("express");
const mongoose = require("mongoose");
const db = require("./models");


const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

        app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})
// })