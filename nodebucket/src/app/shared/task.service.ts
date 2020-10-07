/**
 * Title: task.service.ts
 * Author: Diandra McKenzie
 * Date: 5 October 2020
 * Description: Task Service file
 */


import { Injectable } from '@angular/core';
import { CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sessionUser: string;

  constructor(private cookieService: CookieService, private http: HttpClient) {
    this.sessionUser = this.cookieService.get('session-user'); //get the logged in empId
    //this.baseUrl = 'http://localhost:3000'; //testing Url for API layer
  }
/**
 * findAllTasks
 */
findAllTasks() {
  return this.http.get('/api/employees/' + this.sessionUser + '/tasks')
}

/**
 * createTasks
 */

 /**
 * updateTasks
 */

 /**
 * deleteTasks
 */

}
