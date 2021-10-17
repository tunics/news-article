const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
projectData = {};

var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

app.use(express.static("dist"));

/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { get } = require("http");
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});

app.get("/test", function (req, res) {
    res.send(mockAPIResponse);
});

app.post("/addEntry", addEntry);

function addEntry(req, res) {
    newEntry = {
        agreement: req.body.agreement,
        confidence: req.body.confidence,
        irony: req.body.irony,
        subjectivity: req.body.subjectivity,
    };
    projectData = newEntry;
    console.log("posting data: " + projectData);
}

app.get("/addEntry", function (req, res) {
    res.send(projectData);
    console.log("sending data: " + projectData);
});

app.get("/key", function (req, res) {
    const key = {
        key: process.env.API_KEY,
    };
    console.log(key.key);
    res.send(key);
});

console.log(process.env.API_KEY);
