require('sucrase/register'); // subset of babel
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const { engine }  = require('express-handlebars');
const jsxEngine = require('./lib/react-server');
const fs = require('fs');

const app = express();
app.engine('.jsx', jsxEngine);
app.engine('handlebars', engine({layoutsDir: path.join(app.settings.views, 'handlebars', 'layouts')}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.render('start');
});

// Check for local data middleware
app.use('/jsx', (req,_,next) => {

  fs.stat('data.json', err => {
    if (err) {
      try {
        updateData(req)
      }
      catch { err => err }
      req.getLocalQuotes = false
    } else {
      req.getLocalQuotes = true
    }
    next()
  })
})

// Protect it: Remote system hits here
app.use('/update-data-hook', (req, res) => {
    updateData(req)
    .then(() => res.send('Local Up to Date'))
})

// Protect it: Clients call for data here
app.get('/get-local-data', (_, res) => {
  try {
    const data = fs.readFileSync('data.json')
    let obj = JSON.parse(data)
    res.status(200).json(obj)
  } catch { err => err }
})

// Protect it
function saveData( fileExist, json ) {

  if(!fileExist) {
    fs.writeFile("data.json", json, err => {
      if(err) {
       throw new Error(err.message)
      }
    })
  }

}

// Protext it: Updates local data-file when missing/new data
async function updateData(req) {
  const quotes = [
    'FTSE:FSI',
    'INX:IOM',
    'EURUSD',
    'GBPUSD',
    'IB.1:IEU'
  ]
  let obj = {
    data: []
  }
  await Promise.all( quotes.map( quote =>
    fetch(`https://markets-data-api-proxy.ft.com/research/webservices/securities/v1/quotes?symbols=${quote}`)
    .then( result => result.json() )
    .then( json => json.data )
    .then( data => JSON.parse(JSON.stringify(data)) )
    .then( ob => {
      obj.data.push(ob)
    }))
  ).then( () => {
      saveData(req.getLocalQuotes, JSON.stringify(obj))
  })
}

/*
* START HERE FOR JSX TEMPLATING
*/
app.get('/jsx', (req, res) => {
  let data;
  
  if(req.getLocalQuotes){
    try {
      data = fs.readFileSync('data.json', 'utf8', (err, result) => {
        if(err) throw new Error()
      })
    } catch { err => data = null}
  }
  const templateData = {
    data: JSON.parse(data),
    pageTitle: 'Financial Times',
    content: 'Hello World!'
  }

  res.render('jsx/Main.jsx', templateData);
});
/*
* END JSX TEMPLATING
*/


/*
* START HERE FOR HANDLEBARS TEMPLATING
*/

app.get('/handlebars', async function (req, res) {
    // This object is passed to the Handlebars template.
    const templateData = {
        pageTitle: 'Home',
        content: 'Hello World!'
    };

    // This renders the Handlebars view at `views/home.handlebars`.
    res.render('handlebars/home', templateData);
});
/*
* END HANDLEBARS TEMPLATING
*/

if(process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {console.log(`Running on http://localhost:${port}`)});
}

// Export the app so that we can test it in `test/app.spec.js`
module.exports = app;
