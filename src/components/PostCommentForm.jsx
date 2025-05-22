import { useContext, useState } from "react"
import { postComment } from "../../api"
import { UserContext } from "../../UserContext"

function PostCommentForm ({article_id, setCommentsList}) {

const [hasSubmitted, setHasSubmitted] = useState(false)
const [postMessage, setPostMessage] = useState("Comment pending...")
let body = ""

const [user] = useContext(UserContext)

function handleCommentSubmit(event) {
    event.preventDefault()
    setHasSubmitted(true)
    postComment(article_id, {username: user.username, body: body})
    .then((comment)=>{
        setPostMessage("Comment successfully added.")
        setCommentsList((prevCommentList) => {
           return [comment, ...prevCommentList]
        })

    })
    .catch((err)=>{
        setPostMessage("Sorry, something went wrong. Your comment has not been added.")
    }) 
}

function handleBodyInput(event) {
    body = event.target.value
}


return (
    <>{hasSubmitted ? 
    <p> {postMessage} </p> 
    : 
    <form onSubmit={handleCommentSubmit}>
        <label htmlFor="comment_body">Your Comment:
            <input type="text" id="comment_body" placeholder="Type your comment here"  onBlurCapture={handleBodyInput}></input>
        </label>
        <input type="submit" value="Submit"></input>       
    </form>}
    </>
)
}

export default PostCommentForm