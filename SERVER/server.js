const express = require('express')
const path = require('path')


require('dotenv').config()
const PORT = process.env.PORT || 4040

const app = express()
// app.use(express.json())

// middleware
app.use(express.static(path.join(path.dirname(__dirname) + '/client')));

// router
app.use('/', (req, res) =>{
    res.sendFile(path.join(path.dirname(__dirname) + '/client/index.html'))
})





app.listen(PORT, () => {
    console.log(`Port: ${PORT}. Server is running...`);
})