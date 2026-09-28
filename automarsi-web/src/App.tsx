import { useEffect, useState } from 'react'
import AppRouter from '@/app/AppRouter'

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname + window.location.search,
  )

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname + window.location.search)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigateTo(path: string) {
    if (path === currentPath) {
      return
    }

    window.history.pushState(null, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <AppRouter
      key={currentPath}
      currentPath={currentPath.split('?')[0]}
      onNavigate={navigateTo}
    />
  )
}

export default App
