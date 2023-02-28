const ContactColl = require("../models/contact");

// Creating Contacts
exports.AddContact = async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;
  if (!firstName || !lastName || !email || !phone) {
    return res.status(403).json({
      success: false,
      message: "firstName,lastName,email,phone are mandatory",
    });
  }
  let contact = await ContactColl.findOne({ email });
  if (contact) {
    return res.status(403).json({
      success: false,
      message: "This email is Already Exist",
    });
  }
  contact = await ContactColl.findOne({ phone });
  if (contact) {
    return res.status(403).json({
      success: false,
      message: "This Phone Number is Already Exist",
    });
  }
  contact = await ContactColl.create(req.body);
  const totalContacts = await ContactColl.countDocuments();
  try {
    res
      .status(200)
      .json({ success: true, message: "Contact added Successfully", contact });
  } catch (err) {
    res
      .status(403)
      .json({ success: false, message: err.message, totalContacts });
  }
};

// Getting All Contacts
exports.GetContacts = async (req, res, next) => {
  const contact = await ContactColl.find(req.body);
  const totalContacts = await ContactColl.countDocuments();
  try {
    res.status(200).json({ success: true, contact, totalContacts });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

// Getting A Specific Contact
exports.GetSingleContact = async (req, res, next) => {
  const contact = await ContactColl.findOne(req.params.id);
  const totalContacts = await ContactColl.countDocuments();
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  try {
    res.status(200).json({ success: true, contact, totalContacts });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
//Updating A specific Contact by Giving all Fields
exports.UpdateContact = async (req, res, next) => {
  let contact = await ContactColl.findById({ _id: req.params.id });
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  contact = await ContactColl.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  try {
    res.status(200).json({
      success: true,
      message: "Contact Updated Successfully",
      contact,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

//Updating A specific Contact by Giving only Specific Updates
exports.UpdateSpecificFields = async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;
  let contact = await ContactColl.findById({ _id: req.params.id });
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  contact = await ContactColl.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: false,
  });

  try {
    res.status(200).json({
      success: true,
      message: "Contact Updated Successfully",
      contact,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
//Deleting a specific Contact
exports.DeleteContact = async (req, res, next) => {
  const { firstName, lastName, email, phone } = req.body;
  let contact = await ContactColl.findById({ _id: req.params.id });
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: `There is no contact with id: ${req.params.id}`,
    });
  }
  contact = await ContactColl.findByIdAndDelete(req.params.id);
  const totalContacts = await ContactColl.countDocuments();
  try {
    res.status(200).json({
      success: true,
      message: "Contact Deleted Successfully",
      totalContacts,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};
