import React from 'react';
import {withRouter} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { API_URL } from '../../config';
import { handleResponse } from '../helpers';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // for newer version 


import HandleBox from '../FreeReport/HandleBox';

import './InstructionsGame.css';


/*
Instruction component is created when the particpant accepts terms and conditions and proceeds to the experiment. 
It loads the participant id 
*/

class InstructionsGame extends React.Component {
    constructor(props) {
        super(props);


        const participant_info = this.props.location.state.participant_info
  
        const participant_id   = participant_info.participant_id

        
        const handle   = participant_info.handle


        this.state = {
            prolific_id : participant_info.prolific_id,    
            participant_id : participant_id,
            handle: handle, 
            date_time: participant_info.date_time, 
            block_number_survey: participant_info.block_number_survey, // not sure it should go here ! 
            // survey_list: participant_info.survey_list,
            // survey_names: participant_info.survey_names,
            iconnames: participant_info.iconnames,   
            currentInstructionText: 1,
            newblock_frame : true, 
            readyToProceed: false,
            redirect: false,
            readyToValidate: false, 
            answer: '',
            handle: '', 
            handleconstraint: [50], 
        }

    this.handleInstructionsLocal = this.handleInstructionsLocal.bind(this) // bind the method to avoid error on frames collapsed
    this.handleSubmit            = this.handleSubmit.bind(this);// this.fetchParticipantInfo.bind(this); 
    }; 

    // Mount the component to call the BACKEND and GET the information
    

componentDidMount() {  
  this._isMounted = true;
  document.body.style.background= '#fff';   
  window.history.pushState(window.state, null, window.location.href);
  window.addEventListener('popstate', e => this._handleGoBack(e));
  window.onbeforeunload = this._handleRefresh
  }

  _handleRefresh(evt){
    return ""   // false error message when refresh occurs
  }

  _handleGoBack(event){
    window.history.go(1);
  }

  componentWillUnmount()
  {
   this._isMounted = false;
  }  

    
    // Transition between the instruction screens   
    handleInstructionsLocal(event){
        var curText     = this.state.currentInstructionText;
        var whichButton = event.currentTarget.id;
    
        if(whichButton==="left" && curText > 1){
        this.setState({currentInstructionText: curText-1});
        }
        else if(whichButton==="right" && curText < 6){
      
        this.setState({currentInstructionText: curText+1});
        }

        if(whichButton==="right" && curText === 1){
        this.setState({readyToValidate: true});
        }

        if(whichButton==="left" && curText === 2){
        this.setState({readyToValidate: false});
        }

        if(whichButton==="right" && curText === 4){
        this.setState({readyToProceed: true});
        }

        if (whichButton=="left" && curText==4){
            this.setState({
                readyToProceed: false})
        }

        if (whichButton=="left" && curText==5){
            this.setState({
                readyToProceed: false})
        }

    
    }

    // change the router type to pass the props to the child component 
    redirectToTarget = () => {

    this.props.history.push({
       pathname: `/Survey`,  
       state: {participant_info: this.state, newblock_frame:this.state.newblock_frame} 
     })
    }

    handleSubmit(answerContent,event){
        console.log('Handle retrieved',answerContent)

        
        // Register the handle in the DB here 

        let body     = {    'participant_id'  : this.state.participant_id, 
                            'prolific_id'     : this.state.prolific_id, 
                            'date_time'       : this.state.date_time, 
                            'handle'          : answerContent
                          }

    fetch(`${API_URL}/config_data/create/` + this.state.participant_id + `/` + this.state.prolific_id, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },    
       body: JSON.stringify(body)
     })
  
 
        // Redirect to the third screen 
        var curText     = this.state.currentInstructionText;
        this.setState({currentInstructionText: curText+1,
            // readyToProceed: true,
            readyToValidate: false,
            handle: answerContent})
    
    }


    render() {
        let mytext
        if (this.state.currentInstructionText===1) {
            mytext = <div className='textbox'> <p></p><p>
            Thank you for completing the first part of the study! We will now ask you to play a game in which you fly spaceships to different planets to get space treasure.
            This game is similar to the Goblin heist game you have played today. But we kindly ask you to stay focused and perform at your best to win a bonus.</p>
            </div>;
        }

        else if (this.state.currentInstructionText===2) {
        mytext = <div className='textbox'> <p></p> <p>Please read all following instructions very carefully.</p>
        <p>it takes some time, but otherwise you will not know what to do.</p>
                </div>
            }

    
        else if (this.state.currentInstructionText===3) {
            mytext = <div className='textbox'> <p></p> <p> In this game, you will be taking a spaceship from earth to look for space treasure on two different plantes.</p>
                <div className="symbolframe">    
                    <img className="introsymbol"  src={require('../../images/participate_screen.png')} alt='introsymbol'/> 
                    <img className="introsymbol"  src={require('../../images/symbol_shape_0_grate_None_color_3.png')} alt='introsymbol'/> 
                    <img className="introsymbol"  src={require('../../images/symbol_shape_2_grate_None_color_0.png')} alt='introsymbol'/> 


                </div>
            </div>
        }

        else if (this.state.currentInstructionText===4){
        mytext = <div className='textbox'> <p></p> <p>Finally,return to the <span className="bold">Profile</span> page by clicking on the arrow at the top left corner of the screen.</p>
                <p>Click on the icon <span className="bold">Enrol in the study</span> and enter "betest" when prompted for the study handle.</p>
                <div className="translate"/>
                <div className="symbolframe">    
                    <img className="introsymbol2"  src={require('../../images/enrol_screen.png')} alt='introsymbol2'/> 
                </div>
                </div>
        }

        else if (this.state.currentInstructionText===5){
        mytext = <div className='textbox'> <p></p> <p>You are all set!</p>
                <p>You can now begin playing the games</p>
                </div>

        }

        

        return (
            <CSSTransitionGroup
            className="container"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}>
            <div className="center translate">
            <div className="InstructText">
            <center> 
            <p className='title'><span className="bold">INSTRUCTIONS</span></p>
            </center>
                <center> 
                <div className="instructionsButtonContainer">

                    {this.state.currentInstructionText == 1 ? // id helps get which button was clicked to handle the 
                        <Button id="right" className="buttonInstructions" onClick={this.handleInstructionsLocal}> 
                            <span className="bold">&#8594;</span>
                        </Button>
                        :
                        null
                    }

                    {this.state.currentInstructionText == 2 ?
                        <Button id="left" className="buttonInstructionsHidden" onClick={this.handleInstructionsLocal}>
                            <span className="bold">&#8592;</span>
                        </Button>
                        :
                        null
                    }

                    {this.state.currentInstructionText == 3 ?
                        <div>
                        <Button id="left" className="buttonInstructionsHidden" onClick={this.handleInstructionsLocal}>
                            <span className="bold">&#8592;</span>
                        </Button>
                        <Button id="right" className="buttonInstructions" onClick={this.handleInstructionsLocal}> 
                            <span className="bold">&#8594;</span>
                        </Button>
                        </div>

                        :
                        null
                    }

                    {this.state.currentInstructionText == 4 ?
                        <div>
                        <Button id="left" className="buttonInstructionsHidden" onClick={this.handleInstructionsLocal}>
                            <span className="bold">&#8592;</span>
                        </Button>
                        <Button id="right" className="buttonInstructions" onClick={this.handleInstructionsLocal}> 
                            <span className="bold">&#8594;</span>
                        </Button>
                        </div>

                        :
                        null
                    }

                    {this.state.currentInstructionText == 5 ?
                        <Button id="left" className="buttonInstructionsHidden" onClick={this.handleInstructionsLocal}>
                            <span className="bold">&#8592;</span>
                        </Button>
                        :
                        null
                    }


                    <div>
                        {mytext}
                    </div>
                    {this.state.readyToProceed ?
                    <div className="buttonInstruction">
                    <center>
                        <label className='textbox'> When you are ready, press START</label><br/>
                        <Button className="buttonInstructionStart" onClick={()=>this.redirectToTarget()}>
                            <span className="bold">START</span>
                        </Button>
                    </center>
                    
                    </div>
                    : null}

                    {this.state.readyToValidate ?

                    <div>
                        <HandleBox
                            answer                 ={this.state.answer}
                            currentInstructionText ={this.state.currentInstructionText}
                            onAnswerSelected       ={this.handleSubmit}
                            constraint             ={this.state.handleconstraint}

                        />
                    </div>
                    : null}

            </div>
        </center>
        </div>
        </div>
        </CSSTransitionGroup>
        ) 
    }
}

export default withRouter(Instructions);
