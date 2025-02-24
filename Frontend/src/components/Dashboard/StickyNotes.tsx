import { FormEvent } from "react";
import useStickNotes from "../../store/useStickNotes";
import axios from "axios";

const StickyNotes = ({stickyNote}:{stickyNote:StickyNote}) => {

  const {showForm, pickStickyNote, deleteStickNotes } = useStickNotes();

  async function handleDelete(e:FormEvent){
    e.stopPropagation();
    try {
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/notes/${stickyNote.note_id}`, 
            {headers: {
            'Content-Type': "application/json",
            'token': localStorage.getItem("token")
            }}
        )
        deleteStickNotes(stickyNote.note_id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div 
        className="rounded bg-red-200 w-[350px] h-[300px] shadow overflow-auto cursor-pointer"
        onClick={()=>{
            showForm(true);
            pickStickyNote(stickyNote);
        }}
    >
        <div className="flex justify-between px-2 py-1 border-b shadow text-lg">
            <h1 className="font-semibold">{stickyNote.note_title}</h1>
            <button type="button" className="text-red-400 font-semibold hover:text-red-600" onClick={(e)=>handleDelete(e)}>
                <img src="./bin.png" alt="tarsh-icon" className="h-5 w-5 rounded-full hover:shadow"/>
            </button>
        </div>
        <p className="p-2">
            {stickyNote.note_content}
        </p>
    </div>
  )
}

export default StickyNotes;