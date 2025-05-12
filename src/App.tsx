import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routeMap } from "./routeMap";
function App() {
  
  return (
    <>
    <Router>
      <Routes>
        {Object.entries(routeMap).map(([key, route]) => (
        <Route key={key} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
    </>
  )
}

export default App
