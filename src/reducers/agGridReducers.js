import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "../actions/agGridActions";
import { FETCH_FILTER_OPTIONS_REQUEST, FETCH_FILTER_OPTIONS_SUCCESS, FETCH_FILTER_OPTIONS_FAILURE } from "../actions/filterActions";

const initialState = {
    rowData: [],
    columnDefs: [],
    loading: false,
    error: null,
    filterOptions: {
        options: {},
        loading: false,
        error: null
    }
}

function agGridReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });
        case FETCH_DATA_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                rowData: action.rowData,
                columnDefs: action.columnDefs
            });
        case FETCH_DATA_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            });

        case FETCH_FILTER_OPTIONS_REQUEST:
            return Object.assign({}, state, {
                filterOptions: { ...state.filterOptions, loading: true }
            });
        case FETCH_FILTER_OPTIONS_SUCCESS:
            return Object.assign({}, state, {
                filterOptions: { ...state.filterOptions, options: action.filterOptions, loading: false }
            });
        case FETCH_FILTER_OPTIONS_FAILURE:
            return Object.assign({}, state, {
                filterOptions: { ...state.filterOptions, error: action.payload, loading: false }
            });
        default:
            return state;
    }
};

export default agGridReducer;
