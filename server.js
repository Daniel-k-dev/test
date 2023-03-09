const express = require("express");
const app = express();
const port = 30000;
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_, res) => {
  let list = ""
  fs.readdirSync(`uploads`).forEach(function (file) {
    list += file
  });
  console.log(list)
  res.render("index");
});

app.get("/download", (_, res) => {
  const file = `${__dirname}/uploads`;
  res.download(file);
  let list = fs.readdirSync(`uploads`).forEach(function (file) {
    console.log(file);
  });
});

app.post("/send", upload.single("avatar"), function (req, res, next) {
  res.redirect("/");
});

app.get("/*", (_, res) => res.redirect("/"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
