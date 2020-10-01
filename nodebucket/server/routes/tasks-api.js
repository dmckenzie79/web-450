/**
 * Title: tasks-api.js
 * Author: Professor Krasso
 * Date: 28 September 2020
 * Modified By: Diandra McKenzie
 * Description: Tasks API file
 */


/**
 * Require statements
 */
const express = require('express');
const Employee= require('../models/employee');


const router= express.Router();

/**
 * findAllTasks
 * Returns a list of JSON task objects
 */
router.get('/:empId/tasks', async(req, res) => {
  try {
      /**
       * Use the mongoose employee model to query MongoDB Atlas by employeeId to find todo and done tasks
       */
      Employee.findOne({ 'empId': req.params.empId},'empId todo done', function(err, employee) {

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
