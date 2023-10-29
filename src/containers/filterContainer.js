import { connect } from "react-redux";
import filterComponent from '../components/filterComponent';
import { fetchFilterOptions } from '../actions/agGridActions';

const mapStateToProps = (state) => {
    return {
      filterOptions: state.agGrid.filterOptions
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        fetchFilterOptions: () => dispatch(fetchFilterOptions())
    };
};
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(filterComponent);