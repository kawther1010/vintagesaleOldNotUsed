const express = require('express');
const routes = express.Router();

const postpage = require('../controlers/postpage');


routes.post('/homein/profile/sellPage', postpage.postObject);
routes.post('/homein/profile/editProfile', postpage.postEditProfile);


module.exports = routes;