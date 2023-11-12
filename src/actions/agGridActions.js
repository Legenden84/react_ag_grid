import { fetchFilterOptions } from "./filterActions";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const SELECT_ROW = 'SELECT_ROW';
export const DESELECT_ROW = 'DESELECT_ROW';

export function agGridDataRequest() {
    return {
        type: FETCH_DATA_REQUEST,
    }
};

export function agGridDataSuccess(columnDefs, rowData) {
    return {
        type: FETCH_DATA_SUCCESS,
        rowData: rowData,
        columnDefs: columnDefs
    }
};

export function agGridDataFailure(error) {
    return {
        type: FETCH_DATA_FAILURE,
        payload: error
    }
};

export function selectRow(rowData) {
    return {
        type: SELECT_ROW,
        payload: rowData
    }
};

export function deselectRow(rowData) {
    return {
        type: DESELECT_ROW,
        payload: rowData
    }
};

export function fetchData() {
    return async (dispatch) => {
        dispatch(agGridDataRequest());
        try {
            let url = 'https://run.mocky.io/v3/06a8f6e5-d983-4a71-89f4-1faaf9938e20';
            const response = await fetch(url);
            const data = await response.json();
            dispatch(agGridDataSuccess(data.columnDefs, data.rowData));
            dispatch(fetchFilterOptions());
        } catch (error) {
            dispatch(agGridDataFailure(error.message));
        }
    };
}
