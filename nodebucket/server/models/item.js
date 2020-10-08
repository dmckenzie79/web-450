/**
 * Title: item.js
 * Author: Professor Krasso
 * Date: 28 September 2020
 * Modified By: Diandra McKenzie
 * Description: Item Schema for Employee Model file
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 let itemSchema = new Schema({
   text: {type: String}
 });

 module.exports = itemSchema;
