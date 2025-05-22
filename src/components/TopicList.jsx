import { useState } from "react"

function TopicsList () {
const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
            setIsLoading(true)
            getArticleById(article_id)
            .then((article) => {
    
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                setIsLoading(false)
            })
        }, [])
    

}

export default TopicsList;