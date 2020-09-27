/**
 * Title: employee.js
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Diandra McKenzie
 * Description: Employee Model file
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 /**
  * employee schema, sprint 1
  */

 const employeeSchema = new Schema ({
    empId: {type: String, unique: true, dropDups: true},
    firstName: {type: String},
    lastName: {type: String}
  }, { collection: 'employees'});

 module.exports = mongoose.model('Employee', employeeSchema);
