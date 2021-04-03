import { Route, Switch } from 'react-router-dom';
import './App.css';

import { GlobalProvider } from './context/GlobalState';

import { Home } from './components/Home';
import { PokemonDetail } from './components/PokemonDetail';
import { PokemonList } from './components/MyPokemonList';


function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/detail/:name" component={PokemonDetail} exact />
          <Route path="/my-list" component={PokemonList} exact />
        </Switch>
      </div>
    </GlobalProvider>
  );
}

export default App;
