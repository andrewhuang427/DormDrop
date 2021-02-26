import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

function Name({ order, editOrder, orderIndex }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (order.name !== undefined) {
      setName(order.name);
    }
  }, []);

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
      value={order.name}
      onChange={handleChange}
      fullWidth
    />
  );
}

function OrderNumber({ order, editOrder, orderIndex }) {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    if (order.orderNumber !== undefined) {
      setOrderNumber(order.orderNumber);
    }
  }, []);

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
      value={order.orderNumber}
      fullWidth
    />
  );
}

function IncludeDrinkSelect({ order, editOrder, orderIndex }) {
  const [includeDrink, setIncludeDrink] = useState(false);
  const [drink, setDrink] = useState("");

  useEffect(() => {
    if (order.includeDrink !== undefined) {
      setIncludeDrink(order.includeDrink);
    }
    if (order.drink !== undefined) {
      setDrink(order.drink);
    }
  }, []);

  const handleChange = (event) => {
    if (event.target.checked === false) {
      setDrink("");
    }
    setIncludeDrink(event.target.checked);
  };

  const handleDrinkChange = (event) => {
    setDrink(event.target.value);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.includeDrink = includeDrink;
    if (includeDrink === false) {
      delete newOrder.drink;
    } else {
      newOrder.drink = drink;
    }
    editOrder(newOrder, orderIndex);
  }, [includeDrink, drink]);

  return (
    <>
      <FormControlLabel
        value="end"
        control={<Checkbox onClick={handleChange} value={order.includeDrink} />}
        label="Add Drink"
        value={order.includeDrink}
      />
      {includeDrink ? (
        <div>
          <TextField
            variant="outlined"
            placeholder="Enter what drink you ordered"
            value={order.drink}
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
  const [includeUtensils, setIncludeUtensils] = useState(false);

  useEffect(() => {
    if (order.includeUtensils !== undefined) {
      setIncludeUtensils(order.includeUtensils);
    }
  }, []);

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
      control={
        <Checkbox value={order.includeUtensils} onChange={handleChange} />
      }
      label="Utensils"
    />
  );
}

function IncludeSauces({ order, editOrder, orderIndex }) {
  const [includeSauces, setIncludeSauces] = useState(false);
  const [sauces, setSauces] = useState("");

  useEffect(() => {
    if (order.includeSauces !== undefined) {
      setIncludeSauces(order.includeSauces);
    }
    if (order.sauces !== undefined) {
      setSauces(order.sauces);
    }
  }, []);

  const handleChange = (event) => {
    setIncludeSauces(event.target.checked);
  };

  const handleSaucesChange = (event) => {
    setSauces(event.target.value);
  };

  useEffect(() => {
    const newOrder = { ...order };
    newOrder.includeSauces = includeSauces;
    if (!includeSauces) {
      delete newOrder.sauces;
    } else {
      newOrder.sauces = sauces;
    }
    editOrder(newOrder, orderIndex);
  }, [includeSauces, sauces]);

  return (
    <>
      <FormControlLabel
        value="end"
        control={
          <Checkbox onClick={handleChange} value={order.includeSauces} />
        }
        label="Include Sauces"
      />
      {includeSauces ? (
        <div>
          <TextField
            placeholder="Enter which sauces you want"
            variant="outlined"
            value={order.sauces}
            onChange={handleSaucesChange}
            fullWidth
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

function AdditionalInstructions() {
  return (
    <TextField
      variant="outlined"
      multiline
      fullWidth
      placeholder="Additional Instructions"
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
