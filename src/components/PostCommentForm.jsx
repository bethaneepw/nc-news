import { useContext, useState } from "react"
import { postComment } from "../../api"
import { UserContext } from "../../UserContext"

function PostCommentForm ({article_id, setCommentsList}) {

const [hasSubmitted, setHasSubmitted] = useState(false)
const [postMessage, setPostMessage] = useState("Comment pending...")
const [hasContent, setHasContent] = useState(false)
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
    if (!body) {
        setHasContent(false)
    } else {
        setHasContent(true)
    }
}


return (
    <>{hasSubmitted ? 
    <p> {postMessage} </p> 
    : 
    <form onSubmit={handleCommentSubmit}>
        <label htmlFor="comment_body">Your Comment:
            <input type="text" id="comment_body" placeholder="Type your comment here"  onChange={handleBodyInput}></input>
        </label>
        <input type="submit" value="Submit" disabled={!hasContent}></input>       
    </form>}
    </>
)
}

export default PostCommentForm