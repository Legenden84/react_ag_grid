import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from "../actions/agGridActions";

const initialState = {
    rowData: [],
    columnDefs: [],
    loading: false,
    error: null
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
            })
        default:
            return state;
    }
};

export default agGridReducer;