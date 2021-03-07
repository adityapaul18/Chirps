import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import React from "react";
import {  BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import { auth } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import Homefeed from './components/HomeFeed/Homefeed.js';
import Inputpage from './components/Inputpage/Inputpage';
import Profilepage from './components/Profilepage/Profilepage';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Router>
        { !user ? ( <Login/> ) : (
            <div>
              <Navbar/>
            <Switch>
              <Route path="/chirp">
                <Inputpage />
              </Route>
              <Route path="/profile">
                <Profilepage/>
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
