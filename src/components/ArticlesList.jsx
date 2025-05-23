import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleInfoCard from "./ArticleInfoCard";
import { Link, useSearchParams } from "react-router-dom";

function ArticlesList () {
const [isLoading, setIsLoading] = useState(true)
const [articlesToList, setArticlesToList] = useState(null)
const [page, setPage] = useState(1)
const [limit, setLimit] = useState(10)
const [totalCount, setTotalCount] = useState(null)
const [searchParams, setSearchParams] = useSearchParams();
const [sort, setSort] = useState("created_at")
const [order, setOrder] = useState("DESC")
const [errorMsg, setErrorMsg] = useState(null)

useEffect(()=>{
    setIsLoading(true)
    setErrorMsg(null)
    const topic = searchParams.get('topic')
    getArticles({page, limit, topic, sort, order})
    .then(({articles, total_count})=>{
        setArticlesToList(articles)
        setTotalCount(total_count)
    })
    .catch((err)=>{
        setErrorMsg("Not Found")
    })
    .finally(()=>{
        setIsLoading(false)
    })
}, [page, limit, searchParams])

function handleLimit(event) {
setLimit(event.target.value)
}

function handleSort(event) {
setSort(event.target.value)
}

function handleOrder(event) {
setOrder(event.target.value)
}

function handleFilter () {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            sort,
            order
        });
    };

return (
    <>
    <div className="topic-button-group">
    <Link to="/articles?topic=cooking"><button>Cooking</button></Link>
    <Link to="/articles?topic=coding"><button>Coding</button></Link>
    <Link to="/articles?topic=football"><button>Football</button></Link>
    </div>

    <div className="sort-button-group">
        <select name="sort" id="sort" value={sort} onChange={handleSort}>
            <option value="created_at">Date posted</option>
            <option value="votes">Votes</option>
            <option value="author">Author</option>
        </select>
         <select name="Order" id="Order" value={order} onChange={handleOrder}>
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
        </select>
            <button onClick={handleFilter}>Filter</button>
        
        <label htmlFor="limit">Viewing: </label>
        <select name="limit" defaultValue={limit} onChange={handleLimit}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
    </div>
   
    {isLoading ? <p> Loading Articles...</p> : errorMsg ? <h1>{errorMsg}</h1> :
    <section>
        

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