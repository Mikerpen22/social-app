import React from 'react'
import "./common.css"
import { Photo } from "@material-ui/icons"
import { Backspace } from '@material-ui/icons'
import { Publish } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { useState, useEffect } from "react"


const Common = ({posts, addToPosts}) => {
    let userStatusStr = "";
    if (localStorage.getItem("userStatus")){
        userStatusStr = localStorage.getItem("userStatus");
    }

    const [postText, setPostText] = useState([""])
    const [userStatus, setUserStatus] = useState(userStatusStr)
    const [tempUserStatus, setTempUserStatus] = useState("")

    const handleUserInput = (e) => {
        setPostText(e.target.value)
    }

    const clearUserInput = () => {
        setPostText("")
    }

    const [usersArr, setUsers] = useState([])

    // Fetch users from dummy server
    useEffect(() => {
        const getUsers = async () => {
            const serverUsers = await fetchUsers()
            setUsers(serverUsers)
        }
        getUsers()
    }, [])
    const fetchUsers = async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        return data
    }

    const updateUserStatusInput = (e) => {
        setTempUserStatus(e.target.value)
    }
    const updateStatusFromInput = (e) => {
        setUserStatus(tempUserStatus)
        localStorage.setItem("userStatus", tempUserStatus)
        setTempUserStatus("")
    }
    const collectInput = () => {
        let postToBeAdded = {
            // userId: 1  ,
            id: 110   ,
            // title: '1'   ,
            body: postText
        }
        let modified = posts
        addToPosts([...modified, postToBeAdded])
        setPostText("")
    }

    return (
        <div className="common">
            <div className="commonWrapper">
                <div className="commonTop">
                    <img className="commonProfilePicture" src="/assets/profile_pic_1.jpg" alt="" />
                    <input placeholder={usersArr[0] && usersArr !== []? usersArr[0].company.catchPhrase : "hi"} type="text" value={tempUserStatus} className="commonInput" onChange={updateUserStatusInput}/>
                    <span className="commonUserStatus">{userStatus}</span>
                    <input className="statusUpdateBtn" type="button" value="Update Status" onClick={updateStatusFromInput} />
                </div>
                <hr className="commonHr"/>
                <div className="commonBottom">
                    <div className="commonOptions">
                        <Photo htmlColor="#26a7de" className="commonIcon"/>
                        <span className="commonOptionText">Add Photo?</span>
                        <input className="commonAddImage" type="file"/>
                    </div>

                </div>

                <div className="commonNewPost">
                    <div className="commonNewText">
                            <textarea className="commonNewTextInput" type="text" id="userTextInput" value={postText} onChange={handleUserInput}/>
                            <div className="commonPostButtons">
                                <IconButton onClick={collectInput}>
                                    <Publish className="commonNewTextSubmitButton"/>
                                </IconButton>
                                <span className="commonNewTextSubmitButtonDesc">Post</span>
                                <IconButton onClick={clearUserInput}>
                                    <Backspace className="commonNewTextDeleteButton" />
                                </IconButton>
                                <span className="commonNewTextDeleteButtonDesc">Clear</span>
                                {/* <button type="submit" className="commonNewTextSubmitButton">Submit</button> */}
                                {/* <button type="button" className="commonNewTextDeleteButton" >Clear</button> */}
                            </div>
                            
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Common
