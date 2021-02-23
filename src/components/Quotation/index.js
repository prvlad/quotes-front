import React, { useState } from "react";
import "./Quotation.css";

const Quotation = ({ text, author, onDelete, id, onUpdate }) => {
  const [edited, setEdited] = useState(false);
  const [editedValues, setEditedvalues] = useState({ text: text, author: author });

  return (
    <p className="Q-container">
      {edited ? (
        <>
          <textarea rows="3" value={editedValues.text} onChange={(e) => setEditedvalues({...editedValues, text: e.target.value})}></textarea>
          <input value={editedValues.author} onChange={(e) => setEditedvalues({...editedValues, author: e.target.value})} />
          <button onClick={() => onUpdate({...editedValues, id}, setEdited(false))}>Save</button>
          <button onClick={() => setEditedvalues({text: text, author: author}, setEdited(false))}>Cancel</button>
        </>
      ) : (
        <>
          <q>{text}</q>
          <strong> - {author}</strong>
          <button onClick={()=> setEdited(true)}>Edit</button>
          <button onClick={() => onDelete(id) }>Delete</button>
        </>
      )}
    </p>
  );
};

export default Quotation;
