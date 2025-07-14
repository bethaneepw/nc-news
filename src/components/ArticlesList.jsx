import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import ArticleInfoCard from "./ArticleInfoCard";
import { Link, useSearchParams } from "react-router-dom";

function ArticlesList () {
const [isLoading, setIsLoading] = useState(true)
const [articlesToList, setArticlesToList] = useState(null)
const [totalCount, setTotalCount] = useState(null)
const [searchParams, setSearchParams] = useSearchParams();
const [errorMsg, setErrorMsg] = useState(null)


    const topic = searchParams.get("topic");
    const sort = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "DESC";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

useEffect(()=>{
    setIsLoading(true)
    setErrorMsg(null)
    getArticles({page, limit, topic, sort, order})
    .then(({articles, total_count})=>{
        if (articles.length === 0 && topic) {
            setErrorMsg(`No articles found under the topic "${topic}"`)
        }
        setArticlesToList(articles)
        setTotalCount(total_count)
    })
    .catch((err)=>{
        setErrorMsg("Not Found")
    })
    .finally(()=>{
        setIsLoading(false)
    })
}, [searchParams])

function handleLimit(event) {
setSearchParams({
        ...Object.fromEntries(searchParams),
        limit: event.target.value,
        page: 1
    });
}

function handleSort(event) {
setSearchParams({
        ...Object.fromEntries(searchParams),
        sort: event.target.value,
        page: 1
    });
}

function handleOrder(event) {
setSearchParams({
        ...Object.fromEntries(searchParams),
        order: event.target.value,
        page: 1
    });
}

function handleFilter () {
        setSearchParams({
            ...Object.fromEntries(searchParams),
            sort,
            order,
            page: 1
        });
    };

function handlePage(newPage) {
        setSearchParams({
        ...Object.fromEntries(searchParams),
        page: newPage
    });
};
    
return (
    <>
    <div className="topic-filter-group">
        <ul>
            <li><Link to="/articles?topic=cooking">Cooking</Link></li>
            <li><Link to="/articles?topic=coding">Coding</Link></li>
        <li> <Link to="/articles?topic=football">Football</Link></li>
        </ul>
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
    <div>

        <ul >
            {articlesToList.map((article)=>{
                return (
                <li key={article.article_id}>
                    <ArticleInfoCard articleToDisplay={article}/>
                </li>)
                
            })}
        </ul>
     
        <button onClick={() => handlePage(page - 1)} disabled={page===1}>Previous</button>
        <button onClick={()=> handlePage(page + 1)} disabled={limit * page >= totalCount}>Next</button>
        <p>Viewing page {page} of {Math.ceil(totalCount / limit)}</p>
    
    </div>}
    </>
)

}

export default ArticlesList;