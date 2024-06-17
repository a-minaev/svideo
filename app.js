import express from 'express';
import bodyParser from'body-parser';
import cors from 'cors';
const app = express();
const db = require('./db/routes');

const PORT = process.env.PORT || 4001;
app.use(cors());
app.use(bodyParser.json());
app.use('/', db);

app.use((err,req, res, next) => {
    if(!err.status) {
        err.status = 500;
    }
    res.status(err.status).send(err.message);
})
app.listen(PORT, () => {
    console.log(`You are now tuned in to svideo on PORT ${PORT}`);
});