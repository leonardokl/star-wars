import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import DataList from "./DataList";
import "./PersonDialog.css";
import { request } from "./utils";

export default function PersonDialog({ data, onClose }) {
  const [starships, setStarships] = useState([]);

  useEffect(() => {
    if (data.starships.length) {
      setStarships([]);
      Promise.all(data.starships.map((url) => request(url))).then(setStarships);
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
        <DataList
          list={[
            ["Height", data.height],
            ["Mass", data.mass],
            ["Hair color", data.hair_color],
            ["Skin color", data.skin_color],
            ["Eye color", data.eye_color],
            ["Birth year", data.birth_year],
            ["Gender", data.gender],
            [
              "Starships",
              !!data.starships.length
                ? starships.map((starship) => starship.name)
                : "n/a",
            ],
          ]}
        />
      </div>
    </Dialog>
  );
}
