const axios = require("axios");
const express = require("express");
const cors = require("cors");

const authedRequest = axios.create();

authedRequest.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer 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`;
    return config;
}, function (error) {
    return Promise.reject(error);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/chat-gpt', async (req, res) => {
    try {
        const result = await authedRequest.post(`https://api.openai.com/v1/chat/completions`, req.body);
        const data = result.data;
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send({
            err: err
        });
    }
});

app.post('/dalle', async (req, res) => {
    try {
        const result = await authedRequest.post(`https://api.openai.com/v1/images/generations`, req.body);
        res.status(200).send(result.data);

    } catch (err) {
        res.status(500).send({
            err: err
        });
    }
});

app.listen(process.env.PORT || 8000, () => {
   console.log("The server set up at port 8000");
});