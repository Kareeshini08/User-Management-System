const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sukh!5011",
    database: "user"
})

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get("/GET/users", (req, res) => {
    const sqlGet = "SELECT * FROM users";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/POST/users", (req, res) => {
    const { name, email, phone } = req.body;
    const sqlInsert = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, phone], (error, result) => {
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/DELETE/users/:id", (req, res) => {
    const { id } = req.params;
    const sqlDelete = "DELETE FROM users WHERE id=?";
    db.query(sqlDelete, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/GET/users/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM users WHERE id=?";
    db.query(sqlGet, id, (error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/PUT/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const sqlUpdate = "UPDATE users SET name = ?, email = ?, phone=? WHERE id = ?";
    db.query(sqlUpdate, [name, email, phone, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    // const sql = "INSERT INTO users (name, email, phone) VALUES ('john', 'john@gmail.com', 9564347865)";
    // db.query(sql, (error, result) => {
    //     console.log(error)
    //     console.log(result);
    //     res.send("Hello");
    // });
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})