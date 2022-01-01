import React from 'react'
import "./topbar.css"
import { Search } from "@material-ui/icons"
import { Person } from "@material-ui/icons"
import { Chat } from "@material-ui/icons"
import { Notifications } from "@material-ui/icons"
import { useHistory } from "react-router-dom"
import { useEffect } from 'react'

const Topbar = (props) => {

    const history = useHistory();

    const routeChange = (e) => {
        if (e.target.id === "link1"){
            let path = "/profile";
            history.push(path);
        }
        else if (e.target.id === "link2"){
            let path = "/home";
            history.push(path);
        }
        else if (e.target.id === "link3"){
            localStorage.clear()
            props.updateCurrUser()
            let path = "/";
            history.push(path)
        }
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Social appie</span>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input className="searchInput" placeholder="Search..."/>
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span id="link1"className="topbarLink" onClick={(e) => routeChange(e)}>Profile</span>
                    <span id="link2" className="topbarLink" onClick={(e) => routeChange(e)}>Timeline</span>
                    <span id="link3" className="topbarLink" onClick={(e) => routeChange(e)}>Logout</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person className="personIcon"/>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat className="chatIcon"/>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src="/assets/profile_pic_1.jpg" alt="" className="topbarImg"/>
            </div>
        </div>
    )
}
export default Topbar
