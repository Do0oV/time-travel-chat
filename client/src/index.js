import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';
import Container from 'react-bootstrap/Container';

ReactDOM.render(
  <Container fluid="true">
    <App className="App" />
  </Container>
  , document.getElementById('root'));

serviceWorker.unregister();
