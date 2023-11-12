import React, { forwardRef, useState, useImperativeHandle, useEffect } from "react";

const CustomTextFilter = forwardRef((props, ref) => {
    console.log(props);
    
    const [filterText, setFilterText] = useState('');

    // Use the persistent selection state passed in props
    const { selectedRows } = props;

    useImperativeHandle(ref, () => ({
        isFilterActive() {
            return filterText !== '';
        },
        doesFilterPass(params) {
            const rowIsSelected = selectedRows.some(selectedRow => 
                selectedRow.athlete === params.data.athlete
            );
        
            if (rowIsSelected) {
                return true;
            }

            const field = props.colDef.field;
            const fieldValue = params.data[field];
            if (fieldValue !== undefined && fieldValue !== null) {
                return fieldValue.toString().toLowerCase().includes(filterText.toLowerCase());
            }

            return false;
        },
        getModel() {
            return filterText ? { value: filterText } : null;
        },
        setModel(model) {
            setFilterText(model ? model.value : '');
        },
        getModelAsString() {
            return filterText;
        }
    }));

    useEffect(() => {
        props.filterChangedCallback();
    }, [filterText, props]);

    useEffect(() => {
        props.filterChangedCallback();
    }, [selectedRows, props]);

    useEffect(() => {
        console.log('selectedRows in CustomTextFilter:', selectedRows);
    }, [selectedRows]);
    
    return (
        <div>
            <input
                type="text"
                value={filterText}
                onChange={event => setFilterText(event.target.value)}
                placeholder="Filter..."
            />
        </div>
    );
});

export default CustomTextFilter;
