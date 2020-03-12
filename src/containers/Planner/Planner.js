import React, {Component} from 'react';
import DatePicker from "../../components/DatePicker/DatePicker";
import './Planner.css';
import {addPeriod, getPeriods} from "../../store/actions/actions";
import {connect} from "react-redux";
import Gantt from "../../components/Gantt/Gantt";
import Toolbar from "../../components/Toolbar";
import MessageArea from "../../components/MessageArea/MessageArea";


const data = {
    data: [
        {id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6},
        {id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4}
    ],
    links: [
        {id: 1, source: 1, target: 2, type: '0'}
    ]
};

class Planner extends Component {

    state = {
        start: '',
        end: '',
        messages: [],
        currentZoom: 'Days'
    };


    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    };

    componentDidMount() {
        this.props.getPeriods();
    }

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = {message};
        const messages = [
            newMessage,
            ...this.state.messages
        ];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({messages});
    }

    logDataUpdate = (entityType, action, itemData, id) => {
        let text = itemData && itemData.text ? ` (${itemData.text})` : '';
        let message = `${entityType} ${action}: ${id} ${text}`;
        if (entityType === 'link' && action !== 'delete') {
            message += ` ( source: ${itemData.source}, target: ${itemData.target} )`;
        }
        this.addMessage(message);
    };

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    formOnSubmit = async event => {
        event.preventDefault();

        if (this.state.start === '' && this.state.end === '') {
            alert('You need to choose any date!');
        } else {
            const startDate = new Date(this.state.start);
            const endDate = new Date(this.state.end);

            const days = Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

            if (startDate > endDate) {
                alert('End date cannot be earlier than start date!');
            } else {
                const period = {
                    start: this.state.start,
                    end: this.state.end,
                    duration: days
                };
                await this.props.addPeriod(period);
                this.props.getPeriods();
            }
        }
    };

    render() {

        const {currentZoom, messages} = this.state;

        let periods = this.props.periods;

        if (!this.props.periods) {
            periods = <span>
                No periods found
            </span>
        }
        periods = Object.keys(this.props.periods).reverse().map(period => {
            return (
                <div key={period} style={{border: '1px solid #000', padding: '5px', margin: '5px'}}>
                    <span style={{marginRight: '10px'}}>Start: {this.props.periods[period].start}</span>
                    <span style={{marginRight: '10px'}}>End: {this.props.periods[period].end}</span>
                    <span>Duration: {this.props.periods[period].duration}</span>
                </div>
            )
        });


        return (
            <div style={{textAlign: 'center'}}>
                <form className='planner-form' onSubmit={this.formOnSubmit}>
                    <div className='planner'>
                        <div className='planner-item'>
                            <DatePicker
                                id='start'
                                label='Choose start date:'
                                name='start'
                                value={this.state.value}
                                onChange={this.inputChangeHandler}
                            />
                        </div>
                        <div className='planner-item'>
                            <DatePicker
                                id='end'
                                label='Choose end date:'
                                name='end'
                                value={this.state.value}
                                onChange={this.inputChangeHandler}/>
                        </div>
                    </div>
                    <button className='planner-button' onClick={this.formOnSubmit}>Choose</button>
                </form>
                <div className='periods'>
                    {periods}
                </div>
                <div>
                    <Toolbar
                        zoom={currentZoom}
                        onZoomChange={this.handleZoomChange}
                    />
                    <div className="gantt-container">
                        <Gantt
                            tasks={data}
                            zoom={currentZoom}
                            onDataUpdated={this.logDataUpdate}
                        />
                    </div>
                    <MessageArea
                        messages={messages}
                    />
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    periods: state.periods
});

const mapDispatchToProps = dispatch => ({
    getPeriods: () => dispatch(getPeriods()),
    addPeriod: (period) => dispatch(addPeriod(period))
});

export default connect(mapStateToProps, mapDispatchToProps)(Planner);