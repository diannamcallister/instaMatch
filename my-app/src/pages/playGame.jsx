import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Form,
  Icon,
  Message,
  Grid,
  Image
} from 'semantic-ui-react';
import '../App.css';
import axios from 'axios';
import Modal from 'react-modal';
import HelpInfo from './helpInfo';

class PlayGame extends React.Component {

    constructor(props) {
        super(props);
        this.displayPic = this.displayPic.bind(this);
        this.cardsMatch = this.cardsMatch.bind(this);
        this.wonGame = this.wonGame.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // var back_card = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png";
        var back_card = "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png";
        this.state = {
          modalIsOpen:false,
          image_urls: this.props.location.state.image_urls,
          position_cards_up: [],
          cur_pic: [[back_card, back_card, back_card, back_card], [back_card, back_card, back_card, back_card], 
          [back_card, back_card, back_card, back_card], [back_card, back_card, back_card, back_card]],
          num_matches: 0,
          num_cards_flipped: 0,
          has_won: false,
          start_time: new Date().getTime(),
          leaderboard_stats: {}
          }
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    cardsMatch() {
        let completed_card_url = "https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png"
        let back_card = "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png";

        if (this.state.position_cards_up.length === 2) {
            var position1 = this.state.position_cards_up[0];
            var position2 = this.state.position_cards_up[1];
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
                    this.wonGame();
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

    wonGame() {
        var leaderboard_stats = {
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

    displayPic(row, col) {
        let back_card = "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png";
        if (this.state.position_cards_up.length < 2 && this.state.cur_pic[row][col] === back_card) {
            // less than 2 cards are flipped, so we can flip another card to show an insta pic

            // save the position of the card that will get flipped
            let position = {
                row: row,
                col: col
            };
            var cards_up = this.state.position_cards_up;
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

    render() {
        return (
          <div className="App">
          <header className="App-header">
          <Link to="/">
            <Button animated
                    type='submit'
                    size="large"
                    style={{ background: '##ffff', color: 'grey', right:'5px', position: 'absolute'}}
                    >
                    <Button.Content visible> Logout</Button.Content>
                    <Button.Content hidden><Icon name='lock' /></Button.Content>
            </Button>
          </Link>
                {this.state.has_won ? <Redirect push to={{pathname:"/wonGame", state: this.state.leaderboard_stats}}/> : null}
          </header>
          <div className="half-padding-top">
          <Button animated
                        type='submit'
                        size="large"
                        style={{ background: '##ffff', color: 'grey', right:'600px', position: 'relative'}}
                        onClick={() => this.cardsMatch()}
                        >
                        <Button.Content visible> Hide Cards</Button.Content>
                        <Button.Content hidden><Icon name='eye slash' /></Button.Content>
            </Button>
            <Button animated
                        type='submit'
                        size="large"
                        style={{ background: '##ffff', color: 'grey', left:'600px'}}
                        onClick={() => this.setState({modalIsOpen:true})}
                        >
                        <Button.Content visible> Help</Button.Content>
                        <Button.Content hidden><Icon name='eye slash' /></Button.Content>
            </Button>
          <p style={{color:'black', fontSize:'25px'}}><b style={{color:"white"}}>Play the game! You're using images from the instagram account:</b> <b>{this.props.location.state.instagram_account}</b></p>
          <Grid columns={4} divided>
            {/* row 1 */}
            <Grid.Row>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(0, 0)}>
                        <Image className="photo" src={this.state.cur_pic[0][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(0, 1)}>
                        <Image className="photo" src={this.state.cur_pic[0][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(0, 2)}>
                        <Image className="photo" src={this.state.cur_pic[0][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(0, 3)}>
                        <Image className="photo" src={this.state.cur_pic[0][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

            {/* row 2 */}
            <Grid.Row>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(1, 0)}>
                        <Image className="photo" src={this.state.cur_pic[1][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(1, 1)}>
                        <Image className="photo" src={this.state.cur_pic[1][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(1, 2)}>
                        <Image className="photo" src={this.state.cur_pic[1][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(1, 3)}>
                        <Image className="photo" src={this.state.cur_pic[1][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

            {/* row 3 */}
            <Grid.Row>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(2, 0)}>
                        <Image className="photo" src={this.state.cur_pic[2][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(2, 1)}>
                        <Image className="photo" src={this.state.cur_pic[2][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(2, 2)}>
                        <Image className="photo" src={this.state.cur_pic[2][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(2, 3)}>
                        <Image className="photo" src={this.state.cur_pic[2][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

            {/* row 4 */}
            <Grid.Row>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(3, 0)}>
                        <Image className="photo" src={this.state.cur_pic[3][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(3, 1)}>
                        <Image className="photo" src={this.state.cur_pic[3][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(3, 2)}>
                        <Image className="photo" src={this.state.cur_pic[3][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button style={{ background: 'white'}} onClick={() => this.displayPic(3, 3)}>
                        <Image className="photo" src={this.state.cur_pic[3][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

          </Grid>
          </div>
          <Modal className='help-modal' isOpen={this.state.modalIsOpen} style={{overlay:{zIndex:1000}}} disableAutoFocus={true}>
              <HelpInfo closeModal={this.closeModal}/>
          </Modal>
          </div>
        )
    };
}

export default PlayGame;