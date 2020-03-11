import React, {Component, Fragment} from 'react';
import DatePicker from "../../components/DatePicker/DatePicker";
import './Planner.css';
import {addPeriod, getPeriods} from "../../store/actions/actions";
import {connect} from "react-redux";

class Planner extends Component {

    state = {
        start: '',
        end: ''
    };

    componentDidMount() {
        this.props.getPeriods();
    }

    inputChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    formOnSubmit = async event => {
        event.preventDefault();
        const startDate = new Date(this.state.start);
        const endDate = new Date(this.state.end);

        const days = Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

        if (startDate > endDate) {
            alert('End date cannot be earlier than start date!');
        } else {
            const period = {
                start: this.state.start,
                end: this.state.end,
                period: days
            };
            await this.props.addPeriod(period);
            this.props.getPeriods();
        }
    };

    render() {

        let periods = Object.keys(this.props.periods).reverse().map(period => {
            return (
                <div key={period} style={{border: '1px solid #000', padding: '5px', margin: '5px'}}>
                    <span style={{marginRight: '10px'}}>Start: {this.props.periods[period].start}</span>
                    <span style={{marginRight: '10px'}}>End: {this.props.periods[period].end}</span>
                    <span>Days: {this.props.periods[period].period}</span>
                </div>
            )
        });
        if (!this.props.periods) {
            periods = <span></span>
        }

        return (
            <Fragment>
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
            </Fragment>

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