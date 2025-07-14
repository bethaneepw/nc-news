import { Link } from "react-router-dom";
import { formatResponseInfo } from "../../utils/utils";

function ArticleInfoCard ({articleToDisplay}) {

    const formattedArticle = formatResponseInfo(articleToDisplay)
    return (
        <div className="article-info-card">
            <p className="info-card-title">{formattedArticle.title}</p>
            <p className="info-topic">{formattedArticle.topic}</p>
            <p>Posted: {formattedArticle.created_at}<br/>{formattedArticle.comment_count} comments <br/>{formattedArticle.votes} votes</p>
            <p>{formattedArticle.author}</p>
            <Link to={`/articles/${formattedArticle.article_id}`}><button>View</button></Link>
            
        </div>
        
    )
}

export default ArticleInfoCard;