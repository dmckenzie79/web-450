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
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //tasks: any;
  todo: Array<Item>;
  done: Array<Item>;

  constructor(private taskService: TaskService) {
    this.taskService.findAllTasks().subscribe(res => {
      this.todo = res['data'].todo;
      this.done = res['data'].done;
    }, err => {
      console.log(err)
    })
   }

  ngOnInit(): void {
  }

}
