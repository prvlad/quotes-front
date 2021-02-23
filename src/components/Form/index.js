import React, { useState } from "react";
import "./Form.css";

const Form = (props) => {
  const [newQuotation, setNewQuotation] = useState({ text: "", author: "" });

  const SERVER_URL =
    process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

  const submit = (e) => {
    e.preventDefault();
    if (newQuotation.author === "" || newQuotation.text === "") {
      return;
    }
    fetch(SERVER_URL, {
      method: "POST",
      body: JSON.stringify({ ...newQuotation }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        props.onSubmit(json);
        setNewQuotation({ text: "", author: "" });
      });
  };
  return (
    <div className="Container">
      <form onSubmit={submit}>
        <div className="Row">
          <label for="author">Author</label>
          <input
            id="author"
            name="newQuotation[author]"
            value={newQuotation.author}
            onChange={(e) =>
              setNewQuotation({ ...newQuotation, author: e.target.value })
            }
          ></input>
        </div>
        <div className="Row">
          <label for="quotation">Quotation</label>
          <textarea
            id="quotation"
            rows="6"
            name="newQuotation[text]"
            value={newQuotation.text}
            onChange={(e) =>
              setNewQuotation({ ...newQuotation, text: e.target.value })
            }
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
