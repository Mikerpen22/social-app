import React from 'react'
import "./home.css"
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import { useEffect } from 'react'
import { useState } from 'react'

const Home = (props) => {

    let allUserArr = new Array(20)

    const tempArrForInitialState = new Array(20)
    const [friendsArr, setFriends] = useState(tempArrForInitialState)
    // Fetch users from dummy server
    useEffect(() => {
        const getFriends = async () => {
            let serverFriends = await fetchFriends()
            if(localStorage.getItem("friends")){
                console.log(localStorage)
                let updatedFriends = localStorage.getItem("friends").split(',')
                updatedFriends = updatedFriends.map((n)=>(parseInt(n)))
                serverFriends = serverFriends.filter(f => updatedFriends.includes(f.id))
            }
            
            let serverFriendsFiltered = new Array(20)
            localStorage.setItem("allFriends", serverFriends)
            if(props.currUser > 100){
                serverFriendsFiltered = serverFriends.filter((f)=> f.id == 1)
            }
            else{
                serverFriendsFiltered = serverFriends
            }
            allUserArr = serverFriends
            setFriends(serverFriendsFiltered)
            let friendsIdList = serverFriendsFiltered.map((f)=>(f.id))
            localStorage.setItem("friends", friendsIdList)
        }
        getFriends()
    }, [])
    const fetchFriends = async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await res.json()
        return data
    }

    const deleteFriendFromList = (e) => {
        let temp = friendsArr.filter( (friend) => friend.id != e.currentTarget.name)
        console.log(`I'm at Home.js deleting friend ${e.currentTarget.name}!`)
        
        // Update friends at localStorage
        let temp2 = friendsArr.map((friend)=>(friend.id))
        temp2 = temp2.filter((f) => f != e.currentTarget.name)
        localStorage.setItem("friends", temp2)
        setFriends(temp)
        console.log(friendsArr)
    }

    const addFriendToList = (f) => {
        let newFriend = {id: Math.random()*1000+1, name: f, username: f}
        // console.log("hi");
        console.log(allUserArr);
        let tempFriendList = [...friendsArr, newFriend]
        console.log(tempFriendList)
        setFriends(tempFriendList)
    }

    const restoreFriends = (idArr) => {
        let idObjArr = idArr.map((id) => ({id: id, name: "", username: "", email:"", address: {}, phone:"", website:"", company:{}}))
        console.log(idObjArr)
        setFriends(idObjArr)    // This line is not working!!
        console.log(friendsArr)
    }

    return (
        <>
            <Topbar currUser={props.currUser} updateCurrUser={props.updateCurrUser}/>
            <div className="homeContainer">
                <Sidebar currUser={props.currUser} friends={friendsArr} deleteFriendFromList={deleteFriendFromList} addFriendToList={addFriendToList}/>
                <Feed currUser={props.currUser} friends={friendsArr} restoreFriends={restoreFriends}/>
                <Rightbar currUser={props.currUser}/>
            </div>
        </>
    )
}
export default Home
