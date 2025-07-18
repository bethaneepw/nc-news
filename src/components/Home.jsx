import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../../api";
import ArticleInfoCard from "./ArticleInfoCard";

function Home () {

    const [recentArticles, setRecentArticles] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(()=>{
        const page = 1;
        const limit = 4;
        getArticles({page, limit})
        .then(({articles, total_count})=>{
               if (articles.length === 0) {
                setErrorMsg(`No articles found`)
                }
        setRecentArticles(articles)
        })
        .catch((err)=>{
            setErrorMsg("Not Found")
        })
        .finally(()=>{

        })
    }, [])

return (
    <div className="home-page">
        <h1 className="home-title">NC News</h1>
        <ul className="home-page-links">
            <li>
            <Link to="/articles">View All Articles</Link>
            </li>
            <li>
            <Link to="/topics">View All Topics</Link>
            </li>
        </ul>
        <h2>Recently Added</h2>
        <ul className="articles-view-list">
            {recentArticles.map((article)=>{
                return (
                    <li key={article.article_id}>
                        <ArticleInfoCard articleToDisplay={article}/>
                    </li>
                )
            })}
        </ul>
    </div>

)
}

export default Home;