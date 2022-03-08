const csv = require('csv-parser');
const fs = require('fs');

let folder = "json";

fs.createReadStream('./solids.csv')
  .pipe(csv())
  .on('data', (row) => {
    const metadata = {
        description: "",
        image: "",
        animation_url: "https://solids.fine.digital/preview/"+row.No,
        external_url: "",
        name: "Solids",
        background_color: "",
        attributes: [
            {
                trait_type: "Artwork ID",
                value: row.No,
            },
            {
                trait_type: "Dim",
                value: row.Dim,
            },
            {
                trait_type: "Skylight",
                value: row.Skylight,
            },
            {
                trait_type: "Entrance",
                value: row.Entrance,
            },
            {
                trait_type: "Openings",
                value: row.Openings,
            },
            {
                trait_type: "Legs",
                value: row.Legs,
            },
            {
                trait_type: "Texture",
                value: row.Texture,
            },
        ],
    };

    // convert JSON object to string
    const data = JSON.stringify(metadata);


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