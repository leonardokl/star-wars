import { fireEvent, render } from "@testing-library/react";
import React from "react";
import App from "./App";
import { request as requestMock } from "./utils";

jest.mock("./utils");

test("show character dialog with his spaceships", async () => {
  const character = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    starships: [
      "https://swapi.co/api/starships/12/",
      "https://swapi.co/api/starships/22/",
    ],
  };
  const starships = [{ name: "X-wing" }, { name: "Imperial shuttle" }];

  requestMock
    .mockResolvedValueOnce({ results: [character] })
    .mockResolvedValueOnce(starships[0])
    .mockResolvedValueOnce(starships[1]);

  const { findByText, findByLabelText, getByRole } = render(<App />);

  fireEvent.click(await findByText(character.name));

  const dialog = getByRole("dialog");

  for (const index in character.starships) {
    expect(requestMock).toHaveBeenCalledWith(character.starships[index]);
    expect(await findByText(starships[index].name)).toBeInTheDocument();
  }

  fireEvent.click(await findByLabelText(/close/i));

  expect(dialog).not.toBeInTheDocument();
});

test("list all the characters", async () => {
  const characters = [{ name: "Palpatine" }, { name: "Jiraya" }];
  const firstResponse = {
    results: [characters[0]],
    next: "https://swapi.co/api/people/?page=2",
  };

  requestMock
    .mockResolvedValueOnce(firstResponse)
    .mockResolvedValueOnce({ results: [characters[1]] });

  const { findByText } = render(<App />);

  expect(requestMock.mock.calls[0][0]).toMatchInlineSnapshot(
    `"https://swapi.co/api/people/"`
  );

  fireEvent.click(await findByText(/load more/i));

  expect(requestMock).toHaveBeenCalledWith(firstResponse.next);

  for (const character of characters) {
    expect(await findByText(character.name)).toBeInTheDocument();
  }
});
