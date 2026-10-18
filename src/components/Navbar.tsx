import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

export default function Navbar() {
  return (
    <>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <BottomNav />
      </div>
    </>
  )
}