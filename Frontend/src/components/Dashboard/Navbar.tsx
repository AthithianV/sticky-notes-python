import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("token");
    navigate("/auth/login");
  }

  return (
    <nav className='p-2 px-5 h-[var(--navbar-height)] bg-sky-400 flex justify-between'>
        <div className="px-4 flex items-center gap-2">
            <img src="sticky-notes.png" alt="logo" className="h-8 w-8"/>
            <h2 className="font-semibold text-white">Sticky Notes</h2>
        </div>
        <button onClick={logout} className="font-semibold border border-black px-4 py-1 rounded">Logout</button>
    </nav>
  )
}

export default Navbar