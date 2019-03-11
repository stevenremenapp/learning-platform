import React, { Component } from 'react';
import Course from './components/Course/Course'
import AddCourseIcon from './icons/add.svg';
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
        <img src = { AddCourseIcon } className="addCourseIcon" alt="Button to add course." />
      </div>
    );
  }
}

export default App;
