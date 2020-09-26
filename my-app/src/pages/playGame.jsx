import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {
  Button,
  Icon,
  Grid,
  Image
} from 'semantic-ui-react';
import '../css/playGame.css';
import Modal from 'react-modal';
import HelpInfo from './helpInfo';
import { close_modal, cards_match, won_game, display_pic } from '../js_pages/playGame.js';

class PlayGame extends React.Component {

    constructor(props) {
        super(props);
        this.display_pic = display_pic.bind(this);
        this.cards_match = cards_match.bind(this);
        this.won_game = won_game.bind(this);
        this.close_modal = close_modal.bind(this);
        let back_card = "https://cdn.freelogovectors.net/wp-content/uploads/2016/12/instagram-logo1.png";
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

    render() {
        return (
          <div className="App">
          <header className="App-header">
          <Link to="/">
            <Button animated
                    type='submit'
                    size="large"
                    className="right-side-button"
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
                        className="hide-button"
                        onClick={() => this.cards_match()}
                        >
                        <Button.Content visible> Hide Cards</Button.Content>
                        <Button.Content hidden><Icon name='eye slash' /></Button.Content>
            </Button>
            <Button animated
                        type='submit'
                        size="large"
                        className="right-side-button"
                        onClick={() => this.setState({modalIsOpen:true})}
                        >
                        <Button.Content visible> Help</Button.Content>
                        <Button.Content hidden><Icon name='eye slash' /></Button.Content>
            </Button>
          <p><b>Play the game! You're using images from the instagram account:</b> <b className="black-font">{this.props.location.state.instagram_account}</b></p>
          <Grid columns={4} divided>
            {/* row 1 */}
            <Grid.Row>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(0, 0)}>
                        <Image className="photo" src={this.state.cur_pic[0][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(0, 1)}>
                        <Image className="photo" src={this.state.cur_pic[0][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(0, 2)}>
                        <Image className="photo" src={this.state.cur_pic[0][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(0, 3)}>
                        <Image className="photo" src={this.state.cur_pic[0][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

            {/* row 2 */}
            <Grid.Row>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(1, 0)}>
                        <Image className="photo" src={this.state.cur_pic[1][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(1, 1)}>
                        <Image className="photo" src={this.state.cur_pic[1][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(1, 2)}>
                        <Image className="photo" src={this.state.cur_pic[1][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(1, 3)}>
                        <Image className="photo" src={this.state.cur_pic[1][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

            {/* row 3 */}
            <Grid.Row>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(2, 0)}>
                        <Image className="photo" src={this.state.cur_pic[2][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(2, 1)}>
                        <Image className="photo" src={this.state.cur_pic[2][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(2, 2)}>
                        <Image className="photo" src={this.state.cur_pic[2][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(2, 3)}>
                        <Image className="photo" src={this.state.cur_pic[2][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

            {/* row 4 */}
            <Grid.Row>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(3, 0)}>
                        <Image className="photo" src={this.state.cur_pic[3][0].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(3, 1)}>
                        <Image className="photo" src={this.state.cur_pic[3][1].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(3, 2)}>
                        <Image className="photo" src={this.state.cur_pic[3][2].replace('"','')} />
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button className="pic-button" onClick={() => this.display_pic(3, 3)}>
                        <Image className="photo" src={this.state.cur_pic[3][3].replace('"','')} />
                    </Button>
                </Grid.Column>
            </Grid.Row>

          </Grid>
          </div>
          <Modal className='help-modal' isOpen={this.state.modalIsOpen} style={{overlay:{zIndex:1000}}} disableAutoFocus={true}>
              <HelpInfo close_modal={this.close_modal}/>
          </Modal>
          </div>
        )
    };
}

export default PlayGame;