import { FormEvent, useEffect, useState } from "react";
import useStickNotes from "../../store/useStickNotes"
import axios, { AxiosError } from "axios";

const StickyNotesForm = () => {

  const { currentStickNotes, formView, showForm, pickStickyNote, addStickNotes, updateStickNotes } = useStickNotes();
  const [note_title, setTitle] = useState<string|null>(null);
  const [note_content, setContent] = useState<string|null>(null);
  const [ error, setError] = useState("");
  const [ loader, setLoader] = useState(false);

  useEffect(()=>{
    if(currentStickNotes){
      setTitle(currentStickNotes.note_title);
      setContent(currentStickNotes.note_content);
    }
  },[currentStickNotes])

  async function handleSubmit(e:FormEvent){
    e.preventDefault();
    try {
      setLoader(true);
      if(currentStickNotes){
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/notes/${currentStickNotes.note_id}`, 
          {note_title, note_content},
          {headers: {
            'Content-Type': "application/json",
            'token': localStorage.getItem("token")
          }}
        )
        updateStickNotes(res.data);
      }else{
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/notes`, 
          {note_title, note_content},
          {headers: {
            'Content-Type': "application/json",
            'token': localStorage.getItem("token")
          }}
        )
        addStickNotes(res.data);
      }
      close();
    } catch (error) {
      console.log(error);
      
      if(error instanceof AxiosError){
        setError(error.response?.data.detail)
      }
    }finally{
      setLoader(false);
    }
  }


  function close(){
    console.log("Close");
    
    showForm(false);
    pickStickyNote(null);
    setTitle(null);
    setContent(null);
  }

  return (
    formView && <div className="fixed top-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] flex-center z-20">
      <form 
      className="p-4 gap-4 bg-white rounded-lg shadow flex-center flex-col "
      onSubmit={(e)=>handleSubmit(e)}>
          
        <div className="flex justify-between w-full">
          <h1 className="text-center font-semibold text-xl py-2">
            {
              currentStickNotes?"Update":"Create"
            } Sticky Note
          </h1>
          <button 
            type="button" 
            className="text-red-400 font-semibold hover:text-red-600" 
            onClick={close}>X</button>
        </div>

        {error && <span className="text-red-400 font-semibold text-sm">*{error}</span>}

          <input
           className="w-[300px] bg-gray-100 py-2 px-4 rounded border"
           placeholder="Title"
           onChange={(e)=>setTitle(e.target.value)}
           value={note_title?note_title:undefined}
           required
          />

          <textarea
           className="w-[300px] h-[200px] bg-gray-100 py-2 px-4 rounded border"
           placeholder="Content"
           onChange={(e)=>setContent(e.target.value)}
           value={note_content?note_content:undefined}
          ></textarea>

          <div className="flex-center">
            <button className="py-2 px-4 font-semibold text-white bg-sky-400 rounded">
              {
                loader
                ?"Loading..."
                :currentStickNotes?"Update":"Create"
              }
            </button>
          </div>
      </form>
    </div>
  )
}

export default StickyNotesForm