import React, { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import "./App.css";
import { CharacterDialog } from "./components";
import { request } from "./utils";

function useCharacters() {
  const [status, setStatus] = useState("loading");
  const [{ results, next }, setResponse] = useState({ results: [] });
  async function load() {
    setStatus("loading");

    try {
      const data = await request(next || "https://swapi.co/api/people/");

      setResponse({
        ...data,
        results: results.concat(data.results),
      });
      setStatus("resolved");
    } catch (ex) {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    status,
    results,
    next,
    fetchMore: load,
  };
}

export default function App() {
  const { next, results, fetchMore, status } = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState();
  function selectCharacter(character) {
    setSelectedCharacter(character);
  }
  function handleDialogClose() {
    setSelectedCharacter(undefined);
  }
  function handleVisibilityChange(isVisible) {
    if (isVisible && status === "resolved") {
      fetchMore();
    }
  }

  return (
    <main className="app">
      <h1>
        STAR WARS <span>CHARACTERS</span>
      </h1>
      <ul aria-label="Characters" className="characters">
        {results.map((character) => (
          <li key={character.name}>
            <button
              className="characters__item"
              onClick={() => selectCharacter(character)}
            >
              {character.name}
            </button>
          </li>
        ))}
      </ul>
      {(!!next || status === "loading") && (
        <VisibilitySensor
          key={status}
          partialVisibility
          onChange={handleVisibilityChange}
        >
          <button
            className="button"
            onClick={fetchMore}
            disabled={status === "loading"}
          >
            {status === "loading" ? "LOADING..." : "LOAD MORE"}
          </button>
        </VisibilitySensor>
      )}
      {status === "error" && <div role="alert">An error ocurred</div>}
      {selectedCharacter && (
        <CharacterDialog data={selectedCharacter} onClose={handleDialogClose} />
      )}
    </main>
  );
}
