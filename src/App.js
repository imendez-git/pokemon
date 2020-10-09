import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Dashboard from './pages/dashboard/dashboard';
import Pokedex from './pages/pokedex/index';
import Favorites from './pages/favorites/index';
import PokeMoves from './pages/pokemonsData/moves';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/pokedex' component={Pokedex} />
        <Route exact path='/favorites' component={Favorites} />
        <Route exact path='/moves' component={PokeMoves} />
      </Switch>
    </div>
  );
}

export default App;
