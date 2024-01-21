// const express = require('express');
// const fetch = require('node-fetch');

// const app = express();
// const port = 5000; // You can choose any available port

// // Replace with your actual API key
// const apiKey = 'YOUR_API_KEY'; 

// app.get('/recipe/:id', async (req, res) => {
//     try {
//         const recipeId = req.params.id;
//         const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         res.json(data);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
const http = require("node:http");
const server = http.createServer((req,res) => {
    res.writeHead(200);
    res.end("test");
});

server.listen(3000, () => {
    console.log("Server on P3000")
});