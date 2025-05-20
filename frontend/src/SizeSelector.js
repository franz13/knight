import React, { useState } from "react";

const options = [4, 5, 6, 7, 8];

function SizeSelector({ onSelect }) {
  const [size, setSize] = useState(options[0]);
  return (
    <div style={{ margin: 20 }}>
      <label>
        <b>Alege dimensiunea tablei: </b>
        <select value={size} onChange={e => setSize(Number(e.target.value))}>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt} x {opt}</option>
          ))}
        </select>
      </label>
      <button style={{ marginLeft: 16 }} onClick={() => onSelect(size)}>
        Start joc
      </button>
    </div>
  );
}

export default SizeSelector;