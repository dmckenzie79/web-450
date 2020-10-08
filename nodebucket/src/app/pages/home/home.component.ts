/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Date: 19 September 2020
 * Modified By: Diandra McKenzie
 * Description: Home Component file
 */

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/employee.interface';
import { CookieService } from 'ngx-cookie-service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../shared/task.service';
import { Item } from '../../shared/item.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  todo: Item[];
  done: Item[];
  employee: Employee;

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService) {

    this.empId = this.cookieService.get('session_user'); //get the active session user

    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log(`--Server response from findAllTasks--`);
      console.log(res);

      this.employee = res.data;
      console.log(`--Employee object--`);
      console.log(this.employee);

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;

      console.log(`This is the complete function`)
      console.log(this.todo);
      console.log(this.done);
    })
  }


  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {

    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log(`Reordered the existing list of task items`);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

      console.log(`Moved task item to the container`);
    }
  }

  private updateTaskList(empId: string, todo: Item[], done:Item[]): void {
    this.taskService.updateTask(empId, todo, done). subscribe(res => {
      this.employee = res.data;
    }, err => {
      console.log(err)
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

  openCreateTaskDialog() {

  }
}
