import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Grid,
  Header,
  Transition,
  Icon,
  Message,
  Container,
  Segment
} from 'semantic-ui-react'
import './App.css';
import axios from 'axios'
import { useFormik } from 'formik'
import { render } from "react-dom";

//const App = ({ setPageKey, ...props }) => {


  // const formik = useFormik({
  //   initialValues: {
  //     username: '',
  //     password:'',
  //   },
  //   onSubmit: (values,) => {
  //    //values.username is the username, values.password is the password
  //    //so if the username and password match a user & its the secure pass set
  //    //secureLogin = true and defaultLogin= false
  //    //else if they didn't enter the secure pass set secureLogin = false and defaultLogin= true
  //   //console.log("username:", values.username);
  //   //console.log("password:", values.password);

  //   axios.get(`http://localhost:8081/user/${values.username}/${values.password}`)
  //   .then(res => {
  //     console.log("User Logged In");
  //   })
  //   .catch(error => {
  //     if (error.response.data.status === 400) {
  //       let err = error.response.data.message;
  //       console.log(err);
  //       var formError = true;
  //     }
  //   });
  //   },
  // });

class App extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      username:'',
      password:'',
      usernameError:false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let error = false;

    if (this.state.username === '') {
      this.setState({usernameError: true});
      error = true;
    } else {
      this.setState({usernameError: false});
    }

    if (error) {
      this.setState({formError: true});
      return;
    }
    this.setState({formError: false});
  }

  onInputChange = (newValue, valueToChange) => {
      if (valueToChange === "username") {
        this.state.username = newValue.target.value;
      }
      console.log("newest");
      console.log(valueToChange);
      console.log(this.state.username);
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">InstaMatch</header>
      <div className="splitScreen">
        <div className="topPane">
          <div className="small-header">Login</div>
          <Form 
          onSubmit={(event) => {this.handleSubmit(event);} } 
          error={this.state.formError}>
          {this.state.formError
          ?
          <Message
          error
          header="Username or Password was Incorrect."
          content="The Username or Password you entered was incorrect. Please try again."/> : null}
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
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="password"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
            />
          </div>
          <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="instagram_account"
                  icon="camera retro"
                  iconPosition="left"
                  placeholder="Instagram Account"
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
        </div>
      </div> 
    </div>
  );
  }
}

export default App;
