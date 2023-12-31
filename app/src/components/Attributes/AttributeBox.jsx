import React from "react";
import { useState } from "react";

const AttributeBox = ({ data, editable }) => {

    const costArray = { 5: 0, 6: 2, 7: 4, 8: 8, 9: 12, 10: 16, 11: 22, 12: 28, 13: 34, 14: 46, 15: 58, 16: 70, 17: 88, 18: 106, 19: 131, 20: 156 }

    // The 'data' prop will have the 'key', 'value', and 'text' properties.
    const { key, value, text } = data;

    const [editableValue, setEditableValue] = useState(value);
    const [nextCost, setNextCost] = useState(costArray[value + 1] - costArray[value]);

    const handleInputChange = (event) => {
        // Update the state without validation while typing
        setEditableValue(event.target.value);

        if (parseInt(event.target.value) === 20) {
            setNextCost(0)
        } else {
            setNextCost(costArray[parseInt(event.target.value) + 1] - costArray[parseInt(event.target.value)])
        }
    };

    const handleBlur = () => {
        // Perform the validation only when the input loses focus (on blur)
        let newValue = parseInt(editableValue);

        // Ensure the value is within the range [5, 20]
        newValue = Math.min(20, Math.max(5, newValue));

        if (!isNaN(newValue)) {
            setEditableValue(newValue);
        }
    };

    const currentCost = costArray[editableValue] || 0; // Calculate the current cost based on the input value

    return (
        <div
            className="attribute-box">
            <label htmlFor={key} >{key}</label>
            {key === "Natural Fitness" || key === "Stamina" ?
                <div className="attribute-input">
                    <input
                        id={key}
                        type="number"
                        value={editableValue}
                        readOnly={true}
                        max={20}
                        min={20}
                    />
                </div>
                :
                <div className="attribute-input">
                    <input
                        id={key}
                        type="number"
                        value={editableValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        max={20}
                        min={5}
                    />
                    <div className="attribute-cost">
                        <div>Total Cost: {currentCost}</div> {/* Display the current cost */}
                        <div>Upgrade Cost: {nextCost}</div> {/* Display the upgrade cost */}
                    </div>
                </div>
            }

            <div className="attribute-info">
                {text}
            </div>
        </div>
    );



}



export default AttributeBox;