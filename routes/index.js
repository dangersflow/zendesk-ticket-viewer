//required modules
var express = require('express');
var axios = require('axios');
var router = express.Router();

//some global variables
//(replace "xxx" with username (email) and api token respectively)
let username = "xxx";
let access_token = "xxx";
let encoded = `${username}/token:${access_token}`;
var data;

/* GET home page. */
router.get('/', function(req, res, next) {

    //if data is already populated, then simply render its current state (used when there's no more previous or next pages)
    if (data) {
        res.render('index', { tickets: JSON.stringify(data) });
    } else {
        //axios get request
        axios.get(`https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25`, {
                headers: {
                    'Authorization': `Basic ${Buffer.from(encoded).toString('base64')}`
                }
            })
            .then((resp) => {
                //console.log(JSON.stringify(resp.data));
                //console.log(resp.data);

                //here, once we get our data, we update the data variable, then render the index page
                data = resp.data;
                res.render('index', { tickets: JSON.stringify(data) });
            })
            .catch((err) => {
                //if there is an error, we render the error page with the appropriate status and text
                console.error(err);
                res.render('error', { statusCode: err.response.status, statusText: err.response.statusText, data: err.response.data.error })
            })
    }
});

/* POST home page. */
router.post('/', function(req, res, next) {
    //console.log(req.body.nextUrl)

    //axios get request for when we specify next/previous page api calls
    axios.get(req.body.nextUrl, {
            headers: {
                'Authorization': `Basic ${Buffer.from(encoded).toString('base64')}`
            }
        })
        .then((resp) => {
            //console.log(JSON.stringify(resp.data));
            //console.log(resp.data);

            //if the tickets returned is more than 0, then we update our data variable and we render the index page
            if (resp.data['tickets'].length > 0)
                data = resp.data;
            res.render('index', { tickets: JSON.stringify(data) });
            //console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
            res.render('error', { statusCode: err.response.status, statusText: err.response.statusText, data: err.response.data.error })
        })
})


module.exports = router;