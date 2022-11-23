const express = require("express");
const app = express();
const port = 8000;

app.use(function (req, res, next) {
  console.log("Start");
  next();
});

app.use("/", function (req, res) {
    console.log("End");
  });
  
//Route handler
app.get("/", function (req, res, next) {
  res.send("Middle");
  next();
});

app.listen(port, () => {
  console.log(`listen port at ${port}`);
});
