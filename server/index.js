const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "form",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const uname = req.body.uname;
  const password = req.body.password;
  const sqlInsert = "INSERT INTO login ( uname, password) VALUES (?,?)";
  db.query(sqlInsert, [uname, password], (err, result) => {
    console.log(result);
  });
});

app.get("/api", (req, res) => {
  const sqlSelect = "SELECT * FROM login";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete", (req, res) => {
  const password = req.body.password;

  const sqlDelete = "DELETE FROM login WHERE password = ?";

  db.query(sqlDelete, password, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while deleting data." });
    } else {
      res.status(200).json({ message: "Data deleted successfully." });
    }
  });
});

app.put("/api/update", (req, res) => {
  const uname = req.body.uname;
  const password = req.body.password;

  const sql = "UPDATE login SET password = ? WHERE uname = ?";

  db.query(sql, [password, uname], (error, results) => {
    console.log(results);
    if (error) {
      console.error("Error updating password: " + error.message);
      res.status(500).send("Error updating password");
      return;
    }
    console.log(`Updated password for ${password}`);
    res.status(200).send("Password updated successfully");
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
