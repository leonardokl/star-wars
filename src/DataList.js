import React from "react";
import "./DataList.css";

function DataItem({ label, value }) {
  const texts = Array.isArray(value) ? value : [value];

  return (
    <div className="data-list__item">
      <div className="data-list__item-label">{label}</div>
      <div>
        {texts.map((text) => (
          <div key={text} className="data-list__item-text">
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
