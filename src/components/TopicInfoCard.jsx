import { capitaliseFirstLetter } from "../../utils/utils";

function TopicInfoCard ({topic}) {

const formattedTitle = capitaliseFirstLetter(topic.slug)
return (
    <>
    <h2>{formattedTitle}</h2>
    <p>{topic.description}</p>
    </>
)
}

export default TopicInfoCard;