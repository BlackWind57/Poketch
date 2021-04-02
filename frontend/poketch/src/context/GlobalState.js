import React, { createContext, useReducer } from 'react';

import appReducer from './AppReducer';

const initialState = {
    pokemons: [],
    loading: true,
    error: '',
    bodyObject: ''
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

  return (
    <GlobalContext.Provider
      value={{
        pokemons: state.pokemons,
        loading: state.loading,
        error: state.error,
        addPokemonToMyList,
        removePokemonFromMyList,
        fetchingMyPokemons,
        fetchingError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
