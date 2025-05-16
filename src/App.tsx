import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routeMap } from './routeMap'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  return (
    <>
      <Router>
        <Routes>
          {Object.entries(routeMap).map(([key, route]) => (
            <Route
              key={key}
              path={route.path}
              element={
                <ProtectedRoute requiredRole={route.role}>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </>
  )
}

export default App
