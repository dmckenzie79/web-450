/**
 * Title: employee.interface.ts
 * Author: Diandra McKenzie
 * Date: 5 October 2020
 * Description: Employee interface file
 */

 import { Item } from './item.interface';

 export interface Employee {
   empId: string;
   todo: Item[];
   done: Item[];
 }
