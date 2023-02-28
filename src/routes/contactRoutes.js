const express = require("express");
const {
  AddContact,
  GetContacts,
  UpdateContact,
  UpdateSpecificFields,
  DeleteContact,
} = require("../controller/contactController");
const router = express.Router();

router.route("/contacts").post(AddContact);
router.route("/contacts").get(GetContacts);
router.route("/contacts/:id").put(UpdateContact);
router.route("/contacts/:id").patch(UpdateSpecificFields);
router.route("/contacts/:id").delete(DeleteContact);

module.exports = router;
