const request = require('request');
const geocode = require('./geocode');

const weather = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`;
  
  request({
    url,
    json: true,
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather server.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const { temperature, precipProbability } = body.currently;
      const { summary } = body.daily.data[0];
      callback(undefined, 
        `
        Today's forecast: ${summary}
        It is currently ${temperature}° out. There is a ${precipProbability}% chance of rain.
        `
      )
    }
  })

}

module.exports = weather;