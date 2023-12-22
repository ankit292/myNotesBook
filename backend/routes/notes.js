const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");

//Route:1 Get All the Notes using: GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//Route:2 Add a new Notes using: POST "/api/notes/addnotes". login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid  title").isLength({ min: 3 }),
    body("description", "Enter description atleast 5 characters").isLength({
      min: 5,
    }),
    // body("tag", "enter  Password etlist 5 charactors").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // if there are errors, return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
//Route:3 Update an existing Notes using: PUT "/api/notes/updatenote". login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a newNote Object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the notes to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowd");
    }
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
//Route:4 Delete an existing Notes using: DELETE "/api/notes/deletenote". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // const {title, description, tag} = req.body;

  try {
    //find the notes to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowd");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({
      Success: `Note has been delete this id ${req.params.id} `,
      note: note,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
module.exports = router;
