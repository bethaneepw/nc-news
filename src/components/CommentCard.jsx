function CommentCard ({comment}) {
return (
    <>
    <p className="info-card-title">{comment.author}</p>
    <p>{comment.body}</p>
    <p>Posted: {comment.created_at}</p>
    <p>{comment.votes} Votes</p>
    </>
)
}

export default CommentCard;