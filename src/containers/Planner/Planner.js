import React, {Component} from 'react';
import nanoid from 'nanoid';
import DatePicker from "../../components/DatePicker/DatePicker";
import './Planner.css';
import {addPeriod, getPeriods} from "../../store/actions/actions";
import {connect} from "react-redux";


class Planner extends Component {
    state = {
        start: '',
        end: '',
        messages: [],
        currentZoom: 'Days'
    };

    componentDidMount() {
        this.props.getPeriods();
    }

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
                    duration: days,
                    text: '',
                };
                await this.props.addPeriod(period);
                this.props.getPeriods();
            }
        }
    };

    render() {
        const data = {
            data: []
        };

        Object.keys(this.props.periods).map(period => {
            return data.data.push({
                id: nanoid(3),
                text: '',
                start_date: this.props.periods[period].start,
                duration: this.props.periods[period].duration,
                progress: 0
            })
        });


        // periods = Object.keys(this.props.periods).reverse().map(period => {
        //     return (
        //         <div key={period} style={{border: '1px solid #000', padding: '5px', margin: '5px'}}>
        //             <span style={{marginRight: '10px'}}>Start: {this.props.periods[period].start}</span>
        //             <span style={{marginRight: '10px'}}>End: {this.props.periods[period].end}</span>
        //             <span>Duration: {this.props.periods[period].duration}</span>
        //         </div>
        //     )
        // });


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