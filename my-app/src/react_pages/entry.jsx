import React from 'react';
import { Redirect} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Icon,
  Message
} from 'semantic-ui-react'
import '../App.css';
import {handle_login, handle_signup, on_input_change} from '../js_pages/entry.js';

class Entry extends React.Component {

  constructor() {
    super();
    this.handle_login = handle_login.bind(this);
    this.on_input_change = on_input_change.bind(this);
    this.handle_signup = handle_signup.bind(this);
    this.state = {
      login_username:'',
      login_password:'',
      login_username_error:false,
      login_password_error:false,
      signup_username:'',
      signup_password:'',
      instagram_account:'',
      signup_username_error:false,
      signup_password_error:false,
      login_worked:false,
      signup_worked:false
    }
  }

  render() {
  return (
    <div className="App extra-height">
      <div className="splitScreen">
        <div className="topPane paddingTop">
          <div className="small-header">Login</div>
          <Form 
          onSubmit={(event) => {this.handle_login(event);} } 
          error={this.state.login_form_error}>
          {this.state.login_form_error
          ?
          <Message
          error
          header="Username or Password was Incorrect."
          content={this.state.login_form_error_msg}/> : null}
          {this.state.login_worked ? <Redirect push to={{pathname: "/setupGame", state: {username: this.state.login_username}}} /> : null}
            <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(value) => {this.on_input_change(value, "login_username")}}
                  error={this.state.login_username_error}
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  // style={{ width:"300px", paddingLeft : '300px', justifyContent : 'center', alignItems: 'center'}}
                  type="password"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={(value) => {this.on_input_change(value, "login_password")}}
                  error={this.state.login_password_error}
            />
          </div>
          <Button animated
              type='submit'
              size="large"
              >
              <Button.Content visible> Log In </Button.Content>
              <Button.Content hidden><Icon name='arrow right' /></Button.Content>
          </Button>
          </Form>
        </div>
        <div className="middleLine"></div>
        <div className="bottomPane paddingTop">
          <div className="small-header">Sign Up</div>
          <Form 
          onSubmit={(event) => {this.handle_signup(event);} } 
          error={this.state.signup_form_error}>
          {this.state.signup_form_error
          ?
          <Message
          error
          header="Unable to Create an Account."
          content={this.state.signup_form_error_msg}/> : null}
          {this.state.signup_worked ? <Redirect push to={{pathname: "/setupGame", state: {username: this.state.signup_username}}} /> : null}
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(value) => {this.on_input_change(value, "signup_username")}}
                  error={this.state.signup_username_error}
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="password"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={(value) => {this.on_input_change(value, "signup_password")}}
                  error={this.state.signup_password_error}
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="instagram_account"
                  icon="camera retro"
                  iconPosition="left"
                  placeholder="(Optional): Your Instagram Account"
                  onChange={(value) => {this.on_input_change(value, "instagram_account")}}
            />
          </div>
          <Button animated
              type='submit'
              size="large"
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
