/**
 * Title: base-layout.component.ts
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Diandra McKenzie
 * Description: Base-layout component file
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  title: string;

  constructor() {
    this.title = "nodebucket";
   }

  ngOnInit(): void {
  }

}
