import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const [note, setNote] = useState({
        title: 'harry',
        description: "gibfjbcjv aujbouwfaounfoheorhnbcubvhfkyv"
    });

    return (
        <noteContext.Provider value={{note, setNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;