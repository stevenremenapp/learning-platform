const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator/check');
const knex = require('knex');
require('dotenv').config({path: '../.env'});

const app = express();
const path = require('path');

// const port = process.env.SERVER_PORT;
//for heroku
const port = process.env.PORT;

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

app.get('/api/v1/courses', (req, res) => {
    returnAllCourses(req, res);
});
app.put('/api/v1/editshelf', (req, res) => {
    console.log(req.body);
    // Update the item in the course database
    db('courses')
        .select()
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

// COMMON PRACTICE IS:
// app.get('/api/v1/courses/)
// app.post('/api/v1/courses/)
// app.put('/api/v1/courses)
// etc. so that all the types of requests on courses are similarly named similarly findable

app.put('/api/v1/courses/:id', [
    // Validate and sanitize with express-validator
    body('title').isLength({ max: 200 }).withMessage('Title must be 200 characters or less.'),
    body('title').not().isEmpty().withMessage('Please enter a title.'),
    body('title').trim().escape(),
    body('author').isLength({ max: 200 }).withMessage('Author must be 200 characters or less.'),
    body('author').not().isEmpty().withMessage('Please enter an author.'),
    body('author').trim().escape(),
    body('description').optional({ checkFalsy: true }).isLength({ max: 1000 }).withMessage('Description must be 1,000 characters or less.'),
    body('description').trim().escape(),
    // Express validator and the HTML Decode on course.js in the edit input fields are not playing well together
    // body('link').optional({ checkFalsy: true }).isURL().withMessage('A valid URL must be entered, for example: https://www.udemy.com'),
    body('link').trim().escape(),
    body('percentagecomplete').isInt({ gt: -0.01, lt: 100.01 }).withMessage("Please enter a number between 0 and 100 for the percentage of class you've completed."),
    body('percentagecomplete').not().isEmpty().withMessage("Please enter the percentage of the course you've completed."),
    body('percentagecomplete').trim(),
    body('timespent').isInt({ gt: -0.01 }).withMessage("Please enter a number zero or greater for the time you've spent on this class."),
    body('timespent').not().isEmpty().withMessage("Please enter the time you've spent on this course."),
    body('timespent').trim(),
    body('notes').optional({ checkFalsy: true }).isLength({ max: 10000 }).withMessage('Notes field must be 10,000 characters or less.'),
    body('notes').trim().escape()
], (req, res) => {

    // Find errors and place in object

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    db('courses')
        .select()
        .where({ id: req.body.id })
        .update({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            link: req.body.link,
            percentagecomplete: req.body.percentagecomplete,
            timespent: req.body.timespent,
            shelf: req.body.shelf,
            notes: req.body.notes
        })
        .then(response => {
            res.status(200).json(response);
        })

        console.log("edit endpoint hit");

})

app.post('/api/v1/addcourse', [
    // Validate and sanitize with express-validator
    body('title').isLength({ max: 200 }).withMessage('Title must be 200 characters or less.'),
    body('title').not().isEmpty().withMessage('Please enter a title.'),
    body('title').trim().escape(),
    body('author').isLength({ max: 200 }).withMessage('Author must be 200 characters or less.'),
    body('author').not().isEmpty().withMessage('Please enter an author.'),
    body('author').trim().escape(),
    body('description').optional({ checkFalsy: true }).isLength({ max: 1000 }).withMessage('Description must be 1,000 characters or less.'),
    body('description').trim().escape(),
    body('link').optional({ checkFalsy: true }).isURL().withMessage('A valid URL must be entered, for example: https://www.udemy.com'),
    body('link').trim().escape(),
    body('percentagecomplete').isInt({ gt: -0.01, lt: 100.01 }).withMessage("Please enter a number between 0 and 100 for the percentage of class you've completed."),
    body('percentagecomplete').not().isEmpty().withMessage("Please enter the percentage of the course you've completed."),
    body('percentagecomplete').trim(),
    body('timespent').isInt({ gt: -0.01 }).withMessage("Please enter a number zero or greater for the time you've spent on this class."),
    body('timespent').not().isEmpty().withMessage("Please enter the time you've spent on this course."),
    body('timespent').trim(),
    body('notes').optional({ checkFalsy: true }).isLength({ max: 10000 }).withMessage('Notes field must be 10,000 characters or less.'),
    body('notes').trim().escape()
], (req, res) => {

    // Find errors and place in object

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Insert into database
    // console.log(req.body);
    db('courses')
        .insert({
            // id: DEFAULT,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            link: req.body.link,
            percentagecomplete: req.body.percentagecomplete,
            timespent: req.body.timespent,
            shelf: req.body.shelf,
            notes: req.body.notes
        })
        .returning('*')
        .then(course => {
            res.status(201).json(course);
        })
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// })


// || 5000 added for heroku
app.listen(port || 5000, () => {
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