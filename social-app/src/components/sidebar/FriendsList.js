import React from 'react'
import { DeleteForever } from '@material-ui/icons';

import { IconButton } from '@material-ui/core';
import "./sidebar.css"
import { useEffect, useState } from 'react'


const FriendsList = (props) => {
    
    return (
            <ul className="sidebarFriendList">   
                {props.friends.map(element => (
                    <li className="sidebarFriend" key={element.id}>
                        <img className="sidebarFriendImg" src="/assets/profile_pic_2.jpg" alt=""/>
                        <span className="sidebarFriendName">{element.username}</span>
                        <IconButton className="sidebarFollowListUnfollow" id="test-delete-btn" onClick={props.deleteFriendFromList} name={element.id}>
                            <DeleteForever style={{fill: "red"}}/>
                        </IconButton>
                    </li>))}     
            </ul>
        )
}

export default FriendsList

