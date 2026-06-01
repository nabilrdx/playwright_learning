import {test, expect} from "@playwright/test";

const excelJs = require('exceljs');
let rownNumber,colNumber;

async function readExcel(){
const workBook = new excelJs.Workbook();
await workBook.xlsx.readFile('C:/Users/naifa/Downloads/download.xlsx');

const workSheet = workBook.getWorksheet('Sheet1');

workSheet.eachRow((row, rowNum)=>{
    row.eachCell((cell, colNum)=>{
        console.log(cell.value);
        if(rowNum ==2 && colNum == 3){
            // cell.value ='Nabil';
            cell.value='Nabil Ansari'
            rownNumber = rowNum;
            colNumber = colNum;
            
        }
    })

})
await workBook.xlsx.writeFile('C:/Users/naifa/Downloads/download.xlsx')

}



test('Excel E2E test', async ({page})=>{
await page.goto('https://rahulshettyacademy.com/upload-download-test/');

await Promise.all([
     page.waitForEvent('download'),
     page.getByRole('button', {
    name: 'Download'
}).click()
])
await readExcel();
await page.locator('#fileinput').click();
await page.locator('#fileinput').setInputFiles('C:/Users/naifa/Downloads/download.xlsx');
const rowDOm = await page.getByRole('row', {
    has: await page.getByText('Nabil Ansari')
});

// await page.pause();
const result = await rowDOm.locator('[data-tag="allowRowEvents"]', {
    hasText: 'Nabil Ansari'
}).last().textContent();

console.log(result =='Nabil Ansari')

await expect(result).toBeTruthy();

})

