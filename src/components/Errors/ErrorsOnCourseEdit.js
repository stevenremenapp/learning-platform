import React from 'react';
import './ErrorsOnCourseEdit.css';

class ErrorsOnCourseEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: true
        }
    }

    closeErrorNotification = () => {
        this.setState({ showing: false })
    }

    render() {
        // state set to true by default, user can set state to false (and thus hide warning) by clicking the button
        if (this.state.showing === true) {
        return (
                <div className="submissionErrorsOnCourseEdit" id="errorDisplay">
                <button
                    type="button"
                    className="closeErrorNotification"
                    title="Close Error Warning"
                    onClick={this.closeErrorNotification}
                ></button>
                {this.props.errors.map((error, index) => {
                    return (
                        <p key={index} class="errorOnCourseEditMessage">{error.msg}</p>
                    )
                })}
            </div>
        )
        } else {
            return (null)
        }
    }
}

export default ErrorsOnCourseEdit;