export const FETCH_FILTER_OPTIONS_REQUEST = 'FETCH_FILTER_OPTIONS_REQUEST';
export const FETCH_FILTER_OPTIONS_SUCCESS = 'FETCH_FILTER_OPTIONS_SUCCESS';
export const FETCH_FILTER_OPTIONS_FAILURE = 'FETCH_FILTER_OPTIONS_FAILURE';

export function filterOptionsRequest() {
    return {
        type: FETCH_FILTER_OPTIONS_REQUEST,
    }
};

export function filterOptionsSuccess(filterOptions) {
    return {
        type: FETCH_FILTER_OPTIONS_SUCCESS,
        filterOptions: filterOptions
    }
};

export function filterOptionsFailure(error) {
    return {
        type: FETCH_FILTER_OPTIONS_FAILURE,
        payload: error
    }
};

export function fetchFilterOptions() {
    return async (dispatch) => {
        dispatch(filterOptionsRequest());
        try {
            let url = 'https://run.mocky.io/v3/e68e2f9b-2574-47b6-900c-53e6df66fc30';
            const response = await fetch(url);
            const filterOptions = await response.json();
            console.log("filterOptions", filterOptions);
            dispatch(filterOptionsSuccess(filterOptions));
        } catch (error) {
            dispatch(filterOptionsFailure(error.message));
        }
    };
}
