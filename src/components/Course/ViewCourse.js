import React from 'react';

function ViewCourse() {
    return (
        <div className="courseCard">
            <a href={this.htmlDecode(link)} rel="noopener noreferrer" target="_blank" className="titleLink"><h3>{this.htmlDecode(title)}</h3></a>
            <p>Author: {this.htmlDecode(author)}</p>
            <p>Description: {this.htmlDecode(description)}</p>
            <p>Percentage complete: {percentagecomplete}</p>
            <p>Time Spent: {timespent}</p>
            <p>Notes: {(notes === null ? `No notes here!` : this.htmlDecode(notes))}</p>
            <div className={`editCourseButton ${editCourseButtonDisplay}`} title="Edit Course Info" onClick={this.updateEditButton}>
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