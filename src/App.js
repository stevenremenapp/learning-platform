import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './components/Course/Course';
import './App.scss';
require('dotenv').load();

const courseAPI = process.env.REACT_APP_COURSE_API;
const editShelfAPI = process.env.REACT_APP_EDIT_COURSE_API;

let reportHeight = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      courses: [],
      shelvesShowing: {
        stashed: true
      },
      shelfHeight: {
        stashed: {}
      }
      //stashedCoursesShowing: true,
      //stashedCoursesHeight: {}
    }
  }

  componentDidMount() {
    document.title = 'Learning Platform';
    fetch(courseAPI)
      .then(response => response.json())
      .then(response => {
        this.setState({
          courses: response,
          isLoaded: true,
        });
    });
}

  updateCourseLocation = (course, shelf) => {
    console.log(course);
    console.log(shelf);
    // Post change to backend
    fetch(editShelfAPI, {
      method: 'PUT',
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
        updatedState[indexOfItemToChange] = response[0];
        this.setState({ courses: updatedState });
      });
      // REPORTHEIGHT = TRUE TRIGGERS CALCULATION OF SHELF HEIGHT SO SHELF IS RESIZED ON COURSE MOVEMENT
      reportHeight = true;
  }

  componentDidUpdate = () => {
      if (reportHeight) {
        let stashedDiv = this.refs.shelfAccordionWrapper;
        let stashedName = this.refs.shelfAccordionWrapper.getAttribute('name');
        this.state.shelvesShowing.stashed ?
        this.setState({ shelfHeight: this.returnWrapperHeight(stashedDiv, stashedName) }) :
        this.setState({ shelfHeight: { stashed: { height: 0 } } });
      }
      reportHeight = false;
    };

  showOrHideStashedCourses = (e) => {
    reportHeight = true;
    const currentShelvesShowing = {...this.state.shelvesShowing};
    currentShelvesShowing[e.currentTarget.getAttribute('name')] = !currentShelvesShowing[e.currentTarget.getAttribute('name')];
    this.setState({shelvesShowing: currentShelvesShowing});
  }

  returnWrapperHeight = (node, name) => {

    const containerStyle = {
      display: "inline-block",
      position: "absolute",
      visibility: "hidden",
      zIndex: -1,
    };

    const container = document.createElement("div");
    container.style = containerStyle;

    const clonedNode = node.cloneNode(true);
    clonedNode.style = { height: "auto" };

    container.appendChild(clonedNode);

    document.body.appendChild(container);

    const height = container.clientHeight;

    container.parentNode.removeChild(container);

    reportHeight = true;

    //return { height };
    return {
        [name]: { height }
    }
  }

  returnEmptyShelfHtml = () => {
    return (
      <p className="emptyShelfText">
        <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">👻&nbsp;</span>
        Nothing here!
        <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">&nbsp;👻</span>
      </p>
    )
  }

  render() {

    const { isLoaded, courses } = this.state;

    if (!isLoaded) {
      return (<h1>Loading...</h1>);
    } else {
        return (
          <div className="App">
            <div className="shelf">
              <h2>Currently Taking:</h2>
              {
                courses.filter(course => course.shelf === "currentlyTaking").length > 0 ?
                <div>
                {courses.filter(course => course.shelf === "currentlyTaking").map((course) => {
                  return (
                    <Course
                      key={course.id}
                      {...course}
                      updateCourseLocation={this.updateCourseLocation}
                    />
                  )
                })}
                </div> :
                <div>
                  {this.returnEmptyShelfHtml()}
                </div>
              }
            </div>
            <div className="shelf">
              <h2>Want to Take:</h2>
              {
                courses.filter(course => course.shelf === "wantToTake").length > 0 ?
                <div>
                {courses.filter(course => course.shelf === "wantToTake").map((course) => {
                  return (
                    <Course
                      key={course.id}
                      {...course}
                      updateCourseLocation={this.updateCourseLocation}
                    />
                  )
                })}
                </div> :
                <div>
                  {this.returnEmptyShelfHtml()}
                </div>
              }
            </div>
            <div className="shelf">
              <h2>Completed:</h2>
              {
                courses.filter(course => course.shelf === "completed").length > 0 ?
                <div>
                {courses.filter(course => course.shelf === "completed").map((course) => {
                  return (
                    <Course
                      key={course.id}
                      {...course}
                      updateCourseLocation={this.updateCourseLocation}
                    />
                  )
                })}
                </div> :
                <div>
                  {this.returnEmptyShelfHtml()}
                </div>
              }
            </div>
            <div className="shelf">
              <div className="stashedContainer" name="stashed" onClick={this.showOrHideStashedCourses}>
                <div className="stashedTitleContainer">
                  <h2 className="stashedTitle">Stashed:</h2>
                  <div className="stashedShowHideContainer">
                    <span className={`stashedShowHideText ${this.state.shelvesShowing.stashed ? "hide" : ""}`} id="stashedShowHideText">{this.state.shelvesShowing.stashed ? "HIDE" : "SHOW"}</span>
                    <img src={require('./icons/add-black.svg')} alt="Icon to open or close stashed courses." className={`stashedIcon ${this.state.shelvesShowing.stashed ? "hide" : ""}`} />
                  </div>
                </div>
              </div>
              <div
                ref="shelfAccordionWrapper"
                className="shelfAccordionWrapper"
                name="stashed"
                style={this.state.shelfHeight.stashed}
                >
                {
                  courses.filter(course => course.shelf === "none").length > 0 ?
                  <div>
                      {courses.filter(course => course.shelf === "none").map((course) => {
                        return (
                          <Course
                            key={course.id}
                            {...course}
                            updateCourseLocation={this.updateCourseLocation}
                          />
                        )
                      })}
                  </div> :
                  <div>
                    {this.returnEmptyShelfHtml()}
                  </div>
                }
              </div>
            </div>
            <div className="addCourseIcon" title="Add a Course">
              <Link to="/addcourse">Add a Course</Link>
            </div>
          </div>
        );
      }
  }
}

export default App;
