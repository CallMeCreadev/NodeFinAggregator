const express = require('express');
const MongoDBUpdater = require('./mongoDBUpdater');
const mongoDBUpdater = new MongoDBUpdater();
const app = express();
const PORT = 3000;

async function updateData() {
  await mongoDBUpdater.updateData();
  setInterval(() => mongoDBUpdater.updateData(), 24 * 60 * 60 * 1000); // Run every 24 hours
}

updateData().then(() => {
  const globalDataVariable = mongoDBUpdater.globalVariable;
  console.log(globalDataVariable);

  // Set EJS as the view engine
  app.set('view engine', 'ejs');

  // Route handler for home page
  app.get('/', (req, res) => {

    // Pass the data variable to the index.ejs template
    res.render('index', { globalDataVariable });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
