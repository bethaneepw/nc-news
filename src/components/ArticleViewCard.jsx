import { useContext, useEffect, useState } from "react";
import { getArticleById, patchArticleById } from "../../api";
import { formatResponseInfo } from "../../utils/utils";
import { useParams } from "react-router-dom";
import CommentsView from "./CommentsView";
import PostCommentForm from "./PostCommentForm";


function ArticleViewCard () {
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [currentArticle, setCurrentArticle] = useState({})
    const [isViewingComments, setIsViewingComments] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)
    const [localVotes, setLocalVotes] = useState(0)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isAddingComment, setIsAddingComment] = useState(false)

    useEffect(()=>{
        setErrorMsg(null)
        setIsLoading(true)
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle((current) => current = {...formatResponseInfo(article)})
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [article_id])

    function handleVote (event) {

        setLocalVotes(Number(event.target.value))
        setHasVoted(true)
        patchArticleById(article_id, {inc_votes : Number(event.target.value)})
        .then((article) => {
        })
        .catch((err)=>{
            setErrorMsg("Something went wrong. Your vote has not been counted.")
            console.log(err)
        })
    }

    if (isLoading) {
        return ( 
        <> Loading Article....</>
    )
    }
    
return (<>
<section className="article-container">
    <h1>{currentArticle.title}</h1>
    <img src={currentArticle.article_img_url}></img>
    <div className="article-content-container"></div>
    <h2>Written by {currentArticle.author}</h2>
    <p>{currentArticle.body}</p>    
    
    <div className="vote-button-group">
        <p>{currentArticle.votes + localVotes} Votes</p>
        {hasVoted ? errorMsg ? <p> {errorMsg} </p> : <p> Thanks for voting! </p>
        : <>
        <button id="votes-button" onClick={handleVote} value="1"> + </button>
        <button id="votes-button" onClick={handleVote} value="-1"> - </button>
        </>
        }
    </div>
    <div className="comment-button-group">
        <button id="view-comments-button" onClick={()=>{
            setIsViewingComments((viewing)=>!viewing)
            setIsAddingComment(false)
        }}>{isViewingComments ? `Hide ${currentArticle.comment_count} Comments` : `View ${currentArticle.comment_count} Comments`} </button>
        <button onClick={(()=>{
            setIsAddingComment(adding => !adding)
            setIsViewingComments(true)})}>{isAddingComment ? "Cancel" : "Add comment"}</button>
        </div>
    
</section> 
<section>
    {isViewingComments ? 
    <>
    <CommentsView article_id={currentArticle.article_id} comment_count={currentArticle.comment_count} isAddingComment={isAddingComment}/>
    </> 
    : <> </>}</section>
</>)
}

export default ArticleViewCard;