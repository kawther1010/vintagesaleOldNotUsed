const express = require('express');
const routes = express.Router();

const postpage = require('../controlers/postpage');


routes.post('/homepage/profile/sellPage', postpage.postObject);
routes.post('/homepage/profile/editProfile', postpage.postEditProfile);


module.exports = routes;