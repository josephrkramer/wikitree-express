var express = require('express');
var router = express.Router();

var request = require('request');
var cookieJar = request.jar();
request = request.defaults({ jar : cookieJar })

var email = 'XXXX';
var password = 'XXXX';

request.post({url:'https://apps.wikitree.com/api.php', form: {action:'login', email:email, password:password}}, function (error, response, body) {
    //console.log(response);
    if (!error && response.statusCode == 200) {
        console.log(body);

        var respJson = JSON.parse(body);

        console.log(respJson.login);
        getProfile(respJson.login.username);
        getAncestors(respJson.login.username, 5);
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

function getProfile(key) {
    console.log('Attempting getProfile after setting cookie');
    request.post({url:'https://apps.wikitree.com/api.php', form: {action:'getProfile', key:key, fields:'Id,Name,FirstName,LastNameCurrent,Mother,Father'}}, function (error, response, body) {
        //console.log(response);
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            console.log(json);
        }
    });
}

function getAncestors(key, depth) {
    request.post({url:'https://apps.wikitree.com/api.php', form: {action:'getAncestors', key:key, depth:depth}}, function (error, response, body) {
        //console.log(response);
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            console.log(json);
            // json.ancesors.forEach(function(ancestor) {
            //     console.log(ancestor);
            // });
        }
    });
}