import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import React from "react";
import {  BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { auth } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import Homefeed from './components/HomeFeed/Homefeed.js';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Router>
        { !user ? ( <Login/> ) : (
            <div>
              <Navbar/>
            <Switch>
              <Route path="/profile">
                <div>this is your profile</div>
              </Route>
              <Route path="/">
                <Homefeed/>
              </Route>
            </Switch>
          </div>
        )} 
        </Router>
        </div>
            
      
  );
}

export default App;
