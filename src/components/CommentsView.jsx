import { useContext, useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";
import { formatResponseInfo } from "../../utils/utils";
import CommentCard from "./CommentCard";
import PostCommentForm from "./PostCommentForm";
import { UserContext } from "../../UserContext";

// Currently not supporting pagination for comments
function CommentsView ({article_id, comment_count, isAddingComment}) {

   const [commentsList, setCommentsList] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   // const [totalCount, setTotalCount] = useState(comment_count)
   const [user] = useContext(UserContext)
   const [errorMsg, setErrorMsg] = useState(null)
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
    
    useEffect(()=>{
        setIsLoading(true)
        setErrorMsg(null)
        getCommentsByArticleId({article_id, page, limit})
        .then((comments)=>{
            const arr = comments.map((comment) =>{
                const obj = formatResponseInfo(comment)
                if (user.username === obj.author) {
                    obj.hasPermissions = true;
                } else obj.hasPermissions = false;
                return obj;
            })
            setCommentsList(arr)
        })
        .catch((err)=>{
            setErrorMsg("Not Found")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [page, limit])

    function handlePage(newPage) {
        setPage(newPage)
        
    }

    return (
        <> {isLoading ? <p>Loading comments...</p> : errorMsg ? <h1>{errorMsg}</h1>: <section>
        <ul className="comments-container">
            {isAddingComment ? <PostCommentForm article_id={article_id} setCommentsList={setCommentsList}/> : <></>}
        {commentsList.map((comment)=>{
            return (
            <li className="info-card" key={comment.comment_id}>
                <CommentCard comment={comment}/>
            </li>)
            
        })}
        </ul>
        <button onClick={() => handlePage(page - 1)} disabled={page===1}>Previous</button>
        <button onClick={()=> handlePage(page + 1)} disabled={limit * page >= comment_count}>Next</button>
        <p>Viewing Page {page} of {Math.ceil(comment_count / limit)}</p>
        </section>}
        </>
    )
}


export default CommentsView;