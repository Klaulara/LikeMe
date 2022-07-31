const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const {postear, traerPosts, likePost} = require('./consultas.js')

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/post', async(req, res)=>{
    const data = Object.values(req.body)
    try {
        const result = await postear(data);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/posts', async(req, res)=>{
    try {
        const result = await traerPosts();
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/post', async(req, res)=>{
    const id = Object.values(req.query);
    try {
        const result = await likePost(id);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))