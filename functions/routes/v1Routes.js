const express = require('express');
const v1Router = express.Router();

v1Router.post('/v1/test', (req, res) => {
    res.status(200).json(req.body);
});

module.exports = v1Router;