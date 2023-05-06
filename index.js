const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { NoticeModel } = require("./models/notice.model");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({
  origin:"*"
}))

app.get("/", (req, res) => {
  res.json("Welcome to notice app backend");
});

//GET request for fetching all notices
app.get("/notices/getnotice", async (req, res) => {
  try {
    const allNotices = await NoticeModel.find();
    res.json(allNotices);
  } catch (error) {
    res.send({ error: "Internal error occurred!" });
    console.log("Error occurred while fetching all notices");
    console.log(error);
  }
});

// POST request for adding a new notice
app.post("/notices/addnotice", async (req, res) => {
  const { author, title, description } = req.body;
  try {
    const newNotice = new NoticeModel({ author, title, description });
    await newNotice.save();
    res.send({ message: "Notice created successfully", notice: newNotice });
  } catch (error) {
    res.send({ error: "Internal error occurred!" });
    console.log("Error occurred while creating notice");
    console.log(error);
  }
});

// PUT request for updating a notice
app.put("/notices/:id", async (req, res) => {
  const { author, title, description } = req.body;
  const id = req.params.id;
  try {
    const updatedNotice = await NoticeModel.findByIdAndUpdate(
      { _id: id },
      { author, title, description },
      { new: true }
    );
    res.send({
      message: `Notice of id:${id} updated successfully`,
      notice: updatedNotice,
    });
  } catch (error) {
    res.send({ error: "Internal error occurred!" });
    console.log("Error occurred while updating the notice");
    console.log(error);
  }
});

// DELETE request for deleting a notice;
app.delete("/notices/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedNotice = await NoticeModel.findByIdAndDelete({ _id: id });
    res.send({
      message: `Notice of id:${id} deleted successfully`,
      notice: deletedNotice,
    });
  } catch (error) {
    res.send({ error: "Internal error occurred!" });
    console.log("Error occurred while deleting the notice");
    console.log(error);
  }
});

app.listen(port, async () => {
  try {
    await connection, console.log("Connected to database");
  } catch (error) {
    console.log("Error occurred while connecting to database");
    console.log(error);
  }
  console.log(`App is running on port http://localhost:${port}`);
});
