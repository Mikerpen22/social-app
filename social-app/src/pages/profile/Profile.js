import React from 'react'
// import Feed from '../../components/feed/Feed'
// import Rightbar from '../../components/rightbar/Rightbar'
// import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import "./profile.css"
import { useState } from "react"
import { PhotoCamera } from '@material-ui/icons'


const Profile = (props) => {

    const [userInputEmail, setUserInputEmail] = useState("")
    const [userInputNumber, setUserInputNumber] = useState("")
    const [userInputZip, setUserInputZip] = useState("")
    const [userInputPassword, setUserInputPassword] = useState("")
    const [userInputConfirmPassword, setUserInputConfirmPassword] = useState("")
    const [statusMsg, setStatusMsg] = useState("")
    const [currentValue, setCurrentValue] = useState(["ms100@rice.edu", "123-789-456", "55688", "******", "******"])

    const inputEmailHandler = (e) => {    
        setUserInputEmail(e.target.value)
        
    }

    const inputNumberHandler = (e) => {
        setUserInputNumber(String(e.target.value))
    }

    const inputZipHandler = (e) => {
        setUserInputZip(String(e.target.value))
    }

    const inputPasswordHandler = (e) => {
        setUserInputPassword(String(e.target.value))
    }

    const inputPasswordConfirmHandler = (e) => {
        setUserInputConfirmPassword(String(e.target.value))
    }

    const inputChecker = (e) => {
        // Validate the input and update the fields if success
        let errorString = "";
        let fieldsChangedStr = "";
        let password_checked = false;
        let validated = true;
        if(userInputEmail !== ""){
            let reg_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
                if(userInputEmail.match(reg_email) == null){
                    errorString += "Please enter a valid email address\n";
                    setUserInputEmail("");
                    validated = false;
                }
                else{
                    fieldsChangedStr += ("Email Changed to "+ String(userInputEmail));
                    // updated_input[0] = "";
                }
        }
        if(userInputNumber !== ""){
            let reg_phone = /^[1-9]{3}-[0-9]{3}-[0-9]{4}$/;
                if(userInputNumber && userInputNumber.match(reg_phone) == null){
                    errorString += "Please enter a valid phone number\n";
                    setUserInputNumber("");
                    validated = false;
                }
                else{
                    fieldsChangedStr += ("Number Changed to "+ String(userInputNumber));
                    // updated_input[1] = "";
                }
        }
        if(userInputZip !== ""){
            let reg_zip = /^[0-9]{5}(?:-[0-9]{4})?$/;
                if(userInputZip && userInputZip.match(reg_zip) == null){
                    errorString += "Please enter a valid zip code\n";
                    setUserInputZip("");
                    validated = false;
                }
                else{
                    fieldsChangedStr += ("Zip code Changed to "+ String(userInputZip));
                    // updated_input[2] = "";
                }
        }
        if(userInputPassword !== ""){
            let reg_password = /^[\S]{6,}$/; 
                if(userInputPassword && userInputPassword.match(reg_password) == null){
                    errorString += "Please enter a valid password\n";
                    setUserInputPassword("");
                    validated = false;
                }
                else{
                    password_checked = true
                }
        }
        if(userInputConfirmPassword !== ""){
                if(userInputConfirmPassword && userInputConfirmPassword !== userInputPassword){
                    errorString += "Please make sure your password matches\n";
                    setUserInputConfirmPassword("")
                    setUserInputPassword("")
                    validated = false;
                }
                else{
                    fieldsChangedStr += ("Password Changed to "+ String(userInputConfirmPassword));
                    // updated_input[4] = "";
                }
        }

        // Pass checker -> set new state with these updated inputs
        if (validated) {
            console.log("pass profile update validation")
            // update user's updated information
            let updated_input = []
            if(userInputEmail === ""){updated_input[0] = currentValue[0]}
            else{updated_input[0] = userInputEmail}
            
            if(userInputNumber === ""){updated_input[1] = currentValue[1]}
            else{updated_input[1] = userInputNumber}

            if(userInputZip === ""){updated_input[2] = currentValue[2]}
            else{updated_input[2] = userInputZip}

            if(userInputPassword === ""){updated_input[3] = currentValue[3]}
            else{updated_input[3] = userInputPassword}

            if(userInputConfirmPassword === ""){updated_input[4] = currentValue[4]}
            else{updated_input[4] = userInputConfirmPassword}

            setCurrentValue(updated_input)
            setUserInputEmail("")
            setUserInputNumber("")
            setUserInputZip("")
            setUserInputPassword("")
            setUserInputConfirmPassword("")
            setStatusMsg(fieldsChangedStr)
            
        }
        else{
            setUserInputEmail("")
            setUserInputNumber("")
            setUserInputZip("")
            setUserInputPassword("")
            setUserInputConfirmPassword("")
            setCurrentValue(currentValue)
            setStatusMsg(errorString)
        }
        

    }

    return (
        <>
            <Topbar/>
            <div className="profileWrapper">
                <div className="profileTop">
                    <div className="profilePicSection">
                        <img className="profilePic "src="assets/profile_pic_1.jpg" alt="" />
                        <input className="uploadPicBtn" text="upload" type="file"/>
                    </div>
                    <span className="profileName">Mario</span>

                    <div class="profile-work">
                        <p className="profile-work-text">LINKS</p>
                        <a className="profile-work-link" href="https://github.com/Mikerpen22">Github</a>
                        <a className="profile-work-link" href="https://www.linkedin.com/in/mh-shih">Linkedin</a>
                    </div>
                </div>

                <div className="profileMain">
                    <div className="inputSection">
                        <span className="inputPrompt">User Name:</span>
                        <input className="displayNameInput inputBox" type="text" placeholder="Unable to change"/>
                        <span className="displayCurrentValue">Mario</span>
                    </div>

                    <div className="inputSection">
                        <span className="inputPrompt">Email Address:</span>
                        <input className="displayEmailInput inputBox" type="email" value={userInputEmail} onChange={inputEmailHandler} placeholder="x@z.ab"/>
                        <span className="displayCurrentValue">{currentValue[0]}</span>
                    </div>

                    <div className="inputSection">
                        <span className="inputPrompt">Tel:</span>
                        <input className="displayNumberInput inputBox" type="tel"  value={userInputNumber} onChange={inputNumberHandler} placeholder="123-123-1234"/>
                        <span className="displayCurrentValue">{currentValue[1]}</span>
                    </div>

                    <div className="inputSection">
                        <span className="inputPrompt">Zip code:</span>
                        <input className="displayZipInput inputBox" type="text" value={userInputZip} onChange={inputZipHandler} placeholder="77665"/>
                        <span className="displayCurrentValue">{currentValue[2]}</span>
                    </div>

                    <div className="inputSection">
                        <span className="inputPrompt">Password:</span>
                        <input className="displayPasswordInput inputBox" value={userInputPassword} onChange={inputPasswordHandler} type="password"/>
                        <span className="displayCurrentValue">{currentValue[3]}</span>
                    </div>

                    <div className="inputSection">
                        <span className="inputPrompt">Password confirmation:</span>
                        <input className="displayPasswordConfirmInput inputBox" value={userInputConfirmPassword} onChange={inputPasswordConfirmHandler} type="password"/>
                        <span className="displayCurrentValue">{currentValue[4]}</span>
                    </div>

                    <input className="profileUpdateButton "type="submit" value="Update" onClick={inputChecker}/>
                </div>
            </div>
            
            <div className="statusMsg">{statusMsg}</div>
        </>
    )
}

export default Profile
