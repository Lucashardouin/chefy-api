function isRestaurantName(restaurantName) {
  if (
    !restaurantName ||
    restaurantName.length < 3 ||
    restaurantName.length > 15
  ) {
    return false;
  }
  return true;
}

module.exports = isRestaurantName;
