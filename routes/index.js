var express = require('express');
var axios = require('axios');
var router = express.Router();

let username = "sss";
let access_token = "sss";
let encoded = `${username}/token:${access_token}`;
var data;

function getData(statement) {
    axios.get(`https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(encoded).toString('base64')}`
            }
        })
        .then((resp) => {
            //console.log(JSON.stringify(resp.data));
            //console.log(resp.data);
            return resp.data;
        })
        .catch((err) => {
            console.error(err);
            return [];
        })

    return [];
}

/* GET home page. */
router.get('/', function(req, res, next) {

    if (data) {
        res.render('index', { tickets: JSON.stringify(data) });
    } else {
        axios.get(`https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25`, {
                headers: {
                    'Authorization': `Basic ${Buffer.from(encoded).toString('base64')}`
                }
            })
            .then((resp) => {
                //console.log(JSON.stringify(resp.data));
                //console.log(resp.data);
                data = resp.data;
                res.render('index', { tickets: JSON.stringify(data) });
            })
            .catch((err) => {
                console.error(err);
                res.render('error', { statusCode: err.response.status, statusText: err.response.statusText, data: err.response.data.error })
            })
    }
});

router.post('/', function(req, res, next) {
    //console.log(req.body.nextUrl)

    axios.get(req.body.nextUrl, {
            headers: {
                'Authorization': `Basic ${Buffer.from(encoded).toString('base64')}`
            }
        })
        .then((resp) => {
            //console.log(JSON.stringify(resp.data));
            //console.log(resp.data);
            if (resp.data['tickets'].length > 0)
                data = resp.data;
            res.render('index', { tickets: JSON.stringify(data) });
            //console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
        })
})


module.exports = router;