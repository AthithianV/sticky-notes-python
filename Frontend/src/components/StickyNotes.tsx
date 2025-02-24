import { useRef } from "react";

const StickyNotes = () => {

    const pref = useRef<HTMLParagraphElement | null>(null);

    const handleContentChange = (event:any) => {
        if(event.target){
            console.log("Content changed:", event.target.textContent);
        }
    };

    const setCursorToEnd = () => {
        if (pref.current) {
        pref.current.focus();

        // Set cursor at the end
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(pref.current);
        range.collapse(false); // false means collapse to the end
        selection?.removeAllRanges();
        selection?.addRange(range);
        }
    };

  return (
    <div 
        className="p-2 rounded bg-red-200 w-[200px] h-[250px] shadow overflow-auto cursor-pointer"
        onClick={setCursorToEnd}
    >
        <p 
          contentEditable={true}
          onInput={handleContentChange}
          onBlur={handleContentChange}
          className="outline-none focus:outline-none"
          ref={pref}
        >
            This is a sticky Notes
        </p>
    </div>
  )
}

export default StickyNotes;