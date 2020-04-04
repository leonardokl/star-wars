import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { animated, useTransition } from "react-spring";
import "./CharacterDialog.css";
import DataList from "./DataList";
import { request } from "./utils";

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

export default function PersonDialog({ data, onClose }) {
  const [starships, setStarships] = useState([]);
  const transitions = useTransition(true, null, {
    from: { opacity: 0, y: -10 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 10 },
  });
  const starshipsValue = !!data.starships.length
    ? starships.map((starship) => starship.name)
    : "n/a";

  useEffect(() => {
    if (data.starships.length) {
      Promise.all(data.starships.map((url) => request(url))).then(setStarships);
    }
  }, [data]);

  return transitions.map(
    ({ item, key, props: styles }) =>
      item && (
        <AnimatedDialogOverlay
          key={key}
          style={{ opacity: styles.opacity }}
          isOpen
          onDismiss={onClose}
        >
          <AnimatedDialogContent
            aria-labelledby="dialog-label"
            className="character-dialog"
            style={{
              transform: styles.y.interpolate(
                (value) => `translate3d(0px, ${value}px, 0px)`
              ),
            }}
          >
            <>
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
            </>
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      )
  );
}
