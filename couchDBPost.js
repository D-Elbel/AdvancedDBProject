const CouchDB = require("node-couchdb");
const fs = require("fs");

const couch = new CouchDB({
  host: "127.0.0.1",
  protocol: "http",
  port: 5984,
  auth: {
    user: "X",
    pass: "X`",
  },
});

const dbName = "motogp";
const countriesFolder = "./countries";

fs.readdir(countriesFolder, (err, files) => {
  files.forEach((file) => {
    fs.readFile(`${countriesFolder}/${file}`, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let document;
      try {
        document = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return;
      }

      couch
        .insert(dbName, document)
        .then(({ data }) => {
          console.log(`${file} added successfully`, data);
        })
        .catch((error) => {
          console.error(`Error adding ${file}`, error);
        });
    });
  });
});
