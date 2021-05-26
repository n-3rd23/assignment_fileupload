const express = require("express");
const cors = require('cors')
// const multer = require('multer');
const fileUpload = require('express-fileupload');
// var upload = multer();
const User = require('./models/User');
const File = require('./models/File');

User.hasMany(File);
File.belongsTo(User);

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())

app.get("/", (req, res) => {
  res.send("hurray...");
});

app.use('/upload', require('./routes/uploads'));

app.listen(5000, () => {
  console.log("listening to port 5000...");
});
