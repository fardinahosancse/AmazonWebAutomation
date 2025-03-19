import {test as base} from '@playwright/test'
import { PageManager } from './pages/pageManager'

export type TestOptions = { 
    pageManager:PageManager,
    globalURL: string
 }

 export const test = base.extend<TestOptions>({
    //Global URL Fixture
    globalURL: ['', {option:true}],
    
    //Page Manager Fixture
    pageManager: async({page},use)=>{
        const pm = new PageManager(page)
        await use(pm)
    },
}) 