import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Quotation from "./components/Quotation";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:3000";

const App = () => {
  const [quotationsList, setQuotationsList] = useState([]);

  const handleNewQuotation = (quotation) => {
    setQuotationsList([...quotationsList, quotation]);
  };

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => res.json())
      .then((json) => {
        setQuotationsList(json);
      });
  }, []);

  const QuotationList = () => {
    const handleDelete = (id) => {
      fetch(SERVER_URL, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      const newList = quotationsList.filter((el) => el._id !== id);
      setQuotationsList(newList);
    };

    const handleUpdate = (quotation) => {
      console.log(quotation);
      fetch(SERVER_URL, {
        method: "PATCH",
        body: JSON.stringify({ ...quotation }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json())
      .then((json) => {
        const newList = quotationsList.map((el) => {
          if (el._id === quotation.id) {
            el.author = quotation.author;
            el.text = quotation.text;
          }
          return el;
        });
        setQuotationsList(newList);
      });
    };

    return quotationsList.map((el, idx) => (
      <Quotation
        key={idx}
        id={el._id}
        text={el.text}
        author={el.author}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    ));
  };

  return (
    <>
      <Form onSubmit={handleNewQuotation} />
      <div>{QuotationList(quotationsList)}</div>
    </>
  );
};

export default App;
