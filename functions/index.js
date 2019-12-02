const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const authenticate = require('./middleware/authenticate');
const v1Routes = require('./routes/v1Routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);
app.use(authenticate);

app.use('/', v1Routes);

exports.app = functions.https.onRequest(app);
