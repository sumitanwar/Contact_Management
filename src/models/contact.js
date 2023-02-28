const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isemail");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ContactSchema = new Schema({
  firstName: { type: String, required: [true, "Please Enter First Name"] },
  lastName: { type: String, required: [true, "Please Enter Last Name"] },
  email: {
    type: String,
    required: [true, "Please Enter Email Id"],
    unique: [true, "Email Id is Already Exist"],
    validate: [validator.isEmail],
  },
  phone: {
    type: String,
    required: [true, "Phone Number must be there"],
    unique: [true, "This is Phone Number is Already Exist"],
    minLength: [10, "Phone Number should have 10 digits"],
    maxLength: [10, "Phone Number should have 10 digits"],
  },
});

const ContactColl = mongoose.model("contacts", ContactSchema);
module.exports = ContactColl;
