import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://nc-news-rvfa.onrender.com/api"
})

export const getArticles = () => {
    return apiClient
    .get(`/articles`)
    .then(({ data: {articles}})=> {
        return articles;
    })
    .catch((err)=>{
        console.log(err)
    })
}