const express = require("express");

// controllers
const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getPublikNotes,
} = require("../controllers/noteController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// GET all publik notes
router.get("/publicNotes", getPublikNotes);

// require auth for all workout routes
router.use(requireAuth);

// GET all notes
router.get("/", getNotes);

// GET a single note
router.get("/:id", getNote);

// POST a new note
router.post("/", createNote);

// DELETE a note
router.delete("/:id", deleteNote);

// UPDATE a note
router.patch("/:id", updateNote);

module.exports = router;
