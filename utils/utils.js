export function formatResponseInfo (dataToFormat) {

    const formattedData = {...dataToFormat}

    if (dataToFormat.topic) {
        formattedData.topic = dataToFormat.topic.charAt(0).toUpperCase() + dataToFormat.topic.slice(1)
    }
    const date = new Date(formattedData.created_at)
    formattedData.created_at = `${date.toLocaleString()}`
    return formattedData;

}