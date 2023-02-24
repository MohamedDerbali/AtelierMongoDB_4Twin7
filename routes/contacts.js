const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactsController");
const validate = require("../middlewares/validate");
router.get("/", getAllContacts);
router.post(
  "/",
  validate,
  addContact
);
router.put("/:contactId", updateContact);
router.delete("/:contactId", deleteContact);
module.exports = router;
