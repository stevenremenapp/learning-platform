import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './components/Course/Course';
import './App.css';

let courseDb = [
  {
    "title": "Web Developer Bootcamp",
    "author": "Colt Steele",
    "description": "Intro to full stack web dev",
    "link": "https://www.udemy.com/the-web-developer-bootcamp/",
    "percentageComplete": 62,
    "timeSpent": "14 hours",
    "shelf": "currentlyTaking"
  },
  {
    "title": "The Advanced Web Developer Bootcamp",
    "author": "Colt Steele",
    "description": "Advanced full stack web dev",
    "link": "https://www.udemy.com/the-advanced-web-developer-bootcamp/",
    "percentageComplete": 0,
    "timeSpent": "0 hours",
    "shelf": "wantToTake"
  },
  {
    "title": "JavaScript 30",
    "author": "Wes Bos",
    "description": "30 JS projects in 30 days",
    "link": "https://javascript30.com/",
    "percentageComplete": 40,
    "timeSpent": "8 hours",
    "shelf": "currentlyTaking"
  },
  {
    "title": "Practical JavaScript",
    "author": "Gordon Zhu",
    "description": "Build a strong JavaScript foundation for the web",
    "link": "https://watchandcode.com/p/practical-javascript",
    "percentageComplete": 30,
    "timeSpent": "2 hours",
    "shelf": "currentlyTaking"
  },
  {
    "title": "The Complete Web Developer in 2019: Zero to Mastery",
    "author": "Andrei Neagoie",
    "description": "Learn to code and become a web developer in 2019 with HTML, CSS, Javascript, React, Node.js, Machine Learning & more!",
    "link": "https://www.udemy.com/the-complete-web-developer-zero-to-mastery/",
    "percentageComplete": 55,
    "timeSpent": "18 hours",
    "shelf": "currentlyTaking"
  },
  {
    "title": "Udacity Front End Nanodegree",
    "author": "Udacity",
    "description": "In the Front End Developer Nanodegree program, you will complete five projects and build a resume-worthy portfolio.",
    "link": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001",
    "percentageComplete": 100,
    "timeSpent": "124 hours",
    "shelf": "completed"
  }
]

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="shelf">
          {/* {console.log(courses)} */}
          <h2>Currently Taking:</h2> {courseDb.filter(course => course.shelf === "currentlyTaking").map((course, index) => {
            return (
              <Course
                key={`currentlyTaking-course-${index}`}
                {...course}
              />
            )
          })}
        </div>
        <div className="shelf">
          <h2>Want to Take:</h2> {courseDb.filter(course => course.shelf === "wantToTake").map((course, index) => {
            return (
              <Course
                key={`wantToTake-course-${index}`}
                {...course}
              />
            )
          })}
        </div>
        <div className="shelf">
          <h2>Completed:</h2> {courseDb.filter(course => course.shelf === "completed").map((course, index) => {
            return (
              <Course
                key={`completed-course-${index}`}
                {...course}
              />
            )
          })}
        </div>
        <div className="addCourseIcon">
          <Link to="/addcourse">Add a Course</Link>
        </div>
      </div>
    );
  }
}

export default App;
