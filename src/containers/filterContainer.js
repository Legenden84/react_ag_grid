import { connect } from "react-redux";
import filterComponent from '../components/filterComponent';
import { fetchFilterOptions } from '../actions/filterActions';

const mapStateToProps = (state) => {
    return {
      filterOptions: state.filter.filterOptions
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
  )(CustomFloatingFilter);