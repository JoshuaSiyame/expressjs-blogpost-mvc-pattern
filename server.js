// import modules/packages
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const logger = require("morgan");
const bodyParser = require("body-parser");

// import routes
const appRoutes = require("./routes/routes");

// dotenv configuration
dotenv.config();

// mongodb configuration
mongoose.set("strict", true);
if(process.env.MODE === "development"){
    console.log(`MODE: ${process.env.MODE}`);
    mongoose.connect(process.env.MONGODB_URI_DEV).then(()=>{
        console.log("Connected to the database successfully");
    }).catch((err)=>{
        console.error("Failed to connect to Database", err);
    });
}else{
    console.log(`MODE: ${process.env.MODE}`);
    mongoose.connect(process.env.MONGODB_URI_PROD).then(()=>{
        console.log("Connected to the database successfully");
    }).catch((err)=>{
        console.error("Failed to connect to Database", err);
    });
}

// app instance
const app = express();

// app configurations
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes configuration
app.use("/", appRoutes);

// server instance
const server = http.createServer(app);

server.listen(process.env.PORT, ()=>{
    console.log(`Server listening on port: ${process.env.PORT}`);
});