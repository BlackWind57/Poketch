import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from './GlobalState';

import styled from '@emotion/styled';

const HeadingDiv = styled.div `
  display: flex;
  align-items: center;
  margin-top: 96px;
  margin-bottom: 40px;

  div {
    flex-grow: 1;
    text-align: right;
    padding: 8px 16px;
    margin: 8px;
  }

  button {
    background-color: rgba(52, 211, 153, 1);
    color: white;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-flex;
    place-items: center;
  }

  button:hover {
    background-color: rgba(16, 185, 129, 1);
  }
`;

export const Heading = () => {
  const { pokemons } = useContext(GlobalContext);

  return (
    <>
      <HeadingDiv>
        <div>
          <Link to="/my-list">
            <button>
              <span id="pokemon-title">My Pokemons ({ pokemons.length })</span>
            </button>
          </Link>
        </div>
      </HeadingDiv>
    </>
  );
};
