const express = require('express');
const MongoDBUpdater = require('./mongoDBUpdater');
const mongoDBUpdater = new MongoDBUpdater();
const app = express();
const PORT = 3000;

// Global variables to hold data
let globalDataVariable = {};
let cryptoDataVariable = {};
let cryptoYesterdayDataVariable = {}; // Define the variable

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Function to update data from MongoDB
async function updateData() {
  try {
    console.log("Updating data from MongoDB...");
    await mongoDBUpdater.updateData();
    globalDataVariable = mongoDBUpdater.globalVariable; // Update the global variable for basic data
    cryptoDataVariable = mongoDBUpdater.cryptoVariable; // Update the variable for crypto tokens
    cryptoYesterdayDataVariable = mongoDBUpdater.cryptoVariableYesterday; // Update the variable for crypto tokens from yesterday
    console.log("Data updated successfully");
  } catch (error) {
    console.error("Failed to update data:", error);
  }
}

// Start the server and initial data load
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await updateData(); // Ensure initial data load
});

// Periodically update data
setInterval(() => {
  updateData().then(() => {
    console.log("Periodic data update completed");
  }).catch(error => {
    console.error("Periodic data update failed:", error);
  });
}, 24 * 60 * 60 * 1000); // Update every 24 hours

// Route handler for home page
app.get('/', (req, res) => {
  res.render('index', { globalDataVariable, cryptoDataVariable, cryptoYesterdayDataVariable });
});
