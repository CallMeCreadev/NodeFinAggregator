require('dotenv').config({ path: './.env' });
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

class MongoDBUpdater {
  constructor() {
    this.globalVariable = {};
    this.cryptoVariable = {}; // New variable for crypto tokens
    this.cryptoVariableYesterday = {}; // Variable for yesterday's crypto tokens
  }

  async updateData() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      await client.connect();
      const db = client.db("in_the_money");

      // Fetch data from basic_data collection
      const basicDataCollection = db.collection("basic_data");
      const basicDataCursor = basicDataCollection.aggregate([
        { $sort: { timestamp: -1 } }, // Sort by timestamp in descending order
        { $group: { _id: "$name", doc: { $first: "$$ROOT" } } },
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { timestamp: -1 } }, // Sort again by timestamp in descending order
        { $project: { _id: 0, name: 1, additional_info: 1 } }
      ]);

      const basicDataResult = {};
      await basicDataCursor.forEach(doc => {
        console.log(doc);
        basicDataResult[doc.name] = doc.additional_info;
      });

      // Fetch data from crypto_tokens collection
      const cryptoTokensCollection = db.collection("crypto_tokens");
      const cryptoTokensCursor = cryptoTokensCollection.aggregate([
        { $sort: { timestamp: -1 } }, // Sort by timestamp in descending order
        { $group: { _id: "$name", doc: { $first: "$$ROOT" } } }, // Group by name
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { timestamp: -1 } }, // Sort again by timestamp in descending order
        { $limit: 5 }, // Limit to the most recent 5 documents
        { $project: { 
            _id: 0, 
            name: 1, 
            type: 1,
            abbreviation: 1,
            market_cap: 1,
            volume_24h: 1,
            volume_24h_change: 1,
            price_change_24h: 1,
            price_change_all_time: 1,
            "30d_twitter_followers": 1,
            "30d_tweets": 1,
            CMC: 1,
            chain: 1,
            address: 1,
            timestamp: 1, 
        } }
      ]);

      const cryptoTokensResult = {};
      await cryptoTokensCursor.forEach(doc => {
        console.log(doc);
        const key = `${doc.name}`;
        cryptoTokensResult[key] = {
          abbreviation: doc.abbreviation,
          market_cap: doc.market_cap,
          volume_24h: doc.volume_24h,
          volume_24h_change: doc.volume_24h_change,
          price_change_24h: doc.price_change_24h,
          price_change_all_time: doc.price_change_all_time,
          "30d_twitter_followers": doc["30d_twitter_followers"],
          "30d_tweets": doc["30d_tweets"],
          CMC: doc.CMC,
          chain: doc.chain,
          address: doc.address,
          timestamp: doc.timestamp,
        };
      });

      // Fetch data from yesterday crypto collection
      const cryptoTokensCollectionYest = db.collection("yesterday_coins");
      const cryptoTokensYestCursor = cryptoTokensCollectionYest.aggregate([
        { $sort: { timestamp: -1 } }, // Sort by timestamp in descending order
        { $group: { _id: "$name", doc: { $first: "$$ROOT" } } }, // Group by name
        { $replaceRoot: { newRoot: "$doc" } },
        { $sort: { timestamp: -1 } }, // Sort again by timestamp in descending order
        { $limit: 5 }, // Limit to the most recent 5 documents
        { $project: { 
            _id: 0, 
            name: 1, 
            abbreviation: 1,
            CMC: 1,
            price_change: 1,
            type: 1,
            timestamp: 1
        } }
      ]);

      const cryptoTokensYesterday = {};
      await cryptoTokensYestCursor.forEach(doc => {
        console.log(doc);
        const key = `${doc.name}`;
        cryptoTokensYesterday[key] = {
          name: doc.name,
          abbreviation: doc.abbreviation,
          CMC: doc.CMC,
          price_change: doc.price_change,
          type: doc.type,
          timestamp: doc.timestamp
        };
      });

      // Set the results to the respective variables
      this.globalVariable = basicDataResult;
      this.cryptoVariable = cryptoTokensResult;
      this.cryptoVariableYesterday = cryptoTokensYesterday;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      await client.close();
    }
  }
}

const mongoDBUpdater = new MongoDBUpdater();
module.exports = MongoDBUpdater;
