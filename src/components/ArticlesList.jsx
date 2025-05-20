import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleInfoCard from "./ArticleInfoCard";

function ArticlesList () {
const [isLoading, setIsLoading] = useState(true)
const [articlesToList, setArticlesToList] = useState(null)
const [page, setPage] = useState(1)
const [limit, setLimit] = useState(10)
const [totalCount, setTotalCount] = useState(null)

useEffect(()=>{
    setIsLoading(true)
    getArticles({page, limit})
    .then(({articles, total_count})=>{
        setArticlesToList(articles)
        setTotalCount(total_count)
    })
    .catch((err)=>{
        console.log(err)
    })
    .finally(()=>{
        setIsLoading(false)
    })
}, [page, limit])

function handleLimit(event) {
setLimit(event.target.value)
}

return (
    <>
    {isLoading ? <p> Loading Articles...</p> : 
    
    <section>
        <label htmlFor="limit">Viewing: </label>
        <select name="limit" defaultValue="10" onChange={handleLimit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>

        <ul >
            {articlesToList.map((article)=>{
                return (
                <li key={article.article_id} className="info-card">
                    <ArticleInfoCard articleToDisplay={article}/>
                </li>)
                
            })}
        </ul>
     
        <button onClick={()=> setPage((currentPage) => currentPage - 1)} disabled={page===1}>Previous</button>
        <button onClick={()=> setPage((currentPage) => currentPage + 1)} disabled={limit * page >= totalCount}>Next</button>
        <p>Viewing page {page} of {Math.ceil(totalCount / limit)}</p>
    
    </section>}
   
    </>
)


}

export default ArticlesList;