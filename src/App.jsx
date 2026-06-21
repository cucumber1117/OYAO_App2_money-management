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
  '/': Home,
  '/add': AddTransaction,
  '/list': TransactionList,
  '/category': Category,
  '/settings': Settings,
}

function getCurrentPath() {
  return routes[window.location.pathname] ? window.location.pathname : '/'
}

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  function navigate(path) {
    window.history.pushState({}, '', path)
    setCurrentPath(getCurrentPath())
  }

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const CurrentPageComponent = routes[currentPath]

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <CurrentPageComponent />
      </main>
      <BottomNav currentPath={currentPath} onNavigate={navigate} />
    </div>
  )
}

export default App
