import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // for newer version 


const consents = [
  {
    content: 'I have read the information above, and understand what the study involves',
    type: 'checkBox1',
  },
  {
    content: 'I consent to the processing of my personal information (e.g. User Id) for the purposes of this research study. I understand that such information will remain confidential and will be handled in accordance with all applicable data protection legislation and ethical standards in research. These data will only be accessible to the study team and individuals from the University and Funder who are responsible for monitoring and audits.',
    type: 'checkBox2',
  },
  {
    content: 'I consent to being re-contacted for the purposes of this research study.',
    type: 'checkBox3',
  },
  {
    type: 'checkBox4',
    content: 'I understand that my anonymised personal data can be shared with others for future research, shared in public databases and in scientific reports.',
  },

  {
    type: 'checkBox5',
    content: 'I understand that I am free to withdraw from this study at any time without giving a reason and this will not affect my future medical care or legal rights.',
  },
  {
    type: 'checkBox6',
    content: 'I understand the potential benefits and risks of participating, the support available to me should I become distressed during the research, and who to contact if I wish to lodge a complaint.',
  },
  {
    type: 'checkBox7',
    content: 'I understand the inclusion and exclusion criteria in the Information Sheet and as explained to me by the researcher.  I confirm that I do not fall under the exclusion criteria.',
},
  {
    type: 'checkBox8',
    content: 'I agree that the research project named above has been explained to me to my satisfaction and I agree to take part in this study.',
  },

    {
    type: 'checkBox9',
    content: 'I confirm to have ready a mobile phone or tablet connected to the internet to use throughout the entire sutdy.',
  },
];


var options = {}
  for (var key in consents) {
    options[consents[key].type] = false 
  }


class Consent_part2 extends Component {
  constructor(props) {
    super(props);

    const participant_info_ = this.props.location.state.participant_info
    console.log('Consent participant info',participant_info_)
  
    this.state = {
      checkboxes: options,
      participant_info: participant_info_,
      consents: consents 
    };



  this.handleSubmit        = this.handleSubmit.bind(this);  
  this.createCheckBox      = this.createCheckBox.bind(this);
  this.createCheckBoxes    = this.createCheckBoxes.bind(this)
  this.redirectToInfo      = this.redirectToInfo.bind(this); 
  
  }


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

  componentWillUnmount()
  {
   this._isMounted = false;
  }  


  _handleGoBack(event){
    window.history.go(1);
  }

  handleCheckboxChange(changeEvent,e) {
  // console.log('ChangeEvent',changeEvent)
  this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [changeEvent]: !prevState.checkboxes[changeEvent],
      }
    }));
}


redirectToInfo() {
   this.props.history.push({
     pathname: `/`, 
     state: {participant_info: this.state.participant_info} // the 'newblock_frame' variable is redundant but this simplifies the code
   })
 }


handleSubmit(event) {
        
        
        event.preventDefault();

        // Check if all of the boxes are checked -> redirect to Survey, otherwise POP--UP window: do you want to leave the study?  
        const options   = this.state.checkboxes
        // const answers   = this.state.answers
        const box_total = Object.keys(options).length

        const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
        const count     = sumValues(this.state.checkboxes);
        // console.log('Number of checked boxes:',count)
        
        // sub select only answer options that have been checked 
        if (count < box_total){ // at least one box is checked
            const r = window.confirm("You cannot proceed to the study unless you give your full consent. Please, confirm if you decide to leave the study now"); if(r === true){ window.location.href="https://app.prolific.co"}
        }

        else if (count===box_total) {
          
          console.log('Participant ID:',this.state.participant_info.participant_id)
          alert("You will now be redirected to the game page. Please, confirm leaving the page. Thank you!")
          window.location = 'https://api-brainexp.osc-fr1.scalingo.io/exp?prolific_id='+this.state.participant_info.prolific_id + '&participant_id=' + this.state.participant_info.participant_id + '&handle=undefined'

          // redirect to the Instructions for the task here 
          // this.props.history.push({
          //   pathname: `/Instructions`, 
          //   state: {participant_info: this.state.participant_info}
          // })
        }

        else {

        }
      }



createCheckBox(key) {
  return (
      <Checkbox
        label           ={key.content}
        type            ={key.type}
        isSelected      ={options[key]}
        onCheckboxChange={(e)=>this.handleCheckboxChange(key.type,e)}
      />
    );
  }


createCheckBoxes(){
  consents.map(
  this.createCheckBox); // take an object, iterate over and for each key value pair in this object apply the function createCheckBox
}

  render() {
    return (
    <CSSTransitionGroup
      className="container"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div className="IntroConsentText">
          <p>If you are happy to proceed please read the statement below and click the boxes to show that you consent to this study proceeding.</p>
          <br></br>
          {consents.map(this.createCheckBox)} 
        </div>
      
      <p></p>
      <div className="col-md-12 pad-20">
        <div>
          <button type="button" className="btn btn-save btn-primary pad-20" onClick={this.redirectToInfo}>
            Previous
          </button>
          </div>
      </div>
      <p></p>
      <center>
      <div className="col-md-12 pad-20">
        <div>
          <button type="button" className="btn btn-save btn-primary pad-20" onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </div>
        <p></p>
          </div>
      </center>

    </CSSTransitionGroup>
  );
  }


}


export default withRouter(Consent_part2);
