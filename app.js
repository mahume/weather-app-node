const request = require('request');
require('dotenv').config();

// Geocoding


const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/37.8267,-122.4233`

request({ 
  url, 
  json: true 
}, (error, response) => {
  const { temperature, precipProbability } = response.body.currently;
  const { summary } = response.body.daily.data[0];
  console.log(`
  Today's forecast: ${summary}
  It is currently ${temperature}° out. There is a ${precipProbability}% chance of rain.
  `);
})