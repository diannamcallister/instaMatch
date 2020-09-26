import React from 'react';
import { Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Icon,
  Grid
} from 'semantic-ui-react'
import '../App.css';

class WonGame extends React.Component {

    render() {
        return (
          <div className="App-height">
          <header className="App-header">
          <Link to="/">
            <Button animated
                    type='submit'
                    size="large"
                    style={{ background: '##ffff', color: 'grey', right:'15px', position: 'absolute'}}
                    >
                    <Button.Content visible> Logout</Button.Content>
                    <Button.Content hidden><Icon name='lock' /></Button.Content>
            </Button>
          </Link>
          </header>
          <div className="half-padding-top">
          <h1 style={{color:'white'}}>You Won! Here are your stats from this game:</h1>
          <div className="half-padding-top">
          <Grid columns={1} divided>

            <Grid.Row>
            <Grid.Column>
            <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>Score:</b> {this.props.location.state.score}</p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>Time:</b> {this.props.location.state.time / 1000}</p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>Instagram Account Used:</b> {this.props.location.state.instagram_account}</p>
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
                        style={{ background: '##ffff', color: 'grey', position: 'relative', padding: '35px'}}
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