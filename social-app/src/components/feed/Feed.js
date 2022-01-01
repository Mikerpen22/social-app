import React from 'react'
import Common from '../common/Common'
import Post from '../post/Post'
import "./feed.css"
import { useState, useEffect } from 'react'


const Feed = (props) => {
    const [posts, setPosts] = useState([]) 
    // Fetch posts from dummy server
    useEffect(() => {
        const getPosts = async () => {
            const serverPosts = await fetchPosts()
            // This is new user that just registers
            if(props.currUser > 9){
                console.log("I'm at Feed.js getting posts for new user!")
                localStorage.setItem("currUser", props.currUser)
                const currUserServerPosts = serverPosts.filter((post) => (parseInt(post.userId) === 1))
                setPosts(currUserServerPosts)
            }
            else{
                console.log(`I'm at Feed.js getting posts for old user ${props.currUser}!`)

                // I refresh the page
                if(props.friends.length === 20){
                    console.log("I refresh the page")
                    let currFriendsId = []
                    if(localStorage.getItem("friends")){
                        let temp = localStorage.getItem("friends").split(',')
                        console.log(temp)
                        temp = temp.map((e)=>(parseInt(e)))
                        currFriendsId.push.apply(currFriendsId, temp)
                    }
                    // TODO: Correctly set props.friends(currently it becomes empty after refresh)
                    console.log(props.friends)
                    const currUserServerPosts = serverPosts.filter((post) => (parseInt(post.userId) !== props.currUser && currFriendsId.includes(parseInt(post.userId))))
                    setPosts(currUserServerPosts)                   
                }
                else{
                    console.log("yi")
                    console.log(props.friends)
                    let friendsIDArr = props.friends.map((f) => (f.id))
                    console.log(friendsIDArr)
                    const currUserServerPosts = serverPosts.filter((post) => (parseInt(post.userId) !== props.currUser && friendsIDArr.includes(parseInt(post.userId))))
                    setPosts(currUserServerPosts)        
                }
            }
        }
        getPosts()
    },[props.friends])
    const fetchPosts = async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        const data = await res.json()
        return data
    }
    
    const addToPosts = (modifiedPostsArr) => {
        setPosts(modifiedPostsArr)
    }

    return (
        <div className="feed">
            <div data-testid="test-feed-id" className="feedWrapper">
                <Common posts={posts} addToPosts={addToPosts}/>
                {posts.map( (post) => (
                   <Post key={post.id} posts={post}/> 
                ))}
            </div>
        </div>
    )
}

export default Feed
