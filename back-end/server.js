const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

mongoose.connect('mongodb+srv://pranavkkeloth:8RPvIlF3g1OrE4mA@quiz-app.bpk2g.mongodb.net/quiz')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const questionSchema = new mongoose.Schema({
  category: String,
  title: String,
  options: [String],
  correctAnswer: Number,
  explanation: String,
});

const Question = mongoose.model("Question", questionSchema);

// GET API to fetch questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST API to add new questions
app.post("/api/questions", async (req, res) => {
  try {
    const questionData = req.body;

    // Validate that the request body is an array
    if (!Array.isArray(questionData)) {
      return res.status(400).json({ error: "Invalid data format. Expected an array of questions." });
    }

    // Insert the questions into the database
    const questions = await Question.insertMany(questionData);
    res.status(201).json({ message: "Questions added successfully!", questions });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
