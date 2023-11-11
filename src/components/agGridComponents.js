import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import Filter from "./Filter";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class AgGridComponent extends Component {
    componentDidMount() {
        this.props.fetchData();
    }

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
                    floatingFilterParams: { suppressFilterButton: true }
                })
            } else {
                return Object.assign({}, col, {
                    filter: true,
                    floatingFilter: true,
                })
            }
        });
    }

    gridOptions() {
        return {
            rowSelection: 'multiple',
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
