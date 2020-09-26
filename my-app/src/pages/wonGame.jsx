import React from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Icon,
  Grid
} from 'semantic-ui-react'
import '../App.css';
import '../css/wonGame.css';

class WonGame extends React.Component {

    render() {
        return (
          <div className="App-height">
          <header className="App-header">
          <Link to="/">
            <Button animated
                    type='submit'
                    size="large"
                    className="logout-button"
                    >
                    <Button.Content visible> Logout</Button.Content>
                    <Button.Content hidden><Icon name='lock' /></Button.Content>
            </Button>
          </Link>
          </header>
          <div className="half-padding-top">
          <h1>You Won! Here are your stats from this game:</h1>
          <div className="half-padding-top">
          <Grid columns={1} divided>

            <Grid.Row>
            <Grid.Column>
            <p><b>Score:</b> <span className="black-font">{this.props.location.state.score}</span></p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p><b>Time:</b> <span className="black-font">{this.props.location.state.time / 1000}</span></p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p><b>Instagram Account Used:</b> <span className="black-font">{this.props.location.state.instagram_account}</span></p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="topSpace" style={{paddingTop:'100px'}}>
            <Link to={{pathname:"/setupGame", state: {username: this.props.location.state.username}}}>
                <Button animated
                        type='submit'
                        size="large"
                        className="new-game-button"
                        >
                        <Button.Content visible> Start New Game</Button.Content>
                        <Button.Content hidden><Icon name='play' /></Button.Content>
                </Button>
            </Link>
          </div>
          </div>
          </div>
          </div>
        )
    };
}

export default WonGame;