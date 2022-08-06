const express = require("express");
const urlRouter = require("./routes/urlRoutes");
const AppError = require("./utils/appError");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Initialise Routes
app.use("/", urlRouter);
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on server...`, 404));
});

module.exports = app;
