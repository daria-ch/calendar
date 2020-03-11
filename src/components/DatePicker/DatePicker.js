import React from 'react';
import './DatePicker.css';

const DatePicker = (props) => {
    return (
        <form>
            <div className='datepicker'>
                <label htmlFor={props.id}>{props.label}</label>
                <input type="date" id={props.id} name={props.name} required/>
            </div>
        </form>
    );
};

export default DatePicker;