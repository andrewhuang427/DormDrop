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

export const integerToTime = (time) => {
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
  } else if (formProperties.length === "") {
    return "Must include form properties";
  } else {
    return "";
  }
};

const integerToDayOfTheWeek = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export const sortOptions = (options) => {
  const now = new Date();
  const dayOfTheWeek = integerToDayOfTheWeek[now.getDay()];
  const arr = now.toTimeString().split(":");
  const timeAsInteger = Number(arr[0]) * 60 + Number(arr[1]);

  let object = {
    active: [],
    inactive: [],
  };

  for (let i = 0; i < options.length; ++i) {
    const option = options[i];
    const hoursArray = option.data.hours[dayOfTheWeek];
    for (let j = 0; j < hoursArray.length; ++j) {
      const { open, close } = hoursArray[j];
      if (open < close && timeAsInteger > open && timeAsInteger < close) {
        object.active.push(option);
      } else if (
        close < open &&
        (timeAsInteger > open || timeAsInteger < close)
      ) {
        object.active.push(option);
      }
    }
    if (!object.active.includes(option)) {
      object.inactive.push(option);
    }
  }
  console.log(object);
  return object;
};

export const isValidOrder = (order) => {
  const { price, restaurant, orderDetails } = order;
  for (let i = 0; i < orderDetails.length; ++i) {}
  return true;
};
