import React from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse } from '../helpers';

import './Survey.css';


// import other questionnaires the same way
import * as gh from '../../questionnaires/gh_feedback';
import * as cc1 from '../../questionnaires/cc1_feedback';
import * as cc2 from '../../questionnaires/cc2_feedback';
import * as cc3 from '../../questionnaires/cc3_feedback';
import * as app from '../../questionnaires/app_feedback';
import * as iq from '../../questionnaires/IQ';



const survey_names = [
'Goblin Heist',
'Cryptic Creatures Level 1',
'Cryptic Creatures Level 2',
'Cryptic Creatures Level 3',
'App feedback', // app 
'IQ' 
]

const iconnames = [
'goblinheist_icon.png',
'cc_level1.png', 
'cc_level2.png', 
'cc_level3.png', 
'appfeedback_icon.png', 
'iq_icon.png', 
]

var quizData = {
  gh: gh, 
  cc1: cc1,
  cc2: cc2,
  cc3: cc3,
  app: app,
  iq:  iq
}


class Survey extends React.Component {
  constructor(props){
    super(props);
    
    // Information about a specific block of the Survey: 
    const block_info = {
      surveytag    : this.props.location.state.participant_info.survey_list[0], // First questionnaire in the list 
      surveyname   : survey_names[0], // this.props.location.state.participant_info.survey_names[0],
      survey_names : survey_names, // this.props.location.state.participant_info.survey_names,
      iconnames    : iconnames // this.props.location.state.participant_info.iconnames, 
     }
    
    const n =  this.props.location.state.participant_info.survey_list.length-1;   

    const participant_info = {

      prolific_id           : this.props.location.state.participant_info.prolific_id, 
      participant_id        : this.props.location.state.participant_info.participant_id, 
      survey_list           : this.props.location.state.participant_info.survey_list, 
      TotalBlock            : n, 
      block_number_survey   : this.props.location.state.participant_info.block_number_survey, 
      date_time             : this.props.location.state.participant_info.date_time, 
      date                  : this.props.location.state.participant_info.date, 
      handle                : this.props.location.state.participant_info.handle,
      survey_list           : this.props.location.state.participant_info.survey_list, 
      survey_names          : survey_names, // this.props.location.state.participant_info.survey_names,
      iconnames             : iconnames, // this.props.location.state.participant_info.iconnames
           
  
    }

    
    this.state = {
      participant_info : participant_info,
      block_info       : block_info,
      newblock_frame   : this.props.location.state.newblock_frame,  
      questions        : quizData[participant_info.survey_list[0]].default, // quizData[this.props.location.state.participant_info.survey_list[0]].default,
      finished         : false,
    }

    
    this.getSurveyBlock.bind(this);
    this.redirectToQuiz.bind(this); 
    this.redirectToEnd.bind(this); 
    this._isMounted = false;
    this._handleGoBack.bind(this); 
    this._handleTimeOut.bind(this);  
 
  }

  redirectToQuiz () {
    if((this.props.location.state.participant_info.block_number_survey <= (this.state.participant_info.TotalBlock)))
      
          {           
          if (this.state.newblock_frame){ // TRUE
          this.setState({newblock_frame : false})

          
          this.props.history.push({
           pathname: `/QuizBlock`,
           state: {participant_info: this.state.participant_info,
                   block_info      : this.state.block_info,
                   questions       : this.state.questions,
                 }
          })}
          else // FALSE 
          {
            if (this._isMounted)
            {

              
              if (this.props.location.state.participant_info.block_number_survey===this.state.participant_info.TotalBlock){ // just finished the LAST BLOCK 
              
                // redirect to the final 
                this.setState({finished: true})

              } 
              else if (this.props.location.state.participant_info.block_number_survey<this.state.participant_info.TotalBlock){ 

              const newblocknumber = this.props.location.state.participant_info.block_number_survey + 1
              // console.log(newblocknumber)
              this.getSurveyBlock(newblocknumber,this.state.participant_info.survey_list,this.state.participant_info.survey_names)
              this.setState({newblock_frame: true, participant_info : {...this.state.participant_info, block_number_survey:newblocknumber},})

              }

            }
          }
        }
      }
    
  componentDidMount() { 
  this._isMounted = true;
  document.body.style.background= '#fff'; 
  // this._isMounted && this.getSurveyBlock(this.props.location.state.participant_info.block_number,this.props.location.state.participant_info.survey_list);
    window.history.pushState(window.state, null, window.location.href);
    window.addEventListener('popstate', e => this._handleGoBack(e));
    window.onbeforeunload = this._handleRefresh

  }

  componentWillUnmount() {
    clearTimeout(this._handleTimeOut);
    this._isMounted = false;
  }


  _handleRefresh(evt){
    return false // error message when refresh occurs
  }

  _handleGoBack(event){
    window.history.go(1);
  }

  _handleTimeOut() {
    console.log('Timeout:', this.state)
    setTimeout(() => {
     this.redirectToQuiz()
    }, 1000);
} 

 // Get info about the specific Survey Block: 
 getSurveyBlock(block_number_,survey_list_,survey_name_) {

    // console.log('Block Number Get Survey Block:',block_number_+1)

    const surveytag_block  = survey_list_[block_number_]
    const surveyname_block = survey_name_[block_number_]
    
    console.log('SurveyName Block:',surveyname_block)
 
    this.setState({ loading: true , questions: quizData[survey_list_[block_number_]].default, block_info : {...this.state.block_info, surveytag:surveytag_block, surveyname: surveyname_block}});

}

 redirectToEnd(){

    // Store the cashed data 

    let cashed_ = {}
    if (sessionStorage.hasOwnProperty('cashed')) {
        cashed_ = sessionStorage.getItem('cashed');

        try {
          cashed_ = JSON.parse(cashed_);
          // console.log('parsed cash',cashed_)
        } catch (e) {
          console.log('Cannot parse cashed')
        }
    }

    // Push cashed data to the DB
    var date_time_end = new Date().toLocaleString();

    let body_cashed = {
      'log'          : cashed_,  // this.state.cashed, 
      'date_time'    : this.state.participant_info.date_time, 
      'date_time_end': date_time_end, 
      'log_type'     : 'survey' 
    }

    console.log(body_cashed)

    fetch(`${API_URL}/attempts/save/`+ this.state.participant_info.participant_id + `/` + this.state.participant_info.prolific_id, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(body_cashed)
    })

      alert("You will now be redirected to the submission page. Please, confirm leaving the page. Thank you!")
      window.location = 'https://app.prolific.co/submissions/complete?cc=XXXXXX' // 
      // window.location = 'https://api-brainexp.osc-fr1.scalingo.io/exp?prolific_id='+this.state.participant_info.prolific_id + '&participant_id=' + this.state.participant_info.participant_id +'&handle=' + this.state.participant_info.handle 

  }
  
  
render()
  { 
    let text
    let icon_
    if ((this.state.block_info.surveytag === this.props.location.state.participant_info.survey_list[0]) && (this.state.newblock_frame))
    { 
      text = <div className='SurveyIntroText'> <p>Dear Participant,</p>
      <p>Please, now play the <span className="bold">Goblin Heist</span> game in the app.</p>
      <p>You should complete the game <span className="bold">just once to win 1 star</span>.</p>
      <p>But first, go through the tutorial carefully.</p>
      <p>Once done, click CONTINUE.</p></div>

    return (
      <div>
      <center> 
      <div className="SurveyButtonContainer">
        <div>
          {text}
        </div> 
        <div className="iconframe">    
          <img className="iconsymbol"  src={require('../../images/goblinheist_icon.png')} alt='iconsymbol'/> 
        </div>
        <center>
          <Button className="btn btn-save btn-primary pad-20 width=20vh height-8vh" onClick={()=>this.redirectToQuiz()}>
            <span className="bold">CONTINUE</span>
          </Button>
        </center>
      </div>
      </center> 
      </div>);
    } 

     else if ((this.state.block_info.surveytag !== this.props.location.state.participant_info.survey_list[0]) && (this.state.newblock_frame)) 
    { 
        return(<div>{this._handleTimeOut()}</div>);
      }

    else if (this.state.participant_info.block_number_survey === this.state.participant_info.TotalBlock && this.state.finished===true) 
    {
        text = <div className='SurveyIntroText'> <p><span className="bold">You completed the first part of the study!</span></p>
            <br></br>
            <p> Thank you for your help!</p>
            <br></br>
            <p>Please, confirm leaving the page if prompted by the browser. Thank you!</p></div>
      
      return (
          <div>
            <center> 
            <div className='SurveyIntroText'>
                {text}  
            </div>
            <div>
              <Button variant="secondary" color="danger" size="lg" className="buttonInstructionFinal" type="submit" id="validate" onClick={() => this.redirectToEnd()}>CONTINUE</Button>
            </div>
            </center>
            </div>
          );        
    }

    else if (this.state.block_info.survey_names[this.props.location.state.participant_info.block_number_survey+1]=='App feedback')
    {
      text  = 'Thank you! Please, now feel free to explore the app and then continue when you are ready.'
      icon_ = this.state.block_info.iconnames[this.props.location.state.participant_info.block_number_survey+1]  
        return (
          <div>
            <center> 
            <div className="SurveyButtonContainer">
            <div className='SurveyIntroText'>
              {text}
            </div> 
            <div className="iconframe">    
              <img className="iconsymbol" src={require(`../../images/${icon_}`)} alt='iconsymbol'/> 
            </div>
            <center>
            <Button className="btn btn-save btn-primary pad-20 width=20vh height-8vh" onClick={()=>this.redirectToQuiz()}>
              <span className="bold">CONTINUE</span>
            </Button>
            </center>
          </div>
        </center> 
        </div>);
    }        

    else if (this.state.block_info.survey_names[this.props.location.state.participant_info.block_number_survey+1]=='IQ')
    {
      text  = 'Thank you! We will now ask you to asnwer some questions about reasoning. You don"t need to use the app for this task.'
      icon_ = this.state.block_info.iconnames[this.props.location.state.participant_info.block_number_survey+1]  
        return (
          <div>
            <center> 
            <div className="SurveyButtonContainer">
            <div className='SurveyIntroText'>
              {text}
            </div> 
            <div className="iconframe">    
              <img className="iconsymbol" src={require(`../../images/${icon_}`)} alt='iconsymbol'/> 
            </div>
            <center>
            <Button className="btn btn-save btn-primary pad-20 width=20vh height-8vh" onClick={()=>this.redirectToQuiz()}>
              <span className="bold">CONTINUE</span>
            </Button>
            </center>
          </div>
        </center> 
        </div>);
    }        

         
    else if (this.props.location.state.participant_info.block_number_survey < this.state.participant_info.TotalBlock)
    {

          text  = 'Thank you! Please, go back to the app and explore the ' + this.state.block_info.survey_names[this.props.location.state.participant_info.block_number_survey+1] + ' planet now. Again, just complete the game ONCE.'
          icon_ = this.state.block_info.iconnames[this.props.location.state.participant_info.block_number_survey+1]  
        return (
          <div>
            <center> 
            <div className="SurveyButtonContainer">
            <div className='SurveyIntroText'>
              {text}
            </div> 
            <div className="iconframe">    
              <img className="iconsymbol" src={require(`../../images/${icon_}`)} alt='iconsymbol'/> 
            </div>
            <center>
            <Button className="btn btn-save btn-primary pad-20 width=20vh height-8vh" onClick={()=>this.redirectToQuiz()}>
              <span className="bold">CONTINUE</span>
            </Button>
            </center>
          </div>
        </center> 
        </div>);
    }

    else 
    {
      text = 'Thank you!'
        return (
      <div>
      <center>
      <div className="SurveyIntroText">
        {text}
      </div>
      <br></br>
      <center>
            <Button className="btn btn-save btn-primary pad-20 width=20vh height-8vh" onClick={()=> this.state.finished ? this.redirectToEnd() : this.redirectToQuiz()}>
              <span className="bold">CONTINUE</span>
            </Button>
            </center>
    </center>
    </div>);
    }        
  }

}

export default withRouter(Survey);