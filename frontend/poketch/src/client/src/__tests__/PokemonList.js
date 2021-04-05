import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { GlobalContext, GlobalProvider } from '../mocks_test/GlobalState';
import { PokemonList } from '../mocks_test/PokemonList';
import TestRenderer from 'react-test-renderer';

const pokemons = [ 'ivysaur', 'venusaur',
'charmander', 'charmeleon', 'charizard',
'squirtle', 'wartortle', 'blastoise', 'caterpie',
'metapod', 'butterfree' ];


function generatePokemonList() {
  return new TestRenderer.create(
    <HashRouter>
       <GlobalContext.Provider value={{
           pokemons: [],
           loading: false,
           error: "",
           fetchData: jest.fn()
            }} >
              <PokemonList />
       </GlobalContext.Provider>
     </HashRouter>
    );
}

afterEach(cleanup);

describe ("Pokemon list", () => {
  it("renders correctly based on sample data", () => {

    const element = generatePokemonList();

      expect ( element.toJSON().children.length ).toBe (pokemons.length);
      for (var i = 0; i < pokemons.length; i++) {
        expect(element.toJSON().children[i].props.title).toBe(pokemons[i]);
      }
  });
});

/*
describe ( "Going to pokemon details page", () => {
  it("goes to each individual pokemons correctly", () => {
    const element = generatePokemonList();

    console.log(element.root.findByProps({to:'/detail/squirtle'}) );

    let link = element.root.findByProps({id:'squirtle'});
    TestRenderer.act (() => {
      fireEvent.click ( link );
    });

    console.log(element.toJSON());
    expect (element.root.findByType('Title')).toBeTruthy();
   });
});
*/
