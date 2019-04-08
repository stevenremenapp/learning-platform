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

    htmlDecode = (input) => {
        let textDisplayed = new DOMParser().parseFromString(input, "text/html");
        return textDisplayed.documentElement.textContent;
    }

    render() {

        const { title, author, id, description, link, percentagecomplete, timespent, shelf, notes, updateCourseLocation } = this.props;
        return (
            <div className="courseCard">
                <a href={this.htmlDecode(link)} rel="noopener noreferrer" target="_blank" className="titleLink"><h3>{this.htmlDecode(title)}</h3></a>
                <p>Author: {this.htmlDecode(author)}</p>
                <p>Description: {this.htmlDecode(description)}</p>
                {/* <p>Link to course</p> */}
                <p>Percentage complete: {percentagecomplete}</p>
                <p>Time Spent: {timespent}</p>
                <p>Notes: {(notes === null ? `No notes here!` : this.htmlDecode(notes))}</p>
                <div className="courseShelfChanger">
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
}

export default Course;