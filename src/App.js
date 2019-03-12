import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './components/Course/Course';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="shelf">
          <h2>Currently Taking:</h2>
          <Course />
          <Course />
        </div>
        <div className="shelf">
          <h2>Want to Take:</h2>
          <Course />
          <Course />
          <Course />
        </div>
        <div className="shelf">
          <h2>Completed:</h2>
          <Course />
          <Course />
        </div>
        <div className="addCourseIcon">
          <Link to="/addcourse">Add a Course</Link>
        </div>
      </div>
    );
  }
}

export default App;
