import React, {Component} from 'react';
import moment from 'moment';
import './Calendar.css';

class Calendar extends Component {
    state = {
        momentContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false
    };

    constructor(props) {
        super(props);
        this.style = props.style || {};
    }


    // weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => this.state.momentContext.format('Y');
    month = () => this.state.momentContext.format('MMMM');
    daysInMonth = () => this.state.momentContext.daysInMonth();
    // currentDate = () => this.state.momentContext.get('date');
    currentDay = () => this.state.momentContext.format('D');

    firstDayOfMonth = () => {
        let momentContext = this.state.momentContext;
        return moment(momentContext).startOf('month').format('d');
    };

    setMonth = (month) => {
        let monthNumber = this.months.indexOf(month);
        let momentContext = Object.assign({}, this.state.momentContext);
        momentContext = moment(momentContext).set('month', monthNumber);
        this.setState({momentContext: momentContext});
    };

    nextMonth = () => {
        let momentContext = Object.assign({}, this.state.momentContext);
        momentContext = moment(momentContext).add(1, 'month');
        this.setState({momentContext: momentContext});
        this.props.onNextMonth && this.props.onNextMonth();
    };

    prevMonth = () => {
        let momentContext = Object.assign({}, this.state.momentContext);
        momentContext = moment(momentContext).subtract(1, 'month');
        this.setState({momentContext: momentContext});
        this.props.onPrevMonth && this.props.onPrevMonth();
    };

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();
    };

    SelectList = (props) => {
        let popup = props.data.map(item => {
            return (
                <div key={item}>
                    <a href="#" className='popup-item' onClick={(e) => {
                        this.onSelectChange(e, item)
                    }}>
                        {item}
                    </a>
                </div>
            )
        });
        return (
            <div className='month-popup'>
                {popup}
            </div>
        )
    };

    onChangeMonth = (e, month) => {
        this.setState({showMonthPopup: !this.state.showMonthPopup});
    };

    MonthNav = () => {
        return (
            <span className='label-month' onClick={(e) => {
                this.onChangeMonth(e, this.month())
            }}>
                {this.month()}
                {this.state.showMonthPopup && <this.SelectList data={this.months}/>}
            </span>
        )
    };

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        })
    };

    setYear = (year) => {
        let momentContext = Object.assign({}, this.state.momentContext);
        momentContext = moment(momentContext).set('year', year);
        this.setState({momentContext: momentContext});
    };

    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    };

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    };

    YearNav = () => {
        return (
            this.state.showYearNav ? <input
                    defaultValue={this.year()}
                    className='editor-year'
                    ref={(yearInput) => {
                        this.yearInput = yearInput
                    }}
                    onKeyUp={e => this.onKeyUpYear(e)}
                    onChange={e => this.onYearChange(e)}
                    type='number'
                    placeholder='year'
                />
                :
                <span className='label-year'
                      onDoubleClick={(e) => {
                          this.showYearEditor()
                      }}>
                    {this.year()}
            </span>
        )
    };

    onDayClick = (e, day) => {
        this.props.onDayClick && this.props.onDayClick(e, day);
    };

    render() {
        let weekdays = this.weekdaysShort.map(day => {
            return (
                <td key={day} className='week-day'>{day}</td>
            )
        });


        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i*80} className='empty-slot'>
                {''}
            </td>);
        }

        let daysInMonth = [];
        for (let d = 1;
             d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? 'day current-day' : 'day');
            daysInMonth.push(
                <td key={d} className={className}>
                    <span onClick={e => {
                        this.onDayClick(e, d)
                    }}>{d}</span>
                </td>
            );
        }

        const totalSlots = [...blanks, ...daysInMonth];

        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row)
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let days = rows.map((d, i) => {
            return (
                <tr key={i * 100}>{d}</tr>
            );
        });

        return (
            <div className='calendar-container' style={this.style}>
                <table className='calendar'>
                    <thead>
                    <tr className='calendar-header'>
                        <td colSpan='5'>
                            <this.MonthNav/>
                            <this.YearNav/>
                        </td>
                        <td colSpan='2' className='nav-month'>
                            <i className='prev'
                               onClick={e => {
                                   this.prevMonth()
                               }}>
                                &#60;
                            </i>
                            <i className='next'
                               onClick={e => {
                                   this.nextMonth()
                               }}>
                                &#62;
                            </i>
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {weekdays}
                    </tr>
                    {days}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Calendar;