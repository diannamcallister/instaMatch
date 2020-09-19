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
    this.handleAccountChosen = this.handleAccountChosen.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.getStats = this.getStats.bind(this);
    this.state = {
      account_name:'',
      accountNameError:false,
      results:false,
      user_data:{}
    }
  }

  getStats = () => {
    axios.get(`http://localhost:8081/leaderboard/${this.props.location.state.username}`)
      .then(res => {
      if (res.data.leaderboard_entry) {
          // there is a leaderboard entry
          let user_info = {
            username: res.data.leaderboard_entry.username ? res.data.leaderboard_entry.username : '',
            high_score: res.data.leaderboard_entry.score ? res.data.leaderboard_entry.score : '',
            time: res.data.leaderboard_entry.time ? res.data.leaderboard_entry.time : '',
            instagram_account: res.data.leaderboard_entry.instagram_account ? res.data.leaderboard_entry.instagram_account : ''
          }
          this.setState({user_data: user_info});
          console.log(this.state.user_data);
          this.setState({results:true});
      } else {
        this.setState({user_data: {username: this.props.location.state.username}});
        this.setState({results:true});
      }
    })
    .catch(error => {
    });
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
        <Button animated
                type='submit'
                size="large"
                style={{ background: '#87d0e4', color: '#ffff', right:'5px', position: 'absolute'}}
                onClick={this.getStats}
                >
                <Button.Content visible> Your Statistics</Button.Content>
                <Button.Content hidden><Icon name='id card' /></Button.Content>
                {this.state.results ? <Redirect push to={{pathname: "/user", state: {user_data: this.state.user_data}}} /> : null}
        </Button>
      </header>
      <h3>Enter the name of an Instagram Account you want to use the images of to play a game.</h3>
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