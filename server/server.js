const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const app = express();
const port = 3000;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: process.env.DB_PASS,
        database: 'learning'
    }
});

// db.select('*').from('courses').then(data => {
//     console.log(data);
// });

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    // res.json({ info: 'hello hello' });
    db('courses').select()
        .then((courses) => {
            res.status(200).json(courses);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    // res.send(db.courses);
});

app.listen(port, () => {
    console.log(`App running on ${port}`);
});