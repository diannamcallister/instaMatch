import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Icon,
  Message,
  Grid,
  Image
} from 'semantic-ui-react'
import '../App.css';
import axios from 'axios'

class WonGame extends React.Component {

    render() {
        return (
          <div className="App">
          <header className="App-header">InstaMatch
          <Link to="/">
            <Button animated
                    type='submit'
                    size="large"
                    style={{ background: '#87d0e4', color: '#ffff', right:'5px', position: 'absolute'}}
                    >
                    <Button.Content visible> Logout</Button.Content>
                    <Button.Content hidden><Icon name='lock' /></Button.Content>
            </Button>
          </Link>
          </header>
          <h1>You Won! Here are your stats from this game:</h1>
          <Grid columns={1} divided>

            <Grid.Row>
            <Grid.Column>
            <h2 style={{float:'left', margin:'20px', position:'absolute'}}>Score: {this.props.location.state.score}</h2>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <h2 style={{float:'left', margin:'20px', position:'absolute'}}>Time: {this.props.location.state.time / 1000} seconds</h2>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <h2 style={{float:'left', margin:'20px', position:'absolute'}}>Instagram Account Used: {this.props.location.state.instagram_account}</h2>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="topSpace" style={{paddingTop:'100px'}}>
            <Link to={{pathname:"/game", state: {username: this.props.location.state.username}}}>
                <Button animated
                        type='submit'
                        size="large"
                        style={{ background: '#87d0e4', color: '#ffff', position: 'relative', padding: '35px'}}
                        >
                        <Button.Content visible> Start New Game</Button.Content>
                        <Button.Content hidden><Icon name='play' /></Button.Content>
                </Button>
            </Link>
          </div>
          </div>
        )
    };
}

export default WonGame;