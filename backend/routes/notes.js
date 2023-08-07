const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/getuser");
const { body, validationResult } = require("express-validator");
// Route 1: fetch all notes using: GET "/api/notes/getuser"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
// Route 2: add new note using: POST "/api/notes/createnote"
router.post(
  "/createnote",
  fetchuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be atleat 3 characters"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be atleat 5 characters"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured");
    }
  }
);

// Route 3: update existing note using: PUT "/api/notes/updatenote/:id"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  // Destructure title, description, and tag from req.body
  const { title, description, tag } = req.body;
  try {
    // Create an object to store updated note fields
    const newNote = {};
    //if title, desc, tag are given put them in newNote
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the note to be updated by its ID
    let note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).json("not found");
    }

    // Check if the user making the request is the owner of the note
    if (note.user.toString() !== req.user.id) {
      res.status(401).json("not allowed");
    }

    // Update the note with the new data
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error occured");
  }
});

module.exports = router;
