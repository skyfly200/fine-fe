const csv = require('csv-parser');
const fs = require('fs');

let folder = "json";

let imagesBaseURI = "https://far.mypinata.cloud/ipfs/QmezRySqNs7CmtR1Cm1fBePP1QyFRUKc6eW2pP5fkFBLeM";
let modelsBaseURI = "https://far.mypinata.cloud/ipfs/QmeWQYSZnZtRosgZpWrDL1ZeHXTkN6xtRJ2ykgJ7CSeNjT";

let description = "SOLIDS is a generative architecture project created by FAR. There will be 8,888 unique buildings generated algorithmically and compatible with Metaverses./n/nAs the Metaverse is becoming more ubiquitous, we are seeing many different examples of virtual worlds emerging. Immersive virtual worlds are not something novel; however, blockchain technology and cryptocurrency are bringing another level of excitement. The combination of technologies adds a more tangible layer to our virtual experience, which extends the material world./n/nIn this context of expansion into the Metasphere, Architecture is needed to shape the habitat of the Virtual Realm. This is where SOLIDS was born, as an essential response to the needs for buildings in the established and upcoming Digital Environments./n/nWhen the user mints a SOLID, they get a 3D file that can be imported into other 3D environments. Down the road, we will work on making them compatible with more Metaverses and environments as we evolve.";

fs.createReadStream('./solids.csv')
  .pipe(csv())
  .on('data', (row) => {
    const metadata = {
        description: description,
        image: imagesBaseURI + "/" + row.ID + ".png",
        animation_url: "https://solids-minisite-git-infura-aldomedinaz.vercel.app/preview/" + row.ID,
        external_url: "https://solids-minisite-git-infura-aldomedinaz.vercel.app/",
        name: "Solids #" + row.ID,
        background_color: "#fff",
        model_url: modelsBaseURI + "/" + row.ID + ".glb",
        attributes: [
            {
                trait_type: "Dimension",
                value: row.Dim,
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