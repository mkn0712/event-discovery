const axios = require('axios');

// Function to get filtered events from Ticketmaster API
async function getFilteredEvents(apiKey, countryCode, startDate, endDate) {
    try {
        const response = await axios.get('https://app.ticketmaster.com/discovery/v2/events', {
            params: {
                apikey: apiKey,
                countryCode: countryCode,
                startDateTime: startDate,
                endDateTime: endDate
            }
        });

        return response.data._embedded.events;
    } catch (error) {
        console.error('Error getting events:', error);
        throw new Error('Error getting events');
    }
}

module.exports = {
    getFilteredEvents: getFilteredEvents,
};