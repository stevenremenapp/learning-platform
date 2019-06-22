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
        this.state = {
            editModeIsOn: false,
            title: title,
            author: author,
            description: description,
            link: link,
            percentagecomplete: percentagecomplete,
            timespent: timespent,
            notes: notes,
        }
    }

    htmlDecode = (input) => {
        let textDisplayed = new DOMParser().parseFromString(input, "text/html");
        return textDisplayed.documentElement.textContent;
    }

    updateEditButton = () => {
        this.setState( state => ({editModeIsOn: !state.editModeIsOn}));
    }

    render() {

        const { title, author, description, link, percentagecomplete, timespent, notes } = this.state;
        const { id, shelf, updateCourseLocation } = this.props;
        const editCourseButtonDisplay = this.state.editModeIsOn ? "editCourseButton-editModeOn" : "editCourseButton-editModeOff";
        const editCourseButtonTitle = this.state.editModeIsOn ? "Save Course Info" : "Edit Course Info"

        //return (
            if (this.state.editModeIsOn) {
                return (
                    <div className="courseCard">
                        <form onSubmit={this.onFormSubmit} id="addCourseForm">
                            <div>
                                <label htmlFor="title">Title:* </label>
                                <input onChange={this.onFormDataChange} defaultValue={title} type="text" id="title" name="title" minLength="0" maxLength="200" required />
                            </div>
                            <div>
                                <label htmlFor="link">Link to course: </label>
                                <input onChange={this.onFormDataChange} defaultValue={link} type="URL" id="link" name="link" minLength="0" maxLength="500" />
                            </div>
                            <div>
                                <label htmlFor="author">Author:* </label>
                                <input onChange={this.onFormDataChange} defaultValue={author} type="text" id="author" name="author" minLength="0" maxLength="200" required />
                            </div>
                            <div>
                                <label htmlFor="description">Description: </label>
                                <textarea onChange={this.onFormDataChange} defaultValue={description} id="description" name="description" minLength="0" maxLength="1000" ></textarea>
                            </div>
                            <div>
                                <label htmlFor="percentagecomplete">Percentage Complete:* </label>
                                <input onChange={this.onFormDataChange} defaultValue={percentagecomplete} type="number" min="0" max="100" id="percentagecomplete" name="percentagecomplete" required />
                            </div>
                            <div>
                                <label htmlFor="timespent">Time Spent:* </label>
                                <input onChange={this.onFormDataChange} defaultValue={timespent} type="number" min="0" id="timespent" name="timespent" required />
                            </div>
                            <div>
                                <label htmlFor="notes">Notes: </label>
                                <textarea onChange={this.onFormDataChange} defaultValue={notes} id="notes" name="notes" minLength="0" maxLength="10000" ></textarea>
                            </div>
                        </form>
                        <div className={`editCourseButton ${editCourseButtonDisplay}`} title={editCourseButtonTitle} onClick={this.updateEditButton}>
                        </div>
                        <div className="cancelEditCourseButton" title="Cancel Course Editing" onClick={this.updateEditButton}>
                        </div>
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
                        <div className={`editCourseButton ${editCourseButtonDisplay}`} title={editCourseButtonTitle} onClick={this.updateEditButton}>
                        </div>
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