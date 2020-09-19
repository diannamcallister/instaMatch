import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Icon,
  Message,
} from 'semantic-ui-react'
import '../App.css';
import axios from 'axios'


class GameStart extends React.Component {

  constructor() {
    super();
    console.log("in constr");
    console.log(this.props);
    this.handleAccountChosen = this.handleAccountChosen.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      account_name:'',
      accountNameError:false,
      stats_url: "/user/5"
    }
  }

  handleAccountChosen = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8081/insta/${this.state.account_name}`)
    .then(res => {
      console.log("Instagram User Works");
      this.setState({gameBegin: true});
    })
    .catch(error => {
      this.setState({gameBegin: false});
      if (error.response.data.status === 400) {
        console.log("in error 400");
        this.setState({accountFormError: true});
        console.log(error.response.data.message);
        this.setState({accountFormErrorMsg: error.response.data.message});
      } else {
        this.setState({accountFormError: true});
        this.setState({accountFormErrorMsg: "There was an issue trying to access the instagram account you chose Please try again later!"});
      }
    });
  }

  onInputChange = (newValue) => {
    this.state.account_name = newValue.target.value;
    this.setState({accountNameError: false});
    this.setState({accountFormError: false})
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">InstaMatch
      <Link to={{pathname: "/user", state: {username: this.props.location.state.username}}}>
        <Button animated
                type='submit'
                size="large"
                //style={{ background: '#87d0e4', color: '#ffff', alignSelf: 'flex-end', position: 'absolute'}}
                style={{ background: '#87d0e4', color: '#ffff', right:'5px', position: 'absolute'}}
                >
                <Button.Content visible> Your Statistics</Button.Content>
                <Button.Content hidden><Icon name='id card' /></Button.Content>
        </Button>
      </Link>
      </header>
      <h3>Enter the name of an Instagram Account you want to use the images of to play a game. {this.props.location.state.username}</h3>
      <Form 
          onSubmit={(event) => {this.handleAccountChosen(event);} } 
          error={this.state.accountFormError}>
          {this.state.accountFormError
          ?
          <Message
          error
          header="The Instagram Account Chosen Cannot be Used in the Game."
          content={this.state.accountFormErrorMsg}/> : null}
          {this.state.gameBegin ? <Redirect push to="/" /> : null}
            <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(value) => {this.onInputChange(value)}}
                  error={this.state.accountNameError}
            />
          </div>
          <Button animated
              type='submit'
              size="large"
              style={{ background: '#87d0e4', color: '#ffff' }}
              >
              <Button.Content visible> Start Game</Button.Content>
              <Button.Content hidden><Icon name='play' /></Button.Content>
          </Button>
          </Form>
      </div>
    );
  }
};

export default GameStart;