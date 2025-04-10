import Footer from '@/components/footer/footer'
import Navbar from '@/components/navbar/navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>

    </div>
  )
}
