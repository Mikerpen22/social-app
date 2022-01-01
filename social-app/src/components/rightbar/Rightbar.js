import React from 'react'
import "./rightbar.css"
import { useState, useEffect } from 'react'

const Rightbar = () => {

    const [onlineFriendsList, setOnlineFriendsList] = useState(["", "", "", "", ""])

    // Fetch friends list
    useEffect(() => {
        const serverOnlineFriendsList = async () => {
            const serverOnlineFriendsList = await fetchOnlineFriends()
            setOnlineFriendsList(serverOnlineFriendsList)
        }
        serverOnlineFriendsList()
    })
    const fetchOnlineFriends = async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        return data
    }
    

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <h4 className="onlineFriends">Who's online</h4>
                <hr/>
                <ul className="rightbarFriendList">
                    <li className="rightbarFriend">
                        <div className="rightBarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/profile_pic_3.jpg" alt=""/>
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername" >{onlineFriendsList !== []? onlineFriendsList[0].name : ""}</span>
                    </li>

                    <li className="rightbarFriend">
                        <div className="rightBarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/profile_pic_3.jpg" alt=""/>
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername" >{onlineFriendsList !== []? onlineFriendsList[1].name: ""}</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightBarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/profile_pic_3.jpg" alt=""/>
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername" >{onlineFriendsList !== []? onlineFriendsList[2].name: ""}</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightBarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/profile_pic_3.jpg" alt=""/>
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername" >{onlineFriendsList !== []? onlineFriendsList[3].name: ""}</span>
                    </li>
                    <li className="rightbarFriend">
                        <div className="rightBarProfileImgContainer">
                            <img className="rightbarProfileImg" src="assets/profile_pic_3.jpg" alt=""/>
                            <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername" >{onlineFriendsList !== []? onlineFriendsList[4].name: ""}</span>
                    </li>

                </ul>
            </div>
            
        </div>
    )
}

export default Rightbar
