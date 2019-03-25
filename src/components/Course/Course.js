import React from 'react';
import './Course.css';

class Course extends React.Component {

    render() {

        const { title, author, id, description, link, percentagecomplete, timespent, shelf, notes, updateCourseLocation } = this.props;
        return (
            <div className="courseCard">
                <a href={link} rel="noopener noreferrer" target="_blank" className="titleLink"><h3>{title}</h3></a>
                <p>Author: {author}</p>
                <p>Description: {description}</p>
                {/* <p>Link to course</p> */}
                <p>Percentage complete: {percentagecomplete}</p>
                <p>Time Spent: {timespent}</p>
                <p>Notes: {(notes === null ? `No notes here!` : notes)}</p>
                <div className="courseShelfChanger">
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

export default Course;