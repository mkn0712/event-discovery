const axios = require('axios');
const { getFilteredEvents } = require('./event');
const constants = require('./constants')

jest.mock('axios');

describe('getFilteredEvents', () => {
  it('gets the filtered events successfully', async () => {
    const expectedEvents = [
      { id: '1', name: 'Christmas' },
      { id: '2', name: 'Easter' },
    ];

    axios.get.mockResolvedValueOnce({ data: { _embedded: { events: expectedEvents } } });

    const apiKey = constants.apiKey;
    const countryCode = 'US';
    const startDate = '2024-04-08T00:00:00Z';
    const endDate = '2024-04-10T23:59:59Z';

    const events = await getFilteredEvents(apiKey, countryCode, startDate, endDate);

    expect(events).toEqual(expectedEvents);
    expect(axios.get).toHaveBeenCalledWith('https://app.ticketmaster.com/discovery/v2/events', {
      params: {
        apikey: apiKey,
        countryCode: countryCode,
        startDateTime: startDate,
        endDateTime: endDate
      }
    });
  });

  it('handles error when fetching events', async () => {
    const errorMessage = 'Error getting events';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const apiKey = constants.apiKey;
    const countryCode = 'US';
    const startDate = '2024-04-08T00:00:00Z';
    const endDate = '2024-04-10T23:59:59Z';

    await expect(getFilteredEvents(apiKey, countryCode, startDate, endDate)).rejects.toThrow(errorMessage);
  });

  it('returns an empty array when no events are found', async () => {
    axios.get.mockResolvedValueOnce({ data: { _embedded: { events: [] } } });

    const apiKey = constants.apiKey;
    const countryCode = 'US';
    const startDate = '2024-04-08T00:00:00Z';
    const endDate = '2024-04-10T23:59:59Z';

    const events = await getFilteredEvents(apiKey, countryCode, startDate, endDate);

    expect(events).toEqual([]);
  });
});