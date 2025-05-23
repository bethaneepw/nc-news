import { useEffect, useState } from "react"
import { getTopics } from "../../api"
import TopicInfoCard from "./TopicInfoCard"
import { Link } from "react-router-dom"

function TopicsList () {
const [isLoading, setIsLoading] = useState(true)
const [topicsToList, setTopicsToList] = useState(null)
const [errorMsg, setErrorMsg] = useState(null)

    useEffect(()=>{
            setIsLoading(true)
            setErrorMsg(null)
            getTopics()
            .then((topics) => {
            setTopicsToList(topics) 
            })
            .catch((err)=>{
                setErrorMsg("Not Found")
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }, [])
    
        return (
            <> {isLoading ? <p>Loading Topics...</p> : errorMsg ? <h1>{errorMsg}</h1>:
                <ul>
                    {topicsToList.map((topic)=>{
                    return <li key={topic.slug}>
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