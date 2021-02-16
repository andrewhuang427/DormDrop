import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Form = styled.form``;

function NewRestaurantForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (event) => {};

  return (
    <div>
      <h1>Add New Restaurants</h1>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="outlined"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          variant="outlined"
        />
        <button type="submit">Create</button>
      </Form>
    </div>
  );
}

export default NewRestaurantForm;
