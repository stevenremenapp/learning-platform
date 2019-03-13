import React from 'react';
import { Link } from 'react-router-dom';
import './AddCoursePage.css';

class AddCoursePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Add a Course</h1>
                <div className="addCourseForm">
                    <form>
                        <div>
                            <label htmlFor="title">Title: </label>
                            <input type="text" id="title" name="title" placeholder="Enter course title here" />
                        </div>
                        <div>
                            <label htmlFor="link">Link to course: </label>
                            <input type="link" id="link" name="link" placeholder="Enter link to course here" />
                        </div>
                        <div>
                            <label htmlFor="author">Author: </label>
                            <input type="text" id="author" name="author" placeholder="Enter course author here"/>
                        </div>
                        <div>
                            <label htmlFor="description">Description: </label>
                            <textarea type="description" id="description" name="description" placeholder="Enter course description here"></textarea>
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