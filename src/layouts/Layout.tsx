import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TopBar from '../components/TopBar'

export default function Layout() {
  return (
    <div className="flex h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto md:pt-0 pt-4 pb-18 md:pb-0">
        <div className="md:hidden">
          <TopBar />
        </div>
        <Outlet />
      </main>
    </div>
  )
}