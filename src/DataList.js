import React from "react";
import "./DataList.css";

function DataItem({ label, value }) {
  const texts = Array.isArray(value) ? value : [value];

  return (
    <div className="data-item">
      <div className="data-label">{label}</div>
      <div>
        {texts.map((text) => (
          <div key={text} className="data-text">
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DataList({ list }) {
  return (
    <div>
      {list.map(([label, value]) => (
        <DataItem key={label} label={label} value={value} />
      ))}
    </div>
  );
}
