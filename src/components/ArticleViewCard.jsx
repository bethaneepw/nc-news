import { useEffect, useState } from "react";
import { getArticleById } from "../../api";
import { formatResponseInfo } from "../../utils/utils";
import { useParams } from "react-router-dom";
import CommentsView from "./CommentsView";


function ArticleViewCard () {
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [currentArticle, setCurrentArticle] = useState({})
    const [isViewingComments, setIsViewingComments] = useState(false)

    useEffect(()=>{
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
    <button id="view-comments-button" onClick={()=>{setIsViewingComments((viewing)=>!viewing)}}>{isViewingComments ? `Hide ${currentArticle.comment_count} Comments` : `View ${currentArticle.comment_count} Comments`} </button>
    <button id="votes-button" disabled>{currentArticle.votes} Votes</button>
</section> 
<section>{isViewingComments ? 
    <>
    <CommentsView article_id={currentArticle.article_id} comment_count={currentArticle.comment_count}/>
    </> 
    : <> </>}</section>
</>)
}

export default ArticleViewCard;