export const integerToMilitaryTime = (time) => {
  let hours = Math.floor(Number(time) / 60);
  let minutes = time - hours * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

export const integerToRegularTime = (time) => {
  let extension = "AM";
  let hours = Math.floor(Number(time) / 60);
  let minutes = time - hours * 60;
  if (hours >= 12) {
    extension = "PM";
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  if (hours === 0) {
    hours = 12;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes + " " + extension;
};

export const timeToInteger = (time) => {
  const timeArray = time.split(":");
  console.log(timeArray);
  return Number(timeArray[0]) * 60 + Number(timeArray[1]);
};

export const validateRestaurantForm = (data) => {
  const {
    displayName,
    restaurants,
    price,
    maxOrders,
    timeSlots,
    instructions,
    campusRegion,
    formProperties,
  } = data;

  if (displayName === "") {
    return "Display name must be filled";
  } else if (restaurants.length === 0) {
    return "Must include at least 1 restaurant";
  } else if (price < 0) {
    return "Price cannot be negative";
  } else if (maxOrders < 1) {
    return "Max orders must be greater than order equal to 1";
  } else if (timeSlots.length === 0) {
    return "Must include at least 1 time slot";
  } else if (instructions === "") {
    return "Cannot leave instructions blank";
  } else if (campusRegion === "") {
    return "Must include campus region";
  } else if (formProperties.length === "") {
    return "Must include form properties";
  } else {
    return "";
  }
};
