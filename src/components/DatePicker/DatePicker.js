import React from 'react';
import './DatePicker.css';

const DatePicker = (props) => {
    return (
        <div>
            <div className='datepicker'>
                <label htmlFor={props.id}>{props.label}</label>
                <input type="date" id={props.id} name={props.name} value={props.value} onChange={props.onChange}
                       required/>
            </div>
        </div>
    );
};

export default DatePicker;