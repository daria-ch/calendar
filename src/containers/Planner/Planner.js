import React, {Component} from 'react';
import DatePicker from "../../components/DatePicker/DatePicker";
import './Planner.css';

class Planner extends Component {
    state = {
        start: '',
        end: ''
    };


    render() {
        return (
            <div className='App'>
                <form className='planner-form'>
                    <div className='planner'>
                        <div className='planner-item'>
                            <DatePicker
                                id='start'
                                label='Choose start date:'
                                name='start'/>
                        </div>
                        <div className='planner-item'>
                            <DatePicker
                                id='end'
                                label='Choose end date:'
                                name='end'/>
                        </div>
                    </div>
                    <button className='planner-button'>Choose</button>
                </form>
            </div>
        );
    }
}

export default Planner;