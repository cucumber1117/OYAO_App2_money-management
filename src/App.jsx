import { useEffect, useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import AddTransaction from './pages/AddTransaction'
import TransactionList from './pages/TransactionList'
import Category from './pages/Category'
import Settings from './pages/Settings'
import './App.css'

const routes = {
  home: Home,
  add: AddTransaction,
  list: TransactionList,
  category: Category,
  settings: Settings,
}

function getPageFromHash() {
  const page = window.location.hash.replace('#', '')
  return routes[page] ? page : 'home'
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getPageFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const CurrentPageComponent = routes[currentPage]

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <CurrentPageComponent />
      </main>
      <BottomNav currentPage={currentPage} />
    </div>
  )
}

export default App
