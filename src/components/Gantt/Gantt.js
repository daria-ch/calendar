import React, {Component} from 'react';
import {gantt} from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import {connect} from "react-redux";
import './Gantt.css';

class Gantt extends Component {
    componentDidMount() {
        gantt.config.xml_date = "%d/%m/%Y";
        const {tasks} = this.props;
        gantt.init(this.ganttContainer);
        gantt.parse(tasks);
    }

    setZoom(value) {
        switch (value) {
            case 'Days':
                gantt.config.min_column_width = 30;
                gantt.config.scale_height = 60;
                gantt.config.scale_unit = 'week';
                gantt.config.date_scale = '#%W';
                gantt.config.subscales = [
                    {unit: 'day', step: 1, date: '%d %M'}
                ];
                break;
            case 'Months':
                gantt.config.min_column_width = 30;
                gantt.config.scale_height = 60;
                gantt.config.scale_unit = 'month';
                gantt.config.date_scale = '%F';
                gantt.config.subscales = [
                    {unit: 'week', step: 1, date: '#%W'}
                ];
                break;
            case 'Years':
                gantt.config.min_column_width = 30;
                gantt.config.scale_height = 60;
                gantt.config.scale_unit = 'year';
                gantt.config.date_scale = '%Y';
                gantt.config.subscales = [
                    {unit: 'month', step: 1, date: '%M'}
                ];
                break;
            default:
                break;
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    initGanttDataProcessor() {
        const onDataUpdated = this.props.onDataUpdated;
        this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
            return new Promise((resolve, reject) => {
                if (onDataUpdated) {
                    onDataUpdated(entityType, action, item, id);
                }
                return resolve();
            });
        });
    }

    componentWillUnmount() {
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    }

    render() {
        const {zoom} = this.props;
        this.setZoom(zoom);
        return (
            <div
                ref={(input) => {
                    this.ganttContainer = input
                }}
                style={{width: '100%', height: '100%'}}
            >{this.props.children}</div>
        );
    }
}

const mapStateToProps = state => ({
    periods: state.periods
});


export default connect(mapStateToProps)(Gantt);