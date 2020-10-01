/**
 * Title: employee-api.js
 * Author: Professor Krasso
 * Date: 28 September 2020
 * Modified By: Diandra McKenzie
 * Description: Employee API file
 */


/**
 * Require statements
 */
const express = require('express');
const Employee= require('../models/employee');


const router= express.Router();

/**
 * FindEmployeeByID
 *
 */
router.get('/:empId', async(req, res) => {
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


module.exports = router;
