const express = require('express');
const routes = express.Router();

const getpage = require('../controlers/getpage');

routes.get('/', getpage.gethome);
routes.get('/register', getpage.getregister);
routes.get('/login', getpage.getlogin);

routes.get('/homein', getpage.gethomein);
// routes.get('/homepage/:id', getpage.getproductdetails);


routes.get('/homein/profile', getpage.getprofile);
routes.get('/homein/profile/editProfile', getpage.geteditProfile);
routes.get('/homein/profile/sellPage', getpage.getsellPage);

// routes.get('/homepage/salesList', getpage.getsalesList);
// routes.get('/homepage/salesList/bill', getpage.getbill);

routes.get('/homein/logout', getpage.getlogout);

module.exports = routes;
