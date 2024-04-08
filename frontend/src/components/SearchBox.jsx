import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BsSearchHeartFill } from "react-icons/bs";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword ? urlKeyword : "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Form
      onSubmit={submitHandler}
      className="d-flex align-items-center justify-content-center w-20"
    >
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Rechercher un article"
        className="mr-2"
        style={{
          borderRadius: "20px",
          border: "2px solid #ccc",
          padding: "8px",
        }}
      />
      <Button
        type="submit"
        variant="outline-primary"
        className="ms-3 text-white"
        style={{
          borderRadius: "20px",
          padding: "8px",
        }}
      >
        <BsSearchHeartFill size={24} />
      </Button>
    </Form>
  );
};

export default SearchBox;
