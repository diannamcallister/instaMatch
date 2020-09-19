import React from 'react';
import { Redirect} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Icon,
  Message,
} from 'semantic-ui-react'
import '../App.css';
import axios from 'axios'

class Entry extends React.Component {

  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      username:'',
      password:'',
      usernameError:false,
      passwordError:false,
      signup_username:'',
      signup_password:'',
      instagram_account:'',
      signupUsernameError:false,
      signupPasswordError:false,
      loginWorked:false,
      signupWorked:false
    }
  }

  handleSignUp = (e) => {
    e.preventDefault();

    let user = {};

    let error = false;
    // check if one of the fields was not entered
    if (this.state.signup_username === '') {
      this.setState({signupUsernameError: true});
      error = true;
    } else {
      this.setState({signupUsernameError: false});
      user.username = this.state.signup_username;
    }
    if (this.state.signup_password === '') {
      this.setState({signupPasswordError: true});
      error = true;
    } else {
      this.setState({signupPasswordError: false});
      user.password = this.state.signup_password;
    }
    if (error) {
      this.setState({signupFormError: true});
      return;
    }

    // if we got here, all fields have been entered; check if user creation works correctly.
    user.instagram_account = this.state.instagram_account;
    axios.post(`http://localhost:8081/user`, user)
    .then(res => {
      console.log("User Created");
    })
    .catch(error => {
      if (error.response.data.status === 400) {
        this.setState({signupFormError: true});
        this.setState({signupFormErrorMsg: error.response.data.message});
      } else {
        this.setState({signupFormError: true});
        this.setState({signupFormErrorMsg: "There was an issue trying to create an account for you. Please try again later!"});
      }
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

    let error = false;
    // check if one of the fields was not entered
    if (this.state.username === '') {
      this.setState({usernameError: true});
      error = true;
    } else {
      this.setState({usernameError: false});
    }
    if (this.state.password === '') {
      this.setState({passwordError: true});
      error = true;
    } else {
      this.setState({passwordError: false});
    }
    if (error) {
      this.setState({loginFormError: true});
      return;
    }
    
    // if we got here, all fields have been entered; check if user entry works correctly.
    axios.get(`http://localhost:8081/user/${this.state.username}/${this.state.password}`)
    .then(res => {
      console.log("User Logged In");
      this.setState({loginWorked: true});
    })
    .catch(error => {
      this.setState({loginWorked: false});
      if (error.response.data.status === 400) {
        this.setState({loginFormError: true});
        this.setState({loginFormErrorMsg: error.response.data.message});
      } else {
        this.setState({loginFormError: true});
        this.setState({loginFormErrorMsg: "There was an issue trying to access your account. Please try again later!"});
      }
    });
  }

  onInputChange = (newValue, valueToChange) => {
      if (valueToChange === "username") {
        this.state.username = newValue.target.value;
        this.setState({usernameError: false});
        this.setState({loginFormError: false});
      } else if (valueToChange === "password") {
        this.state.password = newValue.target.value;
        this.setState({passwordError: false});
        this.setState({loginFormError: false});
      } else if (valueToChange === "signup_username") {
        this.state.signup_username = newValue.target.value;
        this.setState({signupUsernameError: false});
        this.setState({signupFormError: false});
      } else if (valueToChange === "signup_password") {
        this.state.signup_password = newValue.target.value;
        this.setState({signupPasswordError: false});
        this.setState({signupFormError: false});
      } else if (valueToChange === "instagram_account") {
        this.state.instagram_account = newValue.target.value;
      }
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">InstaMatch</header>
      <div className="splitScreen">
        <div className="topPane">
          <div className="small-header">Login</div>
          <Form 
          onSubmit={(event) => {this.handleLogin(event);} } 
          error={this.state.loginFormError}>
          {this.state.loginFormError
          ?
          <Message
          error
          header="Username or Password was Incorrect."
          content={this.state.loginFormErrorMsg}/> : null}
          {this.state.loginWorked ? <Redirect push to={{pathname: "/game", state: {username: this.state.username}}} /> : null}
            <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(value) => {this.onInputChange(value, "username")}}
                  error={this.state.usernameError}
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={(value) => {this.onInputChange(value, "password")}}
                  error={this.state.passwordError}
            />
          </div>
          <Button animated
              type='submit'
              size="large"
              style={{ background: '#87d0e4', color: '#ffff' }}
              >
              <Button.Content visible> Log In </Button.Content>
              <Button.Content hidden><Icon name='arrow right' /></Button.Content>
          </Button>
          </Form>
        </div>
        <div className="middleLine"></div>
        <div className="bottomPane">
          <div className="small-header">Sign Up</div>
          <Form 
          onSubmit={(event) => {this.handleSignUp(event);} } 
          error={this.state.signupFormError}>
          {this.state.signupFormError
          ?
          <Message
          error
          header="Unable to Create an Account."
          content={this.state.signupFormErrorMsg}/> : null}
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(value) => {this.onInputChange(value, "signup_username")}}
                  error={this.state.signupUsernameError}
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={(value) => {this.onInputChange(value, "signup_password")}}
                  error={this.state.signupPasswordError}
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="instagram_account"
                  icon="camera retro"
                  iconPosition="left"
                  placeholder="Instagram Account"
                  onChange={(value) => {this.onInputChange(value, "instagram_account")}}
            />
          </div>
          <Button animated
              type='submit'
              size="large"
              style={{ background: '#87d0e4', color: '#ffff' }}
              >
              <Button.Content visible> Sign Up </Button.Content>
              <Button.Content hidden><Icon name='arrow right' /></Button.Content>
        </Button>
        </Form>
        </div>
      </div> 
    </div>
  );
  }
}

export default Entry;
