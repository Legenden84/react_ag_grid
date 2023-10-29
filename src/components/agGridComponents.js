import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
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

    render() {
        const { columnDefs, rowData } = this.props;
        return (
            <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
                <AgGridReact
                    onGridReady={this.onGridReady}
                    columnDefs={columnDefs}
                    defaultColDef={this.defaultColDefs()}
                    rowData={rowData}
                />
            </div>
        );
    }    
}

export default AgGridComponent;
