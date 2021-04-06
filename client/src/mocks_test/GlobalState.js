import React, { createContext, useReducer } from 'react';

import appReducer from '../context/AppReducer';

const initialState = {
    pokemons: [],
    loading: true,
    error: ''
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function addPokemonToMyList(pokemon) {
    dispatch({
      type: "ADD_POKEMON",
      payload: pokemon
    });
  }

  function removePokemonFromMyList(pokemon) {
    dispatch({
      type: "REMOVE_POKEMON",
      payload: pokemon
    });
  }

  function fetchingMyPokemons ( data ) {
    dispatch ( {
      type: 'FETCH_SUCCESS',
      payload: data
    });
  }

  function fetchingError ( error ) {
    dispatch ( {
      type: 'FETCH_ERROR',
      payload: error
    });
  }

  function fetchData ( success ) {
    try {
      if (state.loading) {
        if ( success ) {
          // using a sample data from the graphql
          fetchingMyPokemons ( [
            {
              _id: "6068a9c0a9393a000841ff58",
              name: 'squirtle',
              nick_name: 'Turtle',
              image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
            },
            {
              _id: "6069cc7406a087000713e81e",
              name: 'wartortle',
              nick_name: 'negi',
              image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'
            },
            {
              _id: "6069d5290ccc4300098e0b99",
              name: 'wartortle',
              nick_name: 'dasd',
              image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'
            }
          ]);
        }
        else {
          fetchingError ( "You have an error" );
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        pokemons: state.pokemons,
        loading: state.loading,
        error: state.error,
        addPokemonToMyList,
        removePokemonFromMyList,
        fetchData,
        fetchingMyPokemons,
        fetchingError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
