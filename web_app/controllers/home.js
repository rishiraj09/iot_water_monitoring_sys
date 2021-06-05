const moment = require('moment');
const AWS = require('aws-sdk');

let awsConfig = {
    "region": process.env.AWS_REGION,
    "endpoint": process.env.AWS_DYNAMODB_ENDPOINT,
    "accessKeyId": process.env.AWS_ACCESS_ID_KEY,
    "secretAccessKey": process.env.AWS_SECRET_KEY
}

AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

// Models
const User = require('../models/user');
const { TimestreamQuery } = require('aws-sdk');

exports.getHome = (req, res) => {

    let sensor_data = [];

    let params = {
        TableName: "iot_wqms",
    }

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            // console.log(data);
            if (data.Count > 0) {
                data.Items.forEach(item => {

                    sensor_data.push({
                        datetime: item.payload.datetime,
                        id: item.payload.id,
                        temperature: item.payload.temperature,
                        ph: item.payload.ph,
                        turbidity: item.payload.turbidity
                    })
                })
            }
        }

        console.log(sensor_data);
        return res.render('./layout/home/home', {
            pageTitle: 'IoT WQMS',
            path: 'home',
            moment: moment,
            sensorData: sensor_data,
            sensor_data: JSON.stringify(sensor_data)
        })

    })

}