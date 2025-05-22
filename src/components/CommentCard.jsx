import { useState } from "react";
import { deleteComment } from "../../api";


function CommentCard ({comment}) {
    const [pressedDelete, setPressedDelete] = useState(false)
    const [wasDeleted, setWasDeleted] = useState(false)
    const [feedbackMsg, setFeedbackMsg] = useState("Pending...")
    
    function handleDelete(event) {
    setPressedDelete(true)
    deleteComment(comment.comment_id)
    .then(()=>{
        setWasDeleted(true)
    })
    .catch(()=>{
        setFeedbackMsg("Error. Your comment could not be deleted at this time.")
    })

    }
return (
    <> 
    {wasDeleted ? "Your comment was successfully deleted" : <>
    <p className="info-card-title">{comment.author}</p>
    <p>{comment.body}</p>
    <p>Posted: {comment.created_at}</p>
    <p>{comment.votes} Votes</p>
    {comment.hasPermissions ? !pressedDelete ? <button onClick={handleDelete} disabled={pressedDelete}>Delete</button> : <> {feedbackMsg} </> : <> </>}
    </>
    }
    </>
)
}

export default CommentCard;