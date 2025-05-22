import { formatTopic } from "../../utils/utils";

function TopicInfoCard ({topic}) {

const formattedTitle = formatTopic(topic.slug)
return (
    <>
    <h2>{formattedTitle}</h2>
    <p>{topic.description}</p>
    </>
)
}

export default TopicInfoCard;