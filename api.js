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

export const getArticleById = (article_id) => {
    return apiClient
    .get(`/articles/${article_id}`)
    .then(({ data: {article}})=> {
        return article;
    })
    .catch((err)=>{
        console.log(err)
    })
}