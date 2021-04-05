import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalState';


import styled from '@emotion/styled';

import String from '../lib/String';

// Sample query result from Graphql
const pokemons = [
  {
    "url": "https://pokeapi.co/api/v2/pokemon/2/",
    "name": "ivysaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/3/",
    "name": "venusaur",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/4/",
    "name": "charmander",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/5/",
    "name": "charmeleon",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/6/",
    "name": "charizard",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/7/",
    "name": "squirtle",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/8/",
    "name": "wartortle",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/9/",
    "name": "blastoise",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/10/",
    "name": "caterpie",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/11/",
    "name": "metapod",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"
  },
  {
    "url": "https://pokeapi.co/api/v2/pokemon/12/",
    "name": "butterfree",
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"
  }
];

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

  useEffect ( () => {
      // Fetch pokemons from db
      fetchData( true );
  });

  return (
    <>
        {pokemons.length > 0 ? (
          <Container data-testid="pokemon-list">
            <React.Fragment>
              {pokemons.map( (pokemon, i) => (
                <Link
                  to={`/detail/${pokemon.name}`}
                  title={pokemon.name}
                  key={pokemon.name}
                  id={pokemon.name}
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
          <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
        )}
    </>
  );
};
