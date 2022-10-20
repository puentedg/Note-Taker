const express = require('express');
const path = require('path');
const {clog} = require('./middleware/clog')
const htmlRoutes = require('./routes/html-routes')
const apiRoutes = require('./routes/api-routes')

const PORT = process.env.PORT || 3001;
const app = express();
// Middleware 
app.use(clog)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);