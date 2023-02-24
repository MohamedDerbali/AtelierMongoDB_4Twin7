const contactModel = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  try {
    const { search } = req.query;
    const contacts = !search
      ? await contactModel.find()
      : await contactModel.find({ fullName: search });
    if (!contacts || contacts.length === 0) {
      throw new Error("contacts not found!");
    }
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { fullName, phone } = req.body;
    const addedContact = await contactModel.create({ fullName, phone });
    if (!addedContact) {
      throw new Error("error while adding contact in the DB!");
    }
    res.json(addedContact);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { fullName, phone } = req.body;
    const { contactId } = req.params;
    if (!fullName || !phone || !contactId) {
      throw new Error("please verify your entries!");
    }
    const updatedContact = await contactModel.findByIdAndUpdate(
      contactId,
      {
        $set: { fullName, phone },
      },
      { new: true }
    );
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const checkIfContactExist = await contactModel.findById(contactId);
    if (!checkIfContactExist) {
      throw new Error("contact not found");
    }
    await contactModel.findByIdAndDelete(contactId);
    res.json("contact deleted!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
module.exports = {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
};
