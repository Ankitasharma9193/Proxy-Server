const express = require('express');
const router = express.Router();
const needle = require('needle');

const API_KEY_VALUE =  process.env.API_KEY_VALUE
const API_KEY_NAME =  process.env.API_KEY_NAME
const API_BASE_URL =  process.env.API_BASE_URL

router.get('/', async (req, res) => {
    try{
        const params = new URLSearchParams({
            API_KEY_VALUE:  API_KEY_VALUE
        })
        const weatherData = await needle('get', `${API_BASE_URL}?${params}`);
        const data = weatherData.body;
        res.send(200).json({weather:data});
    } catch(error){
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;