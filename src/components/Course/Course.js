import React from 'react';
import './Course.css';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

class Course extends React.Component {

    constructor(props) {
        super(props);

        const { title, author, description, link, percentagecomplete, timespent, notes } = this.props;
        const initialEditState = {
            title: title,
            author: author,
            description: description,
            link: link,
            percentagecomplete: percentagecomplete,
            timespent: timespent,
            notes: notes
        }

        this.state = {
            editModeIsOn: false,
            editState: initialEditState,
            initialState: initialEditState
        }
    }

    htmlDecode = (input) => {
        let textDisplayed = new DOMParser().parseFromString(input, "text/html");
        return textDisplayed.documentElement.textContent;
    }

    updateEditButton = () => {
        this.setState( state => ({editModeIsOn: !state.editModeIsOn}));
    }

    onEditFormChange = (event) => {

        const { title, author, description, link, percentagecomplete, timespent, notes } = this.state.editState;

        let currentEditState = {
            title: title,
            author: author,
            description: description,
            link: link,
            percentagecomplete: percentagecomplete,
            timespent: timespent,
            notes: notes
        }

        currentEditState[event.target.name] = event.target.value;
        this.setState({ editState: currentEditState });
    }

    onEditFormCancel = () => {
        this.setState(state => ({ editState: state.initialState }));
    }

    render() {

        const { title, author, description, link, percentagecomplete, timespent, notes } = this.state.editState;
        const { id, shelf, updateCourseLocation } = this.props;
        const editCourseButtonDisplay = this.state.editModeIsOn ? "editCourseButton-editModeOn" : "editCourseButton-editModeOff";
        const editCourseButtonTitle = this.state.editModeIsOn ? "Save Course Info" : "Edit Course Info";
        const editCourseButtonType= this.state.editModeIsOn ? "submit" : "button";

        //return (
            if (this.state.editModeIsOn) {
                return (
                    <div className="courseCard">
                        <form onSubmit={this.onFormSubmit} id="addCourseForm">
                            <div>
                                <label htmlFor="title">Title:* </label>
                                <input onChange={this.onEditFormChange} defaultValue={title} type="text" id="title" name="title" minLength="0" maxLength="200" required />
                            </div>
                            <div>
                                <label htmlFor="link">Link to course: </label>
                                <input onChange={this.onEditFormChange} defaultValue={link} type="URL" id="link" name="link" minLength="0" maxLength="500" />
                            </div>
                            <div>
                                <label htmlFor="author">Author:* </label>
                                <input onChange={this.onEditFormChange} defaultValue={author} type="text" id="author" name="author" minLength="0" maxLength="200" required />
                            </div>
                            <div>
                                <label htmlFor="description">Description: </label>
                                <textarea onChange={this.onEditFormChange} defaultValue={description} id="description" name="description" minLength="0" maxLength="1000" ></textarea>
                            </div>
                            <div>
                                <label htmlFor="percentagecomplete">Percentage Complete:* </label>
                                <input onChange={this.onEditFormChange} defaultValue={percentagecomplete} type="number" min="0" max="100" id="percentagecomplete" name="percentagecomplete" required />
                            </div>
                            <div>
                                <label htmlFor="timespent">Time Spent:* </label>
                                <input onChange={this.onEditFormChange} defaultValue={timespent} type="number" min="0" id="timespent" name="timespent" required />
                            </div>
                            <div>
                                <label htmlFor="notes">Notes: </label>
                                <textarea onChange={this.onEditFormChange} defaultValue={notes} id="notes" name="notes" minLength="0" maxLength="10000" ></textarea>
                            </div>
                        </form>
                        <button className={`editCourseButton ${editCourseButtonDisplay}`} title={editCourseButtonTitle} type={editCourseButtonType} onClick={this.updateEditButton}>
                        </button>
                        <button className="cancelEditCourseButton" title="Cancel Course Editing" onClick={ () => {this.updateEditButton(); this.onEditFormCancel();}}>
                        </button>
                        <div className="courseShelfChanger" title="Edit Course Shelf">
                            <select value={shelf} onChange={(event) => updateCourseLocation(id, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyTaking">Currently Taking</option>
                                <option value="wantToTake">Want to Take</option>
                                <option value="completed">Completed</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="courseCard">
                        <a href={this.htmlDecode(link)} rel="noopener noreferrer" target="_blank" className="titleLink"><h3>{this.htmlDecode(title)}</h3></a>
                        <p>Author: {this.htmlDecode(author)}</p>
                        <p>Description: {this.htmlDecode(description)}</p>
                        <p>Percentage complete: {percentagecomplete}</p>
                        <p>Time Spent: {timespent}</p>
                        <p>Notes: {(notes === null ? `No notes here!` : this.htmlDecode(notes))}</p>
                        <button className={`editCourseButton ${editCourseButtonDisplay}`} title={editCourseButtonTitle} type={editCourseButtonType} onClick={this.updateEditButton}>
                        </button>
                        <div className="courseShelfChanger" title="Edit Course Shelf">
                            <select value={shelf} onChange={(event) => updateCourseLocation(id, event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyTaking">Currently Taking</option>
                                <option value="wantToTake">Want to Take</option>
                                <option value="completed">Completed</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        {/* <div className="courseShelfChanger">
                        </div> */}
                    </div>
                )
            }
        //)
    }
}

export default Course;