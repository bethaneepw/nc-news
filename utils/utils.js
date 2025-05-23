export function formatResponseInfo (dataToFormat) {

    const formattedData = {...dataToFormat}

    if (dataToFormat.topic) {
        formattedData.topic = dataToFormat.topic.charAt(0).toUpperCase() + dataToFormat.topic.slice(1)
    }
    const date = new Date(formattedData.created_at)
    formattedData.created_at = `${date.toLocaleString()}`
    return formattedData;

}

export function capitaliseFirstLetter (text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
  
}