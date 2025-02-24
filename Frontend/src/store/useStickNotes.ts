import { create } from "zustand"


type State = {
    stickNotes: StickyNote[],
    formView: boolean,
    currentStickNotes: StickyNote | null,
}

type Action = {
    setStickNotes: (stickNotes:StickyNote[])=>void,
    addStickNotes: (stickNote:StickyNote)=>void,
    updateStickNotes: (stickNote:StickyNote)=>void,
    deleteStickNotes: (noteId:number)=>void,

    showForm: (view:boolean)=>void,
    pickStickyNote: (st:StickyNote|null)=>void
}

const useStickNotes = create<State&Action>((set)=>({
    stickNotes: [],
    formView: false,
    currentStickNotes: null,
    setStickNotes: (stickNotes)=>set(()=>({stickNotes})),
    addStickNotes: (stickNote)=>set((state)=>{
        state.stickNotes.push(stickNote);
        return {stickNotes: state.stickNotes};
    }),
    updateStickNotes: (stickNotes)=>set((state)=>{
        console.log(stickNotes);
        
        const index = state.stickNotes.findIndex(st=>st.note_id == stickNotes.note_id);
        if(index>-1){
            state.stickNotes[index] = stickNotes;
        }
        return {stickNotes: state.stickNotes};
    }),
    deleteStickNotes: (note_id)=>set((state)=>{
        return {stickNotes: state.stickNotes.filter(st=>st.note_id!==note_id)};
    }),

    showForm: (formView)=>set(()=>({formView})),
    pickStickyNote: (currentStickNotes)=>set(()=>({currentStickNotes}))
}))

export default useStickNotes;