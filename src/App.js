import React, { useEffect, useState } from "react";
import "./App.css";
import { request } from "./utils";

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
        results: response.results.concat(data.results)
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
    status
  } = usePeople();

  return (
    <main className="App">
      <ul aria-label="Characters" className="characters">
        {results.map(person => (
          <li key={person.id} className="characters-item">
            {person.name}
          </li>
        ))}
      </ul>
      {status === "loading" && <div>Loading...</div>}
      {status !== "loading" && !!next && (
        <button
          className="button"
          onClick={fetchMore}
          disabled={status === "loading"}
        >
          SHOW MORE
        </button>
      )}
    </main>
  );
}

export default App;
