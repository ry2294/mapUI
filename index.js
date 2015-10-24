var express = require('express');
var bodyParser = require('body-parser');
var path    = require("path");

var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AKIAJMEQ34ZJZFHTL5VA', 
    secretAccessKey: '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'});

AWS.config.update({region: 'us-west-2'});

var dynamodbDoc = new AWS.DynamoDB.DocumentClient();
var dynamodb = new AWS.DynamoDB();

var getPlaceInfoParams = {
    TableName: "place_tbl"
};

dynamodb.scan(getPlaceInfoParams, function(error, data) {
    if (error)
        console.log(JSON.stringify(error));
    else
        console.log(JSON.stringify(data.Count));
});


var app = express();
app.use(bodyParser.json());

var router = express.Router();

router.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.use('/', router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
