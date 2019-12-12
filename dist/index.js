"use strict";
// @ts-ignore
const express = require('express');
const app = express();
const auth = require('./controllers/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});
// //automatic create db with name "my_database"
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//route/////////////////////////////////////////////////////////////////////////////////////
// const {addUserMongo, getUsersMongo, deleteUsersMongo, getUsersMongoById, updateUsersMongo} = require("./mongoRep");
// let {getUsers, addUser} = require('./rep.js');
// const router = express.Router();
//
// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });
// router.get('/auth', async (req, res) => {
//     // let users = await getUsersMongoById(req.params.id);
//     const users = {name: 'xxx'};
//
//     // console.log(req.params.id);
//     if (users) res.send(JSON.stringify(users));
//     else res.send(404);
// });
///////////////////////////////////////////////////////////////////////
app.use('/auth', auth);
//default
app.use((req, res) => {
    res.send(404);
});
//start
app.listen(7542, function () {
    console.log('Example app listening on port 7542!');
});
console.log('start...');
process.on('unhandledRejection', (reason, p) => {
    console.log(reason, p);
});
//# sourceMappingURL=index.js.map