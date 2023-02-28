const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
function Server() {
  const URI = process.env.URL;
  mongoose.connect(URI).then(() => {
    console.log("Connected to DB");
  });
}
module.exports = Server;
