//SETTING REQUIREMENTS
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//SETTING UP PORT
const app = express();
const PORT = process.env.PORT || 3001;

//SET UP MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//SERVER START-UP
app.listen(PORT, () => console.log(`PORT: ${PORT} is now listening to you`));