import React, { useReducer, useEffect } from 'react';

const initialState = {
    loading: true,
    error: '',
    bodyObject: ''
}

const reducer = ( state, action ) => {
    switch ( action.type ) {
        case "FETCH_SUCCESS":
            return {
                loading: false,
                error: '',
                bodyObject: action.payload
            }

        case "FETCH_ERROR":
            return {
                loading: false,
                bodyObject: {},
                error: "Something went wrong !"
            }
        default:
            return state;
    }
}

function FetchMyPokemons () {
    const [state, dispatch] = useReducer ( reducer, initialState );

    useEffect ( () => {
        // Fetch pokemons from db
      try {
        fetch(process.env.REACT_APP_URL + "/pokemon/my-list")
        .then ( response => {
          dispatch ( { type: 'FETCH_SUCCESS', payload: response.data });
        })
        .catch ( error => {
          dispatch ( { type: 'FETCH_ERROR', error: error });
        });

      } catch (e) {
        console.log(e);
      }
  }, []);

  return (
    <div>
      { state.loading ? "Loading" : state.bodyObject }
      { state.error ? state.error : null }
    </div>
  );
}

export default FetchMyPokemons;
