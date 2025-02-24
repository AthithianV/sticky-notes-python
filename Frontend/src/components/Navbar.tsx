
const Navbar = () => {
  return (
    <nav className='p-2 h-[var(--navbar-height)] bg-sky-400'>
        <div className="px-4 flex items-center gap-2">
            <img src="sticky-notes.png" alt="logo" className="h-8 w-8"/>
            <h2 className="font-semibold text-white">Sticky Notes</h2>
        </div>
    </nav>
  )
}

export default Navbar