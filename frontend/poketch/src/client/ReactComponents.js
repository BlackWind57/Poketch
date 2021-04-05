import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { GlobalContext, GlobalProvider } from '../context/GlobalState';
import { PokemonList } from "../mocks_test/PokemonList";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);


// Testing pokemon list page
it ("renders correctly", async () => {
    /*const { fragment } = render (
      <ApolloProvider client={client}>
        <GlobalProvider>
          <GlobalContext.Consumer>
          {(value) => {
            console.log(value);
            return (
              <PokemonList />
            )
          }}
          </GlobalContext.Consumer>
        </GlobalProvider>
      </ApolloProvider>);
    expect(fragment(<PokemonList />)).toMatchSnapshot();*/

    const fakeResponse = { pokemons: [{
       _id: "6068a9c0a9393a000841ff58",
       name: 'squirtle',
       nick_name: 'Turtle',
       image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
     }],
     loading: false,
     error: ''
    };
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
    const { getByTestId } = render(
      <ApolloProvider client={client}>
        <GlobalProvider>
          <GlobalContext.Consumer>
          {(value) => {
            console.log(value);
            return (
              <PokemonList />
            )
          }}
          </GlobalContext.Consumer>
        </GlobalProvider>
      </ApolloProvider>
    );
    const div = await waitFor(() => getByTestId('test'));
    //expect(div).toHaveTextContent('example text');
    expect(mockedFetch).toBeCalledTimes(1);
    expect(mRes.json).toBeCalledTimes(1);
});
