import React from 'react';
import moment from 'moment';
import './Scale.css';

const Scale = props => {


    let listOfDays = [];
    const today = moment();
    const daysInMonth = () => today.daysInMonth();
    const currentDay = () => today.format('D');
    // for (let dayDifference = 1; dayDifference <= daysInMonth(); dayDifference++) {
    //     const newDay = moment(today).add(dayDifference, 'days').format('D');
    //     listOfDays.push(newDay);
    // }

    for (let d = 1; d <= daysInMonth(); d++) {
        let className = (d == currentDay() ? 'scale-item current-day' : 'scale-item');
        listOfDays.push(
            <span key={d} className={className}>
                   {d}
            </span>
        );
    }

    return (
        <div className='scale'>
            {listOfDays.map(day => {
                    return day;
                }
            )}
        </div>
    );
};

export default Scale;