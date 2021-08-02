//required modules
var axios = require('axios');

//Test class
class Test {

    constructor(username, accessCode, statement) {
        this.username = username;
        this.accessCode = accessCode;
        this.statement = statement;
        this.encoded = `${username}/token:${accessCode}`;
    }

    //these next two functions are simply to test when we provide valid credentials, and when we don't provide valid credentials
    async getData(username, accesscode) {
        let data;
        let errorCode;

        if (username && accesscode) {
            this.encoded = `${username}/token:${accesscode}`;
        }

        const response = await axios.get(this.statement, {
                headers: {
                    'Authorization': `Basic ${Buffer.from(this.encoded).toString('base64')}`
                }
            })
            .catch((err) => {
                //console.error(err);
                errorCode = err.response.status;
                //res.render('error', { statusCode: err.response.status, statusText: err.response.statusText, data: err.response.data.error })
            })

        data = await response.data;

        return data;
    }

    async getWrongData(username, accesscode) {
        let data;
        let errorCode;

        if (username && accesscode) {
            this.encoded = `${username}/token:${accesscode}`;
        }

        try {
            const response = await axios.get(this.statement, {
                headers: {
                    'Authorization': `Basic ${Buffer.from(this.encoded).toString('base64')}`
                }
            })
        } catch (err) {
            //console.log(err);
            return err.response;
        }
    }
}

module.exports = Test;