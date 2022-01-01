import "./login.css"
import { useState, useEffect } from "react"
import React from 'react'
import { useHistory } from "react-router-dom"


const Login = (props) => {
    const [UsersCredentials, setUsersCredentials] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // Fetch users username and password from dummy server
    useEffect(() => {
        const getUsersCredentials = async () => {
            const serverUsersCredentials = await fetchUsersCrendentials()
            setUsersCredentials(serverUsersCredentials)
            // console.log(UsersCredentials)
        }
        getUsersCredentials()
    }, [])
    const fetchUsersCrendentials = async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        return data
    }


    const history = useHistory()
    const [username, setUserName] = useState([])
    const [userPassword, setUserPassword] = useState([])
    
    const handleUserMailInput = (e) => {
        setUserName(e.target.value)
    }
    const handleUserPasswordInput = (e) => {
        setUserPassword(e.target.value)
    }
    const loginChecker = () => {
        // Perform check on user's input username & password
        let userCredentialsUsername = [];
        let userCredentialsPassword = [];
        userCredentialsUsername = UsersCredentials.map( userObj => userObj.username );
        userCredentialsPassword = UsersCredentials.map( userObj => userObj.address.street);
        if (userCredentialsUsername.includes(username)){
            if(userCredentialsPassword.includes(userPassword)){
                // Success then:
                // 1. Set currUser global state passed from App.js -> currUser will be set with his/her userID
                let currUserID = 0;
                for(var i = 0; i < UsersCredentials.length; i++){
                    if(UsersCredentials[i].username == username){
                        currUserID = UsersCredentials[i].id;
                    }
                }
                props.updateCurrUser(currUserID)
                console.log(`user ${currUserID} logged in`)
                localStorage.setItem("currUser", currUserID)
                setIsLoggedIn(true)
                // 2. route to homepage
                let path = "/home";
                history.push(path);
            }
            else{
                window.alert("wrong password!")
                setUserPassword("")
            }
        }
        else{
            window.alert("wrong username or password!")
            setUserName("")
            setUserPassword("")
        }
    }

    const registerHandler = () => {
        // Update my UsersCredentials state
        let newUserCredential = {
            "username": username,
            "password": userPassword
        }
        let newUserCredentials = [...UsersCredentials, newUserCredential];
        setUsersCredentials(newUserCredentials);

        // Set current user so we can later choose which posts to display for this user
        let newUserId = 100 * UsersCredentials.length;
        props.updateCurrUser(newUserId);

        // Route to homepage after registration
        let path = "/home";
        history.push(path);
    }
    
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Appie</h3>
                    <span className="loginDesc">Please sign in or sign up.</span>
                </div>
                    
                <div className="loginRight"></div>
                    <div className="loginBox">
                        <input id="input1" type="email" name='usernameInput' value={username} onChange={handleUserMailInput} placeholder="Username" className="loginInput"/>
                        <input id="input2" type="Password" name='pwdInput' value={userPassword} onChange={handleUserPasswordInput} placeholder="Password" className="loginInput"/>
                        <button data-testid="testBtn1" id="loginBtn" className="loginBtn" onClick={loginChecker}>Log in</button>

                        <input id="input1" type="email" name='usernameInput' value={username} onChange={handleUserMailInput} placeholder="Username" className="loginInput"/>
                        <input id="input2" type="Password" name='pwdInput' value={userPassword} onChange={handleUserPasswordInput} placeholder="Password" className="loginInput"/>
                        <button id='registerBtn' className="loginRegisterBtn" onClick={registerHandler}>Sign up?</button>
                    </div>
            </div>
        </div>
    )
}

export default Login
// export const validateLogin