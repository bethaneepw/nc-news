import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";
import { formatResponseInfo } from "../../utils/utils";
import CommentCard from "./CommentCard";
import PostArticleForm from "./PostArticleForm";
import PostCommentForm from "./PostCommentForm";

// Currently not supporting pagination for comments
function CommentsView ({article_id, comment_count, isAddingComment}) {

   const [commentsList, setCommentsList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [totalCount, setTotalCount] = useState(comment_count)

    useEffect(()=>{
        setIsLoading(true)
        getCommentsByArticleId(article_id)
        .then((comments)=>{
            const arr = comments.map((comment) =>{
                const obj = formatResponseInfo(comment)
                return obj;
            })
            setCommentsList(arr)
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [])

    return (
        <>
        <section>
        <ul className="comments-container">
            {isAddingComment ? <PostCommentForm article_id={article_id} setCommentsList={setCommentsList}/> : <></>}
        {commentsList.map((comment)=>{
            return (
            <li className="info-card" key={comment.comment_id}>
                <CommentCard comment={comment}/>
            </li>)
            
        })}
        </ul>
        </section>
        </>
        
    )
}


export default CommentsView;