import React from 'react';

function Notes(props) {
  const { title, description, tag } = props.note;

  return (
    <div className="note-card">
      <h2 className="note-title">{title}</h2>
      <p className="note-desc">{description}</p>
      {tag && <p className="note-tag">{tag}</p>}

      <style>{`/* Individual note card */
.note-card {
  background: #ffffff;
  border: 1px solid rgba(22, 119, 255, 0.69);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.note-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.note-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #1677ff;
}

.note-desc {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.note-tag {
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
  background: #e6f0ff;
  padding: 4px 8px;
  border-radius: 6px;
  width: fit-content;
}
`}</style>
    </div>
  );
}

export default Notes;
