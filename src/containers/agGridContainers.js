import { connect } from "react-redux";
import AgGridComponent from '../components/agGridComponents';
import { fetchData, selectRow, deselectRow } from '../actions/agGridActions';

const mapStateToProps = (state) => {
    return {
        rowData: state.agGrid.rowData,
        columnDefs: state.agGrid.columnDefs,
        selectedRows: state.agGrid.selectedRows,
        filterOptions: state.agGrid.filterOptions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData()),
        selectRow: (rowData) => dispatch(selectRow(rowData)),
        deselectRow: (rowData) => dispatch(deselectRow(rowData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgGridComponent)