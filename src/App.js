import React, {Component} from 'react';
import Calendar from "./containers/Calendar/Calendar";

import './App.css';

const style = {
    position: 'relative',
    margin: '50px auto'
};

const selectedDay = {
    border: '1px solid #4285f4'
};

class App extends Component {
    onDayClick = (e, day) => {
        alert(day);
    };

    render() {
        return (
            <div className='App'>
                <div className="planner">
                    <div className='planner-item'>
                        <Calendar style={style} width="500px" onDayClick={(e, day) => this.onDayClick(e, day)}/>
                    </div>
                    <div className='planner-item'>
                        <Calendar style={style} width="500px" onDayClick={(e, day) => this.onDayClick(e, day)}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;