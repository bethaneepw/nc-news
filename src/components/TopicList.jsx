import { useEffect, useState } from "react"
import { getTopics } from "../../api"
import TopicInfoCard from "./TopicInfoCard"
import { Link } from "react-router-dom"

function TopicsList () {
const [isLoading, setIsLoading] = useState(true)
const [topicsToList, setTopicsToList] = useState(null)

    useEffect(()=>{
            setIsLoading(true)
            getTopics()
            .then((topics) => {
            setTopicsToList(topics) 
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }, [])
    
        return (
            <> {isLoading ? <p>Loading Topics...</p> :
                <ul>
                    {topicsToList.map((topic)=>{
                    return <li>
                        <Link to={`/articles?topic=${topic.slug}`}>
                        <TopicInfoCard topic={topic}/>
                        </Link>
                        </li>
                    })}
                </ul>
                }
            </>
        )
}

export default TopicsList;