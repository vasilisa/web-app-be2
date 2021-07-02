import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // check if it is needed here 
import './index.css';

import Intro_part2 from "./components/Intro/Intro_part2";
import Consent_part2 from "./components/Consent/Consent_part2";
// import Instructions from "./components/Instructions/Instructions";
// import Survey from "./components/Survey/Survey";
// import QuizBlock from "./components/QuizBlock/QuizBlock";

import * as serviceWorker from './serviceWorker';


const RefreshRoute = ({ component: Component, isDataAvailable, ...rest }) => (    
  <Route
    {...rest}
    render={props =>
       (props.location.state!==undefined) ? ( // if props location state is defined return page, else return to intro
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/Intro_part2"
          }}
        />
      )
    }
  />
);


const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Intro_part2} exact />
                <Route path="/Consent_part2" component={Consent_part2} exact />
            </Switch>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

