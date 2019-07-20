import React from 'react';
import './Course.css';
import ErrorsOnCourseEdit from '../Errors/ErrorsOnCourseEdit.js'
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

const editCourseAPI = process.env.REACT_APP_EDIT_COURSE_INFO_API;

class Course extends React.Component {

    constructor(props) {
        super(props);

        const { id, title, author, description, link, percentagecomplete, timespent, notes } = this.props;
        const initialEditState = {
            id: id,
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
            initialState: initialEditState,
            putErrors: []
        }
    }

    htmlDecode = (input) => {
        let textDisplayed = new DOMParser().parseFromString(input, "text/html");
        return textDisplayed.documentElement.textContent;
    }

    updateEditMode = () => {
        this.setState({editModeIsOn: !this.state.editModeIsOn});
    }

    onEditFormChange = (event) => {

        const { id, title, author, description, link, percentagecomplete, timespent, notes } = this.state.editState;

        let currentEditState = {
            id: id,
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

    resetEditForm = () => {
        this.setState(state => ({ editState: state.initialState }));
    }

    submitEditForm = (event) => {

        // Reset errors upon submission so there is not a flash of old error content
        this.setState({ putErrors: [] })

        const { id, title, author, description, link, percentagecomplete, timespent, notes } = this.state.editState;

        event.preventDefault();

        if (this.state.editState !== this.state.initialState) {
            fetch(`${editCourseAPI}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    author: author,
                    description: description,
                    link: link,
                    percentagecomplete: percentagecomplete,
                    timespent: timespent,
                    notes: notes
                })
            })
            .then(response => {
                response.json().then(json => {
                    this.handlePutResponse(response, json);
                })
            })
        } else {
            this.updateEditMode();
            this.resetEditForm();
        }
    }

    handlePutResponse = (response, json) => {
        if (response.status === 200) {
            this.putSuccess();
        } else {
            let errors = json.errors;
            this.putError(errors);
        }
    }

    putSuccess = () => {
        this.updateEditMode();
        this.setState({
            putErrors: [],
            initialState: this.state.editState
        })
    }

    putError = (errors) => {
        console.log(errors);
        this.resetEditForm();
        this.setState({
            putErrors: errors
        })
    }

    render() {

        const { title, author, description, link, percentagecomplete, timespent, notes } = this.state.editState;
        const { id, shelf, updateCourseLocation } = this.props;

            if (this.state.editModeIsOn) {
                return (
                    <div className="courseCard">
                        <form onSubmit={this.submitEditForm} className="editCourseForm">
                            <div>
                                <label htmlFor="title">Title:</label>
                                <input onChange={this.onEditFormChange} defaultValue={this.htmlDecode(title)} type="text" id="title" name="title" minLength="0" maxLength="200" required />
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "title").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "title")} /> : null}
                            </div>
                            <div>
                                <label htmlFor="link">Link to course:</label>
                                <input onChange={this.onEditFormChange} defaultValue={link} type="url" id="link" name="link" minLength="0" maxLength="500" />
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "link").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "link")} /> : null}
                            </div>
                            <div>
                                <label htmlFor="author">Author:</label>
                                <input onChange={this.onEditFormChange} defaultValue={this.htmlDecode(author)} type="text" id="author" name="author" minLength="0" maxLength="200" required />
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "author").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "author")} /> : null}
                            </div>
                            <div>
                                <label htmlFor="description">Description:</label>
                                <textarea onChange={this.onEditFormChange} defaultValue={this.htmlDecode(description)} id="description" name="description" minLength="0" maxLength="1000" ></textarea>
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "description").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "description")} /> : null}
                            </div>
                            <div>
                                <label htmlFor="percentagecomplete">Percentage Complete:</label>
                                <input onChange={this.onEditFormChange} type="number" defaultValue={percentagecomplete} min="0" max="100" id="percentagecomplete" name="percentagecomplete" required />
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "percentagecomplete").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "percentagecomplete")} /> : null}
                            </div>
                            <div>
                                <label htmlFor="timespent">Time Spent:</label>
                                <input onChange={this.onEditFormChange} defaultValue={timespent} type="number" min="0" id="timespent" name="timespent" required />
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "timespent").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "timespent")} /> : null}
                            </div>
                            <div>
                                <label htmlFor="notes">Notes:</label>
                                <textarea onChange={this.onEditFormChange} defaultValue={this.htmlDecode(notes)} id="notes" name="notes" minLength="0" maxLength="10000" ></textarea>
                                {/* If error, show: */}
                                {this.state.putErrors.filter(error => error.param === "notes").length >= 1 ? <ErrorsOnCourseEdit errors={this.state.putErrors.filter(error => error.param === "notes")} /> : null}
                            </div>
                            <button
                                className="editCourseButton editCourseButton-editModeOn"
                                title="Save Course Info"
                                type="submit"
                            >
                            </button>
                            <button
                                className="cancelEditCourseButton"
                                title="Cancel Course Editing"
                                type="button"
                                onClick={ () => {this.updateEditMode(); this.resetEditForm();}}
                            >
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
                        </form>
                    </div>
                )
            } else {
                return (
                    <div className="courseCard">
                        {this.state.initialState.link === "" ? <h3>{this.htmlDecode(title)}</h3> : <a href={this.htmlDecode(link)} rel="noopener noreferrer" target="_blank" className="titleLink"><h3>{this.htmlDecode(title)}</h3></a>}
                        <p>Author: {this.htmlDecode(author)}</p>
                        <p>Description: {this.htmlDecode(description)}</p>
                        <p>Percentage complete: {percentagecomplete}</p>
                        <p>Time Spent: {timespent} {timespent === 1 ? "hour" : "hours"}</p>
                        <p>Notes: {(notes === null ? `No notes here!` : this.htmlDecode(notes))}</p>
                        <button className="editCourseButton editCourseButton-editModeOff" title="Edit Course Info" type="button" onClick={this.updateEditMode}>
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
            }
    }
}

export default Course;