const csv = require('csv-parser');
const fs = require('fs');

let folder = "json";

let imagesBaseURI = "https://far.mypinata.cloud/ipfs/QmezRySqNs7CmtR1Cm1fBePP1QyFRUKc6eW2pP5fkFBLeM";
let modelsBaseURI = "https://far.mypinata.cloud/ipfs/QmeWQYSZnZtRosgZpWrDL1ZeHXTkN6xtRJ2ykgJ7CSeNjT";

let description = "";

fs.createReadStream('./solids.csv')
  .pipe(csv())
  .on('data', (row) => {
    const metadata = {
        description: description,
        image: imagesBaseURI + "/" + row.No + ".png",
        animation_url: "https://solids.fine.digital/preview/" + row.No,
        external_url: "https://solids.fine.digital/token/" + row.NO,
        name: "Solids",
        background_color: "#fff",
        model_url: modelsBaseURI + "/" + row.No + ".glb",
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