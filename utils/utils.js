export function formatArticleInfo (article) {

    const formattedArticle = {...article}
    formattedArticle.topic = article.topic.charAt(0).toUpperCase() + article.topic.slice(1)
    const date = new Date(formattedArticle.created_at)
    formattedArticle.created_at = `${date.toLocaleString()}`
    return formattedArticle;

}