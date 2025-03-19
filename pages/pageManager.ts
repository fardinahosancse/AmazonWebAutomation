import { Page, expect } from '@playwright/test';
import { HomePage } from './homePage';

export class PageManager{
    private readonly page:Page;
    private readonly homePage:HomePage;

   constructor(page:Page){
    this.page = page;
    this.homePage = new HomePage(this.page);
   } 

   getHomePage(){
    return this.homePage
   }

   getPage(){
    return this.page
   }
}
