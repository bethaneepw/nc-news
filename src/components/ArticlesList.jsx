import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleInfoCard from "./ArticleInfoCard";

function ArticlesList () {
const [isLoading, setIsLoading] = useState(true)
const [articlesToList, setArticlesToList] = useState(null)

useEffect(()=>{
    setIsLoading(true)
    getArticles()
    .then((articles)=>{
        setArticlesToList(articles)
        console.log(articles, "<< articles")
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
    {isLoading ? <p> Loading Articles...</p> : 
    
    <section>
        <ul>
            {articlesToList.map((article)=>{
                return (
                <li key={article.article_id}>
                    <ArticleInfoCard articleToDisplay={article}/>
                </li>)
                
            })}
        </ul>
    </section>}
   
    </>
)


}

export default ArticlesList;