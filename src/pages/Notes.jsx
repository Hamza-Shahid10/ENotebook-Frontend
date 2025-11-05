import React from 'react'

function Notes(props) {
    const { title, description } = props.note
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}

export default Notes