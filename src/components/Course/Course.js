import React from 'react';
import './Course.css';

class Course extends React.Component {
    render() {
        return (
            <div className="courseCard">
                <h3>Course Title</h3>
                <p>Course Author</p>
                <p>Course Description</p>
                <p>Percentage complete:</p>
                <p>Time Spent:</p>
                <div className="courseShelfChanger">
                    <select value="this shelf">
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

export default Course;