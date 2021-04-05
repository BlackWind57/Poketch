import React, { useEffect, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';


import styled from '@emotion/styled';

import String from '../lib/String';

const GET_POKEMONS = gql `
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 100,
  offset: 0,
};

/////////////////// CSS START
const Item = styled.div`
  text-align: center;
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
  height: 20vh;
  -webkit-align-items: center;
  align-items: center;
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  margin-bottom: 10px;
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(0 0 #0000, 0 0 #0000), var(--tw-shadow);
`;
//////////////////// CSS ENDS



export const PokemonList = () => {
  const { fetchData } = useContext ( GlobalContext );

  // Fetch pokemons from Pokemon Graphql as data
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  useEffect ( () => {
      // Fetch pokemons from db
      fetchData();
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log('Response from server', data);

  return (
    <React.Fragment>
      {data.pokemons.results.length > 0 ? (
        <Container data-testid="test">
          <React.Fragment>
            {data.pokemons.results.map( (pokemon, i) => (
              <Link
                to={`/detail/${pokemon.name}`}
                title=""
                key={pokemon.name}
              >
                <Box>
                    <Item>
                      <Image src={pokemon.image} alt={ pokemon.url } />
                      <p className="text-gray-900 leading-none">
                        { String.capitalizeFirstLetter( pokemon.name ) }
                      </p>
                    </Item>
                </Box>
              </Link>
            ))}
          </React.Fragment>
        </Container>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5" data-testid="test">No data.</p>
      )}
    </React.Fragment>
  );
};
