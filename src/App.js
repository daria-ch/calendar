import React, {Component} from 'react';
import './App.css';
import DatePicker from "./components/DatePicker/DatePicker";


class App extends Component {

    state = {
        start: '',
        end: ''
    };


    render() {
        return (
            <div className='App'>
                <form>
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
                    <button>Choose</button>
                </form>
            </div>
        );
    }
}

export default App;