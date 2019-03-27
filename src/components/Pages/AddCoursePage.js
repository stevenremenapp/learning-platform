import React from 'react';
import { Link } from 'react-router-dom';
import './AddCoursePage.css';

const addCourseAPI = 'http://localhost:3000/api/v1/addcourse';

const initialState = {
    title: '',
    link: '',
    author: '',
    shelf: '',
    description: '',
    percentagecomplete: null,
    timespent: null,
    notes: '',
    showSuccessNotification: false,
    showFailureNotification: false
}

class AddCoursePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        
        // {
        //     title: '',
        //     link: '',
        //     author: '',
        //     shelf: '',
        //     description: '',
        //     percentagecomplete: null,
        //     timespent: null,
        //     notes: ''
        // }
    }

    onFormDataChange = (event) => {
        console.log(`Name: ${event.target.name} Value: ${event.target.value}`);
        this.setState({ [event.target.name]: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        fetch(addCourseAPI, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                link: this.state.link,
                author: this.state.author,
                shelf: this.state.shelf,
                description: this.state.description,
                percentagecomplete: this.state.percentagecomplete,
                timespent: this.state.timespent,
                notes: this.state.notes
            })
        })
        .then(response => response.json())
        .then((response) => {
            this.resetForm();
            console.log(response);
        })
    }

    resetForm = () => {
        this.setState(initialState);
        document.getElementById('addCourseForm').reset();
    }

    showSuccessNotification= () => {
        this.setState({ showNotification: true });

    }

    render() {
        return (
            <div>
                <h1>Add a Course</h1>
                <div className="success">
                    <p>Course successfully added!</p>
                </div>
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