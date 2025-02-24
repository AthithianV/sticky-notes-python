import './App.css'
import Navbar from './components/Navbar'
import StickyNotes from './components/StickyNotes'

function App() {

  return (
    <main className='h-screen w-screen bg-grey-100'>
      <Navbar />
      <section className='p-4 h-[var(--body-height)] flex gap-2 flex-wrap'>
        <StickyNotes/>
        <StickyNotes/>
      </section>
    </main>
  )
}

export default App
