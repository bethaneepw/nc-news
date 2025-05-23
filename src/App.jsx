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
import { ErrorCard } from './components/ErrorCard'

function App() {

  const [currentUser, setCurrentUser] = useState({username: "grumpy19", name: "Paul Grump", avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013"})

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
          <Route path ="/*" element={<ErrorCard/>}/>
        </Routes>
      </section>
    </UserContext.Provider>

  )
}

export default App
