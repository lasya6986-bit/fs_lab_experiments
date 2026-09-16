
const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/register", (req, res) => {

    let users = JSON.parse(fs.readFileSync("users.json"));

    let user = req.body;

    users.push(user);

    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));

    res.json({
        message: "Registration successful"
    });
});


app.post("/login", (req, res) => {

    let users = JSON.parse(fs.readFileSync("users.json"));

    let username = req.body.username;
    let password = req.body.password;

    let user = users.find(
        user => user.username === username && user.password === password
    );

    if(user){
        res.json({
            success: true,
            message: "Login successful"
        });
    }
    else{
        res.json({
            success: false,
            message: "User not registered"
        });
    }
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

