import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import String from '../lib/String';
import MathLib from '../lib/MathLib';

import styled from '@emotion/styled';


const GET_POKEMON_DETAIL = gql `
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }
`;

// CSS
const Container = styled.div `
  height: 100%;
  min-height: 100vh;
  background-image: linear-gradient(175deg, #eaee44, #33d0ff);
  opacity: 0.7;
  padding-bottom: 67px;

  h4 {
    font-weight: bold;
    padding-top: 10px;
  }
`;

const ImageBox = styled.div `
  justify-content: center;
  margin-bottom: 25px;

  img {
    margin: 0 auto;
    height: 30vh;
  }
`;

const Content = styled.div `
  margin: 0 10px;
  background-color: rgba(243, 244, 246, 1);
  box-shadow: var ( 0 0 #0000, 0 0 #0000), var(0 0 #0000, 0 0 #0000), var(0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06));
  border-radius: 8px;
  padding-bottom: 20px;
`;

const Title = styled.div `
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  padding-top: 30px;
`;

const Description = styled.div `
  text-align: center;
  padding: 20px auto;

  a {
    text-decoration: underline;
    font-size: 14px;
  }
`;

const Type = styled.div `
  margin-bottom: 20px;
`;

const Move = styled.div `
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;

  p {
    margin: 5px 0;
    width: 50%;
  }
`;

const BottomMenu = styled.div `
  position: fixed;
  bottom: 10px;
  justify-content: center;
  text-align: center;
  width: 100%;
  background: transparent;

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


export const PokemonDetail = ( route ) => {
  const { addPokemonToMyList, pokemons, fetchData } = useContext(GlobalContext);

  const [showMore, setShowMore] = useState ({
    count: 4
  });

  useEffect ( () => {
    fetchData();
  });

  // Get detail of the pokemon
  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { name: route.match.params.name },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const pokemon = data.pokemon;

  // Handler
  const handleShowMore = ( count ) => {
    setShowMore ( { ...showMore, count: count + 4 } );
  }

  const nickNameInvalid = ( nick_name, pokemon ) => {
    if ( nick_name === null || nick_name === '' ) return true;

    for (let i = 0; i < pokemons.length; i++) {
      if ( pokemons[i].name === pokemon.name
          && pokemons[i].nick_name.toLowerCase() === nick_name.toLowerCase() ) {
        return true;
      }
    }
    return false;
  }

  const handleSuccessCatch = ( pokemon ) => {
    try {
      let num = MathLib.randomNumber ();

      if ( num === 1 ) {

        var enteredName = prompt ("Congratulations! You have captured a/an "+ pokemon.name +". Enter the pokemon's nickname.");

        while ( nickNameInvalid (enteredName, pokemon) ) {
          enteredName = prompt ("The entered nickname for that pokemon has already existed/invalid. Please enter a different nickname.");
        }

        var savedPokemon = {
          name: pokemon.name,
          nick_name: enteredName,
          image_url: pokemon.sprites.front_default
        }
        handleCatch( savedPokemon );
      }
      else {
        alert ( "Catching Pokemon Unsuccessful" );
      }
    }
    catch (e) {
      console.log( e );
    }
  }

  const handleCatch = async ( pokemon ) => {

    try {
      var result = await fetch("/.netlify/functions/server/api/catch", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ( pokemon )
      });

      if ( result.ok ) {
        alert ( pokemon.nick_name + " has been captured. You can view your pokemon on My Pokemons." );

        addPokemonToMyList ( pokemon );
      }

    } catch (e) {
      console.log(e);
    }
  }

  return (
    <React.Fragment>
        <Container>
              <ImageBox>
                <img src={pokemon.sprites.front_default} alt={ pokemon.name } />
              </ImageBox>

              <Content>

                  <Title>
                    { String.capitalizeFirstLetter( pokemon.name ) }
                  </Title>

                  <Description>
                    <Type>
                      { pokemon.types.map ( (child, i ) => (
                        <p key="i">{ String.capitalizeFirstLetter ( child.type.name ) } Type</p>
                      ))}
                    </Type>
                    <hr />

                    <h4>Moves</h4>

                      <Move>
                        { pokemon.moves.slice (0, showMore.count ).map ( ( child, i ) => (
                            <p key={child.move.name}>
                              { String.capitalizeFirstLetter ( child.move.name ) }
                            </p>
                        ))}
                      </Move>

                      { (
                          <a
                            onClick={ (e) => handleShowMore( showMore.count ) }>
                            Show More
                          </a>
                        )
                      }


                  </Description>
              </Content>

          <BottomMenu>
            <Link
              to="/"
              title="Pokemon Database"
              >
              <button>
                Pokemon List
              </button>
            </Link>

              <button
                onClick={ handleSuccessCatch.bind ( this, pokemon ) }
                title="Add To My PokeList"
              >
                Catch
              </button>

              <Link
                to="/my-list"
                title="Pokemon Database"
                >
                <button>
                  My Pokemon
                </button>
              </Link>
          </BottomMenu>

        </Container>

    </React.Fragment>
  );
};
