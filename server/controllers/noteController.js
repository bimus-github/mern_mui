const Note = require("../models/noteModel");
const mongoose = require("mongoose");

// get all notes
const getNotes = async (req, res) => {
  const user_id = req.user._id;
  const notes = await Note.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(notes);
};

// get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such note" });
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// create a new note
const createNote = async (req, res) => {
  const { title, category, details, type } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!details) {
    emptyFields.push("details");
  }
  if (!type) {
    emptyFields.push("type");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const user_id = req.user._id;
    const note = await Note.create({ title, category, details, user_id, type });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// update a note
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such note" });
  }

  const note = await Note.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!note) {
    return res.status(400).json({ error: "No such note" });
  }

  res.status(200).json(note);
};

// get all publik notes
const getPublikNotes = async (req, res) => {
  const notes = await Note.find({ type: "public" }).sort({ createdAt: -1 });

  res.status(200).json(notes);
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getPublikNotes,
};
