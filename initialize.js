const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const DATA_URL = process.env.DATA_URL;
const MONGO_URI = process.env.MONGO_URI;

async function initialize() {
    let client;
    try {
        if (!DATA_URL || !MONGO_URI) {
            throw new Error('Environment variables are missing');
        }

        client = new MongoClient(MONGO_URI);
        await client.connect();
        console.log('Successfully connected to MongoDB');

        const db = client.db('dataAPI');
        const collection = db.collection('data');

        const count = await collection.countDocuments();
        if (count > 0) {
            console.log('Removing existing documents from the collection...');
            await collection.deleteMany({});
        }

        console.log('Retrieving data from external source...');
        const { data: dummyData } = await axios.get(DATA_URL);
        await collection.insertMany(dummyData);
        console.log('Data successfully retrieved and inserted into MongoDB');
    } catch (error) {
        console.error('Error during data initialization:', error.message);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

initialize();
