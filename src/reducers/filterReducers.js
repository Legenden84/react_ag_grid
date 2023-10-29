import { 
    FETCH_FILTER_OPTIONS_REQUEST, 
    FETCH_FILTER_OPTIONS_SUCCESS, 
    FETCH_FILTER_OPTIONS_FAILURE 
} from "../actions/filterActions";

const initialState = {
    filterOptions: {},
    loading: false,
    error: null
}

function filterReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FILTER_OPTIONS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            })
        case FETCH_FILTER_OPTIONS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                filterOptions: action.filterOptions
            })
        case FETCH_FILTER_OPTIONS_FAILURE:
            return Object.assign({}, state, {
                loading: false, error: action.payload
            })    
        default:
            return state;
    }
}

export default filterReducer;
