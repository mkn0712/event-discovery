const express = require('express');
let { getFilteredEvents } = require('./event')
const constants  = require('./constants')

const app = express();
const port = 8000;

// Add headers before the routes are defined
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

// API to get the filtered events
app.get('/events', async (req, res) => {
    const apiKey = constants.apiKey;
    const countryCode = req.query.countryCode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
        const events = await getFilteredEvents(apiKey, countryCode, startDate, endDate);
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});