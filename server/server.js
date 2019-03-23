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

app.get('/api/v1/courses', (req, res) => {
    // res.json({ info: 'hello hello' });
    // db('courses').select()
    //     .then(courses => {
    //         res.status(200).json(courses);
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error });
    //     });
    // res.send(db.courses);
    returnAllCourses(req, res);
});

app.post('/editshelf', (req, res) => {
    console.log(req.body);
    // Update the item in the course database
    db('courses').select()
        .where({ id: req.body.id })
        .update({ shelf: req.body.shelf })
        // .then(result => res.json(result));
        // Return all items of the row that was updated
        .returning('*')
        // Send to front end
        .then(course => {
            console.log(`shelf: ${course[0].shelf}`);
            res.json(course);
        });
})

app.listen(port, () => {
    console.log(`App running on ${port}`);
});

function returnAllCourses(req, res) {
    return db('courses').select()
        .then(courses => {
            res.status(200).json(courses);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}