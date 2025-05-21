import { useContext } from "react"

function PostCommentForm () {
    const {currentUser} = useContext(CurrentUserContext)
return (
    <form>
        <label htmlFor="comment_body">Your Comment:</label>
        <br/><input type="text" id="comment_body" placeholder="Type your comment here"></input>       
    </form>
)
}

export default PostCommentForm