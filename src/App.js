import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './components/Course/Course';
import './App.css';
require('dotenv').load();

const courseAPI = process.env.REACT_APP_COURSE_API;
console.log(courseAPI);
const editShelfAPI = process.env.REACT_APP_EDIT_COURSE_API;
 
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      courses: []
    }
  }

  componentDidMount() {
    document.title = 'Learning Platform';
    fetch(courseAPI)
      .then(response => response.json())
      .then(response => {
        this.setState({
          courses: response,
          isLoaded: true
        });
  })
}

  updateCourseLocation = (course, shelf) => {
    console.log(course);
    console.log(shelf);
    // Post change to backend
    fetch(editShelfAPI, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: course,
        shelf: shelf
      })
    })
      // Get response from backend
      .then(response => response.json())
      // Update the state on the frontend by copying the state, mutating that array, and setting that updated array as state
      .then(response => {
        console.log(response);
        let updatedState = [...this.state.courses];
        let indexOfItemToChange = updatedState.findIndex(course => course.id === response[0].id);
        // {
        //   console.log(`CID: ${course.id} & RID: ${response[0].id}`);
        // });
        updatedState[indexOfItemToChange] = response[0];
        this.setState({ courses: updatedState });
      });
  }

  render() {

    const { isLoaded, courses } = this.state;

    if (!isLoaded) {
      return (<h1>Loading...</h1>);
    } else {
        return (
          <div className="App">
            <div className="shelf">
              <h2>Currently Taking:</h2> {courses.filter(course => course.shelf === "currentlyTaking").map((course) => {
                return (
                  <Course
                    key={course.id}
                    {...course}
                    updateCourseLocation={this.updateCourseLocation}
                  />
                )
              })}
            </div>
            <div className="shelf">
              <h2>Want to Take:</h2> {courses.filter(course => course.shelf === "wantToTake").map((course) => {
                return (
                  <Course
                    key={course.id}
                    {...course}
                    updateCourseLocation={this.updateCourseLocation}
                  />
                )
              })}
            </div>
            <div className="shelf">
              <h2>Completed:</h2> {courses.filter(course => course.shelf === "completed").map((course) => {
                return (
                  <Course
                    key={course.id}
                    {...course}
                    updateCourseLocation={this.updateCourseLocation}
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
}

export default App;
