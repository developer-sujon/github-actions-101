const express = require("express");
const path = require("path");

const app = express();

app.get("/test", (req, res) => {
  res.send("Action runner");
});

app.get("/api/v1/user", (req, res) => {
  res.json({
    success: true,
    message: "User fetched",
    user: {
      fullname: "Muhammad Sujon",
      phone: "+8801772703036",
      company: "Shunno IT",
    },
  });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = 8080;
app.listen(port, () => console.log(`App listening port ${port}`));
