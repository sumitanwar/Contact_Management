const express = require("express");
const bodyParser = require("body-parser");
const Server = require("./src/config/server");
const ContactRouter = require("./src/routes/contactRoutes.js");
require("dotenv").config({ path: "./src/config/config.env" });
const Port = process.env.PORT || 8000;
Server();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use("/v1", ContactRouter);
app.get("/", async (req, res, next) => {
  res.status(404).json({ success: false, message: "Page Not Found" });
});
app.listen(Port, () => {
  console.log(`Server is Connected to Port ${Port}`);
});
