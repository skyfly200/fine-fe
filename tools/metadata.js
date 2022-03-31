const csv = require('csv-parser');
const fs = require('fs');

let folder = "metadata";

let imagesBaseURI = "ipfs://QmXhR4K8GrRjcsgv1kVWZdUSRMrMEspWpFqMSbThMdzSPG";
let modelsBaseURI = "https://solidsnft.s3.amazonaws.com/SOLIDS+GLB+1";

let description = "SOLIDS is a generative architecture NFT project created by FAR. There are 8,888 + 512 unique buildings generated algorithmically, enabling utility in the Metaverse.";

fs.createReadStream('./solids.csv')
  .pipe(csv())
  .on('data', (row) => {
    const metadata = {
        description: description,
        image: imagesBaseURI + "/" + row.ID + ".jpg",
        animation_url: "https://solids.fine.digital/preview/" + row.ID,
        external_url: "https://solids.fine.digital/token/" + row.ID,
        name: "SOLID #" + row.ID,
        background_color: "#fff",
        model_url: modelsBaseURI + "/" + row.ID + ".glb",
        attributes: [
            {
                trait_type: "Dimension",
                value: int(row.Dim),
            },
            {
                trait_type: "Size",
                value: row.Size,
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
                display_type: "number", 
                value: int(row.Openings),
            },
            {
                trait_type: "Legs",
                value: row.Legs,
            },
            {
                trait_type: "Background",
                value: row.Background,
            },
            {
                trait_type: "Archetype",
                value: row.Archetype,
            },
            {
                trait_type: "Skin",
                value: row.Skin,
            },
        ],
    };

    // convert JSON object to string
    const data = JSON.stringify(metadata);


    // write JSON string to a file
    let filePath = './' + folder + '/' + row.ID + '.json';
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            throw err;
        }
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });