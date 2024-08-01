const { filterData, sortData } = require('../utils/dataUtils');

exports.getData = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('data');
        
        let data = await collection.find({}).toArray();
        const { filter, sort, ...otherParams } = req.query;

        if (Object.keys(otherParams).length > 0) {
            const unrecognizedParams = Object.keys(otherParams).join(', ');
            return res.status(400).json({
                error: 'Invalid query parameter',
                message: `The following query parameter(s) are not recognized: ${unrecognizedParams}`
            });
        }

        if (filter) {
            try {
                data = filterData(data, filter);
            } catch (error) {
                return res.status(400).json({ error: 'Filter application error', message: error.message });
            }
        }

        if (sort) {
            try {
                data = sortData(data, sort);
            } catch (error) {
                return res.status(400).json({ error: 'Sorting application error', message: error.message });
            }
        }

        res.json(data);
    } catch (error) {
        console.error('Error while fetching data:', error);
        res.status(500).json({ error: 'Server error', message: 'An issue occurred while processing your request' });
    }
};
