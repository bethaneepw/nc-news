function TopicInfoCard ({topic}) {

   // const formattedSlug = topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
return (
    <>
    <h2>{topic.slug}</h2>
    <p>{topic.description}</p>
    </>
)
}

export default TopicInfoCard;