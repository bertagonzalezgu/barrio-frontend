import { Link } from "react-router-dom"

export default function TestPage(){
  return (
    <>
      <Link to='/'>
        <h1 className="text-amber-500">TestPage</h1>
      </Link>
    </>
  )
}
