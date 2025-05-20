import { Link } from "react-router-dom";
import { formatArticleInfo } from "../../utils/utils";

function ArticleInfoCard ({articleToDisplay}) {

    const formattedArticle = formatArticleInfo(articleToDisplay)
    return (
        <>
            <p className="info-card-title">{formattedArticle.title}</p>
            <p>{formattedArticle.topic}</p>
            <p>Posted: {formattedArticle.created_at}<br/>{formattedArticle.comment_count} comments <br/>{formattedArticle.votes} votes</p>
            <p>{formattedArticle.author}</p>
            <Link to={`/articles/${formattedArticle.article_id}`}><button>View</button></Link>
            
        </>
        
    )
}

export default ArticleInfoCard;