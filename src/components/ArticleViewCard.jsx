import { useEffect, useState } from "react";
import { getArticleById } from "../../api";
import { formatArticleInfo } from "../../utils/utils";
import { useParams } from "react-router-dom";

function ArticleViewCard () {
    const {article_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [currentArticle, setCurrentArticle] = useState({})

    useEffect(()=>{
        setIsLoading(true)
        getArticleById(article_id)
        .then((article) => {
            setCurrentArticle((current) => current = {...formatArticleInfo(article)})
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }, [article_id])
    
return (
<section className="article-container">
    <h1>{currentArticle.title}</h1>
    <img src={currentArticle.article_img_url}></img>
    <div className="article-content-container"></div>
    <h2>Written by {currentArticle.author}</h2>
    <p>{currentArticle.body}</p>
    <button id="view-comments-button">View Comments {currentArticle.comment_Count}</button>
    
    <button id="votes">^</button>
    
</section>)
}

export default ArticleViewCard;