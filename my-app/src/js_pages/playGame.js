import axios from 'axios';

export function close_modal() {
    this.setState({modalIsOpen: false});
}

export function cards_match() {
    const completed_card_url = "https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png"
    const back_card = "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png";

    if (this.state.position_cards_up.length === 2) {
        let position1 = this.state.position_cards_up[0];
        let position2 = this.state.position_cards_up[1];
        if (this.state.image_urls[position1.row][position1.col] === this.state.image_urls[position2.row][position2.col]) {
            // a pair has been found - need to mark them as found
            let new_cur_pic = this.state.cur_pic;
            new_cur_pic[position1.row][position1.col] = completed_card_url;
            new_cur_pic[position2.row][position2.col] = completed_card_url;
            this.setState({cur_pic: new_cur_pic});

            // as well as change the instagram pic to the matched card, so the user cannot change card back to insta pic
            let new_insta_pic = this.state.image_urls;
            new_insta_pic[position1.row][position1.col] = completed_card_url;
            new_insta_pic[position2.row][position2.col] = completed_card_url;
            this.setState({image_urls: new_insta_pic});

            // +1 matches found
            this.setState({num_matches: this.state.num_matches + 1});

            // if all matches are found, save score to leaderboard
            if (this.state.num_matches === 7) {
                this.won_game();
            }
        } else {
            // no pair was found - change back to back of card
            let new_cur_pic = this.state.cur_pic;
            new_cur_pic[position1.row][position1.col] = back_card;
            new_cur_pic[position2.row][position2.col] = back_card;
            this.setState({cur_pic: new_cur_pic});

        }
        // empty the urls of the cards that are facing up
        this.setState({position_cards_up: []});
    }
}

export function won_game() {
    let leaderboard_stats = {
        username: this.props.location.state.username,
        score: this.state.num_cards_flipped, 
        time: new Date().getTime() - this.state.start_time,
        instagram_account: this.props.location.state.instagram_account
    }

    this.setState({leaderboard_stats: leaderboard_stats});

    axios.post(`http://localhost:8081/leaderboard`, leaderboard_stats)
        .then(res => {
            console.log("Leaderboard entry updated");
            this.setState({has_won: true});
        })
        .catch(error => {
            console.log("Issue when trying to update the leaderboard");
    });
}

export function display_pic(row, col) {
    const back_card = "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png";
    if (this.state.position_cards_up.length < 2 && this.state.cur_pic[row][col] === back_card) {
        // less than 2 cards are flipped, so we can flip another card to show an insta pic

        // save the position of the card that will get flipped
        let position = {
            row: row,
            col: col
        };
        let cards_up = this.state.position_cards_up;
        cards_up.push(position);
        this.setState({position_cards_up: cards_up});

        // show instagram picture
        let new_cur_pic = this.state.cur_pic;
        new_cur_pic[row][col] = this.state.image_urls[row][col];
        this.setState({cur_pic: new_cur_pic});

        // +1 for the number of cards flipped
        this.setState({num_cards_flipped: this.state.num_cards_flipped + 1});
    }
}