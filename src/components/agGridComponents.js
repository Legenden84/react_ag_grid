import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import Filter from "./Filter";
import CustomTextFilter from "./CustomTextFilter";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class AgGridComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRows: [],
        };
    }

    componentDidMount() {
        this.props.fetchData();
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onRowSelected = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        this.setState({ selectedRows: selectedData }, () => {
            // Refresh the external filter after updating the selected rows
            this.gridApi.onFilterChanged();
        });
    };

    defaultColDefs() {
        return {
            'flex': 1,
            'sortable': true,
        }
    }

    getFilterParams(columnField) {
        const { filterOptions } = this.props;
        const options = filterOptions.options || {};
        const capitalizedField = columnField.charAt(0).toUpperCase() + columnField.slice(1);
        const filterValues = options[capitalizedField] || [];
        return {
            values: filterValues,
        };
    }
    
    updateColumnDefs(columnDefs) {
        return columnDefs.map((col) => {
            if (['age', 'gold', 'silver', 'bronze'].includes(col.field.toLowerCase())) {
                return Object.assign({}, col, {
                    filter: Filter,
                    filterParams: this.getFilterParams(col.field),
                    floatingFilter: true,
                })
            } else {
                return Object.assign({}, col, {
                    filter: CustomTextFilter,
                    filterParams: {
                        selectedRows: this.state.selectedRows
                    },
                    floatingFilter: true,
                })
            }
        });
    }

    isExternalFilterPresent = () => {
        // External filter is active if there are selected rows
        return this.state.selectedRows.length > 0;
    };

    doesExternalFilterPass = (node) => {
        // If the row is selected, it always passes the filter
        if (this.state.selectedRows.some(row => row === node.data)) {
            return true;
        }
        // Otherwise, check if the row passes the current filter model
        return this.checkIfRowPassesFilters(node);
    };

    checkIfRowPassesFilters(node) {
        const filterModel = this.gridApi.getFilterModel();
        
        for (const [colId, filter] of Object.entries(filterModel)) {
            const cellValue = node.data[colId] ? node.data[colId].toString().toLowerCase() : '';
            const filterText = filter.filter ? filter.filter.toLowerCase() : '';

            if (!cellValue.includes(filterText)) {
                // If any filter condition fails, the row does not pass
                return false;
            }
        }

        // If all filter conditions pass, the row passes
        return true;
    }

    gridOptions() {
        return {
            rowSelection: 'multiple',
            onRowSelected: this.onRowSelected,
            isExternalFilterPresent: this.isExternalFilterPresent,
            doesExternalFilterPass: this.doesExternalFilterPass,
        };
    }

    render() {
        const { columnDefs, rowData } = this.props;
        return (
            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact
                    onGridReady={this.onGridReady}
                    columnDefs={this.updateColumnDefs(columnDefs)}
                    defaultColDef={this.defaultColDefs()}
                    gridOptions={this.gridOptions()}
                    rowData={rowData}
                    animateRows={true}
                />
            </div>
        );
    }    
}

export default AgGridComponent;
