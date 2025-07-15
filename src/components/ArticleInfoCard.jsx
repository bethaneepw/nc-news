import { Link } from "react-router-dom";
import { formatResponseInfo } from "../../utils/utils";

function ArticleInfoCard ({articleToDisplay}) {

    const formattedArticle = formatResponseInfo(articleToDisplay)
    return (
        <div className="article-info-wrapper">
            <Link to={`/articles/${formattedArticle.article_id}`}>
            <img className="article-info-img" src={articleToDisplay.article_img_url}></img>
            <h1 className="article-info-title">{formattedArticle.title}</h1>
            {/* <p className="article-info-topic">{formattedArticle.topic}</p>
            <p className="article-info-posted">Posted: {formattedArticle.created_at}</p>
            <p className="article-info-comment-count">{formattedArticle.comment_count} comments</p>
            <p className="article-info-votes">{formattedArticle.votes} votes</p>
            <p className="article-info-author">{formattedArticle.author}</p> */}
            </Link>
        </div>
        
    )
}

export default ArticleInfoCard;