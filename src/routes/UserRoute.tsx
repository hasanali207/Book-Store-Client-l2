import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function UserRoute() {
  const {user} = useSelector((state:RootState) => state.auth)
    console.log(user)
    return user?.role === "user" ? <Outlet/> : <Navigate to= "/login"/>
}
