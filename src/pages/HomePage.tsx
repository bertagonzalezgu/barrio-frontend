import { Link } from "react-router-dom"

export default function HomePage(){
  return (
    <>
    <Link to='/test'>
        <h1 className="text-red-500">HomePage</h1>
    </Link>
    </>
    
  )
}
