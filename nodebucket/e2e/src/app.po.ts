/**
 * Title: app.po.ts
 * Author: Professor Krasso
 * Date: 23 September 2020
 * Modified By: Diandra McKenzie
 * Description: App Promise file
 */


import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
}
