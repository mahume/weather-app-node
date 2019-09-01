const request = require('request');
require('dotenv').config();

// Geocoding
// const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.MAPBOX_KEY}`
// request({
//   url: geocodeURL,
//   json: true,
// }, (error, response) => {
//   const { center: [ lng, lat ] } = response.body.features[0];
//   console.log(lat, lng);
  
// })

// Weather
const weatherURL = `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/37.8267,-122.4233`

request({ 
  url: weatherURL,
  json: true,
}, (error, response) => {
  if (error) {
    console.log('Unable to connect to weather server.');
  } else if (response.body.error) {
    console.log('Unable to find location.');
  } else {
    const { temperature, precipProbability } = response.body.currently;
    const { summary } = response.body.daily.data[0];
    console.log(`
    Today's forecast: ${summary}
    It is currently ${temperature}° out. There is a ${precipProbability}% chance of rain.
    `);
  }
})