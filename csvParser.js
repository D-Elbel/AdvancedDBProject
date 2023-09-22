const csv = require("csv-parser");
const fs = require("fs");
const { sep } = require("path");

const inputFilePath = "./CSV_Files";
const outPutFilePath = "./Processed_JSON_Files";

fs.readdir(inputFilePath, (err, files) => {
  files.forEach((file) => {
    let fileName = file.split(".")[0];
    let jsonArray = [];

    fs.createReadStream(`${inputFilePath}/${file}`)
      .pipe(csv())
      .on("data", (row) => {
        jsonArray.push(row);
      })
      .on("end", () => {
        const jsonContent = JSON.stringify(jsonArray, null, 2);
        fs.writeFile(
          `${outPutFilePath}/${fileName}.json`,
          jsonContent,
          (err) => {
            if (err) {
              console.error(`Error writing ${fileName}.json:`, err);
            } else {
              console.log(`${fileName}.json has been saved`);
            }
          }
        );
      });
  });
});

fs.readFile("./riders-finishing-positions.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading input file:", err);
    return;
  }

  const inputData = JSON.parse(data);

  const result = inputData.reduce((acc, entry) => {
    const country = entry.Country;
    const riderInfo = {
      name: entry.Rider,
      Victories: entry.Victories,
      NumberofSecond: entry.NumberofSecond,
      NumberofThird: entry.NumberofThird,
      Numberof4th: entry.Numberof4th,
      Numberof5th: entry.Numberof5th,
      Numberof6th: entry.Numberof6th,
    };

    if (!acc[country]) {
      acc[country] = {
        Country: country,
        Riders: [],
      };
    }

    acc[country].Riders.push(riderInfo);
    return acc;
  }, {});

  const finalResult = Object.values(result);

  const outputJson = JSON.stringify(finalResult, null, 2);
  fs.writeFile("output.json", outputJson, "utf8", (err) => {
    if (err) {
      console.error("Error writing output file:", err);
      return;
    }
    console.log("Result written to output.json");
  });
});

fs.readFile("output.json", "utf8", (err, data) => {
  const outputData = JSON.parse(data);

  outputData.forEach((countryData) => {
    const country = countryData.Country;
    const filename = `${country}.json`;

    fs.writeFile(
      filename,
      JSON.stringify(countryData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error(`Error writing ${filename}:`, err);
        } else {
          console.log(`Created ${filename}`);
        }
      }
    );
  });
});
