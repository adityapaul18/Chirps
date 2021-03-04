import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import React, { useState } from "react";
import {  BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

function App() {
    const user = useState(null);
  return (
    <div className="App">
      <Router>
        { user ? ( <Login/> ) : (
            <div>
            <Switch>
              <Route path="/profile">
                <div>this is your profile</div>
              </Route>
              <Route path="/">
              <Navbar/>
              </Route>
            </Switch>
          </div>
        )} 
        </Router>
        </div>
            
      
  );
}

export default App;
