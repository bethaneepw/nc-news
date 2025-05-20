import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://nc-news-rvfa.onrender.com/api"
})

export const getArticles = (params) => {
    return apiClient
    .get(`/articles`, {params: { 
        p: params.page,
        limit: params.limit
        }} )
    .then(({ data: {articles, total_count}})=> {
        return {articles, total_count};
    })
    .catch((err)=>{
        console.log(err)
    })
}