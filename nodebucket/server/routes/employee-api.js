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
const Employee = require('../models/employee');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const Item = require('../models/item');


const router= express.Router();

/**
 * API: FindEmployeeByID
 * Returns a JSON employee record
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


/**
 * API: findAllTasks
 * Returns a list of JSON task objects
 */
router.get('/:empId/tasks', async(req, res) => {
  try {
        Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {

        if (err) {
          console.log(err);

          const mongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

          res.status(500).send(mongoDbErrorResponse.toObject());

        } else {
          console.log(employee);

          const employeeTasksResponse = new BaseResponse('200', 'Query successful', employee);

          res.json(employeeTasksResponse.toObject());
        }
      });

  } catch(e) {

      console.log(e);

      const errorCatchResponse = new ErrorResponse('500', 'Internal server error', e.message);

          res.status(500).send(errorCatchResponse.toObject());

      }
  });

  /**
 * API: createTask
 * Posts a list of JSON task objects
 */
router.post('/:empId/tasks', async(req, res) => {
  try {
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {

        if (err) {
          console.log(err);

          const createTaskMongoDbErrorResponse = new ErrorResponse ('500', 'Internal server error', err);

          res.status(500).send(createTaskMongoDbErrorResponse.toObject());

        } else {
          console.log(employee);

          //create a new item object

          const item = {
              text: req.body.text
          };

          //push the new item to the ToDo Array
          employee.todo.push(item);

          employee.save(function (err, updatedEmployee) {
            if (err) {
              console.log(err);

              const createTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

              res.status(500).send(createTaskOnSaveMongoDbErrorResponse.toObject());
            } else {

              console.log(updatedEmployee);

              const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful entry', updatedEmployee);

              res.json(createTaskOnSaveSuccessResponse.toObject());

            }

          });
        }
      });

  } catch(e) {

      console.log(e);

      const createTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

      res.status(500).send(createTaskCatchErrorResponse.toObject());

      }
  });

  /**
 * API: updateTask
 * Updates a JSON task object
 */

 router.put('/:empId/tasks', async(req, res) => {
   try {

    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      if (err) {
        console.log(err);

        const updateTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

        res.status(500).send(updateTaskMongoDbErrorResponse.toObject());
      } else {
          console.log(employee);

          employee.set({
            todo: req.body.todo,
            done: req.body.done
          });

          employee.save(function(err, updatedEmployee) {
            if (err) {
              console.log(err);

              const updateTaskOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

              res.status(500).send(updateTaskOnSaveMongoDbErrorResponse.toObject());
            } else {
              console.log(updatedEmployee);

              const updatedTaskOnSaveSuccessResponse = new BaseResponse('200', 'Update Successful', updatedEmployee);

              res.json(updatedTaskOnSaveSuccessResponse.toObject());
            }
          });
      }
    });

   } catch (e) {

      console.log(e);

      const updateTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

      res.status(500).send(updateTaskCatchErrorResponse.toObject());
   }
 });

 /**
 * API: deleteTask
 * Deletes a JSON task object
 */

 router.delete('/:empId/tasks/:taskId', async(req, res) => {

    try {

        Employee.findOne({'empId': req.params.empId}, function(err, employee) {

            if (err) {
              console.log(err);

              const deleteTaskMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

              res.status(500).send(deleteTaskMongoDbErrorResponse.toObject());
            } else {
              console.log(employee);

              const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
              const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

              if(todoItem) {
                employee.todo.id(todoItem._id).remove();

                employee.save(function(err, updatedTodoItemEmployee) {
                  if (err) {
                    console.log(err);

                    const deleteToDoItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                    res.status(500).send(deleteToDoItemOnSaveMongoDbErrorResponse.toObject());
                  } else {
                    console.log(updatedTodoItemEmployee);

                    const deleteToDoItemSuccessResponse = new BaseResponse('200', 'Removed item from todo list', updatedTodoItemEmployee);

                    res.json(deleteToDoItemSuccessResponse.toObject());
                  }

                });

              }  else if(doneItem) {
                  employee.done.id(doneItem._id).remove();

                  employee.save(function(err, updatedDoneItemEmployee) {
                    if (err) {
                      console.log(err);

                      const deleteDoneItemOnSaveMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);

                      res.status(500).send(deleteDoneItemOnSaveMongoDbErrorResponse.toObject());
                    } else {
                      console.log(updatedDoneItemEmployee);

                      const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Removed item from todo list', updatedDoneItemEmployee);

                      res.json(deleteDoneItemSuccessResponse.toObject());
                    }
                  });
              } else {
                console.log('Invalid task Id');

                const deleteTaskNotFoundResponse = new ErrorResponse('404', 'Unable to locate the requested task', null);

                res.status(404).send(deleteTaskNotFoundResponse.toObject());
              }

            }
        });

    } catch (e) {

        console.log(e);

        const deleteTaskCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);

        res.status(500).send(deleteTaskCatchErrorResponse.toObject());
    }
 });


module.exports = router;
