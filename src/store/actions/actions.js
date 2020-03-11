import axiosUrl from '../../axios-url';

export const PERIODS_REQUEST = 'CONTACTS_REQUEST';
export const PERIODS_SUCCESS = 'CONTACTS_SUCCESS';
export const PERIODS_ERROR = 'CONTACTS_ERROR';

export const GET_PERIODS_SUCCESS = 'GET_PERIODS_SUCCESS';

export const periodsRequest = () => ({type: PERIODS_REQUEST});
export const periodsSuccess = () => ({type: PERIODS_SUCCESS});
export const periodsError = error => ({type: PERIODS_ERROR, error});

export const getPeriodsSuccess = (periods) => ({type: GET_PERIODS_SUCCESS, periods});


export const addPeriod = period => {
    return async dispatch => {
        try {
            dispatch(periodsRequest());
            await axiosUrl.post('/periods.json', period);
            dispatch(periodsSuccess());
        } catch (e) {
            dispatch(periodsError(e));
        }
    }
};

export const getPeriods = () => {
    return async dispatch => {
        try {
            dispatch(periodsRequest());
            const response = await axiosUrl.get('/periods.json');
            const periods = response.data;
            dispatch(getPeriodsSuccess(periods));
        } catch (e) {
            periodsError(e);
        }
    }
};