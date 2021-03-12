export const getPriceForLocation = (Details, location) => {
  const priceDetails = Details.data.prices;
  const filtered = priceDetails.filter((price) => {
    return price.campusRegion === location;
  });
  if (filtered[0] !== undefined) {
    return Number(filtered[0].amount);
  } else {
    return 999999;
  }
};
