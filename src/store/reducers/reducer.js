import {GET_PERIODS_SUCCESS, PERIODS_ERROR} from "../actions/actions";

const initialState = {
    periods: [],
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PERIODS_ERROR:
            return {
                ...state,
                error: action.error
            };
        case GET_PERIODS_SUCCESS:
            return {
                ...state,
                periods: action.periods
            };
        default:
            return state;
    }
};
export default reducer;