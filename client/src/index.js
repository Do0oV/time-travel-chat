import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import Container from 'react-bootstrap/Container';
//import {GoogleAPI} from 'react-google-oauth'

ReactDOM.render(
  <Container fluid="true">
    <App className="App" />
  </Container>
  , document.getElementById('root'));
/*ReactDOM.render(
  <GoogleAPI clientId="YOUR CLIENT ID"
            onUpdateSigninStatus={Function}
            onInitFailure={Function} >
    <App />
  </GoogleAPI>, document.getElementById('root'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
