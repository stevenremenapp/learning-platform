import React from 'react';
import './Errors.scss';

const Errors = (props) => {

    return (

        // let { message } = this.props;

        <div className="submissionErrors">
            {props.errors.map((error, index) => { 
                return (
                    <p key={index}>{error.msg}</p>
                )
            })}
        </div>

    )
}

export default Errors;