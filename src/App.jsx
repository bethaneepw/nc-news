import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ArticlesList from './components/ArticlesList'
import ArticleViewCard from './components/ArticleViewCard'
import TopicsList from './components/TopicList'
import UsersList from './components/UsersList'
import PostArticleForm from './components/PostArticleForm'
import { UserContext } from '../UserContext'

function App() {

  const [currentUser, setCurrentUser] = useState({username: "testuser", name: "Test McTest", avatar_url: ""})
  
  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      <header>
        <NavBar/>
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/articles" element={<ArticlesList/>}/>
          <Route path="/articles/:article_id" element={<ArticleViewCard/>}/>
          <Route path="/topics" element={<TopicsList/>}/>
          <Route path="/articles/:topic" element={<ArticlesList/>}/>
          <Route path="/users" element={<UsersList/>}/>
          <Route path="/articles/submit" element={<PostArticleForm/>}/>
        </Routes>
      </section>
    </UserContext.Provider>

  )
}

export default App
