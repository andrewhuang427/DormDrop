import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function Name({ order, editOrder, orderIndex }) {
  const [name, setName] = useState(order.name);

  useEffect(() => {
    setName(order.name);
  }, [order]);

  const handleChange = (event) => {
    const newName = event.target.value;
    setName(newName);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.name = name;
    editOrder(newOrder, orderIndex);
  }, [name]);

  return (
    <TextField
      variant="outlined"
      placeholder="Name"
      value={name}
      onChange={handleChange}
      fullWidth
    />
  );
}

function OrderNumber({ order, editOrder, orderIndex }) {
  const [orderNumber, setOrderNumber] = useState(order.orderNumber);

  useEffect(() => {
    setOrderNumber(order.orderNumber);
  }, [order]);

  const handleChange = (event) => {
    const newOrderNumber = event.target.value;
    setOrderNumber(newOrderNumber);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.orderNumber = orderNumber;
    editOrder(newOrder, orderIndex);
  }, [orderNumber]);

  return (
    <TextField
      variant="outlined"
      placeholder="Order Number"
      onChange={handleChange}
      value={orderNumber}
      fullWidth
    />
  );
}

function IncludeDrinkSelect({ order, editOrder, orderIndex }) {
  const [includeDrink, setIncludeDrink] = useState(order.includeDrink);
  const [drink, setDrink] = useState(order.drink);

  useEffect(() => {
    setIncludeDrink(order.includeDrink);
    setDrink(order.drink);
  }, [order]);

  const handleChange = () => {
    setIncludeDrink(!includeDrink);
    if (!includeDrink === false) setDrink("");
  };

  const handleDrinkChange = (event) => {
    setDrink(event.target.value);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.includeDrink = includeDrink;
    newOrder.drink = drink;
    editOrder(newOrder, orderIndex);
  }, [includeDrink, drink]);

  return (
    <>
      <FormControlLabel
        value="end"
        control={<Checkbox onClick={handleChange} checked={includeDrink} />}
        label="Add Drink"
        value={order.includeDrink}
      />
      {includeDrink ? (
        <div>
          <TextField
            variant="outlined"
            placeholder="Enter what drink you ordered"
            value={drink}
            onChange={handleDrinkChange}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function Utensils({ order, editOrder, orderIndex }) {
  const [includeUtensils, setIncludeUtensils] = useState(order.includeUtensils);

  useEffect(() => {
    setIncludeUtensils(order.includeUtensils);
  }, [order]);

  const handleChange = (event) => {
    setIncludeUtensils(event.target.checked);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.includeUtensils = includeUtensils;
    editOrder(newOrder, orderIndex);
  }, [includeUtensils]);

  return (
    <FormControlLabel
      value="end"
      control={<Checkbox checked={includeUtensils} onChange={handleChange} />}
      label="Utensils"
    />
  );
}

function IncludeSauces({ order, editOrder, orderIndex }) {
  const [includeSauces, setIncludeSauces] = useState(order.includeSauces);
  const [sauces, setSauces] = useState(order.sauces);

  useEffect(() => {
    setIncludeSauces(order.includeSauces);
    setSauces(order.sauces);
  }, [order]);

  const handleChange = () => {
    setIncludeSauces(!includeSauces);
    if (!includeSauces === false) setSauces("");
  };

  const handleSaucesChange = (event) => {
    setSauces(event.target.value);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.includeSauces = includeSauces;
    newOrder.sauces = sauces;
    editOrder(newOrder, orderIndex);
  }, [includeSauces, sauces]);

  return (
    <>
      <FormControlLabel
        value="end"
        control={<Checkbox onChange={handleChange} checked={includeSauces} />}
        label="Include Sauces"
      />
      {includeSauces ? (
        <div>
          <TextField
            placeholder="Enter which sauces you want"
            variant="outlined"
            value={sauces}
            onChange={handleSaucesChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function AdditionalInstructions({ order, editOrder, orderIndex }) {
  const [additionalInstructions, setAdditionalInstructions] = useState(
    order.additionalInstructions
  );

  useEffect(() => {
    setAdditionalInstructions(order.additionalInstructions);
  }, [order]);

  const handleChange = (event) => {
    setAdditionalInstructions(event.target.value);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.additionalInstructions = additionalInstructions;
    editOrder(newOrder, orderIndex);
  }, [additionalInstructions]);

  return (
    <TextField
      variant="outlined"
      multiline
      fullWidth
      onChange={handleChange}
      value={additionalInstructions}
      placeholder="Additional Instructions"
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default function FormField({ name, order, editOrder, orderIndex }) {
  const map = {
    "Customer Name": (
      <Name order={order} editOrder={editOrder} orderIndex={orderIndex} />
    ),
    "Order Number": (
      <OrderNumber
        order={order}
        editOrder={editOrder}
        orderIndex={orderIndex}
      />
    ),
    "Include Drink": (
      <IncludeDrinkSelect
        order={order}
        editOrder={editOrder}
        orderIndex={orderIndex}
      />
    ),
    Utensils: (
      <Utensils order={order} editOrder={editOrder} orderIndex={orderIndex} />
    ),
    "Include Sauces": (
      <IncludeSauces
        order={order}
        editOrder={editOrder}
        orderIndex={orderIndex}
      />
    ),
    "Additional Instructions": (
      <AdditionalInstructions
        order={order}
        editOrder={editOrder}
        orderIndex={orderIndex}
      />
    ),
  };

  return map[name];
}
