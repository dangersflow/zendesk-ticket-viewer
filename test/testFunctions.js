var axios = require('axios');
class Test {

    constructor(username, accessCode, statement) {
        this.username = username;
        this.accessCode = accessCode;
        this.statement = statement;
        this.encoded = `${username}/token:${accessCode}`;
    }

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
}

module.exports = Test;