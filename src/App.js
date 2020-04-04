import React, { useEffect, useState } from "react";
import "./App.css";
import { request } from "./utils";
import PersonDialog from "./PersonDialog";

function usePeople() {
  const [status, setStatus] = useState("loading");
  const [response, setResponse] = useState({ results: [] });
  async function load() {
    setStatus("loading");

    try {
      const data = await request(
        response.next || "https://swapi.co/api/people/"
      );

      setResponse({
        ...data,
        results: response.results.concat(data.results),
      });
      setStatus("resolved");
    } catch (ex) {
      console.error(ex);
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { status, response, fetchMore: load };
}

function App() {
  const {
    response: { results, next },
    fetchMore,
    status,
  } = usePeople();
  const [selectedPerson, setSelectedPerson] = useState();
  function selectPerson(person) {
    setSelectedPerson(person);
  }
  function handleDialogClose() {
    setSelectedPerson(undefined);
  }

  return (
    <main className="App">
      <h1>STAR WARS</h1>
      <ul aria-label="Characters" className="characters">
        {results.map((person) => (
          <li key={person.name}>
            <button
              className="characters-item"
              onClick={() => selectPerson(person)}
            >
              {person.name}
            </button>
          </li>
        ))}
      </ul>
      {status === "loading" && !results.length && <div>Loading...</div>}
      {!!next && (
        <button
          className="button"
          onClick={fetchMore}
          disabled={status === "loading"}
        >
          {status === "loading" ? "LOADING..." : "LOAD MORE"}
        </button>
      )}
      {selectedPerson && (
        <PersonDialog data={selectedPerson} onClose={handleDialogClose} />
      )}
    </main>
  );
}

export default App;
