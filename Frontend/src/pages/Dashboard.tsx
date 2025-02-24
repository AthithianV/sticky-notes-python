import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Dashboard/Navbar";
import StickyNotes from "../components/Dashboard/StickyNotes";
import useStickNotes from "../store/useStickNotes";
import axios from "axios";
import StickyNotesForm from "../components/Dashboard/StickyNotesForm";

const Dashboard = () => {

    const { stickNotes, setStickNotes, showForm } = useStickNotes();
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/auth/login");
        }
    }, []);

    useEffect(()=>{
      axios.get(
        `${import.meta.env.VITE_API_URL}/notes`, 
        {headers: {
          'Content-Type': "application/json",
          'token': localStorage.getItem("token")
        }})
      .then((res)=>setStickNotes(res.data))
      .catch((err)=>console.log(err))
    },[])

  return (
    <div>
        <Navbar/>
        <StickyNotesForm/>
        <ul className="p-4 flex flex-wrap gap-2">
          {
            stickNotes.map((st, index)=>(
              <li key={index}><StickyNotes stickyNote={st}/></li>
            ))
          }
        </ul>
        <button 
          className="fixed bottom-10 right-10 z-10 bg-sky-400 shadow text-white font-semibold px-4 py-2 rounded-lg"
          onClick={()=>showForm(true)}
        >
            Create Sticky Note
        </button>
    </div>
  )
}

export default Dashboard;