import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { GlobalContext, GlobalProvider } from '../mocks_test/GlobalState';

afterEach(cleanup);

// Testing Global State variables
it('testing initial states of global state', () => {
  const { getByText } = render(
    <GlobalProvider>
      <GlobalContext.Consumer>
        { (value) =>
          <>
            <span>Loading: {value.loading.toString()}</span>
            <span>Error: {value.error.toString()}</span>
            <span>Pokemons: { value.pokemons.map ( (pokemon) => pokemon.name).join(',') }</span>
          </>
        }
      </GlobalContext.Consumer>
    </GlobalProvider>
  );
  expect(getByText('Loading: true')).toBeTruthy();
  expect(getByText("Error:")).toBeTruthy();

 });


it('testing states of global state after fetching data', () => {

  const { getByText } = render (
    <GlobalProvider>
        <GlobalContext.Consumer>
          {(value) => (
            <>
              <span>Loading: {value.loading.toString()}</span>
              <span>Error: {value.error.toString()}</span>
              <span>Pokemons: { value.pokemons.map ( (pokemon) => pokemon.name).join(',') }</span>
              <button onClick={ () => value.fetchingMyPokemons( [{
                 _id: "6068a9c0a9393a000841ff58",
                 name: 'squirtle',
                 nick_name: 'Turtle',
                 image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
               }] ) }>Fetch</button>
            </>
          )}
        </GlobalContext.Consumer>
      </GlobalProvider>
    );

  fireEvent.click(getByText("Fetch"));

  expect(getByText("Loading: false")).toBeTruthy();
  expect(getByText("Error:")).toBeTruthy();
  expect(getByText("Pokemons: squirtle")).toBeTruthy();
});

it ("testing states of global state when there's an error", () => {

  const { getByText } = render (
    <GlobalProvider>
        <GlobalContext.Consumer>
          {(value) => (
            <>
              <span>Loading: {value.loading.toString()}</span>
              <span>Error: {value.error.toString()}</span>
              <span>Pokemons: { value.pokemons.map ( (pokemon) => pokemon.name).join(',') }</span>
              <button onClick={ () => value.fetchingError("You have something wrong") }>Fetch</button>
            </>
          )}
        </GlobalContext.Consumer>
      </GlobalProvider>
    );

  fireEvent.click(getByText("Fetch"));

  expect(getByText("Loading: false")).toBeTruthy();
  expect(getByText("Error: You have something wrong")).toBeTruthy();
  expect(getByText("Pokemons:")).toBeTruthy();
});
