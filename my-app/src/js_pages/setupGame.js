import axios from 'axios';

export function get_stats() {
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
          this.setState({modal_is_open: true});
      } else {
        this.setState({user_data: {username: this.props.location.state.username, time: 0}});
        this.setState({modal_is_open: true});
      }
    })
    .catch(error => {
      this.setState({user_data: {username: this.props.location.state.username, time: 0}});
    });
}

export function close_modal() {
    this.setState({modal_is_open: false});
}

export function handle_account_chosen(e) {
    e.preventDefault();

    axios.get(`http://localhost:8081/insta/${this.state.account_name}`)
    .then(res => {
      console.log("Instagram User Works");
      this.setState({image_urls: res.data});
      this.setState({game_begin: true});
    })
    .catch(error => {
      this.setState({game_begin: false});
      if (error.response.data.status === 400) {
        this.setState({account_form_error: true});
        console.log(error.response.data.message);
        this.setState({account_form_error_msg: error.response.data.message});
      } else {
        this.setState({account_form_error: true});
        this.setState({account_form_error_msg: "There was an issue trying to access the instagram account you chose Please try again later!"});
      }
    });
}

 export function on_input_change(newValue) {
    this.state.account_name = newValue.target.value;
    this.setState({account_name_error: false});
    this.setState({account_form_error: false})
}