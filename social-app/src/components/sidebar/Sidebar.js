import React from 'react'
import "./sidebar.css"
import { RssFeed } from "@material-ui/icons"
import { Person } from "@material-ui/icons"
// import { useEffect, useState } from 'react'
import FriendsList from './FriendsList'
import { useHistory } from "react-router-dom"
import { AddBox } from '@material-ui/icons';
import { useState } from 'react'

const Sidebar = (props) => {

    const history = useHistory();
    const [followFriendInputTemp, setFollowFriendInputTemp] = useState("")
    const [newFriend, setNewFriend] = useState("")

    const routeChange = (e) => {
        if (e.target.id === "link1"){
            let path = "/home";
            history.push(path);
        }
        else if (e.target.id === "link2"){
            let path = "/profile";
            history.push(path);
        }
    }

    const updateInput = (e) => {
        setFollowFriendInputTemp(e.target.value)
        console.log(followFriendInputTemp)
    }

    const addFriendToList = () => {
        setNewFriend(followFriendInputTemp)
        console.log(newFriend)
        props.addFriendToList(newFriend)
    }

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem" >
                        <RssFeed className="sidebarIcon"/>
                        <span id="link1" className="sidebarListItemText" onClick={routeChange}>Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Person className="sidebarIcon"/>
                        <span id="link2" className="sidebarListItemText" onClick={routeChange}>Profile</span>
                    </li>
                </ul>
                <hr className="sidebarHr"/>
                <input className="addFriendInput" onChange={updateInput}/>
                <button className="addFriendBtn" onClick={addFriendToList}>Add</button>
                <FriendsList friends={props.friends} deleteFriendFromList={props.deleteFriendFromList}/>      
            </div>
        </div>
    )
}

export default Sidebar
