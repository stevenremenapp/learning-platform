import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Course from './components/Course/Course';
import './App.css';
require('dotenv').load();

const courseAPI = process.env.REACT_APP_COURSE_API;
console.log(courseAPI);
const editShelfAPI = process.env.REACT_APP_EDIT_COURSE_API;

// let heightTest;
let reportHeight = true;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      courses: [],
      stashedCoursesShowing: true,
      stashedCoursesHeight: {height: 0}
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
        // {
        //   console.log(`CID: ${course.id} & RID: ${response[0].id}`);
        // });
        updatedState[indexOfItemToChange] = response[0];
        this.setState({ courses: updatedState });
      });
      // REPORTHEIGHT = TRUE TRIGGERS CALCULATION OF SHELF HEIGHT SO SHELF IS RESIZED ON COURSE MOVEMENT
      reportHeight = true;
  }

  componentDidUpdate = () => {
    // console.log(this.state);
    // console.log(this.refs);
    // console.log("callback");
    // if (!this.state.stashedCoursesShowing) {
    //   console.log(this.refs);
    //   console.log(this.refs.courseAccordion.style);
      //this.refs.courseAccordion.style = {height: 0};
    // } else {
      // console.log(this.refs);
      // console.log(this.refs.courseAccordion.style)
      //this.refs.courseAccordion.style = {height: "100%"}
      // this.refs.courseAccordion.style = {height: `${this.refs.wrapper.clientHeight} px`}
      //this.refs.courseAccordion.style.height = this.refs.wrapper.clientHeight + 'px';
    // }
      // console.log(this.refs.courseAccordionWrapper.style.maxHeight);
      if (reportHeight) {
        // let rect = this.refs.courseAccordionWrapper.getBoundingClientRect();
        // let rectHeight = rect.height;

        let courseDiv = this.refs.courseAccordionWrapper;
        // console.log(this.returnWrapperHeight(courseDiv));

        this.state.stashedCoursesShowing ?
        // this.setState({ stashedCoursesHeight: { height: `${this.refs.courseAccordionWrapper.clientHeight} px` }}) :
        this.setState({ stashedCoursesHeight: this.returnWrapperHeight(courseDiv) }) :
        this.setState({ stashedCoursesHeight: { height: 0 }});

        // console.log(rect.height);
        // console.log(this.refs.courseAccordionWrapper);
      }
      reportHeight = false;
      // console.log(reportHeight);
      //heightTest = this.refs.courseAccordionWrapper.style.height;
      // if (this.reportHeight === true) {
      //   heightTest = this.refs.courseAccordionWrapper.style.height;
      // }
      // reportHeight = false;

    };

  showOrHideStashedCourses = () => {
    reportHeight = true;
    this.setState({stashedCoursesShowing: !this.state.stashedCoursesShowing});
    //reportHeight = true;

    //   , () => {
    //   //console.log("callback");
    //   if (this.state.stashedCoursesShowing) {
    //     this.refs.courseAccordion.style.height = 0;
    //   } else {
    //     this.refs.courseAccordion.style.height = this.refs.wrapper.clientHeight + 'px';
    //   }
    // });
  }

  returnWrapperHeight = (node) => {
    // let height = { maxHeight: "1500px" };
    // let noHeight = { maxHeight: 0 };
    // return this.state.stashedCoursesShowing
    // ? height
    // : noHeight

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

    return { height };
  }



  render() {

    const { isLoaded, courses } = this.state;
    const wrapperHeight = !this.state.stashedCoursesShowing ? 0 : this.state.stashedCoursesHeight;

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
                <p className="emptyShelfText">
                  <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">👻&nbsp;</span>
                  Nothing here!
                  <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">&nbsp;👻</span>
                </p>
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
                <p className="emptyShelfText">
                  <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">👻&nbsp;</span>
                  Nothing here!
                  <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">&nbsp;👻</span>
                </p>
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
                <p className="emptyShelfText">
                  <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">👻&nbsp;</span>
                  Nothing here!
                  <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">&nbsp;👻</span>
                </p>
              }
            </div>
            <div className="shelf">
              <div className="stashed">
                <div className="stashedContainer" onClick={this.showOrHideStashedCourses}>
                  <h2 className="stashedTitle">Stashed:</h2>
                  <div className="stashedShowHideContainer">
                    <span className={`stashedShowHideText ${this.state.stashedCoursesShowing ? "hide" : ""}`} id="stashedShowHideText">{this.state.stashedCoursesShowing ? "HIDE" : "SHOW"}</span>
                    <img src={require('./icons/add-black.svg')} alt="Icon to open or close stashed courses." className={`stashedIcon ${this.state.stashedCoursesShowing ? "hide" : ""}`} />
                  </div>
                </div>
              </div>
              <div
                ref="courseAccordion"
                className={`courseAccordion ${!this.state.stashedCoursesShowing ? "hidden" : ""}`}
                >
                <div
                  ref="courseAccordionWrapper"
                  className="courseAccordionWrapper"
                  // style={{...this.returnWrapperHeight()}}
                  style={this.state.stashedCoursesHeight}
                  // style={wrapperHeight}
                  >
                  {
                    // courses.filter(course => course.shelf === "none").length > 0 && !this.state.stashedCoursesShowing ?
                    // <h1>HIDDEN</h1> :
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
                    <p className="emptyShelfText">
                      <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">👻&nbsp;</span>
                      Nothing here!
                      <span role="img" aria-label="Ghost emoji." className="emptyShelfEmoji">&nbsp;👻</span>
                    </p>
                  }
                </div>
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
