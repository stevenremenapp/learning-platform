const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    // res.json({ info: 'hello hello' });
    res.render('../src/App.js');
});

app.listen(port, () => {
    console.log(`App running on ${port}`);
});