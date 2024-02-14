const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const database = require('./database/routes');

const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(bodyParser.json());
app.use('/', database);

app.use((err,req, res, next) => {
    if(!err.status) {
        err.status = 500;
    }
    res.status(err.status).send(err.message);
})
app.listen(PORT, () => {
    console.log(`You are now tuned in to svideo on PORT ${PORT}`);
});