import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
// import { CSSTransitionGroup } from 'react-transition-group';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // for newer version 

import Question from '../QuizQuestion/Question';


class HandleBox extends React.Component {

  constructor(props){
    super(props);

  this.state = {
    report: '',
    answer: '',
    answercheck: false,
    shouldBlockNavigation: false
  }
  
  // console.log(this.state) // initial states 

  this.handleSubmit       = this.handleSubmit.bind(this);  
  this.handleChangeReport = this.handleChangeReport.bind(this);
  this._handleRefresh     = this._handleRefresh.bind(this); 
}

componentDidMount() {
  this._isMounted = true;
  document.getElementById("create-course-form").reset();
  document.body.style.background= '#fff';   
  this.setState({
    report: '',
    answer: '',
    answercheck: false,
    shouldBlockNavigation: false}
    )
  window.history.pushState(window.state, null, window.location.href)
  window.onbeforeunload = null;
  window.addEventListener("keypress", e => this._handleRefresh(e));

}

_handleRefresh(e){
  if (e.key==='Enter') {
  console.log('enter e', e.srcElement);

  // console.log('value', e.target.value);

  var test = this.state.report
  // console.log('test',this.state.report)
    
  if ((test!=="") && (test!==null) && (test>parseInt(this.props.constraint[0].min)) && (test<parseInt(this.props.constraint[1].max))) 
  {
    this.setState({
    answercheck: true}
    );

    console.log(this.state.answercheck)
    // Send answers to the parent component
    document.getElementById("create-course-form").reset();
    let prev_report = this.state.report 
        this.setState({
          report: ''}
        )

        this.props.onAnswerSelected(this.state.report,this.props.currentInstructionText,e) 
  }
  else {
    e.preventDefault()
  }
 
  }
}

_handleGoBack(event){
    window.history.go(1);
  }

handleChangeReport(event) {

  var test = event.target.value

  // console.log(event.target.value)
     
  this.setState({
    report: event.target.value,
    answercheck: false 
    }
    );
  
  if ((test!=="") && (test!==null) && (test.length==6)) 
  {
    this.setState({
    answercheck: true}
    );
  }
  else {
    event.preventDefault()
  }

}
  handleSubmit(event) {
        console.log(event)
        event.preventDefault();
        let prev_report = this.state.report 
        this.setState({
          report: ''}
        )
        this.props.onAnswerSelected(this.state.report,event) // TO CHANGE 
        
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
      <div key={this.props.questionId}>
        <br></br>
        <div>
        <form id="create-course-form">
          <input value={this.state.report} onKeyDown={this._handleRefresh} onChange={this.handleChangeReport} name="report" id="report" className="form-control" placeholder="" type="text" inputMode="text" required />
        </form>
        </div>
      </div>
      <p></p>
      <div>
        <div>
          <button type="button" className="btn btn-save btn-primary pad-20 width=20vh height-8vh" disabled={!this.state.answercheck} onClick={this.handleSubmit}>Submit
          </button>
          </div>
      </div>
        </CSSTransitionGroup>
  );
}
}

HandleBox.propTypes = {
  answer: PropTypes.string.isRequired,
  // currentInstructionText: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  constraint: PropTypes.array.isRequired,

};

          
export default withRouter(HandleBox);