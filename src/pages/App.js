import React from 'react';
import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import SingleCollection from './SingleCollection';
import '../styles/App.css';
import SingleAsset from './SingleAsset';
import About from './About';
const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/singlecollection/:collection_slug">
            <SingleCollection />
          </Route>
          <Route path="/singleasset/:asset_token_address/:asset_token_id">
            <SingleAsset />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
