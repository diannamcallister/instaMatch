import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Icon,
  Message
} from 'semantic-ui-react'
import '../css/setupGame.css';
import Modal from 'react-modal';
import UserDetails from './userStats';
import { get_stats, close_modal, handle_account_chosen, on_input_change } from '../js_pages/setupGame.js';


class SetupGame extends React.Component {

  constructor() {
    super();
    this.handle_account_chosen = handle_account_chosen.bind(this);
    this.on_input_change = on_input_change.bind(this);
    this.get_stats = get_stats.bind(this);
    this.close_modal = close_modal.bind(this);
    this.state = {
      account_name:'',
      account_name_error:false,
      results:false,
      user_data:{},
      image_urls:[],
      modal_is_open:false
    }
  }

  render() {
    return (
      <div className="App-height">
      <header className="App-header">
      <Link to="/">
        <Button animated
                type='submit'
                size="large"
                className="right-side-button"
                >
                <Button.Content visible> Logout</Button.Content>
                <Button.Content hidden><Icon name='lock' /></Button.Content>
                {this.state.results ? <Redirect push to={{pathname: "/user", state: {user_data: this.state.user_data}}} /> : null}
        </Button>
        </Link>
        <div className="half-padding-top">
        <Button animated
                type='submit'
                size="large"
                className="right-side-button"
                onClick={this.get_stats}
                >
                <Button.Content visible> Your Statistics</Button.Content>
                <Button.Content hidden><Icon name='id card' /></Button.Content>
                {this.state.results ? <Redirect push to={{pathname: "/user", state: {user_data: this.state.user_data}}} /> : null}
        </Button>
        </div>
      </header>
      <div className="paddingTop">
      <h3>Enter the name of an Instagram Account you want to use the images of to play a game.</h3>
      <Form
          className="username-form"
          onSubmit={(event) => {this.handle_account_chosen(event);} } 
          error={this.state.account_form_error}>
          {this.state.account_form_error
          ?
          <Message
          error
          header="The Instagram Account Chosen Cannot be Used in the Game."
          content={this.state.account_form_error_msg}/> : null}
          {this.state.game_begin ? <Redirect push to={{pathname:"/playGame", state:{image_urls: this.state.image_urls, instagram_account: 
                                                      this.state.account_name, username: this.props.location.state.username}}}/> : null}
            <div className="bottomSpace">
            <Form.Input
                  type="text"
                  name="username"
                  icon="search"
                  iconPosition="left"
                  placeholder="Username"
                  onChange={(value) => {this.on_input_change(value)}}
                  error={this.state.account_name_error}
            />
          </div>
          <Button animated
              type='submit'
              size="large"
              className='button-centered'
              >
              <Button.Content visible> Start Game</Button.Content>
              <Button.Content hidden><Icon name='play' /></Button.Content>
          </Button>
          </Form>
          </div>
          <Modal className='stats-modal' isOpen={this.state.modal_is_open} style={{overlay:{zIndex:1000}}} disableAutoFocus={true}>
              <UserDetails user_data={this.state.user_data} close_modal={this.close_modal}/>
          </Modal>
      </div>
    );
  }
};

export default SetupGame;