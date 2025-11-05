import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes'

function Home() {
    const {note}= useContext(noteContext)
    return (
        <div>
            <div>
                <h2>Add your Notes</h2>
                <form action="">

                </form>
            </div>
            <div>
                <h2>Notes</h2>
                <Notes note={note}/>
            </div>

        </div>
    )
}

export default Home