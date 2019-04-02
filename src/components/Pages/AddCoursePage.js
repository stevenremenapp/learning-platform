import React from 'react';
import { Link } from 'react-router-dom';
import './AddCoursePage.css';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

const addCourseAPI = 'http://localhost:3000/api/v1/addcourse';

const initialFormState = {
    title: '',
    link: '',
    author: '',
    shelf: '',
    description: '',
    percentagecomplete: null,
    timespent: null,
    notes: '',
}

let currentFormState = {
    title: '',
    link: '',
    author: '',
    shelf: '',
    description: '',
    percentagecomplete: null,
    timespent: null,
    notes: '',
}

class AddCoursePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formState: initialFormState,
            snackbarOpen: false,
            snackbarMessage: ''
        }
    }

    componentDidMount() {
        document.title = 'Add a Course';
    }

    onFormDataChange = (event) => {
        // console.log(`Name: ${event.target.name} Value: ${event.target.value}`);
        currentFormState[event.target.name] = event.target.value;
        // console.log(currentFormState);
        this.setState({ formState: currentFormState });
    }

    onFormSubmit = (event) => {

        const {title, link, author, shelf, description, percentagecomplete, timespent, notes } = this.state.formState;

        event.preventDefault();
        fetch(addCourseAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                link: link,
                author: author,
                shelf: shelf,
                description: description,
                percentagecomplete: percentagecomplete,
                timespent: timespent,
                notes: notes
            })
        })
        .then(response => {
            this.openSnackbar(response);
            this.resetForm();
        })
    }

    openSnackbar = (response) => {
        if (response.status === 201) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Class successfully added!',
            });
        } else {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: 'Class not submitted, please try again.',
            });
        }
    }

    closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackbarOpen: false });
    }

    resetForm = () => {
        this.setState({ formState: initialFormState });
        document.getElementById('addCourseForm').reset();
    }

    render() {

        return (
            <div>
                <h1>Add a Course</h1>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    message={<span id="message-id">{this.state.snackbarMessage}</span>}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    open={this.state.snackbarOpen}
                    ContentProps={{ 'aria-describedby': 'message-id' }}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.closeSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
                <div className="addCourseForm">
                    <form onSubmit={this.onFormSubmit} id="addCourseForm">
                        <div>
                            <label htmlFor="title">Title:* </label>
                            <input onChange={this.onFormDataChange} type="text" id="title" name="title" placeholder="Enter course title here" required />
                        </div>
                        <div>
                            <label htmlFor="link">Link to course: </label>
                            <input onChange={this.onFormDataChange} type="link" id="link" name="link" placeholder="Enter link to course here" />
                        </div>
                        <div>
                            <label htmlFor="author">Author:* </label>
                            <input onChange={this.onFormDataChange} type="text" id="author" name="author" placeholder="Enter course author here" required />
                        </div>
                        <div>
                            <label htmlFor="shelf">Shelf:* </label>
                            <select onChange={this.onFormDataChange} type="text" id="shelf" name="shelf" required >
                                <option value="Choose the shelf for this course" disabled>Choose the shelf for this course</option>
                                <option value="currentlyTaking">Currently Taking</option>
                                <option value="wantToTake">Want to Take</option>
                                <option value="completed">Completed</option>
                                {/* <option value="none">None</option> */}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="description">Description: </label>
                            <textarea onChange={this.onFormDataChange} id="description" name="description" placeholder="Enter course description here"></textarea>
                        </div>
                        <div>
                            <label htmlFor="percentagecomplete">Percentage Complete:* </label>
                            <input onChange={this.onFormDataChange} type="number" min="0" max="100" id="percentagecomplete" name="percentagecomplete" placeholder="Enter 0 if not started" required />
                        </div>
                        <div>
                            <label htmlFor="timespent">Time Spent:* </label>
                            <input onChange={this.onFormDataChange} type="number" min="0" id="timespent" name="timespent" placeholder="Enter 0 if not started" required />
                        </div>
                        <div>
                            <label htmlFor="notes">Notes: </label>
                            <textarea onChange={this.onFormDataChange} id="notes" name="notes" placeholder="Enter course notes here"></textarea>
                        </div>
                        <div className="submitCourse">
                            <button type="submit">Add course!</button>
                        </div>
                    </form>
                </div>
                <div className="backToHomeIcon">
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        )
    }
}

export default AddCoursePage;