import { connect } from "react-redux";
import AgGridComponent from '../components/agGridComponents';
import { fetchData } from '../actions/agGridActions';

const mapStateToProps = (state) => {
    return {
        rowData: state.agGrid.rowData,
        columnDefs: state.agGrid.columnDefs,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgGridComponent)