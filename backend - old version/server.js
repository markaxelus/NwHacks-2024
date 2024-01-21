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
const express = require('express');
const PORT = 3000;
const app = express();

app.get('/test',(req,res) => {
    res.json({ok:true});
});

app.get('', (req,res) => {
    res.json("testing123");
});

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));
