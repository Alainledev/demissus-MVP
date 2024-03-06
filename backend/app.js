require("dotenv").config();
require("./models/connection");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var productCarrefourRouter = require("./routes/productsCarrefour");
var storeCarrefourRouter = require("./routes/storesCarrefour");
var usersRouter = require("./routes/users");
var productsMonoprixRouter = require("./routes/productsMonoprix");
var storesMonoprixRouter = require("./routes/storesMonoprix");
var scrappingRouterAuchan = require("./routes/scrappingAuchan");
var productsRouter = require("./routes/products");

var app = express();

const cors = require("cors")
app.use(cors(
    {origin: '*'}
));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/products-Carrefour", productCarrefourRouter);
app.use("/stores-Carrefour", storeCarrefourRouter);
app.use("/users", usersRouter);
app.use("/products-monoprix", productsMonoprixRouter);
app.use("/stores-monoprix", storesMonoprixRouter);
app.use("/scrappingAuchan", scrappingRouterAuchan);
app.use("/products", productsRouter);

module.exports = app;
