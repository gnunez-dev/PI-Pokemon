import React from 'react';
import { Route } from "react-router-dom";
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Create from './components/Create/Create'
import DetailsPokemon from './components/DetailsPokemon/DetailsPokemon';
import './App.css';


function App() {
  return (

    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route path="/create" component={Create} />
      <Route path="/pokemon/:id"  component={DetailsPokemon}/>
    </React.Fragment>

  );
}

export default App;
