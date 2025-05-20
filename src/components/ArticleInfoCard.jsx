function ArticleInfoCard ({articleToDisplay}) {

    const formattedArticleDisplay = {...articleToDisplay,
        topic: articleToDisplay.topic.charAt(0).toUpperCase() + articleToDisplay.topic.slice(1)
    }

    return (
        <>
        <h4>{formattedArticleDisplay.title}</h4>
        <h5>{formattedArticleDisplay.topic}</h5>

        </>
    )
}

export default ArticleInfoCard;