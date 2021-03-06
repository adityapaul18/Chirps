import React from "react";
import './App.css';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { auth } from './Firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import Homefeed from './components/HomeFeed/Homefeed.js';
import Inputpage from './components/Inputpage/Inputpage';
import Profilepage from './components/Profilepage/Profilepage';
import Otherprofile from './components/Otherprofile/Otherprofile';


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
                <div className="addpage">
                    <div className="inputbox">
                         <Inputpage/>
                    </div>
                </div>
              </Route>
              <Route path="/profile">
                <Profilepage/>
              </Route>
              <Route path="/userprofiles">
                <Otherprofile/>
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
