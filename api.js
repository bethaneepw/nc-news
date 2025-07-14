import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://nc-news-rvfa.onrender.com/api",
});

export const getArticles = (params) => {
  return apiClient
    .get(`/articles`, {
      params: {
        p: params.page,
        limit: params.limit,
        topic: params.topic,
        sort_by: params.sort,
        order: params.order,
      },
    })
    .then(({ data: { articles, total_count } }) => {
      return { articles, total_count };
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getArticleById = (article_id) => {
  return apiClient
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getCommentsByArticleId = ({ article_id, page, limit }) => {
  return apiClient
    .get(`/articles/${article_id}/comments`, {
      params: { p: page, limit: limit },
    })
    .then(({ data: { comments } }) => {
      return comments;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const patchArticleById = (article_id, inc) => {
  return apiClient
    .patch(`/articles/${article_id}`, inc)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const postComment = (article_id, commentInfo) => {
  return apiClient
    .post(`/articles/${article_id}/comments`, commentInfo)
    .then(({ data: { comment } }) => {
      return comment;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const deleteComment = (comment_id) => {
  return apiClient
    .delete(`/comments/${comment_id}`)
    .then(() => {
      return;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getTopics = () => {
  return apiClient
    .get("/topics")
    .then(({ data: { topics } }) => {
      return topics;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
