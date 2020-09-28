import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// Pages
import SetupGame from "./react_pages/setupGame";
import Entry from "./react_pages/entry";
import UserStats from "./react_pages/userStats";
import PlayGame from "./react_pages/playGame";
import WonGame from "./react_pages/wonGame";

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={ Entry } />
          <Route exact path="/setupGame" component={ SetupGame } />
          <Route exact path="/user" component={ UserStats } />
          <Route exact path="/playGame" component={ PlayGame } />
          <Route exact path="/wonGame" component={ WonGame } />
        </Switch>
      </Router>
    );
  }
}

export default App;