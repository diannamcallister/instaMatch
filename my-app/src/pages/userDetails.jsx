import React, { Text } from 'react';
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

class UserDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="App">
          <header className="App-header">
            <Button animated
                    type='submit'
                    size="large"
                    style={{ background: 'white', color: 'grey', right:'375px', top:'115px', position: 'absolute'}}
                    onClick={this.props.closeModal}
                    >
                    <Button.Content visible> X</Button.Content>
            </Button>
          </header>
          <div className="half-padding-top">
          <h1 style={{color:'white'}}>Here are your statistics:</h1>
          <div className="half-padding-top">
          <Grid columns={1} divided>
            <Grid.Row>
            <Grid.Column>
                <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>Username:</b> {this.props.user_data.username}</p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>High Score:</b> {this.props.user_data.high_score}</p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>Time:</b> {this.props.user_data.time / 1000}</p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            <p style={{color:'black', fontSize:'35px'}}><b style={{color:"white"}}>Instagram Account Used:</b> {this.props.user_data.instagram_account}</p>
            </Grid.Column>
            </Grid.Row>

            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            </Grid.Row>
          </Grid>
          </div>
          </div>
          </div>
        )
    };
}

export default UserDetails;