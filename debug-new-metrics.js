const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'sample_data', 'Content_2024-11-23_2025-11-22_Philip Moses.xlsx');

console.log(`Reading file: ${filePath}`);

try {
    const workbook = XLSX.readFile(filePath);

    // Inspect DISCOVERY sheet
    const discoverySheetName = "DISCOVERY";
    if (workbook.Sheets[discoverySheetName]) {
        console.log(`\n--- Inspecting Sheet: ${discoverySheetName} ---`);
        const sheet = workbook.Sheets[discoverySheetName];
        // B3 is row index 2, col index 1
        const cellB3 = sheet['B3'];
        console.log('Cell B3:', cellB3 ? cellB3.v : 'undefined');

        const json = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 0 });
        console.log('First 5 rows:');
        json.slice(0, 5).forEach((row, index) => {
            console.log(`Row ${index}:`, JSON.stringify(row));
        });
    } else {
        console.log(`Sheet ${discoverySheetName} not found!`);
    }

    // Inspect FOLLOWERS sheet
    const followersSheetName = "FOLLOWERS";
    if (workbook.Sheets[followersSheetName]) {
        console.log(`\n--- Inspecting Sheet: ${followersSheetName} ---`);
        const sheet = workbook.Sheets[followersSheetName];

        const json = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 0 });
        console.log('First 10 rows:');
        json.slice(0, 10).forEach((row, index) => {
            console.log(`Row ${index}:`, JSON.stringify(row));
        });
    } else {
        console.log(`Sheet ${followersSheetName} not found!`);
    }

} catch (error) {
    console.error('Error reading file:', error);
}
