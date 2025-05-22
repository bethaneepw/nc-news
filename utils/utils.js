export function formatResponseInfo (dataToFormat) {

    const formattedData = {...dataToFormat}

    if (dataToFormat.topic) {
        formattedData.topic = dataToFormat.topic.charAt(0).toUpperCase() + dataToFormat.topic.slice(1)
    }
    const date = new Date(formattedData.created_at)
    formattedData.created_at = `${date.toLocaleString()}`
    return formattedData;

}

// Refactors lower case to have capital letter at start
export function formatTopics (topicsArray) {
    const formatted = topicsArray.map((topic) => {
        return topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
    })
    
    return formatted;
}