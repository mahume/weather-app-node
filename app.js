require('dotenv').config();
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const location = process.argv[2];

if (!location) {
  console.log('Provide address');
} else {
  geocode(location, (error, { place_name, lat, lng }) => {
    if (error) {
      return console.error(error);
    }
    weather(lat, lng, (error, forecastData) => {
      if (error) {
        return console.error(error);
      }
      console.log(place_name);
      console.log(forecastData);
    })
  })
}

