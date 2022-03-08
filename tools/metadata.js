const csv = require('csv-parser');
const fs = require('fs');

let folder = "json";

fs.createReadStream('./solids.csv')
  .pipe(csv())
  .on('data', (row) => {
    // todo: transform json metadata

    // convert JSON object to string
    const data = JSON.stringify(row);

    // write JSON string to a file
    let filePath = './' + folder + '/' + row.No + '.json';
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });