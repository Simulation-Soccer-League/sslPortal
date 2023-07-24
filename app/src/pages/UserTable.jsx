import React, { useState } from 'react';
import DraftClassList from "../components/Datatables/DataDraftClass";

function UserTable() {
  const [selectedDraftClass, setSelectedDraftClass] = useState('ALL');

  const handleDropdownChange = (event) => {
    setSelectedDraftClass(event.target.value);
  };

  const draftClassOptions = Array.from({ length: 11 }, (_, index) => `S${index + 1}`);

  return (
    <div>
      <div className='dropdownInput'>
        {/* Dropdown Input */}
        <label htmlFor="dropdown">Select a Draft Class</label>
        <select id="dropdown" value={selectedDraftClass} onChange={handleDropdownChange}>
          <option value="ALL">ALL</option>
          {draftClassOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <DraftClassList
        url={`${process.env.REACT_APP_PUBLIC_API_URL}/getPlayers?draftClass=${selectedDraftClass}`}
      />
    </div>
  );
}

export default UserTable;
