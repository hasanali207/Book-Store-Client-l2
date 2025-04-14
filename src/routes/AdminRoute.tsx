import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminRoute() {
  const {user} = useSelector((state: RootState) => state.auth)
  console.log(user)
  return user?.role === "admin" ? <Outlet/> : <Navigate to="/login"/>
}
