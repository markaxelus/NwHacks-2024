const express = require("express");
const PORT = 3000;
const app = express();

app.get('/', (req,res) => {
    const user = req.query.user;
    res.send(user + "!");      
});
const user = []; 
app.post("create_user", (req, res) => {
    const { user }  = user.body;

    user.push({ username: user.username });

    res.json({loggedIn: true, status: "cool!"});
});
// app.get('', (req,res) => {
//     console.log("server started on port 3000");
//     res.json("testing");
// });

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));