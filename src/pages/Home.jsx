import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import { Spin } from 'antd';

function Home() {
    const { notes, addNote, loading } = useContext(noteContext);
  const userName = localStorage.getItem("user_name");


    const [form, setForm] = useState({
        title: "",
        description: "",
        tag: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await addNote(form.title, form.description, form.tag);
        console.log(response);
        setForm({ title: "", description: "", tag: "" }); // clear fields
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
                <Spin size="large" tip="Loading Notes..." />
            </div>
        );
    }

    return (
        <div>
            <div>
                <h2>Add your Notes</h2>
                <form onSubmit={handleSubmit} className="note-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={{ marginRight: "10px" }}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Enter Description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        style={{ marginRight: "10px" }}
                    />
                    <input
                        type="text"
                        name="tag"
                        placeholder="Tag (optional)"
                        value={form.tag}
                        onChange={handleChange}
                        style={{ marginRight: "10px" }}
                    />
                    <button type="submit">Add Note</button>
                </form>
            </div>

            <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Notes by {userName}</p>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
                padding: "20px",
            }}>
                {notes.map((SingleNote) => (
                    <Notes key={SingleNote._id} note={SingleNote} />
                ))}
            </div>

        </div >
    );
}

export default Home;
