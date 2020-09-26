import axios from 'axios';

export function handle_signup(e) {
    e.preventDefault();

    let user = {};

    let error = false;
    // check if one of the fields was not entered
    if (this.state.signup_username === '') {
      this.setState({signup_username_error: true});
      error = true;
    } else {
      this.setState({signup_username_error: false});
      user.username = this.state.signup_username;
    }
    if (this.state.signup_password === '') {
      this.setState({signup_password_error: true});
      error = true;
    } else {
      this.setState({signup_password_error: false});
      user.password = this.state.signup_password;
    }
    if (error) {
      this.setState({signup_form_error: true});
      return;
    }

    // if we got here, all fields have been entered; check if user creation works correctly.
    user.instagram_account = this.state.instagram_account;
    axios.post(`http://localhost:8081/user`, user)
    .then(res => {
      console.log("User Created");
      this.setState({signup_worked: true});
    })
    .catch(error => {
      if (error.response.data.status === 400) {
        this.setState({signup_form_error: true});
        this.setState({signup_form_error_msg: error.response.data.message});
      } else {
        this.setState({signup_form_error: true});
        this.setState({signup_form_error_msg: "There was an issue trying to create an account for you. Please try again later!"});
      }
    });
}

export function handle_login(e) {
    e.preventDefault();

    let error = false;
    // check if one of the fields was not entered
    if (this.state.login_username === '') {
        this.setState({login_username_error: true});
        error = true;
    } else {
        this.setState({login_username_error: false});
    }
    if (this.state.login_password === '') {
        this.setState({login_password_error: true});
        error = true;
    } else {
        this.setState({login_password_error: false});
    }
    if (error) {
        this.setState({login_form_error: true});
        return;
    }

    // if we got here, all fields have been entered; check if user entry works correctly.
    axios.get(`http://localhost:8081/user/${this.state.login_username}/${this.state.login_password}`)
    .then(res => {
        console.log("User Logged In");
        this.setState({login_worked: true});
    })
    .catch(error => {
        this.setState({login_worked: false});
        if (error.response.data.status === 400) {
        this.setState({login_form_error: true});
        this.setState({login_form_error_msg: error.response.data.message});
        } else {
        this.setState({login_form_error: true});
        this.setState({login_form_error_msg: "There was an issue trying to access your account. Please try again later!"});
        }
    });
}

export function on_input_change(new_value, value_to_change) {
    if (value_to_change === "login_username") {
    this.state.login_username = new_value.target.value;
    this.setState({login_username_error: false});
    this.setState({login_form_error: false});
    } else if (value_to_change === "login_password") {
    this.state.login_password = new_value.target.value;
    this.setState({login_password_error: false});
    this.setState({login_form_error: false});
    } else if (value_to_change === "signup_username") {
    this.state.signup_username = new_value.target.value;
    this.setState({signup_username_error: false});
    this.setState({signup_form_error: false});
    } else if (value_to_change === "signup_password") {
    this.state.signup_password = new_value.target.value;
    this.setState({signup_password_error: false});
    this.setState({signup_form_error: false});
    } else if (value_to_change === "instagram_account") {
    this.state.instagram_account = new_value.target.value;
    }
}