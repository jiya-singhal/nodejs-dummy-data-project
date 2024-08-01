  exports.getData = async (db) => {
    if (!db) {
      throw new Error('The Database connection is missing');
    }

    try {
        const collection = db.collection('data');
        const data = await collection.find({}).toArray();
        console.log('Retrieved', data.length, 'records from MongoDB');
        return data;
    } catch (error) {
        console.error('An error occurred while retrieving data from MongoDB:', error.message);
        throw new Error('Unable to retrieve data from the database');
    }
};
