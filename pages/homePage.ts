import {Page} from '@playwright/test'

export class HomePage{
    readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    async selectCategory(categoryValue:string){
        const categoryDropdown= 'select#searchDropdownBox'
        await this.page.selectOption(categoryDropdown, {value: categoryValue})
        const selectedValue = await this.page.locator('[id="nav-belt"]').getByText('Software').first().textContent()
        console.log(selectedValue)
        return selectedValue
    }

    async checkCategoryDropdown() {
        const allOptions = await this.page.$$('select#searchDropdownBox' + ' option'); // Get all option elements
        console.log(allOptions.length);
    
        const textArray: string[] = []; // Initialize an array to store option texts
        for (const e of allOptions) {
            const text = await e.textContent();
            if (text) {
                textArray.push(text.trim()); // Push text into array after trimming spaces
            }
        }
        return textArray;
    }

    async selectCategoryandSearchproduct(categoryValue:string, searchValue:string){

        //For Selecting Category
        const categoryDropdown= 'select#searchDropdownBox'
        await this.page.selectOption(categoryDropdown, {value: categoryValue})
        const selectedValue = await this.page.locator('[id="nav-belt"]').getByText('Software').first().textContent()

        //For Searching Product
        const searchBox  = await this.page.locator('[id="twotabsearchtextbox"]')
        await searchBox.fill(searchValue)
        //await searchBox.press('Enter')
        await this.page.locator('[id="nav-search-submit-button"]').click()
        await this.page.waitForTimeout(2000)
        // After Search - Search Result Page Appears
        const pageTitle = await this.page.title()
        return{
            pT :pageTitle,
            sV: selectedValue
        };
    }
    
}