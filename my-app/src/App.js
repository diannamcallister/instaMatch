import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// Pages
import GameStart from "./pages/gameStart";
import Entry from "./pages/entry";
import UserDetails from "./pages/userDetails";
import PlayGame from "./pages/playGame";
import WonGame from "./pages/wonGame";

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={ Entry } />
          <Route exact path="/game" component={ GameStart } />
          <Route exact path="/user" component={ UserDetails } />
          <Route exact path="/playGame" component={ PlayGame } />
          <Route exact path="/wonGame" component={ WonGame } />
        </Switch>
      </Router>
    );
  }
}

export default App;