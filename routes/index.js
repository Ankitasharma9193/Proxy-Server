const express = require('express');
const { request } = require('http');
const router = express.Router();
const needle = require('needle');
const url = require('url');

const API_KEY_VALUE =  process.env.API_KEY_VALUE
const API_KEY_NAME =  process.env.API_KEY_NAME
const API_BASE_URL =  process.env.API_BASE_URL

router.get('/', async (req, res) => {
    try{
        console.log(url.parse(req.url, true).query);

        const params = new URLSearchParams({
            [API_KEY_NAME]:  API_KEY_VALUE,
            ...url.parse(req.url, true).query
        });

        const weatherData = await needle('get', `${API_BASE_URL}?${params}`);
        const data = weatherData.body;
        res.send(200).json({data});
    } catch(error){
        console.log(`Error: ${error}`);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;