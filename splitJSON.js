const fs = require("fs");

fs.readFile("./players_20.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the JSON file:", err);
    return;
  }
  //Removing invisible UTF characters, artifact from the CSV conversion
  const inputData = JSON.parse(data.replace(/\uFEFF/g, ""));
  const nationalityPlayers = {};

  for (let i = 0; i < inputData.length; i++) {
    const player = inputData[i];
    const nationality = player.nationality;

    if (!nationalityPlayers[nationality]) {
      //Create new nationality if it doesnt exist already
      nationalityPlayers[nationality] = [];
    }

    nationalityPlayers[nationality].push(player);
  }

  // Creating JSON files for each nationality
  for (const nationality in nationalityPlayers) {
    const nationalityData = nationalityPlayers[nationality];
    fs.writeFileSync(
      `./nations/${nationality}.json`,
      JSON.stringify(nationalityData, null, 2),
      (err) => {
        if (err) {
          console.error(`Error writing ${nationality}.json`, err);
        } else {
          console.log(`${nationality}.json saved`);
        }
      }
    );
  }
});
