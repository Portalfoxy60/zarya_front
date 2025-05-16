import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ERoles } from '../enums/roles.enum'
import { useAuth } from './UseAuth'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole: ERoles
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (requiredRole === ERoles.GUEST) {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (user?.role === ERoles.ADMIN) {
    return <>{children}</>
  }

  if (user?.role !== requiredRole) {
    alert('У вас нет доступа к этой странице')
    return null
  }
  return <>{children}</>
}
export default ProtectedRoute
