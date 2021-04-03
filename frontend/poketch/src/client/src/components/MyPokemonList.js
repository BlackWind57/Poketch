import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

import styled from '@emotion/styled';

import String from '../lib/String';


const Item = styled.div`
  text-align: center;

  button {
    margin: 5px 5px;
    padding: 8px 16px;
    font-weight: 600;
    border-radius: 9999px;
    color: rgba(31, 41, 55, 1);
    display: inline-block;
    background-color: rgba(209, 213, 219, 1);
  }

  button:hover {
    background-color: rgba(156, 163, 175, 1);
  }
`;

const Image = styled.img `
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;

  /* Responsive layout - makes a one column layout instead of a two-column layout */
  @media (max-width: 320) {
    flex-direction: column;
  }
`;

const Box = styled.div`
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 5px;
  margin-right: 5px;
  height: 25vh;
  -webkit-align-items: center;
  align-items: center;
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  margin-bottom: 10px;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(0 0 #0000, 0 0 #0000), var(--tw-shadow);
`;


export const PokemonList = () => {
  const {
    pokemons,
    loading,
    error,
    removePokemonFromMyList,
    fetchData
  } = useContext(GlobalContext);

  useEffect ( () => {
      // Fetch pokemons from db
      fetchData();
  });

  const handleRelease = async ( pokemon ) => {
    try {
      let result = await fetch("/.netlify/functions/server/api/release", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ( pokemon )
      });

      if ( result ) {
        alert ( pokemon.nick_name + " has been released." );
        removePokemonFromMyList ( pokemon );
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <React.Fragment>
        <div className="container mx-auto">
          <h3 className="text-center text-3xl mt-20 text-base leading-8 text-black font-bold tracking-wide uppercase">
            Pokemon List
          </h3>
          <div className="flex items-center mt-24 mb-10">
            <div className="flex-grow text-right px-4 py-2 m-2">
              <Link to="/">
                <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded inline-flex items-center">
                  <span className="pl-2">Back To Pokemon List</span>
                </button>
              </Link>
            </div>
          </div>

          <React.Fragment>

            { loading ? (
              "Loading"

            ) : (
              <React.Fragment>

                { pokemons.length > 0 ? (
                  <Container>
                    <React.Fragment>
                      { pokemons.map( (pokemon, i) => (
                        <Box key={ pokemon._id }>
                            <Item>
                              <Image src={pokemon.image_url} alt={ pokemon.name } />
                              <p className="text-gray-900 leading-none">
                                { String.capitalizeFirstLetter( pokemon.nick_name ) }
                              </p>
                              <div>
                                <button
                                  onClick={() => handleRelease ( pokemon ) }
                                  title="Remove"
                                >
                                  Release
                                </button>
                              </div>
                            </Item>
                        </Box>
                      ))}
                    </React.Fragment>
                  </Container>
                ) : (
                  <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
                )}
              </React.Fragment>
            )}

            { error ? error : null }
          </React.Fragment>

        </div>
      </React.Fragment>

  );
};
