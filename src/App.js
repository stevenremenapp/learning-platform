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
        currentlyTaking: true,
        wantToTake: true,
        completed: true,
        stashed: true
      },
      shelfHeight: {
        currentlyTaking: {},
        wantToTake: {},
        completed: {},
        stashed: {}
      }
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

  componentDidUpdate = () => {
    if (reportHeight) {
      this.setShelfHeights();
    }
    reportHeight = false;
  };

  setReportHeightToTrueAndForceUpdate = () => {
    reportHeight = true;
    // THIS IS NOT A GREAT IDEA, BUT IT DOES SOLVE MY ANIMATION PROBLEM
    this.forceUpdate();
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
      // REPORTHEIGHT = TRUE TRIGGERS SHELF ANIMATION
      reportHeight = true;
  }

  showOrHideShelves = (e) => {
    reportHeight = true;
    const currentShelvesShowing = {...this.state.shelvesShowing};
    currentShelvesShowing[e.currentTarget.getAttribute('name')] = !currentShelvesShowing[e.currentTarget.getAttribute('name')];
    this.setState({shelvesShowing: currentShelvesShowing});
  }

  setShelfHeights = () => {
    const stashedDiv = this.refs.stashedShelfAccordionWrapper;
    const completedDiv = this.refs.completedShelfAccordionWrapper;
    const wantToTakeDiv = this.refs.wantToTakeShelfAccordionWrapper;
    const currentlyTakingDiv = this.refs.currentlyTakingShelfAccordionWrapper;

    console.log(stashedDiv);

    const stashedName = stashedDiv.getAttribute('name');
    const completedName = completedDiv.getAttribute('name');
    const wantToTakeName = wantToTakeDiv.getAttribute('name');
    const currentlyTakingName = currentlyTakingDiv.getAttribute('name');

    const stashedHeight = this.state.shelvesShowing.stashed ? this.returnWrapperHeight(stashedDiv) : { height: 0 };
    const completedHeight = this.state.shelvesShowing.completed ? this.returnWrapperHeight(completedDiv) : { height: 0 };
    const wantToTakeHeight = this.state.shelvesShowing.wantToTake ? this.returnWrapperHeight(wantToTakeDiv) : { height: 0 };
    const currentlyTakingHeight = this.state.shelvesShowing.currentlyTaking ? this.returnWrapperHeight(currentlyTakingDiv) : { height: 0 };

    this.setState({ shelfHeight:
      { [stashedName]: stashedHeight,
        [completedName]: completedHeight,
        [wantToTakeName]: wantToTakeHeight,
        [currentlyTakingName]: currentlyTakingHeight
      }
    });
  }

  returnWrapperHeight = (node) => {

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

    return { height: height };
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
              <div className="shelfContainer" name="currentlyTaking" onClick={this.showOrHideShelves}>
                <div className="shelfTitleContainer">
                  <h2 className="shelfTitle">Currently Taking:</h2>
                  <div className="shelfShowHideContainer">
                    <span className={`shelfShowHideText ${this.state.shelvesShowing.currentlyTaking ? "hide" : ""}`}>{this.state.shelvesShowing.currentlyTaking ? "HIDE" : "SHOW"}</span>
                    <img src={require('./icons/add-black.svg')} alt="Icon to open or close stashed courses." className={`shelfIcon ${this.state.shelvesShowing.currentlyTaking ? "hide" : ""}`} />
                  </div>
                </div>
              </div>
              <div
                ref="currentlyTakingShelfAccordionWrapper"
                className="shelfAccordionWrapper"
                name="currentlyTaking"
                style={this.state.shelfHeight.currentlyTaking}
                >
                {
                  courses.filter(course => course.shelf === "currentlyTaking").length > 0 ?
                  <div>
                      {courses.filter(course => course.shelf === "currentlyTaking").map((course) => {
                        return (
                          <Course
                            key={course.id}
                            {...course}
                            updateCourseLocation={this.updateCourseLocation}
                            setReportHeightToTrueAndForceUpdate={this.setReportHeightToTrueAndForceUpdate}
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
            <div className="shelf">
              <div className="shelfContainer" name="wantToTake" onClick={this.showOrHideShelves}>
                <div className="shelfTitleContainer">
                  <h2 className="shelfTitle">Want To Take:</h2>
                  <div className="shelfShowHideContainer">
                    <span className={`shelfShowHideText ${this.state.shelvesShowing.wantToTake ? "hide" : ""}`}>{this.state.shelvesShowing.wantToTake ? "HIDE" : "SHOW"}</span>
                    <img src={require('./icons/add-black.svg')} alt="Icon to open or close stashed courses." className={`shelfIcon ${this.state.shelvesShowing.wantToTake ? "hide" : ""}`} />
                  </div>
                </div>
              </div>
              <div
                ref="wantToTakeShelfAccordionWrapper"
                className="shelfAccordionWrapper"
                name="wantToTake"
                style={this.state.shelfHeight.wantToTake}
                >
                {
                  courses.filter(course => course.shelf === "wantToTake").length > 0 ?
                  <div>
                      {courses.filter(course => course.shelf === "wantToTake").map((course) => {
                        return (
                          <Course
                            key={course.id}
                            {...course}
                            updateCourseLocation={this.updateCourseLocation}
                            setReportHeightToTrueAndForceUpdate={this.setReportHeightToTrueAndForceUpdate}
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
            <div className="shelf">
              <div className="shelfContainer" name="completed"
              //COMMENTED OUT TO TEST HEIGHT CHANGE ON EDIT
              onClick={this.showOrHideShelves}
              >
                <div className="shelfTitleContainer">
                  <h2 className="shelfTitle">Completed:</h2>
                  <div className="shelfShowHideContainer">
                    <span className={`shelfShowHideText ${this.state.shelvesShowing.completed ? "hide" : ""}`}>{this.state.shelvesShowing.completed ? "HIDE" : "SHOW"}</span>
                    <img src={require('./icons/add-black.svg')} alt="Icon to open or close stashed courses." className={`shelfIcon ${this.state.shelvesShowing.completed ? "hide" : ""}`} />
                  </div>
                </div>
              </div>
              <div
                ref="completedShelfAccordionWrapper"
                className="shelfAccordionWrapper"
                name="completed"
                style={this.state.shelfHeight.completed}
                >
                {
                  courses.filter(course => course.shelf === "completed").length > 0 ?
                  <div>
                      {courses.filter(course => course.shelf === "completed").map((course) => {
                        return (
                          <Course
                            key={course.id}
                            {...course}
                            updateCourseLocation={this.updateCourseLocation}
                            setReportHeightToTrueAndForceUpdate={this.setReportHeightToTrueAndForceUpdate}
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
            <div className="shelf">
              <div className="shelfContainer" name="stashed"
              // COMMENTED OUT TO TEST EDIT EXPANDING
              onClick={this.showOrHideShelves}
              >
                <div className="shelfTitleContainer">
                  <h2 className="shelfTitle">Stashed:</h2>
                  <div className="shelfShowHideContainer">
                    <span className={`shelfShowHideText ${this.state.shelvesShowing.stashed ? "hide" : ""}`}>{this.state.shelvesShowing.stashed ? "HIDE" : "SHOW"}</span>
                    <img src={require('./icons/add-black.svg')} alt="Icon to open or close stashed courses." className={`shelfIcon ${this.state.shelvesShowing.stashed ? "hide" : ""}`} />
                  </div>
                </div>
              </div>
              <div
                ref="stashedShelfAccordionWrapper"
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
                            setReportHeightToTrueAndForceUpdate={this.setReportHeightToTrueAndForceUpdate}
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
