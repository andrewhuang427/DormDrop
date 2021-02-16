import React, { useState, useEffect } from "react";
import {
  createTimeSlot,
  getTimeSlots,
  updateTimeSlots,
  deleteTimeSlot,
} from "../../api/timeslot/index";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getRestaurants } from "../../api/restaurant/index";
import TextField from "@material-ui/core/TextField";
import { timeToInteger, integerToTime } from "../../utils/index";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import styled from "styled-components";

const Container = styled.div``;

const Form = styled.form``;

const TimeSlots = styled.div``;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const handleOptions = (availableRestaurants) => {
  let str = "";
  for (let i = 0; i < availableRestaurants.length; ++i) {
    const restaurant = availableRestaurants[i];
    if (i !== availableRestaurants.length - 1) {
      str += restaurant.name + ", ";
    } else {
      str += restaurant.name;
    }
  }
  return str;
};

function NewTimeSlotForm() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getRestaurantIDs = () => {
    const IDs = [];
    for (let i = 0; i < restaurants.length; ++i) {
      const restaurant = restaurants[i];
      if (selectedRestaurants.includes(restaurant.name)) {
        IDs.push(restaurant._id);
      }
    }
    return IDs;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitting");
    const data = {
      name,
      hours: {
        open: timeToInteger(startTime),
        close: timeToInteger(endTime),
      },
      restaurants: getRestaurantIDs(),
    };
    console.log(data);
    try {
      const response = await createTimeSlot(data);
      console.log(response);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setSelectedRestaurants(event.target.value);
  };

  return (
    <div>
      <h1>Add New Time Slots</h1>
      <Container>
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
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(event) => {
              setStartTime(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(event) => {
              setEndTime(event.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Chip</InputLabel>
            <Select
              multiple
              value={selectedRestaurants}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {restaurants.map((restaurant, index) => {
                return (
                  <MenuItem key={index} value={restaurant.name}>
                    {restaurant.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <button type="submit">Create</button>
        </Form>
      </Container>
    </div>
  );
}

export default NewTimeSlotForm;
