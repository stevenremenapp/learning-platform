import React from 'react';
import './Course.css';

class Course extends React.Component {
    render() {

        const { title, author, description, link, percentageComplete, timeSpent, shelf } = this.props;

        return (
            <div className="courseCard">
                <a href={link} rel="noopener noreferrer" target="_blank" className="titleLink"><h3>{title}</h3></a>
                {/* {console.log({...info})} */}
                <p>Author: {author}</p>
                <p>Description: {description}</p>
                {/* <p>Link to course</p> */}
                <p>Percentage complete: {percentageComplete}</p>
                <p>Time Spent: {timeSpent}</p>
                <div className="courseShelfChanger">
                    <select value={shelf}>
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