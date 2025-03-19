import { Page, expect } from '@playwright/test';
import { time } from 'console';
import { test } from '../test-options';

test.beforeEach(async ({globalURL,pageManager }) => {
  await pageManager.getPage().goto(globalURL);
  await pageManager.getPage().waitForTimeout(2000);
});

test('TC_01: Open Amazon Website - Verify Homepage Loads Successfully', async ({ pageManager }) => {
  await expect(pageManager.getPage()).toHaveTitle(/Amazon/);
});
test('TC_02: Availability of "Software" from Drop-down  - Verify Category Dropdown has "Software"  dropdown', async ({ pageManager }) => {
  const returnValue = await pageManager.getHomePage().checkCategoryDropdown();
  await expect(returnValue).toContain('Software');
});
test('TC_03: Select "Software" from Drop-down - Ensure Category Updates Correctly',async({pageManager})=>{
  const value = await pageManager.getHomePage().selectCategory('search-alias=software-intl-ship');
  await expect(value).toBe('Software');
});

test('TC_04: TC_03: Enter Search Text "Games" - Validate Search Functionality',async({pageManager})=>{
  const { pT, sV } = await pageManager.getHomePage().selectCategoryandSearchproduct('search-alias=software-intl-ship','Games');
  await expect(pT).toContain('Amazon.com : Games');
  await expect(sV).toBe('Software');
});







