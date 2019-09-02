const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Mike Hume'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mike Hume',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Helpful text.',
    title: 'Help',
    name: 'Mike Hume',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address',
    })
  }
  res.send({
    address: req.query.address,
    forecast: 'It is nice',
    location: 'Denver',
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    })
  }
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Mike Hume',
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: '404: Page not found',
    name: 'Mike Hume',
  });
})

app.listen(3000, () => {
  console.log(`listening on port 3000`);
})