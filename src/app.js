var Login = require('./models/login');
const serviceLogin = require('./login/serviceLogin');
const serviceUsers = require('./users/serviceUsers');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { response } = require('express');
var app = express();
var router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);


router.use((request, response, next) => {
    console.log('Middleware');
    next();
});

router.route('/v1/login').get((request, response) => {
    //console.log('Get Login');
    serviceLogin.getLogin().then(login => {
        //console.log('Get Data Login');
        // serviceUsers.getRolsByUser(login[0].id_usuario).then(roles => {
        //     console.log('Get Data roles');
        //     console.log(roles);
        // });
        //login.roles = roles;
        
        //console.log('My response');
        response.json({statusCode: 200, data: login});
    });
});


var port = process.env.PORT || 3002;
app.listen(port);
console.log('API is running at ' + port);