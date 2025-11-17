import { useState, useEffect } from "react";
import noteContext from "./noteContext";
import api from "../../api/axiosConfig";
import { message, Spin } from "antd";

const NoteState = (props) => {
  const [notes, setNotes] = useState([
    {
      title: 'Loading...',
      description: "Please wait while notes are being fetched",
      tag: "Loading..."
    }
  ]);
  const [loading, setLoading] = useState(true); // 🔹 loading state

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/notes/fetch-all-notes", {
          headers: {
            "auth-token": localStorage.getItem("token")
          }
        });
        setNotes(response.data);
      } catch (error) {
        message.error("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (title, description, tag) => {
    setLoading(true);
    try {
      const response = await api.post("/api/notes/add-note", {
        userId: localStorage.getItem("user_id"),
        title,
        description,
        tag
      }, {
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      });

      message.success("Note added successfully");
      setNotes(notes.concat(response.data.savedNote));
      return response.data;
    } catch (error) {
      message.error("Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <noteContext.Provider value={{ notes, setNotes, addNote, loading }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
