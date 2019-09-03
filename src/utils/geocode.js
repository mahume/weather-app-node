const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_KEY}`

  request({
    url,
    json: true,
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location server.', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location.', undefined);
    } else {
      const { place_name, center: [lng, lat] } = body.features[0];
      callback(undefined, {
        place_name,
        lat,
        lng
      })
    }
  })

}

module.exports = geocode;