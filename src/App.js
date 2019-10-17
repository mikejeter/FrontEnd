import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Link} from 'react-router-dom';
import UserLogin from './components/Login.js';
import UserRegistration from './components/Registration.js'

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={UserLogin} />
      <Route exact path="/register" component={UserRegistration} />
    </div>
  );
}

export default App;
