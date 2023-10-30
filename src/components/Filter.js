import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from './Filter.module.css';


export default forwardRef((props, ref) => {
    const [filterStates, setFilterStates] = useState([]);

    useImperativeHandle(ref, () => ({
        isFilterActive() {
            return filterStates.length > 0;
        },
        doesFilterPass(params) {
            const field = props.colDef.field;
            return filterStates.includes(params.data[field]);
        },
        getModel() {
            if (filterStates.length === 0) {
                return null;
            }
            return { states: filterStates };
        },
        setModel(model) {
            if (model == null) {
                setFilterStates([]);
            } else {
                setFilterStates(model.states);
            }
        },
        setValue(value) {
            setFilterStates(value);
        },
        getModelAsString(){
            return filterStates.join(', ');
        }
    }));

    useEffect(() => {
        props.filterChangedCallback();
    });

    const toggleFilterState = (value) => {
        setFilterStates((prev) => {
            const newFilterStates = [...prev];
            const index = newFilterStates.indexOf(value);
            if (index === -1) {
                newFilterStates.push(value);
            } else {
                newFilterStates.splice(index, 1);
            }
            return newFilterStates;
        });
    };

    return (
        <div className={styles.customFilter}>
            <div className='filter-entry'>
                <button onClick={() => setFilterStates([])}>None</button>
            </div>
            {props.values.map(value => (
                <div key={value} className='filter-entry'>
                    <button onClick={() => toggleFilterState(value)}>
                        {filterStates.includes(value) ? `✓ ${value}` : value}
                    </button>
                </div>
            ))}
        </div>
    );
});
