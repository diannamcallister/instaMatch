import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

// Pages
import SetupGame from "./pages/setupGame";
import Entry from "./pages/entry";
import UserStats from "./pages/userStats";
import PlayGame from "./pages/playGame";
import WonGame from "./pages/wonGame";

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