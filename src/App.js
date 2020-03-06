import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './components/signupForm/signupForm';
import LoginPage from './components/loginPage/loginPage';
//simport Login from './components/login'
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path = "/" exact component = {SignupForm} />
        <Route path = "/loginPage" component = {LoginPage}/>
      </Router>
    </div>
  );
}

export default App;
