import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useState } from 'react'


function App() {

  let currUserFromLocalStore = 0
  if(localStorage.getItem("currUser")){
    currUserFromLocalStore = localStorage.getItem("currUser")
  }

  const [currUser, setCurrUser] = useState(parseInt(currUserFromLocalStore))  // Pass it to Login, Home, Profile so I know which user is logged in now

  const updateCurrUser = (userID) => {
    console.log(`I'm at App.js setting localStorage for userID ${userID}`)
    console.log(localStorage)
    localStorage.setItem("currUser", userID)
    setCurrUser(userID)
  }

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login currUser={currUser} updateCurrUser={updateCurrUser}/>
          </Route>
          <Route exact path="/home">
            <Home currUser={currUser} updateCurrUser={updateCurrUser}/>
          </Route>
          <Route exact path="/profile">
            <Profile currUser={currUser} updateCurrUser={updateCurrUser}/>
          </Route>
        </Switch>
    </Router>

  );
}

export default App;
