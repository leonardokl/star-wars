import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import "./CharacterDialog.css";
import DataList from "./DataList";
import { request } from "./utils";

export default function PersonDialog({ data, onClose }) {
  const [starships, setStarships] = useState([]);
  const starshipsValue = !!data.starships.length
    ? starships.map((starship) => starship.name)
    : "n/a";

  useEffect(() => {
    if (data.starships.length) {
      Promise.all(data.starships.map((url) => request(url))).then(setStarships);
    }
  }, [data]);

  return (
    <Dialog
      isOpen
      onDismiss={onClose}
      className="character-dialog"
      aria-labelledby="dialog-label"
    >
      <div className="character-dialog__header">
        <h2 id="dialog-label">{data.name}</h2>
        <button
          className="character-dialog__close-button"
          aria-label="close"
          onClick={onClose}
        >
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
            ["Starships", starshipsValue],
          ]}
        />
      </div>
    </Dialog>
  );
}
