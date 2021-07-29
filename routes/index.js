var express = require('express');
var axios = require('axios');
var router = express.Router();

let username = "xxx";
let access_token = "xxx";
let encoded = `${username}/token:${access_token}`;

/* GET home page. */
router.get('/', function(req, res, next) {

    axios.get(`https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(encoded).toString('base64')}`
            }
        })
        .then((resp) => {
            //console.log(JSON.stringify(resp.data));
            res.render('index', { tickets: JSON.stringify(resp.data) });
            //console.log(res.data);
        })
        .catch((err) => {
            console.error(err)
            res.render('error', { statusCode: err.response.status, statusText: err.response.statusText, data: err.response.data.error })
        })
});


module.exports = router;