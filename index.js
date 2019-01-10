const express = require('express');


const expressConfig = require('./config/express');
require('./config/database');


const port = process.env.PORT || 3023;
const app = express();


app.use(express.static('public'));


expressConfig(app);

app.listen(port);
logger.info(`Server started on port ${port}`);

module.exports = app;
