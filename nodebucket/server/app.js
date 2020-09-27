/**
 * Title: app.js
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Diandra McKenzie
 * Description: API file
 */


/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/employee'); //get the employees model from the Models directory

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**


* Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://nodebucket_user:S5FwoXuaVK4QDJpn@cluster-1.6d0ag.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`);
}); // end mongoose connection


 /**
 * FindEmployeeByID
 *
 */
app.get('/api/employees/:empId', async(req, res) => {
  try {
      /**
       * Use the mongoose employee model to query MongoDB Atlas by employeeId
       */
      Employee.findOne({ 'empId': req.params.empId }, function(err, employee) {

      /**
       * If there is a database level error, handle by returning a server 500 error
       */

        if (err) {
          console.log(err);
          res.status(500).send({
            message: 'Internal server error!'
          });
        } else {

          /**
           * If there is no database level errors, return the employee object
           */
          console.log(employee);
          res.json(employee);
        }
      });

  } catch(e) {
      /**
       * Catch any potential server errors and return a server 500 error
       */
      console.log(e);
      res.status(500).send({
          message: 'Internal server error!'
      });
  }
});

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
