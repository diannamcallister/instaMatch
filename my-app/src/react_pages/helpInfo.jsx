import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Button } from 'semantic-ui-react'
import '../App.css';

class HelpInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
              <Button animated
                      type='submit'
                      size="large"
                      className="exit-button"
                      onClick={this.props.close_modal}
                      >
                      <Button.Content visible> X</Button.Content>
              </Button>
            </header>
            <h2>How to Play InstaMatch</h2>

            <p style={{color:'black', fontSize:'22px'}}>InstaMatch is a matching game, using pictures from a public instagram account.</p>
            <p style={{color:'black', fontSize:'20px'}}><b>Goal:</b></p>
            <p style={{color:'black', fontSize:'20px'}}>To find all of the pairs of images.</p>
            <p style={{color:'black', fontSize:'20px'}}><b>To play:</b></p>
            <p style={{color:'black', fontSize:'20px', textAlign:'left', paddingLeft:'10px'}}><b>1.</b>Click on two of the cards you think could be the same picture.</p>
            <p style={{color:'black', fontSize:'20px', textAlign:'left', paddingLeft:'10px'}}><b>2.</b>After taking a look at the pictures, whether they match or not,
            click the <b>Hide Cards</b> button on the right side. If they were the same picture, they will be marked as a pair.</p>
            <p style={{color:'black', fontSize:'20px'}}>Keep playing until you are able to get all of the pairs correct!</p>
            <p style={{color:'black', fontSize:'20px'}}>Your score is based off of the number of cards you had to look at to get
            all the correct pairs; so the lower the score, the better!</p>
            <h2>Good luck, happy matching!</h2>
            </div>
        );
    }
}

export default HelpInfo;