import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { GlobalContext, GlobalProvider } from '../mocks_test/GlobalState';
import { PokemonList } from '../mocks_test/PokemonList';
import { Heading } from '../mocks_test/Heading';
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

function generateHeadingAndPokemonList() {
  return new TestRenderer.create (
    <HashRouter>
       <GlobalContext.Provider value={{
           pokemons: [
             {
               _id: "020394",
               nick_name: "Test nick name",
               name: "squirtle"
             }
           ],
           loading: false,
           error: "",
           fetchData: jest.fn()
            }} >
              <Heading />
              <PokemonList />
       </GlobalContext.Provider>
     </HashRouter>
  );
}

afterEach(cleanup);

describe ("Test Pokemon list", () => {
  it("snapshots testing", () => {
    let root;
    TestRenderer.act(() => {
      root = generatePokemonList();
    });

    // make assertions on root
    expect(root.toJSON()).toMatchSnapshot();
  });

  it("renders correctly based on sample data", () => {

    const element = generatePokemonList();

      expect ( element.toJSON().children.length ).toBe (pokemons.length);
      for (var i = 0; i < pokemons.length; i++) {
        expect(element.toJSON().children[i].props.title).toBe(pokemons[i]);
      }
  });
});

describe ("Test Pokemon list with Heading", () => {
  it ("renders correctly on load", () => {
    let element;
    TestRenderer.act(() => {
      element = generateHeadingAndPokemonList();
    });

    // make assertions on root
    expect(element.toJSON()).toMatchSnapshot();
  });

  it('Tests my pokemons initial count should be 0', () => {
    let element;
    TestRenderer.act(() => {
      element = new TestRenderer.create (
        <HashRouter>
           <GlobalContext.Provider value={{
               pokemons: [],
               loading: false,
               error: "",
               fetchData: jest.fn()
                }} >
                  <Heading />
                  <PokemonList />
           </GlobalContext.Provider>
         </HashRouter>
      );
    });

    let title = element.root.findByProps ({id: 'pokemon-title'});

    expect ( title.children ).toEqual ([ 'My Pokemons (', '0', ')' ]);
  });

  it('Tests my pokemons count should exist 1 pokemon', function () {
    let element;
    TestRenderer.act(() => {
      element = generateHeadingAndPokemonList();
    });

    let title = element.root.findByProps ({id: 'pokemon-title'});

    expect ( title.children ).toEqual ([ 'My Pokemons (', '1', ')' ]);
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
