import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./PersonDialog.css";
import { request } from "./utils";

export default function PersonDialog({ data, onClose }) {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    if (data) {
      Promise.all(data.starships.map(url => request(url))).then(setStarships);
    }
  }, [data]);

  return (
    <Dialog
      isOpen={!!data}
      onDismiss={onClose}
      style={{ background: "#25262c" }}
      aria-labelledby="dialog-label"
    >
      <div className="dialog-header">
        <h2 id="dialog-label">{data && data.name}</h2>
        <button className="close-button" aria-label="close" onClick={onClose}>
          <FiX color="white" />
        </button>
      </div>
      <div>
        <h3>Starships</h3>
        <ul>
          {starships.map(starship => (
            <li key={starship.name}>{starship.name}</li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}
