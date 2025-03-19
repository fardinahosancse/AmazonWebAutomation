import { Page } from '@playwright/test';
import locators from '../locators.json';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

//   async sc(): Promise<void> {
//     try {
//       const dropdown = this.page.locator(locators.homePage.categoryDropdown);
//       await dropdown.focus();
//       await this.page.keyboard.press("ArrowDown");
//       await this.page.keyboard.press("ArrowDown");
//     } catch (error) {
//       await this.page.screenshot({ path: `screenshots/sc_error_${Date.now()}.png`, fullPage: true });
//       console.error(`Error in sc method: ${error}`);
//       throw error;
//     }
//   }

  async selectCategoryALT() {
    try {
    const dropdown = this.page.locator(locators.homePage.categoryDropdown);
      await dropdown.focus();
      for (let i = 0; i < 22; i++) {
        await this.page.keyboard.press("ArrowDown");
    }
      const selectedValueALT = await this.page.locator(locators.homePage.navBelt).getByText('Software').first().textContent();
      console.log(selectedValueALT);
      return selectedValueALT;
    } catch (error) {
      await this.page.screenshot({ path: `screenshots/selectCategory_error_${Date.now()}.png`, fullPage: true });
      console.error(`Error in selectCategory: ${error}`);
      throw error;
    }
  }







  async selectCategory(categoryValue: string) {
    try {
      const categoryDropdown = locators.homePage.categoryDropdown;
      await this.page.selectOption(categoryDropdown, { value: categoryValue });
      const selectedValue = await this.page.locator(locators.homePage.navBelt).getByText('Software').first().textContent();
      console.log(selectedValue);
      return selectedValue;
    } catch (error) {
      await this.page.screenshot({ path: `screenshots/selectCategory_error_${Date.now()}.png`, fullPage: true });
      console.error(`Error in selectCategory: ${error}`);
      throw error;
    }
  }

  async checkCategoryDropdown() {
    try {
      const allOptions = await this.page.$$(locators.homePage.categoryDropdown + ' option');
      console.log(allOptions.length);

      const textArray: string[] = [];
      for (const e of allOptions) {
        const text = await e.textContent();
        if (text) {
          textArray.push(text.trim());
        }
      }
      return textArray;
    } catch (error) {
      await this.page.screenshot({ path: `screenshots/checkCategoryDropdown_error_${Date.now()}.png`, fullPage: true });
      console.error(`Error in checkCategoryDropdown: ${error}`);
      throw error;
    }
  }

  async selectCategoryandSearchProduct(categoryValue: string, searchValue: string) {
    try {
      const categoryDropdown = locators.homePage.categoryDropdown;
      await this.page.selectOption(categoryDropdown, { value: categoryValue });
      const selectedValue = await this.page.locator(locators.homePage.navBelt).getByText('Software').first().textContent();

      const searchBox = await this.page.locator(locators.homePage.searchBox);
      await searchBox.fill(searchValue);
      await this.page.locator(locators.homePage.searchButton).click();
      await this.page.waitForTimeout(2000);

      const pageTitle = await this.page.title();
      return { pT: pageTitle, sV: selectedValue };
    } catch (error) {
      await this.page.screenshot({ path: `screenshots/search_error_${Date.now()}.png`, fullPage: true });
      console.error(`Error in selectCategoryandSearchProduct: ${error}`);
      throw error;
    }
  }
}
