/**
 * Title: home.component.ts
 * Author: Professor Krasso
 * Date: 19 September 2020
 * Modified By: Diandra McKenzie
 * Description: Home Component file
 */

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService} from '../../shared/task.service';
import { Item } from '../../shared/item.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tasks: any;
  todo: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService) {
    this.taskService.findAllTasks().subscribe(res => {
      this.todo = res['data'].todo;
      this.done = res['data'].done;
    }, err => {
      console.log(err);
    });

     // this.http.get('/api/employees/' + this.sessionUser + '/tasks').subscribe(res => {
     //   this.tasks = res;
     //   this.todo = this.tasks.todo;
     //   this.done = this.tasks.done;
     //   console.log(this.tasks);
   //     console.log(this.todo);
    //  }, err => {
   //     console.log(err);
  //    });
   }

  ngOnInit(): void {
  }

  /**
   * Create new task dialog
   */

  // openCreateTaskDialog() {
   //  const dialogRef = this.dialog.open(TaskCreateDialogComponent, {
   //    disableClose: true
  //   });

   //  dialogRef.afterClosed().subscribe(data => {
   //    if (data) {
    //    this.http.post('/api/employees/' + this.sessionUser + '/tasks', {
  //        text: data.text
   //      }).subscribe(res => {
    //      this.tasks = res;
   //       this.todo = this.tasks.todo;
   //       this.done = this.tasks.done;
  //      }, err => {
 //        console.log(err);
 //       });
//      }
 //    });
//   }

   /**
   * Delete task
   */
}
